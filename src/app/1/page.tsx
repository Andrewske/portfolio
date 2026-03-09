export default function Variant1Page() {
  const pipelinePhases = [
    'Discussion',
    'Plan',
    'Handoff',
    'Review',
    'Best-idea',
    'Improve',
    'Implement',
    'Code-review',
  ];

  const tldrItems = [
    {
      phase: 'Discussion',
      description: 'Claude asks questions one at a time until ready to plan',
    },
    {
      phase: 'Plan',
      description: 'Claude writes exhaustive implementation plan (Opus)',
    },
    {
      phase: 'Handoff',
      description: 'Break large plans into agent-sized task files',
    },
    {
      phase: 'Review',
      description: 'Fresh context reviews plan for gaps',
    },
    {
      phase: 'Best-idea',
      description: 'Research alternatives when uncertain',
    },
    {
      phase: 'Improve',
      description: 'Simplify, strengthen, "wouldn\'t it be cool if"',
    },
    {
      phase: 'Implement',
      description: 'Sub-agents execute in parallel',
    },
    {
      phase: 'Code-review',
      description: 'Fresh context reviews commits',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0b0f0c] px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Terminal Window */}
        <div className="overflow-hidden rounded-lg border border-[#30363d] bg-[#161b22] shadow-2xl">
          {/* Terminal Chrome */}
          <div className="flex items-center gap-2 border-b border-[#30363d] bg-[#0d1117] px-4 py-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="ml-3 font-mono text-sm text-[#8b949e]">
              workflow.tsx
            </div>
          </div>

          {/* Terminal Content */}
          <div className="px-8 py-12 md:px-16 md:py-16">
            {/* Title */}
            <h1 className="mb-8 bg-gradient-to-r from-[#39d353] to-[#7ee787] bg-clip-text font-mono text-4xl font-bold text-transparent md:text-5xl">
              My Claude Code Workflow
            </h1>

            {/* Pipeline Phases */}
            <div className="mb-12 flex flex-wrap gap-2">
              {pipelinePhases.map((phase, index) => (
                <code
                  key={index}
                  className="rounded bg-[#39d353]/10 px-3 py-1.5 font-mono text-sm text-[#39d353]"
                >
                  {phase}
                </code>
              ))}
            </div>

            {/* TL;DR Section */}
            <div className="space-y-6">
              <p className="font-mono text-base text-[#8b949e] md:text-lg">
                A systematic workflow for complex development tasks using Claude
                Code&apos;s agent orchestration capabilities.
              </p>

              <div className="space-y-3">
                {tldrItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="font-mono text-[#39d353]">•</span>
                    <p className="font-mono text-sm text-[#e6edf3] md:text-base">
                      <span className="font-semibold text-[#7ee787]">
                        {item.phase}
                      </span>{' '}
                      - {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hook Callout */}
        <div className="mt-8 rounded-lg border border-[#30363d] bg-[#161b22]/50 px-6 py-4 md:px-8">
          <p className="font-mono text-sm text-[#8b949e] md:text-base">
            If you just want the commands,{' '}
            <a
              href="#"
              className="text-[#39d353] underline decoration-[#39d353]/30 underline-offset-4 transition-colors hover:text-[#7ee787] hover:decoration-[#7ee787]/50"
            >
              download them here
            </a>{' '}
            and start using them today.
          </p>
        </div>
      </div>
    </main>
  );
}
