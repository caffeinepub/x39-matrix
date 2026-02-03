import React from 'react';
import { Zap, Globe, Rocket, Coins } from 'lucide-react';

export function X39TokenRegistrationSection() {
  // Mock token data
  const tokenData = {
    name: 'X39 Matrix',
    symbol: 'X39',
    totalSupply: 1000000000,
    decimals: 8,
    tokensClaimed: 90000,
  };

  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Token Registration Container */}
        <div className="relative bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A] rounded-lg border-4 border-red-500/70 p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,0,0.3)] overflow-hidden">
          {/* Digital illumination effects */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }} />

          {/* Section Title */}
          <div className="relative text-center mb-12 pb-6 border-b-2 border-red-500/50">
            <h1 className="text-3xl md:text-5xl font-bold text-red-500 font-orbitron animate-title-glow uppercase tracking-wider">
              Información del Token X39 Matrix
            </h1>
            <p className="text-lg md:text-xl text-white font-montserrat mt-3">
              <span className="text-red-500 neon-text-red font-bold">X39 Matrix - Protocolo Matrix Descentralizado</span>
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-16 h-1 bg-red-500 rounded-full animate-pulse-glow" />
              <div className="w-8 h-1 bg-red-500 rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
              <div className="w-16 h-1 bg-red-500 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative bg-black/50 rounded-lg p-6 md:p-10 border border-red-500/30">
            {/* Official X39 Matrix Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img
                  src="/assets/generated/x39matrix-official-logo.dim_200x200.png"
                  alt="X39 Matrix Token Symbol"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain animate-triangle-pulse"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.7)) drop-shadow(0 0 40px rgba(255, 0, 0, 0.5))'
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-red-500/30 blur-3xl animate-glow-pulse" />
              </div>
            </div>

            {/* ICP Ecosystem Contribution Section */}
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-red-500 neon-text-red font-orbitron text-center mb-6">
                Contribución al Ecosistema ICP
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Performance Focus */}
                <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <Zap className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-red-500 font-bold font-orbitron text-base mb-2">Enfoque en Rendimiento</h3>
                      <p className="text-white text-sm font-montserrat leading-relaxed">
                        Mejoras significativas en el rendimiento del ecosistema ICP con optimizaciones avanzadas para transacciones más rápidas y eficientes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interoperability */}
                <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <Globe className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-red-500 font-bold font-orbitron text-base mb-2">Interoperabilidad</h3>
                      <p className="text-white text-sm font-montserrat leading-relaxed">
                        Funcionalidades mejoradas de interoperabilidad y capacidades cross-chain para integración perfecta con múltiples ecosistemas blockchain.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bridge Speed Improvements */}
                <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <Rocket className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-red-500 font-bold font-orbitron text-base mb-2">Mejoras de Velocidad de Puente</h3>
                      <p className="text-white text-sm font-montserrat leading-relaxed">
                        Operaciones de puente más rápidas con tiempos de transacción reducidos para transferencias eficientes entre cadenas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lower Cost Solutions */}
                <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <Coins className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-red-500 font-bold font-orbitron text-base mb-2">Soluciones de Menor Costo</h3>
                      <p className="text-white text-sm font-montserrat leading-relaxed">
                        Soluciones rentables para participantes del ecosistema ICP con tarifas de transacción reducidas y costos operativos optimizados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Promotional Airdrop Section - 200,000 Tokens */}
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-red-500 neon-text-red font-orbitron text-center mb-6">
                Airdrop Promocional - 200,000 Tokens
              </h2>
              
              <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <p className="text-white text-lg font-montserrat leading-relaxed">
                    <span className="text-red-500 font-bold neon-text-red">200,000 tokens X39 Matrix</span> disponibles en nuestra{' '}
                    <span className="text-red-500 font-bold">promoción de airdrop limitada</span>.
                  </p>
                  <p className="text-white text-base font-montserrat mt-3 leading-relaxed">
                    Cada visitante puede reclamar hasta <span className="text-red-500 font-bold">20 tokens gratuitos</span> como parte de esta campaña promocional exclusiva.
                  </p>
                </div>
              </div>
            </div>

            {/* Token Information Display */}
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-red-500 neon-text-red font-orbitron text-center mb-4">
                Parámetros del Token
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/70 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-500 text-sm font-orbitron uppercase mb-1">Nombre</p>
                  <p className="text-white text-lg font-bold font-montserrat">
                    {tokenData.name}
                  </p>
                </div>
                <div className="bg-black/70 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-500 text-sm font-orbitron uppercase mb-1">Símbolo</p>
                  <p className="text-white text-lg font-bold font-montserrat">
                    {tokenData.symbol}
                  </p>
                </div>
                <div className="bg-black/70 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-500 text-sm font-orbitron uppercase mb-1">Suministro Total</p>
                  <p className="text-white text-lg font-bold font-montserrat">
                    {tokenData.totalSupply.toLocaleString()}
                  </p>
                </div>
                <div className="bg-black/70 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-500 text-sm font-orbitron uppercase mb-1">Decimales</p>
                  <p className="text-white text-lg font-bold font-montserrat">
                    {tokenData.decimals}
                  </p>
                </div>
                <div className="bg-black/70 border border-red-500/50 rounded-lg p-4 md:col-span-2">
                  <p className="text-red-500 text-sm font-orbitron uppercase mb-1">Airdrop Promocional</p>
                  <p className="text-white text-lg font-bold font-montserrat">
                    Hasta 20 tokens por visitante
                  </p>
                </div>
              </div>
            </div>

            {/* Token Counter */}
            <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-6 mb-8">
              <div className="text-center">
                <p className="text-red-500 text-lg font-orbitron uppercase mb-2 neon-text-red">
                  Tokens Promocionales Reclamados
                </p>
                <p className="text-white text-4xl md:text-5xl font-bold font-montserrat animate-pulse-glow">
                  {tokenData.tokensClaimed.toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm font-montserrat mt-2">
                  tokens reclamados
                </p>
              </div>
            </div>

            {/* Alliance Information */}
            <div className="mt-8 pt-8 border-t border-red-500/30">
              <p className="text-center text-white text-lg font-montserrat font-bold">
                <span className="text-red-500 neon-text-red">X39 Matrix Token</span> tiene{' '}
                <span className="text-red-500 neon-text-red">alianzas con ICP y sus socios</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
