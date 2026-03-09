---
task: 00b-delete-variants
status: done
depends: [00-design-system]
files:
  - path: src/app/my-claude-code-workflow/1/
    action: delete
  - path: src/app/my-claude-code-workflow/2/
    action: delete
  - path: src/app/my-claude-code-workflow/3/
    action: delete
  - path: src/app/my-claude-code-workflow/4/
    action: delete
  - path: src/app/my-claude-code-workflow/5/
    action: delete
  - path: src/components/workflow/Variant5Content.tsx
    action: delete
---

# Delete Variant Pages

## Context
Variant pages were experiments. Variant 2's design is now codified in the design system. Delete all variants to simplify migration scope.

## Files to Delete
- src/app/my-claude-code-workflow/1/ (entire directory)
- src/app/my-claude-code-workflow/2/ (entire directory)
- src/app/my-claude-code-workflow/3/ (entire directory)
- src/app/my-claude-code-workflow/4/ (entire directory)
- src/app/my-claude-code-workflow/5/ (entire directory)
- src/components/workflow/Variant5Content.tsx

## Implementation Details

```bash
rm -rf src/app/my-claude-code-workflow/1
rm -rf src/app/my-claude-code-workflow/2
rm -rf src/app/my-claude-code-workflow/3
rm -rf src/app/my-claude-code-workflow/4
rm -rf src/app/my-claude-code-workflow/5
rm src/components/workflow/Variant5Content.tsx
```

## Verification
- `pnpm build` passes (no broken imports)
- Only `/my-claude-code-workflow` route exists (no /1, /2, etc.)
- No orphaned component files
