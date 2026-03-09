'use client';

import React, { type ReactNode } from 'react';
import { DinoModeProvider } from './DinoModeProvider';
import { DinoCollapsible } from './DinoCollapsible';
import { ImmersionControls } from './ImmersionControls';
import { workflowContent, type Block } from '~/lib/workflow-content';
import { renderBlock } from './BlockRenderer';

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

function WorkflowContent(): ReactNode {
  const { intro, tldr, introBlocks, phases, outro } = workflowContent;

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-mono">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Terminal window with thick frame */}
          <div className="rounded-lg p-2 mb-12 sm:mb-16" style={{ backgroundColor: '#2d3d32' }}>
            {/* Dots in frame area */}
            <div className="flex items-center justify-between gap-2 px-2 py-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-text-secondary text-sm">workflow.tsx</span>
              </div>
              <ImmersionControls />
            </div>
            {/* Inset content area */}
            <div className="rounded border border-green-accent/40 p-6 sm:p-8 space-y-4" style={{ backgroundColor: '#0a0d0b' }}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-primary">
                {intro.title}
              </h1>
              <p className="text-base sm:text-lg text-text-secondary">
                {intro.subtitle}
              </p>
              {intro.hook && (
                <p className="text-sm sm:text-base text-green-bright italic">
                  {intro.hook}
                </p>
              )}
            </div>
          </div>

          {/* TL;DR Section */}
          <div className="mb-12 sm:mb-16 space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-green-primary">TL;DR</h2>
            {renderBlockGroups(tldr.blocks)}
          </div>

          {/* Intro Blocks */}
          <div className="mb-12 sm:mb-16 space-y-4">
            {renderBlockGroups(introBlocks)}
          </div>

          {/* Workflow Phases */}
          <div className="space-y-16 sm:space-y-20">
            {phases.map((phase) => (
              <section key={phase.id} id={phase.id} className="space-y-6">
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
