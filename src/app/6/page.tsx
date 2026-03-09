'use client';

import React, { useEffect, useState } from 'react';

// Phase data for timeline and TL;DR
const phases = [
  { id: 'discussion', name: 'Discussion', description: 'Claude asks questions one at a time until ready to plan' },
  { id: 'plan', name: 'Plan', description: 'Claude writes exhaustive implementation plan (Opus)' },
  { id: 'handoff', name: 'Handoff', description: 'Break large plans into agent-sized task files' },
  { id: 'review', name: 'Review', description: 'Fresh context reviews plan for gaps' },
  { id: 'best-idea', name: 'Best-idea', description: 'Research alternatives when uncertain' },
  { id: 'improve', name: 'Improve', description: 'Simplify, strengthen, "wouldn\'t it be cool if"' },
  { id: 'implement', name: 'Implement', description: 'Sub-agents execute in parallel' },
  { id: 'code-review', name: 'Code-review', description: 'Fresh context reviews commits' },
];

// Sticky Timeline Component
function StickyTimeline({ activePhase }: { activePhase: string | null }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show timeline when hero is NOT intersecting (scrolled past)
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
    );

    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  // Mobile only - hidden on lg+
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f0c]/95 backdrop-blur-sm border-b border-[#2d333b] lg:hidden">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {phases.map((phase, index) => (
            <React.Fragment key={phase.id}>
              <a
                href={`#${phase.id}`}
                className={`group flex flex-col items-center transition-all duration-200 ${
                  activePhase === phase.id ? 'scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                    activePhase === phase.id
                      ? 'bg-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.6)]'
                      : 'bg-[#2d333b] group-hover:bg-[#39d353]/50'
                  }`}
                />
                <span className="hidden md:block text-[10px] mt-1 text-[#8b949e] group-hover:text-[#e6edf3] whitespace-nowrap">
                  {phase.name}
                </span>
              </a>
              {index < phases.length - 1 && (
                <div className="flex-1 h-px bg-[#2d333b] max-w-[20px] sm:max-w-[40px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// Floating Sidebar Timeline Component
function FloatingSidebar({ activePhase }: { activePhase: string | null }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
    );

    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  // Desktop only - positioned relative to content (max-w-4xl = 56rem, so content starts at calc(50% - 28rem))
  return (
    <div className="fixed top-1/2 -translate-y-1/2 z-50 hidden lg:block left-[calc(50%-38rem)]">
      <div className="relative flex flex-col">
        {/* Vertical line - now on the right side */}
        <div className="absolute right-[5px] top-2 bottom-2 w-px bg-[#2d333b]" />

        {/* Phase nodes */}
        <div className="relative flex flex-col gap-3">
          {phases.map((phase) => {
            const isActive = activePhase === phase.id;
            return (
              <a
                key={phase.id}
                href={`#${phase.id}`}
                className="group flex items-center justify-end gap-3 transition-all duration-200"
              >
                {/* Label - now on the left */}
                <span
                  className={`text-sm font-mono whitespace-nowrap transition-all duration-200 text-right ${
                    isActive
                      ? 'text-[#39d353] font-semibold'
                      : 'text-[#8b949e] group-hover:text-[#e6edf3]'
                  }`}
                >
                  {phase.name}
                </span>
                {/* Node - now on the right */}
                <div
                  className={`relative z-10 w-3 h-3 rounded-full flex-shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#39d353] shadow-[0_0_12px_rgba(57,211,83,0.6)]'
                      : 'bg-[#2d333b] group-hover:bg-[#39d353]/50'
                  }`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Placeholder Hero Image
function HeroImage() {
  return (
    <div className="relative w-full aspect-[21/9] sm:aspect-[2.5/1] bg-gradient-to-br from-[#1a1f1a] via-[#0d120d] to-[#0b0f0c] overflow-hidden">
      {/* Placeholder pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(57, 211, 83, 0.1) 20px,
            rgba(57, 211, 83, 0.1) 40px
          )`
        }} />
      </div>

      {/* Placeholder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Fake banner shape */}
        <div
          className="relative px-8 py-4 sm:px-16 sm:py-6 transform -rotate-6"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <div className="absolute inset-0 border-2 border-[#39d353]/30 transform rotate-0" />
          <span
            className="font-mono text-lg sm:text-2xl md:text-3xl font-bold tracking-wide"
            style={{
              background: 'linear-gradient(180deg, #ff6b35 0%, #c54b1a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            WHEN CLAUDE WRITES THE CODE
          </span>
        </div>

        {/* Placeholder note */}
        <p className="absolute bottom-4 text-[#8b949e] text-xs sm:text-sm font-mono">
          [ Hero image placeholder - T-Rex banner coming soon ]
        </p>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0c] via-transparent to-transparent" />
    </div>
  );
}

export default function Variant6Page() {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  // Track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    phases.forEach((phase) => {
      const element = document.getElementById(phase.id);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActivePhase(phase.id);
            }
          },
          { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f0c] text-[#e6edf3] font-mono">
      <StickyTimeline activePhase={activePhase} />
      <FloatingSidebar activePhase={activePhase} />

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
            My Claude Code Workflow
          </h1>

          {/* Pipeline Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {phases.map((phase) => (
              <code
                key={phase.id}
                className="px-3 py-1.5 text-sm bg-[#39d353]/10 text-[#39d353] rounded border border-[#39d353]/20"
              >
                {phase.name}
              </code>
            ))}
          </div>

          {/* Hook */}
          <p className="text-[#8b949e] text-base sm:text-lg mb-12">
            If you just want the commands,{' '}
            <a href="#" className="text-[#39d353] underline underline-offset-4 decoration-[#39d353]/30 hover:decoration-[#39d353]">
              download them here
            </a>{' '}
            and start using them today.
          </p>

          {/* TL;DR Section */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#7ee787]">TL;DR</h2>
            <p className="text-[#8b949e] text-base">
              Eight phases from idea to shipped code. Claude asks questions until it understands,
              writes an exhaustive plan, then sub-agents execute in parallel while you context-switch
              to other work. Fresh reviewers catch what the implementers missed.
            </p>

            <div className="space-y-3 pt-2">
              {phases.map((phase) => (
                <div key={phase.id} className="flex gap-3">
                  <span className="text-[#39d353] select-none">•</span>
                  <p className="text-[#c9d1d9]">
                    <span className="font-semibold text-[#7ee787]">{phase.name}</span>
                    {' — '}
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Sections for Timeline Testing */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="border-t border-[#2d333b] pt-12 mb-12">
          <p className="text-[#8b949e] italic">
            Scroll down to test the sticky timeline navigation...
          </p>
        </div>

        {phases.map((phase, index) => (
          <section
            key={phase.id}
            id={phase.id}
            className="py-16 sm:py-24 border-b border-[#2d333b] last:border-b-0"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#39d353] mb-4">
              Phase {index + 1}: {phase.name}
            </h2>
            <p className="text-[#c9d1d9] text-lg mb-8">
              {phase.description}
            </p>
            <div className="h-40 sm:h-60 rounded-lg border border-[#2d333b] bg-[#161b22] flex items-center justify-center">
              <span className="text-[#8b949e]">[ Content for {phase.name} phase ]</span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
