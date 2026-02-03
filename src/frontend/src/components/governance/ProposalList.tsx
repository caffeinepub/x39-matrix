import React from 'react';
import { useLanguage } from '../LanguageContext';
import { useGetAllProposals } from '../../hooks/governance/useProposals';
import { Loader2, ChevronRight } from 'lucide-react';
import { NNS_CLASSES } from '../portfolio/NnsBlueTheme';
import { ProposalStatus } from '../../backend';

interface ProposalListProps {
  onSelectProposal: (id: bigint) => void;
}

export function ProposalList({ onSelectProposal }: ProposalListProps) {
  const { t } = useLanguage();
  const { data: proposals, isLoading } = useGetAllProposals();

  const getStatusBadge = (status: ProposalStatus) => {
    const statusMap = {
      [ProposalStatus.open]: { class: NNS_CLASSES.badgeOpen, text: t('governance.open') },
      [ProposalStatus.closed]: { class: NNS_CLASSES.badgeClosed, text: t('governance.closed') },
      [ProposalStatus.approved]: { class: NNS_CLASSES.badgeUnlocked, text: t('governance.approved') },
      [ProposalStatus.rejected]: { class: NNS_CLASSES.badgeExpired, text: t('governance.rejected') },
    };
    
    const statusInfo = statusMap[status];
    
    return (
      <span className={statusInfo.class}>
        {statusInfo.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className={NNS_CLASSES.card}>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className={NNS_CLASSES.card}>
      <h3 className="text-lg font-bold text-white mb-4 font-orbitron">
        {t('governance.proposals')}
      </h3>

      {!proposals || proposals.length === 0 ? (
        <p className="text-slate-400 text-center py-8 font-montserrat">
          {t('governance.noProposals')}
        </p>
      ) : (
        <div className="space-y-3">
          {proposals.map((proposal) => (
            <button
              key={proposal.id.toString()}
              onClick={() => onSelectProposal(proposal.id)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:bg-slate-700 hover:border-slate-500 transition-all duration-200 text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-bold text-white font-orbitron">
                      {proposal.title}
                    </h4>
                    {getStatusBadge(proposal.status)}
                  </div>
                  
                  <p className="text-sm text-slate-300 line-clamp-2 font-montserrat">
                    {proposal.description}
                  </p>
                  
                  <div className="flex gap-4 text-xs text-slate-400 font-montserrat">
                    <span>{t('governance.votes')}: {(proposal.votes.yes + proposal.votes.no + proposal.votes.abstain).toString()}</span>
                  </div>
                </div>
                
                <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
