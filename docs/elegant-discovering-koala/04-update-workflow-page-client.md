---
task: 04-update-workflow-page-client
status: pending
depends: [02-create-block-renderer, 03-migrate-content]
files:
  - path: src/components/workflow/WorkflowPageClient.tsx
    action: modify
---

# Update WorkflowPageClient to Use Block Renderer

## Context
Replace the existing `renderSingleBlock` function with the new `renderBlock` from BlockRenderer. Remove string parsing logic. Apply variant 2 styling using design system tokens.

## Files to Modify/Create
- src/components/workflow/WorkflowPageClient.tsx (modify)

## Implementation Details

### Remove
- Delete `renderSingleBlock` function (replaced by BlockRenderer)
- Remove import of `renderFormattedContent`

### Update
- Import `renderBlock`, `renderBlocks` from `./BlockRenderer`
- Update `renderBlockGroups` to use new renderer
- Apply design system classes (bg-bg-main, text-green-primary, etc.)

### Key changes in renderBlockGroups:

```tsx
import { renderBlock, renderBlocks } from './BlockRenderer';

function renderBlockGroups(blocks: Block[]): ReactElement[] {
  const groups = groupBlocksByContainer(blocks);

  return groups.map((group, groupIndex) => {
    const renderedBlocks = group.blocks
      .map((block, i) => renderBlock(block, group.startIndex + i))
      .filter((el): el is ReactElement => el !== null);

    // ... rest stays the same (terminal wrapping, DinoCollapsible, etc.)
  });
}
```

### isTerminalContent update
Update to work with new Block type - check for `dinoOnly` on any block type.

### groupBlocksByContainer
Should work unchanged - it just groups by terminal/non-terminal.

### Styling updates (from variant 2)
- Main background: `bg-bg-main`
- Panel backgrounds: `bg-bg-panel`
- Primary text: `text-text-primary`
- Headings: `text-green-primary`
- Borders: `border-border`

## Verification
- `pnpm dev` - page renders
- All phases display correctly
- Dino mode toggle works
- Terminal windows group correctly
- Kevin sections (non-terminal) render outside terminal styling
- Styling matches variant 2 aesthetic
