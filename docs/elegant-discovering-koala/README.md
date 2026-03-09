# Block System Rebuild for Workflow Content

## Overview
Replace string-based content with atomic, nested block system. Eliminates runtime string parsing, gives full control over spacing/styling via CSS and component structure.

**Key insight:** Each line becomes its own block. Containers (`chat`, `finding`, `kevin`) hold nested `blocks: Block[]` arrays. Semantic compound types (`option` with pros/cons) render to proper HTML structure.

**Design decision:** Variant 2's GitHub-dark styling is the final design. Colors are extracted to a Tailwind design system. All variant pages are deleted before migration.

## Task Sequence
1. [00-design-system.md](./00-design-system.md) - Add semantic color tokens to Tailwind config
2. [00b-delete-variants.md](./00b-delete-variants.md) - Remove variant pages /1 through /5
3. [01-define-block-types.md](./01-define-block-types.md) - Create new Block union type
4. [02-create-block-renderer.md](./02-create-block-renderer.md) - Build recursive renderBlock() with exhaustiveness checking
5. [03-migrate-content.md](./03-migrate-content.md) - Convert all content + update ChatMessage/Finding components (agent-assisted)
6. [04-update-workflow-page-client.md](./04-update-workflow-page-client.md) - Wire up new renderer with design system styling
7. [05-cleanup.md](./05-cleanup.md) - Delete old code

## Success Criteria
1. `pnpm build` passes with no type errors
2. `/my-claude-code-workflow` renders with variant 2 styling
3. Dino mode toggle still works
4. No `renderFormattedContent` or string parsing remains
5. Content in `workflow-content.ts` uses new block structure
6. Design system colors used throughout (no inline styles)

## Key Decisions (from review)
- **Merged migration tasks:** Single pass through content file (agent-assisted)
- **OptionBlock inlined:** No separate component, rendered directly in BlockRenderer
- **Exhaustiveness helper:** `assertNever()` at switch default catches missing block types
- **Centralized dinoOnly filtering:** Single check in `renderBlocks()`, not scattered
- **Base block properties:** All blocks can have `id?: string` and `dinoOnly?: boolean`
- **Raw block type:** `{ type: 'raw' }` for pre-rendered HTML during migration
- **Phase type removed:** Phases rendered via section headers, not as blocks

## Design System Colors (from variant 2)
```
bg-bg-main: #0b0f0c      (main background)
bg-bg-panel: #11161c     (panel background)
bg-bg-code: #161b22      (code/header background)
border-border: #2d333b   (borders)
text-green-primary: #39d353
text-green-secondary: #2ea043
text-green-accent: #238636
text-green-bright: #7ee787
text-text-primary: #e6edf3
text-text-body: #c9d1d9
text-text-muted: #8b949e
```

## Dependencies
- Existing components: ChatMessage, Finding, TimeSkip, MemeImage, CodeBlock, WorkflowTable
- parseInlineMarkdown utility (keep for inline formatting within content strings)
- DinoModeProvider context (unchanged)
