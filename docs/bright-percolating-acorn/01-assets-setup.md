---
task: 01-assets-setup
status: skipped
depends: []
files: []
---

# Assets Setup (SKIPPED)

**This task has been removed.** Avatar logic is now inlined in ChatMessage component using CSS placeholders. See `02-core-chat-components.md`.

---

## Original Plan (for reference)

## Context
Create the image directory and placeholder assets for the ChatMessage avatars. Hammond (human) and Claude (AI) need distinct visual identifiers for the conversation UI.

## Files to Create
- `public/images/workflow/` (directory)
- `public/images/workflow/hammond.jpg` (placeholder - user will provide final)
- `public/images/workflow/claude.svg` (Anthropic/Claude logo)

## Implementation Details

1. Create directory structure:
   ```bash
   mkdir -p public/images/workflow
   ```

2. **CSS-only placeholders** (no image files needed initially):
   - Use colored circles with initials until real assets are provided
   - Hammond: Gray circle with "H" initial
   - Claude: Purple/violet circle with "C" initial
   - Real images can be dropped in later at `/images/workflow/hammond.jpg` and `/images/workflow/claude.svg`

3. Update ChatMessage component to handle both CSS placeholders and real images:
   - Check if image file exists, fall back to CSS placeholder
   - Or: Always use CSS placeholders for MVP, swap later

**Avatar specs:**
- Size: 32x32px display size (w-8 h-8)
- Placeholder: `rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold`
- Alt text: "Hammond" and "Claude" respectively for accessibility

## Verification
1. Confirm directory exists: `ls public/images/workflow/`
2. CSS placeholders render correctly (colored circles with initials)
3. Alt text present on avatar elements for screen readers
