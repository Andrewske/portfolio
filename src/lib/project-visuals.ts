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
    title: 'daily-journal-loop',
    caption:
      'Daily documentation loop: the Telegram bot asks what I did, OpenAI cleans up the reply, and the GitHub API commits it as markdown that syncs to Obsidian.',
    description:
      'Daily journaling flow. Each day a Telegram bot texts asking what happened. The reply is formatted by OpenAI, committed to GitHub as a markdown file through the GitHub API, and synced into Obsidian. Separate Claude Code agents for career, diet and work each live in their own directory with their own CLAUDE.md.',
    stages: [
      { header: 'Telegram Bot', label: 'PROMPT', metrics: ['daily check-in'], type: 'input' },
      { header: 'OpenAI', label: 'FORMAT', metrics: ['messy reply → markdown'], type: 'process' },
      { header: 'GitHub API', label: 'COMMIT', metrics: ['markdown files'], type: 'storage' },
      { header: 'Obsidian', label: 'SYNC', metrics: ['personal vault'], type: 'output' },
    ],
    summary: ['Claude Code agents: career · diet · work', 'one directory + CLAUDE.md each'],
  },
]

const musicMinionVisuals: ProjectVisual[] = [
  {
    kind: 'diagram',
    title: 'feed-to-decision-loop',
    caption:
      'Current system: workers sync my SoundCloud feed into SQLite on a Raspberry Pi, I keep or skip tracks from the web or Android app, and every decision lands in a ledger that the offline evaluation reads.',
    description:
      'Music Minion architecture. A SoundCloud stream sync runs hourly from a checkpoint, with a daily per-artist sweep to backfill. A FastAPI backend in Docker on a Raspberry Pi serves a React web app and an Expo Android app, with a WebSocket channel for cross-device playback control. All data lives in one SQLite database, including a decision ledger of keep, nope and hide calls. An offline evaluation rebuilds a dataset from the ledger, splits it by time and runs a ship gate. The keep-probability model failed that gate, so it was not shipped. The original Python CLI reads the same database locally, kept in sync by Syncthing.',
    stages: [
      {
        header: 'SoundCloud Sync',
        label: 'INGEST',
        metrics: ['stream hourly', 'artist sweep daily'],
        type: 'input',
      },
      {
        header: 'FastAPI on a Pi',
        label: 'SERVE',
        metrics: ['Docker + Caddy', 'WebSocket device sync'],
        type: 'process',
      },
      {
        header: 'Web + Android',
        label: 'DECIDE',
        metrics: ['React 19', 'Expo SDK 55'],
        type: 'process',
      },
      {
        header: 'SQLite',
        label: 'LEDGER',
        metrics: ['keep · nope · hide', 'predictions log'],
        type: 'storage',
      },
      {
        header: 'Offline Eval',
        label: 'GATE',
        metrics: ['chronological split', 'NO-SHIP'],
        type: 'output',
      },
    ],
    summary: [
      'Python CLI + MPV on the desktop, same DB via Syncthing',
      '706 commits since Sep 2025',
    ],
  },
]

const projectVisuals: Readonly<Record<string, ProjectVisual[]>> = {
  'analytics-platform': analyticsPlatformVisuals,
  'masakali-booking': masakaliVisuals,
  'zoho-twilio': zohoTwilioVisuals,
  'glade-ai': gladeVisuals,
  'ai-product-optimizer': productOptimizerVisuals,
  'personal-management': personalManagementVisuals,
  'music-minion-cli': musicMinionVisuals,
}

export const getProjectVisuals = (projectId: string): ProjectVisual[] =>
  projectVisuals[projectId] ?? []
