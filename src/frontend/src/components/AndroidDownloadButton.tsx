import { getCurrentOrigin } from '../utils/urls';
import { getAndroidUrl, isApkFallbackEnabled } from '../config/distribution';

interface AndroidDownloadButtonProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export function AndroidDownloadButton({ variant = 'header', className = '' }: AndroidDownloadButtonProps) {
  const androidUrl = getAndroidUrl();
  const showApkFallback = isApkFallbackEnabled();
  const apkDownloadUrl = `${getCurrentOrigin()}/downloads/x39-matrix-mobile.apk`;

  // If Play Store is configured, use it
  if (androidUrl) {
    if (variant === 'footer') {
      return (
        <a
          href={androidUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider shadow-lg hover:shadow-blue-500/50 border-2 border-blue-600 hover:border-blue-500 transition-all duration-300 rounded-lg ${className}`}
          aria-label="Android App"
        >
          <img 
            src="/assets/generated/holographic-mobile-icon.dim_512x512.png" 
            alt="X39 Matrix Mobile" 
            className="w-6 h-6"
            aria-hidden="true"
          />
          <span>Android App</span>
        </a>
      );
    }

    return (
      <a
        href={androidUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-blue-500/50 transition-all duration-300 border border-blue-500/50 hover:border-blue-400 ${className}`}
        aria-label="Android App"
      >
        <img 
          src="/assets/generated/holographic-mobile-icon.dim_512x512.png" 
          alt="X39 Matrix Mobile" 
          className="w-5 h-5"
          aria-hidden="true"
        />
        <span className="text-sm">Android App</span>
      </a>
    );
  }

  // If APK fallback is enabled and Play Store is not configured
  if (showApkFallback) {
    if (variant === 'footer') {
      return (
        <a
          href={apkDownloadUrl}
          download="x39-matrix-mobile.apk"
          className={`inline-flex items-center justify-center gap-3 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-bold uppercase tracking-wider shadow-lg border-2 border-slate-600 hover:border-slate-500 transition-all duration-300 rounded-lg ${className}`}
          aria-label="Download APK"
        >
          <img 
            src="/assets/generated/holographic-mobile-icon.dim_512x512.png" 
            alt="X39 Matrix Mobile" 
            className="w-6 h-6"
            aria-hidden="true"
          />
          <span>Download APK</span>
        </a>
      );
    }

    return (
      <a
        href={apkDownloadUrl}
        download="x39-matrix-mobile.apk"
        className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold rounded-lg shadow-md transition-all duration-300 border border-slate-500/50 hover:border-slate-400 ${className}`}
        aria-label="Download APK"
      >
        <img 
          src="/assets/generated/holographic-mobile-icon.dim_512x512.png" 
          alt="X39 Matrix Mobile" 
          className="w-5 h-5"
          aria-hidden="true"
        />
        <span className="text-sm">Download APK</span>
      </a>
    );
  }

  // Coming soon state
  if (variant === 'footer') {
    return (
      <button
        disabled
        className={`inline-flex items-center justify-center gap-3 px-6 py-3 bg-slate-600 text-slate-400 font-bold uppercase tracking-wider shadow-lg border-2 border-slate-600 rounded-lg cursor-not-allowed ${className}`}
        aria-label="Android App Coming Soon"
      >
        <img 
          src="/assets/generated/holographic-mobile-icon.dim_512x512.png" 
          alt="X39 Matrix Mobile" 
          className="w-6 h-6 opacity-50"
          aria-hidden="true"
        />
        <span>Coming soon</span>
      </button>
    );
  }

  return (
    <button
      disabled
      className={`inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-slate-400 font-semibold rounded-lg shadow-md border border-slate-500/50 cursor-not-allowed ${className}`}
      aria-label="Android App Coming Soon"
    >
      <img 
        src="/assets/generated/holographic-mobile-icon.dim_512x512.png" 
        alt="X39 Matrix Mobile" 
        className="w-5 h-5 opacity-50"
        aria-hidden="true"
      />
      <span className="text-sm">Coming soon</span>
    </button>
  );
}
