import React from 'react';
import { usePublicationState, useIsCallerAdmin, useSetPublicationState } from '../../hooks/publication/usePublicationState';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Rocket, Lock, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

/**
 * Admin-only Go-Live Toggle Component
 * 
 * Allows authenticated admins to toggle the publication state between
 * pre-launch and live/published. Shows current state and provides
 * immediate feedback on state changes.
 */
export function AdminGoLiveToggle() {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: isPublished, isLoading: isStateLoading, dataUpdatedAt } = usePublicationState();
  const setPublicationState = useSetPublicationState();

  const isAuthenticated = !!identity;

  // Don't show anything if not authenticated or not an admin
  if (!isAuthenticated || isAdminLoading) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  const handleToggle = async (checked: boolean) => {
    try {
      await setPublicationState.mutateAsync(checked);
    } catch (error: any) {
      console.error('Failed to update publication state:', error);
    }
  };

  const isLoading = isStateLoading || setPublicationState.isPending;
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString() : 'Unknown';

  return (
    <div className="admin-go-live-toggle bg-blue-950/30 border-2 border-blue-500/50 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <Rocket className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white font-orbitron">
          Publication Control
        </h3>
        <Lock className="w-4 h-4 text-blue-400" />
      </div>

      {setPublicationState.isError && (
        <Alert variant="destructive" className="mb-4">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to update publication state. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {setPublicationState.isSuccess && (
        <Alert className="mb-4 bg-green-950/30 border-green-500/50 text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Publication state updated successfully.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="publication-toggle" className="text-base font-semibold text-white font-orbitron">
              Site Status
            </Label>
            <p className="text-sm text-gray-400 font-montserrat">
              {isPublished ? 'Site is live and published' : 'Site is in pre-launch mode'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isLoading && <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />}
            <Switch
              id="publication-toggle"
              checked={isPublished ?? false}
              onCheckedChange={handleToggle}
              disabled={isLoading}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-blue-500/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 font-montserrat">Current State:</span>
            <span className={`font-semibold font-orbitron ${isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
              {isPublished ? 'PUBLISHED' : 'PRE-LAUNCH'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-400 font-montserrat">Last Updated:</span>
            <span className="text-gray-300 font-montserrat">{lastUpdated}</span>
          </div>
        </div>

        <div className="bg-blue-950/50 border border-blue-500/30 rounded p-3">
          <p className="text-xs text-gray-400 font-montserrat leading-relaxed">
            <strong className="text-blue-400">Note:</strong> Toggling this control will immediately switch the site between 
            pre-launch and published states. When published, the full legal disclaimer and March 15 launch information 
            will be visible to all users.
          </p>
        </div>
      </div>
    </div>
  );
}
