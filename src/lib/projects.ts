export type ProficiencyLevel = 'Expert' | 'Proficient' | 'Familiar';

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'AI/ML'
  | 'Data & Analytics'
  | 'APIs & Integrations'
  | 'Infrastructure';

export interface ProjectSkill {
  name: string;
  proficiency: ProficiencyLevel;
  category: SkillCategory;
  usage: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  color?: 'cyan' | 'yellow' | 'green' | 'purple';
}

export interface Project {
  id: string;
  title: string;
  className: string;
  description: string;
  subtitle: string;
  businessImpact: string;
  longDescription?: string;
  status: 'PRODUCTION' | 'LIVE' | 'ACTIVE' | 'INTERNAL';
  role: string;
  timeline: string;
  scope: string;
  metrics: ProjectMetric[];
  skills: ProjectSkill[];
  safetyAndReliability: string[];
  github?: string;
  liveUrl?: string;
  detailPageUrl?: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    id: 'analytics-platform',
    title: 'AnalyticsPlatform',
    className: 'AnalyticsPlatform',
    description: 'Full-stack analytics platform processing 160M+ order records',
    subtitle: 'High-performance analytics system processing 160M+ records with sub-second query times',
    businessImpact: 'Enabled real-time business intelligence for multi-million dollar operations',
    longDescription: 'Architected full-stack analytics platform processing 160M+ order records from legacy MySQL 5.7 database, optimizing query performance from 10+ minutes to under 5 minutes using Polars and advanced SQL techniques.',
    status: 'LIVE',
    role: 'Sole developer',
    timeline: 'Aug 2023 - ongoing',
    scope: 'architecture, backend, data optimization, performance tuning',
    metrics: [
      { value: '160M+', label: 'Records', color: 'cyan' },
      { value: '50%', label: 'Query Speedup', color: 'yellow' },
      { value: '13', label: 'Internal Views', color: 'green' },
      { value: '5min', label: 'Query Time', color: 'purple' }
    ],
    safetyAndReliability: [
      'Zod schema validation for route parameters with fallback values',
      'MySQL 5.7 optimization: subqueries + Polars for 50% performance gain',
      'Parquet caching layer: 20min → 5min incremental updates',
      'Rollbar email alerts for bi-hourly update failures'
    ],
    skills: [
      {
        name: 'React',
        proficiency: 'Expert',
        category: 'Frontend',
        usage: 'Built complex dashboards with 13 internal views for data visualization'
      },
      {
        name: 'TypeScript',
        proficiency: 'Expert',
        category: 'Languages',
        usage: 'Ensured type safety across the entire full-stack application'
      },
      {
        name: 'Polars',
        proficiency: 'Expert',
        category: 'Data & Analytics',
        usage: 'Optimized data processing from 10+ min to under 5 min for 160M+ records'
      },
      {
        name: 'MySQL',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'Advanced query optimization on legacy MySQL 5.7 with read-only constraints'
      },
      {
        name: 'SQL Optimization',
        proficiency: 'Expert',
        category: 'Data & Analytics',
        usage: 'Reduced query times by 50% through advanced indexing and query restructuring'
      },
      {
        name: 'Tanstack Router/Query',
        proficiency: 'Proficient',
        category: 'Frontend',
        usage: 'Implemented complex routing and data fetching patterns'
      },
      {
        name: 'AWS',
        proficiency: 'Proficient',
        category: 'Infrastructure',
        usage: 'Deployed scalable multi-tenant architecture on AWS'
      },
      {
        name: 'Express.js',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'Built secure REST APIs with authentication and private routing'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'Designed multi-tenant database architecture for B2B customers'
      },
      {
        name: 'Data Visualization',
        proficiency: 'Expert',
        category: 'Data & Analytics',
        usage: 'Created intuitive charts and graphs for complex business metrics'
      }
    ],
    detailPageUrl: '/admin-dashboard',
    github: 'https://github.com'
  },
  {
    id: 'masakali-booking',
    title: 'MasakaliBookingPlatform',
    className: 'MasakaliBookingPlatform',
    description: 'Production booking platform with real-time inventory sync',
    subtitle: 'Multi-tenant booking platform eliminating double-bookings and recovering $30k+/month',
    businessImpact: 'Zero double-bookings across 43k+ messages and thousands of bookings',
    longDescription: 'Built production booking platform from scratch with React/Redux → Next.js migration. Integrated real-time inventory sync across Booking.com, Airbnb via Smoobu API. Processed $30K in direct revenue with zero double-bookings.',
    status: 'PRODUCTION',
    role: 'Sole developer',
    timeline: 'July 2020 - ongoing',
    scope: 'full-stack development, payment integration, booking system, multi-tenant architecture',
    metrics: [
      { value: '$30k+', label: 'Revenue', color: 'cyan' },
      { value: '0', label: 'Double Bookings', color: 'yellow' },
      { value: 'Instant', label: 'Sync Updates', color: 'green' },
      { value: '5', label: 'Listings', color: 'purple' }
    ],
    safetyAndReliability: [
      'Zero double-bookings via Smoobu API real-time validation',
      'Webhook-based availability updates prevent conflicts',
      'PostHog error logging for API integration monitoring',
      'Payment processing via secure third-party APIs'
    ],
    skills: [
      {
        name: 'Next.js',
        proficiency: 'Expert',
        category: 'Frontend',
        usage: 'Migrated from React/Redux to Next.js for better performance and SEO'
      },
      {
        name: 'Redux',
        proficiency: 'Proficient',
        category: 'Frontend',
        usage: 'Managed complex booking state before Next.js migration'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Proficient',
        category: 'Backend',
        usage: 'Stored booking data with complex availability logic for 5 listings'
      },
      {
        name: 'Smoobu API',
        proficiency: 'Expert',
        category: 'APIs & Integrations',
        usage: 'Real-time inventory sync across Booking.com and Airbnb'
      },
      {
        name: 'Xendit API',
        proficiency: 'Proficient',
        category: 'APIs & Integrations',
        usage: 'Integrated Indonesian payment processor with limited documentation'
      },
      {
        name: 'Webhook Architecture',
        proficiency: 'Expert',
        category: 'Infrastructure',
        usage: 'Replaced polling with webhooks: 3+ seconds → instant updates'
      },
      {
        name: 'TypeScript',
        proficiency: 'Expert',
        category: 'Languages',
        usage: 'Type-safe API integrations and complex booking logic'
      },
      {
        name: 'Real-time Sync',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'Zero double-bookings through instant inventory synchronization'
      },
      {
        name: 'Multi-CDN',
        proficiency: 'Proficient',
        category: 'Infrastructure',
        usage: 'Image optimization across multiple CDN providers'
      }
    ],
    detailPageUrl: '/masakali',
    github: 'https://github.com/Andrewske/masakali-t3'
  },
  {
    id: 'zoho-twilio',
    title: 'ZohoTwilioIntegration',
    className: 'ZohoTwilioIntegration',
    description: 'Production SMS system enabling 12 studios to engage 9,000+ leads',
    subtitle: 'Real-time CRM-SMS integration with automated lead engagement',
    businessImpact: 'Automated SMS workflows reducing manual lead processing time by 80%',
    longDescription: 'Built production SaaS platform as solo engineer: Full-stack SMS system enabling 12 studios to engage 9,000+ leads directly from Zoho CRM, processing 43,000+ messages. Shipped end-to-end solution in 4 weeks.',
    status: 'PRODUCTION',
    role: 'Sole developer',
    timeline: 'Nov 2023 - ongoing',
    scope: 'API integration, webhook handling, multi-tenant SMS delivery, error tracking',
    metrics: [
      { value: '43k+', label: 'Total Messages', color: 'cyan' },
      { value: '9k+', label: 'Leads Engaged', color: 'yellow' },
      { value: '12', label: 'Active Studios', color: 'green' },
      { value: '4wks', label: 'Ship Time', color: 'purple' }
    ],
    safetyAndReliability: [
      'Multi-tenant data isolation via Studios table architecture',
      'Phone number validation for webhook authentication',
      'STOP message parsing for SMS compliance',
      'PostHog monitoring for production error tracking'
    ],
    skills: [
      {
        name: 'Next.js',
        proficiency: 'Expert',
        category: 'Frontend',
        usage: 'Built full-stack SaaS platform with custom Zoho CRM extension'
      },
      {
        name: 'TypeScript',
        proficiency: 'Expert',
        category: 'Languages',
        usage: 'Type-safe multi-tenant routing logic and API integrations'
      },
      {
        name: 'Prisma',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'ORM for PostgreSQL with complex multi-tenant data models'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'Stored 43k+ messages with studio-specific partitioning'
      },
      {
        name: 'Twilio API',
        proficiency: 'Expert',
        category: 'APIs & Integrations',
        usage: 'Dynamic routing between studio-specific phone numbers'
      },
      {
        name: 'Zoho CRM API',
        proficiency: 'Expert',
        category: 'APIs & Integrations',
        usage: 'Custom CRM extension with intuitive chat interface'
      },
      {
        name: 'Webhook Architecture',
        proficiency: 'Expert',
        category: 'Infrastructure',
        usage: 'Real-time message synchronization and automated sequences'
      },
      {
        name: 'Multi-tenant Architecture',
        proficiency: 'Expert',
        category: 'Infrastructure',
        usage: 'Complex routing logic based on agent context and permissions'
      },
      {
        name: 'Sentry',
        proficiency: 'Proficient',
        category: 'Infrastructure',
        usage: 'Production monitoring and rapid issue resolution'
      },
      {
        name: 'Rapid Prototyping',
        proficiency: 'Expert',
        category: 'Infrastructure',
        usage: 'Shipped complete solution in 4 weeks as solo engineer'
      }
    ],
    detailPageUrl: '/zoho-twilio',
    github: 'https://github.com/Andrewske/zoho_twilio_integration_t3'
  },
  {
    id: 'ai-product-optimizer',
    title: 'AIProductOptimizer',
    className: 'AIProductOptimizer',
    description: 'Batch processing system using GPT-4o-mini for e-commerce optimization',
    subtitle: 'LLM-powered e-commerce optimization with cost-performance analysis',
    businessImpact: 'Achieved 63% cost reduction while maintaining 90%+ accuracy through model optimization',
    longDescription: 'Developed AI-powered listing optimization tool using OpenAI batch API to enhance 4,500 product titles in 30 minutes at $0.00003/listing, improving marketplace SEO and conversion rates.',
    status: 'PRODUCTION',
    role: 'Sole developer',
    timeline: 'July 2025 - ongoing',
    scope: 'LLM evaluation, model comparison, cost optimization, experimental approaches',
    metrics: [
      { value: '4.5k', label: 'Listings/30min', color: 'cyan' },
      { value: '$0.00003', label: 'Cost/Item', color: 'yellow' },
      { value: 'Linear', label: 'Scaling', color: 'green' },
      { value: '30min', label: 'Batch Time', color: 'purple' }
    ],
    safetyAndReliability: [
      'Manual validation for experimental/development phase',
      'Token usage tracking for cost scaling analysis',
      'Manual error management during model optimization',
      'Quality assurance through manual review process'
    ],
    skills: [
      {
        name: 'Python',
        proficiency: 'Proficient',
        category: 'Languages',
        usage: 'Built batch processing pipeline for 4.5k listings'
      },
      {
        name: 'OpenAI API',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Optimized GPT-4o-mini for cost-effective title generation'
      },
      {
        name: 'Batch Processing',
        proficiency: 'Expert',
        category: 'Data & Analytics',
        usage: 'Linear scaling architecture processing 4.5k items in 30 minutes'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Proficient',
        category: 'Backend',
        usage: 'Stored optimized product data and processing metrics'
      },
      {
        name: 'Cost Optimization',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Achieved $0.00003 per item through prompt engineering'
      },
      {
        name: 'GPT-4',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Fine-tuned prompts for e-commerce SEO optimization'
      }
    ]
  },
  {
    id: 'knowledge-graph-mcp',
    title: 'KnowledgeGraphMCP',
    className: 'KnowledgeGraphMCP',
    description: 'Production AI system processing documents into semantic knowledge graphs',
    subtitle: 'Semantic knowledge extraction pipeline with vector embeddings',
    businessImpact: 'Processes 8k+ character documents in 94 seconds with $0.0012 cost per operation',
    longDescription: 'Production AI system with 3-stage distributed pipeline: extraction → concepts → vector embeddings. 85-second processing, $0.00002/document, 106 triples + 424 embeddings per doc. Built both HTTP and STDIO versions following MCP protocol.',
    status: 'PRODUCTION',
    role: 'Sole developer',
    timeline: 'June 2025 - ongoing',
    scope: 'AI pipeline architecture, knowledge extraction, vector embeddings, MCP protocol',
    metrics: [
      { value: '530', label: 'Embeddings/Doc', color: 'cyan' },
      { value: '$0.00002', label: 'Cost per Document', color: 'yellow' },
      { value: '85s', label: 'Processing Time', color: 'green' },
      { value: '106', label: 'Triples/Doc', color: 'purple' }
    ],
    safetyAndReliability: [
      'Detailed benchmark reporting: $0.0012 cost, 94s processing',
      'Per-operation token usage monitoring and cost tracking',
      'Manual review of extraction quality and results',
      'Pipeline failure logging without automatic retries'
    ],
    skills: [
      {
        name: 'TypeScript',
        proficiency: 'Expert',
        category: 'Languages',
        usage: 'Built both HTTP and STDIO implementations of MCP protocol'
      },
      {
        name: 'MCP Protocol',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Implemented full Model Context Protocol specification'
      },
      {
        name: 'Vector Embeddings',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Generated 424 semantic embeddings per document'
      },
      {
        name: 'GPT-4',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Evaluated model variants for optimal pipeline performance'
      },
      {
        name: 'Pipeline Architecture',
        proficiency: 'Expert',
        category: 'Infrastructure',
        usage: '3-stage distributed pipeline for knowledge extraction'
      },
      {
        name: 'Knowledge Graphs',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Extracted 106 semantic triples per document'
      },
      {
        name: 'Academic Research',
        proficiency: 'Proficient',
        category: 'AI/ML',
        usage: 'Integrated latest research into production implementation'
      }
    ],
    github: 'https://github.com/Andrewske/kg-memory-mcp'
  },
  {
    id: 'personal-management',
    title: 'PersonalManagementSystem',
    className: 'PersonalManagementSystem',
    description: 'Custom AI agent ecosystem for multi-project workflows',
    subtitle: 'Specialized AI agent platform for domain-specific assistance',
    businessImpact: 'Context-aware AI agents providing personalized guidance across career, finance, and health domains',
    longDescription: 'Custom AI agent ecosystem using Claude Code for multi-project workflows. Built domain-specific agents: career coaching, technical documentation, project management. Advanced prompt engineering and agent specialization techniques.',
    status: 'ACTIVE',
    role: 'Sole developer',
    timeline: 'June 2025 - ongoing',
    scope: 'agent architecture, context management, specialized AI assistants, workflow automation',
    metrics: [
      { value: 'Career', label: 'Coaching Agent', color: 'cyan' },
      { value: 'Tech', label: 'Docs Agent', color: 'yellow' },
      { value: 'Project', label: 'Management', color: 'green' },
      { value: 'MCP', label: 'Architecture', color: 'purple' }
    ],
    safetyAndReliability: [
      'Agent isolation via folder-based context separation',
      'File-based permissions using claude.md configurations',
      'Claude Code built-in conversation history management',
      'Personal project scope with controlled data input'
    ],
    skills: [
      {
        name: 'Claude Code',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Built custom agent ecosystem for personal productivity'
      },
      {
        name: 'Prompt Engineering',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Advanced specialization techniques for domain-specific agents'
      },
      {
        name: 'Knowledge Management',
        proficiency: 'Expert',
        category: 'Data & Analytics',
        usage: 'Personal knowledge base beyond traditional coding'
      },
      {
        name: 'MCP Protocol',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Leveraged MCP architecture for agent communication'
      },
      {
        name: 'Agent Architecture',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Designed multi-agent system with specialized domains'
      }
    ]
  }
];

