import type { Project } from '~/lib/projects/types'

export const gladeAi: Project = {
  id: 'glade-ai',
  title: 'GladeAI',
  className: 'GladeAI',
  description: 'Code-generation platform that scaled federal court e-filing from 5 to 29 districts',
  subtitle:
    'Turns recorded browser sessions into generated, governed TypeScript automation for bankruptcy court e-filing',
  businessImpact:
    'Grew e-filing coverage from 5 to 29 federal court districts in 7 months and cut median cycle time for new court implementations from 11.5 days to 2.6 days',
  longDescription:
    "Filing documents in US bankruptcy courts means driving PACER, a government web system with no sandbox. You cannot fully test a filing without performing a real one. Each of the 94 federal districts has its own quirks, and the existing approach of hand-coding Playwright automation per court took days to weeks per district. The company needed coverage, and hand-coding did not scale. I built a platform that records a court's filing flow once and generates the automation from that recording, so adding a district became a data problem instead of a coding project.",
  architecture:
    "**Recording to Code**: A court's filing flow is captured as a HAR recording, then a TypeScript automation variant is generated from it. Districts became data, not bespoke code. The pipeline produced 55 production implementations. **Fail-Closed Governance**: Live testing is impossible, so the platform assumes nothing works until proven. Completeness gates in CI block incomplete variants. Production routing sends new work to the new engine with automatic pre-flight fallback to the legacy engine. Terminal failures park for human review instead of retrying. **Telemetry for the Untestable**: Every failure captures durable HAR and trace artifacts, so problems in live filings can be replayed and diagnosed without refiling. **Agent-Assisted Pipeline**: Claude Code skills wrap the variant pipeline (record, generate, review, PR), so other engineers and automated agents ship court integrations through the same governed path. I first-authored most variants, but the pipeline also shipped variants written by teammates and by automation.",
  architectureDiagramType: 'pipeline-flow',
  architectureDiagramData: {
    title: 'Variant Pipeline',
    description: 'Record once, generate the code, gate it in CI, route with a fallback',
    layout: 'horizontal',
    nodes: [
      {
        id: 'record',
        label: 'RECORD',
        type: 'client',
        metadata: { header: 'HAR Capture', metrics: ['court filing flow'] },
      },
      {
        id: 'generate',
        label: 'GENERATE',
        type: 'process',
        metadata: { header: 'Code Generation', metrics: ['TypeScript variant'] },
      },
      {
        id: 'gate',
        label: 'GATE',
        type: 'process',
        metadata: { header: 'CI Completeness', metrics: ['blocks incomplete'] },
      },
      {
        id: 'route',
        label: 'ROUTE',
        type: 'process',
        metadata: {
          header: 'Production Routing',
          metrics: ['new engine first', 'legacy fallback'],
        },
      },
      {
        id: 'park',
        label: 'PARK',
        type: 'state',
        metadata: { header: 'Terminal Failure', metrics: ['human review', 'HAR + trace kept'] },
      },
    ],
    links: [
      { source: 'record', target: 'generate', type: 'flow' },
      { source: 'generate', target: 'gate', type: 'flow' },
      { source: 'gate', target: 'route', type: 'flow' },
      { source: 'route', target: 'park', type: 'flow' },
    ],
  },
  status: 'ACTIVE',
  role: 'Software Engineer',
  timeline: 'Feb 2026 - present',
  scope: 'platform architecture, code generation, browser automation, production safety',
  metrics: [
    { value: '5 → 29', label: 'Court Districts', color: 'cyan' },
    { value: '55', label: 'Generated Variants', color: 'yellow' },
    { value: '4.4x', label: 'Faster Cycle Time', color: 'green' },
    { value: '~760', label: 'Merged PRs', color: 'purple' },
  ],
  safetyAndReliability: [
    'CI completeness gates block incomplete variants before they can merge',
    'Production routing defaults to the new engine with automatic pre-flight fallback to the legacy engine',
    'Terminal failures park for human review instead of retrying against a live court system',
    'Every failure keeps durable HAR and trace artifacts, so live issues can be diagnosed without refiling',
    'A Chrome extension blocks accidental submissions on live court sites, backed by application-level duplicate-filing prevention',
  ],
  challenges: [
    'PACER has no sandbox. There is no way to fully test a filing without performing a real one, so normal test coverage cannot prove a court integration works.',
    'Each of the 94 federal districts behaves slightly differently, and hand-coding Playwright automation per court took days to weeks per district.',
  ],
  solutions: [
    'Designed the platform to fail closed: CI gates, fallback routing, and auto-parking limit the damage of an unknown failure, and failure telemetry makes each one replayable. Fallback routing and auto-parking handled real production failures without manual intervention.',
    'Replaced hand-coded integrations with HAR recording and code generation. Median PR cycle time for new court implementations dropped from 11.5 days to 2.6 days after the platform landed.',
  ],
  lessonsLearned: [
    "Designing for systems you can't test means investing in observability and reversibility instead of pretending test coverage exists.",
    'Code generation beats abstraction when the variation is environmental (94 slightly different government websites) rather than logical.',
    'AI-agent pipelines are only as good as their gates. The interesting engineering was the governance, not the generation.',
  ],
  skills: [
    {
      name: 'TypeScript',
      proficiency: 'Production Daily',
      category: 'Languages',
      usage: 'Generated automation variants and platform services',
    },
    {
      name: 'Node.js',
      proficiency: 'Production Daily',
      category: 'Backend',
      usage: 'Integration services across 6 repositories',
    },
    {
      name: 'Playwright',
      proficiency: 'Production Daily',
      category: 'Backend',
      usage: 'Browser automation against federal court systems',
    },
    {
      name: 'PostgreSQL',
      proficiency: 'Production Daily',
      category: 'Backend',
      usage: 'Filing state and failure tracking',
    },
    {
      name: 'Claude Code',
      proficiency: 'Production Daily',
      category: 'AI/ML',
      usage: 'Agent skills that run the record, generate, review, and PR pipeline',
    },
    {
      name: 'GitHub Actions',
      proficiency: 'Production Daily',
      category: 'Infrastructure',
      usage: 'CI completeness gates for generated variants',
    },
  ],
}
