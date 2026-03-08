---
task: 04-ui-components
status: done
depends: []
files:
  - path: src/components/ui/badge.tsx
    action: modify
  - path: src/components/workflow/PhaseLabel.tsx
    action: create
  - path: src/components/workflow/CollapsiblePrompt.tsx
    action: create
---

# UI Components

## Context
Supporting UI elements for navigation and content organization. PhaseLabel provides sticky phase indicators as you scroll. CollapsiblePrompt hides full prompt text behind expandable sections.

## Files to Create
- `src/components/workflow/PhaseLabel.tsx` (new)
- `src/components/workflow/CollapsiblePrompt.tsx` (new)

## Implementation Details

### PhaseLabel.tsx

```tsx
interface PhaseLabelProps {
  phase: string; // e.g., "DISCUSSION", "PLAN-REVIEW"
}
```

**Design:**
- Uses existing Badge component with new `phase` variant
- Block-level sticky wrapper for predictable flow

**Implementation:**
1. Add `phase` variant to `src/components/ui/badge.tsx`:
   ```tsx
   phase: "border-green-500/30 bg-green-500/20 text-green-400",
   ```

2. PhaseLabel component:
   ```tsx
   import { Badge } from '~/components/ui/badge';

   export default function PhaseLabel({ phase }: PhaseLabelProps) {
     return (
       <div className="sticky top-4 z-10" data-testid="phase-label">
         <Badge variant="phase" className="text-xs font-mono uppercase tracking-wider">
           {phase}
         </Badge>
       </div>
     );
   }
   ```

**Usage note:**
- Block wrapper ensures predictable document flow
- Sticky works within parent section bounds
- Add `data-testid="phase-label"` for testing

### CollapsiblePrompt.tsx

```tsx
interface CollapsiblePromptProps {
  title: string; // e.g., "Full planning prompt"
  children: ReactNode;
}
```

**Design:**
- Native `<details>/<summary>` for accessibility
- Terminal-styled summary button
- Monospace content area

**Styling:**
- Details container: `border border-gray-800 rounded-lg overflow-hidden`
- Summary: `px-4 py-3 bg-gray-900/50 cursor-pointer text-gray-400 text-sm font-mono hover:bg-gray-900/70 transition-colors`
  - Add disclosure triangle or custom icon
  - Text: "▶ {title}" when closed, "▼ {title}" when open (CSS handles this)
- Content: `p-4 bg-gray-950 font-mono text-sm text-gray-300 whitespace-pre-wrap`

**Accessibility:**
- Use native `<details>` element for keyboard support
- Summary should be focusable and toggleable with Enter/Space
- Add `data-testid="collapsible-prompt"` for testing

## Verification
1. Render PhaseLabel inside a scrollable container:
   ```tsx
   <div className="relative h-[200vh]">
     <PhaseLabel phase="DISCUSSION" />
     <p>Long content here...</p>
   </div>
   ```
2. Scroll and verify label stays sticky at top
3. Render CollapsiblePrompt and test expand/collapse:
   ```tsx
   <CollapsiblePrompt title="Full planning prompt">
     Prompt content here...
   </CollapsiblePrompt>
   ```
4. Verify keyboard accessibility (Tab to focus, Enter to toggle)
