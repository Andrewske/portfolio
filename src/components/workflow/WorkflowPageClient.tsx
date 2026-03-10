'use client';

import React, { type ReactNode, useEffect, useMemo, useState } from 'react';
import { type Block, workflowContent } from '~/lib/workflow-content';
import { renderBlock } from './BlockRenderer';
import { DinoCollapsible } from './DinoCollapsible';
import { DinoModeProvider, useDinoMode } from './DinoModeProvider';

const HERO_SCROLL_OFFSET = '-600px 0px 0px 0px';

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

// Hero Image Component
function HeroImage() {
  return (
    <div className="relative w-full bg-bg-main">
      <img
        src="/assets/workflow/trex-banner.webp"
        srcSet="/assets/workflow/trex-banner.webp 1x, /assets/workflow/trex-banner@2x.webp 2x"
        alt="When Claude Writes The Code - T-Rex banner"
        className="w-full h-auto max-w-[1920px] mx-auto"
      />
    </div>
  );
}

// Determine if block should be in terminal window (JP scene content) or plain text
// Images with dinoOnly are hidden in noDinos mode but NOT placed in terminals
function isTerminalContent(block: Block): boolean {
  // Images never go in terminal windows
  if (block.type === 'image') return false;
  // Check for dinoOnly flag on other block types
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

function renderBlockGroups(blocks: Block[], noDinos: boolean = false): React.ReactElement[] {
  // Filter out dinoOnly images when noDinos is true (other dinoOnly content shows in collapsed terminals)
  const filteredBlocks = noDinos
    ? blocks.filter(b => !(b.dinoOnly && b.type === 'image'))
    : blocks;
  const groups = groupBlocksByContainer(filteredBlocks);

  return groups.map((group, groupIndex) => {
    const renderedBlocks = group.blocks
      .map((block, i) => renderBlock(block, group.startIndex + i))
      .filter((el): el is React.ReactElement => el !== null);

    if (renderedBlocks.length === 0) return null;

    if (group.isTerminal) {
      // JP content in terminal window - DinoCollapsible handles terminal chrome
      return (
        <DinoCollapsible key={`group-${groupIndex}`}>
          {renderedBlocks}
        </DinoCollapsible>
      );
    }

    // Kevin/plain content rendered outside terminal styling
    return (
      <div key={`group-${groupIndex}`} className="my-4">
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
    <div className="fixed top-1/2 -translate-y-1/2 z-50 hidden xl:block left-[calc(50%-42rem)]">
      <div className="flex flex-col">
        {/* Phase nodes with vertical line */}
        <div className="relative flex flex-col gap-3">
          {/* Vertical line - spans only phase nodes */}
          <div className="absolute right-[5px] top-2 bottom-2 w-px bg-border-subtle" />
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

        {/* GitHub link */}
        <a
          href="https://github.com/Andrewske/claude-code-workflow"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-end gap-3 mt-6 transition-all duration-200"
        >
          <span className="text-sm font-mono text-text-secondary group-hover:text-text-primary transition-all duration-200">
            GitHub
          </span>
          <svg
            className="w-4 h-4 text-text-secondary group-hover:text-green-primary transition-all duration-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

function WorkflowContent(): ReactNode {
  const { intro, tldr, introBlocks, phases, outro } = workflowContent;
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const { noDinos } = useDinoMode();

  // Combined nav items for sidebar (memoized for stable reference)
  const allNavItems = useMemo(() => {
    const phaseNavItems = phases.map((phase) => ({
      id: phase.id,
      name: phase.title.replace(/^Phase \d+: /, ''), // Strip "Phase N: " prefix if present
    }));

    const prePhaseNavItems = [
      { id: 'tldr', name: "TL;DR" },
      { id: 'philosophy', name: 'Philosophy' },
    ];

    return [...prePhaseNavItems, ...phaseNavItems];
  }, []);

  // Track which section is in view - activates when heading passes middle of screen
  useEffect(() => {
    const handleScroll = (): void => {
      const middleOfScreen = window.innerHeight / 2;
      let bestSection = allNavItems[0]?.id ?? null;

      for (const section of allNavItems) {
        const element = document.getElementById(section.id);
        if (!element) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[ScrollTracking] Missing section element: #${section.id}`);
          }
          continue;
        }

        const rect = element.getBoundingClientRect();
        // If this section's top has passed the middle, it becomes active
        if (rect.top <= middleOfScreen) {
          bestSection = section.id;
        }
      }

      setActivePhase(bestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [allNavItems]);

  return (
    // Hybrid typography: proportional font (IBM Plex Sans) for prose, monospace for technical elements
    <div className="min-h-screen bg-bg-main text-text-primary font-[family-name:var(--font-ibm-plex)]">
      <StickyTimeline activePhase={activePhase} phases={allNavItems} />
      <FloatingSidebar activePhase={activePhase} phases={allNavItems} />

      {/* Hero Section */}
      <section>
        {/* Hero Image - nav appears after scrolling past this */}
        <div id="hero-section">
          <HeroImage />
        </div>

        {/* Editorial Hero Content */}
        <div className="max-w-4xl mx-auto px-2 py-12 sm:py-16">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold mb-2 text-[#e6edf3]">
            {intro.title}
          </h1>
          <h2 className="text-3xl sm:text-3xl font-mono text-[#7ee787] mb-8 text-center">
            {intro.emphasis}
          </h2>
          <h3 className="text-base font-mono text-[#39d353] mb-4 text-center">
            {intro.subtitle}
          </h3>

          {/* Pipeline Badges - clickable navigation */}
          {/* <div className="flex flex-wrap gap-2 mb-8">
            {navPhases.map((phase) => (
              <a key={phase.id} href={`#${phase.id}`}>
                <code className="px-3 py-1.5 text-sm bg-[#39d353]/10 text-[#39d353] rounded border border-[#39d353]/20 hover:bg-[#39d353]/20 transition-colors cursor-pointer">
                  {phase.name}
                </code>
              </a>
            ))}
          </div> */}

          {/* Hook */}
          {/* TODO: Replace href="#" with actual download link in future task */}
          <p className="text-[#8b949e] text-base sm:text-lg mb-12 leading-relaxed">
            <a href="https://github.com/Andrewske/claude-code-workflow/tree/main/commands/plan" className="text-[#39d353] underline underline-offset-4 decoration-[#39d353]/30 hover:decoration-[#39d353]">
              just download commands
            </a>
</p>
        </div>

        <div className="max-w-4xl mx-auto px-2">

          {/* TL;DR Section */}
          <div id="tldr" className="space-y-6 mb-12 sm:mb-16 bg-amber-300/10 p-4 rounded-lg scroll-mt-16">
            <h2 className="text-xl sm:text-3xl font-mono font-bold text-[#7ee787]">TL;DR</h2>

            <p className="text-[#8b949e] text-base leading-relaxed">
              {tldr.summary}
            </p>

            <div className="space-y-3 pt-2">
              {phases.map((phase) => (
                <div key={phase.id} className="flex gap-3">
                  <span className="text-[#39d353] select-none">•</span>
                  <p className="text-[#c9d1d9] text-base leading-relaxed">
                    <span className="font-mono font-semibold text-[#7ee787]">{phase.title.replace(/^Phase \d+: /, '')}</span>
                    {' — '}
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy Section */}
          <div id="philosophy" className="mb-12 sm:mb-16 space-y-4 scroll-mt-16">
            {renderBlockGroups(introBlocks, noDinos)}
          </div>

          {/* Workflow Phases */}
          <div className="space-y-8">
            {phases.map((phase) => (
              <section key={phase.id} id={phase.id} className="space-y-6 scroll-mt-16">
                <h2 className="text-3xl font-mono font-bold text-green-bright">{phase.title}</h2>
                <div className="space-y-4">
                  {renderBlockGroups(phase.blocks, noDinos)}
                </div>
              </section>
            ))}
          </div>

          {/* Outro Section */}
          {outro.blocks.length > 0 && (
            <div className="mt-16 sm:mt-20 space-y-4">
              {renderBlockGroups(outro.blocks, noDinos)}
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
