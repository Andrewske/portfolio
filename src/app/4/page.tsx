export default function WorkflowVariant4() {
  const phases = [
    {
      name: "Discussion",
      description: "Claude asks questions one at a time until ready to plan",
    },
    {
      name: "Plan",
      description: "Claude writes exhaustive implementation plan (Opus)",
    },
    {
      name: "Handoff",
      description: "Break large plans into agent-sized task files",
    },
    {
      name: "Review",
      description: "Fresh context reviews plan for gaps",
    },
    {
      name: "Best-idea",
      description: "Research alternatives when uncertain",
    },
    {
      name: "Improve",
      description: "Simplify, strengthen, \"wouldn't it be cool if\"",
    },
    {
      name: "Implement",
      description: "Sub-agents execute in parallel",
    },
    {
      name: "Code-review",
      description: "Fresh context reviews commits",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f0c] text-[#e6edf3] font-mono">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Title & Intro */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              My Claude Code Workflow
            </h1>
            <p className="text-lg sm:text-xl text-[#8b949e] leading-relaxed mb-8">
              If you just want the commands, download them here and start using
              them today.
            </p>
            <p className="text-base sm:text-lg text-[#8b949e] leading-relaxed">
              This workflow orchestrates Claude across multiple phases with
              specialized context, ensuring thorough planning, rigorous review,
              and parallel execution for complex development tasks.
            </p>
          </div>

          {/* Right Column: Vertical Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-[12px] bottom-[12px] w-[2px] bg-[#238636]" />

            {/* Timeline Nodes */}
            <div className="space-y-8">
              {phases.map((phase, index) => (
                <div key={phase.name} className="relative flex items-start">
                  {/* Node Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-[32px] h-[32px] rounded-full border-[3px] ${
                        index === 0
                          ? "bg-[#7ee787] border-[#7ee787] shadow-[0_0_12px_rgba(126,231,135,0.6)]"
                          : "bg-[#0b0f0c] border-[#39d353]"
                      }`}
                    />
                  </div>

                  {/* Phase Content */}
                  <div className="ml-6 pb-2">
                    <h3
                      className={`text-xl sm:text-2xl font-semibold mb-2 ${
                        index === 0 ? "text-[#7ee787]" : "text-[#39d353]"
                      }`}
                    >
                      {phase.name}
                    </h3>
                    <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
