'use client'

import { type JSX, useCallback, useState } from 'react'
import {
  createGraphData,
  type GraphSource,
  getNodeDetails,
  type ProjectSkillGroups,
} from '~/components/tech-stack/graph-data'
import { NodeDetailsPanel } from '~/components/tech-stack/node-details-panel'
import { useElementWidth } from '~/components/tech-stack/use-element-width'
import { useForceGraph } from '~/components/tech-stack/use-force-graph'
import { DESKTOP_QUERY, useMediaQuery } from '~/components/tech-stack/use-media-query'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export interface TechStackGraphProps {
  source: GraphSource
  projectSkills: ProjectSkillGroups
}

const useSelection = (): {
  selectedId: string | null
  select: (id: string | null) => void
  showAllSkills: boolean
  toggleShowAll: () => void
} => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showAllSkills, setShowAllSkills] = useState(false)
  const select = useCallback((id: string | null): void => {
    setSelectedId(id)
    setShowAllSkills(false)
  }, [])
  const toggleShowAll = useCallback((): void => setShowAllSkills(value => !value), [])
  return { selectedId, select, showAllSkills, toggleShowAll }
}

const GraphBox = ({
  boxRef,
  svgRef,
}: {
  boxRef: (element: HTMLDivElement | null) => void
  svgRef: (element: SVGSVGElement | null) => void
}): JSX.Element => (
  <div className="flex-1 min-w-0 overflow-x-auto">
    <div
      ref={boxRef}
      className="border border-gray-800 rounded-lg p-2 sm:p-4 bg-gray-900/30 min-w-[350px]"
    >
      {/* biome-ignore lint/a11y/useSemanticElements: an SVG cannot be a fieldset; group labels the focusable nodes */}
      <svg
        ref={svgRef}
        role="group"
        aria-label="Interactive tech stack graph. Tab through nodes, press Enter or Space to select, Escape to clear."
        className="block max-w-full h-auto mx-auto"
      />
    </div>
  </div>
)

/** The interactive d3 graph plus its details panel. Loaded lazily, desktop only. */
const TechStackGraph = ({ source, projectSkills }: TechStackGraphProps): JSX.Element => {
  const [graph] = useState(() => createGraphData(source))
  const { selectedId, select, showAllSkills, toggleShowAll } = useSelection()
  const [boxRef, boxWidth] = useElementWidth<HTMLDivElement>()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)
  // A hidden box measures 0, so only hand over real widths.
  const width = isDesktop && boxWidth ? boxWidth : null
  const svgRef = useForceGraph({ graph, width, selectedId, onSelect: select, reducedMotion })

  return (
    <div className="hidden sm:flex flex-col lg:flex-row gap-4 sm:gap-8">
      <GraphBox boxRef={boxRef} svgRef={svgRef} />
      <div className="w-full lg:w-80">
        <NodeDetailsPanel
          details={getNodeDetails(graph, selectedId, projectSkills)}
          showAllSkills={showAllSkills}
          onToggleShowAll={toggleShowAll}
          onClose={() => select(null)}
        />
      </div>
    </div>
  )
}

export default TechStackGraph
