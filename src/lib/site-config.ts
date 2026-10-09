export const siteConfig = {
  url: 'https://www.kevinandrews.info',
  name: 'Kevin Andrews',
  title: 'Kevin Andrews - AI Systems Engineer & Full-Stack Developer',
  description:
    'Software engineer specializing in AI systems, data analytics, and full-stack development. Built production systems processing 160M+ records with expertise in Next.js, Python, and machine learning.',
} as const

export const sectionIds = {
  main: 'main-content',
  /** Featured case study. Kept as `projects` so older `/#projects` links still land on the work. */
  projects: 'projects',
  writing: 'writing',
  sideProjects: 'side-projects',
  earlierWork: 'earlier-work',
  stack: 'tech-stack',
  contact: 'contact',
} as const
