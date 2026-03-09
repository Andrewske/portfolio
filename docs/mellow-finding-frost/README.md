# Update Workflow Page to New Design

## Overview
Update the `/my-claude-code-workflow` blog page to match the design iterated in `/6`:
- Editorial hero with image placeholder (no terminal chrome)
- Floating sidebar navigation (desktop) + sticky top bar (mobile)
- Bullet-based TL;DR instead of dense table
- Preserve terminal styling for JP/dino content sections

## Task Sequence
1. [01-add-navigation-components.md](./01-add-navigation-components.md) - Add StickyTimeline (mobile) and FloatingSidebar (desktop) components
2. [02-add-scroll-tracking.md](./02-add-scroll-tracking.md) - Add Intersection Observer for active phase tracking
3. [03-update-hero-section.md](./03-update-hero-section.md) - Replace terminal hero with editorial design + image placeholder
4. [04-update-tldr-section.md](./04-update-tldr-section.md) - Replace table with prose intro + bullet list
5. [05-update-content.md](./05-update-content.md) - Add Handoff to pipeline, change "skills" to "commands"

## Success Criteria
1. Hero displays without terminal chrome, shows image placeholder
2. Sidebar appears on desktop (left side, labels visible, dots on right)
3. Top bar appears on mobile only
4. Active phase highlights in nav while scrolling
5. JP/dino content still renders in terminal windows
6. "no dinos" toggle works correctly
7. Mobile responsive at 375px and 768px widths

## Dependencies
- Reference implementation exists at `/src/app/6/page.tsx`
- Existing components: `DinoModeProvider`, `ImmersionControls`, `DinoCollapsible`
- Color tokens defined in `tailwind.config.ts`
