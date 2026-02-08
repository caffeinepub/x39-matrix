/**
 * Single authoritative source for the X39 Matrix mainnet launch date.
 * This constant controls all launch-gated features including the legal disclaimer publication.
 */

// March 15, 2026 at 00:00:00 UTC
export const LAUNCH_DATE = new Date('2026-03-15T00:00:00Z');

/**
 * Check if the current time is on or after the launch date.
 * @returns true if launch is live, false otherwise
 */
export function isLaunchLive(): boolean {
  return new Date() >= LAUNCH_DATE;
}

/**
 * Get a human-readable launch date string.
 * @returns Formatted launch date string
 */
export function getLaunchDateString(): string {
  return 'March 15, 2026';
}
