import React from 'react';

export function DavosOutcomesReportSection() {
  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Informe de Resultados de Davos Special Container */}
        <div className="relative bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A] rounded-lg border-4 border-red-500/70 p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,0,0.3)] overflow-hidden">
          {/* Circuit Pattern Border - Top */}
          <div className="absolute top-0 left-0 right-0 h-8 opacity-30">
            <img 
              src="/assets/generated/davos-circuit-pattern.dim_800x200.png" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Circuit Pattern Border - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 opacity-30 transform rotate-180">
            <img 
              src="/assets/generated/davos-circuit-pattern.dim_800x200.png" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Digital illumination effects */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }} />

          {/* Container Title */}
          <div className="relative text-center mb-12 pb-6 border-b-2 border-red-500/50">
            <h1 className="text-3xl md:text-5xl font-bold text-red-500 font-orbitron animate-title-glow uppercase tracking-wider">
              Informe de Resultados de Davos
            </h1>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-16 h-1 bg-red-500 rounded-full animate-pulse-glow" />
              <div className="w-8 h-1 bg-red-500 rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
              <div className="w-16 h-1 bg-red-500 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          <article className="relative bg-black/50 rounded-lg p-6 md:p-10 border border-red-500/30">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-red-500 bg-red-500/10 rounded-full uppercase tracking-wider neon-text-red">
                Análisis Objetivo
              </span>
            </div>

            <div className="space-y-8 animate-fade-in">
              {/* Header */}
              <div className="relative text-center py-8 border-b border-red-500/20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <img 
                    src="/assets/generated/davos-circuit-pattern.dim_800x200.png" 
                    alt="" 
                    className="w-full h-full object-cover animate-pulse-slow"
                    style={{ animationDuration: '3s' }}
                  />
                </div>
                
                <h2 className="relative text-2xl md:text-4xl font-bold text-red-500 font-orbitron mb-4 animate-title-glow">
                  Reflexiones sobre el Foro Económico Mundial
                </h2>
                <p className="relative text-lg md:text-xl text-white font-semibold">
                  Análisis objetivo de los acontecimientos recientes y perspectivas de la comunidad
                </p>
              </div>

              {/* Main Content */}
              <div className="border-t border-red-500/20 pt-6">
                <h3 className="text-xl md:text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
                  Contexto del Evento
                </h3>
                <p className="text-white text-sm md:text-base leading-relaxed font-montserrat font-semibold mb-4">
                  El Foro Económico Mundial en Davos ha concluido recientemente, reuniendo a líderes globales, 
                  empresarios y representantes de diversos sectores para discutir los desafíos económicos y 
                  tecnológicos del futuro. Entre los temas destacados se encontraron la transformación digital, 
                  la sostenibilidad y el papel de las nuevas tecnologías en la economía global.
                </p>
              </div>

              <div className="border-t border-red-500/20 pt-6">
                <h3 className="text-xl md:text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
                  Participación de Figuras Destacadas
                </h3>
                <p className="text-white text-sm md:text-base leading-relaxed font-montserrat font-semibold mb-4">
                  Entre los participantes del foro se encontraba Donald Trump, quien presentó su visión sobre 
                  políticas económicas y comerciales. Su participación generó diversas reacciones en la comunidad 
                  internacional, reflejando las diferentes perspectivas sobre el futuro de la economía global y 
                  las relaciones comerciales internacionales.
                </p>
              </div>

              <div className="border-t border-red-500/20 pt-6">
                <h3 className="text-xl md:text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
                  Reflexiones de la Comunidad Cripto
                </h3>
                <p className="text-white text-sm md:text-base leading-relaxed font-montserrat font-semibold mb-4">
                  La comunidad de criptomonedas y tecnología blockchain observó el evento con interés particular, 
                  especialmente en lo relacionado con las discusiones sobre innovación tecnológica y sistemas 
                  financieros descentralizados. Muchos miembros de la comunidad expresaron sus opiniones sobre 
                  la necesidad de mayor adopción de tecnologías descentralizadas y la importancia de mantener 
                  la independencia de los sistemas blockchain frente a las estructuras tradicionales.
                </p>
              </div>

              <div className="border-t border-red-500/20 pt-6">
                <h3 className="text-xl md:text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
                  Perspectivas sobre Descentralización
                </h3>
                <p className="text-white text-sm md:text-base leading-relaxed font-montserrat font-semibold mb-4">
                  Los debates en Davos sobre el futuro de la economía digital han reforzado la convicción de 
                  muchos en la comunidad cripto sobre la importancia de los sistemas descentralizados. 
                  Proyectos como el Internet Computer Protocol (ICP) continúan desarrollando infraestructuras 
                  que ofrecen alternativas descentralizadas a los modelos tradicionales, demostrando que la 
                  tecnología blockchain tiene un papel fundamental en el futuro digital.
                </p>
              </div>

              <div className="border-t border-red-500/20 pt-6">
                <h3 className="text-xl md:text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
                  Conclusión: Mirando hacia el Futuro
                </h3>
                <p className="text-white text-sm md:text-base leading-relaxed font-montserrat font-semibold mb-4">
                  Los acontecimientos en Davos sirven como recordatorio de que el diálogo global sobre tecnología 
                  y economía continúa evolucionando. La comunidad cripto permanece comprometida con el desarrollo 
                  de soluciones descentralizadas que ofrezcan mayor transparencia, seguridad y accesibilidad para 
                  todos. El camino hacia un futuro más descentralizado requiere colaboración, innovación continua 
                  y un compromiso firme con los principios fundamentales de la tecnología blockchain.
                </p>
              </div>

              {/* Community Reflection Block */}
              <div className="border-t-4 border-red-500/50 pt-8 bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent p-6 md:p-8 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-transparent to-red-500/30 animate-pulse-slow" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-red-500 neon-text-red font-orbitron mb-6 uppercase text-center animate-title-glow">
                    Reflexión de la Comunidad
                  </h3>
                  
                  <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-bold text-center mb-6">
                    La comunidad x39 Dark continúa enfocada en proporcionar información objetiva y análisis 
                    profesional sobre el ecosistema cripto y las tecnologías descentralizadas. Nuestro compromiso 
                    es mantener a nuestra comunidad informada sobre los desarrollos relevantes en el espacio 
                    blockchain, siempre desde una perspectiva equilibrada y constructiva.
                  </p>

                  <p className="text-xl md:text-2xl leading-relaxed font-montserrat font-bold text-center text-red-500 neon-text-red uppercase tracking-wide animate-pulse-glow">
                    Construyendo el futuro descentralizado, juntos.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
