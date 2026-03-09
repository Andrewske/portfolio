---
task: 00-design-system
status: done
depends: []
files:
  - path: tailwind.config.ts
    action: modify
---

# Design System Setup

## Context
Establish semantic color tokens in Tailwind before block migration. This replaces variant 2's inline `colors` object with proper Tailwind classes.

## Files to Modify
- tailwind.config.ts

## Implementation Details

Add the following to `theme.extend.colors`:

```ts
colors: {
  // Existing syntax highlighting colors...
  keyword: '#3b82f6',
  common: '#facc15',
  comment: '#16a34a',
  declaration: '#a855f7',
  default: '#e5e7eb',

  // New workflow design system
  bg: {
    main: '#0b0f0c',
    panel: '#11161c',
    code: '#161b22',
  },
  green: {
    primary: '#39d353',
    secondary: '#2ea043',
    accent: '#238636',
    bright: '#7ee787',
  },
  text: {
    primary: '#e6edf3',
    body: '#c9d1d9',
    muted: '#8b949e',
  },
  border: '#2d333b',
},
```

Also add to `theme.extend.boxShadow`:

```ts
boxShadow: {
  // Existing shadows...
  panel: '0 0 0 1px #2d333b',
},
```

## Usage Examples
After this change, variant 2's inline styles become Tailwind classes:

| Before (inline) | After (Tailwind) |
|-----------------|------------------|
| `style={{ backgroundColor: colors.bg }}` | `className="bg-bg-main"` |
| `style={{ color: colors.primary }}` | `className="text-green-primary"` |
| `style={{ borderColor: colors.border }}` | `className="border-border"` |

## Verification
- `pnpm build` passes
- Classes like `bg-bg-main`, `text-green-primary` are recognized
