import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const BAR_STYLE: React.CSSProperties = {
  width: '30px',
  height: '2px',
  background: '#FFFFFF',
  display: 'block',
  borderRadius: '2px',
  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
  transformOrigin: 'center',
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>

      {/* Hamburger button — animated bars → X */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed',
          top: '28px',
          right: '36px',
          zIndex: 100,
          background: 'rgba(10, 10, 15, 0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0',
          padding: '10px',
          width: '48px',
          height: '48px',
          transition: 'background 0.3s, border-color 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(10, 10, 15, 0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10, 10, 15, 0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        aria-label="Toggle menu"
      >
        {/* Top bar */}
        <span style={{
          ...BAR_STYLE,
          transform: open
            ? 'translateY(4.25px) rotate(45deg)'
            : 'translateY(-3.25px) rotate(0deg)',
        }} />
        {/* Middle bar */}
        <span style={{
          ...BAR_STYLE,
          opacity: open ? 0 : 1,
          transform: open ? 'scaleX(0)' : 'scaleX(1)',
        }} />
        {/* Bottom bar */}
        <span style={{
          ...BAR_STYLE,
          transform: open
            ? 'translateY(-4.25px) rotate(-45deg)'
            : 'translateY(3.25px) rotate(0deg)',
        }} />
      </button>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#0A0A0F',
              zIndex: 90,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 10%',
            }}
          >
            <nav>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: 'easeOut' }}
                  style={{ borderBottom: '1px solid #1A1A2A' }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 'clamp(36px, 6vw, 72px)',
                      fontWeight: 700,
                      color: '#F0F0F5',
                      padding: '12px 0',
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#39D98A')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#F0F0F5')}
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </nav>
            <div style={{ marginTop: '48px', display: 'flex', gap: '24px' }}>
              {['GitHub', 'LinkedIn', 'X'].map(s => (
                <span key={s} style={{ color: '#444458', fontSize: '13px', fontFamily: "'JetBrains Mono', monospace" }}>{s}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
