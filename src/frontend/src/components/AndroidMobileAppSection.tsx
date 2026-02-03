import React from 'react';
import { Smartphone, Download, Shield, Wallet, Gift } from 'lucide-react';
import { getCurrentOrigin } from '../utils/urls';

export function AndroidMobileAppSection() {
  // Build domain-safe APK download URL
  const apkDownloadUrl = `${getCurrentOrigin()}/downloads/x39-matrix-mobile.apk`;

  return (
    <section className="android-mobile-section py-16 px-4 bg-black/60">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-black/80 to-red-900/20 border-2 border-red-500/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          {/* Header with Triangle Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 -m-4 bg-red-500/20 rounded-full blur-2xl animate-glow-pulse" />
              <img 
                src="/assets/generated/triangle-eye-symbol-transparent.dim_128x128.png" 
                alt="X39 Matrix Mobile" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain animate-triangle-pulse relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 40px rgba(0, 100, 255, 0.5))'
                }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-red-500 neon-text-red font-orbitron text-center mb-4"
              style={{
                textShadow: '0 0 30px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.6)',
              }}>
              X39 Matrix Mobile
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 font-montserrat text-center">
              Aplicación Android Dedicada al Token
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Token Focus */}
            <div className="bg-black/40 border border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Smartphone className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                    Enfoque Exclusivo en Token
                  </h3>
                  <p className="text-gray-300 font-montserrat text-sm">
                    Interfaz simplificada centrada únicamente en la información del token X39 Matrix y funcionalidad de airdrop.
                  </p>
                </div>
              </div>
            </div>

            {/* Airdrop Claim */}
            <div className="bg-black/40 border border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Gift className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                    Reclamo de Airdrop
                  </h3>
                  <p className="text-gray-300 font-montserrat text-sm">
                    Sistema completo de reclamo para hasta 200,000 tokens con validación segura y procesamiento.
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Integration */}
            <div className="bg-black/40 border border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Wallet className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                    Integración de Billeteras
                  </h3>
                  <p className="text-gray-300 font-montserrat text-sm">
                    Compatible con ICP, Plug, Stoic, Bitfinity, Infinity y otras billeteras principales.
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-black/40 border border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                    Seguridad Mejorada
                  </h3>
                  <p className="text-gray-300 font-montserrat text-sm">
                    Validación segura de direcciones de billetera con protección anti-fraude y límites basados en IP.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* App Details */}
          <div className="bg-black/60 border border-red-500/40 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-red-500 mb-4 font-orbitron neon-text-red">
              Características de la Aplicación
            </h3>
            <ul className="space-y-3 text-gray-300 font-montserrat">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Estética Cyberpunk:</strong> Diseño Matrix negro-rojo-neón idéntico al sitio web</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Logo Triangle-Eye:</strong> Símbolo oficial como elemento central de marca</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Idioma Español:</strong> Todos los elementos de interfaz en español</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Selector de Billetera:</strong> Modal temático cyberpunk para selección y entrada de dirección</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Seguimiento de Progreso:</strong> Indicadores visuales para estado de reclamo y confirmación</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Diseño Responsivo:</strong> Se adapta a diferentes tamaños de pantalla Android</span>
              </li>
            </ul>
          </div>

          {/* Download Button */}
          <div className="flex flex-col items-center gap-4">
            <a
              href={apkDownloadUrl}
              download="x39-matrix-mobile.apk"
              className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-red-glow transition-all duration-300 border-2 border-red-500 hover:border-red-400 animate-glow-pulse"
              style={{
                textShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
              }}
            >
              <Download className="w-6 h-6" />
              <span className="font-orbitron uppercase tracking-wider">
                Descargar APK Ahora
              </span>
            </a>
            
            <p className="text-sm text-gray-400 font-montserrat text-center max-w-md">
              Descarga directa del archivo APK. Compatible con Android 8.0 y superior.
              Tamaño: ~15 MB
            </p>
          </div>

          {/* Installation Instructions */}
          <div className="mt-8 bg-black/40 border border-red-500/30 rounded-lg p-6">
            <h4 className="text-xl font-bold text-red-500 mb-4 font-orbitron">
              Instrucciones de Instalación
            </h4>
            <ol className="space-y-2 text-gray-300 font-montserrat text-sm">
              <li><strong className="text-red-400">1.</strong> Descarga el archivo APK usando el botón de arriba</li>
              <li><strong className="text-red-400">2.</strong> Habilita "Instalar desde fuentes desconocidas" en la configuración de Android</li>
              <li><strong className="text-red-400">3.</strong> Abre el archivo APK descargado</li>
              <li><strong className="text-red-400">4.</strong> Sigue las instrucciones en pantalla para completar la instalación</li>
              <li><strong className="text-red-400">5.</strong> Abre X39 Matrix Mobile y conecta tu billetera para reclamar tokens</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
