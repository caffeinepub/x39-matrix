import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function PremiumButton() {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const scrollToPremium = () => {
    const premiumSection = document.getElementById('icp');
    if (premiumSection) {
      premiumSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        onClick={scrollToPremium}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="premium-button group relative px-4 py-2 bg-[#1A1A1A] border-2 border-red-500 text-white font-bold uppercase tracking-wider text-sm hover:bg-red-600 hover:border-red-600 transition-all duration-300 rounded-lg shadow-red-glow"
        aria-label="Acceder a contenido premium"
      >
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" aria-hidden="true" />
          <span className="neon-text-red group-hover:text-white transition-colors">Premium</span>
        </span>
      </Button>

      {showTooltip && (
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-black/95 border border-red-500/50 rounded-lg shadow-red-glow whitespace-nowrap z-50 animate-fade-in"
          role="tooltip"
        >
          <p className="text-white text-xs font-medium">
            {t('premium.tooltip') || 'Acceso Premium – Contenido exclusivo desde 1 ICP'}
          </p>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black border-t border-l border-red-500/50 rotate-45" />
        </div>
      )}
    </div>
  );
}
