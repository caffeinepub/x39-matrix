import { useEffect } from 'react';
import { OFFICIAL_PORTAL_URL, SATELLITE_DOMAINS } from '../utils/urls';

/**
 * Hook that performs best-effort client-side redirect from satellite domains
 * (including www variants) to the canonical official portal (x39matrix.org)
 */
export function useDomainRedirect() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    const currentHostname = window.location.hostname.toLowerCase();
    const currentProtocol = window.location.protocol;
    const officialUrl = new URL(OFFICIAL_PORTAL_URL);
    const officialHostname = officialUrl.hostname.toLowerCase();
    
    // Check if we're on a satellite domain (including www variants)
    const isSatelliteDomain = SATELLITE_DOMAINS.some(
      domain => currentHostname === domain || currentHostname === `www.${domain}`
    );

    // Check if we're on a www variant of the official domain
    const isWwwVariant = currentHostname === `www.${officialHostname}`;

    // Check if we need to upgrade to HTTPS
    const needsHttpsUpgrade = currentProtocol === 'http:' && officialUrl.protocol === 'https:';

    if (isSatelliteDomain || isWwwVariant || needsHttpsUpgrade) {
      // Build redirect URL preserving path, query, and hash
      const redirectUrl = new URL(OFFICIAL_PORTAL_URL);
      redirectUrl.pathname = window.location.pathname;
      redirectUrl.search = window.location.search;
      redirectUrl.hash = window.location.hash;

      // Perform redirect
      console.log(`[Domain Redirect] Redirecting from ${currentProtocol}//${currentHostname} to ${redirectUrl.toString()}`);
      window.location.replace(redirectUrl.toString());
    }
  }, []);
}
