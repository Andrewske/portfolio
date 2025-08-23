export interface Skill {
  name: string;
  experience: number; // percentage 0-100
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "AI/ML",
    color: "text-cyan-400",
    skills: [
      { name: "LLMs & Prompt Engineering", experience: 80 },
      { name: "MCP Protocol", experience: 60 },
      { name: "Knowledge Graphs", experience: 70 },
      { name: "Agent Orchestration", experience: 75 },
    ],
  },
  {
    title: "Backend",
    color: "text-yellow-400", 
    skills: [
      { name: "Python & FastAPI", experience: 90 },
      { name: "Node.js & Express", experience: 85 },
      { name: "PostgreSQL & MongoDB", experience: 80 },
      { name: "Prisma ORM", experience: 75 },
    ],
  },
  {
    title: "Frontend",
    color: "text-purple-400",
    skills: [
      { name: "React & Next.js", experience: 90 },
      { name: "TypeScript", experience: 85 },
      { name: "Tailwind CSS", experience: 90 },
      { name: "Performance Optimization", experience: 75 },
    ],
  },
  {
    title: "DevOps",
    color: "text-blue-400",
    skills: [
      { name: "AWS & Cloud Services", experience: 80 },
      { name: "Docker & Containers", experience: 70 },
      { name: "CI/CD Pipelines", experience: 75 },
      { name: "Vercel Deployment", experience: 85 },
    ],
  },
];