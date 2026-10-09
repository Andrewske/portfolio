import type { Project, ProjectMetric } from '~/lib/projects'

export type DescribedMetric = ProjectMetric & { description?: string }

// Fallback context for metrics whose project data has no `description` yet.
// Keyed by project id, then metric label (labels change less often than values).
// TODO: move these into each ProjectMetric in projects.ts and delete this map.
const fallbackDescriptions: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  'analytics-platform': {
    'Speed Gain': 'Performance improvement gained by migrating from pandas to Polars (Rust-based)',
  },
  'masakali-booking': {
    'Double Bookings': 'Double bookings achieved through real-time Smoobu API validation',
    'Sync Updates': 'Webhook-based inventory sync replacing 3+ second polling',
    Properties: 'Active villa listings managed across Booking.com and Airbnb',
  },
  'zoho-twilio': {
    'Total Messages': 'SMS messages processed across 12 studios for lead engagement',
    'Leads Engaged': 'Unique leads engaged through automated CRM-SMS workflows',
    'Active Studios': 'Active fitness studios using the multi-tenant platform',
    'Ship Time': 'Development time from concept to production deployment',
  },
}

const ownDescription = (metric: ProjectMetric): string | undefined => {
  const candidate: unknown = (metric as DescribedMetric).description
  return typeof candidate === 'string' && candidate.length > 0 ? candidate : undefined
}

// Prefers a description carried on the metric itself, then the legacy fallback
export const describeMetrics = (project: Project): DescribedMetric[] =>
  project.metrics.map(metric => ({
    ...metric,
    description: ownDescription(metric) ?? fallbackDescriptions[project.id]?.[metric.label],
  }))
