import { useLanguage } from './LanguageContext';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Lock } from 'lucide-react';
import { CopyableValue } from './CopyableValue';
import { getLaunchReceiverPrincipal, getLaunchReceiverLabel } from '../config/launchPayment';

interface ICPPaymentGateProps {
  onUnlocked: () => void;
}

export function ICPPaymentGate({ onUnlocked }: ICPPaymentGateProps) {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();

  const receiverPrincipal = getLaunchReceiverPrincipal();
  const receiverLabel = getLaunchReceiverLabel();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center py-12 px-6 bg-black/50 rounded-lg border border-red-500/30">
        <Lock className="w-16 h-16 text-red-500 mb-6 neon-glow-red" />
        
        <h3 className="text-2xl md:text-3xl font-bold text-red-500 neon-text-red font-orbitron mb-4 text-center">
          {t('payment.title')}
        </h3>
        
        <p className="text-white text-lg md:text-xl text-center mb-8 max-w-2xl font-montserrat">
          {t('payment.message')}
        </p>

        {/* Content Teaser */}
        <div className="w-full max-w-2xl mb-8 p-6 bg-black/30 rounded-lg border border-red-500/20">
          <h4 className="text-lg font-bold text-red-400 font-orbitron mb-3">
            {t('payment.previewTitle')}
          </h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              <span>{t('payment.preview1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              <span>{t('payment.preview2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              <span>{t('payment.preview3')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              <span>{t('payment.preview4')}</span>
            </li>
          </ul>
        </div>

        {/* ICP Payment Only */}
        <div className="w-full max-w-2xl">
          <div className="p-6 bg-black/40 rounded-lg border border-red-500/30">
            <h4 className="text-lg font-bold text-white font-orbitron mb-4 text-center">
              {t('payment.icpPaymentTitle')}
            </h4>
            <p className="text-gray-300 text-sm mb-4 text-center">
              {t('payment.sendAmount')} <span className="text-red-500 font-bold">1 ICP</span> {t('payment.toAddress')}
            </p>
            
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2 text-center">
                {receiverLabel}
              </p>
              <CopyableValue 
                value={receiverPrincipal}
                className="max-w-full"
              />
            </div>

            <p className="text-gray-400 text-xs text-center italic">
              {t('payment.instructions')}
            </p>
          </div>
        </div>

        {!identity && (
          <p className="mt-4 text-gray-400 text-sm text-center">
            {t('payment.loginHint')}
          </p>
        )}
      </div>
    </div>
  );
}
