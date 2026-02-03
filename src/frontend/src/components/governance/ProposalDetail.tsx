import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useGetProposal, useVoteOnProposal } from '../../hooks/governance/useProposals';
import { Loader2, ArrowLeft, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { NNS_CLASSES } from '../portfolio/NnsBlueTheme';
import { VoteOption, ProposalStatus } from '../../backend';

interface ProposalDetailProps {
  proposalId: bigint;
  onBack: () => void;
}

export function ProposalDetail({ proposalId, onBack }: ProposalDetailProps) {
  const { t } = useLanguage();
  const { data: proposal, isLoading } = useGetProposal(proposalId);
  const voteOnProposal = useVoteOnProposal();
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async (vote: VoteOption) => {
    try {
      await voteOnProposal.mutateAsync({ proposalId, vote });
      setHasVoted(true);
    } catch (error: any) {
      console.error('Vote error:', error);
      if (error.message?.includes('already voted')) {
        setHasVoted(true);
        alert(t('governance.voted'));
      } else {
        alert(error.message || 'Failed to vote');
      }
    }
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

  if (!proposal) {
    return (
      <div className={NNS_CLASSES.card}>
        <p className="text-slate-400 text-center py-8 font-montserrat">
          Proposal not found
        </p>
      </div>
    );
  }

  const totalVotes = Number(proposal.votes.yes + proposal.votes.no + proposal.votes.abstain);
  const yesPercent = totalVotes > 0 ? (Number(proposal.votes.yes) / totalVotes) * 100 : 0;
  const noPercent = totalVotes > 0 ? (Number(proposal.votes.no) / totalVotes) * 100 : 0;
  const abstainPercent = totalVotes > 0 ? (Number(proposal.votes.abstain) / totalVotes) * 100 : 0;

  const isOpen = proposal.status === ProposalStatus.open;

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-orbitron min-h-[44px]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('governance.backToList')}</span>
      </button>

      <div className={NNS_CLASSES.card}>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-orbitron">
              {proposal.title}
            </h2>
            <p className="text-slate-300 font-montserrat">
              {proposal.description}
            </p>
          </div>

          {/* Vote Results */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white font-orbitron">
              {t('governance.votes')}
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-400 font-montserrat">{t('governance.yes')}</span>
                  <span className="text-slate-300 font-montserrat">{proposal.votes.yes.toString()} ({yesPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${yesPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-400 font-montserrat">{t('governance.no')}</span>
                  <span className="text-slate-300 font-montserrat">{proposal.votes.no.toString()} ({noPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${noPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400 font-montserrat">{t('governance.abstain')}</span>
                  <span className="text-slate-300 font-montserrat">{proposal.votes.abstain.toString()} ({abstainPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-slate-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${abstainPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vote Actions */}
          {isOpen && !hasVoted && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-orbitron">
                {t('governance.vote')}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleVote(VoteOption.yes)}
                  disabled={voteOnProposal.isPending}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  {voteOnProposal.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ThumbsUp className="w-5 h-5" />
                      <span>{t('governance.yes')}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleVote(VoteOption.no)}
                  disabled={voteOnProposal.isPending}
                  className={NNS_CLASSES.buttonDestructive + ' flex items-center justify-center gap-2 min-h-[44px]'}
                >
                  {voteOnProposal.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ThumbsDown className="w-5 h-5" />
                      <span>{t('governance.no')}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleVote(VoteOption.abstain)}
                  disabled={voteOnProposal.isPending}
                  className={NNS_CLASSES.buttonSecondary + ' flex items-center justify-center gap-2 min-h-[44px]'}
                >
                  {voteOnProposal.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Minus className="w-5 h-5" />
                      <span>{t('governance.abstain')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {hasVoted && (
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <p className="text-blue-300 text-center font-montserrat">
                {t('governance.voted')}
              </p>
            </div>
          )}

          {!isOpen && (
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
              <p className="text-slate-300 text-center font-montserrat">
                {t('governance.closed')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
