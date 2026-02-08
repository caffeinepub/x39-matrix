import React, { useEffect, useState } from 'react';
import { useConnectivityDiagnostics } from '../hooks/useConnectivityDiagnostics';
import { OFFICIAL_PORTAL_URL, getCurrentOrigin, isSecureContext, SATELLITE_DOMAINS } from '../utils/urls';
import { LAUNCH_DATE, isLaunchLive, getLaunchDateString } from '../config/launchDate';
import { X, CheckCircle, XCircle, AlertTriangle, Copy, RefreshCw, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface LaunchDryRunProps {
  onClose: () => void;
}

type CheckResult = 'pass' | 'fail' | 'warn' | 'pending';

interface DryRunCheck {
  id: string;
  name: string;
  status: CheckResult;
  message: string;
  details?: string;
}

export function LaunchDryRun({ onClose }: LaunchDryRunProps) {
  const { checks: diagnosticChecks, isRunning: diagnosticsRunning, backendHealth, runDiagnostics, generateReport: generateDiagnosticsReport } = useConnectivityDiagnostics();
  const [dryRunChecks, setDryRunChecks] = useState<DryRunCheck[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    runAllChecks();
  }, []);

  const runAllChecks = async () => {
    setIsRunning(true);
    
    // Run connectivity diagnostics first
    await runDiagnostics();
    
    // Run dry-run specific checks
    const checks: DryRunCheck[] = [];

    // Check 1: Canonical Domain
    try {
      const currentOrigin = getCurrentOrigin();
      const expectedOrigin = OFFICIAL_PORTAL_URL;
      
      if (currentOrigin === expectedOrigin) {
        checks.push({
          id: 'canonical-domain',
          name: 'Canonical Domain',
          status: 'pass',
          message: 'Application is served from the official canonical domain',
          details: `Current: ${currentOrigin}`,
        });
      } else {
        checks.push({
          id: 'canonical-domain',
          name: 'Canonical Domain',
          status: 'fail',
          message: 'Application is NOT served from the official canonical domain',
          details: `Expected: ${expectedOrigin}, Current: ${currentOrigin}`,
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'canonical-domain',
        name: 'Canonical Domain',
        status: 'fail',
        message: 'Failed to verify canonical domain',
        details: error?.message || 'Unknown error',
      });
    }

    // Check 2: Satellite Domain Redirect Detection
    try {
      const currentHostname = window.location.hostname.toLowerCase();
      const isSatellite = SATELLITE_DOMAINS.some(
        domain => currentHostname === domain || currentHostname.endsWith(`.${domain}`)
      );
      
      if (isSatellite) {
        checks.push({
          id: 'satellite-redirect',
          name: 'Satellite Domain Redirect',
          status: 'warn',
          message: 'Currently on a satellite domain - client-side redirect should trigger',
          details: `Satellite domains: ${SATELLITE_DOMAINS.join(', ')}. Client-side redirect is active.`,
        });
      } else if (currentHostname === new URL(OFFICIAL_PORTAL_URL).hostname) {
        checks.push({
          id: 'satellite-redirect',
          name: 'Satellite Domain Redirect',
          status: 'pass',
          message: 'On canonical domain - satellite redirect not needed',
          details: 'Client-side redirect logic is in place for satellite domains',
        });
      } else {
        checks.push({
          id: 'satellite-redirect',
          name: 'Satellite Domain Redirect',
          status: 'warn',
          message: 'On unknown domain - redirect behavior may vary',
          details: `Current: ${currentHostname}`,
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'satellite-redirect',
        name: 'Satellite Domain Redirect',
        status: 'fail',
        message: 'Failed to check satellite domain redirect',
        details: error?.message || 'Unknown error',
      });
    }

    // Check 3: HTTPS Usage
    try {
      const isHttps = isSecureContext();
      if (isHttps) {
        checks.push({
          id: 'https-usage',
          name: 'HTTPS Connection',
          status: 'pass',
          message: 'Connection is secure (HTTPS)',
        });
      } else {
        checks.push({
          id: 'https-usage',
          name: 'HTTPS Connection',
          status: 'fail',
          message: 'Connection is NOT secure (HTTP)',
          details: 'HTTPS is required for production launch',
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'https-usage',
        name: 'HTTPS Connection',
        status: 'fail',
        message: 'Failed to verify HTTPS status',
        details: error?.message || 'Unknown error',
      });
    }

    // Check 4: robots.txt Reachability
    try {
      const robotsUrl = `${OFFICIAL_PORTAL_URL}/robots.txt`;
      const reachable = await checkUrlReachability(robotsUrl);
      
      if (reachable) {
        checks.push({
          id: 'robots-txt',
          name: 'robots.txt Reachability',
          status: 'pass',
          message: 'robots.txt is reachable',
          details: `URL: ${robotsUrl}`,
        });
      } else {
        checks.push({
          id: 'robots-txt',
          name: 'robots.txt Reachability',
          status: 'fail',
          message: 'robots.txt is NOT reachable',
          details: `URL: ${robotsUrl}`,
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'robots-txt',
        name: 'robots.txt Reachability',
        status: 'fail',
        message: 'Failed to check robots.txt reachability',
        details: error?.message || 'Unknown error',
      });
    }

    // Check 5: sitemap.xml Reachability
    try {
      const sitemapUrl = `${OFFICIAL_PORTAL_URL}/sitemap.xml`;
      const reachable = await checkUrlReachability(sitemapUrl);
      
      if (reachable) {
        checks.push({
          id: 'sitemap-xml',
          name: 'sitemap.xml Reachability',
          status: 'pass',
          message: 'sitemap.xml is reachable',
          details: `URL: ${sitemapUrl}`,
        });
      } else {
        checks.push({
          id: 'sitemap-xml',
          name: 'sitemap.xml Reachability',
          status: 'fail',
          message: 'sitemap.xml is NOT reachable',
          details: `URL: ${sitemapUrl}`,
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'sitemap-xml',
        name: 'sitemap.xml Reachability',
        status: 'fail',
        message: 'Failed to check sitemap.xml reachability',
        details: error?.message || 'Unknown error',
      });
    }

    // Check 6: Legal Disclaimer Launch Date Gating
    try {
      const now = new Date();
      const launchDate = LAUNCH_DATE;
      const isLive = isLaunchLive();
      
      if (isLive) {
        checks.push({
          id: 'legal-disclaimer',
          name: 'Legal Disclaimer Launch Date',
          status: 'pass',
          message: 'Launch date has passed - Legal Disclaimer is published',
          details: `Launch date: ${getLaunchDateString()}, Current: ${now.toISOString()}`,
        });
      } else {
        const daysUntilLaunch = Math.ceil((launchDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        checks.push({
          id: 'legal-disclaimer',
          name: 'Legal Disclaimer Launch Date',
          status: 'warn',
          message: 'Launch date has NOT passed - Legal Disclaimer shows "not yet effective" state',
          details: `Launch date: ${getLaunchDateString()}, Days until launch: ${daysUntilLaunch}`,
        });
      }
    } catch (error: any) {
      checks.push({
        id: 'legal-disclaimer',
        name: 'Legal Disclaimer Launch Date',
        status: 'fail',
        message: 'Failed to check legal disclaimer launch date',
        details: error?.message || 'Unknown error',
      });
    }

    setDryRunChecks(checks);
    setIsRunning(false);
  };

  const handleCopyReport = async () => {
    try {
      const report = generateFullReport();
      await navigator.clipboard.writeText(report);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const generateFullReport = (): string => {
    const timestamp = new Date().toISOString();
    const currentOrigin = getCurrentOrigin();
    const isHttps = isSecureContext();
    
    let report = `=== X39 MATRIX LAUNCH DRY-RUN REPORT ===\n`;
    report += `Timestamp: ${timestamp}\n`;
    report += `Current Origin: ${currentOrigin}\n`;
    report += `HTTPS: ${isHttps ? 'Yes' : 'No'}\n`;
    report += `Official Portal: ${OFFICIAL_PORTAL_URL}\n`;
    report += `Launch Date: ${getLaunchDateString()}\n\n`;
    
    report += `=== PRE-LAUNCH CHECKS ===\n`;
    dryRunChecks.forEach(check => {
      report += `\n[${check.status.toUpperCase()}] ${check.name}\n`;
      report += `  ${check.message}\n`;
      if (check.details) {
        report += `  Details: ${check.details}\n`;
      }
    });
    
    report += `\n\n=== CONNECTIVITY DIAGNOSTICS ===\n`;
    report += generateDiagnosticsReport();
    
    // Add troubleshooting guidance
    const hasFailures = dryRunChecks.some(c => c.status === 'fail') || diagnosticChecks.some(c => c.status === 'fail');
    const hasDomainIssue = dryRunChecks.some(c => c.id === 'canonical-domain' && c.status === 'fail') || 
                           diagnosticChecks.some(c => c.id === 'domain-consistency' && c.status === 'fail');
    
    if (hasFailures) {
      report += `\n\n=== TROUBLESHOOTING GUIDANCE ===\n`;
      
      if (hasDomainIssue) {
        report += `\nDomain mapping issue detected. Please review:\n`;
        report += `- Documentation: frontend/docs/release/global-availability-readiness-checklist.md\n`;
        report += `- Domain strategy: frontend/docs/release/domain-strategy-and-hardening.en.md\n`;
        report += `\nCommon fixes:\n`;
        report += `1. Verify custom domain is registered in IC Dashboard\n`;
        report += `2. Check DNS records point to IC boundary nodes\n`;
        report += `3. Wait for certificate provisioning (10-30 minutes)\n`;
        report += `4. Clear browser cache and try incognito mode\n`;
      }
      
      report += `\nFor additional support, consult the in-repo documentation listed above.\n`;
    }
    
    return report;
  };

  const getStatusIcon = (status: CheckResult) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warn':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <RefreshCw className="w-5 h-5 text-gray-500 animate-spin" />;
      default:
        return null;
    }
  };

  const allChecks = [...dryRunChecks, ...diagnosticChecks];
  const passCount = allChecks.filter(c => c.status === 'pass').length;
  const failCount = allChecks.filter(c => c.status === 'fail').length;
  const warnCount = allChecks.filter(c => c.status === 'warn' || c.status === 'unknown').length;

  const hasDomainIssue = dryRunChecks.some(c => c.id === 'canonical-domain' && c.status === 'fail') || 
                         diagnosticChecks.some(c => c.id === 'domain-consistency' && c.status === 'fail');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-black border-2 border-red-500/50 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-500/30">
          <div>
            <h2 className="text-2xl font-bold text-red-500 font-orbitron neon-text-red">
              Launch Dry-Run
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-montserrat">
              Pre-launch verification and readiness checklist
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Close launch dry-run"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-500">{passCount}</div>
              <div className="text-sm text-gray-400 font-montserrat">Passed</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-500">{failCount}</div>
              <div className="text-sm text-gray-400 font-montserrat">Failed</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-500">{warnCount}</div>
              <div className="text-sm text-gray-400 font-montserrat">Warnings</div>
            </div>
          </div>

          {/* Pre-Launch Checks */}
          <div className="bg-black/50 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white font-orbitron">
                Pre-Launch Checks
              </h3>
              <Button
                onClick={runAllChecks}
                disabled={isRunning || diagnosticsRunning}
                variant="outline"
                size="sm"
                className="border-red-500/50 text-red-500 hover:bg-red-500/10"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRunning || diagnosticsRunning ? 'animate-spin' : ''}`} />
                {isRunning || diagnosticsRunning ? 'Running...' : 'Rerun'}
              </Button>
            </div>

            {isRunning && dryRunChecks.length === 0 ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 text-red-500 animate-spin mx-auto mb-2" />
                <p className="text-gray-400 font-montserrat">Running pre-launch checks...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dryRunChecks.map((check) => (
                  <div
                    key={check.id}
                    className="bg-black/30 border border-red-500/20 rounded p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getStatusIcon(check.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-semibold font-orbitron text-sm">
                            {check.name}
                          </h4>
                          <span
                            className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                              check.status === 'pass'
                                ? 'bg-green-500/20 text-green-500'
                                : check.status === 'fail'
                                ? 'bg-red-500/20 text-red-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}
                          >
                            {check.status}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm font-montserrat mb-1">
                          {check.message}
                        </p>
                        {check.details && (
                          <p className="text-gray-500 text-xs font-mono break-all">
                            {check.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Backend Health */}
          {backendHealth && (
            <div className="bg-black/50 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-4 font-orbitron">
                Backend Health
              </h3>
              <div className="space-y-2 text-sm font-montserrat">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-500 font-semibold">Healthy</span>
                </div>
                {backendHealth.version && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version:</span>
                    <span className="text-white">{backendHealth.version}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Connectivity Diagnostics Summary */}
          <div className="bg-black/50 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-lg font-bold text-white mb-4 font-orbitron">
              Connectivity Diagnostics
            </h3>
            <div className="space-y-3">
              {diagnosticChecks.map((check) => (
                <div
                  key={check.id}
                  className="bg-black/30 border border-red-500/20 rounded p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getStatusIcon(check.status as CheckResult)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-semibold font-orbitron text-sm">
                          {check.name}
                        </h4>
                        <span
                          className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                            check.status === 'pass'
                              ? 'bg-green-500/20 text-green-500'
                              : check.status === 'fail'
                              ? 'bg-red-500/20 text-red-500'
                              : 'bg-yellow-500/20 text-yellow-500'
                          }`}
                        >
                          {check.status}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm font-montserrat mb-1">
                        {check.message}
                      </p>
                      {check.details && (
                        <p className="text-gray-500 text-xs font-mono break-all">
                          {check.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Troubleshooting Guidance */}
          {hasDomainIssue && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-yellow-500 mb-4 font-orbitron flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Troubleshooting: Domain Mapping Issue Detected
              </h3>
              <div className="text-sm text-gray-300 font-montserrat space-y-3">
                <p className="font-semibold text-white">
                  A custom domain mapping issue has been detected. Please review the following documentation:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <code className="text-yellow-500">frontend/docs/release/global-availability-readiness-checklist.md</code>
                  </li>
                  <li>
                    <code className="text-yellow-500">frontend/docs/release/domain-strategy-and-hardening.en.md</code>
                  </li>
                </ul>
                <p className="font-semibold text-white mt-4">Common fixes:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Verify custom domain is registered in IC Dashboard (Canister Settings → Custom Domains)</li>
                  <li>Check DNS records point to IC boundary nodes (use: <code className="text-yellow-500">dig x39matrix.org</code>)</li>
                  <li>Wait for certificate provisioning (10-30 minutes after domain registration)</li>
                  <li>Clear browser cache and try incognito/private mode</li>
                  <li>Verify canister is deployed (<code className="text-yellow-500">dfx canister --network ic status frontend</code>)</li>
                </ol>
                <p className="text-gray-400 text-xs mt-3">
                  For additional support, consult the in-repo documentation listed above.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-red-500/30 flex items-center justify-between">
          <p className="text-gray-400 text-sm font-montserrat">
            {allChecks.length > 0 && (
              <>
                {passCount} passed, {failCount} failed, {warnCount} warnings
              </>
            )}
          </p>
          <div className="flex gap-3">
            <Button
              onClick={handleCopyReport}
              variant="outline"
              className="border-red-500/50 text-red-500 hover:bg-red-500/10"
              disabled={allChecks.length === 0}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copyStatus === 'success'
                ? 'Copied!'
                : copyStatus === 'error'
                ? 'Failed'
                : 'Copy Report'}
            </Button>
            <Button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to check URL reachability using fetch with timeout
async function checkUrlReachability(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });
    
    clearTimeout(timeout);
    return response.ok;
  } catch (error) {
    return false;
  }
}
