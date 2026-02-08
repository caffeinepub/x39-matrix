import React from 'react';
import { usePublicationState } from '../hooks/publication/usePublicationState';
import { Rocket, Calendar } from 'lucide-react';
import { Button } from './ui/button';

interface March15LaunchInfoSectionProps {
  onOpenLaunchDryRun: () => void;
}

/**
 * March 15, 2026 Launch Information Section
 * 
 * Conditionally visible based on publication state:
 * - Hidden when publication state is false (pre-launch) or loading/unknown
 * - Visible when publication state is true (published/live)
 */
export function March15LaunchInfoSection({ onOpenLaunchDryRun }: March15LaunchInfoSectionProps) {
  const { data: isPublished, isReady, isLoading } = usePublicationState();

  // Don't show anything while loading or not ready
  if (!isReady || isLoading) {
    return null;
  }

  // Only show when published/live
  if (!isPublished) {
    return null;
  }

  return (
    <section className="launch-info-section py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/70 border-2 border-red-500/50 rounded-lg p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-orbitron neon-text-red">
              March 15, 2026 Launch Information
            </h2>
          </div>
          
          <div className="text-gray-300 space-y-4 font-montserrat text-base leading-relaxed mb-6">
            <p>
              On <strong className="text-red-500">March 15, 2026</strong>, the X39 Matrix platform officially launched on the mainnet with full production capabilities.
            </p>
            <p>
              This launch includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Full mainnet deployment on the Internet Computer Protocol (ICP)</li>
              <li>Official legal disclaimer now in effect</li>
              <li>Production-ready smart contracts and token utilities</li>
              <li>Complete platform availability at <span className="text-red-500 font-mono">https://x39matrix.org</span></li>
            </ul>
            <p className="text-green-400 font-semibold">
              ✓ Platform is now live and operational
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onOpenLaunchDryRun}
              className="bg-red-500 hover:bg-red-600 text-white font-orbitron px-6 py-3 text-lg"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Open Launch Dry-Run
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
