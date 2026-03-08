---
description: Orchestrate parallel implementation of plan tasks via sub-agents
argument-hint: <docs/plan-name/> [--resume]
allowed-tools: Task, Read, Write, Edit, Glob, Bash
---

# Implementation Orchestrator

Coordinate parallel Sonnet sub-agents to implement a distributed plan. Each task runs in its own agent, respecting dependencies.

## Arguments

- `<path>`: Path to docs/{plan-name}/ folder (required)
- `--resume`: Continue from last failure point

## Execution Flow

### Phase 1: Load & Parse Tasks

1. Verify path exists and contains task files
2. Read `README.md` to understand overall plan
3. For each `[0-9][0-9]-*.md` file:
   - Parse YAML frontmatter for `task`, `depends`, `files`
   - Build task object: `{id, name, depends: [], files: [], content}`

**Expected YAML format:**
```yaml
---
task: 01-setup-auth
status: pending
depends: []
files:
  - path: src/auth.ts
    action: create
---
```

**Status values:** `pending` | `running` | `done` | `failed`

### Phase 2: Build Dependency Graph

1. Create adjacency list from `depends` arrays
2. Validate: no circular dependencies, all deps exist
3. Compute execution batches (tasks that can run in parallel):
   ```
   Batch 1: [01-setup, 02-config] (no deps)
   Batch 2: [03-routes, 04-middleware] (deps on batch 1)
   Batch 3: [05-tests] (deps on batch 2)
   ```

### Phase 2.5: Initialize Progress File

Create/update `{path}/progress.md`:

```markdown
# Implementation Progress

**Plan:** {plan-name}
**Started:** {ISO timestamp}
**Model:** Sonnet

## Status

| Task | Status | Started | Completed | Duration |
|------|--------|---------|-----------|----------|
| 01-setup-auth | Pending | - | - | - |
| 02-add-config | Pending | - | - | - |
...

## Execution Log

### Batch 1
- Started: {timestamp}
- Tasks: 01-setup-auth, 02-add-config

[Log entries will be appended here]
```

### Phase 3: Execute Batches

For each batch:

1. **Update progress**: Mark batch tasks as "Running"

2. **Spawn parallel task-implementer agents** using Task tool:
   ```
   For each task in batch, spawn:
   Task(
     subagent_type: "task-implementer",
     model: "sonnet",
     prompt: "Implement task: {path}/{task-file}"
   )
   ```

3. **Wait for batch completion**: All agents in batch must finish

4. **Update progress** (both progress.md AND task files):
   - Success: Update task YAML `status: done`, mark progress.md as "✅ Done"
   - Failure: Update task YAML `status: failed`, mark progress.md as "❌ Failed", stop

5. **Continue or halt**:
   - All success → next batch
   - Any failure → stop, show resume instructions

### Phase 4: Completion or Failure

**On Success:**
```
✅ Implementation complete!

All {N} tasks completed successfully.
Total duration: {time}

Progress: {path}/progress.md

Next steps:
1. Run /clear
2. Run /code-review
```

**On Failure:**
```
❌ Implementation stopped

✅ Completed: 01-setup-auth, 02-add-config
❌ Failed: 03-create-routes
   Error: {error message}
⏸ Pending: 04-add-tests, 05-update-docs

Run: /start-implementation {path} --resume
```

### --resume Handling

When `--resume` is passed:

1. Read existing `progress.md`
2. Find last failed/pending task
3. Build new batch sequence starting from failure point
4. Skip already-completed tasks
5. Continue execution from there

## Dependency Graph Algorithm

```
function computeBatches(tasks):
  completed = set()
  batches = []
  remaining = set(all task ids)

  while remaining:
    batch = []
    for task in remaining:
      if all deps in completed:
        batch.append(task)

    if batch is empty and remaining not empty:
      ERROR: circular dependency detected

    batches.append(batch)
    completed.update(batch)
    remaining -= batch

  return batches
```

## Error Handling

- **Invalid path**: "Path not found: {path}. Run /handoff first to create task files."
- **No task files**: "No task files found in {path}. Expected files like 01-task-name.md"
- **Missing YAML**: "Task {file} missing YAML frontmatter. Regenerate with /handoff."
- **Circular deps**: "Circular dependency detected: {task1} ↔ {task2}"
- **Agent failure**: Log error, mark failed, provide resume instructions

## Constraints

- Only modify task file YAML frontmatter (status field) - never change content
- Always commit after each successful task (atomic units)
- Stop on first failure (don't continue to independent tasks)
- Log everything to progress.md for auditability
- Update task file status for human-readable progress
