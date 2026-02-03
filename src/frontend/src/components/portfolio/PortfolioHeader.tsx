import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Wallet } from 'lucide-react';
import { X39LoginButton } from '../auth/X39LoginButton';

export function PortfolioHeader() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 border-b border-blue-700/50 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-orbitron">
              {t('portfolio.title')}
            </h1>
            <p className="text-sm text-blue-200 font-montserrat">
              {t('portfolio.subtitle')}
            </p>
          </div>
        </div>
        
        <X39LoginButton />
      </div>
    </div>
  );
}
