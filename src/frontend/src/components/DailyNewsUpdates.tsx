import { useState, useEffect } from 'react';
import { Clock, TrendingUp, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: number;
  category: 'ICP' | 'Crypto' | 'DeFi' | 'Web3';
  isPinned?: boolean;
}

export function DailyNewsUpdates() {
  const { t } = useLanguage();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Safe translation helper with English fallback
  const safeT = (key: string, fallback: string): string => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Pinned news item - always first
        const pinnedNews: NewsItem = {
          id: 'pinned-x39matrix',
          title: 'x39Matrix la nueva generación',
          summary: 'X39 Matrix is the new generation of Web3 tokens created to move fast, connect with everything, and provide total security to users.',
          source: 'X39 Matrix Official',
          timestamp: Date.now(),
          category: 'Web3',
          isPinned: true,
        };

        // Regular mock news data
        const mockNews: NewsItem[] = [
          {
            id: '1',
            title: 'ICP Chain Fusion alcanza nuevo hito de interoperabilidad',
            summary: 'La tecnología Chain Fusion de Internet Computer Protocol completa la integración nativa con Solana, permitiendo transacciones cross-chain sin puentes centralizados.',
            source: 'DFINITY Foundation',
            timestamp: Date.now() - 3600000,
            category: 'ICP',
          },
          {
            id: '2',
            title: 'Volumen de ckBTC supera $30M semanales',
            summary: 'El Bitcoin envuelto en ICP (ckBTC) registra volúmenes récord, demostrando creciente adopción institucional y confianza en la infraestructura descentralizada.',
            source: 'ICP Analytics',
            timestamp: Date.now() - 7200000,
            category: 'DeFi',
          },
          {
            id: '3',
            title: 'Microsoft Azure expande soporte para dApps en ICP',
            summary: 'Microsoft anuncia nuevas herramientas de desarrollo para aplicaciones descentralizadas sobre Internet Computer, facilitando migración empresarial a Web3.',
            source: 'Microsoft Azure',
            timestamp: Date.now() - 10800000,
            category: 'Web3',
          },
          {
            id: '4',
            title: 'Caffeine AI supera 2,500 desarrolladores activos',
            summary: 'La plataforma de desarrollo con IA sobre ICP alcanza nuevo récord de adopción, con más de 500 proyectos en construcción activa.',
            source: 'Caffeine AI',
            timestamp: Date.now() - 14400000,
            category: 'ICP',
          },
          {
            id: '5',
            title: 'Roadmap Q1 2026: Nuevas herramientas de privacidad',
            summary: 'DFINITY anuncia priorización de herramientas de privacidad avanzadas y optimizaciones que reducirán costos de computación en 50%.',
            source: 'DFINITY Roadmap',
            timestamp: Date.now() - 18000000,
            category: 'ICP',
          },
        ];

        // Always place pinned news first
        setNewsItems([pinnedNews, ...mockNews]);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Unable to load news');
        setIsLoading(false);
      }
    };

    fetchNews();

    // Refresh news daily
    const interval = setInterval(fetchNews, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 1) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ICP':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'Crypto':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      case 'DeFi':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'Web3':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  const handleNewsClick = (item: NewsItem) => {
    // Only open modal for pinned news
    if (item.isPinned) {
      setSelectedNews(item);
    }
  };

  if (isLoading) {
    return (
      <section id="daily-news" className="relative w-full min-h-screen bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-red-500 neon-text-red font-orbitron mb-4">
              {safeT('dailyNews.title', 'Daily Updates')}
            </h2>
            <p className="text-gray-400 text-lg">
              {safeT('dailyNews.subtitle', 'Latest ICP and crypto news')}
            </p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#1A1A1A] rounded-lg p-6 border border-red-500/20 animate-pulse">
                <div className="h-6 bg-red-500/20 rounded w-3/4 mb-3" />
                <div className="h-4 bg-red-500/20 rounded w-full mb-2" />
                <div className="h-4 bg-red-500/20 rounded w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="daily-news" className="relative w-full min-h-screen bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              {safeT('dailyNews.error', 'Error loading news')}
            </h2>
            <p className="text-gray-400">
              {safeT('dailyNews.errorMessage', 'Please try again later')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="daily-news" className="relative w-full min-h-screen bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
                {safeT('dailyNews.live', 'Live')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-red-500 neon-text-red font-orbitron mb-4">
              {safeT('dailyNews.title', 'Daily Updates')}
            </h2>
            <p className="text-gray-400 text-lg">
              {safeT('dailyNews.subtitle', 'Latest ICP and crypto news')}
            </p>
          </div>

          <div className="space-y-6">
            {newsItems.map((item, index) => {
              // Featured window treatment for pinned item
              if (item.isPinned) {
                return (
                  <article
                    key={item.id}
                    onClick={() => handleNewsClick(item)}
                    className="relative bg-gradient-to-br from-purple-950/40 via-black to-purple-950/20 rounded-2xl p-8 md:p-12 border-2 border-purple-500/60 hover:border-purple-400 transition-all duration-300 cursor-pointer group overflow-hidden animate-fade-in shadow-2xl hover:shadow-purple-glow"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Featured header area */}
                    <div className="relative mb-6">
                      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                          <span className="inline-block px-4 py-2 text-sm font-bold rounded-full uppercase tracking-wider border-2 bg-purple-500/30 text-purple-300 border-purple-400 shadow-lg shadow-purple-500/50">
                            {safeT('dailyNews.featured', 'Featured')}
                          </span>
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider border ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimestamp(item.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Title with enhanced styling */}
                    <h3 className="text-3xl md:text-4xl font-bold font-orbitron mb-6 text-purple-300 group-hover:text-purple-200 transition-colors leading-tight">
                      {item.title}
                    </h3>

                    {/* Summary with larger text */}
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-montserrat mb-8">
                      {item.summary}
                    </p>

                    {/* Footer with CTA */}
                    <div className="relative flex items-center justify-between pt-6 border-t-2 border-purple-500/30">
                      <span className="text-sm text-purple-400 font-semibold">
                        {safeT('dailyNews.source', 'Source')}: <span className="text-purple-300">{item.source}</span>
                      </span>
                      
                      {/* Prominent CTA button */}
                      <button
                        onClick={() => handleNewsClick(item)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 hover:scale-105 group/btn"
                      >
                        <span>{safeT('dailyNews.learnMore', 'Learn More')}</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </article>
                );
              }

              // Regular news cards (unchanged)
              return (
                <article
                  key={item.id}
                  className="bg-[#1A1A1A] rounded-lg p-6 md:p-8 border border-red-500/30 hover:border-red-500/60 hover:shadow-red-glow transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimestamp(item.timestamp)}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-orbitron mb-3 text-white hover:text-red-500 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 text-base md:text-lg leading-relaxed font-montserrat mb-4">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-red-500/20">
                    <span className="text-sm text-gray-500">
                      {safeT('dailyNews.source', 'Source')}: <span className="text-red-500">{item.source}</span>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {safeT('dailyNews.autoUpdate', 'Automatically updated every 24 hours')}
            </p>
          </div>
        </div>
      </section>

      {/* X39 Matrix Modal Dialog */}
      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="bg-black border-2 border-purple-500/50 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-purple-400 font-orbitron neon-text-purple mb-4">
              x39Matrix la nueva generación
            </DialogTitle>
            <DialogDescription className="text-gray-300 space-y-6 font-montserrat text-base leading-relaxed">
              {/* Definition */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 font-orbitron">What is X39 Matrix?</h3>
                <p>
                  X39 Matrix is the new generation of Web3 tokens created to move fast, connect with everything, and provide total security to users. It is a digital asset designed to operate in real markets, with direct compatibility with ICP and prepared to integrate into the world's leading exchanges.
                </p>
              </div>

              {/* Key Benefits */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 font-orbitron">Key Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold text-lg">•</span>
                    <div>
                      <span className="font-semibold text-purple-400">Solid Security:</span> Built on decentralized infrastructure, resistant to failures and attacks.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold text-lg">•</span>
                    <div>
                      <span className="font-semibold text-purple-400">Speed:</span> Transactions confirmed in seconds thanks to modern technologies like ICP.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold text-lg">•</span>
                    <div>
                      <span className="font-semibold text-purple-400">Interoperability:</span> Ready to operate with international exchanges and ecosystems, enabling seamless connections with ICP, Binance, and Asian markets.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold text-lg">•</span>
                    <div>
                      <span className="font-semibold text-purple-400">Decentralization:</span> Avoids centralized control, giving users greater autonomy.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Possible Collaborations */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 font-orbitron">Possible Collaborations</h3>
                <p>
                  X39 Matrix can integrate or collaborate with ICP ecosystem projects, Web3 communities, market analysis platforms, and future exchanges that support interoperable assets.
                </p>
              </div>

              {/* Commercial Offer */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mt-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-3 font-orbitron">Your Direct Entry to a Fast, Secure, and Global Ecosystem</h3>
                <p className="mb-4">
                  X39 Matrix is positioned as a token ready to collaborate with Web3 projects, analysis platforms, crypto communities, and future exchanges seeking a modern, fast, and reliable asset.
                </p>
                <p className="font-semibold text-white">
                  X39 Matrix is your direct entry to a fast, secure, and global ecosystem. Designed to grow in the most demanding markets and to offer users an agile Web3 experience without complications. Perfect for those who want to stay one step ahead.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
