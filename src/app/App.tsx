import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import PlayZone from './components/PlayZone';
import Footer from './components/Footer';

const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'play', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div
      style={{
        background: '#0A0A0F',
        color: '#F0F0F5',
        fontFamily: "'Space Grotesk', sans-serif",
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      {/* Fixed navigation */}
      <Navbar activeSection={activeSection} />

      {/* Right scroll progress bar */}
      <div
        className="scroll-rail"
        style={{
          position: 'fixed',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {/* Full track */}
        <div style={{ width: '2px', height: '120px', background: '#1A1A2A', borderRadius: '999px', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${scrollProgress * 100}%`,
              background: '#39D98A',
              borderRadius: '999px',
              transition: 'height 0.1s',
            }}
          />
        </div>
        {/* Section dots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          {SECTIONS.map(id => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              title={id}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: activeSection === id ? '#39D98A' : '#333348',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background 0.3s, transform 0.3s',
                transform: activeSection === id ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Page content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <PlayZone />
        <Footer />
      </main>

      {/* Global responsive rules for fixed chrome (rail + rotated email) */}
      <style>{`
        /* The vertical email rail in the hero crowds small screens */
        @media (max-width: 900px) {
          .scroll-rail { right: 16px !important; }
        }
        @media (max-width: 768px) {
          .scroll-rail { display: none !important; }
          .hero-email { display: none !important; }
        }
      `}</style>
    </div>
  );
}
