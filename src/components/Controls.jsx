/**
 * Controls — Strike button and Clear button.
 * Strike is disabled during animation and after winning.
 */
import { motion } from 'framer-motion';

export default function Controls({ onStrike, onClear, isAnimating, gameWon }) {
  const isDisabled = isAnimating || gameWon;

  return (
    <div className="controls">
      {/* Strike Button */}
      <motion.button
        className={`btn-strike ${isDisabled ? 'btn-disabled' : ''}`}
        onClick={onStrike}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.05 } : {}}
        whileTap={!isDisabled ? { scale: 0.92 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <span className="btn-strike-icon">🔨</span>
        <span className="btn-strike-text">
          {gameWon ? 'YOU WON!' : isAnimating ? 'STRIKING...' : 'STRIKE!'}
        </span>
        {!isDisabled && <div className="btn-strike-shimmer" />}
      </motion.button>

      {/* Clear Button */}
      <motion.button
        className="btn-clear"
        onClick={onClear}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ↺ Reset
      </motion.button>
    </div>
  );
}
