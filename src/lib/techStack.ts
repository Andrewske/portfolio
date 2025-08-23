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
}

export interface Link {
  source: string | Node;
  target: string | Node;
  strength: number;
}

export const techStackNodes: Node[] = [
  // Projects
  { id: 'knowledge-graph', name: 'Knowledge Graph MCP', type: 'project', group: 1 },
  { id: 'admin-dashboard', name: 'Admin Dashboard', type: 'project', group: 1 },
  { id: 'masakali', name: 'Masakali Payment', type: 'project', group: 1 },
  { id: 'zoho-twilio', name: 'Zoho-Twilio', type: 'project', group: 1 },
  { id: 'multi-agent', name: 'Multi-Agent Notes', type: 'project', group: 1 },

  // AI/ML Skills
  { id: 'llms', name: 'LLMs', type: 'skill', category: 'AI/ML', experience: 2, group: 2 },
  { id: 'mcp', name: 'MCP Protocol', type: 'skill', category: 'AI/ML', experience: 1, group: 2 },
  { id: 'knowledge-graphs', name: 'Knowledge Graphs', type: 'skill', category: 'AI/ML', experience: 1.5, group: 2 },
  { id: 'prompt-eng', name: 'Prompt Engineering', type: 'skill', category: 'AI/ML', experience: 2, group: 2 },

  // Backend Skills
  { id: 'python', name: 'Python', type: 'skill', category: 'Backend', experience: 4, group: 3 },
  { id: 'nodejs', name: 'Node.js', type: 'skill', category: 'Backend', experience: 4, group: 3 },
  { id: 'postgresql', name: 'PostgreSQL', type: 'skill', category: 'Backend', experience: 3, group: 3 },
  { id: 'mongodb', name: 'MongoDB', type: 'skill', category: 'Backend', experience: 2, group: 3 },
  { id: 'prisma', name: 'Prisma', type: 'skill', category: 'Backend', experience: 2, group: 3 },
  { id: 'fastapi', name: 'FastAPI', type: 'skill', category: 'Backend', experience: 2, group: 3 },

  // Frontend Skills
  { id: 'react', name: 'React', type: 'skill', category: 'Frontend', experience: 4, group: 4 },
  { id: 'nextjs', name: 'Next.js', type: 'skill', category: 'Frontend', experience: 3, group: 4 },
  { id: 'typescript', name: 'TypeScript', type: 'skill', category: 'Frontend', experience: 3, group: 4 },
  { id: 'tailwind', name: 'Tailwind CSS', type: 'skill', category: 'Frontend', experience: 3, group: 4 },

  // DevOps Skills
  { id: 'aws', name: 'AWS', type: 'skill', category: 'DevOps', experience: 3, group: 5 },
  { id: 'docker', name: 'Docker', type: 'skill', category: 'DevOps', experience: 2, group: 5 },
  { id: 'vercel', name: 'Vercel', type: 'skill', category: 'DevOps', experience: 3, group: 5 },
];

export const techStackLinks: Link[] = [
  // Knowledge Graph MCP connections
  { source: 'knowledge-graph', target: 'python', strength: 1 },
  { source: 'knowledge-graph', target: 'llms', strength: 1 },
  { source: 'knowledge-graph', target: 'mcp', strength: 1 },
  { source: 'knowledge-graph', target: 'knowledge-graphs', strength: 1 },
  { source: 'knowledge-graph', target: 'fastapi', strength: 0.8 },

  // Admin Dashboard connections
  { source: 'admin-dashboard', target: 'react', strength: 1 },
  { source: 'admin-dashboard', target: 'python', strength: 1 },
  { source: 'admin-dashboard', target: 'postgresql', strength: 1 },
  { source: 'admin-dashboard', target: 'typescript', strength: 1 },
  { source: 'admin-dashboard', target: 'aws', strength: 0.8 },

  // Masakali connections
  { source: 'masakali', target: 'nextjs', strength: 1 },
  { source: 'masakali', target: 'react', strength: 1 },
  { source: 'masakali', target: 'postgresql', strength: 1 },
  { source: 'masakali', target: 'prisma', strength: 1 },
  { source: 'masakali', target: 'typescript', strength: 1 },
  { source: 'masakali', target: 'tailwind', strength: 0.8 },
  { source: 'masakali', target: 'vercel', strength: 0.8 },

  // Zoho-Twilio connections
  { source: 'zoho-twilio', target: 'nextjs', strength: 1 },
  { source: 'zoho-twilio', target: 'postgresql', strength: 1 },
  { source: 'zoho-twilio', target: 'prisma', strength: 1 },
  { source: 'zoho-twilio', target: 'typescript', strength: 1 },
  { source: 'zoho-twilio', target: 'nodejs', strength: 0.8 },

  // Multi-Agent connections
  { source: 'multi-agent', target: 'llms', strength: 1 },
  { source: 'multi-agent', target: 'prompt-eng', strength: 1 },
  { source: 'multi-agent', target: 'knowledge-graphs', strength: 0.8 },
  { source: 'multi-agent', target: 'python', strength: 0.8 },
];