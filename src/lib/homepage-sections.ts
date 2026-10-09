import type { Project } from '~/lib/projects'

/**
 * Which projects appear in which homepage section. Grouping lives here, not on
 * the Project type, so the dataset stays presentation-agnostic.
 */
export const homepageSections = {
  featured: 'glade-ai',
  sideProjects: [
    'music-minion-cli',
    'personal-management',
    'ai-product-optimizer',
  ],
  earlierWork: ['analytics-platform', 'masakali-booking', 'zoho-twilio'],
} as const

const EARLIER_WORK_TAG_LIMIT = 3

/** One-line entry for the "Earlier work" list. */
export interface EarlierWorkEntry {
  id: string
  title: string
  summary: string
  timeline: string
  tags: string[]
}

export const findProject = (source: readonly Project[], id: string): Project | undefined =>
  source.find(project => project.id === id)

/** Projects matching `ids`, in the order of `ids`. Unknown ids are skipped. */
export const pickProjects = (source: readonly Project[], ids: readonly string[]): Project[] =>
  ids.flatMap(id => {
    const project = findProject(source, id)
    return project ? [project] : []
  })

export const toEarlierWorkEntry = (project: Project): EarlierWorkEntry => ({
  id: project.id,
  title: project.className,
  summary: project.description,
  timeline: project.timeline,
  tags: project.skills.slice(0, EARLIER_WORK_TAG_LIMIT).map(skill => skill.name),
})
