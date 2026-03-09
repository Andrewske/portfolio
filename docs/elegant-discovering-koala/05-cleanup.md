---
task: 05-cleanup
status: pending
depends: [04-update-workflow-page-client]
files:
  - path: src/components/workflow/renderFormattedContent.tsx
    action: delete
  - path: src/lib/workflow-content.ts
    action: modify
---

# Cleanup Old Code

## Context
Remove deprecated code after migration is complete. Variants were deleted in task 00b.

## Files to Modify/Create
- src/components/workflow/renderFormattedContent.tsx (delete)
- src/lib/workflow-content.ts (modify - remove old types)

## Implementation Details

### Delete renderFormattedContent.tsx
No longer needed - blocks are atomic, no string parsing required.

### Clean up workflow-content.ts
- Remove old `ContentBlock` type
- Keep only the new `Block` type
- Verify no `content: string` patterns remain on container blocks

## Verification
- `pnpm build` passes (no unused imports, no type errors)
- `/my-claude-code-workflow` renders correctly
- No console errors about missing types or functions
