import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntroScreen } from './components/IntroScreen';
import { HolographicHero } from './components/HolographicHero';
import { X39MatrixLaunchHeroBlock } from './components/X39MatrixLaunchHeroBlock';
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
import { LegalDisclaimerSection } from './components/legal/LegalDisclaimerSection';
import { DailyNewsUpdates } from './components/DailyNewsUpdates';
import { LanguageProvider } from './components/LanguageContext';
import { ConnectivityDiagnostics } from './components/ConnectivityDiagnostics';
import { ConnectivityStatusBanner } from './components/ConnectivityStatusBanner';
import { LaunchDryRun } from './components/LaunchDryRun';
import { March15LaunchInfoSection } from './components/March15LaunchInfoSection';
import { X39PortfolioShell } from './components/portfolio/X39PortfolioShell';
import { AdminGoLiveToggle } from './components/admin/AdminGoLiveToggle';
import { AudioControl } from './components/AudioControl';
import { OfficialWebsiteLinkCard } from './components/OfficialWebsiteLinkCard';
import { HeaderTriangleCodeRain } from './components/header/HeaderTriangleCodeRain';
import { useDomainRedirect } from './hooks/useDomainRedirect';
import { useBackgroundAudio } from './hooks/useBackgroundAudio';
import { OFFICIAL_PORTAL_URL } from './utils/urls';
import { homeHeroCopy } from './content/homeHeroCopy';
import { Menu, X, Globe, Activity, FileText, Rocket } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  // Domain redirect hook - runs early to redirect satellite domains
  useDomainRedirect();

  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [showLaunchDryRun, setShowLaunchDryRun] = useState(false);

  // Background audio hook - auto-plays after intro if not muted
  const backgroundAudio = useBackgroundAudio(
    '/assets/audio/chopin-nocturne-no-9.mp3',
    introComplete
  );

  // Check for diagnostics and dry-run URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('diagnostics') === '1') {
      setShowDiagnostics(true);
    }
    if (params.get('dry-run') === '1') {
      setShowLaunchDryRun(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navigateToGovernance = () => {
    // Set hash for deep-link to governance tab
    window.history.replaceState(null, '', '#portfolio-governance');
    // Scroll to portfolio section
    scrollToSection('portfolio-section');
  };

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ];

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
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

          {/* Connectivity Status Banner - appears when diagnostics fail */}
          <ConnectivityStatusBanner onOpenDiagnostics={() => setShowDiagnostics(true)} />

          {/* Navigation Bar - Fixed with safe-area support and Matrix-black background */}
          <nav className="fixed top-0 left-0 right-0 z-50 header-matrix-black border-b border-red-500/30 safe-top overflow-hidden">
            {/* Header Triangle Code Rain - Intense neon red effect */}
            <HeaderTriangleCodeRain />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
              <div className="flex flex-col items-center justify-between py-3 sm:py-4">
                {/* Official x39Matrix Header Logo - Optimized for mobile */}
                <div className="flex flex-col items-center mb-2 sm:mb-3 no-clip-glow">
                  <div className="relative">
                    {/* Enhanced pulsating glow animation */}
                    <div className="absolute inset-0 -m-2 sm:-m-3 bg-red-500/30 rounded-full blur-xl sm:blur-2xl animate-glow-pulse pointer-events-none" />
                    
                    {/* Official x39Matrix Logo with holographic effects - Responsive sizing */}
                    <img 
                      src="/assets/generated/triangle-holographic-3d.dim_400x400.png" 
                      alt="x39Matrix Official Logo" 
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain animate-triangle-pulse relative z-10"
                      style={{
                        filter: 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.9)) drop-shadow(0 0 30px rgba(0, 100, 255, 0.6))'
                      }}
                    />
                  </div>
                  
                  {/* Brand Text - x39Matrix - Responsive sizing */}
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-500 neon-text-red font-orbitron tracking-wider text-center mt-1 sm:mt-2 no-clip-glow"
                    style={{
                      textShadow: '0 0 20px rgba(255, 0, 0, 0.9), 0 0 40px rgba(255, 0, 0, 0.7)',
                      lineHeight: '1.3',
                    }}>
                    x39Matrix
                  </h1>
                  
                  {/* Subtext - Protocol positioning - Responsive sizing */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center mt-0.5 sm:mt-1 font-orbitron tracking-wide no-clip-glow"
                    style={{
                      color: '#C0C0C0',
                      textShadow: '0 0 10px rgba(0, 150, 255, 0.7), 0 0 20px rgba(0, 150, 255, 0.5)',
                      lineHeight: '1.3',
                    }}>
                    Protocol Layer | Token Utilities
                  </p>
                </div>

                {/* Navigation Menu */}
                <div className="flex items-center justify-between w-full">
                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center space-x-6 lg:space-x-8 mx-auto">
                    <button
                      onClick={() => scrollToSection('portfolio-section')}
                      className="text-gray-300 hover:text-red-500 transition-colors font-orbitron text-sm lg:text-base relative z-10"
                    >
                      Portfolio
                    </button>
                    <button
                      onClick={navigateToGovernance}
                      className="text-gray-300 hover:text-red-500 transition-colors font-orbitron text-sm lg:text-base relative z-10"
                    >
                      Governance
                    </button>
                    <button
                      onClick={() => scrollToSection('daily-news')}
                      className="text-gray-300 hover:text-red-500 transition-colors font-orbitron text-sm lg:text-base relative z-10"
                    >
                      News
                    </button>
                    <button
                      onClick={() => scrollToSection('icp-section')}
                      className="text-gray-300 hover:text-red-500 transition-colors font-orbitron text-sm lg:text-base relative z-10"
                    >
                      ICP
                    </button>
                    <button
                      onClick={() => scrollToSection('darkweb-section')}
                      className="text-gray-300 hover:text-red-500 transition-colors font-orbitron text-sm lg:text-base relative z-10"
                    >
                      Dark Web
                    </button>
                    <button
                      onClick={() => scrollToSection('legal-disclaimer')}
                      className="text-gray-300 hover:text-red-500 transition-colors font-orbitron text-sm lg:text-base relative z-10"
                    >
                      Legal
                    </button>
                    
                    {/* Global Availability / Domain Status Button */}
                    <button
                      onClick={() => setShowDiagnostics(true)}
                      className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors font-orbitron text-sm lg:text-base relative z-10"
                      title="Check global availability and domain status"
                    >
                      <Globe className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span className="hidden lg:inline">Global Availability</span>
                      <span className="lg:hidden">Status</span>
                    </button>
                    
                    {/* Language Selector */}
                    <div className="relative group z-10">
                      <button className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors font-orbitron text-sm lg:text-base">
                        <Globe className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span>{languages.find(l => l.code === currentLanguage)?.flag} {languages.find(l => l.code === currentLanguage)?.name}</span>
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-black/95 border border-red-500/50 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => setCurrentLanguage(lang.code)}
                            className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-colors font-orbitron text-sm"
                          >
                            {lang.flag} {lang.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Menu Button */}
                  <div className="md:hidden ml-auto relative z-10">
                    <button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-2"
                      aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                      {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden header-matrix-black border-t border-red-500/30 relative" style={{ zIndex: 10 }}>
                <div className="px-4 py-4 space-y-3">
                  <button
                    onClick={() => scrollToSection('portfolio-section')}
                    className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-orbitron py-2"
                  >
                    Portfolio
                  </button>
                  <button
                    onClick={navigateToGovernance}
                    className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-orbitron py-2"
                  >
                    Governance
                  </button>
                  <button
                    onClick={() => scrollToSection('daily-news')}
                    className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-orbitron py-2"
                  >
                    News
                  </button>
                  <button
                    onClick={() => scrollToSection('icp-section')}
                    className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-orbitron py-2"
                  >
                    ICP
                  </button>
                  <button
                    onClick={() => scrollToSection('darkweb-section')}
                    className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-orbitron py-2"
                  >
                    Dark Web
                  </button>
                  <button
                    onClick={() => scrollToSection('legal-disclaimer')}
                    className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-orbitron py-2"
                  >
                    Legal
                  </button>
                  <button
                    onClick={() => {
                      setShowDiagnostics(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left text-gray-300 hover:text-red-500 transition-colors font-orbitron py-2"
                  >
                    <Globe className="w-5 h-5" />
                    <span>Global Availability</span>
                  </button>
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
                        {lang.flag} {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Main Content - Adjusted top padding to account for header height */}
          <main className="relative z-10 pt-40 sm:pt-44 md:pt-48 lg:pt-52">
            {/* X39 Matrix Launch Hero Block - NEW FEATURED SECTION */}
            <X39MatrixLaunchHeroBlock />

            {/* Hero Section - Updated with new concise Spanish copy */}
            <section className="hero-section min-h-screen flex items-center justify-center px-4">
              <div className="text-center animate-fade-in-up max-w-4xl">
                <h1 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-orbitron"
                  style={{
                    textShadow: '0 0 40px rgba(255, 0, 0, 0.9), 0 0 80px rgba(255, 0, 0, 0.7)',
                  }}
                >
                  {homeHeroCopy.title}
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-montserrat mb-4 leading-relaxed">
                  {homeHeroCopy.subtitle}
                </p>
                <p className="text-lg sm:text-xl text-gray-400 font-montserrat mt-6">
                  {homeHeroCopy.supporting}
                </p>
              </div>
            </section>

            {/* Daily News Updates Section - First in content flow */}
            <DailyNewsUpdates />

            {/* Admin Go-Live Toggle - Only visible to authenticated admins */}
            <section className="admin-section py-8 px-4">
              <div className="max-w-4xl mx-auto">
                <AdminGoLiveToggle />
              </div>
            </section>

            {/* March 15, 2026 Launch Information Section - Conditionally visible based on publication state */}
            <March15LaunchInfoSection onOpenLaunchDryRun={() => setShowLaunchDryRun(true)} />

            {/* X39 MATRIX PORTFOLIO - NNS-STYLE BLUE UI */}
            <section id="portfolio-section" className="portfolio-section py-16 px-4">
              <X39PortfolioShell />
            </section>

            {/* CROSS-PLATFORM PROMOTIONAL BANNER - FIRST VISIBLE BLOCK */}
            <CrossPlatformPromotionalBanner />

            {/* X39 MATRIX TOKEN INFORMATION SECTION - SECOND VISIBLE BLOCK */}
            <section id="token-registration">
              <X39TokenRegistrationSection />
            </section>

            {/* X39 MATRIX TOKEN PROMOTIONAL AIRDROP SECTION - THIRD VISIBLE BLOCK */}
            <X39TokenPromotionalAirdropSection />

            {/* TrochoDrive Section with Live ICP Price */}
            <section className="trochodrive-section py-16 px-4">
              <div className="max-w-7xl mx-auto">
                {/* Live ICP Price */}
                <LiveICPPrice />

                {/* TrochoDrive Element - Central Triangle Eye */}
                <TrochoDriveElement />

                {/* Token Analytics Panel */}
                <TokenAnalyticsPanel />
              </div>
            </section>

            {/* Performance Metrics Dashboard */}
            <PerformanceMetricsDashboard />

            {/* ICP Section */}
            <section id="icp-section" className="icp-section py-16 px-4">
              <div className="max-w-7xl mx-auto space-y-16">
                {/* Premium ICP Sections */}
                <PremiumICPSections />

                {/* Gráficos Section */}
                <GraficosSection />
              </div>
            </section>

            {/* Dark Web Section */}
            <section id="darkweb-section" className="darkweb-section py-16 px-4">
              <div className="max-w-7xl mx-auto space-y-16">
                {/* Davos Outcomes Report */}
                <DavosOutcomesReportSection />

                {/* Element Chat Section */}
                <ElementChatSection />
              </div>
            </section>

            {/* Información Variada Section */}
            <InformacionVariadaSection />

            {/* Reddit Promo Section */}
            <RedditPromoSection />

            {/* Legal Disclaimer Section */}
            <section id="legal-disclaimer">
              <LegalDisclaimerSection />
            </section>
          </main>

          {/* Footer */}
          <footer className="relative z-10 bg-black/90 border-t border-red-500/30 py-12 px-4 safe-bottom">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Official Website Link Card */}
                <div className="md:col-span-3">
                  <OfficialWebsiteLinkCard />
                </div>

                {/* Audio Control */}
                <div className="md:col-span-3 flex justify-center">
                  <AudioControl audio={backgroundAudio} />
                </div>
              </div>

              <div className="text-center text-gray-400 text-sm font-montserrat">
                <p>© 2026. Built with ❤️ using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">caffeine.ai</a></p>
              </div>
            </div>
          </footer>

          {/* Diagnostics Modal */}
          {showDiagnostics && (
            <ConnectivityDiagnostics onClose={() => setShowDiagnostics(false)} />
          )}

          {/* Launch Dry-Run Modal */}
          {showLaunchDryRun && (
            <LaunchDryRun onClose={() => setShowLaunchDryRun(false)} />
          )}
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
