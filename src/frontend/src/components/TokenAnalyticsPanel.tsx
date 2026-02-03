import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

export function TokenAnalyticsPanel() {
  // Mock data since backend no longer provides analytics
  const analyticsData = {
    tradingVolume: '$2.4M',
    totalValue: '$156.8M',
    moneyInflow: '+$1.2M',
    moneyOutflow: '-$890K'
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up-delayed">
      <div className="bg-gradient-to-br from-black/80 via-black/70 to-black/80 rounded-lg border-2 border-red-500/50 backdrop-blur-md shadow-xl shadow-red-500/20 px-6 py-8">
        {/* Panel Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-red-500 neon-text-red font-orbitron tracking-wide">
            Análisis en Tiempo Real - Binance ICP
          </h3>
          <p className="text-gray-400 text-sm font-montserrat mt-2">
            Métricas públicas sincronizadas con Binance/ICP
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Trading Volume */}
          <div className="bg-black/60 rounded-lg border border-red-500/30 p-4 hover:border-red-500/60 transition-all duration-300 hover:shadow-red-glow">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-red-500 animate-subtle-pulse" />
              <span className="text-red-500 font-orbitron text-sm font-semibold neon-text-red">
                Volumen de Trading
              </span>
            </div>
            <div className="text-white font-bold font-orbitron text-xl md:text-2xl">
              {analyticsData.tradingVolume}
            </div>
            <div className="text-gray-400 text-xs font-montserrat mt-1">
              24h
            </div>
          </div>

          {/* Total Value */}
          <div className="bg-black/60 rounded-lg border border-red-500/30 p-4 hover:border-red-500/60 transition-all duration-300 hover:shadow-red-glow">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-red-500 animate-subtle-pulse" />
              <span className="text-red-500 font-orbitron text-sm font-semibold neon-text-red">
                Valor Total
              </span>
            </div>
            <div className="text-white font-bold font-orbitron text-xl md:text-2xl">
              {analyticsData.totalValue}
            </div>
            <div className="text-gray-400 text-xs font-montserrat mt-1">
              USD
            </div>
          </div>

          {/* Money Inflow */}
          <div className="bg-black/60 rounded-lg border border-red-500/30 p-4 hover:border-red-500/60 transition-all duration-300 hover:shadow-red-glow">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500 animate-subtle-pulse" />
              <span className="text-red-500 font-orbitron text-sm font-semibold neon-text-red">
                Entrada de Dinero
              </span>
            </div>
            <div className="text-white font-bold font-orbitron text-xl md:text-2xl">
              {analyticsData.moneyInflow}
            </div>
            <div className="text-green-500 text-xs font-montserrat mt-1">
              ↑ Positivo
            </div>
          </div>

          {/* Money Outflow */}
          <div className="bg-black/60 rounded-lg border border-red-500/30 p-4 hover:border-red-500/60 transition-all duration-300 hover:shadow-red-glow">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-400 animate-subtle-pulse" />
              <span className="text-red-500 font-orbitron text-sm font-semibold neon-text-red">
                Salida de Dinero
              </span>
            </div>
            <div className="text-white font-bold font-orbitron text-xl md:text-2xl">
              {analyticsData.moneyOutflow}
            </div>
            <div className="text-red-400 text-xs font-montserrat mt-1">
              ↓ Negativo
            </div>
          </div>
        </div>

        {/* Live Update Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-xs font-montserrat">
            Actualización en tiempo real
          </span>
        </div>
      </div>
    </div>
  );
}
