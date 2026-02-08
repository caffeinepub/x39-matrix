import React, { useEffect, useState } from 'react';
import { useConnectivityDiagnostics } from '../hooks/useConnectivityDiagnostics';
import { OFFICIAL_PORTAL_URL, getCurrentOrigin, isSecureContext } from '../utils/urls';
import { X, CheckCircle, XCircle, Clock, HelpCircle, Copy, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { DomainDnsVerificationView } from './DomainDnsVerificationView';

interface ConnectivityDiagnosticsProps {
  onClose: () => void;
}

type DiagnosticsView = 'overview' | 'domain-dns';

export function ConnectivityDiagnostics({ onClose }: ConnectivityDiagnosticsProps) {
  const { checks, isRunning, backendHealth, runDiagnostics, generateReport } = useConnectivityDiagnostics();
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentView, setCurrentView] = useState<DiagnosticsView>('overview');

  useEffect(() => {
    runDiagnostics();
  }, [runDiagnostics]);

  const handleCopyReport = async () => {
    try {
      const report = generateReport();
      await navigator.clipboard.writeText(report);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const handleCopyCutoverReport = () => {
    setCopyStatus('success');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'unknown':
        return <HelpCircle className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      default:
        return null;
    }
  };

  const currentOrigin = getCurrentOrigin();
  const isHttps = isSecureContext();
  const clientTimestamp = new Date().toLocaleString();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-black border-2 border-red-500/50 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-500/30">
          <div>
            <h2 className="text-2xl font-bold text-red-500 font-orbitron neon-text-red">
              Global Availability / Domain Status
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-montserrat">
              System health and worldwide connectivity verification
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Close diagnostics"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-red-500/30">
          <button
            onClick={() => setCurrentView('overview')}
            className={`flex-1 px-6 py-3 font-orbitron text-sm transition-colors ${
              currentView === 'overview'
                ? 'bg-red-500/20 text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setCurrentView('domain-dns')}
            className={`flex-1 px-6 py-3 font-orbitron text-sm transition-colors ${
              currentView === 'domain-dns'
                ? 'bg-red-500/20 text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
            }`}
          >
            Domain & DNS Verification
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentView === 'overview' ? (
            <div className="space-y-6">
              {/* Environment Information */}
              <div className="bg-black/50 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-bold text-white mb-4 font-orbitron">
                  Environment Information
                </h3>
                <div className="space-y-2 text-sm font-montserrat">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Origin:</span>
                    <span className="text-white font-mono">{currentOrigin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">HTTPS:</span>
                    <span className={isHttps ? 'text-green-500' : 'text-red-500'}>
                      {isHttps ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Official Portal:</span>
                    <span className="text-white font-mono">{OFFICIAL_PORTAL_URL}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Client Time:</span>
                    <span className="text-white">{clientTimestamp}</span>
                  </div>
                </div>
              </div>

              {/* Backend Health */}
              {backendHealth && (
                <div className="bg-black/50 border border-red-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-white mb-4 font-orbitron">
                    Backend Health
                  </h3>
                  <div className="space-y-2 text-sm font-montserrat">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Backend reachable:</span>
                      <span className="text-green-500">Yes</span>
                    </div>
                    {backendHealth.version && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Version:</span>
                        <span className="text-white">{backendHealth.version}</span>
                      </div>
                    )}
                    {backendHealth.timestamp && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Backend time:</span>
                        <span className="text-white">
                          {new Date(Number(backendHealth.timestamp) / 1000000).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Diagnostic Checks */}
              <div className="bg-black/50 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white font-orbitron">
                    Diagnostic Checks
                  </h3>
                  <Button
                    onClick={runDiagnostics}
                    disabled={isRunning}
                    variant="outline"
                    size="sm"
                    className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
                    {isRunning ? 'Running...' : 'Rerun'}
                  </Button>
                </div>

                {isRunning && checks.length === 0 ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-8 h-8 text-red-500 animate-spin mx-auto mb-2" />
                    <p className="text-gray-400 font-montserrat">Running diagnostics...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {checks.map((check) => (
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

              {/* Troubleshooting Section */}
              <div className="bg-black/50 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-bold text-yellow-500 mb-4 font-orbitron">
                  Troubleshooting: Default Nginx Page
                </h3>
                <div className="text-sm text-gray-300 font-montserrat space-y-2">
                  <p className="font-semibold text-white">
                    If you see a "default Nginx page" instead of X39 Matrix:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Verify custom domain is registered in IC Dashboard (Canister Settings → Custom Domains)</li>
                    <li>Check DNS records point to IC boundary nodes (use: <code className="text-yellow-500">dig x39matrix.org</code>)</li>
                    <li>Wait for certificate provisioning (10-30 minutes after domain registration)</li>
                    <li>Clear browser cache and try incognito/private mode</li>
                    <li>Verify canister is deployed (<code className="text-yellow-500">dfx canister --network ic status frontend</code>)</li>
                  </ol>
                  <p className="text-gray-400 text-xs mt-3">
                    DNS propagation can take 24-48 hours. HSTS enforcement may require additional boundary node configuration.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <DomainDnsVerificationView
              checks={checks}
              backendHealth={backendHealth}
              onCopyReport={handleCopyCutoverReport}
              copyStatus={copyStatus}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-red-500/30 flex items-center justify-between">
          <p className="text-gray-400 text-sm font-montserrat">
            {checks.length > 0 && (
              <>
                {checks.filter(c => c.status === 'pass').length} passed,{' '}
                {checks.filter(c => c.status === 'fail').length} failed,{' '}
                {checks.filter(c => c.status === 'unknown').length} unknown
              </>
            )}
          </p>
          <div className="flex gap-3">
            {currentView === 'overview' && (
              <Button
                onClick={handleCopyReport}
                variant="outline"
                className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                disabled={checks.length === 0}
              >
                <Copy className="w-4 h-4 mr-2" />
                {copyStatus === 'success'
                  ? 'Copied!'
                  : copyStatus === 'error'
                  ? 'Failed'
                  : 'Copy Report'}
              </Button>
            )}
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
