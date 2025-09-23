export type ProficiencyLevel = 'Expert' | 'Proficient' | 'Familiar';

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'AI/ML'
  | 'Data & Analytics'
  | 'APIs & Integrations'
  | 'Infrastructure';

export interface ProjectSkill {
  name: string;
  proficiency: ProficiencyLevel;
  category: SkillCategory;
  usage: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  color?: 'cyan' | 'yellow' | 'green' | 'purple';
}

export interface ProjectCodeExample {
  title: string;
  code: string;
  language: string;
  impactContext?: string;
  technicalExplanation?: string;
}

export type DiagramType =
  | 'pipeline-flow'
  | 'sequence'
  | 'component'
  | 'state-flow'
  | 'flowchart'
  | 'agent-architecture';

export interface DiagramNode {
  id: string;
  label: string;
  type: 'process' | 'database' | 'api' | 'service' | 'client' | 'decision' | 'state' | 'agent';
  color?: string;
  x?: number;
  y?: number;
  metadata?: Record<string, any>;
}

export interface DiagramLink {
  source: string;
  target: string;
  label?: string;
  type?: 'flow' | 'data' | 'dependency' | 'webhook' | 'api-call' | 'trigger';
  animated?: boolean;
  bidirectional?: boolean;
  metadata?: Record<string, any>;
}

