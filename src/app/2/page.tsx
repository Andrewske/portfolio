'use client';

import { useState } from 'react';

interface PipelinePhase {
  name: string;
  description: string;
}

const phases: PipelinePhase[] = [
  {
    name: 'Discussion',
    description: 'Claude asks questions one at a time until ready to plan',
  },
  {
    name: 'Plan',
    description: 'Claude writes exhaustive implementation plan (Opus)',
  },
  {
    name: 'Handoff',
    description: 'Break large plans into agent-sized task files',
  },
  {
    name: 'Review',
    description: 'Fresh context reviews plan for gaps',
  },
  {
    name: 'Best-idea',
    description: 'Research alternatives when uncertain',
  },
  {
    name: 'Improve',
    description: 'Simplify, strengthen, "wouldn\'t it be cool if"',
  },
  {
    name: 'Implement',
    description: 'Sub-agents execute in parallel',
  },
  {
    name: 'Code-review',
    description: 'Fresh context reviews commits',
  },
];

export default function WorkflowVariant2() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0b0f0c] text-[#e6edf3] font-mono">
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-flow {
          animation: flow 3s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-20 text-[#7ee787]">
          My Claude Code Workflow
        </h1>

        {/* Pipeline Visualization - Desktop */}
        <div className="hidden lg:block mb-24">
          <div className="relative flex items-center justify-between px-8">
            {phases.map((phase, index) => (
              <div key={phase.name} className="relative flex items-center">
                {/* Node */}
                <div
                  className="relative z-10"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={`
                      w-32 h-32 rounded-full
                      bg-[#0b0f0c]
                      border-2 border-[#39d353]
                      flex items-center justify-center
                      cursor-pointer
                      transition-all duration-300
                      ${hoveredIndex === index ? 'scale-110 shadow-[0_0_30px_rgba(57,211,83,0.6)]' : 'shadow-[0_0_15px_rgba(57,211,83,0.3)]'}
                    `}
                  >
                    <span className="text-center text-xs px-2 text-[#7ee787] font-semibold">
                      {phase.name}
                    </span>
                  </div>

                  {/* Tooltip */}
                  {hoveredIndex === index && (
                    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 bg-[#161b22] border border-[#39d353] rounded p-3 shadow-lg z-20">
                      <p className="text-sm text-[#e6edf3] leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Connecting Line */}
                {index < phases.length - 1 && (
                  <div className="relative w-8 h-0.5 mx-2">
                    <div className="absolute inset-0 bg-[#238636]"></div>
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#39d353] to-transparent animate-flow"
                      style={{
                        backgroundSize: '200% 100%',
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Visualization - Tablet */}
        <div className="hidden md:block lg:hidden mb-24">
          <div className="grid grid-cols-4 gap-8">
            {phases.map((phase, index) => (
              <div key={phase.name} className="relative">
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={`
                      w-28 h-28 rounded-full
                      bg-[#0b0f0c]
                      border-2 border-[#39d353]
                      flex items-center justify-center
                      cursor-pointer
                      transition-all duration-300
                      mx-auto
                      ${hoveredIndex === index ? 'scale-110 shadow-[0_0_30px_rgba(57,211,83,0.6)]' : 'shadow-[0_0_15px_rgba(57,211,83,0.3)]'}
                    `}
                  >
                    <span className="text-center text-xs px-2 text-[#7ee787] font-semibold">
                      {phase.name}
                    </span>
                  </div>

                  {hoveredIndex === index && (
                    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 bg-[#161b22] border border-[#39d353] rounded p-3 shadow-lg z-20">
                      <p className="text-sm text-[#e6edf3] leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Vertical connector for stacked layout */}
                {index % 4 !== 3 && index < phases.length - 1 && (
                  <div className="absolute top-1/2 -right-4 w-8 h-0.5">
                    <div className="absolute inset-0 bg-[#238636]"></div>
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#39d353] to-transparent animate-flow"
                      style={{
                        backgroundSize: '200% 100%',
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Visualization - Mobile */}
        <div className="block md:hidden mb-16 space-y-6">
          {phases.map((phase, index) => (
            <div key={phase.name} className="relative">
              <div className="flex items-center gap-4">
                <div
                  className={`
                    w-20 h-20 rounded-full
                    bg-[#0b0f0c]
                    border-2 border-[#39d353]
                    flex items-center justify-center
                    flex-shrink-0
                    shadow-[0_0_15px_rgba(57,211,83,0.3)]
                  `}
                >
                  <span className="text-center text-xs px-1 text-[#7ee787] font-semibold">
                    {phase.name}
                  </span>
                </div>
                <div className="flex-1 bg-[#161b22] border border-[#238636] rounded p-3">
                  <p className="text-sm text-[#8b949e]">
                    {phase.description}
                  </p>
                </div>
              </div>

              {/* Vertical connector */}
              {index < phases.length - 1 && (
                <div className="relative w-0.5 h-6 ml-10 my-2">
                  <div className="absolute inset-0 bg-[#238636]"></div>
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-[#39d353] to-transparent animate-pulse-glow"
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hook */}
        <div className="text-center mb-16">
          <p className="text-lg text-[#8b949e]">
            If you just want the commands,{' '}
            <a
              href="#download"
              className="text-[#39d353] hover:text-[#7ee787] underline transition-colors"
            >
              download them here
            </a>{' '}
            and start using them today.
          </p>
        </div>

        {/* TL;DR Section */}
        <div className="max-w-3xl mx-auto bg-[#161b22] border border-[#238636] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#7ee787] mb-6">
            Pipeline Overview
          </h2>
          <ul className="space-y-4">
            {phases.map((phase) => (
              <li key={phase.name} className="flex gap-3">
                <span className="text-[#39d353] flex-shrink-0">▸</span>
                <div>
                  <span className="text-[#7ee787] font-semibold">
                    {phase.name}:
                  </span>{' '}
                  <span className="text-[#8b949e]">{phase.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
