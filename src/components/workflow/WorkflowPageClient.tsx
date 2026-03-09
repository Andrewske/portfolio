'use client';

import React, { type ReactNode } from 'react';
import { DinoModeProvider } from './DinoModeProvider';
import { DinoCollapsible } from './DinoCollapsible';
import { ImmersionControls } from './ImmersionControls';
import { workflowContent, type ContentBlock, type Block } from '~/lib/workflow-content';
import { renderBlock } from './BlockRenderer';

// Determine if block should be in terminal window (JP scene content) or plain text
function isTerminalContent(block: ContentBlock): boolean {
  // Must have dinoOnly flag to be terminal content
  if (!('dinoOnly' in block) || !block.dinoOnly) return false;

  // All dinoOnly content goes in terminal (chat, finding, phase, timeskip, quote, image, text, heading, list, divider)
  const terminalTypes = ['chat', 'finding', 'phase', 'timeskip', 'quote', 'image', 'text', 'heading', 'list', 'divider'];
  return terminalTypes.includes(block.type);
}

type BlockGroup = {
  isTerminal: boolean;
  blocks: ContentBlock[];
  startIndex: number;
};

function groupBlocksByContainer(blocks: ContentBlock[]): BlockGroup[] {
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

function renderSingleBlock(block: ContentBlock, index: number): React.ReactElement | null {
  return renderBlock(block, index);
}

function renderBlockGroups(blocks: ContentBlock[]): React.ReactElement[] {
  const groups = groupBlocksByContainer(blocks);

  return groups.map((group, groupIndex) => {
    const renderedBlocks = group.blocks
      .map((block, i) => renderSingleBlock(block, group.startIndex + i))
      .filter((el): el is React.ReactElement => el !== null);

    if (renderedBlocks.length === 0) return null;

    if (group.isTerminal) {
      // JP content in terminal window
      return (
        <DinoCollapsible key={`group-${groupIndex}`}>
          <div className="border border-gray-800 rounded-lg bg-gray-950">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-800">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            {/* Terminal content */}
            <div className="p-4 sm:p-6 space-y-2">
              {renderedBlocks}
            </div>
          </div>
        </DinoCollapsible>
      );
    }

    // Kevin/plain content rendered outside terminal styling
    return (
      <div key={`group-${groupIndex}`} className="space-y-2">
        {renderedBlocks}
      </div>
    );
  }).filter((el): el is React.ReactElement => el !== null);
}

function WorkflowContent(): ReactNode {
  const { intro, tldr, introBlocks, phases, outro } = workflowContent;

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Terminal-style header */}
          <div className="border border-green-500/20 rounded-lg p-4 sm:p-6 md:p-8 bg-black/50 backdrop-blur-sm mb-8 sm:mb-12">
            <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 sm:ml-4 text-gray-500 text-xs sm:text-sm">workflow.tsx</span>
              </div>
              <ImmersionControls />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {intro.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-400">
                {intro.subtitle}
              </p>
              {intro.hook && (
                <p className="text-sm sm:text-base text-green-400 italic">
                  {intro.hook}
                </p>
              )}
            </div>
          </div>

          {/* TL;DR Section */}
          <div className="mb-8 sm:mb-12 space-y-2">
            <h2 className="text-sm font-bold text-white">TL;DR</h2>
            {renderBlockGroups(tldr.blocks)}
          </div>

          {/* Intro Blocks */}
          <div className="mb-8 sm:mb-12 space-y-2">
            {renderBlockGroups(introBlocks)}
          </div>

          {/* Workflow Phases */}
          <div className="space-y-12 sm:space-y-16">
            {phases.map((phase) => (
              <section key={phase.id} id={phase.id} className="space-y-3">
                <h2 className="text-sm font-bold text-white">{phase.title}</h2>
                <div className="space-y-3">
                  {renderBlockGroups(phase.blocks)}
                </div>
              </section>
            ))}
          </div>

          {/* Outro Section */}
          {outro.blocks.length > 0 && (
            <div className="mt-8 sm:mt-12 space-y-2">
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
