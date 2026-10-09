import type { JSX } from 'react'
import { type GraphNode, type NodeDetails, nodeColor } from '~/components/tech-stack/graph-data'
import {
  getCategoryColor,
  type ProficiencyLevel,
  type ProjectSkill,
  type SkillCategory,
} from '~/lib/projects'

interface NodeDetailsPanelProps {
  details: NodeDetails | null
  showAllSkills: boolean
  onToggleShowAll: () => void
  onClose: () => void
}

const PROFICIENCY_DOT: Record<ProficiencyLevel, string> = {
  'Production Daily': 'bg-green-400',
  'Production Proven': 'bg-yellow-400',
  'Working Knowledge': 'bg-gray-400',
  Exploring: 'bg-gray-400',
}

const DetailsHeader = ({ node }: { node: GraphNode }): JSX.Element => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: nodeColor(node) }} />
    <h3 className="text-xl font-bold text-white">{node.name}</h3>
  </div>
)

const ExperienceBlock = ({ years }: { years: number | undefined }): JSX.Element => (
  <div className="mb-4">
    <div className="text-sm text-gray-400 mb-1">Experience</div>
    <div className="text-cyan-400 font-mono">{years} years</div>
  </div>
)

const SkillCategoryGroup = ({
  category,
  skills,
}: {
  category: SkillCategory
  skills: ProjectSkill[]
}): JSX.Element => (
  <div className="space-y-1">
    <div className={`text-xs font-semibold ${getCategoryColor(category)}`}>{category}</div>
    {skills.map(skill => (
      <div
        key={skill.name}
        className="text-xs text-gray-300 font-mono ml-2 flex items-center gap-2"
      >
        <span className={`w-1 h-1 rounded-full ${PROFICIENCY_DOT[skill.proficiency]}`} />
        {skill.name}
      </div>
    ))}
  </div>
)

const AllSkillsList = ({ groups }: { groups: NodeDetails['allSkills'] }): JSX.Element => (
  <div className="space-y-3 max-h-40 sm:max-h-60 overflow-y-auto">
    {groups.map(([category, skills]) => (
      <SkillCategoryGroup key={category} category={category} skills={skills} />
    ))}
  </div>
)

const ConnectedList = ({ nodes }: { nodes: GraphNode[] }): JSX.Element => (
  <ul className="space-y-1 list-none! ml-0! leading-normal!">
    {nodes.map(node => (
      <li key={node.id} className="text-sm text-gray-300 font-mono">
        • {node.name}
      </li>
    ))}
  </ul>
)

const ConnectionsSection = (
  props: NodeDetailsPanelProps & { details: NodeDetails },
): JSX.Element => {
  const { details, showAllSkills, onToggleShowAll } = props
  const isProject = details.node.type === 'project'
  const canExpand = isProject && details.allSkills.length > 0
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-400">
          {isProject ? 'Technologies Used' : 'Used In Projects'}
        </div>
        {canExpand && (
          <button
            type="button"
            onClick={onToggleShowAll}
            aria-expanded={showAllSkills}
            className="text-xs text-cyan-400 hover:text-cyan-300"
          >
            {showAllSkills ? 'Show Fewer' : 'Show All'}
          </button>
        )}
      </div>
      {canExpand && showAllSkills ? (
        <AllSkillsList groups={details.allSkills} />
      ) : (
        <ConnectedList nodes={details.connected} />
      )}
    </div>
  )
}

const EmptyState = (): JSX.Element => (
  <div className="text-center py-8">
    <div className="text-gray-500 mb-4">
      <svg
        className="w-12 h-12 mx-auto mb-3 opacity-50"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-lg font-bold text-gray-300 mb-2">Explore the Graph</h3>
    <p className="text-sm text-gray-400 mb-4">
      Click on any node to see detailed information about projects and technologies.
    </p>
    <p className="text-xs text-gray-500">
      Hover to highlight connections
      <br />
      Drag nodes to rearrange
      <br />
      Tab to a node, Enter to select, Esc to clear
    </p>
  </div>
)

export const NodeDetailsPanel = (props: NodeDetailsPanelProps): JSX.Element => {
  const { details, onClose } = props
  return (
    <div
      aria-live="polite"
      className="border border-cyan-500/30 rounded-lg p-4 sm:p-6 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 min-h-[250px] sm:min-h-[300px]"
    >
      {details ? (
        <>
          <DetailsHeader node={details.node} />
          {details.node.type === 'skill' && <ExperienceBlock years={details.node.experience} />}
          <ConnectionsSection {...props} details={details} />
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-300"
          >
            Close
          </button>
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
