/**
 * Single-source configuration for launch-time ICP payment receiver.
 * This principal is used for all launch-time payment destinations, QR codes, and receipts.
 */

export const LAUNCH_RECEIVER_PRINCIPAL = 'kg5wt-xe64b-e4fyl-4qxmb-jsww6-fbjwy-febf2-jver5-cfvis-3hvdv-5ae';

/**
 * Get the launch receiver principal for display purposes.
 * Returns the exact configured value.
 */
export function getLaunchReceiverPrincipal(): string {
  return LAUNCH_RECEIVER_PRINCIPAL;
}

/**
 * Get the launch receiver principal formatted for QR code payload.
 * Returns the exact configured value.
 */
export function getLaunchReceiverForQR(): string {
  return LAUNCH_RECEIVER_PRINCIPAL;
}

/**
 * Get a display label for the launch receiver.
 */
export function getLaunchReceiverLabel(): string {
  return 'Official Launch Receiver';
}
