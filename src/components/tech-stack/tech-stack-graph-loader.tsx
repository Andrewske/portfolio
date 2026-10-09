'use client'

import dynamic from 'next/dynamic'
import type { JSX } from 'react'
import type { TechStackGraphProps } from '~/components/tech-stack/tech-stack-graph'
import { DESKTOP_QUERY, useMediaQuery } from '~/components/tech-stack/use-media-query'

/**
 * Same footprint as the loaded graph, so nothing shifts when d3 arrives.
 * The inner box mirrors `computeDims`: 4:3, at least 400px tall, at most 800x600.
 */
const GraphPlaceholder = (): JSX.Element => (
  <div aria-hidden="true" className="hidden sm:flex flex-col lg:flex-row gap-4 sm:gap-8">
    <div className="flex-1 min-w-0">
      <div className="border border-gray-800 rounded-lg p-2 sm:p-4 bg-gray-900/30 min-w-[350px]">
        <div className="mx-auto w-full max-w-[800px] aspect-[4/3] min-h-[400px] flex items-center justify-center font-mono text-sm text-gray-600">
          $ loading graph...
        </div>
      </div>
    </div>
    <div className="w-full lg:w-80 border border-cyan-500/30 rounded-lg bg-gradient-to-br from-cyan-500/5 to-blue-500/5 min-h-[250px] sm:min-h-[300px]" />
  </div>
)

// ssr: false keeps d3 out of the server render and the initial client bundle.
const TechStackGraph = dynamic(() => import('~/components/tech-stack/tech-stack-graph'), {
  ssr: false,
  loading: GraphPlaceholder,
})

/** Fetches the d3 chunk only on viewports that show the graph (Tailwind `sm` and up). */
export const TechStackGraphLoader = (props: TechStackGraphProps): JSX.Element => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  return isDesktop ? <TechStackGraph {...props} /> : <GraphPlaceholder />
}
