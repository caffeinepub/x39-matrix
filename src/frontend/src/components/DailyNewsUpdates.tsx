import { useState, useEffect } from 'react';
import { Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: number;
  category: 'ICP' | 'Crypto' | 'DeFi' | 'Web3';
}

export function DailyNewsUpdates() {
  const { t } = useLanguage();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Simulated news data - In production, this would fetch from a real API
        // You can integrate with CoinGecko, CryptoCompare, or custom backend
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

        setNewsItems(mockNews);
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

  if (isLoading) {
    return (
      <section id="daily-news" className="relative w-full min-h-screen bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-red-500 neon-text-red font-orbitron mb-4">
              {t('dailyNews.title') || 'Actualizaciones Diarias'}
            </h2>
            <p className="text-gray-400 text-lg">
              {t('dailyNews.subtitle') || 'Últimas noticias de ICP y criptomonedas'}
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
              {t('dailyNews.error') || 'Error al cargar noticias'}
            </h2>
            <p className="text-gray-400">
              {t('dailyNews.errorMessage') || 'Por favor, intenta de nuevo más tarde'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="daily-news" className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
              {t('dailyNews.live') || 'En Vivo'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-red-500 neon-text-red font-orbitron mb-4">
            {t('dailyNews.title') || 'Actualizaciones Diarias'}
          </h2>
          <p className="text-gray-400 text-lg">
            {t('dailyNews.subtitle') || 'Últimas noticias de ICP y criptomonedas'}
          </p>
        </div>

        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <article
              key={item.id}
              className="bg-[#1A1A1A] rounded-lg p-6 md:p-8 border border-red-500/30 hover:border-red-500/60 transition-all duration-300 hover:shadow-red-glow animate-fade-in"
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

              <h3 className="text-xl md:text-2xl font-bold text-white font-orbitron mb-3 hover:text-red-500 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-montserrat mb-4">
                {item.summary}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-red-500/20">
                <span className="text-sm text-gray-500">
                  {t('dailyNews.source') || 'Fuente'}: <span className="text-red-500">{item.source}</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            {t('dailyNews.autoUpdate') || 'Actualizado automáticamente cada 24 horas'}
          </p>
        </div>
      </div>
    </section>
  );
}
