---
description: Generate implementation-ready task files from a Claude Code plan
---

## When to Use

Use this command when:
- You have a plan in `.claude/plans/` ready for implementation
- You want to hand off to another AI instance (Sonnet, OpenCode, etc.)
- You want a historical record of what was planned

**Workflow:** Plan → `/handoff` → `/clear` → `/plan-review` → `/clear` → `/start-implementation`

---

You are a plan distribution orchestrator. Transform the current plan file into an implementation-ready task sequence.

## EXECUTION SEQUENCE

### Phase 1: Locate & Validate Plan
1. Identify current plan file in `.claude/plans/` (extract from context or system state)
2. Read plan content in full
3. Extract plan file name without extension (e.g., `buzzing-wibbling-wirth` from `buzzing-wibbling-wirth.md`)
4. Verify plan is non-empty and properly formatted

**Abort if:** No active plan found or plan file is empty

### Phase 2: Prepare Target Directory
1. Set target directory to `./docs/{plan-name}/`
2. Create the target directory structure
3. Check if target directory already exists:
   - If exists: Ask user to confirm overwrite or abort
   - If new: Proceed

### Phase 3: Semantic Task Parsing
Parse the plan using **semantic grouping logic**:

**Grouping Criteria:**
- Group tasks that modify the same file(s) together
- Group tasks with shared domain context (e.g., "authentication flow" tasks stay together even if touching different files)
- Respect natural implementation order (foundational tasks before dependent tasks)
- Each group = one numbered markdown file

**Detection Method:**
- Analyze file paths mentioned in task descriptions
- Identify conceptual clusters (authentication, UI components, API endpoints, testing, etc.)
- Maintain dependency order from original plan

**Task Boundary Signals:**
- Shift to different file set
- Change in functional domain
- Explicit phase markers in original plan

### Phase 4: Generate Numbered Task Files
For each semantic task group:

1. **Generate filename:**
   - Format: `{NN}-{task-name}.md`
   - NN = zero-padded sequence (01, 02, 03...)
   - task-name = kebab-case extracted from task title/description
   - Example: `01-implement-auth-middleware.md`

2. **File content structure (with YAML frontmatter):**
   ```markdown
   ---
   task: {NN}-{task-name}
   status: pending
   depends: [{list of task IDs this depends on, e.g., 01-setup-auth}]
   files:
     - path: path/to/file1.ts
       action: modify
     - path: path/to/file2.ts
       action: create
   ---

   # {Task Title}

   ## Context
   {1-2 sentences: what problem this solves, where it fits in the bigger picture}

   ## Files to Modify/Create
   - path/to/file1.ts (modify)
   - path/to/file2.ts (new)

   ## Implementation Details
   {Extracted task description and requirements}

   ## Verification
   {How to test THIS task specifically - commands to run, expected output}
   ```

   **YAML frontmatter fields:**
   - `task`: The task identifier (matches filename without .md)
   - `status`: Always `pending` initially (orchestrator updates to `running`/`done`/`failed`)
   - `depends`: Array of task IDs that must complete before this one (empty array `[]` if no deps)
   - `files`: List of files with path and action (create/modify/delete)

3. Write file to `./docs/{plan-name}/{NN}-{task-name}.md`

### Phase 5: Generate README.md & Complete
Create `./docs/{plan-name}/README.md`:

```markdown
# {Plan Name}

## Overview
{What is being built and why - extracted from original plan}

## Task Sequence
1. [01-{task-name}.md](./01-{task-name}.md) - {Brief description}
2. [02-{task-name}.md](./02-{task-name}.md) - {Brief description}
...

## Success Criteria
{End-to-end verification: how to confirm the entire implementation worked}

## Dependencies
{External dependencies, prerequisites, or setup requirements}
```

**After writing all files:**
1. List all created files with count
2. Verify numbering is sequential
3. Output summary:
   ```
   ✓ Plan distributed to ./docs/{plan-name}/
   ✓ {N} task files + README.md created

   Ready for implementation:
   → docs/{plan-name}/README.md

   Next steps:
   1. Run /clear
   2. Run /plan-review docs/{plan-name}/
   ```

## ERROR HANDLING

- **No plan file:** "No active plan found. Create a plan first before distribution."
- **Target directory exists:** Ask user to confirm overwrite or abort
- **Empty plan sections:** Flag warning but continue with available content

## CONSTRAINTS

- Never modify the original plan file in `.claude/plans/`
- Preserve all technical details from original plan
- Maintain implementation order strictly
- Use absolute minimum of task files while keeping logical coherence
- Always include YAML frontmatter with depends array (even if empty)
