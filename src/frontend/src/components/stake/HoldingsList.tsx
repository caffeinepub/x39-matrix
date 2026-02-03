import React from 'react';
import { useLanguage } from '../LanguageContext';
import { useGetUserHoldings, useUnlockHolding, useDeleteHolding } from '../../hooks/holdings/useHoldings';
import { Loader2, Unlock, Trash2 } from 'lucide-react';
import { NNS_CLASSES } from '../portfolio/NnsBlueTheme';
import { PositionStatus } from '../../backend';

export function HoldingsList() {
  const { t } = useLanguage();
  const { data: holdings, isLoading } = useGetUserHoldings();
  const unlockHolding = useUnlockHolding();
  const deleteHolding = useDeleteHolding();

  const getStatusBadge = (status: PositionStatus) => {
    const statusMap = {
      [PositionStatus.locked]: { class: NNS_CLASSES.badgeLocked, text: t('stake.locked') },
      [PositionStatus.unlocked]: { class: NNS_CLASSES.badgeUnlocked, text: t('stake.unlocked') },
      [PositionStatus.expired]: { class: NNS_CLASSES.badgeExpired, text: t('stake.expired') },
    };
    
    const statusInfo = statusMap[status];
    
    return (
      <span className={statusInfo.class}>
        {statusInfo.text}
      </span>
    );
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString();
  };

  const handleUnlock = async (id: bigint) => {
    try {
      await unlockHolding.mutateAsync(id);
    } catch (error: any) {
      console.error('Unlock error:', error);
      alert(error.message || 'Failed to unlock holding');
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this holding?')) return;
    
    try {
      await deleteHolding.mutateAsync(id);
    } catch (error: any) {
      console.error('Delete error:', error);
      alert(error.message || 'Failed to delete holding');
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

  return (
    <div className={NNS_CLASSES.card}>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 font-orbitron">
        {t('stake.yourHoldings')}
      </h3>

      {!holdings || holdings.length === 0 ? (
        <p className="text-slate-400 text-center py-8 font-montserrat">
          {t('stake.noHoldings')}
        </p>
      ) : (
        <div className="space-y-4">
          {holdings.map((holding) => (
            <div
              key={holding.id.toString()}
              className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:bg-slate-700 transition-colors"
            >
              <div className="flex flex-col gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xl sm:text-2xl font-bold text-white font-orbitron">
                      {holding.tokenAmount.toString()}
                    </span>
                    {getStatusBadge(holding.positionStatus)}
                  </div>
                  
                  <div className="text-sm text-slate-300 space-y-1 font-montserrat">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-slate-400">{t('stake.startTime')}:</span>
                      <span>{formatDate(holding.startTime)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-slate-400">{t('stake.endTime')}:</span>
                      <span>{formatDate(holding.endTime)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-slate-400">{t('stake.duration')}:</span>
                      <span>{holding.lockDurationDays.toString()} days</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {holding.positionStatus === PositionStatus.locked && (
                    <button
                      onClick={() => handleUnlock(holding.id)}
                      disabled={unlockHolding.isPending}
                      className={NNS_CLASSES.buttonSecondary + ' flex items-center gap-2 flex-1 sm:flex-initial justify-center min-h-[44px]'}
                    >
                      {unlockHolding.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Unlock className="w-4 h-4" />
                      )}
                      <span>{t('stake.unlock')}</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDelete(holding.id)}
                    disabled={deleteHolding.isPending}
                    className={NNS_CLASSES.buttonDestructive + ' flex items-center gap-2 flex-1 sm:flex-initial justify-center min-h-[44px]'}
                  >
                    {deleteHolding.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    <span>{t('stake.delete')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
