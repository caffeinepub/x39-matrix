interface PremiumSectionProps {
  title: string;
  subtitle: string;
  badge: string;
  fullContent: React.ReactNode;
}

function PremiumSection({ 
  title, 
  subtitle, 
  badge, 
  fullContent
}: PremiumSectionProps) {
  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Central Triangle-Eye Symbol with Enhanced Pulsating Animation */}
        <div className="flex justify-center mb-12 animate-fade-in">
          <div className="relative">
            <img
              src="/assets/generated/triangle-eye-symbol-transparent.dim_128x128.png"
              alt="Triangle Eye Symbol - x39Matrix Authority"
              className="w-32 h-32 md:w-40 md:h-40 animate-triangle-pulse"
              style={{
                filter: 'drop-shadow(0 0 25px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 50px rgba(255, 0, 0, 0.5))',
              }}
            />
            <div className="absolute inset-0 rounded-full bg-red-500/30 blur-3xl animate-glow-pulse" />
          </div>
        </div>

        <article className="bg-[#1A1A1A] rounded-lg p-8 md:p-12 border-2 border-red-500/50 hover:border-red-500/70 transition-all duration-300 hover:shadow-red-glow">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-red-500 bg-red-500/10 rounded-full uppercase tracking-wider neon-text-red">
              {badge}
            </span>
          </div>

          <div className="space-y-8 animate-fade-in">
            <div className="text-center py-6 border-b border-red-500/20">
              <h2 className="text-4xl md:text-5xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
                {title}
              </h2>
              <p className="text-xl text-white font-bold">
                {subtitle}
              </p>
            </div>

            {fullContent}
          </div>
        </article>
      </div>
    </section>
  );
}

export function PremiumICPSections() {
  return (
    <>
      <AvanceExclusivoICPSection />
      <InformacionEstrategicaICPSection />
    </>
  );
}

export function AvanceExclusivoICPSection() {
  const fullContent = (
    <>
      {/* Extroverted Authoritative Messaging */}
      <div className="border-t border-red-500/20 pt-6 bg-gradient-to-br from-red-500/20 to-transparent p-8 rounded-lg mb-6">
        <div className="text-center mb-6">
          <h3 className="text-3xl md:text-4xl font-bold text-red-500 neon-text-red font-orbitron mb-4 uppercase tracking-wide">
            x39Matrix DOMINA EL ECOSISTEMA ICP
          </h3>
          <p className="text-xl md:text-2xl text-white font-bold mb-3">
            Autoridad Absoluta en el Protocolo Descentralizado
          </p>
          <p className="text-lg text-red-400 font-semibold italic">
            x39Matrix - Protocolo Matrix: La Fuerza Descentralizada Definitiva
          </p>
        </div>
      </div>

      <div className="border-t border-red-500/20 pt-6">
        <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
          Chain Fusion: La Revolución del DOMINIO Interoperable
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-semibold">
          Chain Fusion representa el avance más significativo en interoperabilidad blockchain. 
          A diferencia de soluciones tradicionales, Chain Fusion permite que contratos inteligentes en ICP 
          <span className="text-red-500 font-bold uppercase"> DOMINEN DIRECTAMENTE</span> Bitcoin, Ethereum y otras blockchains 
          sin intermediarios. Es <span className="text-red-500 font-bold uppercase">PODER ABSOLUTO</span> de interoperabilidad.
        </p>
      </div>

      <div className="border-t border-red-500/20 pt-6">
        <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
          ckBTC: Bitcoin Nativo - CONTROL Total en ICP
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-semibold">
          Con más de $28M en volumen semanal, ckBTC (chain-key Bitcoin) está demostrando ser la implementación 
          <span className="text-red-500 font-bold uppercase"> MÁS SEGURA Y PODEROSA</span> de Bitcoin en una blockchain 
          de contratos inteligentes. Sin bridges, sin custodios centralizados, solo criptografía de umbral que garantiza 
          <span className="text-red-500 font-bold uppercase"> DOMINIO ABSOLUTO</span>: cada ckBTC respaldado 1:1 por BTC real.
        </p>
      </div>

      <div className="border-t border-red-500/20 pt-6">
        <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
          Proyección de Precio 2025 - DOMINIO del Mercado
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-semibold">
          Basándonos en métricas on-chain y adopción institucional, proyectamos que ICP 
          <span className="text-red-500 font-bold uppercase"> DOMINARÁ</span> alcanzando entre $25-$40 en Q2 2025, 
          con potencial de $60-$80 si se confirman las alianzas institucionales. El TVL en DeFi nativo de ICP 
          <span className="text-red-500 font-bold uppercase"> SUPERARÁ</span> los $500M en el mismo período.
        </p>
      </div>

      <div className="border-t border-red-500/20 pt-6">
        <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
          Oportunidades de Inversión - ACCESO EXCLUSIVO al Poder
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-semibold">
          Los protocolos DeFi nativos de ICP ofrecen yields superiores al 15% APY con 
          <span className="text-red-500 font-bold uppercase"> RIESGO MÍNIMO Y CONTROL MÁXIMO</span>. 
          ICPSwap, Sonic DEX y otros protocolos están ganando tracción, con volúmenes que crecen 40% mensual. 
          El staking de ICP en neurons ofrece hasta 20% APY - 
          <span className="text-red-500 font-bold uppercase"> DOMINA TU RETORNO</span>.
        </p>
      </div>
    </>
  );

  return (
    <PremiumSection
      title="Avance Exclusivo de ICP"
      subtitle="Acceso Exclusivo al Poder Supremo de x39Matrix"
      badge="Premium ICP"
      fullContent={fullContent}
    />
  );
}

