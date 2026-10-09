import type { Project } from '~/lib/projects/types'

export const zohoTwilio: Project = {
  id: 'zoho-twilio',
  title: 'ZohoTwilioIntegration',
  className: 'ZohoTwilioIntegration',
  description: 'Production SMS system enabling 12 studios to engage 9,000+ leads',
  subtitle: 'Real-time CRM-SMS integration with automated lead engagement',
  businessImpact: 'Automated SMS workflows reducing manual lead processing time by 80%',
  longDescription:
    'Built production SaaS platform as solo engineer: Full-stack SMS system enabling 12 studios to engage 9,000+ leads directly from Zoho CRM, processing 43,000+ messages. Shipped end-to-end solution in 4 weeks.',
  architecture:
    '**Webhook Processing Flow**: Zoho CRM triggers webhook on new lead → Platform validates studio ownership via phone number mapping → Creates task in Zoho for agent follow-up → Routes SMS to lead via studio-specific Twilio/Zoho Voice number. **Multi-Tenant Isolation**: Studios table maps Zoho User IDs to dedicated SMS phone numbers. Each studio maintains separate OAuth tokens in StudioAccount junction table. Messages table enforces tenant boundaries with studioId foreign key, preventing cross-studio data access. **Real-Time Message Routing**: Dual-provider architecture (Twilio + Zoho Voice) with automatic failover. Incoming SMS webhooks identify studio by destination phone number, parse STOP/YES keywords for automated workflows, create Zoho tasks for manual responses. Admin phone number override enables managers to text from any studio context. **Error Handling & Reliability**: Centralized error handling wrapper with PostHog logging. Webhook returns HTTP 200 even on partial failures to prevent Twilio retries. Database-first approach ensures message persistence before API calls. Token refresh middleware handles Zoho OAuth expiration transparently.',
  status: 'ACTIVE',
  role: 'Sole developer',
  timeline: 'Nov 2023 - ongoing',
  scope: 'API integration, webhook handling, multi-tenant SMS delivery, error tracking',
  metrics: [
    {
      value: '43k+',
      label: 'Total Messages',
      description: 'SMS messages processed across 12 studios for lead engagement',
      color: 'cyan',
    },
    {
      value: '9k+',
      label: 'Leads Engaged',
      description: 'Unique leads engaged through automated CRM-SMS workflows',
      color: 'yellow',
    },
    {
      value: '12',
      label: 'Active Studios',
      description: 'Active fitness studios using the multi-tenant platform',
      color: 'green',
    },
    {
      value: '4wks',
      label: 'Ship Time',
      description: 'Development time from concept to production deployment',
      color: 'purple',
    },
  ],
  safetyAndReliability: [
    'Multi-tenant data isolation via Studios table architecture',
    'Phone number validation for webhook authentication',
    'STOP message parsing for SMS compliance',
    'PostHog monitoring for production error tracking',
  ],
  challenges: [
    'Multi-Tenant Data Isolation & Routing Complexity: Building secure tenant boundaries where 12 studios share infrastructure but maintain complete data isolation. Required sophisticated routing logic mapping Zoho User IDs to dedicated phone numbers, separate OAuth token management in StudioAccount junction table, and studio-specific message partitioning. Admin phone number override added complexity requiring context switching between studio permissions.',
    'Race Condition Handling in Dual-Provider Message Synchronization: Managing message consistency across Twilio and Zoho Voice APIs with different response patterns and timing. Zoho Voice messages created multiple database records due to race conditions between message creation and API sync. Required intelligent deduplication system handling timing proximity (±5 minute window), content matching, and phone number normalization.',
    'Rapid Production Deployment Under 4-Week Timeline: Shipping production-ready SaaS platform with enterprise-grade reliability in compressed timeframe. Required making architecture decisions quickly while ensuring scalability, implementing comprehensive error handling, establishing monitoring systems, and maintaining code quality under pressure without compromising long-term maintainability.',
  ],
  solutions: [
    'Studio-Based Multi-Tenant Architecture with Secure Isolation: Implemented Studios table mapping Zoho User IDs to dedicated SMS phone numbers with complete OAuth token separation via StudioAccount junction table. Messages table enforces tenant boundaries through studioId foreign key, preventing cross-studio data access. Admin phone number override enables managers to text from any studio context while maintaining security boundaries.',
    'Sophisticated Message Deduplication System with Race Condition Prevention: Built multi-criteria duplicate detection system checking zohoMessageId, content, phone numbers, and timing proximity (±5 minute window). Implemented database-first persistence strategy updating existing messages with missing zohoMessageId rather than creating duplicates. Enhanced sync process with atomic operations and centralized deduplication utilities.',
    'Database-First Architecture with Centralized Error Handling: Designed webhook processing that always returns HTTP 200 (even on partial failures) to prevent Twilio retries, while implementing database-first approach ensuring message persistence before API calls. Built centralized error handling wrapper with PostHog logging, token refresh middleware for transparent OAuth management, and comprehensive monitoring for production reliability.',
  ],
  lessonsLearned: [
    'Scale-Appropriate Multi-Tenancy Over Complex Patterns: For B2B SaaS with 12 studios, simple phone number-based tenant isolation proved more reliable than complex tenant management systems. Engineering judgment in choosing maintainable solutions appropriate for actual scale often outperforms following enterprise patterns designed for larger systems.',
    'Race Condition Prevention Through Intelligent Deduplication: Rather than complex locking mechanisms, smart deduplication with timing proximity detection (±5 minutes) and content matching created robust real-time integration. Sometimes simple approaches to distributed system problems outperform sophisticated but brittle solutions.',
    'Webhook Reliability via Simple Error Handling: Always returning HTTP 200 status (regardless of processing success) combined with database-first persistence created more reliable integration than complex retry logic. Production systems benefit from predictable behavior over sophisticated error handling when dealing with external webhook providers.',
  ],
  skills: [
    {
      name: 'Next.js',
      proficiency: 'Production Daily',
      category: 'Frontend',
      usage: 'Built full-stack SaaS platform with custom Zoho CRM extension',
    },
    {
      name: 'TypeScript',
      proficiency: 'Production Daily',
      category: 'Languages',
      usage: 'Type-safe multi-tenant routing logic and API integrations',
    },
    {
      name: 'Prisma',
      proficiency: 'Production Proven',
      category: 'Backend',
      usage: 'ORM for PostgreSQL with complex multi-tenant data models',
    },
    {
      name: 'PostgreSQL',
      proficiency: 'Production Daily',
      category: 'Backend',
      usage: 'Stored 43k+ messages with studio-specific partitioning',
    },
    {
      name: 'Twilio API',
      proficiency: 'Production Proven',
      category: 'APIs & Integrations',
      usage: 'Dynamic routing between studio-specific phone numbers',
    },
    {
      name: 'Zoho CRM API',
      proficiency: 'Production Proven',
      category: 'APIs & Integrations',
      usage: 'Custom CRM extension with intuitive chat interface',
    },
    {
      name: 'Webhook Architecture',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: 'Real-time message synchronization and automated sequences',
    },
    {
      name: 'Multi-tenant Architecture',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: 'Complex routing logic based on agent context and permissions',
    },
    {
      name: 'PostHog',
      proficiency: 'Working Knowledge',
      category: 'Infrastructure',
      usage: 'Production monitoring and rapid issue resolution',
    },
    {
      name: 'Rapid Prototyping',
      proficiency: 'Production Proven',
      category: 'Infrastructure',
      usage: 'Shipped complete solution in 4 weeks as solo engineer',
    },
  ],
  codeExamples: [
    {
      title: 'Multi-Criteria Message Deduplication System',
      impactContext:
        'This deduplication system solved race condition issues causing duplicate database records for Zoho Voice messages, reducing data inconsistencies by 100% through intelligent timing proximity detection (±5 minute window) and content matching.',
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
• **Update vs create strategy**: Updates existing records rather than creating duplicates`,
    },
  ],
  github: 'https://github.com/Andrewske/zoho_twilio_integration_t3',
}
