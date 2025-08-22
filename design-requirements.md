# Portfolio Redesign Requirements - Kevin Andrews

## Project Context
Redesigning a developer portfolio for a Software Engineer position at Anthropic (Claude Code team). The role focuses on building AI-powered developer tools. Current design uses JavaScript function syntax which is creative but has readability issues.

## Target Audience
- **Primary**: Anthropic hiring managers and engineers
- **Secondary**: Tech recruiters at AI/developer tools companies
- **Viewing context**: 30-second initial scan, then 2-minute deep dive if interested

## Design Goals
1. **Immediate positioning**: Visitor should instantly understand this is a Full-Stack Developer with AI expertise
2. **Production credibility**: Emphasize real systems in production, not learning projects
3. **Technical depth**: Show sophisticated understanding without overwhelming
4. **Performance focus**: Metrics and numbers should be prominent
5. **Clean and scannable**: Easy to read quickly, especially on mobile

## Content Hierarchy & Requirements

### 1. Hero Section (Above the Fold)
**Required Elements:**
- **Title**: "Kevin Andrews"
- **Subtitle**: "Full-Stack Developer & AI Engineer"
- **Tagline**: "Building production AI systems that solve real problems"
- **Featured Project Preview**: Knowledge Graph MCP System (see details below)
- **Quick Links**: GitHub, LinkedIn, Contact
- **Call-to-Action**: "View Featured Project" or "See My Work"

**Design Notes:**
- Should feel technical but not overwhelming
- Consider subtle animation or interactive element
- Must work perfectly on mobile
- Dark mode preferred but ensure good contrast

### 2. Featured Project - Knowledge Graph MCP System
**This is the HERO PROJECT - Give it special treatment**

**Required Information:**
- **Title**: "Knowledge Graph MCP System"
- **Subtitle**: "AI memory system for persistent context"
- **Key Metrics** (MUST be prominent):
  - 85-second processing time
  - $0.00002 cost per operation
  - Production deployment
- **Tech Stack**: Python, Graph Database, MCP Protocol, LLMs
- **Links**: GitHub repo, Technical documentation, Live demo
- **Visual Element**: Architecture diagram or system flow visualization

**Design Treatment:**
- This should stand out from other projects
- Consider a card with depth/shadow or special border
- Metrics should be immediately visible (consider badges or stat cards)
- Include a "Technical Deep Dive" expandable section

### 3. Other Projects Section
**Format each project with:**
- Project title
- One-line description focusing on impact
- **Performance metrics** (required for each):
  - Users served, requests processed, uptime, cost savings, etc.
- Tech stack badges
- Links: GitHub | Live Demo | Details

**Projects to Include:**
1. **Admin Dashboard**: "Internal tools platform serving entire operations team"
   - Metrics: X users, Y requests/day, Z% uptime
2. **Masakali Payment System**: "Full-stack payment processing with Stripe"
   - Metrics: Transaction volume, reliability percentage
3. **Zoho-Twilio Integration**: "Automated SMS workflow system"
   - Metrics: Messages sent, automation success rate
4. **Multi-Agent Note System**: "Next-generation AI workflow orchestration"
   - Label as "In Development" or "Coming Soon"

### 4. Skills Section
**Organize in columns/grids:**
- **AI/ML**: LLMs, MCP, Knowledge Graphs, Prompt Engineering, Agent Orchestration
- **Backend**: Python, Node.js, PostgreSQL, MongoDB, FastAPI
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **DevOps**: AWS, Docker, CI/CD, Vercel

**Design Note:** Consider skill proficiency indicators or years of experience

### 5. About Section
**Key Messages:**
- Self-taught developer shipping production systems for 4+ years
- Focus on building tools that solve real problems
- Interest in human-centered AI design

**Keep it Brief:** 2-3 paragraphs maximum

### 6. Contact Section
- Simple contact form or email link
- Social links (GitHub, LinkedIn)
- Location: [Your Location]
- Availability status

## Visual Design Direction

### Style Preferences
- **Overall Feel**: Professional, technical, clean
- **Not**: Playful, artsy, or overly creative
- **Reference**: Think Vercel, Linear, or Stripe's documentation sites

### Color Palette
- **Primary**: Dark background (#0A0A0A to #1A1A1A range)
- **Accent**: Choose one accent color for CTAs and highlights
- **Text**: High contrast, excellent readability
- **Code Elements**: Subtle syntax highlighting if used

### Typography
- **Headings**: Clean, modern sans-serif (Inter, Söhne, or similar)
- **Body**: Excellent readability, proper line height
- **Code**: Monospace for actual code snippets only (not body text)

### Interactive Elements
- Subtle hover states
- Smooth transitions
- Consider micro-animations for metrics/numbers
- Mobile-first responsive design

## Technical Requirements
- **Performance**: Lighthouse score 90+
- **Responsive**: Perfect on mobile, tablet, desktop
- **Accessibility**: WCAG AA compliant
- **Browser Support**: Modern browsers (last 2 versions)

## What to AVOID
❌ Complex JavaScript function syntax for content
❌ Hard-to-read indented text
❌ "Learning" or "practice project" language
❌ Cluttered or busy layouts
❌ Generic template feel
❌ Stock photos or generic graphics
❌ Excessive animations or parallax effects

## Success Metrics
The design succeeds if a visitor thinks:
- "This person builds production systems"
- "They understand AI deeply"
- "The work looks professional and reliable"
- "I want to learn more about their projects"

## Inspiration Sites
- **Stripe Documentation**: Clean, technical, excellent hierarchy
- **Linear.app**: Modern, clean, great use of space
- **Vercel.com**: Developer-focused, clean typography
- **GitHub Profile Pages**: Familiar to developers, good information density

## Current Design Reference
See attached screenshot for current design. Keep the developer theme concept but prioritize readability and professional presentation over creative code formatting.

## Deliverables Needed
1. Desktop design (1440px width)
2. Mobile design (375px width)
3. Component states (hover, active, focus)
4. Color palette and typography specs
5. Any custom graphics or icons needed

## Timeline & Priority
Focus first on:
1. Hero section with new positioning
2. Featured project (Knowledge Graph MCP)
3. Projects section with metrics

These are the most critical for the Anthropic application.