/**
 * FeedbackLayer — Points popup, win overlay, and confetti.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { getTierLabel, getTierColor } from '../logic/scoring';

export default function FeedbackLayer({ showFeedback, lastPoints, gameWon, onClear }) {
  return (
    <>
      {/* Points popup — appears after each strike */}
      <AnimatePresence>
        {showFeedback && lastPoints !== null && !gameWon && (
          <motion.div
            className="feedback-popup"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ color: getTierColor(lastPoints) }}
          >
            <span className="feedback-points">+{lastPoints}</span>
            <span className="feedback-tier">{getTierLabel(lastPoints)}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Win overlay */}
      <AnimatePresence>
        {gameWon && (
          <motion.div
            className="win-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Confetti particles */}
            <div className="confetti-container">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                    backgroundColor: ['#ff6b6b', '#ffd43b', '#69db7c', '#74c0fc', '#da77f2', '#ffa94d'][
                      Math.floor(Math.random() * 6)
                    ],
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>

            <motion.div
              className="win-content"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <div className="win-trophy">🏆</div>
              <h1 className="win-title">CONGRATULATIONS!</h1>
              <p className="win-subtitle">You rang the bell 10 times!</p>
              <motion.button
                className="btn-play-again"
                onClick={onClear}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Play Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
