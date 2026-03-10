'use client';

import React, { type ReactNode, useEffect, useState } from 'react';
import { DinoModeProvider } from './DinoModeProvider';
import { DinoCollapsible } from './DinoCollapsible';
import { ImmersionControls } from './ImmersionControls';
import { workflowContent, type Block } from '~/lib/workflow-content';
import { renderBlock } from './BlockRenderer';

const HERO_SCROLL_OFFSET = '-100px 0px 0px 0px';

// Custom hook for tracking hero section visibility
function useHeroVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(!entry.isIntersecting);
        }
      },
      { threshold: 0, rootMargin: HERO_SCROLL_OFFSET }
    );

    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  return isVisible;
}

// Hero Image Placeholder Component
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

// Determine if block should be in terminal window (JP scene content) or plain text
function isTerminalContent(block: Block): boolean {
  // Check for dinoOnly flag on any block type
  return ('dinoOnly' in block) && block.dinoOnly === true;
}

type BlockGroup = {
  isTerminal: boolean;
  blocks: Block[];
  startIndex: number;
};

function groupBlocksByContainer(blocks: Block[]): BlockGroup[] {
  const groups: BlockGroup[] = [];
  let currentGroup: BlockGroup | null = null;

  blocks.forEach((block, index) => {
    const blockIsTerminal = isTerminalContent(block);

    if (currentGroup === null || currentGroup.isTerminal !== blockIsTerminal) {
      currentGroup = { isTerminal: blockIsTerminal, blocks: [block], startIndex: index };
      groups.push(currentGroup);
    } else {
      currentGroup.blocks.push(block);
    }
  });

  return groups;
}

function renderBlockGroups(blocks: Block[]): React.ReactElement[] {
  const groups = groupBlocksByContainer(blocks);

  return groups.map((group, groupIndex) => {
    const renderedBlocks = group.blocks
      .map((block, i) => renderBlock(block, group.startIndex + i))
      .filter((el): el is React.ReactElement => el !== null);

    if (renderedBlocks.length === 0) return null;

    if (group.isTerminal) {
      // JP content in terminal window with thick frame
      return (
        <DinoCollapsible key={`group-${groupIndex}`}>
          {/* Thick frame area */}
          <div className="rounded-lg p-2" style={{ backgroundColor: '#2d3d32' }}>
            {/* Dots in frame area */}
            <div className="flex items-center gap-2 px-2 py-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            {/* Inset content area */}
            <div className="rounded border border-green-accent/40 p-5 sm:p-8 space-y-4" style={{ backgroundColor: '#0a0d0b' }}>
              {renderedBlocks}
            </div>
          </div>
        </DinoCollapsible>
      );
    }

    // Kevin/plain content rendered outside terminal styling
    return (
      <div key={`group-${groupIndex}`} className="space-y-3">
        {renderedBlocks}
      </div>
    );
  }).filter((el): el is React.ReactElement => el !== null);
}

// Sticky Timeline Component
function StickyTimeline({ activePhase, phases }: { activePhase: string | null; phases: Array<{ id: string; name: string }> }) {
  const isVisible = useHeroVisibility();

  if (!isVisible) return null;

  const currentIndex = phases.findIndex((phase) => phase.id === activePhase);

  // Mobile/tablet only - hidden on xl+
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-bg-main/95 backdrop-blur-sm border-b border-border-subtle xl:hidden">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          <span className="text-xs text-text-secondary mr-2 whitespace-nowrap">
            {currentIndex >= 0 ? `${currentIndex + 1}/${phases.length}` : `0/${phases.length}`}
          </span>
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
                      ? 'bg-green-primary shadow-[0_0_8px_rgba(57,211,83,0.6)]'
                      : 'bg-border-subtle group-hover:bg-green-primary/50'
                  }`}
                />
                <span className="hidden md:block text-[10px] mt-1 text-text-secondary group-hover:text-text-primary whitespace-nowrap">
                  {phase.name}
                </span>
              </a>
              {index < phases.length - 1 && (
                <div className="flex-1 h-px bg-border-subtle max-w-[20px] sm:max-w-[40px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// Floating Sidebar Timeline Component
function FloatingSidebar({ activePhase, phases }: { activePhase: string | null; phases: Array<{ id: string; name: string }> }) {
  const isVisible = useHeroVisibility();

  if (!isVisible) return null;

  // Desktop only - positioned relative to content (max-w-4xl = 56rem, so content starts at calc(50% - 28rem))
  return (
    <div className="fixed top-1/2 -translate-y-1/2 z-50 hidden xl:block left-[calc(50%-38rem)]">
      <div className="relative flex flex-col">
        {/* Vertical line - now on the right side */}
        <div className="absolute right-[5px] top-2 bottom-2 w-px bg-border-subtle" />

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
                      ? 'text-green-primary font-semibold'
                      : 'text-text-secondary group-hover:text-text-primary'
                  }`}
                >
                  {phase.name}
                </span>
                {/* Node - now on the right */}
                <div
                  className={`relative z-10 w-3 h-3 rounded-full flex-shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-green-primary shadow-[0_0_12px_rgba(57,211,83,0.6)]'
                      : 'bg-border-subtle group-hover:bg-green-primary/50'
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

function WorkflowContent(): ReactNode {
  const { intro, tldr, introBlocks, phases, outro } = workflowContent;
  const [activePhase, setActivePhase] = useState<string | null>(null);

  // Map content phases to nav structure
  const navPhases = phases.map((phase) => ({
    id: phase.id,
    name: phase.title.replace(/^Phase \d+: /, ''), // Strip "Phase N: " prefix if present
  }));

  // Track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    phases.forEach((phase) => {
      const element = document.getElementById(phase.id);
      if (!element) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[ScrollTracking] Missing section element: #${phase.id}`);
        }
        return;
      }
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
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [phases]);

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-mono">
      <StickyTimeline activePhase={activePhase} phases={navPhases} />
      <FloatingSidebar activePhase={activePhase} phases={navPhases} />

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
            {navPhases.map((phase) => (
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

        <div className="max-w-4xl mx-auto px-6">

          {/* TL;DR Section */}
          <div className="space-y-6 mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-[#7ee787]">TL;DR</h2>

            <p className="text-[#8b949e] text-base">
              {tldr.summary}
            </p>

            <div className="space-y-3 pt-2">
              {phases.map((phase) => (
                <div key={phase.id} className="flex gap-3">
                  <span className="text-[#39d353] select-none">•</span>
                  <p className="text-[#c9d1d9]">
                    <span className="font-semibold text-[#7ee787]">{phase.title.replace(/^Phase \d+: /, '')}</span>
                    {' — '}
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Intro Blocks */}
          <div className="mb-12 sm:mb-16 space-y-4">
            {renderBlockGroups(introBlocks)}
          </div>

          {/* Workflow Phases */}
          <div className="space-y-16 sm:space-y-20">
            {phases.map((phase) => (
              <section key={phase.id} id={phase.id} className="space-y-6 scroll-mt-16">
                <h2 className="text-lg sm:text-xl font-bold text-green-primary">{phase.title}</h2>
                <div className="space-y-4">
                  {renderBlockGroups(phase.blocks)}
                </div>
              </section>
            ))}
          </div>

          {/* Outro Section */}
          {outro.blocks.length > 0 && (
            <div className="mt-16 sm:mt-20 space-y-4">
              {renderBlockGroups(outro.blocks)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function WorkflowPageClient(): ReactNode {
  return (
    <DinoModeProvider>
      <WorkflowContent />
    </DinoModeProvider>
  );
}
