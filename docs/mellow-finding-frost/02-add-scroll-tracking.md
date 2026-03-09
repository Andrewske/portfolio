---
task: 02-add-scroll-tracking
status: pending
depends: [01-add-navigation-components]
files:
  - path: src/components/workflow/WorkflowPageClient.tsx
    action: modify
---

# Add Scroll Tracking

## Context
The navigation components need to know which section is currently visible so they can highlight the active phase. This requires Intersection Observer logic to track scroll position.

## Files to Modify/Create
- src/components/workflow/WorkflowPageClient.tsx (modify)

## Implementation Details

### State
Add to `WorkflowContent` component:
```typescript
const [activePhase, setActivePhase] = useState<string | null>(null);
```

### Intersection Observer Effect
```typescript
useEffect(() => {
  const observers: IntersectionObserver[] = [];

  phases.forEach((phase) => {
    const element = document.getElementById(phase.id);
    if (!element) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[ScrollTracking] Missing section element: #${phase.id}`);
      }
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivePhase(phase.id);
        }
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );
    observer.observe(element);
    observers.push(observer);
  });

  return () => observers.forEach((obs) => obs.disconnect());
}, []);
```

### Pass to Navigation Components
```tsx
<StickyTimeline activePhase={activePhase} />
<FloatingSidebar activePhase={activePhase} />
```

### Required Imports
Add `useState`, `useEffect` to React imports.

### Add scroll-margin-top to Phase Sections
Update the phase `<section>` elements to include `scroll-mt-16` class, so clicking nav links doesn't hide the heading under the sticky mobile nav:
```tsx
<section key={phase.id} id={phase.id} className="space-y-6 scroll-mt-16">
```

## Verification
1. Run `pnpm dev`
2. Visit `/my-claude-code-workflow`
3. Scroll through sections
4. Active phase should highlight in both sidebar (desktop) and top bar (mobile)
5. Highlight should change as you scroll between sections
