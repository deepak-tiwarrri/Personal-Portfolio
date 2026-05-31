import { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { motion } from 'motion/react';
import { Mail, MapPin, Github, Linkedin, Instagram, ChevronDown, MessageSquare, HelpCircle } from 'lucide-react';
import { XIcon } from './ui/utils';
import ScrollReveal from './ui/ScrollReveal';


const FAQ_ITEMS = [
  {
    q: 'Are you available for freelance projects?',
    a: 'Yes! I am currently open to both freelance engagements and full-time opportunities. Feel free to reach out and we can discuss your project requirements.',
  },
  {
    q: 'What is your typical project timeline?',
    a: 'Project timelines vary based on scope and complexity. A landing page might take 1–2 weeks, while a full-featured web app can range from 4–12 weeks. I always provide a clear timeline estimate before starting.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Absolutely. I have experience collaborating with clients across different time zones. I use async-friendly tools like Notion, Slack, and Loom to ensure smooth communication.',
  },
  {
    q: 'What technologies do you specialize in?',
    a: 'I specialize in the React ecosystem — React, Next.js, TypeScript, and Tailwind CSS. I also have strong proficiency in Node.js/Express for backend work and am comfortable with databases like PostgreSQL and MongoDB.',
  },
  {
    q: 'How do I get started working with you?',
    a: 'Simply send me an email or connect with me on LinkedIn. Share a brief description of your project, and I\'ll get back to you within 24 hours to schedule an intro call.',
  },
  {
    q: 'Do you offer post-launch support or maintenance?',
    a: 'Yes, I offer post-launch support packages including bug fixes, performance monitoring, and feature enhancements. Terms are agreed upon at the start of the project.',
  },
];

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid #141420' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '20px 0',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#F0F0F5', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.4 }}>
          {q}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          color="#39D98A"
          style={{ flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p style={{ paddingBottom: '20px', color: '#6868A0', fontSize: '14px', fontFamily: "'Inter', sans-serif", lineHeight: 1.75, margin: 0 }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <footer
      id="contact"
      ref={ref}
      style={{ borderTop: '1px solid #141420' }}
    >
      {/* CTA Block */}
      <div
        style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(60px, 10vw, 160px)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <ScrollReveal direction="up" distance={15}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
              <MessageSquare size={14} color="#39D98A" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#39D98A', letterSpacing: '0.12em' }}>LET'S WORK TOGETHER</span>
            </div>
          </ScrollReveal>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 700,
              color: '#F0F0F5',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Have a project in mind?
            <br />
            <span style={{ color: '#39D98A' }}>Let's build it.</span>
          </h2>
          <p style={{ color: '#6868A0', fontSize: '15px', fontFamily: "'Inter', sans-serif", marginBottom: '40px' }}>
            I'm currently available for freelance and full-time roles.
          </p>
          <a
            href="mailto:deepak.tiwari.engineer@gmail.com"
            style={{
              display: 'inline-block',
              background: '#39D98A',
              color: '#0A0A0F',
              padding: '16px 40px',
              fontWeight: 700,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '14px',
              fontFamily: "'Space Grotesk', sans-serif",
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#5AEBAA'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#39D98A'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#141420', margin: '0 clamp(60px, 10vw, 160px)' }} />

      {/* FAQ Section */}
      <div style={{ padding: 'clamp(60px, 8vw, 100px) clamp(60px, 10vw, 160px)' }}>
        <ScrollReveal direction="left" distance={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
            <HelpCircle size={14} color="#39D98A" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#39D98A', letterSpacing: '0.12em' }}>FREQUENTLY ASKED QUESTIONS</span>
          </div>
        </ScrollReveal>
        <div style={{ maxWidth: '720px' }}>
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#141420', margin: '0 clamp(60px, 10vw, 160px)' }} />

      {/* Contact details */}
      <div style={{ padding: 'clamp(60px, 8vw, 100px) clamp(60px, 10vw, 160px)' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '48px' }}
          className="contact-grid"
        >
          {[
            {
              icon: Mail,
              label: 'Email',
              value: 'deepak.tiwari.engineer@gmail.com',
              href: 'mailto:deepak.tiwari.engineer@gmail.com',
            },
            {
              icon: MapPin,
              label: 'Based In',
              value: 'Mumbai, Maharashtra, India 🇮🇳',
              href: undefined,
            },
            {
              icon: null,
              label: 'Status',
              value: '🟢 Available for hire',
              href: undefined,
            },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: '11px', color: '#444458', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase' }}>
                {item.label}
              </div>
              {item.href ? (
                <a href={item.href} style={{ fontSize: '15px', color: '#F0F0F5', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.2s' }} onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#39D98A')} onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#F0F0F5')}>
                  {item.value}
                </a>
              ) : (
                <span style={{ fontSize: '15px', color: '#F0F0F5', fontFamily: "'JetBrains Mono', monospace" }}>{item.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          {[
            { icon: Github, label: 'GitHub', href: 'https://github.com/deepak-tiwarrri', handle: 'github.com/deepak-tiwarrri' },
            { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/deepak-tiwarrri', handle: 'linkedin.com/in/deepak-tiwarrri' },
            { icon: XIcon, label: 'X', href: 'https://x.com/deepak_tiwarrri', handle: '@deepak_tiwarrri' },
            { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/deepak-tiwarrri', handle: '@deepak_tiwarrri' },
          ].map(({ icon: Icon, label, href, handle }) => (
            <a
              key={label}
              href={href}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#444458', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#F0F0F5')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#444458')}
            >
              <Icon size={16} strokeWidth={1.5} />
              <span style={{ fontSize: '13px', fontFamily: "'JetBrains Mono', monospace" }}>{handle}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid #141420',
          background: '#07070D',
          padding: '20px clamp(60px, 10vw, 160px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '12px', color: '#333348', fontFamily: "'JetBrains Mono', monospace" }}>
          © 2025 Deepak Tiwari. All rights reserved.
        </span>
        <span style={{ fontSize: '12px', color: '#333348', fontFamily: "'JetBrains Mono', monospace" }}>
          Designed &amp; built with ❤️ by Deepak Tiwari
        </span>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
