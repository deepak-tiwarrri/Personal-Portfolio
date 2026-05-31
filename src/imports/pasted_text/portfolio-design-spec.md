ROLE & GOAL
───────────
You are a senior UI/UX designer and full-stack developer portfolio specialist. 
Design a complete, pixel-perfect, single-page personal portfolio website for a 
full-stack developer (frontend + backend). The design must be production-ready, 
visually striking, and conversion-optimized to attract recruiters and clients.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VISUAL STYLE & AESTHETIC
─────────────────────────
- Theme: Dark mode first, with a deep background (#0A0A0F or similar near-black)
- Accent color: A vibrant electric tone — electric blue (#4F8EF7) or neon green 
  (#39D98A) — used for highlights, CTAs, hover states, and animated underlines
- Typography:
    - Headings: "Space Grotesk" or "Clash Display" — bold, large, expressive
    - Body: "Inter" or "DM Sans" — clean, readable at small sizes
    - Monospace accents (for tech labels/tags): "JetBrains Mono" or "Fira Code"
- Layout feel: Inspired by tajmirul.site — minimal clutter, large whitespace, 
  editorial-style section breaks, smooth scroll sections
- Motion hints (annotate in Figma): Fade-up on scroll, staggered list reveals, 
  cursor glow effect on hero, hover underline animations on nav links
- Grid: 12-column desktop grid, 4-column tablet, 1-column mobile; max-width 1280px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE STRUCTURE — SECTIONS IN ORDER
────────────────────────────────────

1. ──── NAVIGATION (Sticky, full-width)
   - Left: Name/Logo in monospace font (e.g., "[ YourName ]" or just initials)
   - Center: Nav links — Home | About | Skills | Experience | Projects | Contact
   - Right: "Download CV" button (outlined style, accent border) + optional 
     dark/light toggle icon
   - On scroll: Nav gets a frosted glass background with subtle blur (annotate)
   - Mobile: Hamburger menu with a full-screen overlay nav

2. ──── HERO SECTION
   - Large bold headline split across 2–3 lines:
     Line 1: "Full-Stack" (regular weight)
     Line 2: "Developer." (heavy weight, accent color underline or highlight)
   - Sub-headline: 1–2 lines introducing who you are. Example:
     "I build fast, scalable, and beautiful web experiences — from pixel to API."
   - Two CTAs side by side:
     Primary: "View My Work" (filled, accent color)
     Secondary: "Let's Talk" (outlined)
   - Bottom-left: Social icon row — GitHub, LinkedIn, Twitter/X (small, monochrome)
   - Right side / background: Abstract code snippet or mesh gradient blob; 
     optionally a developer avatar/photo inside a subtle frame or glowing ring
   - Availability badge: Small pill badge — "🟢 Open to opportunities" 
     (top-right near hero or below CTA row)
   - Stats bar below fold (3 columns):
     [ X+ Years Experience ] | [ X+ Projects Shipped ] | [ X+ Technologies ]

3. ──── ABOUT ME SECTION
   - Two-column layout: Left = photo (rounded corners, slight border glow); 
     Right = text block
   - Heading: "About Me" with a numbered label (e.g., "01 /")
   - 2–3 short paragraphs about your background, philosophy, and what drives you
   - Below text: Two inline tags or pills — e.g., "Frontend Specialist" and 
     "Backend Architect"
   - Optional: A quote block or short value statement in large italic text

4. ──── SKILLS / TECH STACK SECTION
   - Heading: "My Stack" with a subtle label
   - Organized into 4 horizontal groups with group labels:
       FRONTEND   |   BACKEND   |   DATABASE   |   TOOLS & DEVOPS
   - Each skill shown as: Icon (SVG logo) + Name label underneath
   - Items displayed in a scrollable horizontal row per group OR 
     a grid of icon cards with hover tooltip (show version or years of use)
   - Skill icons to include (replace/add based on your actual stack):
     Frontend: React, Next.js, TypeScript, Tailwind CSS, Redux, GSAP
     Backend: Node.js, Express.js, NestJS, REST API, GraphQL
     Database: PostgreSQL, MongoDB, MySQL, Prisma, Redis
     Tools: Git, Docker, AWS, Vercel, Figma, Postman

5. ──── EXPERIENCE / WORK HISTORY SECTION
   - Heading: "Experience" with numbered label "03 /"
   - Vertical timeline layout (left-side timeline line with dots)
   - Each role card contains:
       • Company name (bold) + Role title (accent color)
       • Duration badge (e.g., "Jan 2023 – Present")
       • 2–3 bullet points of key responsibilities/achievements
       • Tech stack used (small pill tags below bullets)
   - Latest role at top; roles in reverse chronological order
   - [PLACEHOLDER — populate from uploaded resume PDF]

6. ──── PROJECTS SECTION
   - Heading: "Selected Projects" with label "04 /"
   - Grid: 2-column on desktop, 1-column on mobile
   - Each project card contains:
       • Full-width project thumbnail/screenshot (16:9 ratio)
       • Project number in large faint text (e.g., "01") behind the card
       • Project name (bold)
       • 1-line description
       • Tech stack tags (3–4 pills)
       • Two icon-buttons: Live Preview (external link icon) + GitHub (GitHub icon)
       • On hover: Card lifts with shadow, thumbnail overlays with a 
         semi-transparent tint and "View Project →" text
   - [PLACEHOLDER — fill with 4–6 of your real projects]
   - CTA at bottom: "See All Projects →" linking to a /projects page or GitHub

7. ──── TESTIMONIALS / RECOMMENDATIONS (optional but impactful)
   - 2–3 quote cards in a horizontal scroll or grid
   - Each card: Quote text + person name + role/company + small avatar photo
   - Card style: Dark card with subtle left-border in accent color

8. ──── FOOTER SECTION (critical — detailed breakdown below)
   ════════════════════════════════════════
   FOOTER — Full detailed spec:
   ════════════════════════════════════════
   
   A) TOP ROW — "Let's Work Together" CTA Block
      - Large heading: "Have a project in mind? Let's build it."
      - Subtext: "I'm currently available for freelance and full-time roles."
      - CTA button: "Get In Touch" (large, filled, accent color)
   
   B) DIVIDER LINE (full width, subtle opacity)
   
   C) FAQ ACCORDION
      - Label: "Frequently Asked Questions"
      - 5–6 questions in a clean accordion (click to expand/collapse)
      - Each item: Question row (bold text + "+" icon right-aligned); 
        on expand: answer text slides down smoothly
      - Suggested questions (customize these):
        Q1: "Are you available for freelance projects?"
        Q2: "What is your typical project timeline?"
        Q3: "Do you work with international clients?"
        Q4: "What technologies do you specialize in?"
        Q5: "How do I get started working with you?"
        Q6: "Do you offer post-launch support or maintenance?"
      - [Annotate: accordion open/close animation — 300ms ease transition]
   
   D) CONTACT DETAILS BLOCK (below FAQ)
      - 3-column row:
        Col 1 — Email:
          Label: "Email"
          Value: your@email.com (clickable mailto link, underline on hover)
        Col 2 — Location:
          Label: "Based In"
          Value: Pune, India 🇮🇳
        Col 3 — Availability:
          Label: "Status"
          Value: 🟢 Available for hire
      - Social links row: GitHub | LinkedIn | Twitter/X — icon + handle
   
   E) BOTTOM BAR (full-width, slightly darker background)
      - Left: "© 2025 [Your Name]. All rights reserved."
      - Right: "Designed & built with ❤️ by [Your Name]"
   ════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RESPONSIVE DESIGN REQUIREMENTS
