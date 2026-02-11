import React, { useState } from 'react';
import { useConnectivityDiagnostics, CheckStatus } from '../hooks/useConnectivityDiagnostics';
import { OFFICIAL_PORTAL_URL, SATELLITE_DOMAINS, getCurrentOrigin, isSecureContext, isSatelliteDomain, getSatelliteDomainName, isWwwVariant } from '../utils/urls';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Copy, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageContext';

interface DomainDnsVerificationViewProps {
  checks: ReturnType<typeof useConnectivityDiagnostics>['checks'];
  backendHealth: ReturnType<typeof useConnectivityDiagnostics>['backendHealth'];
  onCopyReport: () => void;
}

export function DomainDnsVerificationView({ checks, backendHealth, onCopyReport }: DomainDnsVerificationViewProps) {
  const { t } = useLanguage();
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const currentOrigin = getCurrentOrigin();
  const isHttps = isSecureContext();
  const isSatellite = isSatelliteDomain();
  const satelliteName = getSatelliteDomainName();
  const isWww = isWwwVariant();

  const handleCopyCutoverReport = async () => {
    try {
      const report = generateCutoverReport();
      await navigator.clipboard.writeText(report);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
      onCopyReport();
    } catch (error) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const generateCutoverReport = () => {
    const timestamp = new Date().toISOString();
    const wwwPrefix = isWww ? 'www.' : '';
    
    let report = `=== X39 Matrix Domain & DNS Cutover Report ===\n`;
    report += `Generated: ${timestamp}\n\n`;
    
    report += `=== Current Status ===\n`;
    report += `Current Origin: ${currentOrigin}\n`;
    report += `Canonical Domain: ${OFFICIAL_PORTAL_URL}\n`;
    report += `HTTPS: ${isHttps ? 'Yes ✓' : 'No ✗'}\n`;
    
    if (isSatellite && satelliteName) {
      report += `Satellite Domain: ${wwwPrefix}${satelliteName} (detected)\n`;
      report += `Expected Behavior: Redirect to ${OFFICIAL_PORTAL_URL} preserving path/query/hash\n`;
    }
    
    report += `\n=== Domain Configuration ===\n`;
    report += `Canonical: ${OFFICIAL_PORTAL_URL}\n`;
    report += `Satellites: ${SATELLITE_DOMAINS.join(', ')} (including www variants)\n`;
    report += `\nAll satellite domains should redirect to canonical while preserving deep links.\n`;
    
    report += `\n=== Verification Checks ===\n`;
    const domainCheck = checks.find(c => c.id === 'domain-consistency');
    const httpsCheck = checks.find(c => c.id === 'https-status');
    const assetCheck = checks.find(c => c.id === 'asset-reachability');
    const backendCheck = checks.find(c => c.id === 'backend-health');
    
    report += `Domain: ${domainCheck ? getStatusSymbol(domainCheck.status) : '?'}\n`;
    report += `HTTPS: ${httpsCheck ? getStatusSymbol(httpsCheck.status) : '?'}\n`;
    report += `Assets: ${assetCheck ? getStatusSymbol(assetCheck.status) : '?'}\n`;
    report += `Backend: ${backendCheck ? getStatusSymbol(backendCheck.status) : '?'}\n`;
    
    if (isSatellite && satelliteName) {
      report += `\n=== Satellite Domain Guidance ===\n`;
      report += `You are accessing via ${wwwPrefix}${satelliteName}.\n`;
      report += `This is a satellite domain that should redirect to ${OFFICIAL_PORTAL_URL}.\n`;
      report += `\nCurrent Implementation:\n`;
      report += `- Client-side redirect (best-effort) via useDomainRedirect hook\n`;
      report += `- Preserves path, query parameters, and hash fragments\n`;
      report += `\nFor Production:\n`;
      report += `- Implement server-side 301 redirects for SEO benefits\n`;
      report += `- Configure at IC boundary node or DNS level (e.g., Cloudflare)\n`;
      report += `- See: frontend/docs/release/domain-strategy-and-hardening.en.md\n`;
    }
    
    report += `\n=== DNS Configuration Steps ===\n`;
    report += `\n1. Register custom domain in IC Dashboard:\n`;
    report += `   - Navigate to Canisters → Frontend → Settings → Custom Domains\n`;
    report += `   - Add domain: ${OFFICIAL_PORTAL_URL.replace('https://', '')}\n`;
    report += `   - Copy IC boundary node IPs (A and AAAA records)\n`;
    
    report += `\n2. Configure DNS at your provider (e.g., Namecheap):\n`;
    report += `   For apex domain (x39matrix.org):\n`;
    report += `   - A Record: @ → [IPv4 from IC Dashboard]\n`;
    report += `   - AAAA Record: @ → [IPv6 from IC Dashboard]\n`;
    report += `   - TTL: 300 (5 minutes for cutover)\n`;
    
    report += `\n   For www subdomain:\n`;
    report += `   - CNAME Record: www → x39matrix.org\n`;
    report += `   - TTL: 300 (5 minutes for cutover)\n`;
    
    report += `\n3. Configure satellite domains (x39matrix.com, www.x39matrix.com):\n`;
    report += `   Option A - IC Dashboard (if supported):\n`;
    report += `   - Register x39matrix.com as custom domain\n`;
    report += `   - Configure 301 redirect to ${OFFICIAL_PORTAL_URL}\n`;
    report += `   - Register www.x39matrix.com with same redirect\n`;
    
    report += `\n   Option B - DNS Provider (e.g., Cloudflare):\n`;
    report += `   - Create Page Rule or Redirect Rule\n`;
    report += `   - Match: x39matrix.com/* and www.x39matrix.com/*\n`;
    report += `   - Redirect to: ${OFFICIAL_PORTAL_URL}/$1 (301 Permanent)\n`;
    report += `   - Ensure path/query/hash preservation\n`;
    
    report += `\n4. Verify DNS propagation:\n`;
    report += `   dig x39matrix.org A +short\n`;
    report += `   dig x39matrix.org AAAA +short\n`;
    report += `   dig www.x39matrix.com CNAME +short\n`;
    
    report += `\n5. Test HTTPS and content:\n`;
    report += `   curl -I https://x39matrix.org\n`;
    report += `   curl -I https://www.x39matrix.com\n`;
    report += `   (Expect: 200 OK for canonical, redirect for www variant)\n`;
    
    report += `\n=== Common Issues ===\n`;
    report += `\n"Default Nginx Page" Symptom:\n`;
    report += `- Cause: Custom domain not registered in IC Dashboard\n`;
    report += `- Fix: Register domain in IC Dashboard → Custom Domains\n`;
    report += `- Verify: DNS A/AAAA records match IPs from dashboard exactly\n`;
    
    report += `\nDNS Target Mismatch:\n`;
    report += `- Cause: A/AAAA records point to wrong IPs\n`;
    report += `- Fix: Copy exact IPs from IC Dashboard → Custom Domains\n`;
    report += `- Verify: dig output matches IC Dashboard IPs\n`;
    
    report += `\nTLS Certificate Not Provisioned:\n`;
    report += `- Cause: Certificate provisioning in progress (10-30 min after DNS)\n`;
    report += `- Fix: Wait for automatic Let's Encrypt provisioning\n`;
    report += `- Verify: curl -I https://x39matrix.org (no cert errors)\n`;
    
    report += `\n=== Documentation References ===\n`;
    report += `- Domain Strategy: frontend/docs/release/domain-strategy-and-hardening.en.md\n`;
    report += `- Go-Live Runbook: frontend/docs/release/go-live-runbook-2026-03-15.en.md\n`;
    report += `- Launch Verification: frontend/docs/release/launch-verification-checklist.en.md\n`;
    report += `- Global Availability: frontend/docs/release/global-availability-readiness-checklist.md\n`;
    
    return report;
  };

  const getStatusSymbol = (status: CheckStatus): string => {
    switch (status) {
      case 'pass': return '✓ Pass';
      case 'fail': return '✗ Fail';
      case 'warn': return '⚠ Warning';
      case 'unknown': return '? Unknown';
      default: return '- Pending';
    }
  };

  const getStatusIcon = (status: CheckStatus) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warn':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'unknown':
        return <HelpCircle className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getOverallStatus = (): { status: CheckStatus; message: string } => {
    const failedChecks = checks.filter(c => c.status === 'fail');
    const warnChecks = checks.filter(c => c.status === 'warn');
    
    if (failedChecks.length > 0) {
      return { status: 'fail', message: `${failedChecks.length} critical issue(s) detected` };
    } else if (warnChecks.length > 0) {
      return { status: 'warn', message: `${warnChecks.length} warning(s) - satellite domain access detected` };
    } else {
      return { status: 'pass', message: 'All checks passed' };
    }
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="space-y-6">
      {/* At-a-Glance Status */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          {getStatusIcon(overallStatus.status)}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {t('diagnostics.cutoverStatus')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {overallStatus.message}
            </p>
          </div>
        </div>
      </div>

      {/* Current Origin Display */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          {t('diagnostics.currentOrigin')}
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200 font-mono break-all">
          {currentOrigin}
        </p>
        {isSatellite && satelliteName && (
          <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              <strong>Satellite domain detected:</strong> {isWww ? 'www.' : ''}{satelliteName}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              This domain should redirect to {OFFICIAL_PORTAL_URL} while preserving path/query/hash.
            </p>
          </div>
        )}
      </div>

      {/* Domain Configuration Summary */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {t('diagnostics.domainConfig')}
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Canonical Domain:</span>
            <span className="ml-2 text-gray-900 dark:text-gray-100 font-mono">{OFFICIAL_PORTAL_URL}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Satellite Domains:</span>
            <span className="ml-2 text-gray-900 dark:text-gray-100 font-mono">
              {SATELLITE_DOMAINS.join(', ')} (including www variants)
            </span>
          </div>
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              All satellite domains should redirect to the canonical domain while preserving deep links (path/query/hash).
            </p>
          </div>
        </div>
      </div>

      {/* Backend Health */}
      {backendHealth && (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {t('diagnostics.backendHealth')}
          </h3>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-sm space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-green-900 dark:text-green-100">Backend is reachable</span>
            </div>
            <div className="text-green-800 dark:text-green-200">
              Version: {backendHealth.version || 'N/A'}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Checks */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {t('diagnostics.detailedChecks')}
        </h3>
        
        <div className="space-y-2">
          {checks.map(check => (
            <div
              key={check.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-3">
                {getStatusIcon(check.status)}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    {check.name}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {check.message}
                  </p>
                  {check.details && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-mono break-all">
                      {check.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operator Guidance */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
        <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {t('diagnostics.operatorGuidance')}
        </h3>
        
        <div className="space-y-3 text-sm text-yellow-800 dark:text-yellow-200">
          <div>
            <p className="font-medium mb-1">DNS Configuration:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Register custom domain in IC Dashboard → Custom Domains</li>
              <li>Copy exact IC boundary node IPs (A and AAAA records)</li>
              <li>Configure DNS at your provider (e.g., Namecheap)</li>
              <li>For apex: A + AAAA records pointing to IC IPs</li>
              <li>For www: CNAME record pointing to apex domain</li>
            </ul>
          </div>
          
          {isSatellite && satelliteName && (
            <div>
              <p className="font-medium mb-1">Satellite Domain Configuration:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Register {satelliteName} and www.{satelliteName} in IC Dashboard</li>
                <li>Configure 301 redirects to {OFFICIAL_PORTAL_URL}</li>
                <li>Ensure path/query/hash preservation in redirect rules</li>
                <li>Alternative: Use DNS provider redirect rules (e.g., Cloudflare)</li>
              </ul>
            </div>
          )}
          
          <div>
            <p className="font-medium mb-1">Common Issues:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li><strong>Default Nginx page:</strong> Domain not registered in IC Dashboard</li>
              <li><strong>DNS mismatch:</strong> A/AAAA records don't match IC Dashboard IPs</li>
              <li><strong>TLS errors:</strong> Wait 10-30 min for certificate provisioning</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copy Cutover Report Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleCopyCutoverReport}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Copy className="w-4 h-4" />
          {copyStatus === 'success' ? t('diagnostics.copied') : t('diagnostics.copyCutoverReport')}
        </Button>
      </div>

      {/* Documentation Links */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">
          {t('diagnostics.documentation')}
        </h3>
        <div className="space-y-2 text-xs">
          <a
            href="https://github.com/your-repo/frontend/docs/release/domain-strategy-and-hardening.en.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Domain Strategy & Hardening
          </a>
          <a
            href="https://github.com/your-repo/frontend/docs/release/go-live-runbook-2026-03-15.en.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Go-Live Runbook (March 15, 2026)
          </a>
          <a
            href="https://github.com/your-repo/frontend/docs/release/launch-verification-checklist.en.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Launch Verification Checklist
          </a>
        </div>
      </div>
    </div>
  );
}
