import type { Metadata } from 'next';
import WorkflowSection from '~/components/workflow/WorkflowSection';
import PlaceholderBlock from '~/components/workflow/PlaceholderBlock';
import ChatMessage from '~/components/workflow/ChatMessage';
import Finding from '~/components/workflow/Finding';
import { KevinCallout } from '~/components/workflow/KevinCallout';
import PhaseLabel from '~/components/workflow/PhaseLabel';
import { TimeSkip } from '~/components/workflow/TimeSkip';
import CollapsiblePrompt from '~/components/workflow/CollapsiblePrompt';
import { CodeBlock } from '~/components/ui/CodeBlock';
import { workflowContent, type ContentBlock } from '~/lib/workflow-content';

export const metadata: Metadata = {
  title: 'My Claude Code Workflow | Kevin Andrews',
  description: 'How I get Claude to write code I trust - an 8-phase workflow from discussion through code review, built for human-AI collaboration',
};

function renderBlock(block: ContentBlock, index: number): React.ReactElement | null {
  switch (block.type) {
    case 'chat':
      return <ChatMessage key={index} id={block.id} speaker={block.speaker}>{block.content}</ChatMessage>;
    case 'kevin':
      return <KevinCallout key={index} id={block.id} whatBreaks={block.whatBreaks}>{block.content}</KevinCallout>;
    case 'timeskip':
      return <TimeSkip key={index}>{block.content}</TimeSkip>;
    case 'finding':
      return (
        <Finding key={index} severity={block.severity} title={block.title} confidence={block.confidence}>
          {block.content}
        </Finding>
      );
    case 'collapsible':
      return <CollapsiblePrompt key={index} title={block.title}>{block.content}</CollapsiblePrompt>;
    case 'phase':
      return <PhaseLabel key={index} phase={block.phase} />;
    case 'placeholder':
      return <PlaceholderBlock key={index} label={block.label} />;
    case 'text':
      return <p key={index} className="text-gray-300">{block.content}</p>;
    case 'code':
      return <CodeBlock key={index} code={block.content} language={block.language} title={block.title ?? block.language} />;
    default:
      // TypeScript exhaustiveness check - will error if a type is unhandled
      const _exhaustive: never = block;
      return null;
  }
}

export default function MyClaudeCodeWorkflowPage() {
  const { intro, phases } = workflowContent;

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Terminal-style header */}
          <div className="border border-green-500/20 rounded-lg p-4 sm:p-6 md:p-8 bg-black/50 backdrop-blur-sm mb-8 sm:mb-12">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 sm:ml-4 text-gray-500 text-xs sm:text-sm">workflow.tsx</span>
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

          {/* Intro Section Placeholder */}
          <div className="mb-8 sm:mb-12">
            <PlaceholderBlock label="[Intro Section - Overview of workflow philosophy]" />
          </div>

          {/* Workflow Phases */}
          <div className="space-y-8 sm:space-y-12">
            {phases.map((phase) => (
              <WorkflowSection key={phase.id} id={phase.id} title={phase.title}>
                <div className="p-4 sm:p-6 space-y-4">
                  {phase.blocks.map((block, index) => renderBlock(block, index))}
                </div>
              </WorkflowSection>
            ))}
          </div>

          {/* Outro Section Placeholder */}
          <div className="mt-8 sm:mt-12">
            <PlaceholderBlock label="[Outro Section - Conclusion and next steps]" />
          </div>
        </div>
      </section>
    </div>
  );
}
