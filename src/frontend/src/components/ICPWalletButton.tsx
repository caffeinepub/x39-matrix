import { ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const WALLET_DASHBOARD_URL = 'https://dashboard.internetcomputer.org/account/cvyml-v4wps-kyz5r-efepf-tdxc2-au4tw-takax-lwfbx-lj5fe-4hspw-yqe';

export function ICPWalletButton() {
  const { t } = useLanguage();

  const handleClick = () => {
    window.open(WALLET_DASHBOARD_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border-2 border-red-600 text-white font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-black hover:shadow-red-glow hover:scale-105 neon-button text-sm md:text-base"
      aria-label={t('wallet.ariaLabel') || 'Ver mi billetera ICP'}
    >
      <span className="hidden sm:inline">{t('wallet.button') || 'Ver mi billetera ICP'}</span>
      <span className="sm:hidden">{t('wallet.buttonShort') || 'Billetera'}</span>
      <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
    </button>
  );
}
