// Cross-platform distribution configuration for X39Matrix
// Manages Android Play Store, iOS App Store, and Web app URLs

import { OFFICIAL_PORTAL_URL } from '../utils/urls';

// Environment variables for production store URLs (set via build-time env or CI/CD)
const VITE_ANDROID_PLAY_STORE_URL = import.meta.env.VITE_ANDROID_PLAY_STORE_URL || '';
const VITE_IOS_APP_STORE_URL = import.meta.env.VITE_IOS_APP_STORE_URL || '';

export const DISTRIBUTION_CONFIG = {
  // Android Play Store URL (set when available)
  // Example: 'https://play.google.com/store/apps/details?id=com.x39matrix.app'
  androidPlayStoreUrl: VITE_ANDROID_PLAY_STORE_URL,
  
  // iOS App Store URL (set when available)
  // Example: 'https://apps.apple.com/app/x39matrix/id123456789'
  iosAppStoreUrl: VITE_IOS_APP_STORE_URL,
  
  // Canonical web app URL - uses shared constant from urls.ts
  webAppUrl: OFFICIAL_PORTAL_URL,
  
  // APK fallback disabled for web-only deployment
  apkFallbackEnabled: false,
};

export function isAndroidConfigured(): boolean {
  return DISTRIBUTION_CONFIG.androidPlayStoreUrl.trim().length > 0;
}

export function isIosConfigured(): boolean {
  return DISTRIBUTION_CONFIG.iosAppStoreUrl.trim().length > 0;
}

export function getAndroidUrl(): string | null {
  const url = DISTRIBUTION_CONFIG.androidPlayStoreUrl.trim();
  return url.length > 0 ? url : null;
}

export function getIosUrl(): string | null {
  const url = DISTRIBUTION_CONFIG.iosAppStoreUrl.trim();
  return url.length > 0 ? url : null;
}

export function getWebAppUrl(): string {
  return DISTRIBUTION_CONFIG.webAppUrl;
}

export function isApkFallbackEnabled(): boolean {
  return DISTRIBUTION_CONFIG.apkFallbackEnabled && !isAndroidConfigured();
}
