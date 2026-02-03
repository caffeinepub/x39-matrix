import React from 'react';
import { useLanguage } from './LanguageContext';

export function RedditPromoSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-black py-20 px-4" aria-label="Mensaje promocional Reddit">
      <div className="max-w-6xl mx-auto">
        <article className="bg-[#1A1A1A] rounded-lg p-8 md:p-12 border border-red-500/30 hover:border-red-500/60 transition-all duration-300 hover:shadow-red-glow">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 neon-text-red font-orbitron mb-2 animate-title-glow">
              Reddit Promo: X39 Matrix
            </h2>
            <p className="text-gray-400 text-sm font-mono">
              Mensaje formateado para Reddit con estilo Matrix
            </p>
          </div>

          {/* Reddit Message Content */}
          <div className="space-y-8 font-mono text-sm md:text-base leading-relaxed">
            {/* Section 1: Actualizaciones ICP */}
            <div className="border border-red-500/20 rounded-lg p-6 bg-black/50">
              <h3 className="text-xl md:text-2xl font-bold text-red-500 neon-text-red mb-4 animate-matrix-flicker">
                ## Actualizaciones ICP
              </h3>
              
              <div className="matrix-separator my-4" />
              
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="text-red-500 font-bold">ICP</span> está revolucionando la infraestructura descentralizada con{' '}
                  <span className="text-red-500 font-bold">Chain Fusion</span>, permitiendo interoperabilidad nativa entre blockchains.
                </p>
                
                <p>
                  <span className="text-red-500 font-bold">ckBTC</span> alcanza <span className="text-red-500 font-bold">$28M</span> en volumen semanal,
                  demostrando la adopción real de Bitcoin descentralizado en el ecosistema{' '}
                  <span className="text-red-500 font-bold">ICP</span>.
                </p>
                
                <p>
                  Alianzas estratégicas con <span className="text-red-500 font-bold">Microsoft Azure</span> y{' '}
                  <span className="text-red-500 font-bold">Google Cloud</span> posicionan a{' '}
                  <span className="text-red-500 font-bold">ICP</span> como la infraestructura preferida para aplicaciones empresariales descentralizadas.
                </p>
                
                <p>
                  El roadmap <span className="text-red-500 font-bold">Q1 2026</span> incluye expansiones{' '}
                  <span className="text-red-500 font-bold">Chain Fusion</span> y herramientas de privacidad avanzadas.
                </p>
                
                <p>
                  <span className="text-red-500 font-bold">Caffeine AI</span> atrae más de{' '}
                  <span className="text-red-500 font-bold">2,000 desarrolladores</span> construyendo sobre{' '}
                  <span className="text-red-500 font-bold">ICP</span>, acelerando la adopción de aplicaciones soberanas.
                </p>
              </div>
            </div>

            {/* Animated Separator */}
            <div className="flex items-center justify-center my-8">
              <div className="matrix-separator-animated" />
            </div>

            {/* Section 2: X39 Matrix Launch */}
            <div className="border border-red-500/20 rounded-lg p-6 bg-black/50">
              <h3 className="text-xl md:text-2xl font-bold text-red-500 neon-text-red mb-4 animate-matrix-flicker">
                ## ¡X39 Matrix lanzado con nuevo logo triangular!
              </h3>
              
              <div className="matrix-separator my-4" />
              
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="text-red-500 font-bold">X39 Matrix</span> se lanza oficialmente con su nuevo{' '}
                  <span className="text-red-500 font-bold">logo triangular</span>, representando la visión descentralizada
                  del <span className="text-red-500 font-bold">Protocolo Matrix</span> en el ecosistema{' '}
                  <span className="text-red-500 font-bold">ICP</span>.
                </p>
                
                <p>
                  El token <span className="text-red-500 font-bold">X39 Matrix</span> tiene{' '}
                  <span className="text-red-500 font-bold">alianzas con ICP y sus socios</span>, posicionándose
                  como un token DeFi clave en el ecosistema descentralizado.
                </p>
                
                <p>
                  Visita <span className="text-red-500 font-bold">x39matrix.com</span> para descubrir más sobre
                  el token, el airdrop promocional limitado, y las contribuciones al ecosistema ICP.
                </p>
                
                <p>
                  <span className="text-red-500 font-bold">X39 Matrix</span> se enfoca en{' '}
                  <span className="text-red-500 font-bold">rendimiento</span>,{' '}
                  <span className="text-red-500 font-bold">interoperabilidad</span>,{' '}
                  <span className="text-red-500 font-bold">velocidad de puente</span>, y{' '}
                  <span className="text-red-500 font-bold">soluciones de menor costo</span> para el ecosistema ICP.
                </p>
              </div>
            </div>

            {/* Links Section */}
            <div className="border-t border-red-500/20 pt-6 mt-8">
              <p className="text-gray-400 mb-4 font-mono text-sm">
                🔗 <span className="text-red-500 font-bold">Enlaces:</span>
              </p>
              <div className="space-y-2 text-gray-300">
                <p>
                  • Sitio web:{' '}
                  <a
                    href="https://x39matrix.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 transition-colors neon-text-red underline"
                  >
                    https://x39matrix.com
                  </a>
                </p>
                <p>
                  • Contacto:{' '}
                  <span className="text-red-500 neon-text-red">suporte@x39.com</span>
                </p>
              </div>
            </div>

            {/* Hashtags */}
            <div className="border-t border-red-500/20 pt-6 mt-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {['#ICP', '#X39Matrix', '#DFINITY', '#ChainFusion', '#Web3', '#MatrixProtocol', '#DeFi', '#CryptoNews'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold neon-text-red border border-red-500/30 hover:bg-red-500/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Note */}
            <div className="border-t border-red-500/20 pt-6 mt-8 text-center">
              <p className="text-gray-500 text-xs font-mono italic">
                Si no somos una familia, somos amigos. 💀✨
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
