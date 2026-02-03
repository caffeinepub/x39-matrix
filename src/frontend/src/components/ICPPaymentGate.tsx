import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Lock, Copy, CheckCircle2 } from 'lucide-react';

interface ICPPaymentGateProps {
  onUnlocked: () => void;
}

const PAYMENT_WALLET_ADDRESS = 'cvyml-v4wps-kyz5r-efepf-tdxc2-au4tw-takax-lwfbx-lj5fe-4hspw-yqe';

export function ICPPaymentGate({ onUnlocked }: ICPPaymentGateProps) {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_WALLET_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center py-12 px-6 bg-black/50 rounded-lg border border-red-500/30">
        <Lock className="w-16 h-16 text-red-500 mb-6 neon-glow-red" />
        
        <h3 className="text-2xl md:text-3xl font-bold text-red-500 neon-text-red font-orbitron mb-4 text-center">
          {t('payment.title') || 'Contenido Exclusivo'}
        </h3>
        
        <p className="text-white text-lg md:text-xl text-center mb-8 max-w-2xl font-montserrat">
          {t('payment.message') || 'Contenido exclusivo: desbloquea por 1 ICP para ver más'}
        </p>

        {/* Content Teaser */}
        <div className="w-full max-w-2xl mb-8 p-6 bg-black/30 rounded-lg border border-red-500/20">
          <h4 className="text-lg font-bold text-red-400 font-orbitron mb-3">
            Vista Previa del Contenido Premium:
          </h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Análisis completo del ecosistema ICP y proyecciones de crecimiento</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Alianzas estratégicas con Microsoft Azure, Google Cloud y más</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Información exclusiva sobre Chain Fusion y ckBTC</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Roadmap Q1 2026 y adopción institucional</span>
            </li>
          </ul>
        </div>

        {/* ICP Payment Only */}
        <div className="w-full max-w-2xl">
          <div className="p-6 bg-black/40 rounded-lg border border-red-500/30">
            <h4 className="text-lg font-bold text-white font-orbitron mb-4 text-center">
              Pago en ICP
            </h4>
            <p className="text-gray-300 text-sm mb-4 text-center">
              Envía <span className="text-red-500 font-bold">1 ICP</span> a la siguiente dirección:
            </p>
            <div className="flex items-center gap-2 p-3 bg-black/60 rounded border border-red-500/20 mb-4">
              <code className="flex-1 text-xs text-white break-all font-mono">
                {PAYMENT_WALLET_ADDRESS}
              </code>
              <button
                onClick={handleCopyAddress}
                className="flex-shrink-0 p-2 hover:bg-white/10 rounded transition-colors"
                aria-label="Copiar dirección"
              >
                {copied ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-gray-400 text-xs text-center italic">
              Después de enviar el pago, el contenido se desbloqueará automáticamente en tu cuenta.
            </p>
          </div>
        </div>

        {!identity && (
          <p className="mt-4 text-gray-400 text-sm text-center">
            {t('payment.loginHint') || 'Inicia sesión para desbloquear contenido premium'}
          </p>
        )}
      </div>
    </div>
  );
}
