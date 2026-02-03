import { ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function ICPStakingButton() {
  const { t } = useLanguage();

  const handleClick = () => {
    window.open('https://nns.ic0.app/', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="group relative inline-flex items-center gap-3 px-6 py-3 bg-[#1A1A1A] border-2 border-red-500/50 rounded-lg hover:border-red-500 hover:shadow-red-glow transition-all duration-300 overflow-hidden"
      aria-label={t('staking.ariaLabel') || 'Stake ICP / Neuronas en NNS'}
    >
      {/* Metallic background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label="lightbulb">
          💡
        </span>
        <span className="text-white font-bold text-base md:text-lg tracking-wide group-hover:text-red-400 transition-colors duration-300">
          {t('staking.button') || 'Stake ICP / Neuronas'}
        </span>
        <ExternalLink className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors duration-300" aria-hidden="true" />
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.3)]" />
      </div>
    </button>
  );
}
