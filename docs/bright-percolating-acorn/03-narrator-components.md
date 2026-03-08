---
task: 03-narrator-components
status: done
depends: []
files:
  - path: src/components/workflow/KevinCallout.tsx
    action: create
  - path: src/components/workflow/TimeSkip.tsx
    action: create
---

# Narrator Components

## Context
These components break the fourth wall - Kevin's commentary on the workflow and time skip indicators for story flow. They visually distinguish from the Hammond/Claude dialogue.

## Files to Create
- `src/components/workflow/KevinCallout.tsx` (new)
- `src/components/workflow/TimeSkip.tsx` (new)

## Implementation Details

### KevinCallout.tsx

```tsx
interface KevinCalloutProps {
  children: ReactNode;
  whatBreaks?: string;
  id?: string; // For anchor links
}
```

**Design:**
- Narrator box style, distinct from chat
- Amber/orange border to contrast green terminal theme

**Styling:**
- Container: `border-l-4 border-amber-500/50 bg-amber-500/5 rounded-r-lg p-4 space-y-3 animate-in fade-in slide-in-from-left-2 duration-300`
- Header: `[KEVIN]` label in `text-amber-400 text-xs font-mono uppercase tracking-wider`
- Content: `text-gray-300 text-sm`
- Add `data-testid="kevin-callout"` for testing

**"What breaks" section (if whatBreaks prop provided):**
- Nested warning box: `bg-gray-900/50 border border-gray-800 rounded-lg p-3 mt-3`
- Warning icon: `⚠️` emoji or warning SVG
- Header: "What breaks without it:" in `text-gray-500 text-xs`
- Content: `text-gray-400 text-sm italic`

### TimeSkip.tsx

```tsx
interface TimeSkipProps {
  children: ReactNode;
}
```

**Design:**
- Faded, italic, centered
- Visual break in conversation flow

**Styling:**
- Container: `py-6 text-center animate-in fade-in duration-500`
- Horizontal rules: `border-t border-gray-800` above and below (or use pseudo-elements)
- Text: `text-gray-500 text-sm italic`
- Add `data-testid="time-skip"` for testing

**Example content:**
> "The discussion continued for another forty-five minutes, covering power redundancy, veterinary facilities, guest evacuation routes, and why one IT employee had access to every critical system."

## Verification
1. Render KevinCallout with and without whatBreaks prop:
   ```tsx
   <KevinCallout>Commentary text here</KevinCallout>
   <KevinCallout whatBreaks="Claude makes assumptions">With warning</KevinCallout>
   ```
2. Verify amber border contrasts with green terminal theme
3. Verify warning section appears only when whatBreaks is provided
4. Render TimeSkip and verify faded/centered appearance
