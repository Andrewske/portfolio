---
task: 01-add-navigation-components
status: pending
depends: []
files:
  - path: src/components/workflow/WorkflowPageClient.tsx
    action: modify
---

# Add Navigation Components

## Context
Add sticky navigation elements that help readers track their position in the long-form blog post. Desktop gets a floating sidebar on the left; mobile gets a horizontal bar at the top.

## Files to Modify/Create
- src/components/workflow/WorkflowPageClient.tsx (modify)

## Implementation Details

### Phase Data Array
Derive navigation phases from content phases (single source of truth):
```typescript
// Map content phases to nav structure
const phases = workflowContent.phases.map((phase) => ({
  id: phase.id,
  name: phase.title.replace(/^Phase \d+: /, ''), // Strip "Phase N: " prefix if present
  description: phase.description ?? '', // Add description field to WorkflowPhase type if needed
}));
```

**Note:** This requires adding a `description` field to each phase in `workflow-content.ts`. Task 05 should add descriptions when restructuring content.

### StickyTimeline Component
- Horizontal bar fixed to top
- Mobile/tablet: add `xl:hidden` class (visible until 1280px)
- Shows 7 phase nodes connected by lines
- Active phase highlighted with green glow
- **Phase count indicator:** Show "3/7" style progress (e.g., `{currentIndex + 1}/{phases.length}`) next to the dots
- Appears after scrolling past hero (uses Intersection Observer on `#hero-section`)
- **Nav links use `href={`#${phase.id}`}`** — enables shareable deep links

### FloatingSidebar Component
- Vertical list fixed to left side
- Large desktop only: add `hidden xl:block` class (1280px+)
- Position relative to content: `left-[calc(50%-38rem)]`
- Labels on left, dots on right (flipped from typical)
- Vertical line connecting dots on right side
- Active phase: green text + glowing dot
- All labels always visible
- **Nav links use `href={`#${phase.id}`}`** — enables shareable deep links when users click nav items

Reference implementation: `/src/app/6/page.tsx`

## Verification
1. Run `pnpm dev`
2. Visit `/my-claude-code-workflow`
3. On large desktop (≥1280px): should see floating sidebar on left when scrolled past hero
4. On smaller screens (<1280px): should see horizontal bar at top when scrolled past hero
5. Neither should appear while viewing the hero section
