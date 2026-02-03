import { useState, useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useActor } from '../hooks/useActor';
import { fetchICPPrice, type ICPPriceData } from '../services/icpMarketData';

export function LiveICPPrice() {
  const { t } = useLanguage();
  const { actor } = useActor();
  const [icpPriceData, setIcpPriceData] = useState<ICPPriceData | null>(null);
  const [prevIcpPrice, setPrevIcpPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const priceRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const data = await fetchICPPrice(actor);
        
        // Trigger animation if price changed
        if (icpPriceData && data.price !== icpPriceData.price) {
          setPrevIcpPrice(icpPriceData.price);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 600);
        }

        setIcpPriceData(data);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching ICP price:', err);
        setError('Unable to fetch price');
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchPrice();

    // Update every 30 seconds with stable interval
    const interval = setInterval(fetchPrice, 30000);

    return () => clearInterval(interval);
  }, [actor]); // Stable dependency - only actor changes trigger re-setup

  const formatMarketCap = (value: number): string => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    return `$${value.toFixed(0)}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-4">
        {/* ICP Panel Loading */}
        <div className="bg-black/60 rounded-xl border border-red-500/30 backdrop-blur-md p-4 w-full max-w-[380px]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-40 h-8 bg-red-500/20 rounded animate-pulse" />
            <div className="w-48 h-4 bg-red-500/20 rounded animate-pulse" />
            <div className="w-56 h-3 bg-red-500/20 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !icpPriceData) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-4">
        <div className="bg-black/60 rounded-xl border border-red-500/30 backdrop-blur-md p-4 w-full max-w-[380px]">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-xs text-gray-400">{t('price.error') || 'Price unavailable'}</span>
          </div>
        </div>
      </div>
    );
  }

  const isPositive = icpPriceData.change24h >= 0;
  const progressPercentage = Math.min(Math.abs(icpPriceData.change24h) * 10, 100);

  return (
    <div className="flex flex-col items-center px-4 py-4">
      {/* ICP Price Panel with Official Logo - Single display above triangle */}
      <div className="bg-gradient-to-br from-black/70 via-black/60 to-black/70 rounded-xl border-2 border-red-500/40 backdrop-blur-md shadow-lg shadow-red-500/10 hover:border-red-500/60 transition-all duration-300 p-4 w-full max-w-[380px]">
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-2.5">
            {/* Official ICP Logo */}
            <img 
              src="/assets/generated/icp-icon-red-neon.dim_64x64.png" 
              alt="ICP Logo"
              className="w-7 h-7 animate-subtle-pulse"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))',
              }}
            />
            
            {/* ICP Price and Change */}
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-2">
                <span 
                  ref={priceRef}
                  className={`futuristic-price text-xl ${isAnimating ? 'price-update-animation' : ''}`}
                >
                  ${icpPriceData.price.toFixed(2)}
                </span>
                <span 
                  className={`futuristic-change text-sm ${isPositive ? 'change-positive' : 'change-negative'} ${isAnimating ? 'change-pulse-animation' : ''}`}
                >
                  ({isPositive ? '+' : ''}{icpPriceData.change24h.toFixed(1)}%)
                </span>
              </div>
              <span className="text-xs text-gray-400 font-orbitron">
                Market Cap: {formatMarketCap(icpPriceData.marketCap)}
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full max-w-[300px] h-1.5 bg-black/60 rounded-full overflow-hidden border border-red-500/30">
            <div 
              className={`h-full transition-all duration-500 ${isPositive ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}
              style={{ 
                width: `${progressPercentage}%`,
                boxShadow: isPositive 
                  ? '0 0 10px rgba(0, 255, 0, 0.6)' 
                  : '0 0 10px rgba(255, 0, 0, 0.6)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
