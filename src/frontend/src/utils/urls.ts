/**
 * URL utilities for domain-safe operations on custom domains
 * Ensures all URLs are origin-agnostic and work correctly on https://x39matrix.com
 */

/**
 * Canonical official portal URL
 * Use this constant for all UI references to the official domain
 */
export const OFFICIAL_PORTAL_URL = 'https://x39matrix.com';

/**
 * Get the current origin (protocol + host)
 * Safe for use on any domain
 */
export function getCurrentOrigin(): string {
  if (typeof window === 'undefined') return '';
  return window.location.origin;
}

/**
 * Build an absolute URL for the current origin
 * @param path - Path starting with /
 */
export function buildAbsoluteUrl(path: string): string {
  const origin = getCurrentOrigin();
  return `${origin}${path}`;
}

/**
 * Get the base URL for success/cancel redirects
 * Used for payment flows and other external redirects
 */
export function getBaseUrl(): string {
  return getCurrentOrigin();
}

/**
 * Navigate to a section by ID with smooth scrolling
 * Domain-safe alternative to router navigation for anchor links
 */
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Check if we're running on HTTPS
 */
export function isSecureContext(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.protocol === 'https:';
}

/**
 * Extract hostname from a URL string
 * @param url - Full URL string
 */
export function extractHostname(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return '';
  }
}

/**
 * Build a canonical asset URL for diagnostics
 * @param assetPath - Path to asset (e.g., /assets/generated/favicon.png)
 */
export function buildCanonicalAssetUrl(assetPath: string): string {
  return `${OFFICIAL_PORTAL_URL}${assetPath}`;
}

/**
 * Check if current origin matches the official portal
 */
export function isOnOfficialDomain(): boolean {
  return getCurrentOrigin() === OFFICIAL_PORTAL_URL;
}
