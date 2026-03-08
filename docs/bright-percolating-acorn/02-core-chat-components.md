---
task: 02-core-chat-components
status: pending
depends: []
files:
  - path: src/components/workflow/ChatMessage.tsx
    action: create
  - path: src/components/workflow/Finding.tsx
    action: create
---

# Core Chat Components

## Context
These are the backbone components for the JP conversation. ChatMessage handles all dialogue between Hammond and Claude with avatar positioning. Finding renders severity-coded plan review findings inside Claude's messages.

## Files to Create
- `src/components/workflow/ChatMessage.tsx` (new)
- `src/components/workflow/Finding.tsx` (new)

## Implementation Details

### ChatMessage.tsx

```tsx
interface ChatMessageProps {
  speaker: 'hammond' | 'claude';
  children: ReactNode;
  id?: string; // For anchor links
}
```

**Layout:**
- Hammond: avatar (32px) on LEFT, message block on right
- Claude: message block on left, avatar (32px) on RIGHT
- Use flexbox with `flex-row` for Hammond, `flex-row-reverse` for Claude

**Styling:**
- Avatar: `w-8 h-8 rounded-full flex-shrink-0`
- Message block: `bg-gray-900/30 border border-gray-800 rounded-lg px-4 py-3 font-mono text-sm`
- Container: `flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-300`
- Add `data-chat` attribute for CSS adjacent sibling spacing
- Add `data-testid="chat-message"` for testing

**CSS for tight spacing** (add to component or globals.css):
```css
[data-chat] + [data-chat] {
  margin-top: 0.5rem; /* Tighter than parent space-y-4 */
}
```

**Avatar implementation (CSS placeholders):**
- Hammond: Gray circle (`bg-gray-600`) with "H" initial, `alt="Hammond"`
- Claude: Purple circle (`bg-violet-600`) with "C" initial, `alt="Claude"`
- Future: Can swap to real images at `/images/workflow/hammond.jpg` and `/images/workflow/claude.svg`

```tsx
// Avatar placeholder component
const Avatar = ({ speaker }: { speaker: 'hammond' | 'claude' }) => {
  const config = {
    hammond: { bg: 'bg-gray-600', initial: 'H', alt: 'Hammond' },
    claude: { bg: 'bg-violet-600', initial: 'C', alt: 'Claude' },
  };
  const { bg, initial, alt } = config[speaker];
  return (
    <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`} role="img" aria-label={alt}>
      {initial}
    </div>
  );
};

// ChatMessage container (simplified)
export default function ChatMessage({ speaker, children, id }: ChatMessageProps) {
  const direction = speaker === 'hammond' ? 'flex-row' : 'flex-row-reverse';
  return (
    <div
      id={id}
      data-chat
      data-testid="chat-message"
      className={`flex gap-3 items-start ${direction} animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <Avatar speaker={speaker} />
      <div className="bg-gray-900/30 border border-gray-800 rounded-lg px-4 py-3 font-mono text-sm">
        {children}
      </div>
    </div>
  );
}
```

### Finding.tsx

```tsx
interface FindingProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  confidence: number;
  children: ReactNode;
}
```

**Severity colors:**
- critical: `bg-red-500/20 text-red-400 border-red-500/30`
- high: `bg-orange-500/20 text-orange-400 border-orange-500/30`
- medium: `bg-yellow-500/20 text-yellow-400 border-yellow-500/30`
- low: `bg-blue-500/20 text-blue-400 border-blue-500/30`

**Layout:**
- Severity badge (uppercase, small): top-left
- Confidence badge: top-right (e.g., "95%")
- Title: bold, below badges
- Content (children): description text

**Styling:**
- Container: `border rounded-lg p-4 space-y-2 animate-in fade-in duration-200`
- Badge: `text-xs font-mono uppercase px-2 py-0.5 rounded`
- Add `data-testid="finding"` for testing
- **Standalone component**: Works inside ChatMessage or independently (e.g., in summaries)

## Verification
1. Import ChatMessage in page.tsx and render test dialogue:
   ```tsx
   <ChatMessage speaker="hammond">Test Hammond message</ChatMessage>
   <ChatMessage speaker="claude">Test Claude message</ChatMessage>
   ```
2. Verify avatars appear on correct sides (Hammond left, Claude right)
3. Test Finding inside ChatMessage:
   ```tsx
   <ChatMessage speaker="claude">
     <Finding severity="critical" title="Power systems" confidence={95}>
       Description here
     </Finding>
   </ChatMessage>
   ```
4. Verify severity colors match spec
