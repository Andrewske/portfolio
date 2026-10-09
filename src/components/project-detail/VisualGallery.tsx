import Image from 'next/image'
import type { ReactNode } from 'react'
import { SimplePipeline } from '~/components/architecture-diagrams/SimplePipeline'
import type { DiagramVisual, ImageVisual, ProjectVisual } from '~/lib/project-visuals'

interface VisualGalleryProps {
  visuals: ProjectVisual[]
}

// Full-width tiles span both columns, so they can request a larger image
const FULL_WIDTH_SIZES = '(min-width: 1536px) 1472px, 100vw'
const HALF_WIDTH_SIZES = '(min-width: 1536px) 724px, (min-width: 768px) 50vw, 100vw'

const fileName = (src: string): string => src.split('/').pop() ?? src

// Odd image counts get a full-width lead tile; diagrams are always full width
const isFullWidth = (visual: ProjectVisual, index: number, total: number): boolean =>
  visual.kind === 'diagram' || (index === 0 && total % 2 === 1)

function WindowFrame({ label, children }: { label: string; children: ReactNode }): ReactNode {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50">
      <div className="flex items-center gap-2 border-b border-gray-800 px-3 py-2 font-mono text-xs text-gray-500">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
        </span>
        <span className="truncate">{label}</span>
      </div>
      {children}
    </div>
  )
}

function Caption({ text }: { text: string }): ReactNode {
  return (
    <figcaption className="mt-3 font-mono text-sm leading-relaxed text-gray-400">
      <span className="text-comment">{'// '}</span>
      {text}
    </figcaption>
  )
}

function ImageFigure({ visual, sizes }: { visual: ImageVisual; sizes: string }): ReactNode {
  return (
    <figure>
      <WindowFrame label={fileName(visual.src)}>
        <a href={visual.src} target="_blank" rel="noopener noreferrer" className="block">
          <Image
            src={visual.src}
            alt={visual.alt}
            width={visual.width}
            height={visual.height}
            sizes={sizes}
            className="h-auto w-full"
          />
          <span className="sr-only">(opens full-size image in a new tab)</span>
        </a>
      </WindowFrame>
      <Caption text={visual.caption} />
    </figure>
  )
}

function DiagramFigure({ visual }: { visual: DiagramVisual }): ReactNode {
  return (
    <figure>
      <WindowFrame label={visual.title}>
        <div role="img" aria-label={visual.description} className="p-2 sm:p-4">
          <SimplePipeline stages={visual.stages} summary={visual.summary} />
        </div>
      </WindowFrame>
      <Caption text={visual.caption} />
    </figure>
  )
}

function VisualTile({
  visual,
  fullWidth,
}: {
  visual: ProjectVisual
  fullWidth: boolean
}): ReactNode {
  return (
    <div className={fullWidth ? 'md:col-span-2' : undefined}>
      {visual.kind === 'image' ? (
        <ImageFigure visual={visual} sizes={fullWidth ? FULL_WIDTH_SIZES : HALF_WIDTH_SIZES} />
      ) : (
        <DiagramFigure visual={visual} />
      )}
    </div>
  )
}

export function VisualGallery({ visuals }: VisualGalleryProps): ReactNode {
  if (visuals.length === 0) return null
  const imageCount = visuals.filter(visual => visual.kind === 'image').length

  return (
    <section className="mb-12" aria-labelledby="visual-evidence-heading">
      <h2
        id="visual-evidence-heading"
        className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2"
      >
        <span className="text-gray-500">{'//'}</span> Visual Evidence
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {visuals.map((visual, index) => (
          <VisualTile
            key={visual.kind === 'image' ? visual.src : visual.title}
            visual={visual}
            fullWidth={isFullWidth(visual, index, imageCount)}
          />
        ))}
      </div>
    </section>
  )
}
