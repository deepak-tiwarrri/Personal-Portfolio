import { Gamepad2 } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';
import TicTacToe from './games/TicTacToe';
import SnakeGame from './games/SnakeGame';

const GAMES = [
  { title: 'Tic-Tac-Toe', tag: 'vs unbeatable AI', Component: TicTacToe },
  { title: 'Snake', tag: 'beat your high score', Component: SnakeGame },
];

export default function PlayZone() {
  return (
    <section
      id="play"
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(40px, 10vw, 160px)',
        borderTop: '1px solid #141420',
      }}
    >
      {/* Section label */}
      <ScrollReveal direction="left" distance={20}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Gamepad2 size={14} color="#39D98A" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#39D98A', letterSpacing: '0.12em' }}>PLAY ZONE</span>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" distance={20}>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: '#F0F0F5',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Take a break. <span style={{ color: '#39D98A' }}>Play a round.</span>
        </h2>
        <p style={{ color: '#6868A0', fontSize: '15px', fontFamily: "'Inter', sans-serif", marginBottom: '56px', maxWidth: '520px' }}>
          A little something to keep you here a moment longer
        </p>
      </ScrollReveal>

      {/* Games grid */}
      <div
        className="playzone-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start' }}
      >
        {GAMES.map(({ title, tag, Component }, i) => (
          <ScrollReveal key={title} delay={i * 0.1} distance={24}>
            <div
              style={{
                background: '#0E0E16',
                border: '1px solid #1A1A2A',
                borderRadius: '16px',
                padding: 'clamp(20px, 3vw, 28px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#F0F0F5', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>
                  {title}
                </h3>
                <span style={{ fontSize: '11px', color: '#555568', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>
                  {tag}
                </span>
              </div>
              <Component />
            </div>
          </ScrollReveal>
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .playzone-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
