import React, { ReactElement } from 'react';
import type { Block } from '~/lib/workflow-content';
import { parseInlineMarkdown } from '~/utils/parseInlineMarkdown';
import ChatMessage from './ChatMessage';
import Finding from './Finding';
import MemeImage from './MemeImage';
import { CodeBlock } from '~/components/ui/CodeBlock';
import { TimeSkip } from './TimeSkip';
import CollapsiblePrompt from './CollapsiblePrompt';
import WorkflowTable from './WorkflowTable';

/**
 * Exhaustiveness helper - TypeScript errors if a block type is unhandled
 */
function assertNever(x: never): never {
  throw new Error(`Unhandled block type: ${JSON.stringify(x)}`);
}

/**
 * Renders a single block. Containers call renderBlocks recursively.
 */
export function renderBlock(block: Block, index: number): ReactElement | null {
  switch (block.type) {
    // Primitives (single HTML elements)
    case 'p':
      return (
        <p key={index} id={block.id} className="text-gray-300 text-sm leading-snug">
          {parseInlineMarkdown(block.content)}
        </p>
      );

    case 'h2':
      return (
        <h2 key={index} id={block.id} className="text-sm font-bold text-white mt-4 mb-1">
          {block.content}
        </h2>
      );

    case 'h3':
      return (
        <h3 key={index} id={block.id} className="text-sm font-bold text-gray-200 mt-3 mb-1">
          {block.content}
        </h3>
      );

    case 'divider':
      return (
        <div key={index} id={block.id} className="text-gray-500 text-sm my-1">
          ---
        </div>
      );

    case 'image':
      return <MemeImage key={index} src={block.src} alt={block.alt} />;

    case 'code':
      return (
        <CodeBlock
          key={index}
          code={block.content}
          language={block.language}
          title={block.title || block.language}
        />
      );

    case 'quote':
      return (
        <blockquote key={index} id={block.id} className="border-l-2 border-gray-600 pl-4 text-gray-400 text-sm italic">
          {parseInlineMarkdown(block.content)}
        </blockquote>
      );

    case 'timeskip':
      return (
        <TimeSkip key={index}>
          {block.content}
        </TimeSkip>
      );

    case 'raw':
      return (
        <div
          key={index}
          id={block.id}
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );

    // Compound blocks (multiple elements, semantic structure)
    case 'list':
      const ListTag = block.ordered ? 'ol' : 'ul';
      const listClassName = block.ordered
        ? 'list-decimal list-inside text-gray-300 text-sm space-y-1'
        : 'list-disc list-inside text-gray-300 text-sm space-y-1';
      return (
        <ListTag key={index} id={block.id} className={listClassName}>
          {block.items.map((item, i) => (
            <li key={i}>{parseInlineMarkdown(item)}</li>
          ))}
        </ListTag>
      );

    case 'option':
      return (
        <div key={index} id={block.id} className="space-y-2 text-sm">
          <div className="text-white font-semibold">
            Option {block.number}: {block.title}
          </div>
          {block.pros && block.pros.length > 0 && (
            <div className="pl-4">
              <div className="text-gray-400">Pros:</div>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {block.pros.map((pro, i) => (
                  <li key={i}>{parseInlineMarkdown(pro)}</li>
                ))}
              </ul>
            </div>
          )}
          {block.cons && block.cons.length > 0 && (
            <div className="pl-4">
              <div className="text-gray-400">Cons:</div>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {block.cons.map((con, i) => (
                  <li key={i}>{parseInlineMarkdown(con)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    case 'recommendation':
      return (
        <p key={index} id={block.id} className="text-green-400 font-semibold text-sm">
          Recommended: {block.content}
          {block.confidence !== undefined && ` (${block.confidence}% confidence)`}
        </p>
      );

    // Containers (wrap nested blocks)
    case 'chat':
      return (
        <ChatMessage
          key={index}
          speaker={block.speaker}
          id={block.id}
          blocks={block.blocks}
        />
      );

    case 'finding':
      return (
        <Finding
          key={index}
          severity={block.severity}
          title={block.title}
          confidence={block.confidence}
          blocks={block.blocks}
        />
      );

    case 'kevin':
      return (
        <div key={index} id={block.id} className="space-y-2">
          {renderBlocks(block.blocks)}
        </div>
      );

    case 'collapsible':
      return (
        <CollapsiblePrompt key={index} title={block.title}>
          {renderBlocks(block.blocks)}
        </CollapsiblePrompt>
      );

    // Structural
    case 'table':
      return <WorkflowTable key={index} headers={block.headers} rows={block.rows} />;

    default:
      return assertNever(block);
  }
}

/**
 * Centralized dinoOnly filtering - single source of truth.
 * Renders an array of blocks, optionally filtering out dino-only content.
 */
export function renderBlocks(blocks: Block[], noDinos: boolean = false): ReactElement {
  const filtered = noDinos ? blocks.filter(b => !b.dinoOnly) : blocks;
  return <>{filtered.map((block, i) => renderBlock(block, i))}</>;
}
