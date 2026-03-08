---
task: 03-create-page-route
status: done
depends: [01-create-content-types, 02-create-scaffold-components]
files:
  - path: src/app/my-claude-code-workflow/page.tsx
    action: create
---

# Create Page Route

## Context
Main page component at `/my-claude-code-workflow`. Assembles scaffold components with placeholder content. This is the entry point that will receive real content later.

## Files to Modify/Create
- `src/app/my-claude-code-workflow/page.tsx` (new)

## Implementation Details

### Page Structure
```
┌─────────────────────────────────────┐
│ Terminal Header (workflow.tsx)      │
├─────────────────────────────────────┤
│ Hero: "My Claude Code Workflow"     │
│ Subtitle + meta hook                │
├─────────────────────────────────────┤
│ [Placeholder: Intro Section]        │
├─────────────────────────────────────┤
│ [Placeholder: Phase 1 - Discussion] │
│ [Placeholder: Phase 2 - Planning]   │
│ [Placeholder: Phase 3 - Handoff]    │
│ [Placeholder: Phase 4 - Review]     │
│ [Placeholder: Phase 5 - Best Idea]  │
│ [Placeholder: Phase 6 - Improve]    │
│ [Placeholder: Phase 7 - Implement]  │
│ [Placeholder: Phase 8 - Code Review]│
├─────────────────────────────────────┤
│ [Placeholder: Outro]                │
└─────────────────────────────────────┘
```

### Component Type
Server component (no 'use client'). Uses generateMetadata, no client state needed.
Future sticky TOC sidebar will use a client boundary when added — don't pre-optimize.

### Requirements
1. **generateMetadata** for SEO:
   - Title: "My Claude Code Workflow | Kevin Andrews"
   - Description: workflow summary for social sharing

2. **Terminal-style header** matching homepage:
   - Window dots (red/yellow/green)
   - File name indicator (e.g., `workflow.tsx`)

3. **Map over phases** from `workflowContent`:
   - Render `WorkflowSection` for each phase
   - Include `PlaceholderBlock` children showing expected content

4. **Full-width layout**:
   - `max-w-4xl` or similar for readable prose width
   - Responsive padding

5. **Homepage terminal theme** (NOT project detail style):
   - `bg-black` background
   - Monospace font (`font-mono`)
   - Green accents (`green-400`, `green-500/20` borders)
   - NOT cyan — that's project detail pages

Reference files:
- `src/app/page.tsx` - terminal styling, hero pattern
- `src/components/ProjectDetailTemplate.tsx` - section layout

## Verification
1. `pnpm dev`
2. Navigate to `http://localhost:3000/my-claude-code-workflow`
3. Verify:
   - Page loads without errors
   - Terminal theme matches homepage
   - All 8 phase placeholders visible
   - Mobile responsive (check at 375px width)
4. `pnpm build` - no build errors