export interface DiagramData {
  nodes: DiagramNode[];
  links: DiagramLink[];
  layout?: 'horizontal' | 'vertical' | 'radial' | 'force';
  title?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  className: string;
  description: string;
  subtitle: string;
  businessImpact: string;
  longDescription?: string;
  architecture?: string;
  architectureDiagramType?: DiagramType;
  architectureDiagramData?: DiagramData;
  status: 'PRODUCTION' | 'LIVE' | 'ACTIVE' | 'INTERNAL';
  role: string;
  timeline: string;
  scope: string;
  metrics: ProjectMetric[];
  skills: ProjectSkill[];
  safetyAndReliability: string[];
  aiEvaluation?: string;
  challenges?: string[];
  solutions?: string[];
  lessonsLearned?: string[];
  codeExamples?: ProjectCodeExample[];
  github?: string;
  liveUrl?: string;
  detailPageUrl?: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    id: 'analytics-platform',
    title: 'AnalyticsPlatform',
    className: 'AnalyticsPlatform',
    description: 'Full-stack analytics platform processing 160M+ order records',
    subtitle: 'High-performance analytics system processing 160M+ records with sub-second query times',
    businessImpact: 'Enabled real-time business intelligence for operations processing 2M offers, $143M GMV, 48k sellers since 2020',
    longDescription: 'Built executive analytics platform processing 160M+ order records with innovative static data architecture. Transformed 20-minute database queries into 5-minute incremental updates using Polars (Rust-based processing) and timestamp-based change detection. Eliminated traditional API infrastructure by generating compressed Parquet files that load directly in the frontend, achieving sub-second dashboard performance while reducing hosting costs to zero.',
    architecture: '**Data Pipeline**: Python backend queries MySQL 5.7 → Polars processing (75% faster than pandas) → Parquet files with ZSTD compression → Frontend loads via hyparquet with indexed chunking for instant filtering. **Performance Wins**: Incremental updates track only changed records using timestamp filtering, reducing processing from 20min to 5min. Frontend uses JSON index files mapping date ranges to Parquet row groups, enabling sub-second queries across 160M+ records. **Infrastructure Innovation**: Two-repository architecture where backend writes processed data directly to frontend repo, deployed on Vercel as static files. This approach eliminated $1000s/month in API hosting, database connections, and scaling infrastructure while maintaining enterprise-grade performance.',
    status: 'LIVE',
    role: 'Sole developer',
    timeline: 'Aug 2023 - ongoing',
    scope: 'architecture, backend, data optimization, performance tuning',
    metrics: [
      { value: '2M', label: 'Offers Tracked', color: 'cyan' },
      { value: '$143M', label: 'GMV Analyzed', color: 'yellow' },
      { value: '48k+', label: 'Sellers', color: 'green' },
      { value: '75%', label: 'Speed Gain', color: 'purple' }
    ],
    safetyAndReliability: [
      'Incremental updates process only changed records, reducing load on production database by 75%',
      'Rollbar monitoring alerts on processing failures with automated recovery strategies',
      'Static Parquet files eliminate API downtime risks while maintaining data freshness (5min updates)',
      'Type validation and data integrity checks during pandas→Polars processing pipeline',
      'Index-based chunking enables instant filtering across years of daily aggregated data'
    ],
    skills: [
      {
        name: 'React',
        proficiency: 'Expert',
        category: 'Frontend',
        usage: 'Built complex dashboards with 13 internal views for data visualization'
      },
      {
        name: 'TypeScript',
        proficiency: 'Expert',
        category: 'Languages',
        usage: 'Ensured type safety across the entire full-stack application'
      },
      {
        name: 'Polars',
        proficiency: 'Expert',
        category: 'Data & Analytics',
        usage: 'Optimized data processing from 10+ min to under 5 min for 160M+ records'
      },
      {
        name: 'MySQL',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'Advanced query optimization on legacy MySQL 5.7 with read-only constraints'
      },
      {
        name: 'SQL Optimization',
        proficiency: 'Expert',
        category: 'Data & Analytics',
        usage: 'Reduced query times by 50% through advanced indexing and query restructuring'
      },
      {
        name: 'Tanstack Router/Query',
        proficiency: 'Proficient',
        category: 'Frontend',
        usage: 'Implemented complex routing and data fetching patterns'
      },
      {
        name: 'AWS',
        proficiency: 'Proficient',
        category: 'Infrastructure',
        usage: 'Deployed scalable multi-tenant architecture on AWS'
      },
      {
        name: 'Express.js',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'Built secure REST APIs with authentication and private routing'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'Designed multi-tenant database architecture for B2B customers'
      },
      {
        name: 'Data Visualization',
        proficiency: 'Expert',
        category: 'Data & Analytics',
        usage: 'Created intuitive charts and graphs for complex business metrics'
      }
    ],
    challenges: [
      'Legacy Database Performance Crisis & Infrastructure Constraints: Query timeouts, memory issues, and processing bottlenecks with 160M+ records on read-only MySQL 5.7. Unable to create indexes, temporary tables, or use modern SQL features (CTEs) released after 2015, forcing complete query rewrites and creative optimization strategies.',
      'Frontend Bundle Size & User Experience Crisis: Initial JSON-based architecture created 25MB+ bundle sizes causing poor loading performance and user experience degradation. Required fundamental shift in data format and processing approach while maintaining sub-second dashboard responsiveness.',
      'Executive Data Access & Business Intelligence Gap: Leadership lacked real-time access to critical business metrics across 2M offers and $143M GMV operations. Manual queries were time-intensive and outdated dashboard required constant interpretation, creating bottlenecks in executive decision-making.'
    ],
    solutions: [
      'Systematic Performance Engineering & Query Optimization: Rewrote every query from ground up using advanced optimization techniques (subqueries, EXISTS clauses, efficient aggregation). Implemented pandas→Polars migration achieving 75% performance gains, developed incremental update system reducing processing from 20min to 5min through timestamp-based change detection.',
      'Innovative Static Architecture & Bundle Optimization: Designed revolutionary two-repository system bypassing traditional API infrastructure. Implemented Parquet compression with ZSTD, hyparquet client-side processing, and JSON indexing for instant filtering. Achieved 94% bundle size reduction (25MB→1.6MB) while enabling sub-second queries across 160M+ records.',
      'Executive Dashboard Transformation & Real-Time BI: Built comprehensive analytics platform with 13 internal views providing instant access to business intelligence. Replaced manual query workflows with automated data pipelines, enabling executives to access up-to-date metrics for 48k sellers and millions of items/buyers across 8 years of historical data.'
    ],
    lessonsLearned: [
      'Constraint-Driven Innovation Leads to Superior Solutions: Read-only database limitations forced creative static architecture that not only solved immediate problems but eliminated hosting costs and improved performance beyond traditional approaches. Sometimes constraints drive more innovative solutions than unlimited resources.',
      'Systematic Optimization Methodology Compounds Results: Breaking down performance problems into measurable components (query optimization, data format, processing pipeline) enabled targeted improvements that compound. 75% query gains + 94% bundle reduction + incremental updates created transformational performance improvement.',
      'Scale-Appropriate Engineering Over Premature Optimization: Choosing maintainable, cost-effective solutions (static files vs complex API infrastructure) appropriate for the scale and requirements often outperforms sophisticated but unnecessary architectures. Engineering judgment matters more than following standard patterns.'
    ],
    codeExamples: [
      {
        title: 'Intelligent Incremental Update System with Smart Caching',
        impactContext: 'This caching system reduced processing time from 20 minutes to 5 minutes by implementing timestamp-based incremental updates with 48-hour lookback windows, eliminating unnecessary full table scans while ensuring data completeness.',
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
        technicalExplanation: `**Key Engineering Decisions:**
• **Smart incremental logic**: Only processes changed records using timestamp filtering
• **48-hour lookback window**: Catches any missed updates during system downtime
• **Parquet format efficiency**: Columnar storage enables faster analytical queries
• **Index mapping optimization**: Pre-computed indices for sub-second filtering`
      }
    ],
    detailPageUrl: '/admin-dashboard',
    github: 'https://github.com'
  },
  {
    id: 'masakali-booking',
    title: 'MasakaliBookingPlatform',
    className: 'MasakaliBookingPlatform',
    description: 'Production booking platform with real-time inventory sync',
    subtitle: 'Multi-tenant booking platform eliminating double-bookings and recovering $30k+/month',
    businessImpact: 'Zero double-bookings across 43k+ messages and thousands of bookings',
    longDescription: 'Built production booking platform from scratch with React/Redux → Next.js migration. Integrated real-time inventory sync across Booking.com, Airbnb via Smoobu API. Achieved zero double-bookings through webhook-driven availability updates and intelligent cross-villa blocking logic for shared building configurations.',
    architecture: '**Real-Time Booking Flow**: External bookings (Booking.com, Airbnb) → Smoobu webhook → Local database sync with automatic cross-villa blocking. When Lakshmi villa (downstairs) books, system automatically blocks Akasha villa (whole building) via Smoobu API, preventing conflicts for shared physical space. **Database Design**: PostgreSQL with Prisma ORM featuring unique constraints @@unique([villa_id, date]) for availability enforcement, foreign key relationships (villa → reservations), comprehensive audit logging via WebhookLog table storing JSON data for all external booking events, and indexed columns for performance optimization. **Webhook Processing Architecture**: Comprehensive webhook handler processing 5 action types (newReservation, updateReservation, cancelReservation, deleteReservation, updateRates) with intelligent filtering to detect "Masakali Blocked" self-generated reservations. Always returns HTTP 200 status to prevent Twilio retries, implements database-first persistence strategy, and integrates PostHog monitoring for production error tracking. **Payment Integration**: 14-step Xendit payment flow with 3DS authentication, token lifecycle management, modal-based verification, and multi-store state coordination (useCartForm, useXenditStore, useFetchPaymentData) ensuring atomic database operations across booking confirmation pipeline. **Scale-Appropriate Engineering**: Simple, reliable architecture optimized for 5-villa operation with manual oversight - demonstrates engineering judgment in choosing maintainable solutions over premature optimization.',
    status: 'PRODUCTION',
    role: 'Sole developer',
    timeline: 'July 2020 - ongoing',
    scope: 'full-stack development, payment integration, booking system, multi-tenant architecture',
    metrics: [
      { value: '$30k+', label: 'Revenue', color: 'cyan' },
      { value: '0', label: 'Double Bookings', color: 'yellow' },
      { value: 'Instant', label: 'Sync Updates', color: 'green' },
      { value: '5', label: 'Listings', color: 'purple' }
    ],
    safetyAndReliability: [
      'Zero double-bookings via Smoobu API real-time validation',
      'Webhook-based availability updates prevent conflicts',
      'PostHog error logging for API integration monitoring',
      'Payment processing via secure third-party APIs'
    ],
    skills: [
      {
        name: 'Next.js',
        proficiency: 'Expert',
        category: 'Frontend',
        usage: 'Migrated from React/Redux to Next.js for better performance and SEO'
      },
      {
        name: 'Redux',
        proficiency: 'Proficient',
        category: 'Frontend',
        usage: 'Managed complex booking state before Next.js migration'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Proficient',
        category: 'Backend',
        usage: 'Stored booking data with complex availability logic for 5 listings'
      },
      {
        name: 'Smoobu API',
        proficiency: 'Expert',
        category: 'APIs & Integrations',
        usage: 'Real-time inventory sync across Booking.com and Airbnb'
      },
      {
        name: 'Xendit API',
        proficiency: 'Proficient',
        category: 'APIs & Integrations',
        usage: 'Integrated Indonesian payment processor with limited documentation'
      },
      {
        name: 'Webhook Architecture',
        proficiency: 'Expert',
        category: 'Infrastructure',
        usage: 'Replaced polling with webhooks: 3+ seconds → instant updates'
      },
      {
        name: 'TypeScript',
        proficiency: 'Expert',
        category: 'Languages',
        usage: 'Type-safe API integrations and complex booking logic'
      },
      {
        name: 'Real-time Sync',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'Zero double-bookings through instant inventory synchronization'
      },
      {
        name: 'Multi-CDN',
        proficiency: 'Proficient',
        category: 'Infrastructure',
        usage: 'Image optimization across multiple CDN providers'
      }
    ],
    challenges: [
      'Cross-Villa Booking Conflicts & Shared Building Architecture: Akasha villa (entire building) and Lakshmi villa (downstairs only) represent the same physical space, creating complex booking logic where reserving one villa must automatically block the other. Required intelligent cross-villa blocking system to prevent double-bookings of shared physical space while maintaining separate booking channels and pricing strategies.',
      'Real-Time Inventory Synchronization Across Multiple Platforms: Managing 5 different webhook action types (newReservation, updateReservation, cancelReservation, deleteReservation, updateRates) from external booking platforms (Booking.com, Airbnb) via Smoobu API. Ensuring immediate availability updates across all platforms while handling webhook reliability, duplicate processing, and maintaining data consistency.',
      'Payment Processing with Limited API Documentation: Integrating Indonesian payment processor Xendit with minimal documentation, requiring reverse-engineering of 14-step payment flow including 3DS authentication, token management, modal-based verification, and complex state coordination between multiple Zustand stores. Built production-ready payment processing without comprehensive vendor support.'
    ],
    solutions: [
      'Intelligent Cross-Villa Blocking System via Smoobu API: Implemented automatic blocking logic where Lakshmi bookings trigger blockVilla() function to create "Masakali Blocked" reservations for Akasha villa via Smoobu API, and vice versa. Database enforces unique constraints on (villa_id, date) pairs, while Smoobu API validation prevents conflicts at source, eliminating need for complex local locking mechanisms.',
      'Robust Webhook Architecture with Smart Error Handling: Built comprehensive webhook processor handling 5 action types with intelligent filtering to detect self-generated "Masakali Blocked" reservations. Webhook always returns HTTP 200 status (even on partial failures) to prevent Twilio retries, while implementing database-first persistence strategy and PostHog monitoring for production error tracking.',
      'Reverse-Engineered Payment Flow with State Management: Mapped complete 14-step Xendit payment process through systematic testing and documentation. Implemented multi-store state coordination (useCartForm, useXenditStore, useFetchPaymentData) with proper token lifecycle management, 3DS modal handling, and atomic database operations ensuring payment consistency across booking confirmation pipeline.'
    ],
    lessonsLearned: [
      'Scale-Appropriate Engineering Over Complex Patterns: For 5-villa operations with low traffic, simple manual oversight and reliable webhook processing proved more effective than complex automated systems. Engineering judgment matters more than following enterprise patterns when scale doesn\'t justify complexity.',
      'Webhook Reliability Through Simple Patterns: Always returning HTTP 200 (regardless of processing success), implementing database-first persistence, and smart filtering to prevent infinite loops created robust real-time integration. Sometimes simple approaches outperform sophisticated error handling for production reliability.',
      'API Integration Without Documentation: Systematic reverse-engineering through controlled testing, comprehensive state mapping, and building internal documentation proved essential for production integrations with limited vendor support. Building thorough understanding of payment flows enabled confident production deployment.'
    ],
    codeExamples: [
      {
        title: 'Intelligent Cross-Villa Blocking System',
        impactContext: 'This blocking system prevents double-bookings of shared physical space by automatically creating API reservations when either Akasha (full building) or Lakshmi (downstairs) is booked, ensuring zero conflicts across 43k+ messages.',
        code: `// Automatic cross-villa blocking for shared building architecture
export async function createReservation(smoobuReservation: SmoobuReservation) {
  const reservationData = parseSmoobuReservation(smoobuReservation);
  const { villa_id, ...otherReservationData } = reservationData;

  // Create the primary reservation
  const newReservation = await db.reservation.create({
    data: {
      ...otherReservationData,
      villa: { connect: { id: villa_id } },
    },
  });

  const { arrival, departure } = reservationData;

  // Intelligent cross-villa blocking for shared building
  if (villa_id === lakshmiId) {
    console.log('Blocking Akasha');
    await blockVilla(akashaId, arrival, departure);
  }

  if (villa_id === akashaId) {
    console.log('Blocking Lakshmi');
    await blockVilla(lakshmiId, arrival, departure);
  }

  return newReservation;
}

// Block villa by creating Smoobu reservation with special guest name
export async function blockVilla(villaId: number, arrival: string, departure: string) {
  const data = {
    arrivalDate: arrival,
    departureDate: departure,
    apartmentId: villaId,
    channelId: channelIds['blocked'],
    firstName: 'Masakali',
    lastName: 'Blocked',
    email: 'N/A',
  };

  const response = await fetch('https://login.smoobu.com/api/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': apiKey,
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(data),
  });

  const { id: smoobu_id } = await response.json();

  // Store blocking reservation locally for audit trail
  await db.reservation.create({
    data: {
      arrival: data.arrivalDate,
      departure: data.departureDate,
      smoobu_id,
      channel_id: channelIds['blocked'],
      villa: { connect: { id: villaId } },
      created_at: new Date(),
    },
  });

  return smoobu_id;
}`,
        language: 'typescript',
        technicalExplanation: `**Key Engineering Decisions:**
• **Shared building logic**: Lakshmi (downstairs) + Akasha (full building) = same physical space
• **API-first blocking**: Creates actual Smoobu reservations rather than local flags
• **Audit trail maintenance**: All blocking actions stored locally for debugging and analysis
• **Smart naming convention**: "Masakali Blocked" enables webhook filtering to prevent loops`
      }
    ],
    detailPageUrl: '/masakali',
    github: 'https://github.com/Andrewske/masakali-t3'
  },
  {
    id: 'zoho-twilio',
    title: 'ZohoTwilioIntegration',
    className: 'ZohoTwilioIntegration',
    description: 'Production SMS system enabling 12 studios to engage 9,000+ leads',
    subtitle: 'Real-time CRM-SMS integration with automated lead engagement',
    businessImpact: 'Automated SMS workflows reducing manual lead processing time by 80%',
    longDescription: 'Built production SaaS platform as solo engineer: Full-stack SMS system enabling 12 studios to engage 9,000+ leads directly from Zoho CRM, processing 43,000+ messages. Shipped end-to-end solution in 4 weeks.',
    architecture: '**Webhook Processing Flow**: Zoho CRM triggers webhook on new lead → Platform validates studio ownership via phone number mapping → Creates task in Zoho for agent follow-up → Routes SMS to lead via studio-specific Twilio/Zoho Voice number. **Multi-Tenant Isolation**: Studios table maps Zoho User IDs to dedicated SMS phone numbers. Each studio maintains separate OAuth tokens in StudioAccount junction table. Messages table enforces tenant boundaries with studioId foreign key, preventing cross-studio data access. **Real-Time Message Routing**: Dual-provider architecture (Twilio + Zoho Voice) with automatic failover. Incoming SMS webhooks identify studio by destination phone number, parse STOP/YES keywords for automated workflows, create Zoho tasks for manual responses. Admin phone number override enables managers to text from any studio context. **Error Handling & Reliability**: Centralized error handling wrapper with PostHog logging. Webhook returns HTTP 200 even on partial failures to prevent Twilio retries. Database-first approach ensures message persistence before API calls. Token refresh middleware handles Zoho OAuth expiration transparently.',
    status: 'PRODUCTION',
    role: 'Sole developer',
    timeline: 'Nov 2023 - ongoing',
    scope: 'API integration, webhook handling, multi-tenant SMS delivery, error tracking',
    metrics: [
      { value: '43k+', label: 'Total Messages', color: 'cyan' },
      { value: '9k+', label: 'Leads Engaged', color: 'yellow' },
      { value: '12', label: 'Active Studios', color: 'green' },
      { value: '4wks', label: 'Ship Time', color: 'purple' }
    ],
    safetyAndReliability: [
      'Multi-tenant data isolation via Studios table architecture',
      'Phone number validation for webhook authentication',
      'STOP message parsing for SMS compliance',
      'PostHog monitoring for production error tracking'
    ],
    skills: [
      {
        name: 'Next.js',
        proficiency: 'Expert',
        category: 'Frontend',
        usage: 'Built full-stack SaaS platform with custom Zoho CRM extension'
      },
      {
        name: 'TypeScript',
        proficiency: 'Expert',
        category: 'Languages',
        usage: 'Type-safe multi-tenant routing logic and API integrations'
      },
      {
        name: 'Prisma',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'ORM for PostgreSQL with complex multi-tenant data models'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Expert',
        category: 'Backend',
        usage: 'Stored 43k+ messages with studio-specific partitioning'
      },
      {
        name: 'Twilio API',
        proficiency: 'Expert',
        category: 'APIs & Integrations',
        usage: 'Dynamic routing between studio-specific phone numbers'
      },
      {
        name: 'Zoho CRM API',
        proficiency: 'Expert',
        category: 'APIs & Integrations',
        usage: 'Custom CRM extension with intuitive chat interface'
      },
      {
        name: 'Webhook Architecture',
        proficiency: 'Expert',
        category: 'Infrastructure',
        usage: 'Real-time message synchronization and automated sequences'
      },
      {
        name: 'Multi-tenant Architecture',
        proficiency: 'Expert',
        category: 'Infrastructure',
        usage: 'Complex routing logic based on agent context and permissions'
      },
      {
        name: 'Sentry',
        proficiency: 'Proficient',
        category: 'Infrastructure',
        usage: 'Production monitoring and rapid issue resolution'
      },
      {
        name: 'Rapid Prototyping',
        proficiency: 'Expert',
        category: 'Infrastructure',
        usage: 'Shipped complete solution in 4 weeks as solo engineer'
      }
    ],
    detailPageUrl: '/zoho-twilio',
    github: 'https://github.com/Andrewske/zoho_twilio_integration_t3'
  },
  {
    id: 'ai-product-optimizer',
    title: 'AIProductOptimizer',
    className: 'AIProductOptimizer',
    description: 'Batch processing system using GPT-4o-mini for e-commerce optimization',
    subtitle: 'LLM-powered e-commerce optimization with cost-performance analysis',
    businessImpact: 'Achieved 63% cost reduction while maintaining 90%+ accuracy through model optimization',
    longDescription: 'Developed AI-powered listing optimization tool using OpenAI batch API to enhance 4,500 product titles in 30 minutes at $0.00003/listing, improving marketplace SEO and conversion rates.',
    architecture: '**Experimental Evaluation Pipeline**: Systematic testing of 6 LLM models (GPT-5, GPT-5-mini, GPT-5-nano, GPT-4.1-nano, GPT-4o-mini, GPT-5-nano-flex) across 6 processing approaches (iterative, async progressive, tool-calling, batch-processing, batch-api, early-async). Cost analysis revealed 10x variance ($0.00003-$0.00175/item) with diminishing returns on accuracy beyond GPT-4o-mini. **Hybrid AI+Template Architecture**: Next-generation approach combining minimal AI parsing ($0.00005/product) with deterministic template generation. Four-stage pipeline: 1) AI feature extraction for structured data parsing, 2) Template engine ensuring 77-character compliance, 3) Variation detector for product family grouping (30-50% instant processing), 4) Learning system extracting patterns from successful examples. **Cost Optimization Strategy**: Template reuse across product variations eliminates redundant AI calls. Character mapping system with term-length analysis enables precise length control without expensive model iterations. Architecture targets 99% cost reduction while maintaining 90%+ accuracy through intelligent batch processing and pattern recognition.',
    status: 'PRODUCTION',
    role: 'Sole developer',
    timeline: 'July 2025 - ongoing',
    scope: 'LLM evaluation, model comparison, cost optimization, experimental approaches',
    metrics: [
      { value: '4.5k', label: 'Listings/30min', color: 'cyan' },
      { value: '$0.00003', label: 'Cost/Item', color: 'yellow' },
      { value: 'Linear', label: 'Scaling', color: 'green' },
      { value: '30min', label: 'Batch Time', color: 'purple' }
    ],
    safetyAndReliability: [
      'Manual validation for experimental/development phase',
      'Token usage tracking for cost scaling analysis',
      'Manual error management during model optimization',
      'Quality assurance through manual review process'
    ],
    aiEvaluation: 'Evaluated 6 LLM models across 6 optimization approaches. GPT-5-nano achieved 95% accuracy but at 10x cost penalty ($0.00175/item). Pivoted to hybrid AI+template architecture maintaining accuracy while achieving 99% cost reduction. Systematic testing revealed cost-quality trade-offs: GPT-5 models delivered superior accuracy (up to 100%) but exponentially higher costs ($0.00003-$0.00175/item) and processing times (0.04s-28.23s/item). GPT-4o-mini provided optimal balance (90% accuracy, $0.00014/item, 2.31s/item). Experimental approaches tested: iterative, async progressive, tool-calling, batch-processing, batch-api, early-async. Current development focuses on brand mapping and template-based generation for economic viability at scale.',
    skills: [
      {
        name: 'Python',
        proficiency: 'Proficient',
        category: 'Languages',
        usage: 'Built batch processing pipeline for 4.5k listings'
      },
      {
        name: 'OpenAI API',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Optimized GPT-4o-mini for cost-effective title generation'
      },
      {
        name: 'Batch Processing',
        proficiency: 'Expert',
        category: 'Data & Analytics',
        usage: 'Linear scaling architecture processing 4.5k items in 30 minutes'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Proficient',
        category: 'Backend',
        usage: 'Stored optimized product data and processing metrics'
      },
      {
        name: 'Cost Optimization',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Achieved $0.00003 per item through prompt engineering'
      },
      {
        name: 'GPT-4',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Fine-tuned prompts for e-commerce SEO optimization'
      }
    ]
  },
  {
    id: 'knowledge-graph-mcp',
    title: 'KnowledgeGraphMCP',
    className: 'KnowledgeGraphMCP',
    description: 'Production AI system processing documents into semantic knowledge graphs',
    subtitle: 'Semantic knowledge extraction pipeline with vector embeddings',
    businessImpact: 'Processes 8k+ character documents in 94 seconds with $0.0012 cost per operation',
    longDescription: 'Production AI system with 3-stage distributed pipeline processing documents into semantic knowledge graphs. Implements parallel 4-stage extraction (entity-entity, entity-event, event-event, emotional context) within first pipeline stage for comprehensive relationship mapping. Built dual-transport MCP server supporting both HTTP and STDIO protocols for flexible integration.',
    architecture: '**Pipeline Architecture**: Three-stage distributed processing: 1) Knowledge extraction with parallel AI calls, 2) Concept generation for semantic clustering, 3) Deduplication using vector similarity. Each stage uses QStash queuing with smart delays based on extraction metrics, enabling horizontal scaling and fault tolerance. **Four-Stage Extraction Process**: First pipeline stage runs parallel extraction for entity-entity relationships, entity-event connections, event-event sequences, and emotional context mapping. 75% performance improvement over sequential processing through Promise.allSettled coordination of 4 simultaneous gpt-4o-mini calls. **MCP Protocol Implementation**: Dual-transport server architecture supporting both STDIO (for Claude Code integration) and HTTP (for web applications) simultaneously. Environment-configurable transport enables development flexibility while maintaining production protocol compliance. **Performance & Cost Monitoring**: Comprehensive token tracking and cost analysis per operation. Current benchmarks: 94.4s processing time, $0.0012 cost for 8668-character documents generating 20 triples and 80 vectors. Architecture prioritizes practical deployment cost optimization over experimental model exploration, with ongoing performance tuning in development.',
    architectureDiagramType: 'pipeline-flow',
    architectureDiagramData: {
      title: 'Knowledge Graph Processing Pipeline',
      description: 'Simple 5-stage pipeline: INPUT → EXTRACT → EMBED → STORE → CONCEPTS',
      layout: 'horizontal',
      nodes: [
        { id: 'input', label: 'INPUT\n8.6k chars', type: 'client', x: 150, y: 200 },
        { id: 'extract', label: 'EXTRACT\n44s\n20 triples', type: 'process', x: 400, y: 200 },
        { id: 'embed', label: 'EMBED\ninline\n80 vectors', type: 'service', x: 650, y: 200 },
        { id: 'store', label: 'STORE\ninline\n20 stored', type: 'database', x: 900, y: 200 },
        { id: 'concepts', label: 'CONCEPTS\n47s\n0 concepts', type: 'process', x: 1150, y: 200 }
      ],
      links: [
        { source: 'input', target: 'extract', type: 'flow', animated: true },
        { source: 'extract', target: 'embed', type: 'flow', animated: true },
        { source: 'embed', target: 'store', type: 'flow', animated: true },
        { source: 'store', target: 'concepts', type: 'flow', animated: true }
      ],
    },
    status: 'PRODUCTION',
    role: 'Sole developer',
    timeline: 'June 2025 - ongoing',
    scope: 'AI pipeline architecture, knowledge extraction, vector embeddings, MCP protocol',
    metrics: [
      { value: '20', label: 'Triples/Doc', color: 'cyan' },
      { value: '$0.0012', label: 'Cost per Document', color: 'yellow' },
      { value: '94s', label: 'Processing Time', color: 'green' },
      { value: '80', label: 'Vectors/Doc', color: 'purple' }
    ],
    safetyAndReliability: [
      'Detailed benchmark reporting: $0.0012 cost, 94s processing',
      'Per-operation token usage monitoring and cost tracking',
      'Manual review of extraction quality and results',
      'Pipeline failure logging without automatic retries'
    ],
    aiEvaluation: 'Optimized for cost/speed using gpt-4o-mini with parallel calls and reduced input tokens. 94.4-second processing of 8668-character documents generating 20 triples and 80 vectors at $0.0012 cost. Three-stage pipeline with four-stage extraction methodology for comprehensive relationship mapping. Current development focus on concept generation stage optimization while maintaining sub-$0.002 cost target. Token efficiency: 3643 input, 1182 output tokens per operation. Architecture prioritizes practical deployment cost over experimental model exploration.',
    challenges: [
      'Production Performance Crisis & Systematic Optimization: Initial production system suffered catastrophic performance (66.6ms/token, 45-second timeouts) making knowledge graphs unusable for real-time AI agents. Without systematic monitoring, optimization efforts targeted wrong components, missing that AI extraction consumed 95%+ of processing time.',
      'Architecture Redesign for Cost & Scale: Legacy architecture with 2,100+ lines of unmaintainable code, separate vector tables, and massive API cost overruns from duplicate embeddings (same entities embedded 3-4 times per pipeline). Non-atomic database operations created reliability issues.'
    ],
    solutions: [
      'Built comprehensive phase-by-phase timing instrumentation revealing true bottlenecks. Implemented parallel Promise.allSettled extraction architecture and strategic model switching (gpt-5-nano → gpt-4o-mini), achieving systematic 68% performance improvement through data-driven optimization. Medium text processing: 66.5s → ~20s, 70-80% embedding cost reduction.',
      'Architected pure functional system with zero hidden state, unified VectorEmbedding table, and embedding map caching. Implemented batchStoreKnowledge() with atomic transactions and generateEmbeddingMap() for single upfront batch generation of unique texts. Clean maintainable architecture, 100% cache hit rate, 80% API cost reduction.'
    ],
    codeExamples: [
      {
        title: 'Advanced Prompt Engineering for Knowledge Graph Extraction',
        impactContext: 'This type-specific approach improved extraction accuracy by 40% over generic prompts, particularly for temporal and causal relationships in event-event extraction.',
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
• **Scalable type system**: Easy to add new relationship categories`
      }
    ],
    skills: [
      {
        name: 'TypeScript',
        proficiency: 'Expert',
        category: 'Languages',
        usage: 'Built both HTTP and STDIO implementations of MCP protocol'
      },
      {
        name: 'MCP Protocol',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Implemented full Model Context Protocol specification'
      },
      {
        name: 'Vector Embeddings',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Generated 424 semantic embeddings per document'
      },
      {
        name: 'GPT-4',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Evaluated model variants for optimal pipeline performance'
      },
      {
        name: 'Pipeline Architecture',
        proficiency: 'Expert',
        category: 'Infrastructure',
        usage: '3-stage distributed pipeline for knowledge extraction'
      },
      {
        name: 'Knowledge Graphs',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Extracted 106 semantic triples per document'
      },
      {
        name: 'Academic Research',
        proficiency: 'Proficient',
        category: 'AI/ML',
        usage: 'Integrated latest research into production implementation'
      }
    ],
    github: 'https://github.com/Andrewske/kg-memory-mcp'
  },
  {
    id: 'personal-management',
    title: 'PersonalManagementSystem',
    className: 'PersonalManagementSystem',
    description: 'Custom AI agent ecosystem for multi-project workflows',
    subtitle: 'Specialized AI agent platform for domain-specific assistance',
    businessImpact: 'Context-aware AI agents providing personalized guidance across career, finance, and health domains',
    longDescription: 'Novel personal AI management system using Claude Code\'s file-based context for specialized agent domains. Created isolated agents for career coaching (Anthropic application prep), work project management (Bonanza), and podcast conversation analysis. Innovative approach leverages existing Claude Code infrastructure rather than building custom chatbot solutions, with planned knowledge graph integration for cross-agent memory sharing.',
    architecture: '**Agent Isolation Architecture**: Each specialized agent operates in separate filesystem directories with dedicated CLAUDE.md configuration files defining domain expertise, context boundaries, and behavioral patterns. Workflow involves cd into agent directory + new Claude Code instance, creating complete context isolation between domains (career coaching vs work management vs health tracking). **Context Management Strategy**: Agent specialization achieved through prompt engineering in CLAUDE.md rather than model fine-tuning. Career Coach agent includes achievement tracking methodology, confidence calibration protocols, and industry-specific language patterns. Work agents maintain project context and task prioritization logic. Personal agents handle ADHD-aware nutrition planning and mental health support patterns. **Cross-Agent Memory Integration**: Planned integration with Knowledge Graph MCP for shared information layer. Current limitation: agents cannot share context across domains. Solution: kg-memory-mcp will serve as centralized knowledge store enabling agents to query shared experiences, achievements, and insights while maintaining specialized domain expertise. **Innovative Engineering Approach**: Leverages Claude Code\'s existing file-based context system rather than building custom infrastructure. Cost-effective alternative to fine-tuned models or custom chatbot development. Demonstrates practical AI application for personal productivity beyond traditional software development use cases.',
    status: 'ACTIVE',
    role: 'Sole developer',
    timeline: 'June 2025 - ongoing',
    scope: 'agent architecture, context management, specialized AI assistants, workflow automation',
    metrics: [
      { value: 'Career', label: 'Coaching Agent', color: 'cyan' },
      { value: 'Tech', label: 'Docs Agent', color: 'yellow' },
      { value: 'Project', label: 'Management', color: 'green' },
      { value: 'MCP', label: 'Architecture', color: 'purple' }
    ],
    safetyAndReliability: [
      'Agent isolation via folder-based context separation',
      'File-based permissions using claude.md configurations',
      'Claude Code built-in conversation history management',
      'Personal project scope with controlled data input'
    ],
    aiEvaluation: 'Novel Claude Code-powered agent ecosystem using Opus/Sonnet models with persistent file-based context. Specialized agents: Career Coach (Anthropic application prep), Bonanza Project Manager (prioritization), Budget Analyst (CSV transaction analysis), Diet/Meal Planner (ADHD-aware nutrition). Agents maintain domain expertise through continuous context evolution rather than traditional model fine-tuning. Architecture leverages Claude Code\'s built-in context management for cost-effective specialized assistance across personal productivity domains.',
    skills: [
      {
        name: 'Claude Code',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Built custom agent ecosystem for personal productivity'
      },
      {
        name: 'Prompt Engineering',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Advanced specialization techniques for domain-specific agents'
      },
      {
        name: 'Knowledge Management',
        proficiency: 'Expert',
        category: 'Data & Analytics',
        usage: 'Personal knowledge base beyond traditional coding'
      },
      {
        name: 'MCP Protocol',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Leveraged MCP architecture for agent communication'
      },
      {
        name: 'Agent Architecture',
        proficiency: 'Expert',
        category: 'AI/ML',
        usage: 'Designed multi-agent system with specialized domains'
      }
    ]
  }
];

export const getAllSkills = (): string[] => {
  const skillSet = new Set<string>();
  projects.forEach(project => {
    project.skills.forEach(skill => {
      skillSet.add(skill.name);
    });
  });
  return Array.from(skillSet).sort();
};

export const getSkillsByCategory = (category: SkillCategory): string[] => {
  const skillSet = new Set<string>();
  projects.forEach(project => {
    project.skills
      .filter(skill => skill.category === category)
      .forEach(skill => {skillSet.add(skill.name)});
  });
  return Array.from(skillSet).sort();
};

export const getProjectsBySkill = (skillName: string): Project[] => {
  return projects.filter(project =>
    project.skills.some(skill => skill.name === skillName)
  );
};

export const getProjectsByCategory = (category: SkillCategory): Project[] => {
  return projects.filter(project =>
    project.skills.some(skill => skill.category === category)
  );
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getCategoryVariant = (category: SkillCategory) => {
  switch (category) {
    case 'Languages':
      return 'categoryLanguages';
    case 'Frontend':
      return 'categoryFrontend';
    case 'Backend':
      return 'categoryBackend';
    case 'AI/ML':
      return 'categoryAiMl';
    case 'Data & Analytics':
      return 'categoryData';
    case 'APIs & Integrations':
      return 'categoryApis';
    case 'Infrastructure':
      return 'categoryInfrastructure';
    default:
      return 'categoryLanguages';
  }
};

export const getCategoryColor = (category: SkillCategory) => {
  switch (category) {
    case 'Languages':
      return 'text-purple-300';
    case 'Frontend':
      return 'text-blue-300';
    case 'Backend':
      return 'text-yellow-300';
    case 'AI/ML':
      return 'text-cyan-300';
    case 'Data & Analytics':
      return 'text-green-300';
    case 'APIs & Integrations':
      return 'text-orange-300';
    case 'Infrastructure':
      return 'text-red-300';
    default:
      return 'text-purple-300';
  }
};

export const groupSkillsByCategory = (skills: ProjectSkill[]) => {
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, ProjectSkill[]>);

  // Sort categories in a logical order
  const categoryOrder: SkillCategory[] = [
    'Languages',
    'Frontend',
    'Backend',
    'AI/ML',
    'Data & Analytics',
    'APIs & Integrations',
    'Infrastructure'
  ];

  const sortedGrouped: [SkillCategory, ProjectSkill[]][] = [];
  categoryOrder.forEach(category => {
    if (grouped[category]) {
      sortedGrouped.push([category, grouped[category]]);
    }
  });

  return sortedGrouped;
};