import type { JSX } from 'react'
import {
  buildSkillListGroups,
  createGraphData,
  type GraphSource,
  type ProjectSkillGroups,
} from '~/components/tech-stack/graph-data'
import { SkillListDisclosure } from '~/components/tech-stack/skill-list-disclosure'
import { SkillProjectList } from '~/components/tech-stack/skill-project-list'
import { TechStackGraphLoader } from '~/components/tech-stack/tech-stack-graph-loader'
import { groupSkillsByCategory } from '~/lib/project-skills'
import { projects } from '~/lib/projects'
import { techStackLinks, techStackNodes } from '~/lib/techStack'

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

const graphSource: GraphSource = { nodes: techStackNodes, links: techStackLinks }

const buildProjectSkillGroups = (): ProjectSkillGroups =>
  Object.fromEntries(projects.map(project => [project.id, groupSkillsByCategory(project.skills)]))

/**
 * Server shell: the header and the skills-to-projects list render as HTML,
 * and only the d3 graph is a lazily loaded client island.
 */
const TechStackVisualization = (): JSX.Element => (
  <div className="w-full">
    <Header />
    <TechStackGraphLoader source={graphSource} projectSkills={buildProjectSkillGroups()} />
    <SkillListDisclosure listId={LIST_ID}>
      <SkillProjectList id={LIST_ID} groups={buildSkillListGroups(createGraphData(graphSource))} />
    </SkillListDisclosure>
  </div>
)

export default TechStackVisualization
