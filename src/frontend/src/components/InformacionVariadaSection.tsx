import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { ChopinVideoPlayer } from './ChopinVideoPlayer';

export function InformacionVariadaSection() {
  const { t } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoComplete = () => {
    setIsVideoPlaying(false);
  };

  return (
    <>
      <section id="informacion-variada" className="relative w-full min-h-screen bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <article className="bg-[#1A1A1A] rounded-lg p-8 md:p-12 border border-red-500/30 hover:border-red-500/60 transition-all duration-300 hover:shadow-red-glow">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-red-500 bg-red-500/10 rounded-full uppercase tracking-wider neon-text-red">
                Información Variada
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white font-orbitron mb-4">
              Contenido Adicional y Recursos
            </h2>
            
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Explora contenido diverso y recursos adicionales sobre el ecosistema ICP, 
              tecnología blockchain, y el mundo de las criptomonedas.
            </p>

            {/* Video Player Button */}
            <div className="mt-8 p-6 bg-black/50 rounded-lg border border-red-500/20">
              <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-4">
                🎵 Experiencia Musical
              </h3>
              <p className="text-gray-300 text-base mb-6 leading-relaxed font-montserrat">
                Disfruta de una experiencia audiovisual única con Chopin 9. 
                El video se reproducirá como fondo durante 45 segundos.
              </p>
              
              <button
                onClick={handlePlayVideo}
                disabled={isVideoPlaying}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-black hover:text-red-600 text-white font-bold text-lg uppercase tracking-wider shadow-2xl neon-button border-2 border-red-600 transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Reproducir video Chopin 9"
              >
                <span className="text-2xl">▶</span>
                <span>Reproducir video Chopin 9</span>
              </button>
            </div>

            {/* x39 CLI and APIs Block */}
            <div className="mt-8 p-6 bg-black/50 rounded-lg border border-red-500/20">
              <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-4">
                x39 CLI y APIs
              </h3>
              
              <div className="space-y-4 text-white font-montserrat">
                <p className="text-base leading-relaxed">
                  <strong className="text-red-400">¿Qué son las APIs?</strong> Las APIs (Application Programming Interfaces) 
                  son interfaces que permiten que diferentes aplicaciones se comuniquen entre sí. En el contexto de blockchain 
                  e ICP, las APIs facilitan la integración de servicios descentralizados con aplicaciones tradicionales.
                </p>

                <p className="text-base leading-relaxed">
                  <strong className="text-red-400">x39 CLI</strong> es una herramienta de línea de comandos que automatiza 
                  la sincronización de documentación entre tu código fuente y plataformas como GitBook. Esto significa que 
                  puedes mantener tu documentación siempre actualizada sin esfuerzo manual, mejorando la productividad y 
                  reduciendo errores.
                </p>

                <div className="bg-black/30 p-4 rounded border border-red-500/10">
                  <h4 className="text-lg font-bold text-red-400 font-orbitron mb-3">
                    Beneficios para Desarrolladores ICP y GitBook:
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Sincronización automática de documentación técnica</li>
                    <li>Reducción de tiempo en tareas repetitivas de actualización</li>
                    <li>Integración perfecta con flujos de trabajo de desarrollo</li>
                    <li>Documentación siempre actualizada y consistente</li>
                    <li>Soporte para múltiples formatos y plataformas</li>
                  </ul>
                </div>

                <div className="pt-4 space-y-3">
                  <h4 className="text-lg font-bold text-red-400 font-orbitron mb-2">
                    Recursos y Ejemplos:
                  </h4>
                  <div className="space-y-2">
                    <p className="text-base">
                      <span className="text-gray-400">→</span>{' '}
                      <a 
                        href="https://phantom.app/learn/developers/api-reference" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-500 hover:text-red-400 neon-text-red transition-colors duration-300 underline decoration-red-500/30 hover:decoration-red-500"
                      >
                        Phantom App - Referencia de API
                      </a>
                    </p>
                    <p className="text-base">
                      <span className="text-gray-400">→</span>{' '}
                      <a 
                        href="https://swagger.io/specification/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-500 hover:text-red-400 neon-text-red transition-colors duration-300 underline decoration-red-500/30 hover:decoration-red-500"
                      >
                        OpenAPI Specification
                      </a>
                    </p>
                    <p className="text-base">
                      <span className="text-gray-400">→</span>{' '}
                      <a 
                        href="https://github.com/x39/cli" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-500 hover:text-red-400 neon-text-red transition-colors duration-300 underline decoration-red-500/30 hover:decoration-red-500"
                      >
                        x39 CLI - Repositorio GitHub
                      </a>
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-red-500/20">
                  <p className="text-sm text-gray-400 italic">
                    Para ver la web actual o insertar ejemplos, visita{' '}
                    <a 
                      href="https://x39.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 neon-text-red transition-colors duration-300 underline decoration-red-500/30 hover:decoration-red-500 font-semibold"
                    >
                      https://x39.org
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Content */}
            <div className="mt-8 space-y-6">
              <div className="border-t border-red-500/20 pt-6">
                <h3 className="text-xl font-bold text-red-400 font-orbitron mb-3">
                  Recursos Educativos
                </h3>
                <p className="text-white text-base leading-relaxed font-montserrat">
                  Accede a guías completas sobre staking de ICP, configuración de neuronas, 
                  y estrategias de inversión en el ecosistema Internet Computer.
                </p>
              </div>

              <div className="border-t border-red-500/20 pt-6">
                <h3 className="text-xl font-bold text-red-400 font-orbitron mb-3">
                  Comunidad y Soporte
                </h3>
                <p className="text-white text-base leading-relaxed font-montserrat">
                  Únete a nuestra comunidad de entusiastas de ICP y blockchain. 
                  Comparte conocimientos, estrategias y mantente actualizado con las últimas noticias.
                </p>
              </div>

              <div className="border-t border-red-500/20 pt-6">
                <h3 className="text-xl font-bold text-red-400 font-orbitron mb-3">
                  Herramientas y Análisis
                </h3>
                <p className="text-white text-base leading-relaxed font-montserrat">
                  Explora herramientas avanzadas de análisis on-chain, seguimiento de ballenas, 
                  y métricas del ecosistema ICP para tomar decisiones informadas.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Video Player Overlay */}
      <ChopinVideoPlayer 
        isPlaying={isVideoPlaying} 
        onComplete={handleVideoComplete} 
      />
    </>
  );
}
