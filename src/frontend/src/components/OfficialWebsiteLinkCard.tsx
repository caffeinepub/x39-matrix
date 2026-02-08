import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { CopyableValue } from './CopyableValue';
import { OFFICIAL_PORTAL_URL, getCurrentOrigin } from '../utils/urls';
import { Button } from './ui/button';

/**
 * Official Website Link Card Component
 * 
 * Displays the canonical official URL (https://x39matrix.org) with:
 * - One-click copy-to-clipboard functionality
 * - "Open site" action that opens the canonical URL in a new tab
 * - Current origin display for diagnostics
 * - All user-facing text in English
 */
export function OfficialWebsiteLinkCard() {
  const currentOrigin = getCurrentOrigin();

  const handleOpenSite = () => {
    window.open(OFFICIAL_PORTAL_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="official-website-card bg-black/70 border-2 border-red-500/50 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <Globe className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white font-orbitron neon-text-red">
          Official Website
        </h3>
      </div>

      <div className="space-y-4">
        {/* Canonical Official URL */}
        <div>
          <CopyableValue
            value={OFFICIAL_PORTAL_URL}
            label="Canonical URL"
            className="mb-3"
          />
          <Button
            onClick={handleOpenSite}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-orbitron flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open site
          </Button>
        </div>

        {/* Current Origin (Diagnostics) */}
        {currentOrigin && currentOrigin !== OFFICIAL_PORTAL_URL && (
          <div className="pt-4 border-t border-red-500/30">
            <p className="text-sm text-gray-400 mb-2 font-montserrat">
              Current origin (served from):
            </p>
            <code className="block text-xs text-gray-300 bg-black/60 p-2 rounded border border-red-500/20 font-mono break-all">
              {currentOrigin}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
