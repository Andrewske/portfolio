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
      { name: "OpenAI API", experience: 90 },
      { name: "Prompt Engineering", experience: 85 },
      { name: "Vector Embeddings", experience: 75 },
      { name: "MCP Protocol", experience: 70 },
    ],
  },
  {
    title: "Backend",
    color: "text-yellow-400",
    skills: [
      { name: "Node.js & Express", experience: 90 },
      { name: "PostgreSQL & MySQL", experience: 85 },
      { name: "Prisma ORM", experience: 80 },
      { name: "RESTful APIs", experience: 90 },
    ],
  },
  {
    title: "Frontend",
    color: "text-purple-400",
    skills: [
      { name: "React & Next.js", experience: 95 },
      { name: "TypeScript", experience: 90 },
      { name: "Tailwind CSS", experience: 90 },
      { name: "Responsive Design", experience: 85 },
    ],
  },
  {
    title: "Data & Cloud",
    color: "text-blue-400",
    skills: [
      { name: "SQL & Query Optimization", experience: 85 },
      { name: "Python & Polars", experience: 80 },
      { name: "AWS & Vercel", experience: 85 },
      { name: "Webhook Architecture", experience: 80 },
    ],
  },
];