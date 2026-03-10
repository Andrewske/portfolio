# Task 06: Extract Hardcoded Colors to Tailwind Config

## Overview
Extract all hardcoded hex colors from WorkflowPageClient.tsx to Tailwind config tokens for consistency and maintainability.

## Current State
WorkflowPageClient.tsx mixes Tailwind tokens (`text-green-primary`, `bg-bg-main`) with hardcoded hex values from GitHub's color palette.

## Colors to Extract

### Hero/Background Colors
| Hex | Usage | Suggested Token |
|-----|-------|-----------------|
| `#1a1f1a` | Hero gradient start | `hero-gradient-start` |
| `#0d120d` | Hero gradient mid | `hero-gradient-mid` |
| `#0b0f0c` | Hero gradient end / vignette | `hero-gradient-end` |

### GitHub Green Palette
| Hex | Usage | Suggested Token |
|-----|-------|-----------------|
| `#39d353` | Primary accent, links, badges | `gh-green` (or map to existing `green-primary`) |
| `#7ee787` | Headings, emphasis | `gh-green-light` |

### GitHub Text Colors
| Hex | Usage | Suggested Token |
|-----|-------|-----------------|
| `#8b949e` | Muted/secondary text | `gh-text-muted` |
| `#c9d1d9` | Body text | `gh-text-body` |
| `#e6edf3` | Headings | `gh-text-heading` |

### Banner/Accent Colors
| Hex | Usage | Suggested Token |
|-----|-------|-----------------|
| `#ff6b35` | Banner gradient start | `banner-orange` |
| `#c54b1a` | Banner gradient end | `banner-orange-dark` |

### Terminal Frame Colors
| Hex | Usage | Suggested Token |
|-----|-------|-----------------|
| `#2d3d32` | Terminal frame bg | `terminal-frame` |
| `#0a0d0b` | Terminal content bg | `terminal-content` |

## Implementation Steps

1. Add color tokens to `tailwind.config.ts` under `theme.extend.colors`
2. Replace hardcoded hex values in WorkflowPageClient.tsx with new tokens
3. Verify visual parity (no changes to rendered output)
4. Run build to confirm no errors

## Acceptance Criteria
- [ ] All hex colors in WorkflowPageClient.tsx replaced with Tailwind tokens
- [ ] Colors defined in tailwind.config.ts
- [ ] Visual output unchanged
- [ ] Build passes
