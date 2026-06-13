import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Play', id: 'play' },
  { label: 'Contact', id: 'contact' },
];

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/deepak-tiwarrri' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/deepak-tiwarrri' },
  { label: 'X', href: 'https://x.com/deepak_tiwarrri' },
];

const BAR_STYLE: React.CSSProperties = {
  width: '26px',
  height: '2px',
  background: '#FFFFFF',
  display: 'block',
  borderRadius: '2px',
  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
  transformOrigin: 'center',
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar({ activeSection = 'home' }: { activeSection?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Frosted-glass header background once the user scrolls past the hero fold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open (prevents layout shift)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleNavClick = (id: string) => {
    setOpen(false);
    // Wait for the overlay exit animation before scrolling
    setTimeout(() => scrollToId(id), open ? 320 : 0);
  };

  return (
    <>
      {/* Sticky header bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
          padding: '0 clamp(20px, 6vw, 64px)',
          background: scrolled ? 'rgba(10, 10, 15, 0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          aria-label="Go to top"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'baseline',
            gap: '2px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '18px',
            fontWeight: 600,
            color: '#F0F0F5',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: '#39D98A' }}>{'<'}</span>
          DT
          <span style={{ color: '#39D98A' }}>{' />'}</span>
        </button>

        {/* Desktop links */}
        <nav className="nav-desktop" style={{ alignItems: 'center', gap: '4px' }}>
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nav-link${isActive ? ' nav-link--active' : ''}`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Hamburger — visible on mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            cursor: 'pointer',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            padding: '10px',
            width: '44px',
            height: '44px',
            zIndex: 110,
          }}
        >
          <span style={{ ...BAR_STYLE, transform: open ? 'translateY(8px) rotate(45deg)' : 'none' }} />
          <span style={{ ...BAR_STYLE, opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'scaleX(1)' }} />
          <span style={{ ...BAR_STYLE, transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
        </button>
      </header>

      {/* Full-screen mobile overlay menu */}
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
              zIndex: 95,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 10%',
            }}
          >
            <nav>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: 'easeOut' }}
                  style={{ borderBottom: '1px solid #1A1A2A' }}
                >
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="mobile-nav-btn"
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: activeSection === link.id ? '#39D98A' : '#F0F0F5',
                      padding: '14px 0',
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#39D98A')}
                    onMouseLeave={e => (e.currentTarget.style.color = activeSection === link.id ? '#39D98A' : '#F0F0F5')}
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </nav>
            <div style={{ marginTop: '48px', display: 'flex', gap: '24px' }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#555568', fontSize: '13px', fontFamily: "'JetBrains Mono', monospace", textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#39D98A')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555568')}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header-scoped CSS: link underline animation + responsive show/hide */}
      <style>{`
        .nav-desktop { display: none; }
        .nav-hamburger { display: flex; }

        .nav-link {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 14px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #8888A8;
          transition: color 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 4px;
          height: 1.5px;
          background: #39D98A;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.25s ease;
        }
        .nav-link:hover { color: #39D98A; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link--active { color: #39D98A; }
        .nav-link--active::after { transform: scaleX(1); }

        .mobile-nav-btn {
          font-size: 18px !important;
          font-weight: 500 !important;
          padding: 10px 0 !important;
          font-family: 'Space Grotesk', sans-serif !important;
        }

        /* Desktop: show inline links, hide hamburger */
        @media (min-width: 768px) {
          .nav-desktop { display: flex; }
          .nav-hamburger { display: none; }
        }
      `}</style>
    </>
  );
}
