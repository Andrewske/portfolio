import type { Project } from '~/lib/projects'

/** The slice of a project the homepage card renders. No code examples or diagrams. */
export type ProjectCardData = Pick<
  Project,
  | 'id'
  | 'className'
  | 'subtitle'
  | 'timeline'
  | 'businessImpact'
  | 'status'
  | 'metrics'
  | 'skills'
  | 'aiEvaluation'
  | 'github'
  | 'liveUrl'
> & { isAI: boolean }

const isAIProject = (project: Project): boolean =>
  project.skills.some(skill => skill.category === 'AI/ML') || Boolean(project.aiEvaluation)

export const toProjectCardData = (project: Project): ProjectCardData => ({
  id: project.id,
  className: project.className,
  subtitle: project.subtitle,
  timeline: project.timeline,
  businessImpact: project.businessImpact,
  status: project.status,
  metrics: project.metrics,
  skills: project.skills,
  aiEvaluation: project.aiEvaluation,
  github: project.github,
  liveUrl: project.liveUrl,
  isAI: isAIProject(project),
})
