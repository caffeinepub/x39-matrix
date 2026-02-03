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

      const rsiData = calculateRSI(priceData.map(d => d.close), 14);
      const signals = generateSignals(priceData, rsiData);

      setChartData({
        price: priceData,
        rsi: rsiData,
        signals,
      });
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setError('No se pudo cargar los datos del gráfico');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateRSI = (prices: number[], period: number = 14): number[] => {
    const rsi: number[] = [];
    
    for (let i = 0; i < prices.length; i++) {
      if (i < period) {
        rsi.push(50);
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
      const rs = avgGain / (avgLoss || 1);
      const rsiValue = 100 - (100 / (1 + rs));
      
      rsi.push(rsiValue);
    }

    return rsi;
  };

  const generateSignals = (
    priceData: ICPKlineData[],
    rsiData: number[]
  ): { time: number; type: 'buy' | 'sell'; price: number }[] => {
    const signals: { time: number; type: 'buy' | 'sell'; price: number }[] = [];

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
    if (!chartData || chartData.price.length < 2) return 'Calculando...';

    const recentPrices = chartData.price.slice(-10);
    const avgChange = recentPrices.reduce((sum, data, i) => {
      if (i === 0) return 0;
      return sum + (data.close - recentPrices[i - 1].close);
    }, 0) / (recentPrices.length - 1);

    const currentPrice = chartData.price[chartData.price.length - 1].close;
    const projectedPrice = currentPrice + avgChange * 3;

    if (avgChange > 0) {
      return `Tendencia alcista: ~$${projectedPrice.toFixed(2)}`;
    } else if (avgChange < 0) {
      return `Tendencia bajista: ~$${projectedPrice.toFixed(2)}`;
    } else {
      return 'Tendencia lateral';
    }
  };

  const getCurrentRSI = (): number => {
    if (!chartData || chartData.rsi.length === 0) return 50;
    return chartData.rsi[chartData.rsi.length - 1];
  };

  const getIntervalLabel = (interval: TimeInterval): string => {
    switch (interval) {
      case '15m': return '15 minutos';
      case '1h': return '1 hora';
      case '1d': return '1 día';
    }
  };

  return (
    <section id="graficos" className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Extroverted Authoritative Messaging */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500 neon-text-red font-orbitron mb-4 uppercase tracking-wide">
            ANÁLISIS SUPREMO x39Matrix
          </h2>
          <p className="text-2xl md:text-3xl text-white font-bold mb-3">
            Domina el Mercado Descentralizado
          </p>
          <p className="text-xl text-red-400 font-semibold italic">
            x39Matrix - Protocolo Matrix: La Autoridad en Análisis Técnico Avanzado
          </p>
        </div>

        {/* Central Triangle-Eye Symbol with Enhanced Pulsating Animation */}
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded-lg"
            aria-label={isOpen ? 'Cerrar gráficos' : 'Abrir gráficos'}
            aria-expanded={isOpen}
          >
            <img
              src="/assets/generated/triangle-eye-symbol-transparent.dim_128x128.png"
              alt="Triangle Eye Symbol - x39Matrix Analysis Authority"
              className={`w-32 h-32 md:w-40 md:h-40 transition-all duration-500 animate-triangle-pulse ${
                isOpen ? 'opacity-100 rotate-180' : 'opacity-90 rotate-0'
              }`}
              style={{
                filter: 'drop-shadow(0 0 25px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 50px rgba(255, 0, 0, 0.5))',
              }}
            />
            <div className="absolute inset-0 rounded-full bg-red-500/30 blur-3xl group-hover:bg-red-500/40 transition-all duration-500 animate-glow-pulse" />
          </button>

          <p className="mt-6 text-lg md:text-xl text-gray-300 font-orbitron text-center font-semibold">
            {isOpen ? 'Toca para cerrar el PODER del análisis' : 'Toca para CONTROLAR tu destino financiero'}
          </p>
        </div>

        {/* Animated Chart Panel */}
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#1A1A1A] rounded-lg p-6 md:p-10 border-2 border-red-500/50 shadow-red-glow">
            {/* Reassuring Subtitle with Authority */}
            <div className="text-center mb-8 pb-6 border-b border-red-500/20">
              <h2 className="text-3xl md:text-4xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
                Gráficos ICP - Inteligencia x39Matrix
              </h2>
              <p className="text-xl md:text-2xl text-green-400 font-bold animate-pulse-glow uppercase">
                ICP se estabiliza, mantén la calma - CONTROLA el mercado
              </p>
            </div>

            {/* Time Interval Controls */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {(['15m', '1h', '1d'] as TimeInterval[]).map((interval) => (
                <button
                  key={interval}
                  onClick={() => setActiveInterval(interval)}
                  className={`px-6 py-3 rounded-lg font-orbitron font-bold transition-all duration-300 uppercase ${
                    activeInterval === interval
                      ? 'bg-red-600 text-white shadow-red-glow scale-105'
                      : 'bg-black/50 text-gray-400 border-2 border-red-500/30 hover:border-red-500/60 hover:text-white hover:scale-105'
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  {getIntervalLabel(interval)}
                </button>
              ))}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Activity className="w-12 h-12 text-red-500 animate-spin mb-4" />
                <p className="text-gray-400 font-orbitron font-semibold">Cargando inteligencia de mercado...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-red-400 font-orbitron font-semibold">{error}</p>
                <button
                  onClick={() => fetchChartData(activeInterval)}
                  className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold uppercase"
                >
                  Reintentar
                </button>
              </div>
            )}

            {/* Chart Data Display */}
            {!isLoading && !error && chartData && (
              <div className="space-y-8">
                {/* Price Movement Graph */}
                <div className="bg-black/50 rounded-lg p-6 border-2 border-red-500/30">
                  <h3 className="text-xl font-bold text-red-500 neon-text-red font-orbitron mb-4 flex items-center gap-2 uppercase">
                    <Activity className="w-5 h-5" />
                    Movimiento de Precio - Dominio del Mercado
                  </h3>
                  <div className="relative h-64 flex items-end gap-1">
                    {chartData.price.map((data, index) => {
                      const maxPrice = Math.max(...chartData.price.map(d => d.high));
                      const minPrice = Math.min(...chartData.price.map(d => d.low));
                      const range = maxPrice - minPrice;
                      const height = ((data.close - minPrice) / range) * 100;
                      const isUp = data.close >= data.open;

                      return (
                        <div
                          key={index}
                          className="flex-1 relative group"
                          style={{ height: `${height}%` }}
                        >
                          <div
                            className={`w-full h-full rounded-t transition-all duration-300 ${
                              isUp ? 'bg-green-500/70 hover:bg-green-500' : 'bg-red-500/70 hover:bg-red-500'
                            }`}
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 font-bold">
                            ${data.close.toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-gray-500 font-orbitron font-semibold">
                    <span>Inicio</span>
                    <span>Ahora</span>
                  </div>
                </div>

                {/* RSI Chart */}
                <div className="bg-black/50 rounded-lg p-6 border-2 border-red-500/30">
                  <h3 className="text-xl font-bold text-red-500 neon-text-red font-orbitron mb-4 uppercase">
                    RSI - Índice de Fuerza Suprema
                  </h3>
                  <div className="relative h-48">
                    <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-600 font-orbitron font-semibold">
                      <div className="border-t border-gray-700/50 pl-2">70 - Sobrecompra</div>
                      <div className="border-t border-gray-700/50 pl-2">50 - Neutral</div>
                      <div className="border-t border-gray-700/50 pl-2">30 - Sobreventa</div>
                    </div>
                    
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <polyline
                        points={chartData.rsi
                          .map((rsi, i) => {
                            const x = (i / (chartData.rsi.length - 1)) * 100;
                            const y = 100 - rsi;
                            return `${x},${y}`;
                          })
                          .join(' ')}
                        fill="none"
                        stroke="#FF0000"
                        strokeWidth="3"
                        className="drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                      />
                    </svg>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-400 font-orbitron font-semibold">RSI Actual:</span>
                    <span className={`text-2xl font-bold font-orbitron ${
                      getCurrentRSI() > 70 ? 'text-red-500' : getCurrentRSI() < 30 ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {getCurrentRSI().toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Buy/Sell Signals */}
                <div className="bg-black/50 rounded-lg p-6 border-2 border-red-500/30">
                  <h3 className="text-xl font-bold text-red-500 neon-text-red font-orbitron mb-4 uppercase">
                    Señales de Dominio - Compra/Venta
                  </h3>
                  {chartData.signals.length > 0 ? (
                    <div className="space-y-3">
                      {chartData.signals.slice(-5).reverse().map((signal, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg ${
                            signal.type === 'buy' ? 'bg-green-500/20 border-2 border-green-500/50' : 'bg-red-500/20 border-2 border-red-500/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {signal.type === 'buy' ? (
                              <TrendingUp className="w-6 h-6 text-green-500" />
                            ) : (
                              <TrendingDown className="w-6 h-6 text-red-500" />
                            )}
                            <span className={`font-bold font-orbitron text-lg uppercase ${
                              signal.type === 'buy' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {signal.type === 'buy' ? 'COMPRA' : 'VENTA'}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold text-lg">${signal.price.toFixed(2)}</div>
                            <div className="text-xs text-gray-500 font-semibold">
                              {new Date(signal.time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4 font-orbitron font-semibold">
                      No hay señales recientes
                    </p>
                  )}
                </div>

                {/* Price Projection */}
                <div className="bg-black/50 rounded-lg p-6 border-2 border-red-500/30">
                  <h3 className="text-xl font-bold text-red-500 neon-text-red font-orbitron mb-4 uppercase">
                    Proyección de Precio - Inteligencia x39Matrix
                  </h3>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white font-orbitron mb-2 uppercase">
                      {getProjection()}
                    </p>
                    <p className="text-sm text-gray-400 font-orbitron font-semibold">
                      Basado en análisis avanzado ({getIntervalLabel(activeInterval)})
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
