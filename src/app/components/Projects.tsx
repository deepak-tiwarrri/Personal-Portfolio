import { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

interface Project {
  num: string;
  name: string;
  desc: string;
  stack: string[];
  gradient: string;
  github?: string;
  live?: string;
}

const PROJECTS: Project[] = [
  {
    num: '_01.',
    name: 'Blog Application',
    desc: 'Full-stack blog platform with JWT authentication, role-based access control, and rich text editing.',
    stack: ['ReactJS', 'Redux Toolkit', 'TailwindCSS', 'Node.js', 'Express', 'MongoDB'],
    gradient: 'linear-gradient(135deg, #0D1F2D 0%, #1A3A5C 100%)',
    github: 'https://github.com/deepak-tiwarrri/Blog-Application',
    live: 'http://143.110.176.25.nip.io/',
  },
  {
    num: '_02.',
    name: 'QKART Frontend',
    desc: 'Responsive e-commerce platform with product listing, search, filtering, and protected routes.',
    stack: ['ReactJS', 'Material-UI', 'Responsive Design'],
    gradient: 'linear-gradient(135deg, #1A0D2D 0%, #3D1A5C 100%)',
    github: '#',
    live: 'https://qkartfronthook.netlify.app/',
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="projects"
      ref={ref}
      style={{ padding: 'clamp(80px, 10vw, 140px) clamp(60px, 10vw, 160px)', borderTop: '1px solid #141420' }}
      onMouseMove={handleMouseMove}
    >
      {/* Section label */}
      <ScrollReveal direction="left" distance={20}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '60px' }}>
          <FolderGit2 size={14} color="#39D98A" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#39D98A', letterSpacing: '0.12em' }}>SELECTED PROJECTS</span>
        </div>
      </ScrollReveal>

      {/* Project list */}
      <div>
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '24px 0',
              borderBottom: '1px solid #141420',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
            }}
          >
            {/* Number */}
            <span style={{ fontSize: '13px', color: '#333348', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0, width: '36px' }}>
              {project.num}
            </span>

            {/* Project name */}
            <h3
              style={{
                fontSize: 'clamp(22px, 3vw, 40px)',
                fontWeight: 700,
                color: hoveredIndex === i ? '#39D98A' : '#F0F0F5',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.02em',
                lineHeight: 1,
                margin: 0,
                flex: 1,
                transition: 'color 0.2s',
              }}
            >
              {project.name}
            </h3>

            {/* Stack tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '40%' }} className="project-tags">
              {project.stack.map(t => (
                <span key={t} style={{ fontSize: '11px', color: '#444458', fontFamily: "'JetBrains Mono', monospace" }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Icon buttons */}
            <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
              <a
                href={project.github}
                onClick={e => e.stopPropagation()}
                style={{ color: '#333348', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#F0F0F5')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#333348')}
              >
                <Github size={17} strokeWidth={1.5} />
              </a>
              <a
                href={project.live}
                onClick={e => e.stopPropagation()}
                style={{ color: '#333348', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#F0F0F5')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#333348')}
              >
                <ExternalLink size={17} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating preview on hover */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            key={hoveredIndex}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              left: mousePos.x + 24,
              top: mousePos.y - 120,
              width: '280px',
              height: '180px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #1E1E2E',
              pointerEvents: 'none',
              zIndex: 999,
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              background: PROJECTS[hoveredIndex].gradient,
            }}
          >
            {/* Mock preview card */}
            <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#F0F0F5', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '6px' }}>
                  {PROJECTS[hoveredIndex].name}
                </div>
                <div style={{ fontSize: '12px', color: '#8888A8', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
                  {PROJECTS[hoveredIndex].desc}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {PROJECTS[hoveredIndex].stack.map(t => (
                  <span key={t} style={{ fontSize: '10px', padding: '2px 8px', background: 'rgba(57,217,138,0.1)', border: '1px solid rgba(57,217,138,0.2)', color: '#39D98A', borderRadius: '999px', fontFamily: "'JetBrains Mono', monospace" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <ScrollReveal delay={0.3}>
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <a
            href="https://github.com/deepak-tiwarrri"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#39D98A',
              fontSize: '14px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'gap 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.gap = '14px')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.gap = '8px')}
          >
            See All Projects →
          </a>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 640px) {
          .project-tags { display: none !important; }
        }
      `}</style>
    </section>
  );
}
