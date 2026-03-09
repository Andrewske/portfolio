---
task: 03-update-hero-section
status: pending
depends: [01-add-navigation-components]
files:
  - path: src/components/workflow/WorkflowPageClient.tsx
    action: modify
---

# Update Hero Section

## Context
Replace the terminal-chrome-wrapped hero with a clean editorial design: hero image placeholder at top, large title, pipeline badges, and hook text. The terminal styling is preserved for dino-mode content later in the page.

## Files to Modify/Create
- src/components/workflow/WorkflowPageClient.tsx (modify)

## Implementation Details

### HeroImage Component
Add placeholder component (to be replaced with real JP banner image later):
```tsx
function HeroImage() {
  return (
    <div className="relative w-full aspect-[21/9] sm:aspect-[2.5/1] bg-gradient-to-br from-[#1a1f1a] via-[#0d120d] to-[#0b0f0c] overflow-hidden">
      {/* Placeholder pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(57, 211, 83, 0.1) 20px, rgba(57, 211, 83, 0.1) 40px)`
        }} />
      </div>
      {/* Placeholder banner */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative px-8 py-4 sm:px-16 sm:py-6 transform -rotate-6"
          style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <span className="font-mono text-lg sm:text-2xl md:text-3xl font-bold tracking-wide"
            style={{ background: 'linear-gradient(180deg, #ff6b35 0%, #c54b1a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            WHEN CLAUDE WRITES THE CODE
          </span>
        </div>
        <p className="absolute bottom-4 text-[#8b949e] text-xs sm:text-sm font-mono">
          [ Hero image placeholder - T-Rex banner coming soon ]
        </p>
      </div>
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0c] via-transparent to-transparent" />
    </div>
  );
}
```

### Replace Hero Section Structure
Remove terminal chrome wrapper (lines 88-114). Replace with:
```tsx
{/* Hero Section */}
<section>
  {/* Hero Image - nav appears after scrolling past this */}
  <div id="hero-section">
    <HeroImage />
  </div>

  {/* Editorial Hero Content */}
  <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
    {/* Title */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#e6edf3]">
      {intro.title}
    </h1>

    {/* Pipeline Badges - clickable navigation */}
    <div className="flex flex-wrap gap-2 mb-8">
      {phases.map((phase) => (
        <a key={phase.id} href={`#${phase.id}`}>
          <code className="px-3 py-1.5 text-sm bg-[#39d353]/10 text-[#39d353] rounded border border-[#39d353]/20 hover:bg-[#39d353]/20 transition-colors cursor-pointer">
            {phase.name}
          </code>
        </a>
      ))}
    </div>

    {/* Hook */}
    {/* TODO: Replace href="#" with actual download link in future task */}
    <p className="text-[#8b949e] text-base sm:text-lg mb-12">
      If you just want the commands,{' '}
      <a href="#" className="text-[#39d353] underline underline-offset-4 decoration-[#39d353]/30 hover:decoration-[#39d353]">
        download them here
      </a>{' '}
      and start using them today.
    </p>

    {/* ImmersionControls moved here */}
    <div className="mb-8">
      <ImmersionControls />
    </div>
  </div>
</section>
```

## Verification
1. Run `pnpm dev`
2. Visit `/my-claude-code-workflow`
3. Hero should show image placeholder at top (no terminal chrome)
4. Title should be large, clean typography
5. Pipeline phases shown as green code badges
6. Hook text with download link styling
7. ImmersionControls (dino toggle) should be visible
