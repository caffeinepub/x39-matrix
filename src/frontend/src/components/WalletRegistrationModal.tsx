import React, { useState } from 'react';
import { X, Wallet as WalletIcon, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface WalletRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const WALLET_TYPES = [
  { value: 'ICP', label: 'ICP Wallet (Internet Computer Protocol)' },
  { value: 'Plug', label: 'Plug Wallet' },
  { value: 'Stoic', label: 'Stoic Wallet' },
  { value: 'Infinity', label: 'Infinity Wallet' },
  { value: 'Bitfinity', label: 'Bitfinity Wallet' },
  { value: 'Other', label: 'Otra Billetera' },
];

export function WalletRegistrationModal({ isOpen, onClose, onSuccess }: WalletRegistrationModalProps) {
  const [selectedWallet, setSelectedWallet] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setSelectedWallet('');
    setWalletAddress('');
    setValidationError('');
    setSuccessMessage('');
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setSuccessMessage('');

    // Validation
    if (!selectedWallet) {
      setValidationError('Por favor, selecciona un tipo de billetera.');
      return;
    }

    if (!walletAddress.trim()) {
      setValidationError('Por favor, ingresa tu dirección de billetera.');
      return;
    }

    if (walletAddress.trim().length < 10) {
      setValidationError('La dirección de billetera parece ser demasiado corta. Verifica e intenta de nuevo.');
      return;
    }

    // Simulate registration
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('✅ Billetera registrada correctamente para el reclamo de X39 Matrix.');
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 2000);
    }, 1500);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleEscapeKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
      onKeyDown={handleEscapeKey}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A] rounded-lg border-4 border-red-500/70 shadow-[0_0_50px_rgba(255,0,0,0.5)] overflow-hidden">
        {/* Digital illumination effects */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-red-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-500/20"
          aria-label="Cerrar modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="relative p-8 md:p-10">
          {/* Header with Official X39 Matrix Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src="/assets/generated/x39matrix-official-logo.dim_200x200.png"
                  alt="X39 Matrix Wallet Registration"
                  className="w-16 h-16 object-contain animate-triangle-pulse"
                  style={{
                    filter: 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.7)) drop-shadow(0 0 30px rgba(255, 0, 0, 0.5))'
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-red-500/30 blur-2xl animate-glow-pulse" />
              </div>
            </div>
            <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-red-500 neon-text-red font-orbitron mb-2 animate-title-glow">
              Registrar Billetera para Reclamo X39 Matrix
            </h2>
            <p className="text-white text-sm md:text-base font-montserrat">
              Selecciona tu tipo de billetera e ingresa tu dirección para reclamar tus tokens gratuitos
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-500/20 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className="text-green-500 font-bold font-montserrat">{successMessage}</p>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="mb-6 bg-red-500/20 border-2 border-red-500 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <p className="text-red-500 font-bold font-montserrat text-sm">{validationError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Wallet Type Selection */}
            <div>
              <label htmlFor="wallet-type" className="block text-red-500 font-bold font-orbitron mb-3 text-sm uppercase">
                Tipo de Billetera
              </label>
              <select
                id="wallet-type"
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
                className="w-full bg-black border-2 border-red-500/50 rounded-lg px-4 py-3 text-white font-montserrat focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                disabled={isSubmitting || !!successMessage}
              >
                <option value="">Selecciona un tipo de billetera...</option>
                {WALLET_TYPES.map((wallet) => (
                  <option key={wallet.value} value={wallet.value}>
                    {wallet.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Wallet Address Input */}
            <div>
              <label htmlFor="wallet-address" className="block text-red-500 font-bold font-orbitron mb-3 text-sm uppercase">
                Dirección de Billetera
              </label>
              <input
                id="wallet-address"
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Ingresa tu dirección de billetera aquí..."
                className="w-full bg-black border-2 border-red-500/50 rounded-lg px-4 py-3 text-white font-montserrat placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                disabled={isSubmitting || !!successMessage}
              />
              <p className="text-gray-400 text-xs font-montserrat mt-2">
                Ingresa la dirección completa de tu billetera. Esta información se mantendrá segura y privada.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !!successMessage}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed border-2 border-red-500 disabled:border-gray-500 shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,0,0,0.7)] disabled:shadow-none font-orbitron text-base uppercase tracking-wider"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registrando...
                </span>
              ) : successMessage ? (
                'Billetera Registrada'
              ) : (
                'Registrar Billetera'
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 bg-black/70 border border-red-500/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <WalletIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-red-500 font-bold font-orbitron text-sm mb-1">Seguridad y Privacidad</p>
                <p className="text-white text-xs font-montserrat leading-relaxed">
                  Tu dirección de billetera se almacena de forma segura y no se mostrará públicamente. 
                  Solo se utiliza para asociar tu reclamo de tokens con tu cuenta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
