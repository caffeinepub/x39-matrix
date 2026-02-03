import React, { useEffect, useState } from 'react';
import { Activity, TrendingUp, MousePointer, Users, RefreshCw } from 'lucide-react';

interface MockMetric {
  platform: string;
  traffic: number;
  engagement: number;
  clickThroughs: number;
  audienceReach: number;
}

export function PerformanceMetricsDashboard() {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [metrics, setMetrics] = useState<MockMetric[]>([]);

  const platforms = ['Binance', 'OKX', 'MEXC', 'Gate.io', 'HTX', 'ICP', 'uco swicp'];

  // Generate mock metrics
  const generateMockMetrics = (): MockMetric[] => {
    return platforms.map(platform => {
      const baseTraffic = 50000 + Math.floor(Math.random() * 50000);
      const baseEngagement = 65 + Math.random() * 30;
      const baseClickThroughs = 5 + Math.random() * 15;
      const baseReach = 100000 + Math.floor(Math.random() * 400000);

      return {
        platform,
        traffic: baseTraffic,
        engagement: baseEngagement,
        clickThroughs: baseClickThroughs,
        audienceReach: baseReach,
      };
    });
  };

  // Initialize and update metrics every 30 seconds
  useEffect(() => {
    setMetrics(generateMockMetrics());
    const interval = setInterval(() => {
      setMetrics(generateMockMetrics());
      setLastUpdate(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setMetrics(generateMockMetrics());
    setLastUpdate(new Date());
  };

  return (
    <section className="performance-metrics-dashboard py-16 px-4 bg-black/50">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header with Official X39 Matrix Logo */}
        <div className="text-center mb-12 animate-fade-in-up">
          {/* Official X39 Matrix Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src="/assets/generated/x39matrix-official-logo.dim_200x200.png"
                alt="X39 Matrix Performance Metrics"
                className="w-24 h-24 md:w-32 md:h-32 object-contain animate-triangle-pulse"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.7)) drop-shadow(0 0 40px rgba(255, 0, 0, 0.5))'
                }}
              />
              <div className="absolute inset-0 rounded-full bg-red-500/30 blur-3xl animate-glow-pulse" />
            </div>
          </div>
          
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 neon-text-red font-orbitron mb-4"
            style={{
              textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6)',
            }}
          >
            Panel de Métricas de Rendimiento en Tiempo Real
          </h2>
          <p className="text-gray-400 font-montserrat text-lg">
            Estadísticas actualizadas cada 30 segundos
          </p>
        </div>

        {/* Dashboard Container with Cyberpunk Styling */}
        <div 
          className="dashboard-container bg-black/80 border-2 border-red-500 rounded-lg p-6 md:p-8 backdrop-blur-sm relative overflow-hidden"
          style={{
            boxShadow: '0 0 30px rgba(255, 0, 0, 0.3), inset 0 0 30px rgba(255, 0, 0, 0.1)',
          }}
        >
          {/* Glowing animated outline */}
          <div className="absolute inset-0 border-2 border-red-500/50 rounded-lg animate-glow-pulse pointer-events-none" />

          {/* Triangular corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-500" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-500" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500" />

          {/* Last Update and Refresh Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 relative z-10">
            <div className="text-gray-400 font-montserrat text-sm">
              Última actualización: {lastUpdate.toLocaleTimeString('es-ES')}
            </div>
            <button
              onClick={handleManualRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-500 hover:bg-red-500/30 transition-all duration-300 font-orbitron"
              style={{
                boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)',
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </button>
          </div>

          {/* Platform Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
            {metrics.map((metric, index) => {
              const trafficPercent = Math.min((metric.traffic / 100000) * 100, 100);
              const engagementPercent = Math.min(metric.engagement, 100);
              const clickThroughsPercent = Math.min(metric.clickThroughs * 5, 100);
              const reachPercent = Math.min((metric.audienceReach / 500000) * 100, 100);

              return (
                <div
                  key={metric.platform}
                  className="platform-metrics-card bg-black/60 border border-red-500/50 rounded-lg p-6 hover:border-red-500 transition-all duration-300 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)',
                  }}
                >
                  {/* Platform Header with Triangular Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <div 
                        className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-red-500 animate-triangle-pulse"
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))',
                        }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron">
                      {metric.platform}
                    </h3>
                  </div>

                  {/* Metrics Display */}
                  <div className="space-y-5">
                    {/* Traffic Metric */}
                    <div className="metric-item">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-red-500" />
                          <span className="text-gray-300 font-orbitron text-sm">Tráfico</span>
                        </div>
                        <span className="text-red-500 font-bold font-orbitron">
                          {metric.traffic.toLocaleString('es-ES')}
                        </span>
                      </div>
                      <div className="relative h-3 bg-black/50 rounded-full overflow-hidden border border-red-500/30">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${trafficPercent}%`,
                            boxShadow: '0 0 10px rgba(255, 0, 0, 0.6)',
                          }}
                        >
                          <div 
                            className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-red-500"
                            style={{
                              filter: 'drop-shadow(0 0 4px rgba(255, 0, 0, 0.8))',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Engagement Metric */}
                    <div className="metric-item">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-red-500" />
                          <span className="text-gray-300 font-orbitron text-sm">Engagement</span>
                        </div>
                        <span className="text-red-500 font-bold font-orbitron">
                          {metric.engagement.toFixed(1)}%
                        </span>
                      </div>
                      <div className="relative h-3 bg-black/50 rounded-full overflow-hidden border border-red-500/30">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${engagementPercent}%`,
                            boxShadow: '0 0 10px rgba(255, 0, 0, 0.6)',
                          }}
                        >
                          <div 
                            className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-red-500"
                            style={{
                              filter: 'drop-shadow(0 0 4px rgba(255, 0, 0, 0.8))',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Click-Throughs Metric */}
                    <div className="metric-item">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MousePointer className="w-4 h-4 text-red-500" />
                          <span className="text-gray-300 font-orbitron text-sm">Click-Throughs</span>
                        </div>
                        <span className="text-red-500 font-bold font-orbitron">
                          {metric.clickThroughs.toFixed(1)}%
                        </span>
                      </div>
                      <div className="relative h-3 bg-black/50 rounded-full overflow-hidden border border-red-500/30">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${clickThroughsPercent}%`,
                            boxShadow: '0 0 10px rgba(255, 0, 0, 0.6)',
                          }}
                        >
                          <div 
                            className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-red-500"
                            style={{
                              filter: 'drop-shadow(0 0 4px rgba(255, 0, 0, 0.8))',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Audience Reach Metric */}
                    <div className="metric-item">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-red-500" />
                          <span className="text-gray-300 font-orbitron text-sm">Alcance de Audiencia</span>
                        </div>
                        <span className="text-red-500 font-bold font-orbitron">
                          {metric.audienceReach.toLocaleString('es-ES')}
                        </span>
                      </div>
                      <div className="relative h-3 bg-black/50 rounded-full overflow-hidden border border-red-500/30">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${reachPercent}%`,
                            boxShadow: '0 0 10px rgba(255, 0, 0, 0.6)',
                          }}
                        >
                          <div 
                            className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-red-500"
                            style={{
                              filter: 'drop-shadow(0 0 4px rgba(255, 0, 0, 0.8))',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Triangular separator at bottom */}
                  <div className="mt-6 pt-4 border-t border-red-500/30 flex justify-center">
                    <div 
                      className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[14px] border-t-red-500/50"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Connection Indicator to Roadmap */}
          <div className="mt-12 text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/50 rounded-full">
              <div 
                className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-red-500 animate-triangle-pulse"
              />
              <span className="text-red-500 font-orbitron text-sm">
                Sincronizado con Hoja de Ruta Web3
              </span>
              <div 
                className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-red-500 animate-triangle-pulse"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
