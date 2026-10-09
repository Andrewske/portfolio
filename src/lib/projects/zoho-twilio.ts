import type { Project } from '~/lib/projects/types'

export const zohoTwilio: Project = {
  id: 'zoho-twilio',
  title: 'ZohoTwilioIntegration',
  className: 'ZohoTwilioIntegration',
  description: 'Production SMS system for a group of dance studios, live and maintained since 2023',
  subtitle: 'CRM-SMS integration with automated lead follow-up, opt-out sync and delivery tracking',
  // TODO: verify - the 80% figure predates this refresh and has no source in the sms-project repo
  businessImpact: 'Automated SMS workflows reducing manual lead processing time by 80%',
  longDescription:
    // TODO: verify - 12 studios, 9,000+ leads and 43,000+ messages are from the original write-up; the repo has no current totals
    // TODO: verify - "4 weeks" ship time; git shows the first commit on 2023-11-07 but not the go-live date
    'I built and still run this system alone. Studio staff text leads from inside Zoho CRM, new leads get a welcome text, and replies turn into CRM tasks or automated follow-ups. The first version shipped in 4 weeks for 12 studios and has carried 43,000+ messages to 9,000+ leads. Since then it has been in production for almost three years, 392 commits so far. The 2026 work was mostly reliability: I moved reply handling out of the webhook into a cron job, recorded real delivery status, synced Twilio opt-outs back into Zoho, upgraded to Next.js 16, and added alerts for jobs that fail silently.',
  // TODO: verify - the 25-hour heartbeat alert is described in commit 41f841d, but ai-learnings.md says to confirm it exists in PostHog
  architecture:
    "**Inbound Messages**: Twilio posts each inbound SMS to a webhook that checks the signature, saves the message, and returns 200. If the save fails it returns 500 so Twilio retries. The signature is checked against the auth token of the Twilio account that sent it, because the studios are split across two Twilio accounts. **Cron Processing**: A cron job runs every 5 minutes and picks up unprocessed messages from the last 24 hours, 20 at a time. For each one it finds the studio from the receiving number, looks up the lead in Zoho, and lets the lead's Zoho owner decide which studio gets the work. A YES reply (9 accepted variants) sends a follow-up once per lead. Any other reply becomes a Zoho task for staff. Messages that can't be resolved are retried up to 50 times, with an alert at 10. Each run writes a CronRun row with counts and errors. **Opt-Outs**: STOP is the one thing the webhook handles right away, because SMS rules require an immediate opt-out. A daily job reads Twilio's \"unsubscribed recipient\" errors (21610) from the last 48 hours and sets the opt-out flag on the matching Zoho record. **Multi-Tenant Routing**: Each studio row holds its Zoho user ID, its Twilio and Zoho Voice numbers, and an isAdmin flag. Some studios share one number under an admin studio, whose Zoho account can see leads across all of them. Outbound texts go through Twilio or Zoho Voice depending on the number they are sent from. **Delivery Tracking**: Twilio status callbacks update each message, and out-of-order callbacks can't downgrade a final status. The CRM panel shows failed and undelivered sends in red with the error code. **Monitoring**: Errors from both server and browser go to PostHog. A health endpoint reports unprocessed messages and the last cron run. A nightly job pushes the message log to Zoho Analytics and emits a heartbeat event, and a PostHog alert fires if no heartbeat arrives within 25 hours.",
  status: 'PRODUCTION',
  role: 'Sole developer',
  timeline: 'Nov 2023 - present',
  scope:
    'API integration, webhook handling, multi-tenant SMS delivery, scheduled jobs, opt-out compliance, monitoring',
  metrics: [
    {
      // TODO: verify - carried over from the original entry; still true as a lower bound but likely much higher now
      value: '43k+',
      label: 'Total Messages',
      description: 'SMS messages processed for studio lead engagement',
      color: 'cyan',
    },
    {
      value: '3 yrs',
      label: 'In Production',
      description: 'Live since Nov 2023, 392 commits, latest fix Sept 2026',
      color: 'yellow',
    },
    {
      value: '1,102',
      label: 'Failed Sends Found',
      description: 'Undelivered texts surfaced by delivery tracking. The UI showed 39 before.',
      color: 'green',
    },
    {
      value: '191',
      label: 'Tests',
      description: 'Jest tests covering the webhook, cron, opt-out sync and dedup logic',
      color: 'purple',
    },
  ],
  safetyAndReliability: [
    'Save-first webhook: every inbound text is stored before any processing, and Twilio retries if the save fails',
    'Twilio signature check on every webhook, using the token of the account that sent it',
    'STOP handled immediately, plus a daily sync of Twilio opt-outs back into Zoho',
    'Unresolved messages retried up to 50 times, with an alert at 10',
    'CronRun ledger and a health endpoint for unprocessed messages and cron age',
    // TODO: verify - the repo's own notes (ai-learnings.md, 2026-09-09) say to confirm the heartbeat absence alert exists in PostHog
    'PostHog alerts for cron errors, missing contacts, retry exhaustion, an exceptions spike, and a missing nightly heartbeat',
  ],
  challenges: [
    "Multi-Tenant Routing With Shared Numbers: Studios share infrastructure and, in some cases, a single phone number and Zoho login. A reply to a shared number has to be traced to the right lead and the right studio, and a studio's own Zoho account sometimes can't see a lead owned by a sibling studio. The studios are also split across two Twilio accounts, which broke webhook signature checks that assumed one auth token.",
    'Fast YES Replies Racing the Webhook: Leads often reply YES right after the welcome text. The original webhook did contact lookup, task creation and the follow-up inline, so a slow Zoho call or a Twilio retry could fail on a unique constraint and the reply was never acted on. Some leads who said YES got no follow-up and no task.',
    'Duplicate Messages From Two Providers: Zoho Voice messages were saved once at send time and again when the log synced, which left 2-3 rows per message. A 2025 dedup fix seemed to work, but in 2026 I found its timing check never matched: Zoho Voice logs name the field submittedTime, so the timestamp was NaN and the comparison was always false.',
    'Silent Failures: The UI showed "delivered" for any message without a status, and no Twilio status callback was wired up, so failed sends looked fine. After the Next.js 16 upgrade, the nightly Zoho Analytics push failed for about 63 days with no alert, because error logging only reported from the browser.',
    "Opt-Outs Across Providers: A STOP sent to one provider never reached the other. Zoho Campaigns sends through Twilio without checking Zoho's opt-out field, so Twilio blocked about 640 sends to 272 opted-out people in 30 days while Zoho still listed them as reachable.",
  ],
  solutions: [
    "Data-Driven Tenancy: Each studio row maps a Zoho user ID to its phone numbers, and an isAdmin flag replaced hardcoded studio names. Shared-number lookups go through the admin studio's Zoho account, then the lead's Zoho owner decides which studio gets the task. Webhook signatures are validated against the auth token of the Twilio account named in the payload.",
    "Save First, Process in a Cron: The webhook now only validates, saves the message (idempotent on the Twilio message ID) and handles STOP. A cron job every 5 minutes does contact lookup, task creation and follow-ups, one message at a time so token refreshes don't collide. Each message has a retry count, and each run is logged to a CronRun table.",
    'Fixed Dedup and Cleaned Up: Added submittedTime to the timestamp fallbacks, treated unparseable dates as non-matches, and fixed an empty-string fallback. Fixed the Zoho Voice send response parser, which missed the message ID about 75% of the time. A cleanup run removed 5,051 duplicate rows, and messages with a Zoho log ID went from 74% to 96%.',
    'Real Delivery Status and Heartbeats: Added a Twilio status callback route that ignores out-of-order downgrades, removed the "delivered" default, and backfilled history. That surfaced 1,102 undelivered messages where the UI used to show 39. Server errors now go through posthog-node, and the nightly analytics job emits a heartbeat with a 25-hour absence alert. I backfilled the 33,301 messages it had missed.',
    "Reverse Opt-Out Sync: A daily cron reads Twilio's 21610 errors from the last 48 hours, filtering client-side because Twilio ignores that filter server-side, and sets the opt-out flag in Zoho. It runs 5 lookups at a time, skips contacts already flagged, and alerts if more than 20% of lookups fail.",
  ],
  lessonsLearned: [
    'Fit Multi-Tenancy to the Real Scale: For a few studios, phone-number routing plus one isAdmin flag was enough. The real work was the exceptions: shared numbers, a second Twilio account, and Zoho permissions that differ per login. Moving those from hardcoded names into data made each new exception a database row instead of a deploy.',
    'Test Against Real Payloads: My dedup time check looked right and never matched for months, because it used the field name I assumed and not the one Zoho Voice sends. Check matchers against a real response, and make an unparseable date fail closed so the bug shows up instead of hiding.',
    'Return 200 Only After the Data Is Safe: The first version always returned 200 so Twilio would never retry. That hid lost messages. Saving first, then returning 200, or 500 if the save failed, and doing the slow work in a cron is simpler and loses nothing.',
    'Alert on Missing Success, Not Just Errors: The analytics job failed for about 63 days because the error path never reached PostHog. A heartbeat with an absence alert catches both a broken job and a cron that never runs.',
    'Upgrades Change Call Sites: Next.js 16 made server action exports async. One route still called the Twilio client factory without await and kept failing for months after I thought I had fixed it. When a function becomes async, I grep every caller, and I verify a cron fix by triggering the production endpoint.',
  ],
  skills: [
    {
      name: 'Next.js',
      proficiency: 'Production Daily',
      category: 'Frontend',
      usage: 'Full-stack app embedded in Zoho CRM, upgraded from Next.js 14 to 16 with React 19',
    },
    {
      name: 'JavaScript',
      proficiency: 'Production Daily',
      category: 'Languages',
      usage: 'Webhook, cron and routing logic across the whole codebase',
    },
    {
      name: 'Prisma',
      proficiency: 'Production Proven',
      category: 'Backend',
      usage:
        'Multi-tenant data model and migrations, upgraded from Prisma 5 to 7 with the pg driver adapter',
    },
    {
      name: 'PostgreSQL',
      proficiency: 'Production Daily',
      category: 'Backend',
      usage: 'Messages, tasks, studio accounts and the CronRun ledger',
    },
    {
      name: 'Twilio API',
      proficiency: 'Production Proven',
      category: 'APIs & Integrations',
      usage:
        'Studio numbers across two accounts, signed webhooks, status callbacks, opt-out error scans',
    },
    {
      name: 'Zoho CRM API',
      proficiency: 'Production Proven',
      category: 'APIs & Integrations',
      usage: 'CRM extension, lead lookup, task creation, opt-out flags, Zoho Voice and Analytics',
    },
    {
      name: 'Webhook Architecture',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: 'Save-first inbound webhook with per-account signature checks and idempotent writes',
    },
    {
      name: 'Vercel Cron',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: 'Three scheduled jobs: reply processing, opt-out sync and analytics push',
    },
    {
      name: 'Multi-tenant Architecture',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: 'Routing by receiving number, admin studios and lead ownership',
    },
    {
      name: 'PostHog',
      proficiency: 'Working Knowledge',
      category: 'Infrastructure',
      usage: 'Server and client error tracking, event alerts and heartbeat monitoring',
    },
    {
      name: 'Jest',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: '191 tests across routes, cron jobs and utilities',
    },
  ],
  codeExamples: [
    {
      title: 'Multi-Criteria Message Deduplication',
      impactContext:
        'Zoho Voice messages were saved twice: once at send time and once when the log synced. This matcher decides when a synced log is the same message as an existing row. The 2026 fix added the submittedTime field and the NaN guard. Before that, the time check never matched any Zoho Voice log.',
      code: `const DUPLICATE_TIME_WINDOW_MINUTES = 5;

function areMessagesDuplicates(message1, message2) {
  const normalizePhone = PhoneFormatter.normalize;

  const msg1 = {
    message: message1.message?.trim(),
    fromNumber: normalizePhone(message1.fromNumber || message1.from),
    toNumber: normalizePhone(message1.toNumber || message1.to),
    createdAt: new Date(message1.createdAt || message1.created_at || message1.submittedTime)
  };

  // ?? not || so an empty-string message doesn't fall through to messageContent
  const msg2 = {
    message: message2.message?.trim() ?? message2.messageContent?.trim(),
    fromNumber: normalizePhone(message2.fromNumber || message2.from || message2.senderId),
    toNumber: normalizePhone(message2.toNumber || message2.to || message2.customerNumber),
    createdAt: new Date(message2.createdAt || message2.created_at || message2.submittedTime || message2.createdTime)
  };

  if (msg1.message !== msg2.message) return false;
  if (msg1.fromNumber !== msg2.fromNumber || msg1.toNumber !== msg2.toNumber) return false;

  // Zoho Voice logs use submittedTime. A missing or unparseable timestamp
  // is treated as a non-match instead of comparing against NaN.
  if (Number.isNaN(msg1.createdAt.getTime()) || Number.isNaN(msg2.createdAt.getTime())) {
    return false;
  }

  const timeDiffMinutes = Math.abs(msg1.createdAt - msg2.createdAt) / (1000 * 60);
  return timeDiffMinutes <= DUPLICATE_TIME_WINDOW_MINUTES;
}`,
      language: 'javascript',
      technicalExplanation: `**Key Engineering Decisions:**
• **Multi-criteria matching**: Content, normalized phone numbers, and a 5-minute window
• **Fail closed on bad dates**: An unparseable timestamp returns false on purpose instead of comparing against NaN
• **Update instead of create**: A matching row without a Zoho ID gets the ID added rather than a second row
• **Cleanup**: Once fixed, a cleanup run removed 5,051 duplicate rows`,
    },
    {
      title: 'Per-Account Twilio Webhook Signatures',
      impactContext:
        "The studios are split across two Twilio accounts, and Twilio signs each webhook with the sending account's auth token. Checking against a single token from an environment variable rejected one account's status callbacks with 403. Looking up the token by AccountSid fixed it, and a backfill recovered the delivery status of about 17,000 messages.",
      code: `export const validateTwilioWebhook = async ({ request, params, pathname }) => {
  const signature = request.headers?.get?.('x-twilio-signature') || '';
  const accountSid = params.get('AccountSid');
  if (!signature || !accountSid) return false;

  // Every webhook names the account that sent it, so find that account's token
  const account = await prisma.account.findFirst({
    where: { platform: 'twilio', clientId: accountSid },
    select: { clientSecret: true },
  });
  if (!account?.clientSecret) return false;

  const url = \`\${process.env.APP_URL}\${pathname}\`;
  const paramsObj = Object.fromEntries(params.entries());
  return twilio.validateRequest(account.clientSecret, signature, url, paramsObj);
};`,
      language: 'javascript',
      technicalExplanation: `**Key Engineering Decisions:**
• **Token per account**: Matches the signing account instead of assuming one global token
• **Fail closed**: Missing signature, unknown account, or bad signature all return false, and the route answers 403
• **Shared helper**: The inbound message webhook and the status callback both use it`,
    },
  ],
  github: 'https://github.com/Andrewske/zoho_twilio_integration_t3',
}
