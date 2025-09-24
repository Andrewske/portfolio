import { projects, type Project, type ProjectSkill, type SkillCategory, groupSkillsByCategory } from './projects';

export interface Node {
  id: string;
  name: string;
  type: 'skill' | 'project';
  category?: string;
  experience?: number;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  projectsUsing?: string[];
}

export interface Link {
  source: string | Node;
  target: string | Node;
  strength: number;
}

// Generate category groups for visualization
const categoryGroups: Record<SkillCategory | 'project', number> = {
  'project': 1,
  'Languages': 2,
  'AI/ML': 3,
  'Frontend': 4,
  'Backend': 5,
  'Data & Analytics': 6,
  'APIs & Integrations': 7,
  'Infrastructure': 8
};

// Calculate years of experience based on project timeline
function calculateExperience(projectTimelines: string[]): number {
  const currentYear = new Date().getFullYear();
  let earliestYear = currentYear;

  projectTimelines.forEach(timeline => {
    const yearMatch = timeline.match(/(\d{4})/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      if (year < earliestYear) {
        earliestYear = year;
      }
    }
  });

  return Math.max(0.5, currentYear - earliestYear);
}

// Filter to most important/representative skills for cleaner visualization
const coreSkillsFilter = new Set([
  // Languages - core programming languages
  'TypeScript', 'Python', 'JavaScript',

  // AI/ML - your specialization
  'GPT-4', 'OpenAI API', 'MCP Protocol', 'Knowledge Graphs', 'Prompt Engineering', 'Vector Embeddings',
  'Claude Code', 'Agent Architecture',

  // Frontend - main frameworks
  'React', 'Next.js', 'Tailwind CSS',

  // Backend - core technologies
  'Node.js', 'PostgreSQL', 'Prisma', 'FastAPI', 'MySQL',

  // Data & Analytics - key tools
  'Polars', 'SQL Optimization', 'Batch Processing', 'Data Visualization',

  // APIs & Integrations - major integrations
  'Twilio API', 'Smoobu API', 'Zoho CRM API', 'Xendit API',

  // Infrastructure - deployment platforms
  'AWS', 'Vercel', 'Webhook Architecture', 'Performance Optimization'
]);

// Generate nodes dynamically from projects data
function generateTechStackData(): { nodes: Node[], links: Link[] } {
  const skillMap = new Map<string, {
    name: string;
    category: SkillCategory;
    projects: string[];
    proficiencyLevels: string[];
  }>();

  // Extract filtered skills from projects
  projects.forEach(project => {
    project.skills.forEach(skill => {
      // Only include core skills for cleaner visualization
      if (!coreSkillsFilter.has(skill.name)) return;

      if (!skillMap.has(skill.name)) {
        skillMap.set(skill.name, {
          name: skill.name,
          category: skill.category,
          projects: [],
          proficiencyLevels: []
        });
      }

      const skillData = skillMap.get(skill.name)!;
      if (!skillData.projects.includes(project.id)) {
        skillData.projects.push(project.id);
      }
      skillData.proficiencyLevels.push(skill.proficiency);
    });
  });

  // Create project nodes
  const projectNodes: Node[] = projects.map(project => ({
    id: project.id,
    name: project.className,
    type: 'project' as const,
    group: categoryGroups.project,
    x: undefined,
    y: undefined,
    fx: null,
    fy: null
  }));

  // Create skill nodes with calculated experience
  const skillNodes: Node[] = Array.from(skillMap.entries()).map(([skillName, skillData]) => {
    const projectTimelines = skillData.projects.map(projectId => {
      const project = projects.find(p => p.id === projectId);
      return project?.timeline || '';
    });

    const experience = calculateExperience(projectTimelines);

    return {
      id: skillName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: skillName,
      type: 'skill' as const,
      category: skillData.category,
      experience,
      group: categoryGroups[skillData.category] || categoryGroups.Backend,
      projectsUsing: skillData.projects,
      x: undefined,
      y: undefined,
      fx: null,
      fy: null
    };
  });

  // Create links between projects and skills (only for skills that exist in our filtered set)
  const links: Link[] = [];

  projects.forEach(project => {
    project.skills.forEach(skill => {
      // Only create links for skills that passed our filter
      if (!coreSkillsFilter.has(skill.name)) return;

      const skillId = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const strength = skill.proficiency === 'Expert' ? 1.0 :
                     skill.proficiency === 'Proficient' ? 0.8 : 0.6;

      links.push({
        source: project.id,
        target: skillId,
        strength
      });
    });
  });

  return {
    nodes: [...projectNodes, ...skillNodes],
    links
  };
}

// Export generated data
const { nodes, links } = generateTechStackData();
export const techStackNodes = nodes;
export const techStackLinks = links;