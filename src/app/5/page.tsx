'use client';

import type { NextPage } from 'next';

const DesignVariant5: NextPage = () => {
  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-mono">
      {/* Hero Section - Minimal Editorial */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-20 sm:py-32">
        {/* Title - Large, Bold, Generous Spacing */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-12 sm:mb-16 leading-tight text-text-primary">
          My Claude Code Workflow
        </h1>

        {/* Pipeline as Flowing Prose with Inline Badges */}
        <div className="text-lg sm:text-xl text-text-body leading-relaxed mb-16 sm:mb-20 space-y-4 max-w-3xl">
          <p>
            Start with{' '}
            <code className="px-2 py-1 bg-bg-code text-green-primary rounded text-base font-normal">
              Discussion
            </code>
            , where Claude asks questions until it understands. Write an exhaustive{' '}
            <code className="px-2 py-1 bg-bg-code text-green-primary rounded text-base font-normal">
              Plan
            </code>
            , then{' '}
            <code className="px-2 py-1 bg-bg-code text-green-primary rounded text-base font-normal">
              Handoff
            </code>
            {' '}to sub-agents who execute in parallel while you context-switch to other work.
          </p>
          <p>
            Fresh reviewers catch what implementers missed through{' '}
            <code className="px-2 py-1 bg-bg-code text-green-primary rounded text-base font-normal">
              Plan-review
            </code>
            . When uncertain, run{' '}
            <code className="px-2 py-1 bg-bg-code text-green-primary rounded text-base font-normal">
              Best-idea
            </code>
            {' '}to find Option D when you're stuck on A, B, C. Make good plans great with{' '}
            <code className="px-2 py-1 bg-bg-code text-green-primary rounded text-base font-normal">
              Improve-idea
            </code>
            , then{' '}
            <code className="px-2 py-1 bg-bg-code text-green-primary rounded text-base font-normal">
              Implement
            </code>
            {' '}and{' '}
            <code className="px-2 py-1 bg-bg-code text-green-primary rounded text-base font-normal">
              Code-review
            </code>
            {' '}to ship with confidence.
          </p>
        </div>

        {/* Hook - Subtle, Italic */}
        <p className="text-sm sm:text-base text-text-secondary italic mb-20 sm:mb-24 max-w-3xl">
          If you just want the commands,{' '}
          <a
            href="#download"
            className="text-green-primary hover:text-green-bright underline underline-offset-4 transition-colors"
          >
            download them here
          </a>
          {' '}and start using them today.
        </p>

        {/* TL;DR - Prose Format with Generous Spacing */}
        <div className="space-y-8 sm:space-y-10 max-w-3xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-text-primary">
              The Short Version
            </h2>
            <div className="space-y-6 text-lg sm:text-xl text-text-body leading-relaxed">
              <p>
                Eight phases from idea to shipped code. Claude asks questions until it understands, writes an exhaustive plan, then sub-agents execute in parallel while you context-switch to other work.
              </p>
              <p>
                Fresh reviewers catch what the implementers missed. When you're uncertain, research alternatives to find Option D when you're stuck on A, B, C. Simplify, strengthen, and ask "wouldn't it be cool if" to make B+ plans into A- plans.
              </p>
              <p>
                The upfront investment is real, but it pays back in code that doesn't need to be rewritten. Trust the plan, ship with confidence, and let the bugs get caught before they exist.
              </p>
            </div>
          </div>

          {/* Phase Breakdown - Clean Typography */}
          <div className="pt-12 sm:pt-16 border-t border-border">
            <h3 className="text-xl sm:text-2xl font-bold mb-8 text-text-primary">
              What Happens in Each Phase
            </h3>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-green-primary font-bold">Discussion</span>
                  <span className="text-text-secondary text-sm">→</span>
                  <span className="text-text-body">Claude asks questions one at a time until ready to plan</span>
                </div>
                <p className="text-text-secondary text-sm pl-0">
                  Forces decisions upfront instead of assumptions. Artifact: Decisions list
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-green-primary font-bold">Plan</span>
                  <span className="text-text-secondary text-sm">→</span>
                  <span className="text-text-body">Claude writes exhaustive implementation plan (Opus)</span>
                </div>
                <p className="text-text-secondary text-sm pl-0">
                  The plan becomes the artifact you'll review and execute. Artifact: ~/.claude/plans/
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-green-primary font-bold">Handoff</span>
                  <span className="text-text-secondary text-sm">→</span>
                  <span className="text-text-body">Break large plans into agent-sized task files</span>
                </div>
                <p className="text-text-secondary text-sm pl-0">
                  Parallel execution, clear dependencies. Artifact: Task files
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-green-primary font-bold">Plan-review</span>
                  <span className="text-text-secondary text-sm">→</span>
                  <span className="text-text-body">Fresh context reviews plan for gaps</span>
                </div>
                <p className="text-text-secondary text-sm pl-0">
                  Catches issues before they become bugs. Artifact: Findings list
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-green-primary font-bold">Best-idea</span>
                  <span className="text-text-secondary text-sm">→</span>
                  <span className="text-text-body">Research alternatives when uncertain</span>
                </div>
                <p className="text-text-secondary text-sm pl-0">
                  Finds Option D when you're stuck on A, B, C. Artifact: Recommendation
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-green-primary font-bold">Improve-idea</span>
                  <span className="text-text-secondary text-sm">→</span>
                  <span className="text-text-body">Simplify, strengthen, "wouldn't it be cool if"</span>
                </div>
                <p className="text-text-secondary text-sm pl-0">
                  B+ plans become A- plans. Artifact: Suggestions list
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-green-primary font-bold">Implement</span>
                  <span className="text-text-secondary text-sm">→</span>
                  <span className="text-text-body">Sub-agents execute in parallel</span>
                </div>
                <p className="text-text-secondary text-sm pl-0">
                  Trust the plan, context-switch to other work. Artifact: Commits
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-green-primary font-bold">Code-review</span>
                  <span className="text-text-secondary text-sm">→</span>
                  <span className="text-text-body">Fresh context reviews commits</span>
                </div>
                <p className="text-text-secondary text-sm pl-0">
                  Catches what slipped through. Artifact: Review notes
                </p>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div id="download" className="pt-12 sm:pt-16 border-t border-border">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-text-primary">
              Download the Skills
            </h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-green-primary hover:text-green-bright transition-colors underline underline-offset-4"
              >
                plan-review.md
              </a>
              <a
                href="#"
                className="block text-green-primary hover:text-green-bright transition-colors underline underline-offset-4"
              >
                best-idea.md
              </a>
              <a
                href="#"
                className="block text-green-primary hover:text-green-bright transition-colors underline underline-offset-4"
              >
                improve-idea.md
              </a>
              <a
                href="#"
                className="block text-green-primary hover:text-green-bright transition-colors underline underline-offset-4"
              >
                code-review.md
              </a>
              <a
                href="#"
                className="block text-green-primary hover:text-green-bright transition-colors underline underline-offset-4"
              >
                start-implementation.md
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignVariant5;
