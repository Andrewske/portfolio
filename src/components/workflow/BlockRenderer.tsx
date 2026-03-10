import type { ReactElement } from 'react'
import { CodeBlock } from '~/components/ui/CodeBlock'
import type { Block } from '~/lib/workflow-content'
import { parseInlineMarkdown } from '~/utils/parseInlineMarkdown'
import ChatMessage from './ChatMessage'
import CollapsiblePrompt from './CollapsiblePrompt'
import { DinoToggle } from './DinoToggle'
import Finding from './Finding'
import { GitHubEmbed } from './GitHubEmbed'
import MemeImage from './MemeImage'
import { TimeSkip } from './TimeSkip'
import WorkflowTable from './WorkflowTable'

/**
 * Exhaustiveness helper - TypeScript errors if a block type is unhandled
 */
function assertNever(x: never): never {
  throw new Error(`Unhandled block type: ${JSON.stringify(x)}`)
}

/**
 * Renders a single block. Containers call renderBlocks recursively.
 *
 * Typography approach (V6):
 * - Prose inherits proportional font (IBM Plex Sans) from parent
 * - Headings and technical labels get explicit font-mono for terminal aesthetic
 * - Larger text sizes (text-base) with relaxed line height for readability
 */
export function renderBlock(block: Block, index: number): ReactElement | null {
  switch (block.type) {
    // Primitives - prose inherits proportional font
    case 'p':
      return (
        <p key={index} id={block.id} className="text-text-body text-lg mb-4 leading-relaxed">
          {parseInlineMarkdown(block.content)}
        </p>
      )

    // Headings - explicit monospace for terminal aesthetic
    case 'h2':
      return (
        <h2
          key={index}
          id={block.id}
          className="text-3xl font-mono font-bold mt-6 mb-6 text-green-bright"
        >
          {block.content}
        </h2>
      )

    case 'h3':
      return (
        <h3
          key={index}
          id={block.id}
          className="text-xl font-mono font-semibold text-text-body mt-4 mb-1"
        >
          {block.content}
        </h3>
      )

    case 'divider':
      return (
        <div key={index} id={block.id} className="text-text-muted text-base font-mono my-4">
          ---
        </div>
      )

    case 'image':
      return <MemeImage key={index} src={block.src} alt={block.alt} />

    case 'code':
      return (
        <CodeBlock
          key={index}
          code={block.content}
          language={block.language}
          title={block.title || block.language}
        />
      )

    case 'githubEmbed':
      return (
        <GitHubEmbed key={index} url={block.url} language={block.language} title={block.title} />
      )

    case 'quote':
      return (
        <blockquote
          key={index}
          id={block.id}
          className="border-l-2 border-border my-10 py-6 pl-6 text-text-muted text-base italic leading-relaxed"
        >
          {parseInlineMarkdown(block.content)}
        </blockquote>
      )

    case 'timeskip':
      return <TimeSkip key={index}>{block.content}</TimeSkip>

    // Compound blocks - prose inherits proportional font
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul'
      const listClassName = block.ordered
        ? 'list-decimal list-inside text-text-body text-base space-y-1 leading-relaxed'
        : 'list-disc list-inside text-text-body text-base space-y-1 leading-relaxed'
      return (
        <ListTag key={index} id={block.id} className={listClassName}>
          {block.items.map((item, i) => (
            <li key={i}>{parseInlineMarkdown(item)}</li>
          ))}
        </ListTag>
      )
    }

    case 'option':
      return (
        <div key={index} id={block.id} className="space-y-2 text-base my-3">
          <div className="text-text-primary font-mono font-semibold">
            Option {block.number}: {block.title}
          </div>
          {block.pros && block.pros.length > 0 && (
            <div className="pl-4">
              <div className="text-text-muted font-mono">Pros:</div>
              <ul className="list-disc list-inside text-text-body space-y-1 leading-relaxed">
                {block.pros.map((pro, i) => (
                  <li key={i}>{parseInlineMarkdown(pro)}</li>
                ))}
              </ul>
            </div>
          )}
          {block.cons && block.cons.length > 0 && (
            <div className="pl-4">
              <div className="text-text-muted font-mono">Cons:</div>
              <ul className="list-disc list-inside text-text-body space-y-1 leading-relaxed">
                {block.cons.map((con, i) => (
                  <li key={i}>{parseInlineMarkdown(con)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )

    case 'recommendation':
      return (
        <p
          key={index}
          id={block.id}
          className="text-green-primary font-mono font-semibold text-base mt-4"
        >
          Recommended: {block.content}
          {block.confidence !== undefined && ` (${block.confidence}% confidence)`}
        </p>
      )

    // Containers (wrap nested blocks)
    case 'chat':
      return <ChatMessage key={index} speaker={block.speaker} id={block.id} blocks={block.blocks} />

    case 'finding':
      return (
        <Finding
          key={index}
          severity={block.severity}
          title={block.title}
          confidence={block.confidence}
          blocks={block.blocks}
        />
      )

    case 'kevin':
      return (
        <div key={index} id={block.id} className="mb-16">
          {renderBlocks(block.blocks)}
        </div>
      )

    case 'collapsible':
      return (
        <CollapsiblePrompt key={index} title={block.title}>
          {renderBlocks(block.blocks)}
        </CollapsiblePrompt>
      )

    // Structural
    case 'table':
      return <WorkflowTable key={index} headers={block.headers} rows={block.rows} />

    // Interactive
    case 'dinoToggle':
      return <DinoToggle key={index} />

    default:
      return assertNever(block)
  }
}

/**
 * Centralized dinoOnly filtering - single source of truth.
 * Renders an array of blocks, optionally filtering out dino-only content.
 */
export function renderBlocks(blocks: Block[], noDinos: boolean = false): ReactElement {
  const filtered = noDinos ? blocks.filter(b => !b.dinoOnly) : blocks
  return <>{filtered.map((block, i) => renderBlock(block, i))}</>
}
