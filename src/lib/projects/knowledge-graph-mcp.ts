import type { Project } from '~/lib/projects/types'

export const knowledgeGraphMcp: Project = {
  id: 'knowledge-graph-mcp',
  title: 'KnowledgeGraphMCP',
  className: 'KnowledgeGraphMCP',
  description:
    'AI knowledge graph system for processing personal documents into context for AI agents',
  subtitle: 'Parallel extraction pipeline using AutoSchemaKG framework',
  businessImpact:
    'Enables AI agents to access personal document context through standardized MCP protocol',
  longDescription:
    'Built on AutoSchemaKG framework for automatic knowledge graph construction (https://github.com/HKUST-KnowComp/AutoSchemaKG). I extended the original framework with emotional context extraction because AI agents need to understand personal patterns, work styles, and behavioral tendencies - not just facts and events. Through systematic optimization, I achieved a 68% per-token improvement (64ms/token → 21ms/token) with 70% cost reduction. My architecture processes documents in 67 seconds, prioritizing practical deployment over experimental approaches.',
  architecture:
    '**Pipeline Design**: I built a three-stage pipeline: document input → parallel extractions (entity-entity, entity-event, event-event, emotional context) → concept generation and deduplication → knowledge graph storage. **Processing Architecture**: My parallel processing approach replaced sequential extraction, achieving 21ms per token processing speed. **MCP Implementation**: I designed dual-transport server architecture supporting both STDIO (Claude Code integration) and HTTP (web applications) because different integration contexts need different protocols. **Performance Engineering**: Built comprehensive caching system achieving 100% cache hit rate with atomic database operations for reliability.',
  // architectureDiagramType: 'pipeline-flow',
  // architectureDiagramData: {
  //   title: '3-Stage Knowledge Processing Pipeline',
  //   description: 'EXTRACTION (63s) → CONCEPTS → DEDUPLICATION → STORAGE (0.5s)',
  //   layout: 'horizontal',
  //   nodes: [
  //     { id: 'extraction', label: 'EXTRACTION\\n63s\\nparallel processing', type: 'process', x: 200, y: 200 },
  //     { id: 'concepts', label: 'CONCEPTS\\nclustering\\ndeduplication', type: 'service', x: 500, y: 200 },
  //     { id: 'storage', label: 'STORAGE\\n0.5s\\natomic operations', type: 'database', x: 800, y: 200 }
  //   ],
  //   links: [
  //     { source: 'extraction', target: 'concepts', type: 'flow', animated: true },
  //     { source: 'concepts', target: 'storage', type: 'flow', animated: true }
  //   ],
  // },
  status: 'ACTIVE',
  role: 'Sole developer',
  timeline: 'July 2025 - ongoing',
  scope: 'AI pipeline architecture, knowledge extraction, vector embeddings, MCP protocol',
  metrics: [
    { value: '21ms', label: 'Per Token', color: 'cyan' },
    { value: '67s', label: 'Processing Time', color: 'green' },
    { value: '70%', label: 'Cost Reduction', color: 'yellow' },
    { value: '100%', label: 'Cache Hit Rate', color: 'purple' },
  ],
  safetyAndReliability: [
    'Built comprehensive benchmark reporting: 21ms per token processing with 67s total time',
    'Implemented 100% cache hit rate through unified embedding architecture',
    'Manual review of extraction quality ensures personal context accuracy',
    'Atomic database operations prevent data inconsistencies and reliability issues',
  ],
  aiEvaluation:
    'I selected gpt-4o-mini because my system needs to be economically viable for personal use - experimental models cost 10x more without proportional benefits. I designed domain-specific prompts for four extraction types because emotional context extraction requires different cognitive approaches than standard entity-relationship models. My optimization strategy achieved 68% per-token improvement (64ms/token → 21ms/token) through strategic model selection and parallel processing. I chose practical AI implementation over cutting-edge model exploration because sustainable personal context systems need deployment economics, not research metrics.',
  challenges: [
    'Initial production system suffered catastrophic performance with frequent timeout issues making knowledge graphs unusable for real-time AI agents. Without systematic monitoring, I spent weeks optimizing database queries and vector operations before discovering AI extraction consumed 95% of processing time.',
    'My legacy architecture grew to 2,100+ unmaintainable lines with separate vector tables causing massive API cost overruns. I was embedding the same entities 3-4 times per pipeline without realizing it, and non-atomic database operations created reliability issues that caused data inconsistencies.',
  ],
  solutions: [
    'I built comprehensive phase-by-phase timing instrumentation that revealed the true bottlenecks in my system. My systematic optimization approach included parallel processing architecture and strategic model optimization. This data-driven approach achieved a 68% per-token improvement (64ms/token → 21ms/token) with 70% cost reduction through efficient caching and deduplication.',
    'I completely redesigned the system as a pure functional architecture with zero hidden state and unified embedding storage. My new approach includes comprehensive caching achieving 100% cache hit rate with atomic database operations. Result: clean maintainable architecture with eliminated duplicate processing and reliable data consistency.',
  ],
  lessonsLearned: [
    'I learned that prompt engineering for personal context requires different strategies than business applications - emotional patterns need nuanced extraction techniques that go beyond standard entity-relationship models. Systematic performance monitoring is essential before optimization - I wasted significant time optimizing the wrong components because I lacked proper instrumentation. Building personal AI tools requires understanding individual behavioral patterns, not just technical relationships, which is why I extended AutoSchemaKG with emotional context extraction.',
  ],
  codeExamples: [
    {
      title: 'Advanced Prompt Engineering for Knowledge Graph Extraction',
      impactContext:
        'This type-specific approach improved extraction accuracy by 40% over generic prompts, particularly for temporal and causal relationships in event-event extraction.',
      code: `// Sophisticated prompt engineering for domain-specific knowledge extraction
  export function createTypeSpecificPrompt(data: ProcessKnowledgeArgs, type: string): string {
    const typeDescriptions: Record<string, string> = {
      'entity-entity': 'relationships between people, places, things, or concepts',
      'entity-event': 'how entities are involved in or affected by events',
      'event-event': 'causal, temporal, or logical relationships between events',
      'emotional-context': 'emotional states, feelings, or contextual information',
    };
  
    // Temporal-aware extraction for time-sensitive relationships
    const temporalContext = data.source_date
      ? \`\\n\\nTemporal Context: This text is from \${new Date(data.source_date).toLocaleDateString()}. Consider this temporal context when extracting relationships.\`
      : '';
  
    // Specialized guidance for complex relationship types
    const temporalGuidance = type === 'event-event'
      ? \`\\n\\nFor event-event relationships, pay special attention to:
  - Temporal sequence and ordering
  - Causal connections
  - Duration and timing information
  - Conditional relationships\`
      : '';
  
    return \`Extract \${typeDescriptions[type]} from the following text.
  
  Text: \${data.text}\${temporalContext}\${temporalGuidance}
  
  Respond with a JSON object containing an array of triples.\`;
  }`,
      language: 'typescript',
      technicalExplanation: `**Key Engineering Decisions:**
  • **Domain-specific prompts**: Each relationship type requires different cognitive approaches
  • **Temporal context injection**: Date-aware extraction for time-sensitive relationships
  • **Specialized guidance**: Event-event relationships need causal/temporal reasoning
  • **Scalable type system**: Easy to add new relationship categories`,
    },
  ],
  skills: [
    {
      name: 'TypeScript',
      proficiency: 'Production Daily',
      category: 'Languages',
      usage: 'Built both HTTP and STDIO implementations of MCP protocol',
    },
    {
      name: 'MCP Protocol',
      proficiency: 'Exploring',
      category: 'AI/ML',
      usage: 'Implemented full Model Context Protocol specification with dual transport',
    },
    {
      name: 'Vector Embeddings',
      proficiency: 'Exploring',
      category: 'AI/ML',
      usage: 'Generated semantic embeddings for knowledge graph relationships',
    },
    {
      name: 'OpenAI Models',
      proficiency: 'Production Proven',
      category: 'AI/ML',
      usage: 'Optimized model performance achieving 21ms per token processing',
    },
    {
      name: 'Pipeline Architecture',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: 'Designed 3-stage pipeline achieving 68% per-token improvement',
    },
    {
      name: 'Knowledge Graphs',
      proficiency: 'Exploring',
      category: 'AI/ML',
      usage: 'Extended AutoSchemaKG framework with emotional context extraction',
    },
    {
      name: 'Performance Optimization',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: 'Systematic optimization achieved 100% cache hit rate and 70% cost reduction',
    },
    {
      name: 'Academic Research',
      proficiency: 'Exploring',
      category: 'AI/ML',
      usage: 'Integrated latest research into production implementation',
    },
  ],
  github: 'https://github.com/Andrewske/kg-memory-mcp',
}
