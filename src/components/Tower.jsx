/**
 * Tower — Vertical track container with bell, track, and puck.
 * This is the main visual element of the game.
 */
import Bell from './Bell';
import Puck from './Puck';

// Height markers for the tower track
const MARKERS = [
  { pct: 92, label: '🔔', color: '#da77f2' },
  { pct: 75, label: 'NEAR', color: '#69db7c' },
  { pct: 50, label: 'STRONG', color: '#ffd43b' },
  { pct: 25, label: 'AVG', color: '#ffa94d' },
  { pct: 12.5, label: 'WEAK', color: '#ff6b6b' },
];

export default function Tower({ puckPosition, forceValue, isBellHit, onAnimationComplete }) {
  return (
    <div className="tower">
      {/* Carnival lights decoration */}
      <div className="tower-lights">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="tower-light"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      {/* Bell at top */}
      <div className="tower-bell-area">
        <Bell isHit={isBellHit} />
      </div>

      {/* Track */}
      <div className="tower-track">
        {/* Height markers */}
        {MARKERS.map(marker => (
          <div
            key={marker.pct}
            className="tower-marker"
            style={{ bottom: `${marker.pct}%` }}
          >
            <span className="tower-marker-line" style={{ backgroundColor: marker.color }} />
            <span className="tower-marker-label" style={{ color: marker.color }}>
              {marker.label}
            </span>
          </div>
        ))}

        {/* Fill indicator — shows how high the puck went */}
        <div
          className="tower-fill"
          style={{
            height: `${puckPosition}%`,
            opacity: puckPosition > 0 ? 1 : 0,
          }}
        />

        {/* Puck */}
        <div className="tower-puck-container">
          <Puck
            puckPosition={puckPosition}
            force={forceValue}
            onAnimationComplete={onAnimationComplete}
          />
        </div>
      </div>

      {/* Base / Lever platform */}
      <div className="tower-base">
        <div className="tower-base-plate" />
        <div className="tower-base-support" />
      </div>
    </div>
  );
}
