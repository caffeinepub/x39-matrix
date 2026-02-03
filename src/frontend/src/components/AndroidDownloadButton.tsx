import { useLanguage } from './LanguageContext';
import { getCurrentOrigin } from '../utils/urls';

interface AndroidDownloadButtonProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export function AndroidDownloadButton({ variant = 'header', className = '' }: AndroidDownloadButtonProps) {
  const { t } = useLanguage();
  
  // Build domain-safe APK download URL
  const apkDownloadUrl = `${getCurrentOrigin()}/downloads/x39-matrix-mobile.apk`;

  if (variant === 'footer') {
    return (
      <a
        href={apkDownloadUrl}
        download="x39-matrix-mobile.apk"
        className={`inline-flex items-center justify-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider shadow-lg hover:shadow-red-glow border-2 border-red-600 hover:border-red-500 transition-all duration-300 rounded-lg neon-text-red ${className}`}
        aria-label={t('android.mobileApp')}
      >
        <img 
          src="/assets/generated/holographic-mobile-icon.dim_512x512.png" 
          alt="X39 Matrix Mobile" 
          className="w-6 h-6"
          aria-hidden="true"
        />
        <span>{t('android.mobileApp')}</span>
      </a>
    );
  }

  return (
    <a
      href={apkDownloadUrl}
      download="x39-matrix-mobile.apk"
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-md hover:shadow-red-glow transition-all duration-300 border border-red-500/50 hover:border-red-400 ${className}`}
      aria-label={t('android.mobileApp')}
    >
      <img 
        src="/assets/generated/holographic-mobile-icon.dim_512x512.png" 
        alt="X39 Matrix Mobile" 
        className="w-5 h-5"
        aria-hidden="true"
      />
      <span className="text-sm">{t('android.mobileApp')}</span>
    </a>
  );
}
