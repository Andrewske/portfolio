import { projects, type SkillCategory, } from './projects';

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
      const year = parseInt(yearMatch[1], 10);
      if (year < earliestYear) {
        earliestYear = year;
      }
    }
  });

  return Math.max(0.5, currentYear - earliestYear);
}

// Filter to most important/representative skills for cleaner visualization
// Prioritized for hiring manager appeal, especially on mobile displays
const coreSkillsFilter = new Set([
  // Languages - core programming languages
  'TypeScript', 'Python', 'JavaScript',

  // AI/ML - your specialization (high appeal for AI roles)
  'OpenAI Models', 'Prompt Engineering', 'Vector Embeddings', 'Knowledge Graphs',
  'MCP Protocol', 'Agent Architecture', 'Cost Optimization', 'Academic Research',

  // Frontend - main frameworks
  'React', 'Next.js', 'Tailwind CSS',

  // Backend - core technologies
  'Node.js', 'PostgreSQL', 'Prisma', 'FastAPI', 'MySQL', 'Express.js',

  // Data & Analytics - key tools
  'Polars', 'SQL Optimization', 'Batch Processing', 'Data Visualization', 'Pipeline Architecture',

  // Infrastructure - deployment and performance
  'AWS', 'Vercel', 'Performance Optimization', 'Multi-tenant Architecture'
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

      const skillData = skillMap.get(skill.name);
      if (!skillData) return;
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
      const strength = skill.proficiency === 'Production Daily' ? 1.0 :
                     skill.proficiency === 'Production Proven' ? 0.8 :
                     skill.proficiency === 'Working Knowledge' ? 0.6 : 0.4;

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