import type { Project } from '~/lib/projects/types'

export const personalManagement: Project = {
  id: 'personal-management',
  title: 'PersonalManagementSystem',
  className: 'PersonalManagementSystem',
  description: 'Custom AI tools for ADHD workflow management and memory assistance',
  subtitle:
    "Telegram bot + specialized Claude Code agents built because standard productivity tools don't work for my brain",
  businessImpact:
    'Solves ADHD-related memory and documentation issues through automated daily journaling and specialized AI coaching',
  longDescription:
    "Built custom productivity system because existing tools don't fit how my brain works. Telegram bot texts me daily to document activities, then uses AI to format entries and saves them to GitHub for Obsidian sync. Specialized Claude Code agents in separate directories handle different domains: career coaching for Anthropic prep, work project management, diet planning with ADHD-aware nutrition guidance. Can't find tools that handle context switching and memory issues properly, so I build my own.",
  architecture:
    "**Telegram Daily Documentation Bot**: Texts me every day asking what I did, then formats my messy responses with OpenAI and commits them to GitHub as markdown files. Evolved from just activity tracking to food journaling and planning to add spending tracking. Had to work around Google Drive OAuth complexity - ended up using GitHub API for simple storage that syncs with Obsidian automatically. **Specialized Claude Code Agents**: Separate directories for different life domains because context switching breaks focus. Career agent has all my achievement documentation and interview prep context. Diet agent knows my ADHD eating patterns and suggests actual meals I'll make. Work agent keeps Bonanza project context separate from personal stuff. Each agent gets its own CLAUDE.md file with domain-specific instructions. **File-Based Context System**: Uses Claude Code's built-in file reading instead of building custom chat interfaces. Simple solution - just cd into the right directory and start a new Claude session. **Memory Integration Plan**: Knowledge Graph MCP will eventually connect all agents so career achievements can inform confidence coaching and diet success can influence mood tracking.",
  status: 'ACTIVE',
  role: 'Sole developer',
  timeline: 'June 2025 - ongoing',
  scope: 'Telegram bot development, ADHD-aware tool design, context management, daily automation',
  metrics: [
    { value: 'Daily', label: 'Documentation', color: 'cyan' },
    { value: '3+', label: 'Life Domains', color: 'yellow' },
    { value: 'GitHub', label: 'Auto Sync', color: 'green' },
    { value: 'ADHD', label: 'Optimized', color: 'purple' },
  ],
  safetyAndReliability: [
    'GitHub storage with automatic markdown formatting',
    'Telegram Bot API handles message reliability',
    'Simple file-based context - no complex databases to break',
    'Each agent isolated in separate directories',
  ],
  aiEvaluation:
    "Built specialized Claude Code agents because standard productivity tools don't handle ADHD context switching. Career Coach keeps achievement documentation and interview prep context. Diet Agent knows my eating patterns and suggests meals I'll actually make. Work Agent separates Bonanza project management from personal stuff. Telegram bot automates the documentation I always forget to do manually. Uses Claude Code's file system instead of building custom interfaces - simpler and more reliable.",
  skills: [
    {
      name: 'Claude Code',
      proficiency: 'Production Daily',
      category: 'AI/ML',
      usage: 'Power user - built custom agent ecosystem for personal productivity',
    },
    {
      name: 'Prompt Engineering',
      proficiency: 'Production Proven',
      category: 'AI/ML',
      usage: 'Advanced specialization techniques for domain-specific agents',
    },
    {
      name: 'Knowledge Management',
      proficiency: 'Working Knowledge',
      category: 'Data & Analytics',
      usage: 'Personal knowledge base beyond traditional coding',
    },
    {
      name: 'MCP Protocol',
      proficiency: 'Exploring',
      category: 'AI/ML',
      usage: 'Leveraged MCP architecture for agent communication',
    },
    {
      name: 'Agent Architecture',
      proficiency: 'Exploring',
      category: 'AI/ML',
      usage: 'Designed multi-agent system with specialized domains',
    },
  ],
}
