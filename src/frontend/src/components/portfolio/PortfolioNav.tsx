import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Lock, Vote } from 'lucide-react';

interface PortfolioNavProps {
  activeTab: 'stake' | 'governance';
  onTabChange: (tab: 'stake' | 'governance') => void;
}

export function PortfolioNav({ activeTab, onTabChange }: PortfolioNavProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-800/50 border-b border-blue-700/30 px-4 sm:px-6">
      <div className="flex gap-2 sm:gap-4">
        <button
          onClick={() => onTabChange('stake')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold font-orbitron transition-all duration-200 border-b-2 ${
            activeTab === 'stake'
              ? 'border-blue-500 text-blue-400 bg-blue-900/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
          }`}
        >
          <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">{t('portfolio.stakeHold')}</span>
        </button>
        
        <button
          onClick={() => onTabChange('governance')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold font-orbitron transition-all duration-200 border-b-2 ${
            activeTab === 'governance'
              ? 'border-blue-500 text-blue-400 bg-blue-900/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
          }`}
        >
          <Vote className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">{t('portfolio.governance')}</span>
        </button>
      </div>
    </div>
  );
}
