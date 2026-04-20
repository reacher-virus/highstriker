/**
 * App.jsx — Main application.
 * Composes all components and connects to useGameState hook.
 * Zero game logic here — only layout and prop passing.
 */
import Tower from './components/Tower';
import Controls from './components/Controls';
import ScoreBoard from './components/ScoreBoard';
import FeedbackLayer from './components/FeedbackLayer';
import { useGameState } from './hooks/useGameState';

export default function App() {
  const {
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
    handleStrike,
    handleAnimationComplete,
    handleClear,
  } = useGameState();

  return (
    <div className="app">
      {/* Background carnival lights */}
      <div className="bg-lights" />

      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">🎪</span>
          HIGH STRIKER
          <span className="title-icon">🎪</span>
        </h1>
        <p className="app-subtitle">Test your strength!</p>
      </header>

      {/* Main game area */}
      <main className="game-area">
        {/* Left side — Score */}
        <aside className="game-sidebar game-sidebar-left">
          <ScoreBoard
            attempts={attempts}
            hits={hits}
            score={score}
            forceValue={forceValue}
            isAnimating={isAnimating}
          />
        </aside>

        {/* Center — Tower */}
        <div className="game-center">
          <Tower
            puckPosition={puckPosition}
            forceValue={forceValue}
            isBellHit={isBellHit}
            onAnimationComplete={handleAnimationComplete}
          />
        </div>

        {/* Right side — Controls */}
        <aside className="game-sidebar game-sidebar-right">
          <Controls
            onStrike={handleStrike}
            onClear={handleClear}
            isAnimating={isAnimating}
            gameWon={gameWon}
          />
        </aside>
      </main>

      {/* Feedback overlay */}
      <FeedbackLayer
        showFeedback={showFeedback}
        lastPoints={lastPoints}
        gameWon={gameWon}
        onClear={handleClear}
      />
    </div>
  );
}
