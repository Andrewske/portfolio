import type { Project } from '~/lib/projects/types'

// Facts and metrics come from ~/coding/agent-services and ~/coding/agent-dashboard
// (READMEs, source, cron.json, deploy hooks, git log) and Keel's run ledger.
// Keep the id stable: /project/personal-management is a public URL.
export const personalManagement: Project = {
  id: 'personal-management',
  title: 'Keel',
  className: 'Keel',
  description:
    'A personal agent platform on a Raspberry Pi: a daily headless Claude run behind a usage budget',
  subtitle:
    'Python services, cron jobs, a Telegram bot and a Next.js dashboard that run an LLM agent unattended every morning',
  businessImpact:
    'Runs every day without me touching it: one scheduled Claude run per morning, gated by a usage budget, logged to a ledger, and published only after its output passes validation',
  longDescription:
    "Keel is the agent system I use every day. Each morning a cron job on a Raspberry Pi checks how much of my weekly Claude plan is left, gathers the day's data from my dashboard, runs claude -p headless, and posts a short brief with up to three small asks. I answer from Telegram or the dashboard, and the next run reads those answers. I have ADHD, so the asks stay small and the system does the remembering. The interesting part is not the prompt. It is everything around it: deciding when the agent may spend, keeping it off the network, refusing bad output, and noticing when a job quietly stops running. Around Keel sit the other services it depends on: a budget ingest pipeline, a FastAPI service, a Telegram bot, and a Next.js 16 dashboard backed by Postgres.",
  architecture:
    "**Morning Run**: Cron starts the run at 06:30 PT on the Pi. It is one Python pipeline with five steps: usage gate, data snapshot, claude -p, publish, ledger. A dry-run flag stops after the snapshot, and a force flag skips the gate for manual runs. **Usage Budget Gate**: Before spending anything, the run reads my weekly Claude plan usage and passes it to a pure decide() function. It skips at an 80% weekly ceiling, or once today's runs have used the daily allowance (1% of the week, raised by grants I send from Telegram, capped at 5%). If usage can't be read, for example after an expired sign-in, it allows at most one run that day. Every skip is written to the ledger with its reason. **Offline Snapshot**: All the data Keel needs is fetched from the dashboard up front and written to a snapshot file, along with any photos it has to look at. The headless run gets only file tools (Read, Write, Edit, Glob, Grep), a 30-turn cap, and a 15-minute timeout. A source that fails to load becomes an error entry in the snapshot instead of killing the run. **Validate Before Publishing**: Claude writes its brief as JSON. The publisher checks it before anything goes out: the date must be today, at most three asks, length limits on every field, and any follow-up time must fall between 08:00 and 21:30. A rejected brief is logged and nothing is posted. The run directory is cleared first, so a stale brief can never be posted twice, and feedback is only marked read after the brief posts, so a failed run sees it again the next day. **Telegram and Dashboard**: A long-running Telegram bot (a systemd user unit with restart limits) takes photos, feedback and ask updates. It only replies and never messages first. A second cron job checks every 15 minutes and sends at most one follow-up question that Keel wrote. The Next.js 16 dashboard (Prisma, Postgres, React Query) shows the Today page, asks, budget views and job health, and an MCP server exposes my task data to Claude Code. **Budget Ingest**: A separate Python pipeline pulls bank data through Plaid plus Amazon and Instacart order details, dedupes and categorizes them with rules, and stores the result in Postgres behind a FastAPI service. It syncs once a day, and each scraper step is capped at 4 minutes so a hung login skips that step instead of stalling the whole sync. **Deploys and Observability**: Pushing to my self-hosted Forgejo triggers deploy hooks on the Pi. The services hook restarts only what changed. The dashboard hook refuses to deploy when the Pi has uncommitted edits, serializes with manual deploys through a file lock, and runs schema pushes without allowing data loss. A wrapper script reports each job's exit code, and a collector checks log freshness and systemd exit status on two hosts every 15 minutes. The dashboard marks a job stale once it is 1.5x past its expected interval.",
  architectureDiagramType: 'pipeline-flow',
  architectureDiagramData: {
    title: 'Deploy and Watch',
    description: 'How a change reaches the Pi, and how a job that stops running gets noticed',
    layout: 'horizontal',
    nodes: [
      {
        id: 'push',
        label: 'PUSH',
        type: 'client',
        metadata: { header: 'Self-hosted Forgejo', metrics: ['post-receive hook'] },
      },
      {
        id: 'guard',
        label: 'GUARD',
        type: 'decision',
        metadata: { header: 'Deploy Hook', metrics: ['refuse if Pi tree dirty', 'file lock'] },
      },
      {
        id: 'build',
        label: 'BUILD',
        type: 'process',
        metadata: {
          header: 'Build + Migrate',
          metrics: ['schema push, no data loss', 'next build'],
        },
      },
      {
        id: 'restart',
        label: 'RESTART',
        type: 'service',
        metadata: { header: 'systemd', metrics: ['only changed services'] },
      },
      {
        id: 'watch',
        label: 'WATCH',
        type: 'state',
        metadata: { header: 'Cron Monitor', metrics: ['every 15 min', 'stale at 1.5x interval'] },
      },
    ],
    links: [
      { source: 'push', target: 'guard', type: 'trigger' },
      { source: 'guard', target: 'build', type: 'flow' },
      { source: 'build', target: 'restart', type: 'flow' },
      { source: 'restart', target: 'watch', type: 'flow' },
    ],
  },
  status: 'ACTIVE',
  role: 'Sole developer',
  // TODO: verify - repos start May 2026 ("Initial migration from ~/journal/agents/"); earlier history lived in ~/journal
  timeline: 'May 2026 - present',
  scope:
    'agent orchestration, usage budgeting, scheduling, deploys, observability, full-stack dashboard',
  metrics: [
    {
      value: '172',
      label: 'Commits',
      description: 'Across the services and dashboard repos since May 2026',
      color: 'cyan',
    },
    {
      value: '06:30',
      label: 'Daily Run',
      description: 'Cron start time for the gated headless Claude run on the Pi',
      color: 'yellow',
    },
    {
      value: '17 / 17',
      label: 'Briefs Posted',
      description:
        'Ledgered morning runs that passed validation and posted, Sept 23 to Oct 9, 2026',
      color: 'green',
    },
    {
      value: '52',
      label: 'Keel Tests',
      description:
        'pytest functions covering the gate, snapshot, publisher, bot parsing and follow-ups',
      color: 'purple',
    },
  ],
  safetyAndReliability: [
    'A pure usage gate decides whether the agent may run at all: 80% weekly ceiling, a daily allowance, and one run per day when usage is unknown',
    'Every run and every skip is appended to a ledger with usage before and after, cost, turn count and exit code',
    'The headless run gets file tools only, a 30-turn cap and a 15-minute timeout; all data is fetched before it starts',
    'Agent output is schema-checked before it is posted, and the run directory is cleared so a stale brief is never re-sent',
    'Deploy hooks refuse to overwrite uncommitted edits on the Pi and serialize builds with a file lock',
    'A cron monitor flags failed or stale jobs on two hosts, and its own collector runs under the same wrapper',
  ],
  aiEvaluation:
    'Claude makes the judgment calls and Python handles every side effect. The model reads one snapshot file and writes JSON. Code decides whether it runs, what it can touch, and whether its output gets posted. That split is why I can leave it running unattended on a Raspberry Pi. Several fixes after launch were plumbing, not prompting: the model kept misreading UTC timestamps, so the snapshot now labels every time in my local zone.',
  challenges: [
    'A scheduled LLM run spends from the same weekly plan I use for my own work. Without a limit, one bad day of retries could eat the week.',
    'An unattended agent can produce malformed or stale output, and nobody is watching at 06:30 to catch it before it reaches my phone.',
    'Jobs on a home server fail quietly. A cron entry that stops running produces no error at all, just missing data days later.',
  ],
  solutions: [
    'Wrote the gate as a pure function over the ledger and a small budget file, with a hard weekly ceiling, a capped daily allowance, Telegram grants for extra room, and a one-run limit when usage cannot be read.',
    'Made the publisher the only path out: it validates the brief against a fixed schema, posts nothing on failure, clears old outputs before each run, and only marks feedback read after a successful post.',
    'Added a wrapper that reports exit codes and a 15-minute collector that watches log freshness and systemd status, so the dashboard shows failed and overdue jobs instead of waiting for me to notice.',
  ],
  lessonsLearned: [
    'Running an LLM job unattended is mostly normal ops work: budgets, timeouts, idempotent steps and logs. The prompt is the smallest part.',
    'Fetching everything before the model starts makes runs reproducible and keeps network access out of the agent entirely.',
    'Give the model pre-computed facts instead of raw data. Labeling times in local time fixed a class of mistakes that prompt changes did not.',
  ],
  codeExamples: [
    {
      title: 'Usage budget gate',
      impactContext:
        'Every morning run passes through this function before it can spend plan usage. It is pure, so the ledger rows and budget file fully determine the decision and the tests need no mocks.',
      code: `# agent-services/chief-of-staff/gate.py
def allowance_for(budget: dict, day: str) -> float:
    """Daily allowance plus today's grants, capped at max_daily_pct."""
    grants = sum(float(g.get("pct", 0)) for g in budget.get("extra_grants", []) if g.get("date") == day)
    return min(float(budget["daily_allowance_pct"]) + grants, float(budget["max_daily_pct"]))


def decide(weekly: float | None, budget: dict, rows: list[dict], day: str) -> GateDecision:
    """Skip at the weekly ceiling or once today's deltas reach the allowance.
    Unknown usage (auth failure): allow at most one run per day."""
    runs = today_runs(rows, day)
    allowance = allowance_for(budget, day)
    used = used_pct(runs)
    if weekly is None:
        if runs:
            return GateDecision(False, "usage_unknown_already_ran_today", used, allowance)
        return GateDecision(True, "usage_unknown_single_run", used, allowance)
    if weekly >= float(budget["weekly_ceiling_pct"]):
        return GateDecision(False, f"weekly_ceiling ({weekly}% >= {budget['weekly_ceiling_pct']}%)", used, allowance)
    if used >= allowance:
        return GateDecision(False, f"daily_allowance ({used}% >= {allowance}%)", used, allowance)
    return GateDecision(True, None, used, allowance)`,
      language: 'python',
      technicalExplanation: `**Why it looks like this:**
  • **Fails closed on bad data**: if the usage probe can't be trusted, the gate allows one run per day instead of guessing
  • **Spend is measured, not estimated**: each ledger row stores weekly usage before and after a run, and the gate sums those deltas
  • **Grants are data**: extra room comes from a Telegram command that appends to the budget file, still capped by max_daily_pct
  • **Skips are explained**: the reason string goes straight into the ledger`,
    },
  ],
  skills: [
    {
      name: 'Claude Code',
      proficiency: 'Production Daily',
      category: 'AI/ML',
      usage: 'Headless claude -p runs with restricted tools, turn caps and JSON output parsing',
    },
    {
      name: 'Python',
      proficiency: 'Production Daily',
      category: 'Languages',
      usage: 'Keel runner, usage gate, Telegram bot and budget ingest pipeline',
    },
    {
      name: 'Next.js',
      proficiency: 'Production Daily',
      category: 'Frontend',
      usage: 'Next.js 16 dashboard with React Query, served on the Pi',
    },
    {
      name: 'PostgreSQL',
      proficiency: 'Production Daily',
      category: 'Backend',
      usage: 'Dashboard data through Prisma and the budget pipeline through psycopg2',
    },
    {
      name: 'FastAPI',
      proficiency: 'Working Knowledge',
      category: 'Backend',
      usage: 'Budget API service under systemd',
    },
    {
      name: 'Telegram Bot API',
      proficiency: 'Production Proven',
      category: 'APIs & Integrations',
      usage: 'Long-running reply-only bot for photos, feedback, ask updates and budget grants',
    },
    {
      name: 'MCP Protocol',
      proficiency: 'Working Knowledge',
      category: 'AI/ML',
      usage: 'MCP server exposing task data from the dashboard to Claude Code',
    },
    {
      name: 'Linux / systemd / cron',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: 'Raspberry Pi services, cron schedules, git-push deploy hooks and job monitoring',
    },
  ],
}
