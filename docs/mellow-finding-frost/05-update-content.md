---
task: 05-update-content
status: done
depends: []
files:
  - path: src/lib/workflow-content.ts
    action: modify
---

# Update Content

## Context
Content restructuring: merge "scene" into discussion, add handoff section, update subtitle.

## Files to Modify/Create
- src/lib/workflow-content.ts (modify)

## Implementation Details

### Add TL;DR Summary
Add a `summary` field to the `tldr` object:
```typescript
tldr: {
  summary: "Seven phases from idea to shipped code. Claude asks questions until it understands, writes an exhaustive plan, then sub-agents execute in parallel while you context-switch to other work. Fresh reviewers catch what the implementers missed.",
  blocks: [...] // delete this - no longer rendered
},
```

### Update Intro Subtitle (line 56)
Change from:
```typescript
subtitle: "Discussion → Plan → Review → Best-idea → Improve → Implement → Code-review",
```
To:
```typescript
subtitle: "Discussion → Handoff → Review → Best-idea → Improve → Implement → Code-review",
```

### Merge "Scene" into Discussion
The "scene" phase (id: 'scene', title: 'The Scene Opens') content should be merged into the beginning of the "discussion" phase as intro text. Then remove the separate scene phase entry.

### Add Handoff Section
Add a new phase after discussion with id `handoff`:
```typescript
{
  id: 'handoff',
  title: 'Handoff',
  description: 'Break large plans into agent-sized task files',
  blocks: [
    {
      type: 'kevin',
      blocks: [
        { type: 'p', content: 'Once Claude runs out of questions, I switch to plan mode. Instead of accepting the plan to begin implementation I run:' },
        { type: 'p', content: '`/handoff`' },
        { type: 'p', content: 'This creates a folder in `docs/`, splitting up the plan into task files scoped for smaller agents like Sonnet *(faster, cheaper, and they don\'t need the whole picture)*, plus a README with the high-level view.' },
      ],
    },
  ],
},
```

### Add Descriptions to All Phases
Add `description` field to `WorkflowPhase` interface and each phase:
```typescript
// In WorkflowPhase interface
description?: string;

// Phase descriptions:
// discussion: 'Claude asks questions one at a time until ready to plan'
// handoff: 'Break large plans into agent-sized task files'
// review: 'Fresh context reviews plan for gaps'
// best-idea: 'Research alternatives when uncertain'
// improve: 'Simplify, strengthen, "wouldn\'t it be cool if"'
// implement: 'Sub-agents execute in parallel'
// code-review: 'Fresh context reviews commits'
```

### Note
The TL;DR table content can be deleted since it's no longer rendered - the component now uses inline content from the phases array.

## Verification
1. Run `pnpm dev`
2. Visit `/my-claude-code-workflow`
3. Pipeline subtitle should show "Discussion → Handoff → ..."
4. Discussion section should include the former "scene" intro content
5. Handoff section should appear between Discussion and Review
6. Navigation should show 7 phases (no separate "scene" or "plan")
