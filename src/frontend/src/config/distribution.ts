// Cross-platform distribution configuration for X39Matrix
// Manages Android Play Store, iOS App Store, and Web app URLs

export const DISTRIBUTION_CONFIG = {
  // Android Play Store URL (set when available)
  androidPlayStoreUrl: '', // e.g., 'https://play.google.com/store/apps/details?id=com.x39matrix.app'
  
  // iOS App Store URL (set when available)
  iosAppStoreUrl: '', // e.g., 'https://apps.apple.com/app/x39matrix/id123456789'
  
  // Canonical web app URL
  webAppUrl: 'https://x39matrix.com',
  
  // APK fallback (optional, only shown when Play Store is not configured)
  apkFallbackEnabled: true,
};

export function isAndroidConfigured(): boolean {
  return DISTRIBUTION_CONFIG.androidPlayStoreUrl.trim().length > 0;
}

export function isIosConfigured(): boolean {
  return DISTRIBUTION_CONFIG.iosAppStoreUrl.trim().length > 0;
}

export function getAndroidUrl(): string | null {
  return isAndroidConfigured() ? DISTRIBUTION_CONFIG.androidPlayStoreUrl : null;
}

export function getIosUrl(): string | null {
  return isIosConfigured() ? DISTRIBUTION_CONFIG.iosAppStoreUrl : null;
}

export function getWebAppUrl(): string {
  return DISTRIBUTION_CONFIG.webAppUrl;
}

export function isApkFallbackEnabled(): boolean {
  return DISTRIBUTION_CONFIG.apkFallbackEnabled && !isAndroidConfigured();
}
