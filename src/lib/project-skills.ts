/**
 * Skill types and pure helpers, kept apart from the full `projects` dataset so
 * client components can use them without pulling ~/lib/projects into the bundle.
 */

export type ProficiencyLevel =
  | 'Production Daily'
  | 'Production Proven'
  | 'Working Knowledge'
  | 'Exploring'

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'AI/ML'
  | 'Data & Analytics'
  | 'APIs & Integrations'
  | 'Infrastructure'

export interface ProjectSkill {
  name: string
  proficiency: ProficiencyLevel
  category: SkillCategory
  usage: string
}

export type SkillGroup = [SkillCategory, ProjectSkill[]]

export type CategoryVariant =
  | 'categoryLanguages'
  | 'categoryFrontend'
  | 'categoryBackend'
  | 'categoryAiMl'
  | 'categoryData'
  | 'categoryApis'
  | 'categoryInfrastructure'

const CATEGORY_VARIANTS: Readonly<Record<SkillCategory, CategoryVariant>> = {
  Languages: 'categoryLanguages',
  Frontend: 'categoryFrontend',
  Backend: 'categoryBackend',
  'AI/ML': 'categoryAiMl',
  'Data & Analytics': 'categoryData',
  'APIs & Integrations': 'categoryApis',
  Infrastructure: 'categoryInfrastructure',
}

const CATEGORY_TEXT_COLORS: Readonly<Record<SkillCategory, string>> = {
  Languages: 'text-purple-300',
  Frontend: 'text-blue-300',
  Backend: 'text-yellow-300',
  'AI/ML': 'text-cyan-300',
  'Data & Analytics': 'text-green-300',
  'APIs & Integrations': 'text-orange-300',
  Infrastructure: 'text-red-300',
}

// Display order for grouped skills.
const SKILL_CATEGORY_ORDER: readonly SkillCategory[] = [
  'Languages',
  'Frontend',
  'Backend',
  'AI/ML',
  'Data & Analytics',
  'APIs & Integrations',
  'Infrastructure',
]

export const getCategoryVariant = (category: SkillCategory): CategoryVariant =>
  CATEGORY_VARIANTS[category] ?? 'categoryLanguages'

export const getCategoryColor = (category: SkillCategory): string =>
  CATEGORY_TEXT_COLORS[category] ?? 'text-purple-300'

export const groupSkillsByCategory = (skills: readonly ProjectSkill[]): SkillGroup[] =>
  SKILL_CATEGORY_ORDER.map(
    (category): SkillGroup => [category, skills.filter(skill => skill.category === category)],
  ).filter(([, grouped]) => grouped.length > 0)
