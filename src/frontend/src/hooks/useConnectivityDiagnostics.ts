import { useState, useCallback } from 'react';
import { useActor } from './useActor';
import { OFFICIAL_PORTAL_URL, SATELLITE_DOMAINS, getCurrentOrigin, isSecureContext } from '../utils/urls';

export type CheckStatus = 'pending' | 'pass' | 'fail' | 'unknown';

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

    // Check 1: Canonical Domain Consistency
    try {
      const currentOrigin = getCurrentOrigin();
      const expectedOrigin = OFFICIAL_PORTAL_URL;
      
      if (currentOrigin === expectedOrigin) {
        checks.push({
          id: 'domain-consistency',
          name: 'Canonical Domain',
          status: 'pass',
          message: 'Application is served from the official domain',
          details: `Current: ${currentOrigin}`,
        });
      } else {
        checks.push({
          id: 'domain-consistency',
          name: 'Canonical Domain',
          status: 'fail',
          message: 'Application is not served from the official domain',
          details: `Expected: ${expectedOrigin}, Current: ${currentOrigin}`,
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
          message: 'Connection is secure (HTTPS)',
        });
      } else {
        checks.push({
          id: 'https-status',
          name: 'HTTPS Connection',
          status: 'fail',
          message: 'Connection is not secure (HTTP)',
          details: 'HTTPS is required for secure operation',
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
          message: 'Failed to load generated assets from official domain',
          details: `Asset URL: ${assetUrl}`,
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'asset-reachability',
        name: 'Static Asset Access',
        status: 'fail',
        message: 'Error checking static asset reachability',
        details: error?.message || 'Unknown error',
      });
    }

    // Check 5: Backend Health
    let backendHealth: BackendHealthInfo | null = null;
    try {
      if (!actor) {
        checks.push({
          id: 'backend-health',
          name: 'Backend Connection',
          status: 'fail',
          message: 'Backend actor not available',
          details: 'Actor initialization may be in progress',
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
        message: 'Backend unreachable',
        details: error?.message || 'Failed to connect to backend canister',
      });
    }

    setState({
      checks,
      isRunning: false,
      backendHealth,
    });
  }, [actor]);

  const generateReport = useCallback((): string => {
    const origin = getCurrentOrigin();
    const isHttps = isSecureContext();
    const timestamp = new Date().toISOString();
    
    let report = `=== x39Matrix Connectivity Diagnostics ===\n`;
    report += `Timestamp: ${timestamp}\n`;
    report += `Current Origin: ${origin}\n`;
    report += `HTTPS: ${isHttps ? 'Yes' : 'No'}\n`;
    report += `Official Portal: ${OFFICIAL_PORTAL_URL}\n`;
    report += `Satellite Domains: ${SATELLITE_DOMAINS.join(', ')}\n\n`;
    
    report += `=== Diagnostic Checks ===\n`;
    state.checks.forEach(check => {
      report += `\n[${check.status.toUpperCase()}] ${check.name}\n`;
      report += `  ${check.message}\n`;
      if (check.details) {
        report += `  Details: ${check.details}\n`;
      }
    });
    
    if (state.backendHealth) {
      report += `\n=== Backend Health ===\n`;
      report += `Version: ${state.backendHealth.version || 'N/A'}\n`;
      if (state.backendHealth.timestamp) {
        report += `Backend Time: ${new Date(Number(state.backendHealth.timestamp) / 1000000).toISOString()}\n`;
      }
    }

    // Add troubleshooting section
    report += `\n=== Troubleshooting ===\n`;
    report += `If you see a "default Nginx page" instead of the X39 Matrix application:\n`;
    report += `1. Verify custom domain is registered in IC Dashboard (Canister Settings → Custom Domains)\n`;
    report += `2. Check DNS records point to IC boundary nodes (use: dig x39matrix.org)\n`;
    report += `3. Wait for certificate provisioning (10-30 minutes after domain registration)\n`;
    report += `4. Clear browser cache and try incognito/private mode\n`;
    report += `5. Verify canister is deployed (dfx canister --network ic status frontend)\n`;
    
    return report;
  }, [state]);

  return {
    ...state,
    runDiagnostics,
    generateReport,
  };
}

// Helper function to check HSTS header (best-effort)
async function checkHSTS(): Promise<{ status: CheckStatus; message: string; details?: string }> {
  try {
    const response = await fetch(OFFICIAL_PORTAL_URL, { method: 'HEAD' });
    const hstsHeader = response.headers.get('strict-transport-security');
    
    if (hstsHeader) {
      return {
        status: 'pass',
        message: 'HSTS header detected',
        details: `Header: ${hstsHeader}`,
      };
    } else {
      return {
        status: 'unknown',
        message: 'HSTS header not detected in response',
        details: 'This may be normal if HSTS is enforced at boundary node level',
      };
    }
  } catch (error: any) {
    return {
      status: 'unknown',
      message: 'Unable to check HSTS header',
      details: error?.message || 'CORS or network restrictions may prevent header inspection',
    };
  }
}

// Helper function to check asset reachability using browser-safe image loading
async function checkAssetReachability(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      img.src = '';
      resolve(false);
    }, 5000);

    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };

    img.src = url;
  });
}