────────────────────────────────
Design frames for these three breakpoints:
  - Desktop: 1440px wide
  - Tablet: 768px wide
  - Mobile: 375px wide

Key responsive rules:
  - Hero headline font drops from 72px → 48px → 32px across breakpoints
  - Projects grid: 2-col desktop → 1-col mobile
  - Skills grid: horizontal scroll on mobile with snap points
  - Footer columns stack vertically on mobile
  - Nav collapses to hamburger at ≤768px
  - Touch targets minimum 44×44px on all interactive elements

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN TOKENS & SPECS
──────────────────────
Colors:
  Background:      #0A0A0F
  Surface/Card:    #111118
  Border:          #1E1E2E
  Text Primary:    #F0F0F5
  Text Secondary:  #8888A8
  Accent:          #4F8EF7  (or swap to #39D98A)
  Accent Hover:    lighten accent by 15%
  Error:           #FF5C5C

Spacing scale: 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96px
Border radius: Cards = 12px; Buttons = 8px; Tags/pills = 999px (full round)
Shadows: Cards use a diffused glow: 0px 0px 40px rgba(79, 142, 247, 0.08)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENT SPECIFICATIONS
─────────────────────────
Button variants:
  Primary:   Filled accent bg, white text, 8px radius, 12px 24px padding
  Secondary: Transparent, 1px accent border, accent text, same padding
  Ghost:     No border, accent text, underline on hover only
  Icon btn:  Circle, 40×40px, icon centered, subtle border

Tag/Pill style:
  Background: rgba(accent, 0.12), border: 1px solid rgba(accent, 0.25)
  Text: accent color, font-size: 12px, font-weight: 500
  Padding: 4px 12px

Cards:
  Background: #111118, border: 1px solid #1E1E2E
  Hover state: border-color shifts to accent with opacity 0.4
  Corner radius: 12px, padding: 24px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FIGMA ORGANIZATION
───────────────────
- Pages: 1 = Desktop | 2 = Tablet | 3 = Mobile | 4 = Components
- Each page section: wrapped in an auto-layout frame named exactly 
  (e.g., "Section / Hero", "Section / Projects", "Section / Footer")
- Components page: all buttons, cards, tags, nav, and accordion 
  as master components with variants (default/hover/active/disabled)
- Use Figma variables for all colors and spacing tokens
- Auto-layout for all repeated elements (skill icons, project cards, FAQ rows)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMAGE PLACEHOLDERS
───────────────────
Where real images haven't been provided, use:
  - Profile photo: 400×400px rounded placeholder with initials overlay
  - Project thumbnails: 800×450px (16:9) with a gradient placeholder 
    labeled with project number and name
  - Tech logos: Source SVGs from devicons.dev or simpleicons.org
  - When reference images are provided (uploaded), place them exactly 
    in the corresponding project or about section frames

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTENT POPULATION NOTE
────────────────────────
Real personal data (name, job titles, company names, project descriptions, 
tech stack, skills, email, social handles) should be extracted from the 
uploaded resume PDF and reference images. Populate all sections with this 
real data — do NOT leave generic Lorem Ipsum text in any final frame.