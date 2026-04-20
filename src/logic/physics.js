/**
 * HighStriker Physics Engine
 * 
 * Non-linear force generation and distance calculation.
 * Uses power curve + variance for unpredictable, exciting gameplay.
 */

export const MAX_HEIGHT = 100;       // percentage of tower height
export const BELL_THRESHOLD = 92;    // puck must reach 92% to ring the bell
export const DECAY_FACTOR = 0.88;

/**
 * Generate a biased random force value (0–1).
 * Uses a power curve to skew toward mid-range with rare extremes.
 * This prevents flat distributions that feel predictable.
 */
export function calculateForce() {
  const raw = Math.random(); // 0–1 uniform
  // Power curve: skews toward mid-range, rare extremes
  const biased = Math.pow(raw, 0.7);
  // Micro-variance to prevent identical sequential results
  const variance = (Math.random() - 0.5) * 0.08;
  return Math.min(1, Math.max(0, biased + variance));
}

/**
 * Convert force (0–1) to puck travel distance (0–100).
 * Non-linear decay: high forces lose less momentum, low forces lose more.
 * This makes strong hits feel earned and weak hits feel appropriately weak.
 */
export function calculateDistance(force) {
  const velocity = force * MAX_HEIGHT;
  // Non-linear decay: exponential falloff inversely proportional to force
  const decayedDistance = velocity * Math.pow(DECAY_FACTOR, 1 / (force + 0.1));
  // Clamp to valid range
  return Math.min(MAX_HEIGHT, Math.max(0, decayedDistance));
}

/**
 * Check if the puck reached the bell.
 * @returns {boolean} true if distance >= BELL_THRESHOLD
 */
export function checkBellHit(distance) {
  return distance >= BELL_THRESHOLD;
}

/**
 * Get a label for the force strength level.
 */
export function getForceLabel(force) {
  if (force >= 0.9) return 'LEGENDARY';
  if (force >= 0.75) return 'POWERFUL';
  if (force >= 0.55) return 'STRONG';
  if (force >= 0.35) return 'MODERATE';
  if (force >= 0.2) return 'WEAK';
  return 'FEEBLE';
}
