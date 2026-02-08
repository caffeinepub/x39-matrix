import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

export function TokenAnalyticsPanel() {
  // Mock data - backend analytics functionality was removed
  const mockMetrics = {
    volume24h: 125000000,
    totalValue: 450000000,
    inflow: 15000000,
    outflow: 8000000,
  };

  const formatCurrency = (value: number): string => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    return `$${value.toFixed(0)}`;
  };

  const netFlow = mockMetrics.inflow - mockMetrics.outflow;
  const isPositiveFlow = netFlow >= 0;

  return (
    <div className="bg-gradient-to-br from-black/70 via-black/60 to-black/70 rounded-xl border-2 border-sky-500/40 backdrop-blur-md shadow-lg shadow-sky-500/10 p-6">
      <h2 className="text-2xl font-bold text-sky-400 mb-6 font-orbitron neon-text-sky">
        ICP Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 24h Trading Volume */}
        <div className="bg-black/40 rounded-lg p-4 border border-sky-500/30 hover:border-sky-500/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-sky-400" />
            <span className="text-xs text-gray-400 font-orbitron">24H VOLUME</span>
          </div>
          <p className="text-2xl font-bold text-white font-orbitron">{formatCurrency(mockMetrics.volume24h)}</p>
          <p className="text-xs text-gray-400 mt-1">Trading activity</p>
        </div>

        {/* Total Value */}
        <div className="bg-black/40 rounded-lg p-4 border border-sky-500/30 hover:border-sky-500/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-sky-400" />
            <span className="text-xs text-gray-400 font-orbitron">TOTAL VALUE</span>
          </div>
          <p className="text-2xl font-bold text-white font-orbitron">{formatCurrency(mockMetrics.totalValue)}</p>
          <p className="text-xs text-gray-400 mt-1">Market depth</p>
        </div>

        {/* Money Inflow */}
        <div className="bg-black/40 rounded-lg p-4 border border-sky-500/30 hover:border-sky-500/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-sky-400" />
            <span className="text-xs text-gray-400 font-orbitron">INFLOW</span>
          </div>
          <p className="text-2xl font-bold text-sky-400 font-orbitron">{formatCurrency(mockMetrics.inflow)}</p>
          <p className="text-xs text-gray-400 mt-1">Capital entering</p>
        </div>

        {/* Money Outflow */}
        <div className="bg-black/40 rounded-lg p-4 border border-sky-500/30 hover:border-sky-500/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <span className="text-xs text-gray-400 font-orbitron">OUTFLOW</span>
          </div>
          <p className="text-2xl font-bold text-red-400 font-orbitron">{formatCurrency(mockMetrics.outflow)}</p>
          <p className="text-xs text-gray-400 mt-1">Capital exiting</p>
        </div>
      </div>

      {/* Net Flow Summary */}
      <div className="mt-6 bg-black/40 rounded-lg p-4 border border-sky-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 font-orbitron mb-1">NET FLOW (24H)</p>
            <p className={`text-3xl font-bold font-orbitron ${isPositiveFlow ? 'text-sky-400' : 'text-red-400'}`}>
              {isPositiveFlow ? '+' : ''}{formatCurrency(netFlow)}
            </p>
          </div>
          <div className={`p-4 rounded-full ${isPositiveFlow ? 'bg-sky-500/20' : 'bg-red-500/20'}`}>
            {isPositiveFlow ? (
              <TrendingUp className="w-8 h-8 text-sky-400" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-400" />
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {isPositiveFlow ? 'Positive momentum - more capital entering than exiting' : 'Negative momentum - more capital exiting than entering'}
        </p>
      </div>
    </div>
  );
}
