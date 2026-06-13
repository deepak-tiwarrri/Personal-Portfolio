import { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';

type Cell = 'X' | 'O' | null;
type Board = Cell[];

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
];

const ACCENT = '#39D98A';
const HUMAN: Cell = 'X';
const AI: Cell = 'O';

function getWinner(b: Board): { winner: Cell; line: number[] | null } {
  for (const line of LINES) {
    const [a, c, d] = line;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { winner: b[a], line };
  }
  return { winner: null, line: null };
}

function isFull(b: Board) {
  return b.every(Boolean);
}

// Minimax — the AI plays perfectly (best a human can do is draw)
function minimax(b: Board, isAi: boolean): number {
  const { winner } = getWinner(b);
  if (winner === AI) return 1;
  if (winner === HUMAN) return -1;
  if (isFull(b)) return 0;

  const scores: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (b[i]) continue;
    const next = b.slice();
    next[i] = isAi ? AI : HUMAN;
    scores.push(minimax(next, !isAi));
  }
  return isAi ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(b: Board): number {
  let best = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (b[i]) continue;
    const next = b.slice();
    next[i] = AI;
    const score = minimax(next, false);
    if (score > best) {
      best = score;
      move = i;
    }
  }
  return move;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [busy, setBusy] = useState(false);
  const [scores, setScores] = useState({ win: 0, loss: 0, draw: 0 });

  const { winner, line } = getWinner(board);
  const over = winner !== null || isFull(board);
  const status = winner === HUMAN ? 'You win! 🎉' : winner === AI ? 'AI wins 🤖' : isFull(board) ? "It's a draw 🤝" : 'Your move (X)';

  const settle = (b: Board) => {
    const result = getWinner(b);
    if (result.winner === HUMAN) setScores(s => ({ ...s, win: s.win + 1 }));
    else if (result.winner === AI) setScores(s => ({ ...s, loss: s.loss + 1 }));
    else if (isFull(b)) setScores(s => ({ ...s, draw: s.draw + 1 }));
  };

  const handleClick = (i: number) => {
    if (board[i] || over || busy) return;
    const afterHuman = board.slice();
    afterHuman[i] = HUMAN;
    setBoard(afterHuman);

    if (getWinner(afterHuman).winner || isFull(afterHuman)) {
      settle(afterHuman);
      return;
    }

    // AI replies after a short beat so the move feels deliberate
    setBusy(true);
    setTimeout(() => {
      const move = bestMove(afterHuman);
      const afterAi = afterHuman.slice();
      if (move >= 0) afterAi[move] = AI;
      setBoard(afterAi);
      settle(afterAi);
      setBusy(false);
    }, 260);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setBusy(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '14px', color: over && winner === HUMAN ? ACCENT : '#9898B0', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
          {status}
        </span>
        <button
          onClick={reset}
          aria-label="Reset game"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px solid #2E2E3E', color: '#9898B0', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", transition: 'border-color 0.2s, color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#2E2E3E'; e.currentTarget.style.color = '#9898B0'; }}
        >
          <RotateCcw size={13} strokeWidth={1.8} /> Reset
        </button>
      </div>

      {/* Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', aspectRatio: '1', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
        {board.map((cell, i) => {
          const winning = line?.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={!!cell || over || busy}
              aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ', empty'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '1',
                background: winning ? 'rgba(57,217,138,0.12)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${winning ? ACCENT : '#1E1E2E'}`,
                borderRadius: '10px',
                cursor: cell || over ? 'default' : 'pointer',
                fontSize: 'clamp(28px, 7vw, 40px)',
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                color: cell === HUMAN ? ACCENT : '#F0F0F5',
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              {cell && (
                <motion.span initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 360, damping: 18 }}>
                  {cell}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>

      {/* Scoreboard */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '4px' }}>
        {[
          { label: 'WINS', value: scores.win, color: ACCENT },
          { label: 'LOSSES', value: scores.loss, color: '#FF6B6B' },
          { label: 'DRAWS', value: scores.draw, color: '#9898B0' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: s.color, fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: '10px', color: '#555568', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
