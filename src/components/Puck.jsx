/**
 * Puck — Animated puck element using Framer Motion.
 * Receives puckPosition (0–100) and animates vertically.
 */
import { motion } from 'framer-motion';

const TOWER_TRACK_HEIGHT = 420; // px — must match CSS tower track height

export default function Puck({ puckPosition, force, onAnimationComplete }) {
  // Convert percentage (0–100) to pixel offset (bottom to top)
  const targetY = -(puckPosition / 100) * TOWER_TRACK_HEIGHT;
  // Duration scales with force: stronger hits = longer travel time
  const duration = puckPosition > 0 ? 0.4 + force * 0.8 : 0.3;

  return (
    <motion.div
      className="puck"
      animate={{ y: targetY }}
      transition={{
        duration: duration,
        ease: [0.25, 0.46, 0.45, 0.94], // custom ease-out curve
      }}
      onAnimationComplete={() => {
        // Only trigger on upward movement (not return)
        if (puckPosition > 0 && onAnimationComplete) {
          onAnimationComplete();
        }
      }}
    >
      <div className="puck-inner">
        <div className="puck-shine" />
      </div>
      {/* Trail effect during movement */}
      {puckPosition > 0 && (
        <motion.div
          className="puck-trail"
          initial={{ opacity: 0.6, scaleY: 0 }}
          animate={{ opacity: 0, scaleY: 1 }}
          transition={{ duration: duration * 0.8 }}
        />
      )}
    </motion.div>
  );
}
