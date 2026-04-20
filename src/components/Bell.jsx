/**
 * Bell — SVG bell at top of tower with shake animation on hit.
 */
import { motion } from 'framer-motion';

export default function Bell({ isHit }) {
  return (
    <div className="bell-container">
      <motion.div
        className="bell-wrapper"
        animate={
          isHit
            ? { rotate: [0, 12, -12, 8, -8, 4, -4, 0] }
            : { rotate: 0 }
        }
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Bell SVG */}
        <svg
          viewBox="0 0 80 90"
          className="bell-svg"
          width="80"
          height="90"
        >
          {/* Bell body */}
          <path
            d="M10 60 Q10 20 40 10 Q70 20 70 60 L75 65 Q75 72 5 72 Q5 65 5 65 Z"
            fill="url(#bellGradient)"
            stroke="#b8860b"
            strokeWidth="2"
          />
          {/* Bell clapper */}
          <circle cx="40" cy="68" r="5" fill="#8B6914" />
          <line x1="40" y1="55" x2="40" y2="63" stroke="#8B6914" strokeWidth="2" />
          {/* Bell top knob */}
          <circle cx="40" cy="8" r="6" fill="#DAA520" stroke="#b8860b" strokeWidth="1.5" />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="bellGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
        </svg>
        {/* Glow effect on hit */}
        {isHit && (
          <motion.div
            className="bell-glow"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 2] }}
            transition={{ duration: 0.8 }}
          />
        )}
      </motion.div>
      {/* Hit indicator rings */}
      {isHit && (
        <>
          <motion.div
            className="bell-ring-effect"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 2.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          <motion.div
            className="bell-ring-effect"
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </>
      )}
    </div>
  );
}
