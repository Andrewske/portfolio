---
task: 05-content-integration
status: done
depends: [02-core-chat-components, 03-narrator-components, 04-ui-components]
files:
  - path: src/lib/workflow-content.ts
    action: modify
  - path: src/app/my-claude-code-workflow/page.tsx
    action: modify
---

# Content Types & Page Integration

## Context
Final integration step. Extend the ContentBlock type system to support all new component types, then wire up the page to render blocks by type.

## Files to Modify
- `src/lib/workflow-content.ts` (modify - extend types)
- `src/app/my-claude-code-workflow/page.tsx` (modify - render components)

## Implementation Details

### workflow-content.ts

Extend the `ContentBlock` discriminated union:

```tsx
export type ContentBlock =
  | { type: 'placeholder'; label: string }
  | { type: 'text'; content: string }
  | { type: 'chat'; speaker: 'hammond' | 'claude'; content: string; id?: string }
  | { type: 'kevin'; content: string; whatBreaks?: string; id?: string }
  | { type: 'timeskip'; content: string }
  | { type: 'finding'; severity: 'critical' | 'high' | 'medium' | 'low'; title: string; confidence: number; content: string }
  | { type: 'collapsible'; title: string; content: string }
  | { type: 'phase'; phase: string }
  | { type: 'code'; language: string; content: string; title?: string };
```

**Notes:**
- `chat`: Optional `id` field enables anchor links (e.g., `/workflow#spared-no-expense`)
- `kevin`: Optional `id` field for anchor links to narrator commentary
- `code`: Uses existing `CodeBlock` component from `~/components/ui/CodeBlock` (supports typescript, python, sql)
- **Tight spacing**: CSS adjacent sibling selector handles consecutive chat messages (no chatGroup needed)
- **Findings**: Nest Finding components inside chat blocks as children (no findingsList type needed)
- **Content is plain text**: Rich formatting (markdown) intentionally deferred

### page.tsx

Create a block renderer function:

```tsx
function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'chat':
      return <ChatMessage key={index} id={block.id} speaker={block.speaker}>{block.content}</ChatMessage>;
    case 'kevin':
      return <KevinCallout key={index} id={block.id} whatBreaks={block.whatBreaks}>{block.content}</KevinCallout>;
    case 'timeskip':
      return <TimeSkip key={index}>{block.content}</TimeSkip>;
    case 'finding':
      return (
        <Finding key={index} severity={block.severity} title={block.title} confidence={block.confidence}>
          {block.content}
        </Finding>
      );
    case 'collapsible':
      return <CollapsiblePrompt key={index} title={block.title}>{block.content}</CollapsiblePrompt>;
    case 'phase':
      return <PhaseLabel key={index} phase={block.phase} />;
    case 'placeholder':
      return <PlaceholderBlock key={index} label={block.label} />;
    case 'text':
      return <p key={index} className="text-gray-300">{block.content}</p>;
    case 'code':
      return <CodeBlock key={index} code={block.content} language={block.language} title={block.title ?? block.language} />;
    default:
      // TypeScript exhaustiveness check - will error if a type is unhandled
      const _exhaustive: never = block;
      return null;
  }
}
```

**Import all components at top of page.tsx:**
```tsx
// Workflow components (consider barrel export: ~/components/workflow)
import ChatMessage from '~/components/workflow/ChatMessage';
import Finding from '~/components/workflow/Finding';
import KevinCallout from '~/components/workflow/KevinCallout';
import PhaseLabel from '~/components/workflow/PhaseLabel';
import TimeSkip from '~/components/workflow/TimeSkip';
import CollapsiblePrompt from '~/components/workflow/CollapsiblePrompt';
// Existing UI component
import { CodeBlock } from '~/components/ui/CodeBlock';
```

**Optional: Create barrel export** at `src/components/workflow/index.ts`:
```tsx
export { default as ChatMessage } from './ChatMessage';
export { default as Finding } from './Finding';
export { default as KevinCallout } from './KevinCallout';
export { default as PhaseLabel } from './PhaseLabel';
export { default as TimeSkip } from './TimeSkip';
export { default as CollapsiblePrompt } from './CollapsiblePrompt';
```

**Update phase rendering:**
```tsx
{phases.map((phase) => (
  <WorkflowSection key={phase.id} id={phase.id} title={phase.title}>
    {/* space-y-4 provides default spacing between blocks */}
    {/* chatGroup uses internal space-y-2 for tighter exchanges */}
    <div className="p-4 sm:p-6 space-y-4">
      {phase.blocks.map((block, index) => renderBlock(block, index))}
    </div>
  </WorkflowSection>
))}
```

## Verification
1. Run `pnpm dev`
2. Navigate to `/my-claude-code-workflow`
3. Verify all block types render correctly
4. Verify animations trigger on scroll/load
5. Test anchor links (e.g., `/my-claude-code-workflow#spared-no-expense`)
6. Test responsive layout on mobile

## Sample Content (pre-populate for development)

```tsx
phases: [
  {
    id: "discussion",
    title: "Phase 1: Discussion",
    blocks: [
      { type: 'phase', phase: 'DISCUSSION' },
      { type: 'chat', speaker: 'hammond', content: "I want to build a theme park. With dinosaurs.", id: 'opening' },
      { type: 'chat', speaker: 'claude', content: "Interesting. What's your timeline and budget?" },
      { type: 'chat', speaker: 'hammond', content: "Spared no expense.", id: 'spared-no-expense' },
      { type: 'kevin', content: "This is where most projects go wrong. The client has a vision but hasn't thought through the implementation details.", whatBreaks: "Claude accepts vague requirements without pushing back" },
      { type: 'chat', speaker: 'claude', content: "Let me ask some clarifying questions about containment protocols..." },
      { type: 'timeskip', content: 'The discussion continued for another forty-five minutes, covering power redundancy, veterinary facilities, and why one IT employee had access to every critical system.' },
    ]
  },
  {
    id: "planning",
    title: "Phase 2: Planning",
    blocks: [
      { type: 'phase', phase: 'PLANNING' },
      { type: 'chat', speaker: 'hammond', content: "So what's your plan?" },
      { type: 'chat', speaker: 'claude', content: "I'll create a detailed implementation plan covering infrastructure, containment, and visitor safety..." },
      { type: 'collapsible', title: 'Full Planning Prompt', content: 'You are a theme park architect specializing in prehistoric attractions...' },
    ]
  },
  // ... other phases with placeholder blocks
]
```
