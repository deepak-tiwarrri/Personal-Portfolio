import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Download } from 'lucide-react';
import { XIcon } from './ui/utils';
import ScrollReveal from './ui/ScrollReveal';
import frontendResume from '../../imports/Deepak_Tiwari_Frontend_Resume.pdf';


const STATS = [
  { value: '3.5+', label: 'Years of Experience' },
  { value: '5+', label: 'Completed Projects' },
  { value: '5K+', label: 'Hours Worked' },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle dots background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const dots: { x: number; y: number; opacity: number; speed: number }[] = [];
    for (let i = 0; i < 60; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: Math.random() * 0.4 + 0.05,
        speed: Math.random() * 0.3 + 0.1,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,240,245,${d.opacity})`;
        ctx.fill();
        d.y -= d.speed;
        if (d.y < 0) {
          d.y = canvas.height;
          d.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(80px, 8vw, 120px) clamp(60px, 10vw, 160px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {/* Fixed vertical email — pinned to left edge of viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          position: 'fixed',
          left: '18px',
          top: '50%',
          transform: 'translateX(-50%) rotate(-90deg)',
          transformOrigin: 'center center',
          zIndex: 50,
          color: '#3A3A50',
          fontSize: '10px',
          letterSpacing: '0.18em',
          fontFamily: "'JetBrains Mono', monospace",
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        deepak.tiwari.engineer@gmail.com
      </motion.div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Greeting tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              padding: '6px 14px',
              background: 'rgba(57, 217, 138, 0.08)',
              border: '1px solid rgba(57, 217, 138, 0.15)',
              borderRadius: '999px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#39D98A', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#39D98A', letterSpacing: '0.08em' }}>
              Open to Opportunities
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(40px, 8vw, 100px)',
              fontWeight: 800,
              lineHeight: 0.9,
              color: '#39D98A',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '-0.04em',
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}
          >
            Frontend
            <br />
            <span style={{ color: '#F0F0F5', marginLeft: '1.8em', display: 'inline-block' }}>Developer.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            maxWidth: '500px',
            color: '#9898B0',
            marginBottom: '40px',
            lineHeight: 1.8,
            fontSize: '15px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Hi, I'm <strong style={{ color: '#F0F0F5', fontWeight: 600 }}>Deepak Tiwari</strong> — a Frontend Developer who turns complex ideas into clean, performant, and visually polished web experiences. I craft interfaces that users <em style={{ color: '#39D98A', fontStyle: 'normal' }}>love</em> to interact with.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '32px' }}
        >
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-block',
              background: '#39D98A',
              color: '#0A0A0F',
              padding: '14px 32px',
              fontWeight: 700,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '13px',
              fontFamily: "'Space Grotesk', sans-serif",
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#5AEBAA'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#39D98A'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#F0F0F5',
              padding: '13px 32px',
              fontWeight: 700,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '13px',
              border: '1px solid #2E2E3E',
              fontFamily: "'Space Grotesk', sans-serif",
              transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#39D98A'; (e.currentTarget as HTMLElement).style.color = '#39D98A'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2E2E3E'; (e.currentTarget as HTMLElement).style.color = '#F0F0F5'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Let's Talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          {/* Socials */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { icon: Github, href: 'https://github.com/deepak-tiwarrri', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/deepak-tiwarrri', label: 'LinkedIn' },
              { icon: XIcon, href: 'https://x.com/deepak_tiwarrri', label: 'Twitter' },
              { icon: Instagram, href: 'https://instagram.com/deepak_tiwarrri', label: 'Instagram' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: '#444458', transition: 'color 0.2s, transform 0.2s', display: 'inline-block' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F0F0F5'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#444458'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Download CV */}
          <a
            href={frontendResume}
            download="Deepak_Tiwari_Frontend_Resume.pdf"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#444458', fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#39D98A')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#444458')}
          >
            <Download size={13} strokeWidth={1.5} />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Stats — bottom right */}
      <ScrollReveal
        direction="up"
        delay={0.3}
        style={{
          position: 'absolute',
          right: 'clamp(40px, 8vw, 120px)',
          bottom: 'clamp(40px, 6vh, 80px)',
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {STATS.map(stat => (
          <div key={stat.label}>
            <div style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, color: '#39D98A', lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: '#555568', fontFamily: "'Inter', sans-serif", marginTop: '2px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </ScrollReveal>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, #39D98A)', display: 'block' }} />
      </div>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
