import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useCreateHolding } from '../../hooks/holdings/useHoldings';
import { Loader2, Plus } from 'lucide-react';
import { NNS_CLASSES } from '../portfolio/NnsBlueTheme';

export function CreateHoldingForm() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const createHolding = useCreateHolding();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tokenAmount = parseInt(amount);
    const lockDurationDays = parseInt(duration);

    if (isNaN(tokenAmount) || tokenAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (isNaN(lockDurationDays) || lockDurationDays <= 0) {
      alert('Please enter a valid duration');
      return;
    }

    try {
      await createHolding.mutateAsync({ tokenAmount, lockDurationDays });
      setAmount('');
      setDuration('');
    } catch (error: any) {
      console.error('Create holding error:', error);
      alert(error.message || 'Failed to create holding');
    }
  };

  return (
    <div className={NNS_CLASSES.card}>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 font-orbitron">
        {t('stake.createHolding')}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 font-montserrat">
            {t('stake.amount')}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={NNS_CLASSES.input + ' w-full text-base sm:text-lg'}
            placeholder="1000"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 font-montserrat">
            {t('stake.duration')}
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={NNS_CLASSES.input + ' w-full text-base sm:text-lg'}
            placeholder="30"
            min="1"
            required
          />
        </div>

        <button
          type="submit"
          disabled={createHolding.isPending}
          className={NNS_CLASSES.buttonPrimary + ' w-full flex items-center justify-center gap-2 text-base sm:text-lg py-3'}
        >
          {createHolding.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('stake.creating')}</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>{t('stake.createHolding')}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
