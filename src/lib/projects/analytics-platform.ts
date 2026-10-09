import type { Project } from '~/lib/projects/types'

export const analyticsPlatform: Project = {
  id: 'analytics-platform',
  title: 'AnalyticsPlatform',
  className: 'AnalyticsPlatform',
  description: 'Executive analytics platform for real-time business intelligence',
  subtitle:
    'Processes 160M+ order records with static Parquet architecture achieving sub-second dashboard loads',
  businessImpact:
    'Provides executives instant access to business intelligence that previously required manual database queries',
  longDescription:
    "An executive analytics platform I built from scratch when existing solutions couldn't handle the scale and constraints. After investigating the query timeouts with 160M+ records, I realized we needed a completely different approach than traditional database-API-frontend architecture. My breakthrough was designing a static file system that transforms expensive API infrastructure into compressed Parquet files served directly to browsers. This approach eliminated thousands in monthly hosting costs while achieving instant dashboard performance.",
  architecture:
    '**Static Data Pipeline**: MySQL 5.7 → Python/Polars processing → Compressed Parquet files → Direct frontend loading via hyparquet. **My Incremental System**: I built timestamp-based change detection that processes only modified records, reducing 20-minute full scans to 5-minute targeted updates. **Frontend Innovation**: JSON index files map date ranges to Parquet row groups, enabling instant filtering without API calls. **Deployment Strategy**: Two-repository system where my backend writes processed files directly to frontend repository, deployed as static assets on Vercel, eliminating API hosting costs while maintaining sub-second performance.',
  status: 'ARCHIVED',
  role: 'Sole developer',
  timeline: 'Aug 2023 - Dec 2025',
  scope: 'architecture, backend, data optimization, performance tuning',
  metrics: [
    { value: '2M', label: 'Offers Tracked', color: 'cyan' },
    { value: '$143M', label: 'GMV Analyzed', color: 'yellow' },
    { value: '48k+', label: 'Sellers', color: 'green' },
    {
      value: '75%',
      label: 'Speed Gain',
      description: 'Performance improvement gained by migrating from pandas to Polars (Rust-based)',
      color: 'purple',
    },
  ],
  safetyAndReliability: [
    'My incremental updates process only changed records, reducing load on production database by 75%',
    'Rollbar monitoring alerts on processing failures with automated recovery strategies',
    'Static Parquet files eliminate API downtime risks while maintaining data freshness (5min updates)',
    'Type validation and data integrity checks during my pandas→Polars processing pipeline',
    'Index-based chunking enables instant filtering across years of daily aggregated data',
  ],
  skills: [
    {
      name: 'React',
      proficiency: 'Production Daily',
      category: 'Frontend',
      usage: 'Built complex dashboards with 13 internal views for data visualization',
    },
    {
      name: 'TypeScript',
      proficiency: 'Production Daily',
      category: 'Languages',
      usage: 'Ensured type safety across the entire full-stack application',
    },
    {
      name: 'Polars',
      proficiency: 'Production Proven',
      category: 'Data & Analytics',
      usage: 'Optimized data processing from 10+ min to under 5 min for 160M+ records',
    },
    {
      name: 'MySQL',
      proficiency: 'Working Knowledge',
      category: 'Backend',
      usage: 'Advanced query optimization on legacy MySQL 5.7 with read-only constraints',
    },
    {
      name: 'SQL Optimization',
      proficiency: 'Production Proven',
      category: 'Data & Analytics',
      usage: 'Reduced query times by 50% through advanced indexing and query restructuring',
    },
    {
      name: 'Tanstack Router/Query',
      proficiency: 'Working Knowledge',
      category: 'Frontend',
      usage: 'Implemented complex routing and data fetching patterns',
    },
    {
      name: 'AWS',
      proficiency: 'Working Knowledge',
      category: 'Infrastructure',
      usage: 'Deployed scalable multi-tenant architecture on AWS',
    },
    {
      name: 'Express.js',
      proficiency: 'Working Knowledge',
      category: 'Backend',
      usage: 'Built secure REST APIs with authentication and private routing',
    },
    {
      name: 'PostgreSQL',
      proficiency: 'Production Daily',
      category: 'Backend',
      usage: 'Designed multi-tenant database architecture for B2B customers',
    },
    {
      name: 'Data Visualization',
      proficiency: 'Production Proven',
      category: 'Data & Analytics',
      usage: 'Created intuitive charts and graphs for complex business metrics',
    },
  ],
  challenges: [
    "Legacy Database Performance Crisis: I faced constant query timeouts and memory issues processing 160M+ records on read-only MySQL 5.7. Couldn't create indexes, temporary tables, or use modern SQL features (CTEs) released after 2015. This forced me to completely rewrite every query and develop creative optimization strategies.",
    'Frontend Bundle Size Disaster: I discovered that my initial JSON-based architecture was creating 25MB+ bundle sizes, causing terrible loading performance. Users were abandoning dashboards before they loaded. I needed a fundamental shift in data format and processing approach while maintaining sub-second responsiveness.',
    'Executive Data Access Bottleneck: Leadership had no real-time access to critical business metrics across 2M offers and $143M GMV operations. They were stuck with manual queries that took hours and outdated dashboards requiring constant interpretation, creating decision-making bottlenecks.',
  ],
  solutions: [
    'Query Optimization & Processing Revolution: I rewrote every query from scratch to work within MySQL 5.7 constraints, using subqueries and EXISTS clauses instead of modern features. Then I migrated from pandas to Polars, achieving 75% performance gains. My incremental update system tracks only changed records, reducing processing from 20 minutes to 5 minutes.',
    'Static Architecture Innovation: I eliminated API infrastructure entirely by serving compressed Parquet files directly to the frontend. My implementation uses ZSTD compression and hyparquet client-side processing with JSON indexing for instant filtering. This reduced bundle size by 94% (25MB→1.6MB) while maintaining sub-second dashboard performance.',
    'Executive Dashboard Transformation: I replaced manual database queries with automated data pipelines feeding 13 different dashboards. Executives now have instant access to current business metrics instead of waiting for manual query results and interpretation. My system updates every 5 minutes automatically.',
  ],
  lessonsLearned: [
    'Constraint-Driven Innovation Leads to Superior Solutions: The read-only database limitations I faced forced me to create a static architecture that not only solved immediate problems but eliminated hosting costs and improved performance beyond traditional approaches. Sometimes constraints drive more innovative solutions than unlimited resources.',
    'Systematic Optimization Methodology Compounds Results: I learned that breaking down performance problems into measurable components (query optimization, data format, processing pipeline) enables targeted improvements that compound. My 75% query gains + 94% bundle reduction + incremental updates created transformational performance improvement.',
    'Scale-Appropriate Engineering Over Premature Optimization: I discovered that choosing maintainable, cost-effective solutions (static files vs complex API infrastructure) appropriate for the scale and requirements often outperforms sophisticated but unnecessary architectures. Engineering judgment matters more than following standard patterns.',
  ],
  codeExamples: [
    {
      title: 'Intelligent Incremental Update System with Smart Caching',
      impactContext:
        'This caching system I built reduced processing time from 20 minutes to 5 minutes by implementing timestamp-based incremental updates with 48-hour lookback windows, eliminating unnecessary full table scans while ensuring data completeness.',
      code: `# Intelligent Incremental Update System with Smart Caching
  def main(fn, filename, data_types, **kwargs):
      """
      Open a parquet file. If the file is older than one hour or force=True, update it first.
      """
      force = kwargs.get("force", False)
      index = index_map.get(filename)
      update_if_less_than = kwargs.get("update_if_less_than", one_hour_ago)
  
      try:
          # Update the file with the given index.
          if force:
              update(fn, filename, index, data_types, **kwargs)
  
          df = open_parquet(path, filename, data_types, **kwargs)
  
          most_recent_update = min(
              df["updated_at"].max(), get_most_recent_update(filename)
          )
  
          # Update the file if the most recent update is less than one hour ago.
          if most_recent_update <= update_if_less_than:
              print("updating", filename, most_recent_update, update_if_less_than)
              # If it hasn't been updated in the last 48 hours, update it with the earliest time.
              earliest_time = min(most_recent_update, time_48_hours_ago)
              update(fn, filename, index, data_types, updated_at=earliest_time, **kwargs)
              update_most_recent_update(filename)
      except Exception as e:
          print(f"{type(e).__name__}: {str(e)}")
          raise
  
      return open_parquet(path, filename, data_types, **kwargs)`,
      language: 'python',
      technicalExplanation: `**Key Engineering Decisions I Made:**
  • **Smart incremental logic**: Only processes changed records using timestamp filtering
  • **48-hour lookback window**: Catches any missed updates during system downtime
  • **Parquet format efficiency**: Columnar storage enables faster analytical queries
  • **Index mapping optimization**: Pre-computed indices for sub-second filtering`,
    },
  ],
}
