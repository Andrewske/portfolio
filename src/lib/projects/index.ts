import type { ProjectSkill, SkillCategory } from '~/lib/project-skills'
import { aiProductOptimizer } from '~/lib/projects/ai-product-optimizer'
import { analyticsPlatform } from '~/lib/projects/analytics-platform'
import { gladeAi } from '~/lib/projects/glade-ai'
import { knowledgeGraphMcp } from '~/lib/projects/knowledge-graph-mcp'
import { masakaliBooking } from '~/lib/projects/masakali-booking'
import { musicMinionCli } from '~/lib/projects/music-minion-cli'
import { personalManagement } from '~/lib/projects/personal-management'
import type { Project } from '~/lib/projects/types'
import { zohoTwilio } from '~/lib/projects/zoho-twilio'

export {
  getCategoryColor,
  getCategoryVariant,
  groupSkillsByCategory,
} from '~/lib/project-skills'
export type * from '~/lib/projects/types'

// Display order for the homepage, project pages, and sitemap
export const projects: readonly Project[] = [
  gladeAi,
  knowledgeGraphMcp,
  aiProductOptimizer,
  personalManagement,
  analyticsPlatform,
  zohoTwilio,
  masakaliBooking,
  musicMinionCli,
]

const allSkills = (): ProjectSkill[] => projects.flatMap(project => project.skills)

const uniqueSortedNames = (skills: readonly ProjectSkill[]): string[] =>
  Array.from(new Set(skills.map(skill => skill.name))).sort()

export const getAllSkills = (): string[] => uniqueSortedNames(allSkills())

export const getSkillsByCategory = (category: SkillCategory): string[] =>
  uniqueSortedNames(allSkills().filter(skill => skill.category === category))

export const getProjectsBySkill = (skillName: string): Project[] =>
  projects.filter(project => project.skills.some(skill => skill.name === skillName))

export const getProjectsByCategory = (category: SkillCategory): Project[] =>
  projects.filter(project => project.skills.some(skill => skill.category === category))

export const getProjectById = (id: string): Project | undefined =>
  projects.find(project => project.id === id)
