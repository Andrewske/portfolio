---
description: Show status of all plans and manage plan lifecycle
argument-hint: [archive <plan-name>]
---

# Plans Status

Display the status of all plans and their implementation progress.

## Usage

- `/plans` - Show status of all plans
- `/plans archive <plan-name>` - Archive a completed plan

## Execution

### 1. Scan Plans Directory

Read all `.md` files in `.claude/plans/` (excluding archive folder).

For each plan file, determine status:

**Status Detection:**
- **Planning**: Plan file exists, no `docs/{plan-name}/` folder
- **Ready**: `docs/{plan-name}/` exists (handoff complete), no `progress.md`
- **In Progress**: `docs/{plan-name}/progress.md` exists with incomplete tasks
- **Complete**: `progress.md` shows all tasks done (ready for `/cleanup`)
- **Archived**: Plan is in `.claude/plans/archive/` (moved by `/cleanup`)

### 2. Gather Progress Info

For plans with `docs/{plan-name}/`:
- Count task files (files matching `[0-9][0-9]-*.md`)
- If `progress.md` exists, parse completion status
- Calculate progress percentage

### 3. Display Table

```
## Plans

| Plan | Status | Created | Tasks | Progress |
|------|--------|---------|-------|----------|
| auth-system | Complete | 2026-02-10 | 5/5 | 100% |
| api-refactor | In Progress | 2026-02-12 | 2/4 | 50% |
| new-feature | Planning | 2026-02-13 | - | - |
| database-migration | Ready | 2026-02-13 | 0/3 | 0% |

**Archived plans:** 3 (run `/plans --archived` to view)
```

### 4. Archive Subcommand

If argument is `archive <plan-name>`:

1. Verify plan exists and is Complete
2. Create `.claude/plans/archive/` if needed
3. Move plan file to archive folder
4. Move `docs/{plan-name}/` to `docs/archive/{plan-name}/`
5. Confirm: "Archived {plan-name}. View with `/plans --archived`"

If plan is not Complete, warn:
"Plan {plan-name} is not complete ({status}). Archive anyway? (y/n)"

## Output Format

Use markdown table for clean display. Include:
- Color hints in status column (use emoji as fallback):
  - Planning: 📋
  - Ready: ⏳
  - In Progress: 🔄
  - Complete: ✅
  - Archived: 📦

## Error Handling

- No plans found: "No plans in `.claude/plans/`. Create one with `/plan` or plan mode."
- Archive target not found: "Plan '{name}' not found. Available plans: {list}"
