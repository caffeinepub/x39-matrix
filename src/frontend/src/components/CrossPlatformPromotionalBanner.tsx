import React from 'react';
import { Zap, Globe, TrendingUp } from 'lucide-react';
import { OFFICIAL_PORTAL_URL, getCurrentOrigin } from '../utils/urls';

export function CrossPlatformPromotionalBanner() {
  const platformLogos = [
    { name: 'Binance', active: true },
    { name: 'OKX', active: true },
    { name: 'MEXC', active: true },
    { name: 'Gate.io', active: true },
    { name: 'HTX', active: true },
    { name: 'ICP', active: true },
    { name: 'uco swicp', active: true },
  ];

  return (
    <section className="relative w-full bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Primary Promotional Banner */}
        <div className="relative bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A] rounded-lg border-4 border-red-500/70 p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,0,0.5)] overflow-hidden">
          {/* Digital illumination effects - pointer-events-none to prevent click blocking */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-red-500/20 rounded-full blur-3xl animate-glow-pulse pointer-events-none" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/20 rounded-full blur-3xl animate-glow-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-56 bg-red-500/15 rounded-full blur-3xl animate-glow-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

          {/* Banner Header */}
          <div className="relative text-center mb-10 pb-6 border-b-2 border-red-500/50">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-10 h-10 text-red-500 animate-pulse" />
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-500 font-orbitron uppercase tracking-wider animate-title-glow">
                ¡X39 Matrix Token - Disponible en {OFFICIAL_PORTAL_URL}!
              </h1>
              <Zap className="w-10 h-10 text-red-500 animate-pulse" />
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-20 h-1 bg-red-500 rounded-full animate-pulse-glow" />
              <div className="w-10 h-1 bg-red-500 rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
              <div className="w-20 h-1 bg-red-500 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Left Column: Domain Display */}
            <div className="bg-black/50 rounded-lg p-6 md:p-8 border-2 border-red-500/50">
              <h2 className="text-2xl md:text-3xl font-bold text-red-500 neon-text-red font-orbitron text-center mb-6 uppercase">
                Visita Nuestro Portal
              </h2>
              <div className="bg-gradient-to-br from-red-500/30 via-red-500/20 to-transparent border-2 border-red-500/70 rounded-lg p-6 text-center">
                <a 
                  href={OFFICIAL_PORTAL_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative z-10 inline-block text-3xl md:text-4xl font-bold text-white font-orbitron hover:text-red-500 transition-colors duration-300 cursor-pointer"
                  style={{
                    textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6)',
                  }}
                >
                  {OFFICIAL_PORTAL_URL}
                </a>
                <p className="text-red-500 text-sm md:text-base font-montserrat mt-4 neon-text-red">
                  Portal Oficial del Token X39 Matrix
                </p>
                
                {/* Fallback link using current origin */}
                <div className="mt-6 pt-4 border-t border-red-500/30">
                  <p className="text-gray-400 text-xs mb-2">O accede desde este entorno:</p>
                  <a 
                    href={getCurrentOrigin()}
                    className="relative z-10 inline-block text-lg md:text-xl font-semibold text-gray-300 font-orbitron hover:text-red-400 transition-colors duration-300 cursor-pointer underline"
                  >
                    {getCurrentOrigin()}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Platform Status */}
            <div className="bg-black/50 rounded-lg p-6 md:p-8 border-2 border-red-500/50">
              <h2 className="text-2xl md:text-3xl font-bold text-red-500 neon-text-red font-orbitron text-center mb-6 uppercase">
                Plataformas Activas
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {platformLogos.map((platform) => (
                  <div
                    key={platform.name}
                    className={`relative bg-gradient-to-br ${
                      platform.active
                        ? 'from-red-500/30 via-red-500/20 to-transparent border-red-500/70'
                        : 'from-gray-500/20 via-gray-500/10 to-transparent border-gray-500/50'
                    } border-2 rounded-lg p-3 text-center transform hover:scale-105 transition-all duration-300`}
                  >
                    {/* Live status indicator */}
                    {platform.active && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,0,0.8)]" />
                    )}
                    <p className={`text-base md:text-lg font-bold font-orbitron ${
                      platform.active ? 'text-red-500 neon-text-red' : 'text-gray-500'
                    }`}>
                      {platform.name}
                    </p>
                    <p className={`text-xs font-montserrat mt-1 ${
                      platform.active ? 'text-white' : 'text-gray-600'
                    }`}>
                      {platform.active ? 'Conectado' : 'Pendiente'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Central X39 Matrix Logo with Linkage Visuals */}
          <div className="relative flex justify-center items-center mb-10">
            <div className="relative">
              {/* Animated connection lines radiating from logo - pointer-events-none */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 bg-gradient-to-r from-red-500 to-transparent"
                    style={{
                      height: '100px',
                      transform: `rotate(${i * 45}deg)`,
                      transformOrigin: 'center',
                      animation: 'pulse 2s ease-in-out infinite',
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Official X39 Matrix Logo */}
              <img
                src="/assets/generated/x39matrix-official-logo.dim_200x200.png"
                alt="X39 Matrix - Cross-Platform Launch"
                className="w-32 h-32 md:w-40 md:h-40 object-contain animate-triangle-pulse relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 60px rgba(255, 0, 0, 0.6))'
                }}
              />
              <div className="absolute inset-0 rounded-full bg-red-500/40 blur-3xl animate-glow-pulse pointer-events-none" />
            </div>
          </div>

          {/* CTA Text */}
          <div className="relative text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-red-500 animate-pulse" />
              <p className="text-xl md:text-3xl font-bold text-white font-montserrat">
                Disponible en Binance, OKX, MEXC, Gate.io, HTX, ICP, y uco swicp
              </p>
              <TrendingUp className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
            <p className="text-lg md:text-2xl text-red-500 neon-text-red font-orbitron uppercase tracking-wider">
              Únete a la revolución descentralizada del Protocolo Matrix
            </p>
          </div>

          {/* Platform-specific CTA buttons */}
          <div className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {platformLogos.map((platform) => (
              <button
                key={platform.name}
                disabled={!platform.active}
                className={`relative px-4 py-3 rounded-lg font-orbitron font-bold text-sm uppercase transition-all duration-300 ${
                  platform.active
                    ? 'bg-gradient-to-br from-red-500/40 via-red-500/30 to-red-500/20 border-2 border-red-500/70 text-red-500 hover:from-red-500/60 hover:via-red-500/50 hover:to-red-500/40 hover:scale-105 cursor-pointer'
                    : 'bg-gray-800/50 border-2 border-gray-600/50 text-gray-500 cursor-not-allowed'
                }`}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
