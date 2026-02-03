import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { PortfolioHeader } from './PortfolioHeader';
import { PortfolioNav } from './PortfolioNav';
import { StakeHoldModule } from '../stake/StakeHoldModule';
import { GovernanceModule } from '../governance/GovernanceModule';

export function X39PortfolioShell() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'stake' | 'governance'>('stake');

  // Deep-link handling: check URL hash on mount and when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#portfolio-stake' || hash === '#stake') {
        setActiveTab('stake');
      } else if (hash === '#portfolio-governance' || hash === '#governance') {
        setActiveTab('governance');
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash when tab changes
  const handleTabChange = (tab: 'stake' | 'governance') => {
    setActiveTab(tab);
    // Update URL hash without scrolling
    const newHash = tab === 'stake' ? '#portfolio-stake' : '#portfolio-governance';
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* NNS-style blue container */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-2 border-blue-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <PortfolioHeader />
        
        {/* Navigation */}
        <PortfolioNav activeTab={activeTab} onTabChange={handleTabChange} />
        
        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'stake' ? (
            <StakeHoldModule />
          ) : (
            <GovernanceModule />
          )}
        </div>
      </div>

      {/* Developer Note: Reference Screenshot Placeholder */}
      <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
        <p className="text-sm text-blue-300 font-montserrat">
          <strong>Developer Note:</strong> For pixel-perfect matching, place the reference NNS-style screenshot at{' '}
          <code className="bg-slate-800 px-2 py-1 rounded">frontend/public/assets/reference/nns-portfolio-mobile.png</code>
        </p>
      </div>
    </div>
  );
}
