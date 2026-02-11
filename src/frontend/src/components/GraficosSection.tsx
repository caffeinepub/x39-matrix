import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { useActor } from '../hooks/useActor';
import { fetchICPKlines, type ICPKlineData } from '../services/icpMarketData';
import { TrendingUp, TrendingDown, Activity, Clock, AlertCircle } from 'lucide-react';

interface ChartData {
  price: ICPKlineData[];
  rsi: number[];
  signals: { time: number; type: 'buy' | 'sell'; price: number }[];
}

type TimeInterval = '15m' | '1h' | '1d';

export function GraficosSection() {
  const { t } = useLanguage();
  const { actor } = useActor();
  const [isOpen, setIsOpen] = useState(false);
  const [activeInterval, setActiveInterval] = useState<TimeInterval>('1h');
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchChartData(activeInterval);
    }
  }, [isOpen, activeInterval, actor]);

  const fetchChartData = async (interval: TimeInterval) => {
    setIsLoading(true);
    setError(null);

    try {
      const limit = interval === '15m' ? 96 : interval === '1h' ? 24 : 30;
      const priceData = await fetchICPKlines(interval, limit, actor);

      // Guard: Ensure we have enough data
      if (!priceData || priceData.length < 2) {
        setError('Insufficient data available');
        setChartData(null);
        return;
      }

      const rsiData = calculateRSI(priceData.map(d => d.close), 14);
      const signals = generateSignals(priceData, rsiData);

      setChartData({
        price: priceData,
        rsi: rsiData,
        signals,
      });
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setError('Unable to load chart data');
      setChartData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateRSI = (prices: number[], period: number = 14): number[] => {
    const rsi: number[] = [];
    
    // Guard: Not enough data for RSI
    if (prices.length < period + 1) {
      return prices.map(() => 50); // Neutral RSI
    }
    
    for (let i = 0; i < prices.length; i++) {
      if (i < period) {
        rsi.push(50); // Neutral for insufficient history
        continue;
      }

      let gains = 0;
      let losses = 0;

      for (let j = i - period + 1; j <= i; j++) {
        const change = prices[j] - prices[j - 1];
        if (change > 0) gains += change;
        else losses -= change;
      }

      const avgGain = gains / period;
      const avgLoss = losses / period;
      
      // Guard: Prevent division by zero
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsiValue = 100 - (100 / (1 + rs));
      
      // Guard: Ensure finite RSI
      rsi.push(isFinite(rsiValue) ? rsiValue : 50);
    }

    return rsi;
  };

  const generateSignals = (
    priceData: ICPKlineData[],
    rsiData: number[]
  ): { time: number; type: 'buy' | 'sell'; price: number }[] => {
    const signals: { time: number; type: 'buy' | 'sell'; price: number }[] = [];

    // Guard: Need at least 2 data points
    if (rsiData.length < 2 || priceData.length < 2) {
      return signals;
    }

    for (let i = 1; i < rsiData.length; i++) {
      if (rsiData[i - 1] < 30 && rsiData[i] >= 30) {
        signals.push({
          time: priceData[i].time,
          type: 'buy',
          price: priceData[i].close,
        });
      }
      else if (rsiData[i - 1] > 70 && rsiData[i] <= 70) {
        signals.push({
          time: priceData[i].time,
          type: 'sell',
          price: priceData[i].close,
        });
      }
    }

    return signals;
  };

  const getProjection = (): string => {
    if (!chartData || chartData.price.length < 2) return 'Calculating...';

    const recentPrices = chartData.price.slice(-10);
    
    // Guard: Need at least 2 prices for trend
    if (recentPrices.length < 2) return 'Insufficient data';
    
    const avgChange = recentPrices.reduce((sum, data, i) => {
      if (i === 0) return 0;
      return sum + (data.close - recentPrices[i - 1].close);
    }, 0) / (recentPrices.length - 1);

    const lastPrice = recentPrices[recentPrices.length - 1].close;
    const projectedPrice = lastPrice + avgChange * 5;

    // Guard: Ensure finite projection
    if (!isFinite(projectedPrice) || !isFinite(avgChange)) {
      return 'Data stabilizing...';
    }

    const changePercent = ((projectedPrice - lastPrice) / lastPrice) * 100;
    
    if (changePercent > 2) {
      return `Bullish trend: Projected +${changePercent.toFixed(1)}% in next 5 periods`;
    } else if (changePercent < -2) {
      return `Bearish trend: Projected ${changePercent.toFixed(1)}% in next 5 periods`;
    } else {
      return `Stable: Projected ${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(1)}% in next 5 periods`;
    }
  };

  const renderChart = () => {
    if (!chartData || chartData.price.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>No chart data available</p>
        </div>
      );
    }

    const prices = chartData.price.map(d => d.close);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Guard: Zero price range
    if (priceRange === 0 || !isFinite(priceRange)) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>Price data is flat - waiting for movement</p>
        </div>
      );
    }

    const chartHeight = 200;
    const chartWidth = 800;
    const barWidth = chartWidth / chartData.price.length;

    return (
      <div className="space-y-6">
        {/* Price Chart */}
        <div className="bg-black/40 rounded-lg p-4 border border-sky-500/30">
          <h3 className="text-lg font-bold text-sky-400 mb-4 font-orbitron">Price Chart</h3>
          <div className="relative" style={{ height: `${chartHeight}px` }}>
            <svg width="100%" height={chartHeight} className="overflow-visible">
              {chartData.price.map((data, i) => {
                const barHeight = ((data.close - minPrice) / priceRange) * chartHeight;
                const x = (i / chartData.price.length) * 100;
                const y = chartHeight - barHeight;

                return (
                  <g key={i}>
                    <rect
                      x={`${x}%`}
                      y={y}
                      width={`${100 / chartData.price.length}%`}
                      height={barHeight}
                      className="fill-sky-500/60 hover:fill-sky-400 transition-colors"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>${minPrice.toFixed(2)}</span>
            <span>${maxPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* RSI Indicator */}
        <div className="bg-black/40 rounded-lg p-4 border border-sky-500/30">
          <h3 className="text-lg font-bold text-sky-400 mb-4 font-orbitron">RSI Indicator</h3>
          <div className="relative" style={{ height: '100px' }}>
            <svg width="100%" height="100" className="overflow-visible">
              {/* Overbought/Oversold zones */}
              <rect x="0" y="0" width="100%" height="30" className="fill-red-500/10" />
              <rect x="0" y="70" width="100%" height="30" className="fill-sky-500/10" />
              <line x1="0" y1="30" x2="100%" y2="30" className="stroke-red-500/50" strokeWidth="1" strokeDasharray="4" />
              <line x1="0" y1="70" x2="100%" y2="70" className="stroke-sky-500/50" strokeWidth="1" strokeDasharray="4" />
              
              {/* RSI Line */}
              <polyline
                points={chartData.rsi.map((rsi, i) => {
                  const x = (i / chartData.rsi.length) * 100;
                  const y = 100 - rsi;
                  return `${x}%,${y}`;
                }).join(' ')}
                className="fill-none stroke-sky-400"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Oversold (&lt;30)</span>
            <span>Neutral (50)</span>
            <span>Overbought (&gt;70)</span>
          </div>
        </div>

        {/* Trading Signals */}
        <div className="bg-black/40 rounded-lg p-4 border border-sky-500/30">
          <h3 className="text-lg font-bold text-sky-400 mb-4 font-orbitron">Trading Signals</h3>
          {chartData.signals.length === 0 ? (
            <p className="text-gray-400 text-sm">No signals in current timeframe</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {chartData.signals.slice(-10).reverse().map((signal, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-2 rounded ${
                    signal.type === 'buy' ? 'bg-sky-500/10 border border-sky-500/30' : 'bg-red-500/10 border border-red-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {signal.type === 'buy' ? (
                      <TrendingUp className="w-4 h-4 text-sky-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm font-semibold ${signal.type === 'buy' ? 'text-sky-400' : 'text-red-400'}`}>
                      {signal.type === 'buy' ? 'BUY' : 'SELL'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">${signal.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">{new Date(signal.time).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projection */}
        <div className="bg-black/40 rounded-lg p-4 border border-sky-500/30">
          <h3 className="text-lg font-bold text-sky-400 mb-2 font-orbitron">Price Projection</h3>
          <p className="text-sm text-gray-300">{getProjection()}</p>
        </div>
      </div>
    );
  };

  return (
    <section id="graficos-section" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-sky-400 mb-4 font-orbitron neon-text-sky">
            ICP Trading Charts
          </h2>
          <p className="text-gray-300 font-montserrat">
            Real-time technical analysis and trading signals
          </p>
        </div>

        {!isOpen ? (
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-sky-500/30 font-orbitron"
            >
              <Activity className="inline-block w-5 h-5 mr-2" />
              Open Charts
            </button>
          </div>
        ) : (
          <div className="bg-black/60 rounded-xl border-2 border-sky-500/40 backdrop-blur-md p-6">
            {/* Interval Selector */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              {(['15m', '1h', '1d'] as TimeInterval[]).map((interval) => (
                <button
                  key={interval}
                  onClick={() => setActiveInterval(interval)}
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-lg font-orbitron transition-all duration-300 ${
                    activeInterval === interval
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/50'
                      : 'bg-black/40 text-gray-400 hover:text-sky-400 border border-sky-500/30'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Clock className="inline-block w-4 h-4 mr-2" />
                  {interval}
                </button>
              ))}
            </div>

            {/* Chart Content */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-16 h-16 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
                <p className="text-gray-400 font-orbitron">Loading chart data...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <AlertCircle className="w-16 h-16 text-red-500" />
                <p className="text-red-400 font-orbitron">{error}</p>
                <button
                  onClick={() => fetchChartData(activeInterval)}
                  className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/50 transition-all duration-300 font-orbitron"
                >
                  Retry
                </button>
              </div>
            ) : (
              renderChart()
            )}

            {/* Close Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-black/40 hover:bg-black/60 text-gray-400 hover:text-white rounded-lg border border-sky-500/30 transition-all duration-300 font-orbitron"
              >
                Close Charts
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
