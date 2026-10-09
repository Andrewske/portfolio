import type { Project } from '~/lib/projects/types'

// Sources: ~/coding/music-minion-cli (git log, CLAUDE.md, ai-learnings.md,
// docs/reports/keep-model-evaluation.md, docs/reports/artist-quality-before-after.md).
// Re-check the numbers against those files before changing them.

export const musicMinionCli: Project = {
  id: 'music-minion-cli',
  title: 'MusicMinion',
  className: 'MusicMinion',
  description:
    'Music curation system I use daily: Python CLI, web app, Android app and SoundCloud feed sync, plus a keep-probability model I evaluated and chose not to ship',
  subtitle:
    'A year of one side project, from a one-day CLI to a multi-client system with an honest offline model evaluation',
  businessImpact:
    'My trained model lost to a flat 22% guess on held-out data, so I kept production selection as it was and fixed the data problems the evaluation exposed',
  longDescription:
    "Music Minion started in September 2025 as a one-day Python CLI for rating songs. I kept using it, so I kept building it. Thirteen months and 706 commits later it is a FastAPI backend on a Raspberry Pi, a React web app, an Expo Android app, and background workers that sync my SoundCloud feed, all sharing one SQLite database. The part I'm proudest of is a negative result. I wanted the feed to rank tracks by how likely I was to keep them, so I trained a logistic regression on 884 of my own keep/nope decisions and evaluated it offline with chronological splits and bootstrap confidence intervals. It scored worse than a flat 22% prior on Brier score and log loss. The ship gate failed and I did not ship it. Building the evaluation also surfaced two data bugs: decisions had no real timestamps, and artist stats counted each decision about nine times.",
  architecture:
    "**Clients**: The original CLI is a full-screen blessed terminal UI that plays audio through MPV and takes commands from other terminals over a Unix socket. The web app is React 19 with TanStack Router, React Query and Zustand. The Android app is Expo SDK 55 with React Native 0.83 and shares an API client package with the web app through an npm workspace. A WebSocket sync channel lets one device control playback on another, Spotify Connect style. **Backend**: FastAPI runs in Docker on a Raspberry Pi behind Caddy. SQLite is the single store, and Syncthing keeps the database and music library in sync between the Pi and my desktop, where the library also feeds Serato for DJing. **Feed Sync**: Workers pull new uploads and reposts from the artists I follow. The first version called every followed artist on each run, about 1.9k requests and 45 minutes. It now reads SoundCloud's stream from a stored checkpoint every hour in one or two requests, and a daily per-artist sweep backfills what the stream drops, with an adaptive cadence that backs off from 24 hours to 30 days for quiet artists. **Decision Ledger and Evaluation**: Every keep, nope or hide on a feed track is written to a decision ledger. An offline script rebuilds a leakage-safe dataset from it, fits the model, compares it against a flat prior and the current heuristics, and prints a markdown report ending in SHIP or NO-SHIP. **LLM Metadata Cleanup**: A nightly job cleans title and artist tags on new SoundCloud downloads with an LLM. Tags are written only when two independent runs agree and neither hedges, which measured about 97% precise against a gold set built from months I had already fixed by hand.",
  architectureDiagramType: 'pipeline-flow',
  architectureDiagramData: {
    title: 'Keep-Model Evaluation',
    description: 'From my own feed decisions to a ship or no-ship recommendation',
    layout: 'horizontal',
    nodes: [
      {
        id: 'ledger',
        label: 'LEDGER',
        type: 'database',
        metadata: { header: 'Decision Ledger', metrics: ['884 decisions', '26.8% kept'] },
      },
      {
        id: 'features',
        label: 'FEATURES',
        type: 'process',
        metadata: { header: 'Decision-Time Only', metrics: ['no raw artist IDs'] },
      },
      {
        id: 'split',
        label: 'SPLIT',
        type: 'process',
        metadata: { header: 'Chronological', metrics: ['60/20/20', 'sync cycles kept whole'] },
      },
      {
        id: 'compare',
        label: 'COMPARE',
        type: 'process',
        metadata: { header: 'Paired Bootstrap', metrics: ['vs 22% prior', 'vs current builder'] },
      },
      {
        id: 'gate',
        label: 'GATE',
        type: 'decision',
        metadata: { header: 'Ship Gate', metrics: ['2 of 4 checks failed', 'NO-SHIP'] },
      },
    ],
    links: [
      { source: 'ledger', target: 'features', type: 'flow' },
      { source: 'features', target: 'split', type: 'flow' },
      { source: 'split', target: 'compare', type: 'flow' },
      { source: 'compare', target: 'gate', type: 'flow' },
    ],
  },
  status: 'ACTIVE',
  role: 'Sole developer',
  timeline: 'Sep 2025 - present',
  scope: 'full-stack product, mobile app, background sync, data modeling, offline model evaluation',
  metrics: [
    {
      value: '706',
      label: 'Commits',
      description: 'Sep 2025 to Oct 2026, from a one-day CLI to web, mobile and a Pi server',
      color: 'cyan',
    },
    {
      value: '884',
      label: 'Labeled Decisions',
      description:
        'My own keep/nope calls on feed tracks, split by time into train, validation and test',
      color: 'yellow',
    },
    {
      value: '0.160 vs 0.134',
      label: 'Brier: Model vs Prior',
      description:
        'On the 138-decision test window the flat 22% prior beat the model. Lower is better',
      color: 'green',
    },
    {
      value: '~9x',
      label: 'Credit Inflation Found',
      description:
        'Old artist stats replayed each decision once per reposter: 8,266 credits for 884 decisions',
      color: 'purple',
    },
  ],
  aiEvaluation:
    'The model was an L2-regularized logistic regression on decision-time features: artist rank, follow state, uploader and reposter keep rates, duration, release age and title words. I picked the regularization strength on validation log loss, refit on train plus validation, and scored on the last 20% of decisions. On that test window (138 decisions, 15.2% kept) it scored Brier 0.160 against 0.134 for a flat 22% prior, and log loss 0.503 against 0.441. The paired bootstrap interval on the Brier difference was [-0.057, +0.007], so the model never showed it was better. It did rank better than the current builder at the top (18% precision at 50 versus 12%), but the gate required beating the prior on both probability metrics, and it did not. Validation AUC was 0.740 and test AUC fell to 0.608, which suggests my taste or the supply of tracks shifted between windows. Recommendation: NO-SHIP, and production selection stayed unchanged. My next experiment scores feed tracks with a hosted model (Jev, via OpenRouter) and a written taste profile. Its score is an opt-in sort, the default feed order is still newest first, and every prediction is stored with the exact input it saw so the same offline evaluation can grade it later.', // TODO: verify - whether a Jev row has been added to the offline report yet; if it has, mention the result here
  challenges: [
    'The database had no record of when I decided on a track. The timestamps that looked usable (playlist added_at, bucket created_at) clustered on bulk sync runs, not on my decisions, so a naive time split would leak the future into training.',
    'Artist keep rates gave every reposter full credit for each track. A track with nine reposters counted nine times, so every busy reposter drifted toward the overall keep rate and the stats could not tell good curators from noise.',
    'With about 880 examples and roughly 140 in the test window, every metric came with a wide interval, and a model could look better by luck.',
  ],
  solutions: [
    'Stamped each decision with the start of the sync run that created the next playlist batch, which is exact across sync cycles. Splits keep each cycle whole so simultaneous decisions never land on both sides of a boundary. New decisions now go to a ledger with a real timestamp.',
    'Separated uploader and reposter credit: one observation per track, reposters share it, and both rates are smoothed toward the 22% prior. Total credit dropped from 8,266 to 1,076.',
    'Wrote the ship gate as four explicit checks in code and compared the model to baselines with paired bootstrap intervals, so the recommendation is the list of failed checks rather than my reading of a chart.',
  ],
  lessonsLearned: [
    'Any user judgment that might ever feed a model needs its own timestamped row when it happens. Reconstructing order later costs far more than one decided_at column.',
    'Beat the dumbest baseline first. A flat prior is a real competitor on small, shifting data, and losing to it is a useful answer.',
    "The evaluation paid off even though the model did not ship. It found the timestamp gap and the credit inflation, and the separated reposter rate now drives the playlist builder's ordering.",
    'Removing the rank features made the model better on test. Rank has no history table, so edits made after a decision can leak in, and the ablation is how I bounded that. Ablations are cheap and worth running every time.',
  ],
  safetyAndReliability: [
    'Features use only what was known when a track was surfaced. Raw artist IDs are never features, so an unseen artist scores from its rank, follow state and role stats alone',
    'Model predictions are append-only and stored with the exact input sent, so any score can be replayed and graded offline',
    'Batch scoring commits every 25 tracks, so a crash mid-batch keeps the predictions already made',
    'LLM tag cleanup writes only when two independent runs agree, touches only title, artist and remixer frames, and logs old values so any change can be restored',
    'Audio file tag edits go through a temp copy and an atomic rename, and data is tagged with its source (user, AI, file or provider) so an import only deletes what it created',
  ],
  codeExamples: [
    {
      title: 'Ship gate for the keep-probability model',
      language: 'python',
      impactContext:
        'This is the function that said no. The model passed the two ranking checks and failed both probability checks against the flat prior, so the report printed NO-SHIP with the failed checks listed.',
      technicalExplanation:
        'brier_delta and logloss_delta are paired bootstrap intervals for baseline minus model, so a positive lower bound means the model is better with 95% confidence. Requiring the lower bound above zero, not just a better point estimate, is what keeps a lucky test window from shipping a model.',
      code: `# web/backend/preference_model.py
SHIP_GATE_CHECKS: tuple[str, ...] = (
    "brier beats prior with CI above zero",
    "log loss beats prior with CI above zero",
    "precision@50 beats current builder",
    "bottom decile below base rate",
)


def ship_gate(
    model: dict[str, float],
    prior: dict[str, float],
    builder: dict[str, float],
    brier_delta: dict[str, float],
    logloss_delta: dict[str, float],
) -> tuple[bool, list[str]]:
    """Explicit criteria; every failed check is listed in the report."""
    outcomes = (
        brier_delta["low"] > 0,
        logloss_delta["low"] > 0,
        model["precision_at_50"] > builder["precision_at_50"],
        model["bottom_decile_keep_rate"] < prior["base_keep_rate"],
    )
    failed = [name for name, passed in zip(SHIP_GATE_CHECKS, outcomes) if not passed]
    return not failed, failed`,
    },
  ],
  skills: [
    {
      name: 'Python',
      proficiency: 'Production Proven',
      category: 'Languages',
      usage: 'CLI, FastAPI backend, sync workers and the evaluation pipeline',
    },
    {
      name: 'FastAPI',
      proficiency: 'Working Knowledge',
      category: 'Backend',
      usage: 'REST and WebSocket API serving the web and Android clients',
    },
    {
      name: 'SQLite',
      proficiency: 'Production Proven',
      category: 'Backend',
      usage:
        'Single store for library, decision ledger and prediction log, with versioned migrations',
    },
    {
      name: 'React',
      proficiency: 'Production Daily',
      category: 'Frontend',
      usage: 'Web app with TanStack Router, React Query and Zustand',
    },
    {
      name: 'React Native',
      proficiency: 'Working Knowledge',
      category: 'Frontend',
      usage: 'Expo Android app sharing an API client package with the web app',
    },
    {
      name: 'scikit-learn',
      proficiency: 'Working Knowledge',
      category: 'AI/ML',
      usage:
        'Logistic regression for keep probability, plus TF-IDF track matching across providers',
    },
    {
      name: 'Offline Evaluation',
      proficiency: 'Working Knowledge',
      category: 'Data & Analytics',
      usage:
        'Chronological splits, paired bootstrap intervals, calibration, ablations and a coded ship gate',
    },
    {
      name: 'SoundCloud API',
      proficiency: 'Production Proven',
      category: 'APIs & Integrations',
      usage: 'Feed and stream sync, playlist push worker, OAuth',
    },
    {
      name: 'Docker',
      proficiency: 'Working Knowledge',
      category: 'Infrastructure',
      usage: 'Backend container on a Raspberry Pi behind Caddy',
    },
  ],
}
