/**
 * ScoreBoard — Displays game stats with glassmorphism styling.
 */
import { motion, AnimatePresence } from 'framer-motion';

export default function ScoreBoard({ attempts, hits, score, forceValue, isAnimating }) {
  return (
    <div className="scoreboard">
      <h2 className="scoreboard-title">SCOREBOARD</h2>

      <div className="scoreboard-stats">
        {/* Attempts */}
        <div className="stat-card">
          <span className="stat-label">ATTEMPTS</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={attempts}
              className="stat-value"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {attempts}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Bell Hits */}
        <div className="stat-card stat-card-hits">
          <span className="stat-label">BELL HITS</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={hits}
              className="stat-value stat-value-hits"
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {hits}
              <span className="stat-max"> / 10</span>
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Total Score */}
        <div className="stat-card">
          <span className="stat-label">SCORE</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={score}
              className="stat-value stat-value-score"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {score}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Power meter */}
      {isAnimating && forceValue > 0 && (
        <motion.div
          className="power-meter"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <span className="power-label">POWER</span>
          <div className="power-bar-track">
            <motion.div
              className="power-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${forceValue * 100}%` }}
              transition={{ duration: 0.3 }}
              style={{
                background: forceValue > 0.8
                  ? 'linear-gradient(90deg, #ff6b6b, #da77f2)'
                  : forceValue > 0.5
                    ? 'linear-gradient(90deg, #ffd43b, #ff922b)'
                    : 'linear-gradient(90deg, #74c0fc, #339af0)'
              }}
            />
          </div>
          <span className="power-value">{Math.round(forceValue * 100)}%</span>
        </motion.div>
      )}
    </div>
  );
}
