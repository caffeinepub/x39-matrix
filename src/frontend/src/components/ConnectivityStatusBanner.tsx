import React, { useEffect, useState } from 'react';
import { useConnectivityDiagnostics } from '../hooks/useConnectivityDiagnostics';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/button';

interface ConnectivityStatusBannerProps {
  onOpenDiagnostics: () => void;
}

export function ConnectivityStatusBanner({ onOpenDiagnostics }: ConnectivityStatusBannerProps) {
  const { checks, runDiagnostics } = useConnectivityDiagnostics();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Run diagnostics on mount
    runDiagnostics();
  }, [runDiagnostics]);

  // Check if there are any critical failures
  const hasCriticalFailures = checks.some(check => check.status === 'fail');

  // Don't show banner if no failures or if dismissed
  if (!hasCriticalFailures || dismissed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-red-500/90 backdrop-blur-sm border-b-2 border-red-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold font-orbitron text-sm sm:text-base">
                Connectivity Issue Detected
              </p>
              <p className="text-white/90 text-xs sm:text-sm font-montserrat">
                Some availability checks are failing. Click to view diagnostics.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={onOpenDiagnostics}
              variant="outline"
              size="sm"
              className="bg-white text-red-500 border-white hover:bg-red-50 font-orbitron"
            >
              View Diagnostics
            </Button>
            <button
              onClick={() => setDismissed(true)}
              className="text-white hover:text-red-100 transition-colors p-1"
              aria-label="Dismiss banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
