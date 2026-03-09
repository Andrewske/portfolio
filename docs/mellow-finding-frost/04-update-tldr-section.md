---
task: 04-update-tldr-section
status: pending
depends: [03-update-hero-section]
files:
  - path: src/components/workflow/WorkflowPageClient.tsx
    action: modify
---

# Update TL;DR Section

## Context
Replace the dense table-based TL;DR with a more readable format: prose intro paragraph followed by a bullet list of phases with descriptions.

## Files to Modify/Create
- src/components/workflow/WorkflowPageClient.tsx (modify)

## Implementation Details

### Replace TL;DR Section (lines 116-120)
Remove `renderBlockGroups(tldr.blocks)` and replace with structured content:

```tsx
{/* TL;DR Section */}
<div className="space-y-6 mb-12 sm:mb-16">
  <h2 className="text-xl sm:text-2xl font-bold text-[#7ee787]">TL;DR</h2>

  <p className="text-[#8b949e] text-base">
    {tldr.summary}
  </p>

  <div className="space-y-3 pt-2">
    {phases.map((phase) => (
      <div key={phase.id} className="flex gap-3">
        <span className="text-[#39d353] select-none">•</span>
        <p className="text-[#c9d1d9]">
          <span className="font-semibold text-[#7ee787]">{phase.name}</span>
          {' — '}
          {phase.description}
        </p>
      </div>
    ))}
  </div>
</div>
```

### Note
The `tldr.summary` field is added in task 05. The `tldr.blocks` table is no longer rendered and can be deleted.

## Verification
1. Run `pnpm dev`
2. Visit `/my-claude-code-workflow`
3. TL;DR section should show:
   - "TL;DR" heading in bright green
   - Prose intro paragraph in muted gray
   - 7 bullet points with phase names (bright green) and descriptions
4. No table should be visible
5. Content should be easily scannable on mobile
