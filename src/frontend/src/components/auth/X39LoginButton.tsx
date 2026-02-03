import React from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '../LanguageContext';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export function X39LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  const isAuthenticated = !!identity;
  const isLoading = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold font-orbitron transition-all duration-200 ${
        isAuthenticated
          ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          <span className="text-sm sm:text-base">{t('portfolio.loggingIn')}</span>
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">{t('portfolio.logout')}</span>
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">{t('portfolio.login')}</span>
        </>
      )}
    </button>
  );
}
