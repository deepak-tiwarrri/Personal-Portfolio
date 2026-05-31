import { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

interface Skill {
  name: string;
  icon: string;
  color?: string;
}

const SKILL_GROUPS: { category: string; skills: Skill[] }[] = [
  {
    category: 'FRONTEND',
    skills: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Material UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
      { name: 'HTML5/CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    ],
  },
  {
    category: 'BACKEND',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    ],
  },
  {
    category: 'DATABASE',
    skills: [
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ],
  },
  {
    category: 'TOOLS',
    skills: [
      { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ],
  },
];

function SkillItem({ skill, delay }: { skill: Skill; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 16px',
        borderRadius: '8px',
        background: hovered ? 'rgba(57,217,138,0.06)' : 'transparent',
        border: `1px solid ${hovered ? 'rgba(57,217,138,0.2)' : '#1A1A2A'}`,
        cursor: 'default',
        transition: 'all 0.2s',
      }}
    >
      <img
        src={skill.icon}
        alt={skill.name}
        width={22}
        height={22}
        style={{ objectFit: 'contain', flexShrink: 0, filter: skill.name === 'Express.js' ? 'invert(1) brightness(0.7)' : 'none' }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
      <span style={{ fontSize: '13px', color: hovered ? '#F0F0F5' : '#8888A8', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap', fontWeight: 500 }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(60px, 10vw, 160px)',
        borderTop: '1px solid #141420',
      }}
    >
      {/* Section label */}
      <ScrollReveal direction="left" distance={20}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '60px' }}>
          <Code2 size={14} color="#39D98A" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#39D98A', letterSpacing: '0.12em' }}>MY STACK</span>
        </div>
      </ScrollReveal>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {SKILL_GROUPS.map((group, gi) => (
          <div
            key={group.category}
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              gap: 'clamp(24px, 4vw, 64px)',
              alignItems: 'flex-start',
              padding: '40px 0',
              borderTop: gi === 0 ? '1px solid #141420' : 'none',
              borderBottom: '1px solid #141420',
            }}
            className="skills-row"
          >
            {/* Category label */}
            <ScrollReveal direction="left" delay={gi * 0.1} distance={20}>
              <div
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 700,
                  color: '#F0F0F5',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  paddingTop: '6px',
                }}
              >
                {group.category}
              </div>
            </ScrollReveal>

            {/* Skills grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {inView && group.skills.map((skill, si) => (
                <SkillItem key={skill.name} skill={skill} delay={gi * 0.1 + si * 0.05} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .skills-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
