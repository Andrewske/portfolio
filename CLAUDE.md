# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Before beginning review @ai-learnings.md for context about the user

## Commands

### Development
```bash
pnpm dev          # Start development server on http://localhost:3000
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Architecture

This is a Next.js 14 portfolio website using the App Router pattern with TypeScript and Tailwind CSS.

### Key Technologies
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom utility classes for indentation
- **Fonts**: JetBrains Mono and Roboto Mono (Google Fonts)
- **Email**: EmailJS for contact form
- **Package Manager**: pnpm

### Project Structure
- `/src/app/` - Next.js app router pages and layouts
  - Main page (`page.tsx`) serves as the portfolio home
  - Project detail pages: `/admin-dashboard`, `/masakali`, `/zoho-twilio`
- `/src/components/` - Reusable React components
  - `/sections/` - Major page sections (About, Contact, Education, Projects)
  - Project showcase components in `/sections/projects/`
- `/src/lib/` - Data files for experiences and about content
- `/src/styles/` - Custom icon fonts (icomoon)
- `/src/utils/` - Utility functions

### Path Aliases
- `~/` maps to `./src/` directory (configured in tsconfig.json)

### Styling Approach
- Tailwind CSS for utility-first styling
- Custom color tokens defined for syntax highlighting theme:
  - `keyword` (blue), `common` (yellow), `comment` (green), `declaration` (purple)
- Custom indentation utilities (`.indent-0` through `.indent-6`)
- Dark mode support via Tailwind's dark variant

### Component Patterns
- Functional components with TypeScript
- Section components accept data from `/lib` files
- Project pages use consistent layout structure
- TextAsCode component for displaying experience data