import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface AndroidDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AndroidDownloadModal({ isOpen, onClose }: AndroidDownloadModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-black via-gray-900 to-black border-2 border-red-600 rounded-lg shadow-2xl shadow-red-600/50">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-400 hover:bg-red-950/30 rounded-full transition-all duration-300 z-10"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-red-600/30">
          <h2 className="text-3xl font-bold text-center font-orbitron text-red-500 animate-pulse-slow">
            📱 {t('androidDownload.title')}
          </h2>
          <p className="mt-2 text-center text-gray-300 font-montserrat">
            {t('androidDownload.subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Important Notice */}
          <div className="p-4 bg-red-950/30 border border-red-600/50 rounded-lg">
            <h3 className="text-xl font-bold text-red-500 font-orbitron mb-2">
              ⚠️ Nota Importante
            </h3>
            <p className="text-gray-300 font-montserrat leading-relaxed">
              x39 Dark Mobile es una <strong className="text-red-400">Aplicación Web Progresiva (PWA)</strong> que funciona 
              completamente offline una vez instalada. No es un APK nativo, pero ofrece una experiencia idéntica a una app 
              nativa de Android con todas las funcionalidades.
            </p>
          </div>

          {/* Installation Instructions */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-500 font-orbitron">
              📲 Instrucciones de Instalación
            </h3>
            
            <div className="space-y-3">
              <div className="p-4 bg-gray-900/50 border border-red-600/30 rounded-lg">
                <h4 className="text-lg font-bold text-red-400 font-orbitron mb-2">
                  Paso 1: Abrir en Chrome/Firefox
                </h4>
                <p className="text-gray-300 font-montserrat">
                  Visita <a href="https://x39dark.com" className="text-red-500 hover:text-red-400 underline">
                    https://x39dark.com
                  </a> desde tu navegador móvil (Chrome o Firefox recomendado).
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 border border-red-600/30 rounded-lg">
                <h4 className="text-lg font-bold text-red-400 font-orbitron mb-2">
                  Paso 2: Agregar a Pantalla de Inicio
                </h4>
                <p className="text-gray-300 font-montserrat mb-2">
                  <strong>En Chrome:</strong> Toca el menú (⋮) → "Agregar a pantalla de inicio"
                </p>
                <p className="text-gray-300 font-montserrat">
                  <strong>En Firefox:</strong> Toca el menú (⋮) → "Instalar" o "Agregar a pantalla de inicio"
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 border border-red-600/30 rounded-lg">
                <h4 className="text-lg font-bold text-red-400 font-orbitron mb-2">
                  Paso 3: Confirmar Instalación
                </h4>
                <p className="text-gray-300 font-montserrat">
                  Confirma la instalación y el icono de x39 Dark Mobile aparecerá en tu pantalla de inicio.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 border border-red-600/30 rounded-lg">
                <h4 className="text-lg font-bold text-red-400 font-orbitron mb-2">
                  Paso 4: Abrir la App
                </h4>
                <p className="text-gray-300 font-montserrat">
                  Toca el icono para abrir x39 Dark Mobile. La app funcionará completamente offline después de la primera carga.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-500 font-orbitron">
              ✨ Características de la App
            </h3>
            <ul className="space-y-2 text-gray-300 font-montserrat">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong className="text-red-400">Funcionamiento Offline Completo:</strong> Accede a todo el contenido sin conexión a internet</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong className="text-red-400">Contenido Completo:</strong> Todas las noticias ICP, contenido premium, Dark Web, y artículos</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong className="text-red-400">Video Chopin 9:</strong> Reproductor de video integrado con contenido local</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong className="text-red-400">Tema Matrix:</strong> Diseño cyberpunk negro-rojo-neón idéntico al sitio web</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong className="text-red-400">Multi-idioma:</strong> Soporte para Español, Inglés, Alemán, Chino, y Japonés</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong className="text-red-400">Responsive:</strong> Optimizado para teléfonos y tablets Android</span>
              </li>
            </ul>
          </div>

          {/* Content Included */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-500 font-orbitron">
              📚 Contenido Incluido
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-gray-900/50 border border-red-600/30 rounded">
                <p className="text-red-400 font-orbitron font-bold">✓ Noticias ICP</p>
              </div>
              <div className="p-3 bg-gray-900/50 border border-red-600/30 rounded">
                <p className="text-red-400 font-orbitron font-bold">✓ El Oráculo de Davos</p>
              </div>
              <div className="p-3 bg-gray-900/50 border border-red-600/30 rounded">
                <p className="text-red-400 font-orbitron font-bold">✓ Contenido Premium</p>
              </div>
              <div className="p-3 bg-gray-900/50 border border-red-600/30 rounded">
                <p className="text-red-400 font-orbitron font-bold">✓ Dark Web Analysis</p>
              </div>
              <div className="p-3 bg-gray-900/50 border border-red-600/30 rounded">
                <p className="text-red-400 font-orbitron font-bold">✓ Información Variada</p>
              </div>
              <div className="p-3 bg-gray-900/50 border border-red-600/30 rounded">
                <p className="text-red-400 font-orbitron font-bold">✓ Video Chopin 9</p>
              </div>
              <div className="p-3 bg-gray-900/50 border border-red-600/30 rounded">
                <p className="text-red-400 font-orbitron font-bold">✓ x39 CLI y APIs</p>
              </div>
              <div className="p-3 bg-gray-900/50 border border-red-600/30 rounded">
                <p className="text-red-400 font-orbitron font-bold">✓ Reddit Promo</p>
              </div>
            </div>
          </div>

          {/* Final Message */}
          <div className="p-4 bg-gradient-to-r from-red-950/30 to-black border border-red-600/50 rounded-lg">
            <p className="text-center text-red-500 font-orbitron font-bold text-lg animate-pulse-slow">
              "Si no somos una familia, somos amigos."
            </p>
            <p className="text-center text-gray-400 font-montserrat mt-2">
              Contacto: <a href="mailto:suporte@x39.com" className="text-red-500 hover:text-red-400">suporte@x39.com</a>
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <a
              href="https://x39dark.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-orbitron font-bold rounded-lg shadow-lg shadow-red-600/50 hover:shadow-red-600/70 transition-all duration-300 transform hover:scale-105"
            >
              🚀 Abrir x39dark.com para Instalar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
