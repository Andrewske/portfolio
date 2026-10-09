import type { Project } from '~/lib/projects/types'

export const musicMinionCli: Project = {
  id: 'music-minion-cli',
  title: 'MusicMinionCLI',
  className: 'MusicMinionCLI',
  description: 'Music player CLI built in one day for Claude Code experience',
  subtitle: 'Context-aware music rating system with temporal preference tracking',
  businessImpact:
    'Personal tool showcasing rapid CLI development while solving actual music workflow needs',
  longDescription:
    'Built music player CLI in one day specifically to get hands-on experience with command-line interfaces before applying to Anthropic Claude Code. Ended up solving real problems with my music workflow - goes beyond simple ratings to track listening context and mood patterns. Designed database schema for future AI analysis of music taste evolution over time.',
  architecture:
    "**Single-Day CLI Build**: Python 3.12 with MPV integration for cross-platform audio playback. SQLite database stores contextual listening data beyond traditional 5-star ratings. TOML configuration files keep settings simple and readable. **Context Tracking System**: Records when/where/why I'm listening to specific songs - data structure designed for future machine learning on music preferences. **Modular Design**: Separate modules for player control, library management, and database operations. Built for extensibility even though it was a rapid prototype.",
  status: 'INTERNAL',
  role: 'Sole developer',
  timeline: 'September 2025 - 1 day',
  scope: 'CLI development, audio integration, contextual data modeling',
  metrics: [
    { value: '1 Day', label: 'Build Time', color: 'cyan' },
    { value: 'CLI', label: 'Experience', color: 'yellow' },
    { value: 'Context', label: 'Tracking', color: 'green' },
    { value: 'MPV', label: 'Integration', color: 'purple' },
  ],
  safetyAndReliability: [
    'Cross-platform MPV audio backend',
    'SQLite for reliable data persistence',
    'Modular Python architecture for maintainability',
    'Personal use scope with room for experimentation',
  ],
  skills: [
    {
      name: 'Python',
      proficiency: 'Production Proven',
      category: 'Languages',
      usage: 'Built complete CLI system with modern Python patterns',
    },
    {
      name: 'CLI Development',
      proficiency: 'Exploring',
      category: 'Infrastructure',
      usage: 'Built first CLI project with AI assistance for Claude Code experience',
    },
    {
      name: 'Audio Processing',
      proficiency: 'Exploring',
      category: 'Infrastructure',
      usage: 'MPV integration for music playback and metadata extraction',
    },
    {
      name: 'SQLite',
      proficiency: 'Working Knowledge',
      category: 'Backend',
      usage: 'Context-aware music preference tracking database',
    },
    {
      name: 'Prompt Engineering',
      proficiency: 'Production Proven',
      category: 'AI/ML',
      usage: 'Advanced prompt engineering techniques for music preference tracking',
    },
  ],
}
