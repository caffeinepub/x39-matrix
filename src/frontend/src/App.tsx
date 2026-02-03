import React, { useEffect, useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { HolographicHero } from './components/HolographicHero';
import { LiveICPPrice } from './components/LiveICPPrice';
import { TrochoDriveElement } from './components/TrochoDriveElement';
import { TokenAnalyticsPanel } from './components/TokenAnalyticsPanel';
import { PerformanceMetricsDashboard } from './components/PerformanceMetricsDashboard';
import { CrossPlatformPromotionalBanner } from './components/CrossPlatformPromotionalBanner';
import { X39TokenPromotionalAirdropSection } from './components/X39TokenPromotionalAirdropSection';
import { X39TokenRegistrationSection } from './components/X39TokenRegistrationSection';
import { ElementChatSection } from './components/ElementChatSection';
import { DavosOutcomesReportSection } from './components/DavosOutcomesReportSection';
import { PremiumICPSections } from './components/PremiumICPSections';
import { GraficosSection } from './components/GraficosSection';
import { InformacionVariadaSection } from './components/InformacionVariadaSection';
import { RedditPromoSection } from './components/RedditPromoSection';
import { AndroidMobileAppSection } from './components/AndroidMobileAppSection';
import { LanguageProvider } from './components/LanguageContext';
import { AndroidDownloadButton } from './components/AndroidDownloadButton';
import { ConnectivityDiagnostics } from './components/ConnectivityDiagnostics';
import { Menu, X, Globe, Award, Activity } from 'lucide-react';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Check for diagnostics URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('diagnostics') === '1') {
      setShowDiagnostics(true);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
  ];

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  return (
    <LanguageProvider>
      <div className="app-container min-h-screen bg-black text-white relative overflow-x-hidden">
        {/* Three.js Holographic Background */}
        <HolographicHero />

        {/* Background Image - pointer-events-none to prevent click blocking */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/generated/holographic-matrix-background.dim_1920x1080.png)',
            filter: 'brightness(0.3)',
          }}
        />

        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between py-4">
              {/* Official x39Matrix Header Logo - Competition Ready */}
              <div className="flex flex-col items-center mb-3">
                <div className="relative">
                  {/* Enhanced pulsating glow animation */}
                  <div className="absolute inset-0 -m-3 bg-red-500/30 rounded-full blur-2xl animate-glow-pulse pointer-events-none" />
                  
                  {/* Official x39Matrix Logo with holographic effects */}
                  <img 
                    src="/assets/generated/triangle-holographic-3d.dim_400x400.png" 
                    alt="x39Matrix Official Logo - Caffeine AI Builds" 
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain animate-triangle-pulse relative z-10"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.9)) drop-shadow(0 0 40px rgba(0, 100, 255, 0.6))'
                    }}
                  />
                </div>
                
                {/* Brand Text - x39Matrix with Competition Badge */}
                <div className="flex items-center gap-2 mt-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 neon-text-red font-orbitron tracking-wider text-center"
                    style={{
                      textShadow: '0 0 25px rgba(255, 0, 0, 0.9), 0 0 50px rgba(255, 0, 0, 0.7)',
                    }}>
                    x39Matrix
                  </h1>
                  <Award className="w-6 h-6 text-yellow-500 animate-pulse" />
                </div>
                
                {/* Subtext - ICP blockchain token + Competition */}
                <p className="text-sm sm:text-base md:text-lg font-semibold text-center mt-1 font-orbitron tracking-wide"
                  style={{
                    color: '#C0C0C0',
                    textShadow: '0 0 12px rgba(0, 150, 255, 0.7), 0 0 24px rgba(0, 150, 255, 0.5)',
                  }}>
                  ICP blockchain token | Caffeine AI Builds
                </p>
              </div>

              {/* Navigation Menu */}
              <div className="flex items-center justify-between w-full">
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8 mx-auto">
                  <button
                    onClick={() => scrollToSection('icp-section')}
                    className="text-gray-300 hover:text-red-500 transition-colors font-orbitron"
                  >
                    ICP
                  </button>
                  <button
                    onClick={() => scrollToSection('darkweb-section')}
                    className="text-gray-300 hover:text-red-500 transition-colors font-orbitron"
                  >
                    Dark Web
                  </button>
                  <AndroidDownloadButton />
                  
                  {/* Language Selector */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors font-orbitron">
                      <Globe className="w-5 h-5" />
                      <span>{languages.find(l => l.code === currentLanguage)?.name}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-black/95 border border-red-500/50 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setCurrentLanguage(lang.code)}
                          className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-colors font-orbitron"
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden ml-auto">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black/95 border-t border-red-500/30">
              <div className="px-4 py-4 space-y-4">
                <button
                  onClick={() => scrollToSection('icp-section')}
                  className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-orbitron"
                >
                  ICP
                </button>
                <button
                  onClick={() => scrollToSection('darkweb-section')}
                  className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-orbitron"
                >
                  Dark Web
                </button>
                <div className="pt-2 border-t border-red-500/30">
                  <AndroidDownloadButton />
                </div>
                <div className="pt-2 border-t border-red-500/30">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-2 py-2 text-gray-300 hover:text-red-500 transition-colors font-orbitron"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="relative z-10 pt-32 md:pt-40">
          {/* Hero Section with Enhanced Holographic Effects */}
          <section className="hero-section min-h-screen flex items-center justify-center px-4">
            <div className="text-center animate-fade-in-up">
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-orbitron"
                style={{
                  textShadow: '0 0 40px rgba(255, 0, 0, 0.9), 0 0 80px rgba(255, 0, 0, 0.7)',
                }}
              >
                X39 Matrix
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-montserrat mb-4">
                Token ICP DeFi - Protocolo Matrix Descentralizado
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <Award className="w-8 h-8 text-yellow-500 animate-pulse" />
                <p className="text-lg sm:text-xl text-yellow-500 font-orbitron">
                  Caffeine AI Builds Competition
                </p>
                <Award className="w-8 h-8 text-yellow-500 animate-pulse" />
              </div>
            </div>
          </section>

          {/* CROSS-PLATFORM PROMOTIONAL BANNER - FIRST VISIBLE BLOCK */}
          <CrossPlatformPromotionalBanner />

          {/* X39 MATRIX TOKEN INFORMATION SECTION - SECOND VISIBLE BLOCK */}
          <X39TokenRegistrationSection />

          {/* X39 MATRIX TOKEN PROMOTIONAL AIRDROP SECTION - THIRD VISIBLE BLOCK */}
          <X39TokenPromotionalAirdropSection />

          {/* TrochoDrive Section with Live ICP Price */}
          <section className="trochodrive-section py-16 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Live ICP Price - Positioned above triangle */}
              <div className="mb-12">
                <LiveICPPrice />
              </div>

              {/* Central Triangle and X39 Matrix Text */}
              <TrochoDriveElement />
            </div>
          </section>

          {/* INTERACTIVE PERFORMANCE METRICS DASHBOARD */}
          <PerformanceMetricsDashboard />

          {/* Token Analytics Panel */}
          <section className="token-analytics-section py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <TokenAnalyticsPanel />
            </div>
          </section>

          {/* ANDROID MOBILE APP SECTION */}
          <AndroidMobileAppSection />

          {/* Davos Outcomes Report Section */}
          <DavosOutcomesReportSection />

          {/* Element Chat Section */}
          <ElementChatSection />

          {/* ICP Section */}
          <section id="icp-section" className="icp-section py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/70 border-2 border-red-500/50 rounded-lg p-8 backdrop-blur-sm">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-red-500/20 border border-red-500 rounded-full text-red-500 font-bold text-sm neon-text-red">
                    ICP
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-orbitron neon-text-red">
                  Secretos Exclusivos del Ecosistema ICP
                </h2>
                <p className="text-gray-400 mb-6 font-montserrat">
                  Descubre el futuro de la web descentralizada
                </p>
                <div className="text-gray-300 space-y-4 font-montserrat text-base leading-relaxed">
                  <p>
                    El Internet Computer Protocol (ICP) representa una revolución en la infraestructura de Internet,
                    permitiendo que aplicaciones web se ejecuten completamente en blockchain sin necesidad de
                    servidores tradicionales.
                  </p>
                  <p>
                    Con su arquitectura única de canisters y su capacidad de escalar infinitamente, ICP está
                    redefiniendo lo que es posible en el mundo de las aplicaciones descentralizadas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Gráficos Section */}
          <GraficosSection />

          {/* Premium ICP Sections */}
          <PremiumICPSections />

          {/* Family/Friends Message */}
          <section className="family-message-section py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p 
                className="text-2xl sm:text-3xl font-bold text-red-500 neon-text-red font-orbitron"
                style={{
                  textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6)',
                }}
              >
                Si no somos una familia, somos amigos.
              </p>
            </div>
          </section>

          {/* Dark Web Section */}
          <section id="darkweb-section" className="darkweb-section py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/70 border-2 border-red-500/50 rounded-lg p-8 backdrop-blur-sm">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-red-500/20 border border-red-500 rounded-full text-red-500 font-bold text-sm neon-text-red">
                    Dark Web
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-orbitron neon-text-red">
                  Riesgos de las Criptomonedas en la Dark Web
                </h2>
                <p className="text-gray-400 mb-6 font-montserrat">
                  Análisis profesional de ciberseguridad
                </p>
                <div className="text-gray-300 space-y-6 font-montserrat text-base leading-relaxed">
                  <div>
                    <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                      1. Mercados Ilegales
                    </h3>
                    <p>
                      La Dark Web alberga mercados donde se comercian bienes y servicios ilegales usando
                      criptomonedas como método de pago anónimo.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                      2. Estafas y Fraudes
                    </h3>
                    <p>
                      Muchos sitios en la Dark Web son esquemas de estafa diseñados para robar criptomonedas
                      de usuarios desprevenidos.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                      3. Malware y Ransomware
                    </h3>
                    <p>
                      Los ciberdelincuentes distribuyen malware y ransomware, exigiendo pagos en criptomonedas
                      para desbloquear sistemas infectados.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                      4. Lavado de Dinero
                    </h3>
                    <p>
                      Las criptomonedas se utilizan en esquemas de lavado de dinero debido a su naturaleza
                      pseudoanónima y la dificultad de rastrear transacciones.
                    </p>
                  </div>
                  <p className="italic text-gray-400 mt-6">
                    Es crucial mantener prácticas de seguridad rigurosas y evitar interactuar con sitios
                    sospechosos en la Dark Web.
                  </p>
                </div>

                {/* ICP Dark Web Dangers Warning */}
                <div className="mt-8 bg-black border-2 border-red-500 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-red-500 mb-4 font-orbitron neon-text-red">
                    🚨 PELIGROS ICP DARK WEB
                  </h3>
                  <ul className="text-green-400 space-y-2 font-montserrat text-base">
                    <li>• Estafas de inversión falsas prometiendo retornos garantizados</li>
                    <li>• Phishing de wallets ICP para robar tokens</li>
                    <li>• Contratos inteligentes maliciosos disfrazados de legítimos</li>
                    <li>• Esquemas Ponzi usando la marca ICP</li>
                    <li>• Venta de tokens ICP falsos o robados</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Información Variada Section */}
          <InformacionVariadaSection />

          {/* Reddit Promotional Message Section */}
          <RedditPromoSection />

          {/* Final Message Section */}
          <section className="final-message-section py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p 
                className="text-2xl sm:text-3xl font-bold text-red-500 neon-text-red font-orbitron"
                style={{
                  textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6)',
                }}
              >
                Si no somos una familia, somos amigos. Esperamos que esto ayude a nuestra familia ICP.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer-section py-12 px-4 bg-black/90 border-t border-red-500/30">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-gray-400 mb-4 font-montserrat">
                © 2025. Built with love using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">caffeine.ai</a>
              </p>
              <p className="text-red-500 font-orbitron neon-text-red mb-2">
                Contacto: suporte@x39.com
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Award className="w-5 h-5 text-yellow-500" />
                <p className="text-yellow-500 font-orbitron text-sm">
                  Caffeine AI Builds Competition Entry
                </p>
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="mt-6">
                <button
                  onClick={() => setShowDiagnostics(true)}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm font-montserrat"
                >
                  <Activity className="w-4 h-4" />
                  Diagnostics
                </button>
              </div>
            </div>
          </footer>
        </main>

        {/* Diagnostics Modal */}
        {showDiagnostics && (
          <ConnectivityDiagnostics onClose={() => setShowDiagnostics(false)} />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;