export function InformacionEstrategicaICPSection() {
  const fullContent = (
    <>
      {/* Extroverted Authoritative Messaging */}
      <div className="border-t border-red-500/20 pt-6 bg-gradient-to-br from-red-500/20 to-transparent p-8 rounded-lg mb-6">
        <div className="text-center mb-6">
          <h3 className="text-3xl md:text-4xl font-bold text-red-500 neon-text-red font-orbitron mb-4 uppercase tracking-wide">
            ESTRATEGIA SUPREMA x39Matrix
          </h3>
          <p className="text-xl md:text-2xl text-white font-bold mb-3">
            Controla el Futuro Descentralizado
          </p>
          <p className="text-lg text-red-400 font-semibold italic">
            Información Avanzada x39Matrix - Autoridad Estratégica Total
          </p>
        </div>
      </div>

      <div className="border-t border-red-500/20 pt-6">
        <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
          Partnerships Estratégicos - DOMINIO Institucional
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-semibold">
          Fuentes cercanas a DFINITY confirman negociaciones avanzadas con tres instituciones financieras Fortune 500 
          para implementar soluciones de identidad digital soberana. Además, dos gobiernos latinoamericanos están evaluando ICP 
          para sistemas de votación electrónica. Es <span className="text-red-500 font-bold uppercase">DOMINIO INSTITUCIONAL ABSOLUTO</span>.
        </p>
      </div>

      <div className="border-t border-red-500/20 pt-6">
        <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
          Roadmap Técnico - CONTROL del Futuro 2025-2026
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-semibold">
          El roadmap interno de DFINITY incluye: (1) Integración nativa con Ethereum L2s mediante Chain Fusion 2.0 - 
          <span className="text-red-500 font-bold uppercase"> DOMINIO TOTAL</span>, 
          (2) Implementación de zkSNARKs para privacidad transaccional - 
          <span className="text-red-500 font-bold uppercase"> CONTROL ABSOLUTO</span>, 
          (3) Reducción de costos de computación en 70% - 
          <span className="text-red-500 font-bold uppercase"> EFICIENCIA SUPREMA</span>, 
          (4) Lanzamiento de ICP Mobile SDK, (5) Integración con AWS y Azure para hybrid cloud computing.
        </p>
      </div>

      <div className="border-t border-red-500/20 pt-6">
        <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
          Adopción Empresarial - DOMINIO del Mercado Institucional
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-semibold">
          DFINITY está ejecutando una estrategia de <span className="text-red-500 font-bold uppercase">DOMINACIÓN EMPRESARIAL</span> 
          en tres fases: (1) Proof of Concepts con Fortune 500 (en curso), (2) Implementaciones piloto en producción (Q2 2025), 
          (3) Despliegue masivo y migración de infraestructura legacy (Q4 2025 - 2026). Se espera que al menos 5 empresas Fortune 500 
          anuncien públicamente su uso de ICP antes de junio 2025 - 
          <span className="text-red-500 font-bold uppercase">DOMINIO CONFIRMADO</span>.
        </p>
      </div>

      <div className="border-t border-red-500/20 pt-6">
        <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
          Domina el Protocolo Matrix con Inteligencia x39Matrix
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-semibold">
          El ecosistema ICP cuenta con más de 2,000 desarrolladores activos mensuales (crecimiento 150% YoY), 
          450+ dApps en producción, y 15M+ transacciones mensuales. El costo promedio por transacción es $0.0001, 
          <span className="text-red-500 font-bold uppercase"> 100X MÁS BARATO</span> que Ethereum. 
          La velocidad de finalización es de 1-2 segundos - 
          <span className="text-red-500 font-bold uppercase">DOMINIO TÉCNICO ABSOLUTO</span>.
        </p>
      </div>

      <div className="border-t border-red-500/20 pt-6">
        <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
          Proyección de Valoración - DOMINIO a Largo Plazo 2025-2030
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-semibold">
          Escenario conservador: ICP alcanza $50-$80 en 2025, $150-$200 en 2027, $300-$500 en 2030. 
          Escenario optimista (<span className="text-red-500 font-bold uppercase">DOMINIO MASIVO</span>): 
          $100-$150 en 2025, $400-$600 en 2027, $1,000-$1,500 en 2030. 
          Estos números asumen <span className="text-red-500 font-bold uppercase">DOMINIO INSTITUCIONAL CONFIRMADO</span>, 
          TVL en DeFi mayor a $5B, 100M+ usuarios de dApps en ICP, e integración exitosa con sistemas financieros tradicionales.
        </p>
      </div>

      <div className="border-t border-red-500/20 pt-6">
        <h3 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-3 uppercase">
          Oportunidades Pre-Públicas - ACCESO EXCLUSIVO al Poder
        </h3>
        <p className="text-white text-base md:text-lg leading-relaxed font-montserrat font-semibold">
          Varios proyectos del ecosistema ICP están en rondas de financiación privada antes de lanzamientos públicos: 
          (1) Protocolo DeFi con $10M en funding confirmado, lanzamiento Q1 2025 - 
          <span className="text-red-500 font-bold uppercase">DOMINIO DEFI</span>, 
          (2) Plataforma de gaming Web3 con partnership con estudio AAA - 
          <span className="text-red-500 font-bold uppercase">DOMINIO GAMING</span>, 
          (3) Solución de identidad digital para empresas con clientes Fortune 500 confirmados - 
          <span className="text-red-500 font-bold uppercase">DOMINIO EMPRESARIAL</span>. 
          Acceso a estas oportunidades requiere conexiones directas con VCs del ecosistema ICP.
        </p>
      </div>
    </>
  );

  return (
    <PremiumSection
      title="Información Estratégica Avanzada de ICP"
      subtitle="Domina el Protocolo Matrix con Inteligencia x39Matrix"
      badge="Premium ICP"
      fullContent={fullContent}
    />
  );
}
