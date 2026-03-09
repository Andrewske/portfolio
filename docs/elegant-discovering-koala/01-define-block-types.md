---
task: 01-define-block-types
status: pending
depends: [00b-delete-variants]
files:
  - path: src/lib/workflow-content.ts
    action: modify
---

# Define New Block Type System

## Context
Foundation for the entire block system rebuild. Creates the TypeScript types that define all primitives, compounds, and containers. Old types are kept temporarily for gradual migration.

## Files to Modify/Create
- src/lib/workflow-content.ts (modify)

## Implementation Details

Define a new `Block` union type with three tiers:

### Base properties (all blocks)
```ts
// All blocks can have these optional properties:
// - dinoOnly?: boolean (show only in dino mode)
// - id?: string (for deep linking)
```

### Primitives (single HTML elements)
```ts
| { type: 'p'; content: string }
| { type: 'h2'; content: string }
| { type: 'h3'; content: string }
| { type: 'divider' }
| { type: 'image'; src: StaticImageData; alt: string }
| { type: 'code'; language: string; content: string; title?: string }
| { type: 'quote'; content: string }
| { type: 'timeskip'; content: string }
| { type: 'raw'; content: string }  // Pre-rendered HTML, useful during migration
```

### Compound blocks (multiple elements, semantic structure)
```ts
| { type: 'list'; items: string[]; ordered?: boolean; dinoOnly?: boolean }
| { type: 'option'; number: number; title: string; pros?: string[]; cons?: string[]; dinoOnly?: boolean }
| { type: 'recommendation'; content: string; confidence?: number; dinoOnly?: boolean }
```

### Containers (wrap nested blocks)
```ts
| { type: 'chat'; speaker: 'hammond' | 'claude'; blocks: Block[]; id?: string; dinoOnly?: boolean }
| { type: 'finding'; severity: 'critical' | 'high' | 'medium' | 'low'; title: string; confidence?: number; blocks: Block[]; dinoOnly?: boolean }
| { type: 'kevin'; blocks: Block[]; id?: string; dinoOnly?: boolean }
| { type: 'collapsible'; title: string; blocks: Block[]; dinoOnly?: boolean }
```

### Structural
```ts
| { type: 'table'; headers: string[]; rows: string[][] }
```

Note: `phase` type removed - phases are rendered via section headers, not as blocks.

**Important:** Keep the old `ContentBlock` type and rename the new one to `Block`. Export both so migration can happen incrementally.

## Verification
- `pnpm build` passes with no type errors
- Old content still renders (using old types)
- New `Block` type is exported and available for use
