// NNS-inspired blue theme constants and utilities for X39Matrix Portfolio

export const NNS_COLORS = {
  // Primary blues (NNS-style)
  primary: 'rgb(29, 78, 216)', // blue-700
  primaryLight: 'rgb(59, 130, 246)', // blue-500
  primaryDark: 'rgb(30, 58, 138)', // blue-900
  
  // Backgrounds
  bgPrimary: 'rgb(15, 23, 42)', // slate-900
  bgSecondary: 'rgb(30, 41, 59)', // slate-800
  bgCard: 'rgb(51, 65, 85)', // slate-700
  
  // Borders
  border: 'rgb(71, 85, 105)', // slate-600
  borderLight: 'rgb(100, 116, 139)', // slate-500
  
  // Text
  textPrimary: 'rgb(248, 250, 252)', // slate-50
  textSecondary: 'rgb(203, 213, 225)', // slate-300
  textMuted: 'rgb(148, 163, 184)', // slate-400
  
  // Accents
  success: 'rgb(34, 197, 94)', // green-500
  warning: 'rgb(234, 179, 8)', // yellow-500
  error: 'rgb(239, 68, 68)', // red-500
  destructive: 'rgb(220, 38, 38)', // red-600 (safer for portfolio)
};

export const NNS_CLASSES = {
  // Card styles
  card: 'bg-slate-800 border border-slate-600 rounded-xl p-6 shadow-lg',
  cardHover: 'hover:bg-slate-700 hover:border-slate-500 transition-all duration-200',
  
  // Button styles
  buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200',
  buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-200',
  buttonOutline: 'border-2 border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200',
  buttonDestructive: 'bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200',
  
  // Input styles
  input: 'bg-slate-700 border border-slate-600 text-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  
  // Badge styles
  badgeLocked: 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-3 py-1 rounded-full text-sm font-medium',
  badgeUnlocked: 'bg-green-500/20 text-green-500 border border-green-500/50 px-3 py-1 rounded-full text-sm font-medium',
  badgeExpired: 'bg-slate-500/20 text-slate-400 border border-slate-500/50 px-3 py-1 rounded-full text-sm font-medium',
  badgeOpen: 'bg-blue-500/20 text-blue-500 border border-blue-500/50 px-3 py-1 rounded-full text-sm font-medium',
  badgeClosed: 'bg-slate-500/20 text-slate-400 border border-slate-500/50 px-3 py-1 rounded-full text-sm font-medium',
  badgeApproved: 'bg-green-500/20 text-green-500 border border-green-500/50 px-3 py-1 rounded-full text-sm font-medium',
  badgeRejected: 'bg-red-500/20 text-red-500 border border-red-500/50 px-3 py-1 rounded-full text-sm font-medium',
};

export const NNS_SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
};
