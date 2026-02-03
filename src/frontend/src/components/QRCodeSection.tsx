import { useEffect, useRef, useState } from 'react';

interface QRCodeSectionProps {
  url: string;
  caption: string;
}

export function QRCodeSection({ url, caption }: QRCodeSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    // Check if script is already loaded
    if (window.QRCode) {
      setScriptLoaded(true);
      return;
    }

    const loadScript = (src: string, isLastAttempt: boolean = false): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        // Add integrity for primary CDN
        if (src.includes('cdnjs.cloudflare.com')) {
          script.integrity = 'sha512-CNgIRecGo7nphbeZ04Sc13ka07paqdeTu0WR1IM4kNcpmBAUSHSQX0FslNhTDadL4O5SAGapGt4FodqL8My0mA==';
        }
        
        script.onload = () => {
          if (window.QRCode) {
            setScriptLoaded(true);
            setScriptError(false);
            resolve();
          } else {
            reject(new Error('QRCode not available after script load'));
          }
        };

        script.onerror = () => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
          reject(new Error(`Failed to load script from ${src}`));
        };

        document.head.appendChild(script);
      });
    };

    const attemptLoad = async () => {
      const cdnUrls = [
        'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
        'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js',
        'https://unpkg.com/qrcodejs@1.0.0/qrcode.min.js'
      ];

      for (let i = 0; i < cdnUrls.length; i++) {
        try {
          await loadScript(cdnUrls[i], i === cdnUrls.length - 1);
          return; // Success
        } catch (error) {
          console.warn(`Failed to load QR library from ${cdnUrls[i]}:`, error);
          if (i === cdnUrls.length - 1) {
            // All CDNs failed
            if (retryCount < maxRetries) {
              setRetryCount(prev => prev + 1);
              setTimeout(() => attemptLoad(), 2000 * (retryCount + 1)); // Exponential backoff
            } else {
              setScriptError(true);
            }
          }
        }
      }
    };

    attemptLoad();

    return () => {
      // Cleanup
      const scripts = document.head.querySelectorAll('script[src*="qrcode"]');
      scripts.forEach(script => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
    };
  }, [retryCount]);

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || scriptError) return;

    // Clear any existing QR code
    const qrContainer = containerRef.current.querySelector('.qrcode-inner');
    if (qrContainer) {
      qrContainer.innerHTML = '';
      
      try {
        // @ts-ignore - QRCode is loaded from CDN
        new window.QRCode(qrContainer, {
          text: url,
          width: 120,
          height: 120,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: 2, // High error correction for better scanning
        });
      } catch (error) {
        console.error('Error generating QR code:', error);
        setScriptError(true);
      }
    }
  }, [scriptLoaded, url, scriptError]);

  // Don't render if there's an error loading the script after all retries
  if (scriptError && retryCount >= maxRetries) {
    return null;
  }

  // Show loading state while attempting to load
  if (!scriptLoaded && !scriptError) {
    return (
      <aside 
        className="fixed bottom-4 right-4 z-50"
        aria-label="Cargando código QR"
        role="complementary"
      >
        <div className="bg-black/90 backdrop-blur-md rounded-lg border border-red-500/30 p-4">
          <div className="w-32 h-32 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside 
      ref={containerRef}
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isMinimized ? 'w-12 h-12' : 'w-auto'
      }`}
      aria-label="Código QR de X39 Dark"
      role="complementary"
    >
      <div className={`bg-black/90 backdrop-blur-md rounded-lg border border-red-500/30 shadow-red-glow hover:border-red-500/60 transition-all duration-300 ${
        isMinimized ? 'p-2' : 'p-4'
      }`}>
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="w-8 h-8 flex items-center justify-center text-white hover:text-red-500 transition-colors"
            aria-label="Expandir código QR"
            type="button"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </button>
        ) : (
          <>
            <div className="flex items-start justify-between gap-2 mb-3">
              <p className="text-white text-xs font-montserrat font-semibold">
                {caption}
              </p>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                aria-label="Minimizar código QR"
                type="button"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
            </div>
            
            <div className="bg-white p-2 rounded-md">
              <div className="qrcode-inner" style={{ width: '120px', height: '120px' }} />
            </div>
            
            <p className="text-gray-400 text-[10px] text-center mt-2 font-montserrat">
              www.x39dark.com
            </p>
          </>
        )}
      </div>
    </aside>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    QRCode: any;
  }
}
