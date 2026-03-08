# Claude Code Export for Work Laptop

## Contents

```
skills/
  expert-skill-creator/  - Meta skill for creating new skills
  frontend-design/       - High-quality UI generation

commands/
  code-review.md         - Reviews last commit
  fix-typescript.md      - Strict typing enforcement
  reduce.md              - Find duplication/dead code
  refactor.md            - Targeted refactoring
  fix-tests.md           - Test debugging
  architecture-review.md - System-level analysis
  plans.md               - Plan management
  handoff.md             - Task handoff workflow
  start-implementation.md - Parallel task implementation
  plan-review.md         - Validates planning docs
  best-idea.md           - Compare solution approaches
  improve-idea.md        - Brainstorm before implementing
  simple.md              - Toggle concise response mode

hooks/
  bullet-summary.py      - Summarizes each conversation turn
```

## Installation

### 1. Copy files

```bash
cp -r skills/* ~/.claude/skills/
cp commands/* ~/.claude/commands/
cp hooks/* ~/.claude/hooks/
chmod +x ~/.claude/hooks/bullet-summary.py
```

### 2. Configure plugins in settings.json

Add to `~/.claude/settings.json`:

```json
{
  "enabledPlugins": {
    "episodic-memory@superpowers-marketplace": true,
    "ast-grep@ast-grep-marketplace": true
  }
}
```

### 3. Configure the bullet-summary hook

Add to your `~/.claude/settings.json` hooks section:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/bullet-summary.py"
          }
        ]
      }
    ]
  }
}
```

### 4. Set up API key for hook

The hook needs an API key. Create `~/.claude/.env`:

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 5. (Optional) Custom summary location

By default, summaries go to `~/.claude/summaries/`. Override with:

```bash
export CLAUDE_SUMMARY_DIR=~/path/to/summaries
```

## Dependencies

- `uv` (for running the Python hook)
- The hook will auto-install its deps on first run
