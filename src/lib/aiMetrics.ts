import { projects, Project } from './projects';

export interface AIHighlight {
  value: string;
  label: string;
  color: 'cyan' | 'yellow' | 'green' | 'purple';
  description: string;
}

// Get all AI/ML projects (only projects with AI/ML skills or AI evaluation)
export const getAIProjects = (): Project[] => {
  return projects.filter(project =>
    project.skills.some(skill => skill.category === 'AI/ML') ||
    project.aiEvaluation
  );
};

// Extract key AI metrics for hero section
export const getAIHighlights = (): AIHighlight[] => {
  const aiProjects = getAIProjects();

  return [
    {
      value: `${aiProjects.length}`,
      label: 'AI Systems Built',
      color: 'cyan',
      description: 'Production AI systems deployed from knowledge graphs to optimization pipelines'
    },
    {
      value: '21ms',
      label: 'Per Token Speed',
      color: 'green',
      description: 'Achieved through systematic optimization and parallel processing architecture'
    },
    {
      value: '70%',
      label: 'Cost Reduction',
      color: 'yellow',
      description: 'Average cost optimization across AI systems through strategic model selection'
    },
    {
      value: '$0.00003',
      label: 'Min Cost/Op',
      color: 'purple',
      description: 'Lowest operational cost achieved via batch processing and template systems'
    }
  ];
};

// Get AI project showcase (top 3 for preview)
export const getAIShowcase = (): Project[] => {
  const aiProjects = getAIProjects();
  // Return first 3 in display order
  return aiProjects.slice(0, 3);
};

// Get aggregate AI statistics
export const getAIStats = () => {
  const aiProjects = getAIProjects();

  return {
    totalProjects: aiProjects.length,
    productionSystems: aiProjects.filter(p => p.status === 'PRODUCTION').length,
    activeSystems: aiProjects.filter(p => p.status === 'ACTIVE' || p.status === 'LIVE').length,
    totalYearsExperience: '1+', // Based on active AI development timeline
    frameworks: ['GPT-4', 'AutoSchemaKG', 'Claude Code', 'MCP Protocol'],
    specializations: ['Cost Optimization', 'Knowledge Graphs', 'Agent Systems', 'Performance Engineering']
  };
};