import { useState, useCallback } from 'react';
import { useActor } from './useActor';
import { OFFICIAL_PORTAL_URL, SATELLITE_DOMAINS, getCurrentOrigin, isSecureContext, isSatelliteDomain, getSatelliteDomainName, isWwwVariant } from '../utils/urls';

export type CheckStatus = 'pending' | 'pass' | 'fail' | 'warn' | 'unknown';

export interface DiagnosticCheck {
  id: string;
  name: string;
  status: CheckStatus;
  message: string;
  details?: string;
}

export interface BackendHealthInfo {
  version?: string;
  timestamp?: number;
  canisterId?: string;
}

export interface DiagnosticsState {
  checks: DiagnosticCheck[];
  isRunning: boolean;
  backendHealth: BackendHealthInfo | null;
}

export function useConnectivityDiagnostics() {
  const { actor } = useActor();
  const [state, setState] = useState<DiagnosticsState>({
    checks: [],
    isRunning: false,
    backendHealth: null,
  });

  const runDiagnostics = useCallback(async () => {
    setState(prev => ({ ...prev, isRunning: true, checks: [] }));

    const checks: DiagnosticCheck[] = [];

    // Check 1: Domain Classification and Satellite Detection
    try {
      const currentOrigin = getCurrentOrigin();
      const expectedOrigin = OFFICIAL_PORTAL_URL;
      const isSatellite = isSatelliteDomain();
      const satelliteName = getSatelliteDomainName();
      const isWww = isWwwVariant();
      
      if (currentOrigin === expectedOrigin) {
        checks.push({
          id: 'domain-consistency',
          name: 'Canonical Domain',
          status: 'pass',
          message: 'Application is served from the official canonical domain (https://x39matrix.org)',
          details: `Current: ${currentOrigin}`,
        });
      } else if (isSatellite && satelliteName) {
        const wwwPrefix = isWww ? 'www.' : '';
        checks.push({
          id: 'domain-consistency',
          name: 'Satellite Domain Detected',
          status: 'warn',
          message: `You are accessing via satellite domain ${wwwPrefix}${satelliteName}. This domain should redirect to ${OFFICIAL_PORTAL_URL} while preserving path/query/hash.`,
          details: `Current: ${currentOrigin}. Expected redirect behavior: Client-side redirect to ${OFFICIAL_PORTAL_URL} preserving deep links. For production, implement server-side 301 redirects.`,
        });
      } else {
        checks.push({
          id: 'domain-consistency',
          name: 'Canonical Domain',
          status: 'fail',
          message: 'Application is not served from the canonical domain. This indicates a DNS configuration issue or you are accessing via a canister URL.',
          details: `Expected: ${expectedOrigin}, Current: ${currentOrigin}. Ensure DNS A/AAAA records point to IC boundary node IPs from IC Dashboard.`,
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'domain-consistency',
        name: 'Canonical Domain',
        status: 'fail',
        message: 'Failed to check domain consistency',
        details: error?.message || 'Unknown error',
      });
    }

    // Check 2: HTTPS Status
    try {
      const isHttps = isSecureContext();
      if (isHttps) {
        checks.push({
          id: 'https-status',
          name: 'HTTPS Connection',
          status: 'pass',
          message: 'Connection is secure (HTTPS). TLS certificate is valid.',
        });
      } else {
        checks.push({
          id: 'https-status',
          name: 'HTTPS Connection',
          status: 'fail',
          message: 'Connection is not secure (HTTP). HTTPS is required for production use.',
          details: 'After DNS propagation, IC boundary nodes will automatically provision a Let\'s Encrypt TLS certificate (typically 10-30 minutes). Wait for certificate provisioning to complete.',
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'https-status',
        name: 'HTTPS Connection',
        status: 'fail',
        message: 'Failed to check HTTPS status',
        details: error?.message || 'Unknown error',
      });
    }

    // Check 3: HSTS Detection (best-effort)
    try {
      const hstsResult = await checkHSTS();
      checks.push({
        id: 'hsts-status',
        name: 'HSTS (HTTP Strict Transport Security)',
        status: hstsResult.status,
        message: hstsResult.message,
        details: hstsResult.details,
      });
    } catch (error: any) {
      checks.push({
        id: 'hsts-status',
        name: 'HSTS (HTTP Strict Transport Security)',
        status: 'unknown',
        message: 'Unable to detect HSTS header',
        details: error?.message || 'HSTS detection requires server response headers',
      });
    }

    // Check 4: Static Asset Reachability
    try {
      const assetUrl = `${OFFICIAL_PORTAL_URL}/assets/generated/app-icon.dim_1024x1024.png`;
      const reachable = await checkAssetReachability(assetUrl);
      
      if (reachable) {
        checks.push({
          id: 'asset-reachability',
          name: 'Static Asset Access',
          status: 'pass',
          message: 'Generated assets are reachable from official domain',
          details: `Tested: ${assetUrl}`,
        });
      } else {
        checks.push({
          id: 'asset-reachability',
          name: 'Static Asset Access',
          status: 'fail',
          message: 'Failed to load generated assets from official domain. This may indicate a DNS target mismatch or the "default Nginx page" symptom.',
          details: `Asset URL: ${assetUrl}. If you see a "Welcome to nginx!" page, verify custom domain is registered in IC Dashboard and DNS A/AAAA records match IPs from dashboard exactly.`,
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'asset-reachability',
        name: 'Static Asset Access',
        status: 'fail',
        message: 'Error checking static asset reachability. This may indicate a content delivery issue.',
        details: error?.message || 'Unknown error',
      });
    }

    // Check 5: Satellite Redirect Behavior (if on satellite domain)
    const isSatellite = isSatelliteDomain();
    if (isSatellite) {
      const satelliteName = getSatelliteDomainName();
      const isWww = isWwwVariant();
      const wwwPrefix = isWww ? 'www.' : '';
      
      checks.push({
        id: 'satellite-redirect',
        name: 'Satellite Redirect Behavior',
        status: 'warn',
        message: `Satellite domain ${wwwPrefix}${satelliteName} detected. Client-side redirect to ${OFFICIAL_PORTAL_URL} is active and will preserve path/query/hash.`,
        details: `Current implementation: Best-effort client-side redirect via useDomainRedirect hook. For production SEO benefits, implement server-side 301 redirects at IC boundary node or DNS level. See frontend/docs/release/domain-strategy-and-hardening.en.md for instructions.`,
      });
    }

    // Check 6: Backend Health
    let backendHealth: BackendHealthInfo | null = null;
    try {
      if (!actor) {
        checks.push({
          id: 'backend-health',
          name: 'Backend Connection',
          status: 'fail',
          message: 'Backend actor not available',
          details: 'Actor initialization may be in progress. If this persists, verify backend canister is deployed and running.',
        });
      } else {
        const health = await actor.checkBackendHealth();
        backendHealth = {
          version: health.version,
          timestamp: Number(health.timestamp),
          canisterId: 'Connected',
        };
        
        checks.push({
          id: 'backend-health',
          name: 'Backend Connection',
          status: 'pass',
          message: 'Backend is reachable and healthy',
          details: `Version: ${health.version}`,
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'backend-health',
        name: 'Backend Connection',
        status: 'fail',
        message: 'Backend unreachable. Verify backend canister is deployed and running on mainnet.',
        details: error?.message || 'Failed to connect to backend canister. Check canister status with: dfx canister --network ic status backend',
      });
    }

    setState({
      checks,
      isRunning: false,
      backendHealth,
    });
  }, [actor]);

  const generateReport = useCallback(() => {
    const { checks, backendHealth } = state;
    const timestamp = new Date().toISOString();
    const currentOrigin = getCurrentOrigin();
    const isHttps = isSecureContext();
    const isSatellite = isSatelliteDomain();
    const satelliteName = getSatelliteDomainName();
    const isWww = isWwwVariant();

    let report = `=== X39 Matrix Connectivity Diagnostics ===\n`;
    report += `Timestamp: ${timestamp}\n`;
    report += `Current Origin: ${currentOrigin}\n`;
    report += `Official Portal: ${OFFICIAL_PORTAL_URL}\n`;
    report += `Satellite Domains: ${SATELLITE_DOMAINS.join(', ')} (including www variants)\n`;
    report += `HTTPS: ${isHttps ? 'Yes' : 'No'}\n`;
    
    if (isSatellite && satelliteName) {
      const wwwPrefix = isWww ? 'www.' : '';
      report += `\n⚠️ SATELLITE DOMAIN DETECTED: ${wwwPrefix}${satelliteName}\n`;
      report += `Expected behavior: Client-side redirect to ${OFFICIAL_PORTAL_URL} preserving path/query/hash\n`;
      report += `For production: Implement server-side 301 redirects for SEO benefits\n`;
    }
    report += `\n`;

    if (backendHealth) {
      report += `=== Backend Health ===\n`;
      report += `Status: Reachable\n`;
      report += `Version: ${backendHealth.version || 'N/A'}\n`;
      if (backendHealth.timestamp) {
        report += `Backend Time: ${new Date(Number(backendHealth.timestamp) / 1000000).toISOString()}\n`;
      }
      report += `\n`;
    } else {
      report += `=== Backend Health ===\n`;
      report += `Status: Unreachable\n\n`;
    }

    report += `=== Diagnostic Checks ===\n`;
    checks.forEach(check => {
      report += `\n[${check.status.toUpperCase()}] ${check.name}\n`;
      report += `  ${check.message}\n`;
      if (check.details) {
        report += `  Details: ${check.details}\n`;
      }
    });

    report += `\n=== Interpretation ===\n`;
    
    // Satellite domain interpretation
    if (isSatellite && satelliteName) {
      const wwwPrefix = isWww ? 'www.' : '';
      report += `\n✓ Satellite Domain Access:\n`;
      report += `You are accessing via ${wwwPrefix}${satelliteName}, which is a registered satellite domain.\n`;
      report += `The application includes client-side redirect logic to ${OFFICIAL_PORTAL_URL}.\n`;
      report += `This is expected behavior for satellite domain verification.\n`;
      report += `For production SEO benefits, configure server-side 301 redirects.\n`;
      report += `See: frontend/docs/release/domain-strategy-and-hardening.en.md\n`;
    }
    
    // Domain mismatch interpretation (non-satellite)
    const domainCheck = checks.find(c => c.id === 'domain-consistency');
    if (domainCheck && domainCheck.status === 'fail') {
      report += `\n⚠️ Domain Mismatch Detected:\n`;
      report += `You are not accessing the application via the canonical domain (https://x39matrix.org).\n`;
      report += `This indicates:\n`;
      report += `  - DNS A/AAAA records may not be configured correctly\n`;
      report += `  - You may be accessing via a canister URL\n`;
      report += `  - Custom domain may not be registered in IC Dashboard\n`;
      report += `Action: Register domain in IC Dashboard, configure DNS A/AAAA records with IPs from dashboard.\n`;
    }

    // HTTPS failure interpretation
    const httpsCheck = checks.find(c => c.id === 'https-status');
    if (httpsCheck && httpsCheck.status === 'fail') {
      report += `\n⚠️ HTTPS Failure Detected:\n`;
      report += `The connection is not secure (HTTP instead of HTTPS).\n`;
      report += `This indicates:\n`;
      report += `  - TLS certificate not yet provisioned by IC (wait 10-30 minutes after DNS propagation)\n`;
      report += `  - DNS propagation incomplete\n`;
      report += `  - Certificate provisioning failed (rare)\n`;
      report += `Action: Wait for TLS certificate provisioning to complete after DNS propagation.\n`;
    }

    // Asset/content failure interpretation
    const assetCheck = checks.find(c => c.id === 'asset-reachability');
    if (assetCheck && assetCheck.status === 'fail') {
      report += `\n⚠️ Asset Loading Failure Detected:\n`;
      report += `Static assets are not loading correctly from the official domain.\n`;
      report += `This may indicate:\n`;
      report += `  - DNS target mismatch (A/AAAA records point to wrong IPs)\n`;
      report += `  - "Default Nginx page" symptom (custom domain not registered in IC Dashboard)\n`;
      report += `  - Content delivery issue\n`;
      report += `Action: Verify custom domain registration in IC Dashboard and DNS A/AAAA records match IPs from dashboard exactly.\n`;
    }

    report += `\n=== Next Steps ===\n`;
    const failedChecks = checks.filter(c => c.status === 'fail');
    const warnChecks = checks.filter(c => c.status === 'warn');
    
    if (failedChecks.length === 0 && warnChecks.length === 0) {
      report += `✅ All checks passed. Application is ready for production use.\n`;
    } else if (failedChecks.length === 0 && warnChecks.length > 0) {
      report += `⚠️ ${warnChecks.length} warning(s). Satellite domain access detected - this is expected for verification.\n`;
      report += `For production, configure server-side 301 redirects for SEO benefits.\n`;
    } else {
      report += `❌ ${failedChecks.length} check(s) failed. Review issues above and consult documentation.\n`;
      report += `📖 See: frontend/docs/release/go-live-runbook-2026-03-15.en.md\n`;
    }

    return report;
  }, [state]);

  return {
    ...state,
    runDiagnostics,
    generateReport,
  };
}

// Helper function to check HSTS
async function checkHSTS(): Promise<{ status: CheckStatus; message: string; details?: string }> {
  try {
    const response = await fetch(OFFICIAL_PORTAL_URL, { method: 'HEAD' });
    const hstsHeader = response.headers.get('strict-transport-security');
    
    if (hstsHeader) {
      return {
        status: 'pass',
        message: 'HSTS header is present',
        details: `Header: ${hstsHeader}`,
      };
    } else {
      return {
        status: 'unknown',
        message: 'HSTS header not detected',
        details: 'HSTS is optional but recommended for security',
      };
    }
  } catch (error: any) {
    return {
      status: 'unknown',
      message: 'Unable to check HSTS header',
      details: error?.message || 'HSTS detection requires server response headers',
    };
  }
}

// Helper function to check asset reachability
async function checkAssetReachability(assetUrl: string): Promise<boolean> {
  try {
    const response = await fetch(assetUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
