import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const ACCENT = '#39D98A';
const GRID = 20;          // cells per side
const CELL = 16;          // px per cell (internal canvas resolution)
const SIZE = GRID * CELL; // 320px
const HS_KEY = 'portfolio.snake.highscore';

type Pt = { x: number; y: number };
type Dir = { x: number; y: number };

const START_SNAKE: Pt[] = [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }];
const START_DIR: Dir = { x: 1, y: 0 };

function randFood(snake: Pt[]): Pt {
  while (true) {
    const f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    if (!snake.some(s => s.x === f.x && s.y === f.y)) return f;
  }
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mutable game state kept in refs so the loop reads fresh values without re-subscribing
  const snake = useRef<Pt[]>([...START_SNAKE]);
  const dir = useRef<Dir>({ ...START_DIR });
  const nextDir = useRef<Dir>({ ...START_DIR });
  const food = useRef<Pt>({ x: 14, y: 10 });

  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem(HS_KEY) || 0);
    if (!Number.isNaN(saved)) setHighScore(saved);
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0A0A0F';
    ctx.fillRect(0, 0, SIZE, SIZE);

    // subtle grid
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 1;
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(SIZE, i * CELL); ctx.stroke();
    }

    // food
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.arc(food.current.x * CELL + CELL / 2, food.current.y * CELL + CELL / 2, CELL / 2.6, 0, Math.PI * 2);
    ctx.fill();

    // snake
    snake.current.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? ACCENT : 'rgba(57,217,138,0.55)';
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const resetState = useCallback(() => {
    snake.current = [...START_SNAKE];
    dir.current = { ...START_DIR };
    nextDir.current = { ...START_DIR };
    food.current = randFood(snake.current);
    setScore(0);
    setGameOver(false);
  }, []);

  const tick = useCallback(() => {
    dir.current = nextDir.current;
    const head = snake.current[0];
    const newHead = { x: head.x + dir.current.x, y: head.y + dir.current.y };

    const hitWall = newHead.x < 0 || newHead.y < 0 || newHead.x >= GRID || newHead.y >= GRID;
    const hitSelf = snake.current.some(s => s.x === newHead.x && s.y === newHead.y);
    if (hitWall || hitSelf) {
      setRunning(false);
      setGameOver(true);
      setScore(prev => {
        setHighScore(hs => {
          if (prev > hs) { localStorage.setItem(HS_KEY, String(prev)); return prev; }
          return hs;
        });
        return prev;
      });
      return;
    }

    const ate = newHead.x === food.current.x && newHead.y === food.current.y;
    const body = [newHead, ...snake.current];
    if (ate) {
      food.current = randFood(body);
      setScore(s => s + 1);
    } else {
      body.pop();
    }
    snake.current = body;
    draw();
  }, [draw]);

  // Game loop — interval speeds up slightly as the score grows
  useEffect(() => {
    if (!running) return;
    const speed = Math.max(70, 140 - score * 4);
    const id = setInterval(tick, speed);
    return () => clearInterval(id);
  }, [running, score, tick]);

  // Initial paint
  useEffect(() => { draw(); }, [draw]);

  const setDirection = useCallback((d: Dir) => {
    const cur = dir.current;
    // disallow 180° reversals
    if (cur.x + d.x === 0 && cur.y + d.y === 0) return;
    nextDir.current = d;
  }, []);

  // Keyboard controls (only while running, so arrow keys don't hijack page scroll otherwise)
  useEffect(() => {
    if (!running) return;
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
      };
      const d = map[e.key];
      if (d) { e.preventDefault(); setDirection(d); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [running, setDirection]);

  const start = () => {
    if (gameOver || !started) resetState();
    setStarted(true);
    setRunning(true);
  };
  const pause = () => setRunning(false);
  const restart = () => { resetState(); draw(); setStarted(true); setRunning(true); };

  const dpadBtn = (label: string, d: Dir, Icon: typeof ArrowUp) => (
    <button
      aria-label={label}
      onClick={() => setDirection(d)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', background: 'rgba(255,255,255,0.03)', border: '1px solid #2E2E3E', borderRadius: '10px', color: '#9898B0', cursor: 'pointer' }}
    >
      <Icon size={18} strokeWidth={2} />
    </button>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '14px', color: '#9898B0', fontFamily: "'JetBrains Mono', monospace" }}>
          Score <strong style={{ color: ACCENT }}>{score}</strong>
        </span>
        <span style={{ fontSize: '12px', color: '#555568', fontFamily: "'JetBrains Mono', monospace" }}>
          Best {highScore}
        </span>
      </div>

      {/* Canvas + overlay */}
      <div style={{ position: 'relative', width: '100%', maxWidth: `${SIZE}px`, margin: '0 auto', aspectRatio: '1' }}>
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          style={{ width: '100%', height: '100%', borderRadius: '12px', border: '1px solid #1E1E2E', display: 'block' }}
        />
        {(!running) && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(10,10,15,0.55)', borderRadius: '12px', backdropFilter: 'blur(2px)' }}>
            <span style={{ fontSize: '15px', color: '#F0F0F5', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              {gameOver ? `Game Over — ${score} pts` : started ? 'Paused' : 'Snake'}
            </span>
            <button
              onClick={gameOver ? restart : start}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: ACCENT, color: '#0A0A0F', border: 'none', borderRadius: '8px', padding: '10px 22px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', fontFamily: "'Space Grotesk', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
              {gameOver ? <><RotateCcw size={14} /> Play Again</> : <><Play size={14} /> {started ? 'Resume' : 'Start'}</>}
            </button>
            {!started && <span style={{ fontSize: '11px', color: '#555568', fontFamily: "'JetBrains Mono', monospace" }}>Arrow keys / WASD · or tap the pad</span>}
          </div>
        )}
      </div>

      {/* Controls: pause + on-screen d-pad (mobile-friendly) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={running ? pause : start}
          aria-label={running ? 'Pause' : 'Play'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px solid #2E2E3E', color: '#9898B0', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontSize: '12px', fontFamily: "'JetBrains Mono', monospace" }}
        >
          {running ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Play</>}
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 44px)', gridTemplateRows: 'repeat(2, 44px)', gap: '6px', justifyItems: 'center' }}>
          <div />
          {dpadBtn('Up', { x: 0, y: -1 }, ArrowUp)}
          <div />
          {dpadBtn('Left', { x: -1, y: 0 }, ArrowLeft)}
          {dpadBtn('Down', { x: 0, y: 1 }, ArrowDown)}
          {dpadBtn('Right', { x: 1, y: 0 }, ArrowRight)}
        </div>
      </div>
    </div>
  );
}
