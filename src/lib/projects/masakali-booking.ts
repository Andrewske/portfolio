import type { Project } from '~/lib/projects/types'

export const masakaliBooking: Project = {
  id: 'masakali-booking',
  title: 'MasakaliBookingPlatform',
  className: 'MasakaliBookingPlatform',

  // WHAT - Core system identity
  description: 'Vacation rental booking system managing 5 properties with Smoobu integration',

  // HOW - Technical approach
  subtitle: 'Webhook-based cross-villa blocking system with automatic inventory updates',

  // RESULTS - User value and practical benefits
  businessImpact: 'Enables conflict-free booking operations across 5 properties',

  // WHY + STORY - Problem context and system purpose
  longDescription:
    'Complete booking platform addressing vacation rental challenges in Indonesia, from payment processing to property management. Uses Xendit for local payment compliance and Smoobu integration for inventory management. Solves the complex problem where Akasha villa (entire building) and Lakshmi villa (downstairs portion) share physical space - traditional booking systems create conflicts, but this platform automatically manages cross-property availability while enabling flexible rental strategies.',

  // TECHNICAL DESIGN - Pure system architecture
  architecture:
    '**Real-Time Booking Flow**: External bookings via Smoobu webhook → Local database sync with automatic cross-villa blocking. Lakshmi villa (downstairs) bookings trigger Akasha villa (whole building) blocks via Smoobu API, and vice versa. **Database Design**: PostgreSQL with Prisma ORM. Unique constraints @@unique([villa_id, date]) enforce availability. Foreign key relationships (villa → reservations). WebhookLog table stores JSON data for external booking events. Indexed columns for query optimization. **Webhook Processing**: Handler processes 5 action types (newReservation, updateReservation, cancelReservation, deleteReservation, updateRates). Filters detect "Masakali Blocked" self-generated reservations. Returns HTTP 200 status to prevent retries. Database-first persistence strategy. PostHog monitoring integration. **Payment Integration**: 14-step Xendit payment flow with 3DS authentication. Token lifecycle management with modal-based verification. Multi-store state coordination (useCartForm, useXenditStore, useFetchPaymentData). Atomic database operations across booking confirmation pipeline.',

  status: 'ACTIVE',
  role: 'Sole developer',
  timeline: 'July 2020 - ongoing',
  scope: 'full-stack development, payment integration, booking system, multi-tenant architecture',

  metrics: [
    {
      value: '0',
      label: 'Double Bookings',
      description: 'Double bookings achieved through real-time Smoobu API validation',
      color: 'yellow',
    },
    {
      value: 'Instant',
      label: 'Sync Updates',
      description: 'Webhook-based inventory sync replacing 3+ second polling',
      color: 'green',
    },
    {
      value: '5',
      label: 'Properties',
      description: 'Active villa listings managed across Booking.com and Airbnb',
      color: 'purple',
    },
  ],

  safetyAndReliability: [
    'Zero double-bookings via Smoobu API real-time validation',
    'Webhook-based availability updates prevent conflicts',
    'PostHog error logging for API integration monitoring',
    'Payment processing via secure third-party APIs',
  ],

  // Enhanced with Kevin's authentic voice
  challenges: [
    "Shared Building Logic & Cross-Villa Conflicts: Had to work around the fact that Akasha villa (entire building) and Lakshmi villa (downstairs only) represent the same physical space. The real challenge was creating booking logic where reserving one villa must automatically block the other while maintaining separate booking channels and pricing strategies. Couldn't find existing tools that handled this kind of complex property relationship.",
    'Real-Time Inventory Synchronization Across Multiple Platforms: Managing 5 different webhook action types (newReservation, updateReservation, cancelReservation, deleteReservation, updateRates) from external booking platforms via Smoobu API. Had to ensure immediate availability updates across all platforms while handling webhook reliability, duplicate processing, and maintaining data consistency.',
    'Payment Processing with Limited Documentation: Integrating Indonesian payment processor Xendit with minimal documentation. Had to reverse-engineer the 14-step payment flow including 3DS authentication, token management, and modal-based verification. Built production-ready payment processing without comprehensive vendor support.',
  ],

  // Personal ownership with "I built/designed" language
  solutions: [
    'Intelligent Cross-Villa Blocking System via Smoobu API: I implemented automatic blocking logic where Lakshmi bookings trigger my blockVilla() function to create "Masakali Blocked" reservations for Akasha villa via Smoobu API, and vice versa. I designed the database with unique constraints on (villa_id, date) pairs, while Smoobu API validation prevents conflicts at source, eliminating the need for complex local locking mechanisms.',
    'Robust Webhook Architecture with Smart Error Handling: I built comprehensive webhook processor handling 5 action types with intelligent filtering to detect self-generated "Masakali Blocked" reservations. My webhook always returns HTTP 200 status (even on partial failures) to prevent Smoobu retries, while implementing database-first persistence strategy and PostHog monitoring for production error tracking.',
    'Reverse-Engineered Payment Flow with State Management: I mapped the complete 14-step Xendit payment process through systematic testing and documentation. I implemented multi-store state coordination (useCartForm, useXenditStore, useFetchPaymentData) with proper token lifecycle management, 3DS modal handling, and atomic database operations ensuring payment consistency across the booking confirmation pipeline.',
  ],

  // Keep existing or remove per your preference
  lessonsLearned: [
    "Scale-Appropriate Engineering Over Complex Patterns: For 5-villa operations with low traffic, simple manual oversight and reliable webhook processing proved more effective than complex automated systems. Engineering judgment matters more than following enterprise patterns when scale doesn't justify complexity.",
    'Webhook Reliability Through Simple Patterns: Always returning HTTP 200 (regardless of processing success), implementing database-first persistence, and smart filtering to prevent infinite loops created robust real-time integration. Sometimes simple approaches outperform sophisticated error handling for production reliability.',
    'API Integration Without Documentation: Systematic reverse-engineering through controlled testing, comprehensive state mapping, and building internal documentation proved essential for production integrations with limited vendor support. Building thorough understanding of payment flows enabled confident production deployment.',
  ],

  // Keep existing skills, codeExamples, and other fields as they were
  skills: [
    {
      name: 'Next.js',
      proficiency: 'Production Daily',
      category: 'Frontend',
      usage: 'Migrated from React/Redux to Next.js for better performance and SEO',
    },
    {
      name: 'Redux',
      proficiency: 'Working Knowledge',
      category: 'Frontend',
      usage: 'Managed complex booking state before Next.js migration',
    },
    {
      name: 'PostgreSQL',
      proficiency: 'Production Daily',
      category: 'Backend',
      usage: 'Stored booking data with complex availability logic for 5 listings',
    },
    {
      name: 'Smoobu API',
      proficiency: 'Production Proven',
      category: 'APIs & Integrations',
      usage: 'Real-time inventory sync across Booking.com and Airbnb',
    },
    {
      name: 'Xendit API',
      proficiency: 'Working Knowledge',
      category: 'APIs & Integrations',
      usage: 'Integrated Indonesian payment processor with limited documentation',
    },
    {
      name: 'Webhook Architecture',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: 'Replaced polling with webhooks: 3+ seconds → instant updates',
    },
    {
      name: 'TypeScript',
      proficiency: 'Production Daily',
      category: 'Languages',
      usage: 'Type-safe API integrations and complex booking logic',
    },
    {
      name: 'Real-time Sync',
      proficiency: 'Production Proven',
      category: 'Backend',
      usage: 'Zero double-bookings through instant inventory synchronization',
    },
    {
      name: 'Multi-CDN',
      proficiency: 'Working Knowledge',
      category: 'Infrastructure',
      usage: 'Image optimization across multiple CDN providers',
    },
  ],

  // Keep existing codeExamples
  codeExamples: [
    {
      title: 'Intelligent Cross-Villa Blocking System',
      impactContext:
        'This blocking system prevents double-bookings of shared physical space by automatically creating API reservations when either Akasha (full building) or Lakshmi (downstairs) is booked, ensuring zero conflicts.',
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
  • **Smart naming convention**: "Masakali Blocked" enables webhook filtering to prevent loops`,
    },
  ],

  github: 'https://github.com/Andrewske/masakali-t3',
}
