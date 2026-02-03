import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ICPDarkWebDangersPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ICPDarkWebDangersPopup({ isOpen, onClose }: ICPDarkWebDangersPopupProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dangers-popup-title"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-4 border-red-500 rounded-lg shadow-[0_0_50px_rgba(255,0,0,0.5)] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-black border-b-2 border-red-500/50">
          <h2 
            id="dangers-popup-title"
            className="text-2xl md:text-3xl font-bold text-red-500 neon-text-red font-orbitron flex items-center gap-3"
          >
            <span className="text-3xl animate-pulse">🚨</span>
            {t('darkWeb.dangers.title')}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-lg bg-[#32CD32] hover:bg-[#28a428] text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(50,205,50,0.6)]"
            aria-label="Cerrar ventana"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-[#00FF00] text-base md:text-lg font-semibold font-montserrat text-center">
              {t('darkWeb.dangers.warning')}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#00FF00] font-orbitron mb-4">
              {t('darkWeb.dangers.listTitle')}
            </h3>
            
            <ul className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <li 
                  key={num}
                  className="flex items-start gap-3 text-[#00FF00] text-base md:text-lg font-montserrat leading-relaxed"
                >
                  <span className="flex-shrink-0 text-red-500 font-bold mt-1">•</span>
                  <span>{t(`darkWeb.dangers.item${num}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-red-500/30">
            <p className="text-[#00FF00] text-base md:text-lg font-montserrat italic text-center leading-relaxed">
              {t('darkWeb.dangers.conclusion')}
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 flex justify-center p-6 bg-black border-t-2 border-red-500/50">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[#32CD32] hover:bg-[#28a428] text-black font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(50,205,50,0.6)] font-orbitron"
          >
            {t('darkWeb.dangers.closeButton')}
          </button>
        </div>
      </div>
    </div>
  );
}
