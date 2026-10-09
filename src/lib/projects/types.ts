import type { ProjectSkill } from '~/lib/project-skills'

export type { ProficiencyLevel, ProjectSkill, SkillCategory } from '~/lib/project-skills'

export interface ProjectMetric {
  value: string
  label: string
  // One-line context shown under the metric on the project detail page
  description?: string
  color?: 'cyan' | 'yellow' | 'green' | 'purple'
}

export interface ProjectCodeExample {
  title: string
  code: string
  language: string
  impactContext?: string
  technicalExplanation?: string
}

export type DiagramType =
  | 'pipeline-flow'
  | 'sequence'
  | 'component'
  | 'state-flow'
  | 'flowchart'
  | 'agent-architecture'

// Extra text rendered on a pipeline stage when a diagram has no coordinates
export interface DiagramNodeMetadata {
  header?: string
  metrics?: string[]
}

export interface DiagramNode {
  id: string
  label: string
  type: 'process' | 'database' | 'api' | 'service' | 'client' | 'decision' | 'state' | 'agent'
  color?: string
  x?: number
  y?: number
  metadata?: DiagramNodeMetadata
}

export interface DiagramLink {
  source: string
  target: string
  label?: string
  type?: 'flow' | 'data' | 'dependency' | 'webhook' | 'api-call' | 'trigger'
  animated?: boolean
  bidirectional?: boolean
}

export interface DiagramData {
  nodes: DiagramNode[]
  links: DiagramLink[]
  layout?: 'horizontal' | 'vertical' | 'radial' | 'force'
  title?: string
  description?: string
}

export type DiagramStageType = 'input' | 'process' | 'storage' | 'output'

// One box in a linear pipeline diagram (SimplePipeline, project visuals)
export interface DiagramStage {
  header?: string
  label: string
  metrics: string[]
  type: DiagramStageType
}

export interface Project {
  id: string
  title: string
  className: string
  description: string
  subtitle: string
  businessImpact: string
  longDescription?: string
  architecture?: string
  architectureDiagramType?: DiagramType
  architectureDiagramData?: DiagramData
  status: 'PRODUCTION' | 'LIVE' | 'ACTIVE' | 'INTERNAL' | 'ARCHIVED'
  role: string
  timeline: string
  scope: string
  metrics: ProjectMetric[]
  skills: ProjectSkill[]
  safetyAndReliability: string[]
  aiEvaluation?: string
  challenges?: string[]
  solutions?: string[]
  lessonsLearned?: string[]
  codeExamples?: ProjectCodeExample[]
  github?: string
  liveUrl?: string
  images?: string[]
}
