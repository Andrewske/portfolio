# Workflow Blog Components

## Overview

Implement 6 React components for the Claude workflow blog post on the portfolio site. Components render Hammond/Claude dialogue with avatars, narrator commentary, plan review findings, and supporting UI elements. Follows existing terminal aesthetic (dark theme, green accents, monospace).

## Task Sequence

1. [02-core-chat-components.md](./02-core-chat-components.md) - ChatMessage + Finding components (avatar inlined)
2. [03-narrator-components.md](./03-narrator-components.md) - KevinCallout + TimeSkip components
3. [04-ui-components.md](./04-ui-components.md) - PhaseLabel + CollapsiblePrompt components
4. [05-content-integration.md](./05-content-integration.md) - Extend types + wire up page.tsx

*Note: Task 01 (assets setup) removed - avatar logic inlined in ChatMessage*

## Success Criteria

1. Run `pnpm dev` - no build errors
2. Navigate to `/my-claude-code-workflow`
3. All component types render correctly:
   - ChatMessage: Hammond avatar left, Claude avatar right
   - Finding: Color-coded severity badges (red/orange/yellow/blue)
   - KevinCallout: Amber border, "What breaks" warning section
   - PhaseLabel: Sticky during scroll
   - TimeSkip: Faded/italic/centered
   - CollapsiblePrompt: Expands/collapses with keyboard support
4. Responsive on mobile viewport

## Dependencies

- Existing portfolio components: WorkflowSection, PlaceholderBlock, CodeBlock, Badge
- Tailwind CSS utilities
- Avatar images: CSS placeholders initially, real images optional later

## Key Decisions (from plan review)

1. **Avatars**: CSS-only placeholders (colored circles with initials) - inlined in ChatMessage
2. **PhaseLabel**: Uses existing Badge component with new `phase` variant + sticky wrapper
3. **Code blocks**: Uses existing CodeBlock component (typescript, python, sql highlighting)
4. **Accessibility**: Text labels on severity badges sufficient (no icons); alt text on avatars
5. **Content**: Plain text strings; markdown support intentionally deferred

## Improvements (from improve-idea phase)

1. **Animations**: Using tw-animate-css utilities (`animate-in fade-in slide-in-from-bottom-2`)
2. **Simplified types**: Dropped `chatGroup` and `findingsList` - use composition instead
3. **CSS spacing**: Adjacent sibling selector `[data-chat] + [data-chat]` for tight chat spacing
4. **Anchor links**: Optional `id` field on chat/kevin blocks for deep linking
5. **Testing**: `data-testid` attributes on all components
6. **Standalone Finding**: Works inside ChatMessage or independently

## Component Summary

| Component | Purpose | Key Styling |
|-----------|---------|-------------|
| ChatMessage | Dialogue with avatars | Hammond left, Claude right, CSS placeholder avatars |
| Finding | Severity-coded findings | red/orange/yellow/blue badges + text labels |
| KevinCallout | Narrator commentary | amber border, warning section |
| PhaseLabel | Phase indicator | Badge component + sticky wrapper |
| TimeSkip | Ellipsis moments | faded italic centered |
| CollapsiblePrompt | Expandable prompts | native details/summary |
| CodeBlock | Code snippets | existing component, syntax highlighting |
