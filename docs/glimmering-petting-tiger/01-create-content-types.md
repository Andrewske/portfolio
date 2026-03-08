---
task: 01-create-content-types
status: done
depends: []
files:
  - path: src/lib/workflow-content.ts
    action: create
---

# Create Content Types & Placeholder Data

## Context
Define TypeScript types for the structured workflow content and create placeholder data. This foundational file establishes the data shape that components will consume.

## Files to Modify/Create
- `src/lib/workflow-content.ts` (new)

## Implementation Details

Create type definitions for:
- `WorkflowPhase` - individual phase (Discussion, Planning, etc.)
- `WorkflowContent` - top-level content structure

Type definitions:
```typescript
// Discriminated union for content blocks - extend as content types are needed
export type ContentBlock =
  | { type: 'placeholder'; label: string }
  | { type: 'text'; content: string };
  // Future types: 'command' | 'finding' | 'callout' | 'scene'

export interface WorkflowPhase {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface WorkflowContent {
  intro: {
    title: string;
    subtitle: string;
    hook?: string;
  };
  phases: WorkflowPhase[];
  outro: {
    blocks: ContentBlock[];
  };
}
```

Placeholder content structure:
```typescript
export const workflowContent: WorkflowContent = {
  intro: {
    title: "My Claude Code Workflow",
    subtitle: "How I get Claude to write code I trust",
  },
  phases: [
    { id: "discussion", title: "Phase 1: Discussion", blocks: [] },
    { id: "planning", title: "Phase 2: Planning", blocks: [] },
    { id: "handoff", title: "Phase 3: Handoff", blocks: [] },
    { id: "review", title: "Phase 4: Plan Review", blocks: [] },
    { id: "best-idea", title: "Phase 5: Best Idea", blocks: [] },
    { id: "improve", title: "Phase 6: Improve Idea", blocks: [] },
    { id: "implement", title: "Phase 7: Implementation", blocks: [] },
    { id: "code-review", title: "Phase 8: Code Review", blocks: [] },
  ],
  outro: { blocks: [] }
};
```

Types use discriminated union pattern - extend ContentBlock union as new block types are needed (command blocks, findings, callouts, etc.).

## Verification
- `pnpm build` passes with no type errors
- Types are exported and importable
