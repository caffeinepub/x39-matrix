import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { ProposalList } from './ProposalList';
import { ProposalDetail } from './ProposalDetail';
import { AlertCircle } from 'lucide-react';

export function GovernanceModule() {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();
  const [selectedProposalId, setSelectedProposalId] = useState<bigint | null>(null);

  if (!identity) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-8 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-300 mb-2 font-orbitron">
            {t('portfolio.loginRequired')}
          </h3>
          <p className="text-slate-300 font-montserrat">
            {t('portfolio.loginRequired')}
          </p>
        </div>
      </div>
    );
  }

  if (selectedProposalId !== null) {
    return (
      <ProposalDetail
        proposalId={selectedProposalId}
        onBack={() => setSelectedProposalId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">
          {t('governance.title')}
        </h2>
      </div>

      <ProposalList onSelectProposal={setSelectedProposalId} />
    </div>
  );
}
