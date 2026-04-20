/**
 * HighStriker Dynamic Scoring System
 * 
 * 6-tier scoring based on distance reached.
 * Not binary win/lose — near-misses still earn points.
 */

/**
 * Calculate points based on puck distance reached.
 * 
 * Distance Reached    | Points
 * --------------------|--------
 * < 12.5% (1/8)       | 0
 * 12.5% – 25% (1/4)   | 1
 * 25% – 50% (1/2)     | 2
 * 50% – 75% (3/4)     | 3
 * 75% – 92% (near)    | 4
 * >= 92% (bell hit)    | 5
 */
export function getPoints(distance) {
  if (distance >= 92) return 5;
  if (distance >= 75) return 4;
  if (distance >= 50) return 3;
  if (distance >= 25) return 2;
  if (distance >= 12.5) return 1;
  return 0;
}

/**
 * Get the tier label for display.
 */
export function getTierLabel(points) {
  const labels = {
    0: 'Dud',
    1: 'Weak',
    2: 'Average',
    3: 'Strong',
    4: 'Near Miss!',
    5: '🔔 BELL HIT!'
  };
  return labels[points] || '';
}

/**
 * Get the color class for the score tier.
 */
export function getTierColor(points) {
  const colors = {
    0: '#666',
    1: '#ff6b6b',
    2: '#ffa94d',
    3: '#ffd43b',
    4: '#69db7c',
    5: '#da77f2'
  };
  return colors[points] || '#666';
}
