/**
 * useGameState — Central game state hook.
 * 
 * All game state and logic lives here.
 * Components only receive state + callbacks — never compute game logic.
 */
import { useState, useCallback, useRef } from 'react';
import { calculateForce, calculateDistance, checkBellHit } from '../logic/physics';
import { getPoints } from '../logic/scoring';
import { useAudio } from './useAudio';

const WIN_HITS = 10;

export function useGameState() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [forceValue, setForceValue] = useState(0);
  const [puckPosition, setPuckPosition] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hits, setHits] = useState(0);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [lastPoints, setLastPoints] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isBellHit, setIsBellHit] = useState(false);

  const audio = useAudio();
  const feedbackTimeoutRef = useRef(null);

  /**
   * Handle Strike button click.
   * Executes the full strike pipeline: disable → force → distance → animate.
   */
  const handleStrike = useCallback(() => {
    if (isAnimating || gameWon) return;

    // 1. Disable button immediately
    setIsAnimating(true);
    setIsBellHit(false);
    setShowFeedback(false);

    // Clear previous feedback timeout
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    // 2. Generate force
    const force = calculateForce();
    setForceValue(force);

    // 3. Calculate distance
    const distance = calculateDistance(force);

    // 4. Play strike sound
    audio.playStrike();

    // 5. Play rise sound (delayed slightly)
    setTimeout(() => audio.playRise(force), 100);

    // 6. Start animation — set puck position (Framer Motion handles the rest)
    // Small delay so the user sees the strike feedback first
    setTimeout(() => {
      setPuckPosition(distance);
    }, 50);
  }, [isAnimating, gameWon, audio]);

  /**
   * Called when puck animation completes.
   * Handles bell check, scoring, and feedback.
   */
  const handleAnimationComplete = useCallback(() => {
    const distance = calculateDistance(forceValue);
    const bellHit = checkBellHit(distance);
    const points = getPoints(distance);

    // Update score
    setAttempts(prev => prev + 1);
    setLastPoints(points);
    setShowFeedback(true);

    if (bellHit) {
      setIsBellHit(true);
      setHits(prev => {
        const newHits = prev + 1;
        if (newHits >= WIN_HITS) {
          setGameWon(true);
          setTimeout(() => audio.playWin(), 300);
        }
        return newHits;
      });
      setScore(prev => prev + points);
      audio.playBell();
    } else {
      setScore(prev => prev + points);
      if (points <= 1) {
        audio.playMiss();
      }
    }

    // Return puck to bottom after delay
    feedbackTimeoutRef.current = setTimeout(() => {
      setPuckPosition(0);
      setShowFeedback(false);
      setIsBellHit(false);
      setIsAnimating(false);
    }, 1500);
  }, [forceValue, audio]);

  /**
   * Reset all game state.
   */
  const handleClear = useCallback(() => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    setIsAnimating(false);
    setForceValue(0);
    setPuckPosition(0);
    setAttempts(0);
    setHits(0);
    setScore(0);
    setGameWon(false);
    setLastPoints(null);
    setShowFeedback(false);
    setIsBellHit(false);
  }, []);

  return {
    // State
    isAnimating,
    forceValue,
    puckPosition,
    attempts,
    hits,
    score,
    gameWon,
    lastPoints,
    showFeedback,
    isBellHit,
    // Actions
    handleStrike,
    handleAnimationComplete,
    handleClear,
  };
}
