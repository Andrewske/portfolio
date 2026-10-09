import type { JSX } from 'react'
import {
  colorFor,
  type SkillListEntry,
  type SkillListGroup,
} from '~/components/tech-stack/graph-data'

interface SkillProjectListProps {
  id: string
  groups: SkillListGroup[]
  className?: string
}

const formatYears = (years: number | undefined): string =>
  `${years ?? 0} ${years === 1 ? 'yr' : 'yrs'}`

const SkillItem = ({ entry }: { entry: SkillListEntry }): JSX.Element => (
  <li className="py-2 border-b border-gray-800/70 last:border-b-0">
    <div className="flex items-baseline justify-between gap-3">
      <span className="font-mono text-sm text-white">{entry.node.name}</span>
      <span className="font-mono text-xs text-cyan-400 shrink-0">
        {formatYears(entry.node.experience)}
      </span>
    </div>
    <p className="mt-1 text-xs text-gray-400">
      <span className="text-gray-500">Used in: </span>
      {entry.projects.length > 0
        ? entry.projects.map(project => project.name).join(', ')
        : 'No listed projects'}
    </p>
  </li>
)

const CategorySection = ({ group }: { group: SkillListGroup }): JSX.Element => (
  <section
    aria-label={group.category}
    className="border border-gray-800 rounded-lg p-4 bg-gray-900/30"
  >
    <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
      <span
        aria-hidden="true"
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: colorFor(group.category) }}
      />
      {group.category}
    </h4>
    <ul className="list-none! ml-0! leading-normal!">
      {group.skills.map(entry => (
        <SkillItem key={entry.node.id} entry={entry} />
      ))}
    </ul>
  </section>
)

/** Plain-HTML equivalent of the graph: every skill with the projects that use it. */
export const SkillProjectList = ({
  id,
  groups,
  className = '',
}: SkillProjectListProps): JSX.Element => (
  <div id={id} className={className}>
    <h3 className="text-lg font-bold text-gray-200 mb-4">
      <span className="text-green-400">#</span> Skills and the projects that use them
    </h3>
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map(group => (
        <CategorySection key={group.category} group={group} />
      ))}
    </div>
  </div>
)
