---
task: 02-create-scaffold-components
status: pending
depends: [01-create-content-types]
files:
  - path: src/components/workflow/WorkflowSection.tsx
    action: create
  - path: src/components/workflow/PlaceholderBlock.tsx
    action: create
---

# Create Scaffold Components

## Context
Minimal placeholder components that establish the component structure. These will evolve into real components (CollapsibleSection, CommandBlock, FindingCard, etc.) as content arrives.

## Files to Modify/Create
- `src/components/workflow/WorkflowSection.tsx` (new)
- `src/components/workflow/PlaceholderBlock.tsx` (new)

## Implementation Details

### WorkflowSection.tsx
Minimal styling wrapper — handles chrome only, layout delegated to children:
- Accepts `id`, `title`, `children` props
- Terminal-style header matching homepage aesthetic
- Border/background styling only (no layout opinions)
- Children control all internal layout decisions

This is a styling wrapper, NOT a layout component. As content varies between phases (prose vs code vs lists), the flexibility lives in children composition.

**Style: Homepage terminal theme (green accents)**
Reference `src/app/page.tsx`:
- `border border-green-500/20`
- `bg-black/50 backdrop-blur-sm`
- Terminal window dots (red/yellow/green)
- Green accents, NOT cyan (cyan is project detail pages)

### PlaceholderBlock.tsx
**Temporary scaffolding — delete once all content integrated.**

Visual placeholder showing where content goes:
- Dashed border indicating "content pending"
- Muted text explaining what will go here
- Accepts `label` prop (e.g., "JP Scene", "Kevin Callout", "Command Block")

Use shadcn Card component as base if appropriate. Do not over-engineer — this component will be removed.

## Verification
- Components render without errors
- Import into page.tsx works
- Styling matches portfolio terminal theme
