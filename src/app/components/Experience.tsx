import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

const EXPERIENCES = [
  {
    company: 'Galentic Technologies (Client: ICICI Prudential)',
    role: 'Frontend Developer',
    duration: 'Aug 2025 – June 2026',
    bullets: [
      'Built Terms & Conditions module with PDF upload/preview and developed secure Report module',
      'Designed and implemented bank reconciliation screens using Figma + ReactJS',
      'Developing NFT stock constraint feature with automated deployments using GitHub Actions',
    ],
    stack: ['React', 'Figma', 'GitHub Actions', 'JavaScript', 'TypeScript', 'Tailwind', 'CSS', 'Redux'],
  },
  {
    company: 'Paymentz',
    role: 'Full Stack Developer',
    duration: 'Jan 2025 – Jul 2025',
    bullets: [
      'Developed scalable dashboards using Next.js, React.js, and TypeScript',
      'Built responsive Merchant Dashboard enabling merchants to reconcile transactions 50% faster',
      'Optimized performance by reducing JS bundle size 30% and implementing CI/CD via GitLab and Jenkins',
      'Built high-performance Stock Predictor RESTful APIs and microservices using Python and FastAPI with MySQL database integration',
    ],
    stack: ['Next.js', 'React.js', 'TypeScript', 'GitLab', 'Jenkins', 'Python', 'FastApi', 'MySql'],
  },
  {
    company: 'Cognizant Technology Solutions',
    role: 'Full Stack Developer',
    duration: 'Jul 2022 – Sep 2024',
    bullets: [
      'Designed and maintained enterprise-grade web applications using React.js, TypeScript, and Redux',
      'Reduced application load times by 35% through code splitting and lazy loading',
      'Created reusable custom hooks and managed complex global state, decreasing defect rates by 40%',
    ],
    stack: ['React.js', 'TypeScript', 'Redux', 'MongoDB', 'Node.js', 'Express.js', 'HTML/CSS', 'Git', 'Linux'],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(60px, 10vw, 160px)',
        borderTop: '1px solid #141420',
      }}
    >
      {/* Section label */}
      <ScrollReveal direction="left" distance={20}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '60px' }}>
          <Briefcase size={14} color="#39D98A" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#39D98A', letterSpacing: '0.12em' }}>MY EXPERIENCE</span>
        </div>
      </ScrollReveal>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {EXPERIENCES.map((exp, i) => (
          <ScrollReveal
            key={exp.company}
            delay={i * 0.1}
            style={{
              padding: '36px 0',
              borderBottom: '1px solid #141420',
            }}
          >
            <div style={{ marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: '#39D98A', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>
                {exp.company}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <h3
                style={{
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  fontWeight: 700,
                  color: '#F0F0F5',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {exp.role}
              </h3>
              <span style={{ fontSize: '13px', color: '#39D98A', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em', whiteSpace: 'nowrap', paddingTop: '6px' }}>
                {exp.duration}
              </span>
            </div>

            {/* Bullets */}
            <ul style={{ margin: '0 0 16px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {exp.bullets.map(b => (
                <li key={b} style={{ display: 'flex', gap: '10px', color: '#6868A0', fontSize: '14px', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
                  <span style={{ color: '#39D98A', flexShrink: 0, marginTop: '6px', width: '4px', height: '4px', borderRadius: '50%', background: '#39D98A', display: 'block' }} />
                  {b}
                </li>
              ))}
            </ul>

            {/* Stack pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {exp.stack.map(t => (
                <span
                  key={t}
                  style={{
                    padding: '3px 12px',
                    background: 'rgba(57,217,138,0.06)',
                    border: '1px solid rgba(57,217,138,0.15)',
                    color: '#39D98A',
                    fontSize: '11px',
                    fontWeight: 500,
                    borderRadius: '999px',
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '0.04em',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
