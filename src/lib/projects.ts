export type ProficiencyLevel = 'Production Daily' | 'Production Proven' | 'Working Knowledge' | 'Exploring';

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

// Define project display order (can be easily modified)
const PROJECT_DISPLAY_ORDER = [
  'knowledge-graph-mcp',
  'ai-product-optimizer',
  'personal-management',
  'analytics-platform',
  'zoho-twilio',
  'masakali-booking',
  'music-minion-cli'
];

const projectsData: Project[] = [
  {
    id: 'analytics-platform',
    title: 'AnalyticsPlatform',
    className: 'AnalyticsPlatform',
    description: 'Executive analytics platform for real-time business intelligence',
    subtitle: 'Processes 160M+ order records with static Parquet architecture achieving sub-second dashboard loads',
    businessImpact: 'Provides executives instant access to business intelligence that previously required manual database queries',
    longDescription: 'An executive analytics platform I built from scratch when existing solutions couldn\'t handle the scale and constraints. After investigating the query timeouts with 160M+ records, I realized we needed a completely different approach than traditional database-API-frontend architecture. My breakthrough was designing a static file system that transforms expensive API infrastructure into compressed Parquet files served directly to browsers. This approach eliminated thousands in monthly hosting costs while achieving instant dashboard performance.',
    architecture: '**Static Data Pipeline**: MySQL 5.7 → Python/Polars processing → Compressed Parquet files → Direct frontend loading via hyparquet. **My Incremental System**: I built timestamp-based change detection that processes only modified records, reducing 20-minute full scans to 5-minute targeted updates. **Frontend Innovation**: JSON index files map date ranges to Parquet row groups, enabling instant filtering without API calls. **Deployment Strategy**: Two-repository system where my backend writes processed files directly to frontend repository, deployed as static assets on Vercel, eliminating API hosting costs while maintaining sub-second performance.',
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
      'My incremental updates process only changed records, reducing load on production database by 75%',
      'Rollbar monitoring alerts on processing failures with automated recovery strategies',
      'Static Parquet files eliminate API downtime risks while maintaining data freshness (5min updates)',
      'Type validation and data integrity checks during my pandas→Polars processing pipeline',
      'Index-based chunking enables instant filtering across years of daily aggregated data'
    ],
    skills: [
      {
        name: 'React',
        proficiency: 'Production Daily',
        category: 'Frontend',
        usage: 'Built complex dashboards with 13 internal views for data visualization'
      },
      {
        name: 'TypeScript',
        proficiency: 'Production Daily',
        category: 'Languages',
        usage: 'Ensured type safety across the entire full-stack application'
      },
      {
        name: 'Polars',
        proficiency: 'Production Proven',
        category: 'Data & Analytics',
        usage: 'Optimized data processing from 10+ min to under 5 min for 160M+ records'
      },
      {
        name: 'MySQL',
        proficiency: 'Working Knowledge',
        category: 'Backend',
        usage: 'Advanced query optimization on legacy MySQL 5.7 with read-only constraints'
      },
      {
        name: 'SQL Optimization',
        proficiency: 'Production Proven',
        category: 'Data & Analytics',
        usage: 'Reduced query times by 50% through advanced indexing and query restructuring'
      },
      {
        name: 'Tanstack Router/Query',
        proficiency: 'Working Knowledge',
        category: 'Frontend',
        usage: 'Implemented complex routing and data fetching patterns'
      },
      {
        name: 'AWS',
        proficiency: 'Working Knowledge',
        category: 'Infrastructure',
        usage: 'Deployed scalable multi-tenant architecture on AWS'
      },
      {
        name: 'Express.js',
        proficiency: 'Working Knowledge',
        category: 'Backend',
        usage: 'Built secure REST APIs with authentication and private routing'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Production Daily',
        category: 'Backend',
        usage: 'Designed multi-tenant database architecture for B2B customers'
      },
      {
        name: 'Data Visualization',
        proficiency: 'Production Proven',
        category: 'Data & Analytics',
        usage: 'Created intuitive charts and graphs for complex business metrics'
      }
    ],
    challenges: [
      'Legacy Database Performance Crisis: I faced constant query timeouts and memory issues processing 160M+ records on read-only MySQL 5.7. Couldn\'t create indexes, temporary tables, or use modern SQL features (CTEs) released after 2015. This forced me to completely rewrite every query and develop creative optimization strategies.',
      'Frontend Bundle Size Disaster: I discovered that my initial JSON-based architecture was creating 25MB+ bundle sizes, causing terrible loading performance. Users were abandoning dashboards before they loaded. I needed a fundamental shift in data format and processing approach while maintaining sub-second responsiveness.',
      'Executive Data Access Bottleneck: Leadership had no real-time access to critical business metrics across 2M offers and $143M GMV operations. They were stuck with manual queries that took hours and outdated dashboards requiring constant interpretation, creating decision-making bottlenecks.'
    ],
    solutions: [
      'Query Optimization & Processing Revolution: I rewrote every query from scratch to work within MySQL 5.7 constraints, using subqueries and EXISTS clauses instead of modern features. Then I migrated from pandas to Polars, achieving 75% performance gains. My incremental update system tracks only changed records, reducing processing from 20 minutes to 5 minutes.',
      'Static Architecture Innovation: I eliminated API infrastructure entirely by serving compressed Parquet files directly to the frontend. My implementation uses ZSTD compression and hyparquet client-side processing with JSON indexing for instant filtering. This reduced bundle size by 94% (25MB→1.6MB) while maintaining sub-second dashboard performance.',
      'Executive Dashboard Transformation: I replaced manual database queries with automated data pipelines feeding 13 different dashboards. Executives now have instant access to current business metrics instead of waiting for manual query results and interpretation. My system updates every 5 minutes automatically.'
    ],
    lessonsLearned: [
      'Constraint-Driven Innovation Leads to Superior Solutions: The read-only database limitations I faced forced me to create a static architecture that not only solved immediate problems but eliminated hosting costs and improved performance beyond traditional approaches. Sometimes constraints drive more innovative solutions than unlimited resources.',
      'Systematic Optimization Methodology Compounds Results: I learned that breaking down performance problems into measurable components (query optimization, data format, processing pipeline) enables targeted improvements that compound. My 75% query gains + 94% bundle reduction + incremental updates created transformational performance improvement.',
      'Scale-Appropriate Engineering Over Premature Optimization: I discovered that choosing maintainable, cost-effective solutions (static files vs complex API infrastructure) appropriate for the scale and requirements often outperforms sophisticated but unnecessary architectures. Engineering judgment matters more than following standard patterns.'
    ],
    codeExamples: [
      {
        title: 'Intelligent Incremental Update System with Smart Caching',
        impactContext: 'This caching system I built reduced processing time from 20 minutes to 5 minutes by implementing timestamp-based incremental updates with 48-hour lookback windows, eliminating unnecessary full table scans while ensuring data completeness.',
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
  
    // WHAT - Core system identity
    description: 'Vacation rental booking system managing 5 properties with Smoobu integration',
  
    // HOW - Technical approach
    subtitle: 'Webhook-based cross-villa blocking system with automatic inventory updates',
  
    // RESULTS - User value and practical benefits
    businessImpact: 'Enables conflict-free booking operations across 5 properties, generating $30k+ total revenue',
  
    // WHY + STORY - Problem context and system purpose
    longDescription: 'Complete booking platform addressing vacation rental challenges in Indonesia, from payment processing to property management. Uses Xendit for local payment compliance and Smoobu integration for inventory management. Solves the complex problem where Akasha villa (entire building) and Lakshmi villa (downstairs portion) share physical space - traditional booking systems create conflicts, but this platform automatically manages cross-property availability while enabling flexible rental strategies.',
  
    // TECHNICAL DESIGN - Pure system architecture
    architecture: '**Real-Time Booking Flow**: External bookings via Smoobu webhook → Local database sync with automatic cross-villa blocking. Lakshmi villa (downstairs) bookings trigger Akasha villa (whole building) blocks via Smoobu API, and vice versa. **Database Design**: PostgreSQL with Prisma ORM. Unique constraints @@unique([villa_id, date]) enforce availability. Foreign key relationships (villa → reservations). WebhookLog table stores JSON data for external booking events. Indexed columns for query optimization. **Webhook Processing**: Handler processes 5 action types (newReservation, updateReservation, cancelReservation, deleteReservation, updateRates). Filters detect "Masakali Blocked" self-generated reservations. Returns HTTP 200 status to prevent retries. Database-first persistence strategy. PostHog monitoring integration. **Payment Integration**: 14-step Xendit payment flow with 3DS authentication. Token lifecycle management with modal-based verification. Multi-store state coordination (useCartForm, useXenditStore, useFetchPaymentData). Atomic database operations across booking confirmation pipeline.',
  
    status: 'ACTIVE',
    role: 'Sole developer',
    timeline: 'July 2020 - ongoing',
    scope: 'full-stack development, payment integration, booking system, multi-tenant architecture',
  
    metrics: [
      { value: '$30k+', label: 'Total Revenue', color: 'cyan' },
      { value: '0', label: 'Double Bookings', color: 'yellow' },
      { value: 'Instant', label: 'Sync Updates', color: 'green' },
      { value: '5', label: 'Properties', color: 'purple' }
    ],
  
    safetyAndReliability: [
      'Zero double-bookings via Smoobu API real-time validation',
      'Webhook-based availability updates prevent conflicts',
      'PostHog error logging for API integration monitoring',
      'Payment processing via secure third-party APIs'
    ],
  
    // Enhanced with Kevin's authentic voice
    challenges: [
      'Shared Building Logic & Cross-Villa Conflicts: Had to work around the fact that Akasha villa (entire building) and Lakshmi villa (downstairs only) represent the same physical space. The real challenge was creating booking logic where reserving one villa must automatically block the other while maintaining separate booking channels and pricing strategies. Couldn\'t find existing tools that handled this kind of complex property relationship.',
      'Real-Time Inventory Synchronization Across Multiple Platforms: Managing 5 different webhook action types (newReservation, updateReservation, cancelReservation, deleteReservation, updateRates) from external booking platforms via Smoobu API. Had to ensure immediate availability updates across all platforms while handling webhook reliability, duplicate processing, and maintaining data consistency.',
      'Payment Processing with Limited Documentation: Integrating Indonesian payment processor Xendit with minimal documentation. Had to reverse-engineer the 14-step payment flow including 3DS authentication, token management, and modal-based verification. Built production-ready payment processing without comprehensive vendor support.'
    ],
  
    // Personal ownership with "I built/designed" language
    solutions: [
      'Intelligent Cross-Villa Blocking System via Smoobu API: I implemented automatic blocking logic where Lakshmi bookings trigger my blockVilla() function to create "Masakali Blocked" reservations for Akasha villa via Smoobu API, and vice versa. I designed the database with unique constraints on (villa_id, date) pairs, while Smoobu API validation prevents conflicts at source, eliminating the need for complex local locking mechanisms.',
      'Robust Webhook Architecture with Smart Error Handling: I built comprehensive webhook processor handling 5 action types with intelligent filtering to detect self-generated "Masakali Blocked" reservations. My webhook always returns HTTP 200 status (even on partial failures) to prevent Twilio retries, while implementing database-first persistence strategy and PostHog monitoring for production error tracking.',
      'Reverse-Engineered Payment Flow with State Management: I mapped the complete 14-step Xendit payment process through systematic testing and documentation. I implemented multi-store state coordination (useCartForm, useXenditStore, useFetchPaymentData) with proper token lifecycle management, 3DS modal handling, and atomic database operations ensuring payment consistency across the booking confirmation pipeline.'
    ],
  
    // Keep existing or remove per your preference
    lessonsLearned: [
      'Scale-Appropriate Engineering Over Complex Patterns: For 5-villa operations with low traffic, simple manual oversight and reliable webhook processing proved more effective than complex automated systems. Engineering judgment matters more than following enterprise patterns when scale doesn\'t justify complexity.',
      'Webhook Reliability Through Simple Patterns: Always returning HTTP 200 (regardless of processing success), implementing database-first persistence, and smart filtering to prevent infinite loops created robust real-time integration. Sometimes simple approaches outperform sophisticated error handling for production reliability.',
      'API Integration Without Documentation: Systematic reverse-engineering through controlled testing, comprehensive state mapping, and building internal documentation proved essential for production integrations with limited vendor support. Building thorough understanding of payment flows enabled confident production deployment.'
    ],
  
    // Keep existing skills, codeExamples, and other fields as they were
    skills: [
      {
        name: 'Next.js',
        proficiency: 'Production Daily',
        category: 'Frontend',
        usage: 'Migrated from React/Redux to Next.js for better performance and SEO'
      },
      {
        name: 'Redux',
        proficiency: 'Working Knowledge',
        category: 'Frontend',
        usage: 'Managed complex booking state before Next.js migration'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Production Daily',
        category: 'Backend',
        usage: 'Stored booking data with complex availability logic for 5 listings'
      },
      {
        name: 'Smoobu API',
        proficiency: 'Production Proven',
        category: 'APIs & Integrations',
        usage: 'Real-time inventory sync across Booking.com and Airbnb'
      },
      {
        name: 'Xendit API',
        proficiency: 'Working Knowledge',
        category: 'APIs & Integrations',
        usage: 'Integrated Indonesian payment processor with limited documentation'
      },
      {
        name: 'Webhook Architecture',
        proficiency: 'Production Proven',
        category: 'Infrastructure',
        usage: 'Replaced polling with webhooks: 3+ seconds → instant updates'
      },
      {
        name: 'TypeScript',
        proficiency: 'Production Daily',
        category: 'Languages',
        usage: 'Type-safe API integrations and complex booking logic'
      },
      {
        name: 'Real-time Sync',
        proficiency: 'Production Proven',
        category: 'Backend',
        usage: 'Zero double-bookings through instant inventory synchronization'
      },
      {
        name: 'Multi-CDN',
        proficiency: 'Working Knowledge',
        category: 'Infrastructure',
        usage: 'Image optimization across multiple CDN providers'
      }
    ],
  
    // Keep existing codeExamples
    codeExamples: [
      {
        title: 'Intelligent Cross-Villa Blocking System',
        impactContext: 'This blocking system prevents double-bookings of shared physical space by automatically creating API reservations when either Akasha (full building) or Lakshmi (downstairs) is booked, ensuring zero conflicts.',
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
    status: 'ACTIVE',
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
    challenges: [
      'Multi-Tenant Data Isolation & Routing Complexity: Building secure tenant boundaries where 12 studios share infrastructure but maintain complete data isolation. Required sophisticated routing logic mapping Zoho User IDs to dedicated phone numbers, separate OAuth token management in StudioAccount junction table, and studio-specific message partitioning. Admin phone number override added complexity requiring context switching between studio permissions.',
      'Race Condition Handling in Dual-Provider Message Synchronization: Managing message consistency across Twilio and Zoho Voice APIs with different response patterns and timing. Zoho Voice messages created multiple database records due to race conditions between message creation and API sync. Required intelligent deduplication system handling timing proximity (±5 minute window), content matching, and phone number normalization.',
      'Rapid Production Deployment Under 4-Week Timeline: Shipping production-ready SaaS platform with enterprise-grade reliability in compressed timeframe. Required making architecture decisions quickly while ensuring scalability, implementing comprehensive error handling, establishing monitoring systems, and maintaining code quality under pressure without compromising long-term maintainability.'
    ],
    solutions: [
      'Studio-Based Multi-Tenant Architecture with Secure Isolation: Implemented Studios table mapping Zoho User IDs to dedicated SMS phone numbers with complete OAuth token separation via StudioAccount junction table. Messages table enforces tenant boundaries through studioId foreign key, preventing cross-studio data access. Admin phone number override enables managers to text from any studio context while maintaining security boundaries.',
      'Sophisticated Message Deduplication System with Race Condition Prevention: Built multi-criteria duplicate detection system checking zohoMessageId, content, phone numbers, and timing proximity (±5 minute window). Implemented database-first persistence strategy updating existing messages with missing zohoMessageId rather than creating duplicates. Enhanced sync process with atomic operations and centralized deduplication utilities.',
      'Database-First Architecture with Centralized Error Handling: Designed webhook processing that always returns HTTP 200 (even on partial failures) to prevent Twilio retries, while implementing database-first approach ensuring message persistence before API calls. Built centralized error handling wrapper with PostHog logging, token refresh middleware for transparent OAuth management, and comprehensive monitoring for production reliability.'
    ],
    lessonsLearned: [
      'Scale-Appropriate Multi-Tenancy Over Complex Patterns: For B2B SaaS with 12 studios, simple phone number-based tenant isolation proved more reliable than complex tenant management systems. Engineering judgment in choosing maintainable solutions appropriate for actual scale often outperforms following enterprise patterns designed for larger systems.',
      'Race Condition Prevention Through Intelligent Deduplication: Rather than complex locking mechanisms, smart deduplication with timing proximity detection (±5 minutes) and content matching created robust real-time integration. Sometimes simple approaches to distributed system problems outperform sophisticated but brittle solutions.',
      'Webhook Reliability via Simple Error Handling: Always returning HTTP 200 status (regardless of processing success) combined with database-first persistence created more reliable integration than complex retry logic. Production systems benefit from predictable behavior over sophisticated error handling when dealing with external webhook providers.'
    ],
    skills: [
      {
        name: 'Next.js',
        proficiency: 'Production Daily',
        category: 'Frontend',
        usage: 'Built full-stack SaaS platform with custom Zoho CRM extension'
      },
      {
        name: 'TypeScript',
        proficiency: 'Production Daily',
        category: 'Languages',
        usage: 'Type-safe multi-tenant routing logic and API integrations'
      },
      {
        name: 'Prisma',
        proficiency: 'Production Proven',
        category: 'Backend',
        usage: 'ORM for PostgreSQL with complex multi-tenant data models'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Production Daily',
        category: 'Backend',
        usage: 'Stored 43k+ messages with studio-specific partitioning'
      },
      {
        name: 'Twilio API',
        proficiency: 'Production Proven',
        category: 'APIs & Integrations',
        usage: 'Dynamic routing between studio-specific phone numbers'
      },
      {
        name: 'Zoho CRM API',
        proficiency: 'Production Proven',
        category: 'APIs & Integrations',
        usage: 'Custom CRM extension with intuitive chat interface'
      },
      {
        name: 'Webhook Architecture',
        proficiency: 'Production Proven',
        category: 'Infrastructure',
        usage: 'Real-time message synchronization and automated sequences'
      },
      {
        name: 'Multi-tenant Architecture',
        proficiency: 'Production Proven',
        category: 'Infrastructure',
        usage: 'Complex routing logic based on agent context and permissions'
      },
      {
        name: 'Sentry',
        proficiency: 'Working Knowledge',
        category: 'Infrastructure',
        usage: 'Production monitoring and rapid issue resolution'
      },
      {
        name: 'Rapid Prototyping',
        proficiency: 'Production Proven',
        category: 'Infrastructure',
        usage: 'Shipped complete solution in 4 weeks as solo engineer'
      }
    ],
    codeExamples: [
      {
        title: 'Multi-Criteria Message Deduplication System',
        impactContext: 'This deduplication system solved race condition issues causing duplicate database records for Zoho Voice messages, reducing data inconsistencies by 100% through intelligent timing proximity detection (±5 minute window) and content matching.',
        code: `// Sophisticated message deduplication handling race conditions
function areMessagesDuplicates(message1, message2) {
  // Normalize phone numbers for comparison
  const normalizePhone = PhoneFormatter.normalize;

  // Extract relevant fields, handling both database messages and Zoho Voice logs
  const msg1 = {
    message: message1.message?.trim(),
    fromNumber: normalizePhone(message1.fromNumber || message1.from),
    toNumber: normalizePhone(message1.toNumber || message1.to),
    createdAt: new Date(message1.createdAt || message1.created_at)
  };

  const msg2 = {
    message: message2.message?.trim() || message2.messageContent?.trim(),
    fromNumber: normalizePhone(message2.fromNumber || message2.from || message2.senderId),
    toNumber: normalizePhone(message2.toNumber || message2.to || message2.customerNumber),
    createdAt: new Date(message2.createdAt || message2.created_at || message2.createdTime)
  };

  // Check message content match (exact)
  if (msg1.message !== msg2.message) {
    return false;
  }

  // Check phone number matches (normalized)
  if (msg1.fromNumber !== msg2.fromNumber || msg1.toNumber !== msg2.toNumber) {
    return false;
  }

  // Check timing proximity (within 5-minute window for race conditions)
  const timeDiffMs = Math.abs(msg1.createdAt - msg2.createdAt);
  const timeDiffMinutes = timeDiffMs / (1000 * 60);

  return timeDiffMinutes <= 5; // DUPLICATE_TIME_WINDOW_MINUTES
}

// Enhanced deduplication for production reliability
async function deduplicateZohoVoiceMessages(zohoLogs, prisma, customerNumber) {
  if (!zohoLogs.length) {
    return { newMessages: [], messagesToUpdate: [] };
  }

  const formattedCustomerNumber = PhoneFormatter.normalize(customerNumber);

  // Get existing messages for this customer (including those without zohoMessageId)
  const existingMessages = await prisma.message.findMany({
    where: {
      provider: 'zoho_voice',
      OR: [
        { fromNumber: formattedCustomerNumber },
        { toNumber: formattedCustomerNumber }
      ]
    }
  });

  const existingZohoIds = new Set(
    existingMessages
      .filter(msg => msg.zohoMessageId)
      .map(msg => msg.zohoMessageId)
  );

  const newMessages = [];
  const messagesToUpdate = [];

  for (const log of zohoLogs) {
    // Skip if we already have this zohoMessageId
    if (existingZohoIds.has(log.logid)) {
      continue;
    }

    // Check for content/timing duplicates
    const matchingMessage = existingMessages.find(dbMsg =>
      areMessagesDuplicates(dbMsg, log)
    );

    if (matchingMessage && !matchingMessage.zohoMessageId) {
      // Found a matching message without zohoMessageId - update it
      messagesToUpdate.push({
        messageId: matchingMessage.id,
        zohoMessageId: log.logid
      });
    } else if (!matchingMessage) {
      // No duplicate found - this is a new message
      newMessages.push(log);
    }
  }

  return { newMessages, messagesToUpdate };
}`,
        language: 'javascript',
        technicalExplanation: `**Key Engineering Decisions:**
• **Multi-criteria matching**: Content, phone numbers, and timing proximity (±5 min window)
• **Race condition handling**: Timing window accounts for API sync delays between services
• **Phone number normalization**: Consistent formatting across different API response formats
• **Update vs create strategy**: Updates existing records rather than creating duplicates`
      }
    ],
    detailPageUrl: '/zoho-twilio',
    github: 'https://github.com/Andrewske/zoho_twilio_integration_t3'
  },
  {
    id: 'ai-product-optimizer',
    title: 'AIProductOptimizer',
    className: 'AIProductOptimizer',
  
    description: 'Prompt engineering experiments for automated e-commerce title generation at scale',
  
    subtitle: 'Testing of 6 LLMs across 6 processing approaches to find optimal cost-performance balance',
  
    businessImpact: 'Enables cost-effective SEO-optimized title generation for large product catalogs while meeting marketplace\'s strict 75-79 character requirements',
  
    longDescription: 'An e-commerce title optimization tool that generates SEO-optimized product titles within strict marketplace character limits (75-79 characters). The system addresses the challenge of scaling manual SEO work across large product catalogs while maintaining both search optimization and platform compliance requirements.',
  
    architecture: '**Title Optimization Testing**: Six processing approaches evaluated - iterative, async progressive, tool-calling, batch-processing, batch-api, and early-async patterns. **Current Implementation**: OpenAI Batch API with prompt caching delivering 90% cost reduction, handling 57K products with programmatic fallbacks for the 38% that fail character constraints. **Next Architecture**: Hybrid design combining AI feature extraction with deterministic template generation for guaranteed 75-79 character compliance.',
  
    status: 'INTERNAL', 
    role: 'Sole developer',
    timeline: 'July 2025 - ongoing',
    scope: 'LLM evaluation, model comparison, cost optimization, experimental approaches',
  
    metrics: [
      { value: '10x', label: 'Cost Variance', color: 'cyan' },
      { value: '5', label: 'Iterations Avg', color: 'yellow' },
      { value: '0.5-7s', label: 'Processing Time', color: 'green' },
      { value: '62%', label: 'Constraint Compliance', color: 'purple' }
    ],
  
    safetyAndReliability: [
      'Manual validation for experimental/development phase',
      'Token usage tracking for cost scaling analysis',
      'Manual error management during model optimization',
      'Quality assurance through manual review process'
    ],
  

    aiEvaluation: 'Through systematic prompt engineering across 6 LLM models, discovered that explicit character constraints in prompts achieve only 62% compliance despite validation instructions. Tested multiple prompt strategies: iterative refinement with feedback loops, progressive generation with early validation, and tool-calling approaches for constraint checking. Key insight: AI models excel at content optimization but struggle with precise length control, leading to hybrid prompt design combining feature extraction prompts with template completion.',
  

    challenges: [
      'Prompt Engineering Constraint Barrier: Multiple strategies (progressive generation, tool-calling validation, iterative refinement) all failed to achieve reliable character limit compliance, revealing fundamental LLM limitation with precise mathematical instructions rather than prompt design issue.',
  
      'Model Performance vs. Cost Disconnect: Systematic evaluation showed premium models (GPT-5) cost 10x more while delivering identical constraint compliance failures as budget options, with quality improvements that don\'t address the core precision problem.',
  
      'Architecture Scale Dilemma: Individual processing allowed iterative refinement but became economically prohibitive. Batch processing enabled large-scale optimization but removed real-time validation essential for constraint debugging and improvement.'
    ],
  
    solutions: [
      'AI+Template Hybrid Architecture: Shifted from pure generation to intelligent parsing approach where AI extracts product features and reorganizes content, while deterministic templates handle precise character control. This separates AI strengths (content intelligence) from mathematical precision requirements.',
  
      'Strategic Model Optimization: Selected GPT-4o-mini as cost-performance sweet spot, achieving adequate content quality at $0.000075/item through batch processing. Implemented prompt caching for 90% cost reduction on repeated system instructions, making large-scale processing economically viable.',
  
      'Production-Ready Batch Pipeline: Built comprehensive OpenAI Batch API system with automated fallbacks, constraint validation, and error handling. Created monitoring framework tracking compliance rates and cost metrics across different processing approaches.'
    ],
  
    lessonsLearned: [
      'Cost-Quality Analysis Essential Before Production Deployment: Systematic model evaluation revealed that highest accuracy models (GPT-5) cost 10x more with minimal accuracy gains over GPT-4o-mini (95% vs 90%). Economic viability matters more than marginal accuracy improvements for production e-commerce applications. Always establish cost targets before optimizing for quality metrics.',
  
      'Template-Based Optimization Outperforms Pure AI for Constrained Problems: Character limit compliance requires deterministic control that AI models struggle with efficiently. Hybrid approaches combining AI feature extraction with template generation can achieve better cost-performance ratios than pure AI solutions. Sometimes constraints drive innovation toward more efficient architectures.',
  
      'Batch Processing Architecture Enables Economic AI Deployment: Individual API calls for 4,500+ items would cost $600+ and take hours. Batch API reduced costs to $135 and processing time to 30 minutes, achieving linear scaling. Architecture design choices (sequential vs batch vs parallel) have exponential impact on deployment economics for AI applications.'
    ],
  

    codeExamples: [
      {
        title: 'The Real Cost of AI Constraint Compliance: Why "Success" Rates Mislead',
        impactContext: 'This code reveals why 90%+ character compliance became pyrrhic victories - achieving length requirements through expensive iteration made approaches practically unusable despite technical success.',
        code: `# Basic Iterative: 90-100% "Success" Through Brute Force
  max_iterations = 5
  iteration = 0
  total_usage = {'input_tokens': 0, 'output_tokens': 0}
  
  while iteration < max_iterations:
      iteration += 1
      # Make expensive API call
      response = client.chat.completions.create(...)
      total_usage['input_tokens'] += response.usage.prompt_tokens
      total_usage['output_tokens'] += response.usage.completion_tokens
  
      title_length = len(title.strip())
      if 75 <= title_length <= 79:
          return {
              "optimized_title": title,
              "usage": total_usage,  
              "iterations": iteration,
              "cost": calculate_cost(total_usage)  # $0.00014-0.00046
          }
      # Try again with feedback...
  
  # Reality Check: "Success" Metrics vs Business Requirements
  BUSINESS_REQUIREMENTS = {
      'speed': '<1 second per title',      # Actual: 2-7 seconds
      'cost': '<$0.0002 per title',        # Actual: $0.00014-0.00046
      'compliance': '98%+ reliability',    # Actual: 90% after 5 tries
      'quality': 'SEO-optimized content'   # Often sacrificed for length
  }
  
  # The Async Progressive "Improvement" - Still Not Production Ready
  async def process_batch_concurrent():
      # 90%+ compliance, but:
      # - 0.5-2 seconds per title (still too slow)
      # - $0.0001-0.0002 per item (still too expensive)
      # - Multiple concurrent API calls (complexity overhead)
      tasks = [optimize_title(product) for product in batch]
      results = await asyncio.gather(*tasks)
  
      # Cache benefits required volume to materialize
      # Production latency requirements killed this approach
  
  # Current Hybrid Target: Separation of Concerns
  def hybrid_approach():
      # AI parsing: Single call, $0.00005, <0.1 seconds
      components = extract_features_with_ai(product_data)
  
      # Template assembly: Deterministic, free, instant
      title = assemble_with_templates(components, target_length=77)
  
      # Targets: <1s total, <$0.0001, 98-100% compliance
      # AI does intelligence, templates do mathematics`,
        language: 'python',
        technicalExplanation: `**Performance Reality Insights:**
  • **Iteration tax**: 90%+ compliance required 3-5 API calls averaging $0.0003/item vs $0.0001 target
  • **Speed bottleneck**: Even "fast" approaches took 0.5-2s vs <1s requirement for real-time API
  • **Pyrrhic victories**: High technical success rates became business failures due to cost/speed constraints
  • **Architectural solution**: Hybrid approach separates AI intelligence from constraint precision for production viability`
      }
    ],
  
    skills: [
      {
        name: 'Python',
        proficiency: 'Working Knowledge',
        category: 'Languages',
        usage: 'Built batch processing pipeline for 4.5k listings'
      },
      {
        name: 'OpenAI Models',
        proficiency: 'Production Proven',
        category: 'AI/ML',
        usage: 'Optimized GPT-4o-mini for cost-effective title generation'
      },
      {
        name: 'Batch Processing',
        proficiency: 'Production Proven',
        category: 'Data & Analytics',
        usage: 'Linear scaling architecture processing 4.5k items in 30 minutes'
      },
      {
        name: 'PostgreSQL',
        proficiency: 'Production Daily',
        category: 'Backend',
        usage: 'Stored optimized product data and processing metrics'
      },
      {
        name: 'Cost Optimization',
        proficiency: 'Production Proven',
        category: 'AI/ML',
        usage: 'Achieved $0.00003 per item through prompt engineering'
      },
      {
        name: 'OpenAI Models',
        proficiency: 'Production Proven',
        category: 'AI/ML',
        usage: 'Fine-tuned prompts for e-commerce SEO optimization'
      }
    ]
  },
  {
    id: 'knowledge-graph-mcp',
    title: 'KnowledgeGraphMCP',
    className: 'KnowledgeGraphMCP',
    description: 'AI knowledge graph system for processing personal documents into context for AI agents',
    subtitle: 'Parallel extraction pipeline using AutoSchemaKG framework',
    businessImpact: 'Enables AI agents to access personal document context through standardized MCP protocol',
    longDescription: 'Built on AutoSchemaKG framework for automatic knowledge graph construction (https://github.com/HKUST-KnowComp/AutoSchemaKG). I extended the original framework with emotional context extraction because AI agents need to understand personal patterns, work styles, and behavioral tendencies - not just facts and events. Through systematic optimization, I achieved a 68% per-token improvement (64ms/token → 21ms/token) with 70% cost reduction. My architecture processes documents in 67 seconds, prioritizing practical deployment over experimental approaches.',
    architecture: '**Pipeline Design**: I built a three-stage pipeline: document input → parallel extractions (entity-entity, entity-event, event-event, emotional context) → concept generation and deduplication → knowledge graph storage. **Processing Architecture**: My parallel processing approach replaced sequential extraction, achieving 21ms per token processing speed. **MCP Implementation**: I designed dual-transport server architecture supporting both STDIO (Claude Code integration) and HTTP (web applications) because different integration contexts need different protocols. **Performance Engineering**: Built comprehensive caching system achieving 100% cache hit rate with atomic database operations for reliability.',
    // architectureDiagramType: 'pipeline-flow',
    // architectureDiagramData: {
    //   title: '3-Stage Knowledge Processing Pipeline',
    //   description: 'EXTRACTION (63s) → CONCEPTS → DEDUPLICATION → STORAGE (0.5s)',
    //   layout: 'horizontal',
    //   nodes: [
    //     { id: 'extraction', label: 'EXTRACTION\\n63s\\nparallel processing', type: 'process', x: 200, y: 200 },
    //     { id: 'concepts', label: 'CONCEPTS\\nclustering\\ndeduplication', type: 'service', x: 500, y: 200 },
    //     { id: 'storage', label: 'STORAGE\\n0.5s\\natomic operations', type: 'database', x: 800, y: 200 }
    //   ],
    //   links: [
    //     { source: 'extraction', target: 'concepts', type: 'flow', animated: true },
    //     { source: 'concepts', target: 'storage', type: 'flow', animated: true }
    //   ],
    // },
    status: 'ACTIVE',
    role: 'Sole developer',
    timeline: 'July 2025 - ongoing',
    scope: 'AI pipeline architecture, knowledge extraction, vector embeddings, MCP protocol',
    metrics: [
      { value: '21ms', label: 'Per Token', color: 'cyan' },
      { value: '67s', label: 'Processing Time', color: 'green' },
      { value: '70%', label: 'Cost Reduction', color: 'yellow' },
      { value: '100%', label: 'Cache Hit Rate', color: 'purple' }
    ],
    safetyAndReliability: [
      'Built comprehensive benchmark reporting: 21ms per token processing with 67s total time',
      'Implemented 100% cache hit rate through unified embedding architecture',
      'Manual review of extraction quality ensures personal context accuracy',
      'Atomic database operations prevent data inconsistencies and reliability issues'
    ],
    aiEvaluation: 'I selected gpt-4o-mini because my system needs to be economically viable for personal use - experimental models cost 10x more without proportional benefits. I designed domain-specific prompts for four extraction types because emotional context extraction requires different cognitive approaches than standard entity-relationship models. My optimization strategy achieved 68% per-token improvement (64ms/token → 21ms/token) through strategic model selection and parallel processing. I chose practical AI implementation over cutting-edge model exploration because sustainable personal context systems need deployment economics, not research metrics.',
    challenges: [
      'Initial production system suffered catastrophic performance with frequent timeout issues making knowledge graphs unusable for real-time AI agents. Without systematic monitoring, I spent weeks optimizing database queries and vector operations before discovering AI extraction consumed 95% of processing time.',
      'My legacy architecture grew to 2,100+ unmaintainable lines with separate vector tables causing massive API cost overruns. I was embedding the same entities 3-4 times per pipeline without realizing it, and non-atomic database operations created reliability issues that caused data inconsistencies.'
    ],
    solutions: [
      'I built comprehensive phase-by-phase timing instrumentation that revealed the true bottlenecks in my system. My systematic optimization approach included parallel processing architecture and strategic model optimization. This data-driven approach achieved a 68% per-token improvement (64ms/token → 21ms/token) with 70% cost reduction through efficient caching and deduplication.',
      'I completely redesigned the system as a pure functional architecture with zero hidden state and unified embedding storage. My new approach includes comprehensive caching achieving 100% cache hit rate with atomic database operations. Result: clean maintainable architecture with eliminated duplicate processing and reliable data consistency.'
    ],
    lessonsLearned: [
      'I learned that prompt engineering for personal context requires different strategies than business applications - emotional patterns need nuanced extraction techniques that go beyond standard entity-relationship models. Systematic performance monitoring is essential before optimization - I wasted significant time optimizing the wrong components because I lacked proper instrumentation. Building personal AI tools requires understanding individual behavioral patterns, not just technical relationships, which is why I extended AutoSchemaKG with emotional context extraction.'
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
        proficiency: 'Production Daily',
        category: 'Languages',
        usage: 'Built both HTTP and STDIO implementations of MCP protocol'
      },
      {
        name: 'MCP Protocol',
        proficiency: 'Exploring',
        category: 'AI/ML',
        usage: 'Implemented full Model Context Protocol specification with dual transport'
      },
      {
        name: 'Vector Embeddings',
        proficiency: 'Exploring',
        category: 'AI/ML',
        usage: 'Generated semantic embeddings for knowledge graph relationships'
      },
      {
        name: 'OpenAI Models',
        proficiency: 'Production Proven',
        category: 'AI/ML',
        usage: 'Optimized model performance achieving 21ms per token processing'
      },
      {
        name: 'Pipeline Architecture',
        proficiency: 'Production Proven',
        category: 'Infrastructure',
        usage: 'Designed 3-stage pipeline achieving 68% per-token improvement'
      },
      {
        name: 'Knowledge Graphs',
        proficiency: 'Exploring',
        category: 'AI/ML',
        usage: 'Extended AutoSchemaKG framework with emotional context extraction'
      },
      {
        name: 'Performance Optimization',
        proficiency: 'Production Proven',
        category: 'Infrastructure',
        usage: 'Systematic optimization achieved 100% cache hit rate and 70% cost reduction'
      },
      {
        name: 'Academic Research',
        proficiency: 'Exploring',
        category: 'AI/ML',
        usage: 'Integrated latest research into production implementation'
      }
    ],
    github: 'https://github.com/Andrewske/kg-memory-mcp'
  },
  {
    id: 'music-minion-cli',
    title: 'MusicMinionCLI',
    className: 'MusicMinionCLI',
    description: 'Music player CLI built in one day for Claude Code experience',
    subtitle: 'Context-aware music rating system with temporal preference tracking',
    businessImpact: 'Personal tool showcasing rapid CLI development while solving actual music workflow needs',
    longDescription: 'Built music player CLI in one day specifically to get hands-on experience with command-line interfaces before applying to Anthropic Claude Code. Ended up solving real problems with my music workflow - goes beyond simple ratings to track listening context and mood patterns. Designed database schema for future AI analysis of music taste evolution over time.',
    architecture: '**Single-Day CLI Build**: Python 3.12 with MPV integration for cross-platform audio playback. SQLite database stores contextual listening data beyond traditional 5-star ratings. TOML configuration files keep settings simple and readable. **Context Tracking System**: Records when/where/why I\'m listening to specific songs - data structure designed for future machine learning on music preferences. **Modular Design**: Separate modules for player control, library management, and database operations. Built for extensibility even though it was a rapid prototype.',
    status: 'INTERNAL',
    role: 'Sole developer',
    timeline: 'September 2025 - 1 day',
    scope: 'CLI development, audio integration, contextual data modeling',
    metrics: [
      { value: '1 Day', label: 'Build Time', color: 'cyan' },
      { value: 'CLI', label: 'Experience', color: 'yellow' },
      { value: 'Context', label: 'Tracking', color: 'green' },
      { value: 'MPV', label: 'Integration', color: 'purple' }
    ],
    safetyAndReliability: [
      'Cross-platform MPV audio backend',
      'SQLite for reliable data persistence',
      'Modular Python architecture for maintainability',
      'Personal use scope with room for experimentation'
    ],
    skills: [
      {
        name: 'Python',
        proficiency: 'Production Proven',
        category: 'Languages',
        usage: 'Built complete CLI system with modern Python patterns'
      },
      {
        name: 'CLI Development',
        proficiency: 'Exploring',
        category: 'Infrastructure',
        usage: 'Built first CLI project with AI assistance for Claude Code experience'
      },
      {
        name: 'Audio Processing',
        proficiency: 'Exploring',
        category: 'Infrastructure',
        usage: 'MPV integration for music playback and metadata extraction'
      },
      {
        name: 'SQLite',
        proficiency: 'Working Knowledge',
        category: 'Backend',
        usage: 'Context-aware music preference tracking database'
      },
      {
        name: 'Prompt Engineering',
        proficiency: 'Production Proven',
        category: 'AI/ML',
        usage: 'Advanced prompt engineering techniques for music preference tracking'
      },
    ]
  },
  {
    id: 'personal-management',
    title: 'PersonalManagementSystem',
    className: 'PersonalManagementSystem',
    description: 'Custom AI tools for ADHD workflow management and memory assistance',
    subtitle: 'Telegram bot + specialized Claude Code agents built because standard productivity tools don\'t work for my brain',
    businessImpact: 'Solves ADHD-related memory and documentation issues through automated daily journaling and specialized AI coaching',
    longDescription: 'Built custom productivity system because existing tools don\'t fit how my brain works. Telegram bot texts me daily to document activities, then uses AI to format entries and saves them to GitHub for Obsidian sync. Specialized Claude Code agents in separate directories handle different domains: career coaching for Anthropic prep, work project management, diet planning with ADHD-aware nutrition guidance. Can\'t find tools that handle context switching and memory issues properly, so I build my own.',
    architecture: '**Telegram Daily Documentation Bot**: Texts me every day asking what I did, then formats my messy responses with OpenAI and commits them to GitHub as markdown files. Evolved from just activity tracking to food journaling and planning to add spending tracking. Had to work around Google Drive OAuth complexity - ended up using GitHub API for simple storage that syncs with Obsidian automatically. **Specialized Claude Code Agents**: Separate directories for different life domains because context switching breaks focus. Career agent has all my achievement documentation and interview prep context. Diet agent knows my ADHD eating patterns and suggests actual meals I\'ll make. Work agent keeps Bonanza project context separate from personal stuff. Each agent gets its own CLAUDE.md file with domain-specific instructions. **File-Based Context System**: Uses Claude Code\'s built-in file reading instead of building custom chat interfaces. Simple solution - just cd into the right directory and start a new Claude session. **Memory Integration Plan**: Knowledge Graph MCP will eventually connect all agents so career achievements can inform confidence coaching and diet success can influence mood tracking.',
    status: 'ACTIVE',
    role: 'Sole developer',
    timeline: 'June 2025 - ongoing',
    scope: 'Telegram bot development, ADHD-aware tool design, context management, daily automation',
    metrics: [
      { value: 'Daily', label: 'Documentation', color: 'cyan' },
      { value: '3+', label: 'Life Domains', color: 'yellow' },
      { value: 'GitHub', label: 'Auto Sync', color: 'green' },
      { value: 'ADHD', label: 'Optimized', color: 'purple' }
    ],
    safetyAndReliability: [
      'GitHub storage with automatic markdown formatting',
      'Telegram Bot API handles message reliability',
      'Simple file-based context - no complex databases to break',
      'Each agent isolated in separate directories'
    ],
    aiEvaluation: 'Built specialized Claude Code agents because standard productivity tools don\'t handle ADHD context switching. Career Coach keeps achievement documentation and interview prep context. Diet Agent knows my eating patterns and suggests meals I\'ll actually make. Work Agent separates Bonanza project management from personal stuff. Telegram bot automates the documentation I always forget to do manually. Uses Claude Code\'s file system instead of building custom interfaces - simpler and more reliable.',
    skills: [
      {
        name: 'Claude Code',
        proficiency: 'Production Daily',
        category: 'AI/ML',
        usage: 'Power user - built custom agent ecosystem for personal productivity'
      },
      {
        name: 'Prompt Engineering',
        proficiency: 'Production Proven',
        category: 'AI/ML',
        usage: 'Advanced specialization techniques for domain-specific agents'
      },
      {
        name: 'Knowledge Management',
        proficiency: 'Working Knowledge',
        category: 'Data & Analytics',
        usage: 'Personal knowledge base beyond traditional coding'
      },
      {
        name: 'MCP Protocol',
        proficiency: 'Exploring',
        category: 'AI/ML',
        usage: 'Leveraged MCP architecture for agent communication'
      },
      {
        name: 'Agent Architecture',
        proficiency: 'Exploring',
        category: 'AI/ML',
        usage: 'Designed multi-agent system with specialized domains'
      }
    ]
  }
];

// Export projects in the specified display order
export const projects: Project[] = PROJECT_DISPLAY_ORDER.map(projectId => {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) {
    throw new Error(`Project with id "${projectId}" not found in projectsData`);
  }
  return project;
});

export const getAllSkills = (): string[] => {
  const skillSet = new Set<string>();
  projectsData.forEach(project => {
    project.skills.forEach(skill => {
      skillSet.add(skill.name);
    });
  });
  return Array.from(skillSet).sort();
};

export const getSkillsByCategory = (category: SkillCategory): string[] => {
  const skillSet = new Set<string>();
  projectsData.forEach(project => {
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
  return projectsData.find(project => project.id === id);
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