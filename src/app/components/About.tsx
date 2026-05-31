import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { motion } from 'motion/react';
import { User } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';
//@ts-ignore
import profileImg from '../../imports/image.png';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(60px, 10vw, 160px)',
        borderTop: '1px solid #141420',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }} className="about-grid">
        {/* Photo side */}
        <ScrollReveal direction="left" delay={0}>
          <div
            style={{
              width: '100%',
              aspectRatio: '1',
              maxWidth: '400px',
              margin: '0 auto',
              background: 'linear-gradient(135deg, #111118 0%, #1A1A2E 100%)',
              borderRadius: '50%',
              border: '1px solid #1E1E2E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(57,217,138,0.06)',
            }}
          >
            <img src={profileImg} alt="Deepak Tiwari" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ScrollReveal>

        {/* Text side */}
        <ScrollReveal direction="right" delay={0.15}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <User size={14} color="#39D98A" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#39D98A', letterSpacing: '0.12em' }}>ABOUT ME</span>
          </motion.div>
          <h2
            style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              color: '#F0F0F5',
              lineHeight: 1.1,
              marginBottom: '28px',
              letterSpacing: '-0.02em',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Crafting digital
            <br />
            <span style={{ color: '#39D98A' }}>experiences</span> that
            <br />
            matter.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#7878A0', lineHeight: 1.8, fontSize: '15px', fontFamily: "'Inter', sans-serif", marginBottom: '32px' }}>
            <p>
              I'm <strong style={{ color: '#F0F0F5', fontWeight: 600 }}>Deepak </strong>, a Frontend Developer based in Mumbai, India. I specialize in building responsive, high-performance web applications using modern JavaScript technologies.
            </p>
            <p>
              With over 3.5+ years of hands-on experience, I've worked extensively with React, Next.js, TypeScript, and Tailwind CSS — delivering clean, maintainable code and pixel-perfect UIs that scale.
            </p>
            <p>
              I believe great products are born at the intersection of design and engineering — I bridge that gap every day, turning ideas into interfaces that feel intuitive and look exceptional.
            </p>
          </div>

          {/* Quote */}
          <blockquote style={{ borderLeft: '2px solid #39D98A', paddingLeft: '20px', color: '#555568', fontStyle: 'italic', fontSize: '15px', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
            "Code is poetry when every line serves a purpose."
          </blockquote>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
