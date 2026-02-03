import React, { useState } from 'react';
import { Gift, Shield, Rocket, Award, CheckCircle2 } from 'lucide-react';
import { WalletRegistrationModal } from './WalletRegistrationModal';

export function X39TokenPromotionalAirdropSection() {
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock token data
  const tokensClaimed = 90000;

  const handleClaimClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSuccess = () => {
    setClaimSuccess(true);
  };

  return (
    <>
      <section className="relative w-full min-h-screen bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Promotional Airdrop Container */}
          <div className="relative bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A] rounded-lg border-4 border-red-500/70 p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,0,0.3)] overflow-hidden">
            {/* Digital illumination effects */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-glow-pulse" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }} />

            {/* Section Title */}
            <div className="relative text-center mb-12 pb-6 border-b-2 border-red-500/50">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Gift className="w-10 h-10 text-red-500 animate-pulse-glow" />
                <h1 className="text-3xl md:text-5xl font-bold text-red-500 font-orbitron animate-title-glow uppercase tracking-wider">
                  Airdrop Promocional Limitado
                </h1>
                <Gift className="w-10 h-10 text-red-500 animate-pulse-glow" />
              </div>
              <p className="text-lg md:text-xl text-white font-montserrat mt-3">
                <span className="text-red-500 neon-text-red font-bold">X39 Matrix - Protocolo Matrix</span>
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
                    alt="X39 Matrix Promotional Airdrop"
                    className="w-32 h-32 md:w-40 md:h-40 object-contain animate-triangle-pulse"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.7)) drop-shadow(0 0 40px rgba(255, 0, 0, 0.5))'
                    }}
                  />
                  <div className="absolute inset-0 rounded-full bg-red-500/30 blur-3xl animate-glow-pulse" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-red-500 neon-text-red font-orbitron mb-4 animate-title-glow">
                  Consigue hasta 20 tokens X39 Matrix gratuitos
                </h2>
                <p className="text-white text-lg md:text-xl font-montserrat">
                  Oferta promocional limitada por tiempo limitado
                </p>
              </div>

              {/* Progress and Achievements Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-bold text-red-500 neon-text-red font-orbitron text-center mb-6">
                  Progreso y Logros de X39 Matrix
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Technological Features */}
                  <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <Rocket className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-red-500 font-bold font-orbitron text-base mb-2">Características Tecnológicas</h4>
                        <p className="text-white text-sm font-montserrat leading-relaxed">
                          Características tecnológicas avanzadas y funcionalidades innovadoras.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Community Milestones */}
                  <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <Award className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-red-500 font-bold font-orbitron text-base mb-2">Hitos Comunitarios</h4>
                        <p className="text-white text-sm font-montserrat leading-relaxed">
                          Hitos importantes de participación comunitaria y crecimiento orgánico.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Partnership Development */}
                  <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <Shield className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-red-500 font-bold font-orbitron text-base mb-2">Desarrollo de Asociaciones</h4>
                        <p className="text-white text-sm font-montserrat leading-relaxed">
                          Desarrollo de asociaciones estratégicas y colaboraciones globales.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Protocol Advancement */}
                  <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <Gift className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-red-500 font-bold font-orbitron text-base mb-2">Avance del Protocolo</h4>
                        <p className="text-white text-sm font-montserrat leading-relaxed">
                          Avances significativos en el desarrollo del protocolo Matrix descentralizado.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-black/70 border border-red-500/50 rounded-lg p-4 text-center">
                  <Gift className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-red-500 text-sm font-orbitron uppercase mb-1">Oferta</p>
                  <p className="text-white text-lg font-bold font-montserrat">
                    Hasta 20 X39 Matrix
                  </p>
                </div>
                <div className="bg-black/70 border border-red-500/50 rounded-lg p-4 text-center">
                  <Shield className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-red-500 text-sm font-orbitron uppercase mb-1">Tipo</p>
                  <p className="text-white text-lg font-bold font-montserrat">
                    Airdrop Limitado
                  </p>
                </div>
                <div className="bg-black/70 border border-red-500/50 rounded-lg p-4 text-center">
                  <Award className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-red-500 text-sm font-orbitron uppercase mb-1">Disponibilidad</p>
                  <p className="text-white text-lg font-bold font-montserrat">
                    Tiempo Limitado
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-red-500 neon-text-red font-orbitron mb-4 text-center">
                  Instrucciones para Reclamar
                </h3>
                <ol className="text-white space-y-3 font-montserrat">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">1.</span>
                    <span>Haz clic en el botón "Reclamar Tokens Gratuitos" a continuación</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">2.</span>
                    <span>Selecciona tu tipo de billetera e ingresa tu dirección</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">3.</span>
                    <span>Confirma tu registro para el airdrop promocional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">4.</span>
                    <span>Recibe hasta 20 tokens X39 Matrix asociados a tu billetera</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">5.</span>
                    <span>Solo una reclamación por visitante</span>
                  </li>
                </ol>
              </div>

              {/* Claim Counter */}
              <div className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-2 border-red-500/50 rounded-lg p-6 mb-8">
                <div className="text-center">
                  <p className="text-red-500 text-lg font-orbitron uppercase mb-2 neon-text-red">
                    Tokens Promocionales Reclamados
                  </p>
                  <p className="text-white text-4xl md:text-5xl font-bold font-montserrat animate-pulse-glow">
                    {tokensClaimed.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-sm font-montserrat mt-2">
                    tokens reclamados
                  </p>
                </div>
              </div>

              {/* Claim Status and Button */}
              <div className="space-y-4">
                {claimSuccess && (
                  <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-green-500 font-bold font-orbitron">¡Registro Exitoso!</p>
                      <p className="text-white text-sm font-montserrat">
                        Tu billetera ha sido registrada correctamente para recibir hasta 20 tokens X39 Matrix.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleClaimClick}
                  disabled={claimSuccess}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed border-2 border-red-500 disabled:border-gray-500 shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,0,0,0.7)] disabled:shadow-none font-orbitron text-lg uppercase tracking-wider"
                >
                  {claimSuccess ? (
                    'Billetera Ya Registrada'
                  ) : (
                    'Reclamar Tokens Gratuitos'
                  )}
                </button>

                {/* Security Features */}
                <div className="bg-black/70 border border-red-500/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-red-500 font-bold font-orbitron mb-2">Características de Seguridad</p>
                      <ul className="text-white text-sm space-y-1 font-montserrat">
                        <li>• Registro seguro de billetera con validación</li>
                        <li>• Información de billetera mantenida privada</li>
                        <li>• Límite de reclamación basado en IP para prevenir abuso</li>
                        <li>• Sistema de validación y verificación segura</li>
                        <li>• Protección anti-bot y limitación de tasa</li>
                        <li>• Una reclamación por visitante</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm text-center font-montserrat">
                  Esta es una oferta promocional limitada vinculada al evento de lanzamiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet Registration Modal */}
      <WalletRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}
