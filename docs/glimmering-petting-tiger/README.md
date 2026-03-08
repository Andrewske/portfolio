# Claude Workflow Blog Page - Scaffold

## Overview
Create scaffold page at `/my-claude-code-workflow` for the Claude Code workflow blog post. Content is being written in a parallel session - this builds the infrastructure to drop it in.

**Decisions:**
- Pure React (no MDX) - content is structured, not flowing prose
- Standalone route - avoid premature `/blog` abstraction
- Scaffold only - placeholder components, build out as content arrives
- shadcn-ui for base components (already configured)
- Full-width layout with potential sticky TOC sidebar later

## Task Sequence
1. [01-create-content-types.md](./01-create-content-types.md) - Define TypeScript types and placeholder data structure
2. [02-create-scaffold-components.md](./02-create-scaffold-components.md) - WorkflowSection and PlaceholderBlock components
3. [03-create-page-route.md](./03-create-page-route.md) - Main page at `/my-claude-code-workflow`

## Success Criteria
1. `pnpm dev` starts without errors
2. `http://localhost:3000/my-claude-code-workflow` renders:
   - Terminal-themed header matching homepage
   - Hero with title "My Claude Code Workflow"
   - 8 placeholder sections (one per workflow phase)
   - Intro and outro placeholders
3. Mobile responsive (test at 375px)
4. `pnpm build` succeeds

## Dependencies
- shadcn-ui already configured (new-york style)
- Existing components to reference:
  - `src/app/page.tsx` - terminal theme patterns
  - `src/components/ui/card.tsx` - shadcn usage
