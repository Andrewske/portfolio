import { Project } from '~/lib/projects';

interface PerformanceMetricsProps {
  project: Project;
}

export function PerformanceMetrics({ project }: PerformanceMetricsProps) {
  const getMetricDescription = (metric: any, projectId: string) => {
    // Add context descriptions for key metrics based on project
    const descriptions: Record<string, Record<string, string>> = {
      'analytics-platform': {
        '160M+': 'Historical order records processed from 8 years of e-commerce data',
        '75%': 'Performance improvement gained by migrating from pandas to Polars (Rust-based)',
        '8yr': 'Historical data spanning 2018-2025 for comprehensive business intelligence',
        '<1s': 'Dashboard load time achieved through static Parquet file architecture'
      },
      'masakali-booking': {
        '$30k+': 'Monthly revenue recovered through zero double-booking system',
        '0': 'Double bookings achieved through real-time Smoobu API validation',
        'Instant': 'Webhook-based inventory sync replacing 3+ second polling',
        '5': 'Active villa listings managed across Booking.com and Airbnb'
      },
      'zoho-twilio': {
        '43k+': 'SMS messages processed across 12 studios for lead engagement',
        '9k+': 'Unique leads engaged through automated CRM-SMS workflows',
        '12': 'Active fitness studios using the multi-tenant platform',
        '4wks': 'Development time from concept to production deployment'
      },
      'ai-product-optimizer': {
        '4.5k': 'Product listings optimized in 30-minute batch processing runs',
        '$0.00003': 'Cost per item achieved through GPT-4o-mini optimization',
        'Linear': 'Scalable processing architecture with predictable performance',
        '30min': 'Batch processing time for 4,500 listings using OpenAI batch API'
      },
      'knowledge-graph-mcp': {
        '20': 'Semantic triples extracted per document through 4-stage AI pipeline',
        '$0.0012': 'Processing cost per 8k+ character document using gpt-4o-mini',
        '94s': 'End-to-end processing time for knowledge graph generation',
        '80': 'Vector embeddings generated per document for semantic search'
      }
    };

    return descriptions[projectId]?.[metric.value] || '';
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
        <span className="text-gray-500">{'//'}</span> Performance & Impact Metrics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.metrics.map((metric, index) => (
          <div key={index} className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className={`text-3xl font-bold text-${metric.color || 'cyan'}-400`}>
                {metric.value}
              </div>
              <div className="flex-1">
                <div className="text-gray-400 text-sm font-medium">{metric.label}</div>
              </div>
            </div>

            {getMetricDescription(metric, project.id) && (
              <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-gray-700 pl-3">
                {getMetricDescription(metric, project.id)}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Project Scope Context */}
      <div className="mt-8 p-6 bg-gray-800/30 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          Project Scope & Context
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-cyan-400 font-medium">Role:</span>
            <p className="text-gray-300">{project.role}</p>
          </div>
          <div>
            <span className="text-cyan-400 font-medium">Timeline:</span>
            <p className="text-gray-300">{project.timeline}</p>
          </div>
          <div>
            <span className="text-cyan-400 font-medium">Scope:</span>
            <p className="text-gray-300">{project.scope}</p>
          </div>
        </div>
      </div>
    </section>
  );
}