'use client';

import React from 'react';
import type { Metadata } from 'next';

export default function WorkflowVariant3(): React.ReactElement {
  const phases = [
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
    { phase: 'Discussion', what: 'Claude asks questions one at a time until ready to plan', why: 'Forces decisions upfront instead of assumptions', artifact: 'Decisions list' },
    { phase: 'Plan', what: 'Claude writes exhaustive implementation plan (Opus)', why: 'The plan becomes the artifact you\'ll review and execute', artifact: '~/.claude/plans/' },
    { phase: 'Handoff', what: 'Break large plans into agent-sized task files', why: 'Parallel execution, clear dependencies', artifact: 'Task files' },
    { phase: 'Plan-review', what: 'Fresh context reviews plan for gaps', why: 'Catches issues before they become bugs', artifact: 'Findings list' },
    { phase: 'Best-idea', what: 'Research alternatives when uncertain', why: 'Finds Option D when you\'re stuck on A, B, C', artifact: 'Recommendation' },
    { phase: 'Improve-idea', what: 'Simplify, strengthen, "wouldn\'t it be cool if"', why: 'B+ plans become A- plans', artifact: 'Suggestions list' },
    { phase: 'Implement', what: 'Sub-agents execute in parallel', why: 'Trust the plan, context-switch to other work', artifact: 'Commits' },
    { phase: 'Code-review', what: 'Fresh context reviews commits', why: 'Catches what slipped through', artifact: 'Review notes' },
  ];

  return (
    <div className="min-h-screen bg-bg-main font-mono text-green-primary px-4 py-8 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Terminal Window */}
        <div className="relative overflow-hidden rounded-lg border border-green-primary/30 bg-black shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-green-primary/30 bg-green-primary/5 px-4 py-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="ml-2 text-sm text-green-primary/70">workflow.tsx</div>
          </div>

          {/* Terminal Content */}
          <div className="relative p-6 sm:p-8">
            {/* Scanline CRT effect overlay */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(57,211,83,0.02)_50%)] bg-[length:100%_4px]" />

            {/* Title with typing animation */}
            <div className="mb-8">
              <h1 className="inline-block overflow-hidden border-r-4 border-green-bright text-2xl font-bold text-green-bright sm:text-4xl md:text-5xl animate-typing-title pr-1">
                My Claude Code Workflow
              </h1>
            </div>

            {/* Pipeline phases - staggered appearance */}
            <div className="mb-8 flex flex-wrap gap-2 opacity-0 animate-fade-in-delayed">
              {phases.map((phase, index) => (
                <span
                  key={phase}
                  className="inline-block rounded border border-green-primary/50 bg-green-primary/10 px-3 py-1 text-sm text-green-bright opacity-0 animate-phase-appear"
                  style={{
                    animationDelay: `${3.5 + index * 0.15}s`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {phase}
                </span>
              ))}
            </div>

            {/* Hook text */}
            <p className="mb-8 text-base text-green-primary/90 opacity-0 animate-fade-in-hook sm:text-lg">
              If you just want the commands, download them here and start using them today.
            </p>

            {/* TL;DR Section - no animation, static */}
            <div className="mt-12 opacity-0 animate-fade-in-tldr">
              <h2 className="mb-4 text-xl font-bold text-green-bright sm:text-2xl">TL;DR</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-green-primary/30">
                      <th className="px-3 py-2 text-left text-green-bright">Phase</th>
                      <th className="hidden px-3 py-2 text-left text-green-bright sm:table-cell">What happens</th>
                      <th className="hidden px-3 py-2 text-left text-green-bright md:table-cell">Why it matters</th>
                      <th className="px-3 py-2 text-left text-green-bright">Artifact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tldrItems.map((item, index) => (
                      <tr
                        key={item.phase}
                        className="border-b border-green-primary/10 transition-colors hover:bg-green-primary/5"
                      >
                        <td className="px-3 py-3 font-semibold text-green-bright">{item.phase}</td>
                        <td className="hidden px-3 py-3 text-green-primary/80 sm:table-cell">{item.what}</td>
                        <td className="hidden px-3 py-3 text-green-primary/80 md:table-cell">{item.why}</td>
                        <td className="px-3 py-3 font-mono text-xs text-green-secondary">{item.artifact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile-friendly card view for smaller screens */}
              <div className="mt-8 space-y-4 sm:hidden">
                {tldrItems.map((item) => (
                  <div
                    key={item.phase}
                    className="rounded border border-green-primary/30 bg-green-primary/5 p-4"
                  >
                    <div className="mb-2 font-bold text-green-bright">{item.phase}</div>
                    <div className="mb-2 text-sm text-green-primary/80">{item.what}</div>
                    <div className="mb-2 text-sm text-green-primary/80">{item.why}</div>
                    <div className="font-mono text-xs text-green-secondary">{item.artifact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes typing-title {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink-cursor {
          0%, 49% {
            border-color: transparent;
          }
          50%, 100% {
            border-color: #7ee787;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes phase-appear {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.animate-typing-title) {
          animation:
            typing-title 3s steps(24) forwards,
            blink-cursor 0.75s step-end infinite;
          white-space: nowrap;
        }

        :global(.animate-fade-in-delayed) {
          animation: fade-in 0.5s ease-in forwards;
          animation-delay: 3.5s;
        }

        :global(.animate-phase-appear) {
          animation: phase-appear 0.3s ease-out forwards;
        }

        :global(.animate-fade-in-hook) {
          animation: fade-in 0.5s ease-in forwards;
          animation-delay: 5s;
        }

        :global(.animate-fade-in-tldr) {
          animation: fade-in 0.5s ease-in forwards;
          animation-delay: 5.5s;
        }
      `}</style>
    </div>
  );
}
