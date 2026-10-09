// Visual evidence for project detail pages, keyed by project id.
// Captions and diagram stages restate facts from each project's file in src/lib/projects/;
// update them together so the visuals never claim more than the written content.

import type { DiagramStage } from '~/lib/projects/types'

export type { DiagramStage, DiagramStageType } from '~/lib/projects/types'

export interface ImageVisual {
  kind: 'image'
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export interface DiagramVisual {
  kind: 'diagram'
  title: string
  caption: string
  // Full text equivalent of the diagram, read by screen readers in place of the boxes
  description: string
  stages: DiagramStage[]
  summary?: string[]
}

export type ProjectVisual = ImageVisual | DiagramVisual

// All dashboard and Masakali screenshots were captured at the same resolution
const WIDE_SCREENSHOT = { width: 2560, height: 1271 } as const

const analyticsPlatformVisuals: ProjectVisual[] = [
  {
    kind: 'image',
    src: '/images/AdminDashboard/bonanza_admin_dashboard_summary_page.png',
    alt: 'Bonanza executive summary dashboard with offers, GMV, final value fees, active booths, membership breakdown, other revenue and top traffic sources for July 2023',
    caption:
      'Executive summary view: offers, GMV, fees and membership mix for a chosen date range, with period-over-period change. These numbers used to require manual database queries.',
    ...WIDE_SCREENSHOT,
  },
  {
    kind: 'image',
    src: '/images/AdminDashboard/bonanza_admin_dashboard_activated_page.png',
    alt: 'Seller activation dashboard showing a signup funnel by last completed step, a daily bar chart of initial and duplicate booth activations, and a lifetime value table',
    caption:
      'Seller activation view: where sellers stop in signup, daily booth activations, and estimated lifetime value per booth.',
    ...WIDE_SCREENSHOT,
  },
  {
    kind: 'image',
    src: '/images/AdminDashboard/bonanza_admin_dashboard_memberships_page.png',
    alt: 'Memberships dashboard with counts per membership tier and a stacked daily bar chart of memberships by tier across July 2023',
    caption:
      'Memberships view: tier counts with monthly and annual splits, plus a daily stacked history across the selected date range.',
    ...WIDE_SCREENSHOT,
  },
  {
    kind: 'image',
    src: '/images/AdminDashboard/vercado_admin_dashboard_backorders_page.png',
    alt: 'Vercado backorders dashboard with totals for orders, customers and products on back order, above a searchable order table with a CSV download button',
    caption:
      'Backorders view for Vercado, a second business served by the platform: back-order totals above a searchable order table with CSV export.',
    ...WIDE_SCREENSHOT,
  },
]

const masakaliVisuals: ProjectVisual[] = [
  {
    kind: 'image',
    src: '/images/Masakali/masakali_villas_main_image.png',
    alt: 'Surya Villa booking page with selected arrival and departure dates, a price breakdown in Indonesian rupiah, and a Book Surya button beside a photo gallery',
    caption:
      'Villa booking page: guests pick dates and get a price breakdown (nightly rate, discount, taxes) in IDR before checkout.',
    ...WIDE_SCREENSHOT,
  },
  {
    kind: 'image',
    src: '/images/Masakali/masakali_villas_details.png',
    alt: 'Surya Villa details section listing included amenities, key details such as one bedroom and a private infinity pool, and bookable extras',
    caption:
      'Villa details: amenities, key facts and bookable extras for each of the properties managed by the platform.',
    ...WIDE_SCREENSHOT,
  },
]

const zohoTwilioVisuals: ProjectVisual[] = [
  {
    kind: 'image',
    src: '/images/ZohoTwilio/zoho_twilio_screenshot.png',
    alt: 'Zoho CRM lead record with an embedded Twilio SMS panel showing an outbound studio message that asks the lead to reply YES to book or STOP to opt out',
    caption:
      'SMS panel inside a Zoho CRM lead record: the studio texts the lead from its own number, and YES / STOP replies drive the automated workflows.',
    width: 1918,
    height: 908,
  },
]

const gladeVisuals: ProjectVisual[] = [
  {
    kind: 'diagram',
    title: 'fail-closed-routing',
    caption:
      'Production routing: new work goes to the new engine first, falls back to the legacy engine on pre-flight failure, and parks terminal failures for a human instead of retrying against a live court.',
    description:
      'Fail-closed routing flow. A filing is routed to the new engine first. If its pre-flight check fails, it falls back automatically to the legacy engine. A terminal failure is parked for human review rather than retried. Every failure keeps HAR and trace artifacts so it can be replayed without refiling.',
    stages: [
      { header: 'Filing Request', label: 'ROUTE', metrics: ['new engine first'], type: 'input' },
      {
        header: 'Pre-flight',
        label: 'NEW ENGINE',
        metrics: ['generated variant'],
        type: 'process',
      },
      {
        header: 'On pre-flight failure',
        label: 'FALLBACK',
        metrics: ['legacy engine'],
        type: 'process',
      },
      {
        header: 'Terminal Failure',
        label: 'PARK',
        metrics: ['human review', 'no retry'],
        type: 'output',
      },
      {
        header: 'Telemetry',
        label: 'ARTIFACTS',
        metrics: ['HAR + trace', 'replay, no refile'],
        type: 'storage',
      },
    ],
    summary: ['CI gates block incomplete variants', 'Chrome extension blocks accidental submits'],
  },
]

const knowledgeGraphVisuals: ProjectVisual[] = [
  {
    kind: 'diagram',
    title: 'knowledge-pipeline',
    caption:
      'Document to agent context: four extraction types run in parallel, concepts are generated and deduplicated, and the graph is served to agents over MCP.',
    description:
      'Knowledge graph pipeline. A document is input, then four extractions run in parallel: entity-entity, entity-event, event-event and emotional context. Concepts are generated and deduplicated, then stored in the knowledge graph with atomic writes. An MCP server exposes the graph over STDIO for Claude Code and HTTP for web apps.',
    stages: [
      { header: 'Document Input', label: 'INPUT', metrics: ['personal docs'], type: 'input' },
      {
        header: 'Parallel Extraction',
        label: 'EXTRACT',
        metrics: ['entity-entity', 'entity-event', 'event-event', 'emotional context'],
        type: 'process',
      },
      {
        header: 'Concept Generation',
        label: 'CONCEPTS',
        metrics: ['deduplication'],
        type: 'process',
      },
      { header: 'Knowledge Storage', label: 'STORE', metrics: ['atomic writes'], type: 'storage' },
      {
        header: 'MCP Server',
        label: 'SERVE',
        metrics: ['STDIO: Claude Code', 'HTTP: web apps'],
        type: 'output',
      },
    ],
  },
]

const productOptimizerVisuals: ProjectVisual[] = [
  {
    kind: 'diagram',
    title: 'title-batch-pipeline',
    caption:
      'Current batch flow: titles are generated through the OpenAI Batch API, checked against the 75-79 character rule, and the ones that miss get a programmatic fallback.',
    description:
      'Title optimization pipeline. The product catalog of 57 thousand products is sent through the OpenAI Batch API with prompt caching, which cut cost by 90 percent. Each generated title is checked against the 75 to 79 character limit. About 62 percent pass; the 38 percent that fail get a programmatic fallback before output.',
    stages: [
      { header: 'Product Catalog', label: 'INPUT', metrics: ['57K products'], type: 'input' },
      {
        header: 'OpenAI Batch API',
        label: 'GENERATE',
        metrics: ['prompt caching', '90% cost cut'],
        type: 'process',
      },
      {
        header: 'Length Check',
        label: 'VALIDATE',
        metrics: ['75-79 chars', '62% pass'],
        type: 'process',
      },
      {
        header: 'Programmatic Fallback',
        label: 'FIX',
        metrics: ['38% that fail'],
        type: 'process',
      },
      { header: 'SEO Titles', label: 'OUTPUT', metrics: ['marketplace-ready'], type: 'output' },
    ],
    summary: ['6 LLMs tested', '6 processing approaches compared'],
  },
]

const personalManagementVisuals: ProjectVisual[] = [
  {
    kind: 'diagram',
    title: 'keel-morning-run',
    caption:
      'The 06:30 run on the Pi: a usage gate decides whether Claude may spend, all data is snapshotted first, the headless run writes JSON, and nothing is posted until that JSON passes validation.',
    description:
      'Keel morning run. Cron starts the run at 06:30 PT on a Raspberry Pi. A usage gate checks weekly Claude plan usage against an 80 percent weekly ceiling and a daily allowance, and skips the run if either is reached. If allowed, every input is fetched from the dashboard into a snapshot file. Then claude -p runs headless with file tools only, a 30-turn cap and a 15-minute timeout. Its JSON brief is validated, then posted to the dashboard and optionally to Telegram. Every run and every skip is appended to a usage ledger. A separate cron job every 15 minutes sends at most one follow-up question.',
    stages: [
      { header: 'Pi Cron', label: 'SCHEDULE', metrics: ['06:30 PT daily'], type: 'input' },
      {
        header: 'Usage Gate',
        label: 'GATE',
        metrics: ['80% weekly ceiling', 'daily allowance'],
        type: 'process',
      },
      {
        header: 'Dashboard Data',
        label: 'SNAPSHOT',
        metrics: ['fetched up front', 'no network in run'],
        type: 'storage',
      },
      {
        header: 'claude -p',
        label: 'RUN',
        metrics: ['file tools only', '30 turns · 15 min'],
        type: 'process',
      },
      {
        header: 'Validate + Post',
        label: 'PUBLISH',
        metrics: ['schema-checked brief', 'dashboard + Telegram'],
        type: 'output',
      },
    ],
    summary: ['every run and skip → usage ledger', 'follow-up cron every 15 min'],
  },
]

const musicMinionVisuals: ProjectVisual[] = [
  {
    kind: 'diagram',
    title: 'listening-context-flow',
    caption:
      'How a listen is recorded: the Python CLI drives MPV playback and stores the rating with when, where and why context in SQLite for later analysis.',
    description:
      'Music Minion CLI flow. A Python 3.12 command line app configured with TOML controls playback through MPV. Ratings are captured along with listening context: when, where and why. Everything is stored in SQLite, with the schema designed for future AI analysis of taste over time.',
    stages: [
      { header: 'Python 3.12 CLI', label: 'COMMAND', metrics: ['TOML config'], type: 'input' },
      { header: 'MPV', label: 'PLAY', metrics: ['cross-platform audio'], type: 'process' },
      {
        header: 'Context Capture',
        label: 'RATE',
        metrics: ['when · where · why'],
        type: 'process',
      },
      { header: 'SQLite', label: 'STORE', metrics: ['ready for AI analysis'], type: 'storage' },
    ],
    summary: ['Built in 1 day'],
  },
]

const projectVisuals: Readonly<Record<string, ProjectVisual[]>> = {
  'analytics-platform': analyticsPlatformVisuals,
  'masakali-booking': masakaliVisuals,
  'zoho-twilio': zohoTwilioVisuals,
  'glade-ai': gladeVisuals,
  'knowledge-graph-mcp': knowledgeGraphVisuals,
  'ai-product-optimizer': productOptimizerVisuals,
  'personal-management': personalManagementVisuals,
  'music-minion-cli': musicMinionVisuals,
}

export const getProjectVisuals = (projectId: string): ProjectVisual[] =>
  projectVisuals[projectId] ?? []