export const getAllSkills = (): string[] => {
  const skillSet = new Set<string>();
  projects.forEach(project => {
    project.skills.forEach(skill => {
      skillSet.add(skill.name);
    });
  });
  return Array.from(skillSet).sort();
};

export const getSkillsByCategory = (category: SkillCategory): string[] => {
  const skillSet = new Set<string>();
  projects.forEach(project => {
    project.skills
      .filter(skill => skill.category === category)
      .forEach(skill => skillSet.add(skill.name));
  });
  return Array.from(skillSet).sort();
};

export const getProjectsBySkill = (skillName: string): Project[] => {
  return projects.filter(project =>
    project.skills.some(skill => skill.name === skillName)
  );
};

export const getProjectsByCategory = (category: SkillCategory): Project[] => {
  return projects.filter(project =>
    project.skills.some(skill => skill.category === category)
  );
};

export const getCategoryVariant = (category: SkillCategory) => {
  switch (category) {
    case 'Languages':
      return 'categoryLanguages';
    case 'Frontend':
      return 'categoryFrontend';
    case 'Backend':
      return 'categoryBackend';
    case 'AI/ML':
      return 'categoryAiMl';
    case 'Data & Analytics':
      return 'categoryData';
    case 'APIs & Integrations':
      return 'categoryApis';
    case 'Infrastructure':
      return 'categoryInfrastructure';
    default:
      return 'categoryLanguages';
  }
};

export const getCategoryColor = (category: SkillCategory) => {
  switch (category) {
    case 'Languages':
      return 'text-purple-300';
    case 'Frontend':
      return 'text-blue-300';
    case 'Backend':
      return 'text-yellow-300';
    case 'AI/ML':
      return 'text-cyan-300';
    case 'Data & Analytics':
      return 'text-green-300';
    case 'APIs & Integrations':
      return 'text-orange-300';
    case 'Infrastructure':
      return 'text-red-300';
    default:
      return 'text-purple-300';
  }
};

export const groupSkillsByCategory = (skills: ProjectSkill[]) => {
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, ProjectSkill[]>);

  // Sort categories in a logical order
  const categoryOrder: SkillCategory[] = [
    'Languages',
    'Frontend',
    'Backend',
    'AI/ML',
    'Data & Analytics',
    'APIs & Integrations',
    'Infrastructure'
  ];

  const sortedGrouped: [SkillCategory, ProjectSkill[]][] = [];
  categoryOrder.forEach(category => {
    if (grouped[category]) {
      sortedGrouped.push([category, grouped[category]]);
    }
  });

  return sortedGrouped;
};