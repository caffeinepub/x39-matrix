import { useState, useCallback } from 'react';
import { useActor } from './useActor';
import { OFFICIAL_PORTAL_URL, getCurrentOrigin, isSecureContext } from '../utils/urls';

export type CheckStatus = 'pending' | 'pass' | 'fail';

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

    // Check 3: Static Asset Reachability
    try {
      const assetUrl = `${OFFICIAL_PORTAL_URL}/assets/generated/x39matrix-favicon.dim_32x32.png`;
      const reachable = await checkAssetReachability(assetUrl);
      
      if (reachable) {
        checks.push({
          id: 'asset-reachability',
          name: 'Static Asset Access',
          status: 'pass',
          message: 'Static assets are reachable from official domain',
          details: `Tested: ${assetUrl}`,
        });
      } else {
        checks.push({
          id: 'asset-reachability',
          name: 'Static Asset Access',
          status: 'fail',
          message: 'Failed to load static assets from official domain',
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

    // Check 4: Backend Health
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
    report += `Official Portal: ${OFFICIAL_PORTAL_URL}\n\n`;
    
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
    
    return report;
  }, [state]);

  return {
    ...state,
    runDiagnostics,
    generateReport,
  };
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
