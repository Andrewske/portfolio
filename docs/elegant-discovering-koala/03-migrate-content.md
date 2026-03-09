---
task: 03-migrate-content
status: done
depends: [01-define-block-types, 02-create-block-renderer]
files:
  - path: src/lib/workflow-content.ts
    action: modify
  - path: src/components/workflow/ChatMessage.tsx
    action: modify
  - path: src/components/workflow/Finding.tsx
    action: modify
---

# Migrate All Content to Block Format

## Context
Single pass through workflow-content.ts to convert all container blocks (kevin, chat, finding) from `content: string` to `blocks: Block[]`. Agent-assisted migration recommended due to semantic pattern recognition (options, recommendations).

## Files to Modify
- src/lib/workflow-content.ts (content migration)
- src/components/workflow/ChatMessage.tsx (interface change)
- src/components/workflow/Finding.tsx (interface change)

## Implementation Details

### Step 1: Update Component Interfaces

**ChatMessage.tsx** - Change from `children: ReactNode` to `blocks: Block[]`:
```tsx
interface ChatMessageProps {
  speaker: 'hammond' | 'claude';
  blocks: Block[];
  id?: string;
}

export default function ChatMessage({ speaker, blocks, id }: ChatMessageProps): ReactElement {
  return (
    <div id={id} data-chat data-testid="chat-message" className="relative">
      <ChatCharacterIcon speaker={speaker} />
      <div className="flex gap-3 items-start">
        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
          speaker === 'hammond' ? 'bg-amber-400' : 'bg-blue-400'
        }`} />
        <div className="font-mono text-sm text-text-body leading-snug space-y-2">
          {renderBlocks(blocks)}
        </div>
      </div>
    </div>
  );
}
```

**Finding.tsx** - Change from `content: string` to `blocks: Block[]`:
```tsx
interface FindingProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  confidence?: number;
  blocks: Block[];
}

export default function Finding({ severity, title, confidence, blocks }: FindingProps): ReactElement {
  return (
    <div data-testid="finding" className="space-y-1 font-mono text-sm">
      <div className="text-text-muted">---</div>
      <div className="text-text-primary font-semibold">
        Finding ({severity.toUpperCase()}): {title}{confidence ? ` (${confidence}% confidence)` : ''}
      </div>
      <div className="space-y-2 text-text-body leading-snug">
        {renderBlocks(blocks)}
      </div>
    </div>
  );
}
```

### Step 2: Migrate Content (Agent-Assisted)

Convert all container blocks in workflow-content.ts. Key patterns to recognize:

**Kevin blocks** - Split on `\n\n`, each paragraph becomes `{ type: 'p' }`:
```ts
// Before
{ type: 'kevin', content: 'Para one.\n\nPara two.' }

// After
{ type: 'kevin', blocks: [
  { type: 'p', content: 'Para one.' },
  { type: 'p', content: 'Para two.' },
]}
```

**Chat blocks** - Parse semantic structure:
```ts
// Recognize "Option N: Title" patterns → { type: 'option' }
// Recognize "- Pro:" and "- Con:" → pros/cons arrays
// Recognize "Recommended:" → { type: 'recommendation' }
// Everything else → { type: 'p' }
```

**Finding blocks** - Same patterns as chat, plus:
```ts
// Recognize "**Impact:**" sections
// Recognize severity/confidence from parent block
```

### Migration Notes
- Preserve inline markdown (backticks, bold) in content strings
- parseInlineMarkdown handles rendering at render time
- Keep `id` fields if present
- Use `{ type: 'raw', content: '...' }` for complex pre-formatted content that's hard to decompose

## Verification
- `pnpm build` passes
- All kevin sections render with correct paragraph breaks
- All chat messages show speaker dot and proper formatting
- Options inside chat/finding show pros/cons correctly
- Recommendations render with highlight styling
- Inline code (backticks) still renders correctly
