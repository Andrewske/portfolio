---
task: 02-create-block-renderer
status: pending
depends: [01-define-block-types]
files:
  - path: src/components/workflow/BlockRenderer.tsx
    action: create
---

# Create Recursive Block Renderer

## Context
Central rendering function that handles all block types. Containers call this recursively to render their nested blocks. This replaces the ad-hoc rendering in WorkflowPageClient.tsx.

## Files to Modify/Create
- src/components/workflow/BlockRenderer.tsx (new)

## Implementation Details

Create a `renderBlock(block: Block, index: number): ReactElement` function:

```tsx
export function renderBlock(block: Block, index: number): ReactElement | null {
  switch (block.type) {
    // Primitives
    case 'p':
      return <p key={index} className="text-gray-300 text-sm leading-snug">{parseInlineMarkdown(block.content)}</p>;
    case 'h2':
      return <h2 key={index} className="text-sm font-bold text-white mt-4 mb-1">{block.content}</h2>;
    case 'h3':
      return <h3 key={index} className="text-sm font-bold text-gray-200 mt-3 mb-1">{block.content}</h3>;
    case 'divider':
      return <div key={index} className="text-gray-500 text-sm my-1">---</div>;
    // ... etc

    // Containers - recursive
    case 'chat':
      return <ChatMessage key={index} speaker={block.speaker}>{renderBlocks(block.blocks)}</ChatMessage>;
    case 'kevin':
      return <div key={index} className="space-y-2">{renderBlocks(block.blocks)}</div>;
    // ... etc
  }
}

// Exhaustiveness helper - TypeScript errors if a block type is unhandled
function assertNever(x: never): never {
  throw new Error(`Unhandled block type: ${JSON.stringify(x)}`);
}

// Centralized dinoOnly filtering - single source of truth
export function renderBlocks(blocks: Block[], noDinos: boolean = false): ReactElement {
  const filtered = noDinos ? blocks.filter(b => !b.dinoOnly) : blocks;
  return <>{filtered.map((block, i) => renderBlock(block, i))}</>;
}
```

### Block type to component mapping:
- `p` → `<p>` with parseInlineMarkdown
- `h2`, `h3` → headings with appropriate styles
- `divider` → styled `───` characters
- `image` → `<MemeImage>`
- `code` → `<CodeBlock>`
- `quote` → `<blockquote>`
- `list` → `<div>` with mapped items (ordered/unordered)
- `option` → inline render (title + pros/cons as `<ul>`, no separate component)
- `recommendation` → `<p className="text-green-bright font-semibold">Recommended: {content} ({confidence}% confidence)</p>`
- `raw` → `<div dangerouslySetInnerHTML>` (for migration, use sparingly)
- `chat` → `<ChatMessage>` wrapping recursive blocks
- `finding` → `<Finding>` wrapping recursive blocks
- `kevin` → plain `<div className="space-y-2">` wrapping recursive blocks
- `timeskip` → `<TimeSkip>`
- `collapsible` → `<CollapsiblePrompt>` wrapping recursive blocks
- `table` → `<WorkflowTable>`
- `default` → `assertNever(block)` for exhaustiveness check

## Verification
- Import and use in a test component
- Render a simple block array: `[{ type: 'p', content: 'test' }]`
- Render nested: `{ type: 'kevin', blocks: [{ type: 'p', content: 'test' }] }`
