'use client'

import { type JSX, useCallback, useMemo, useState } from 'react'
import {
  buildSkillListGroups,
  createGraphData,
  getNodeDetails,
} from '~/components/tech-stack/graph-data'
import { NodeDetailsPanel } from '~/components/tech-stack/node-details-panel'
import { SkillProjectList } from '~/components/tech-stack/skill-project-list'
import { useElementWidth } from '~/components/tech-stack/use-element-width'
import { useForceGraph } from '~/components/tech-stack/use-force-graph'
import { useMediaQuery } from '~/components/tech-stack/use-media-query'

// Matches Tailwind's `sm` breakpoint so CSS and JS agree on the first paint.
const DESKTOP_QUERY = '(min-width: 640px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const LIST_ID = 'tech-stack-list'

const Header = (): JSX.Element => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-white mb-2">
      <span className="text-green-400">$</span> visualize tech-stack --interactive
    </h2>
    <p className="text-gray-400 hidden sm:block">
      Click nodes to explore connections • Drag to rearrange
    </p>
    <p className="text-gray-400 sm:hidden">
      Skills grouped by category, with the projects that use them
    </p>
  </div>
)

const ListToggle = ({ open, onToggle }: { open: boolean; onToggle: () => void }): JSX.Element => (
  <button
    type="button"
    onClick={onToggle}
    aria-expanded={open}
    aria-controls={LIST_ID}
    className="hidden sm:inline-flex mt-4 font-mono text-sm text-cyan-400 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-300 rounded"
  >
    {open ? '$ hide --list' : '$ show --list (text version of this graph)'}
  </button>
)

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

const TechStackVisualization = (): JSX.Element => {
  const [graph] = useState(createGraphData)
  const listGroups = useMemo(() => buildSkillListGroups(graph), [graph])
  const { selectedId, select, showAllSkills, toggleShowAll } = useSelection()
  const [showList, setShowList] = useState(false)
  const [boxRef, boxWidth] = useElementWidth<HTMLDivElement>()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)
  const svgRef = useForceGraph({
    graph,
    // A hidden box measures 0, so only hand over real widths.
    width: isDesktop && boxWidth ? boxWidth : null,
    selectedId,
    onSelect: select,
    reducedMotion,
  })

  return (
    <div className="w-full">
      <Header />
      <div className="hidden sm:flex flex-col lg:flex-row gap-4 sm:gap-8">
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
        <div className="w-full lg:w-80">
          <NodeDetailsPanel
            details={getNodeDetails(graph, selectedId)}
            showAllSkills={showAllSkills}
            onToggleShowAll={toggleShowAll}
            onClose={() => select(null)}
          />
        </div>
      </div>
      <ListToggle open={showList} onToggle={() => setShowList(open => !open)} />
      <SkillProjectList
        id={LIST_ID}
        groups={listGroups}
        className={showList ? 'mt-6' : 'sm:hidden'}
      />
    </div>
  )
}

export default TechStackVisualization
