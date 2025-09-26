# Portfolio Chatbot Implementation Plan

## Overview

This document outlines the complete implementation plan for an AI-powered chatbot for Kevin's portfolio website. The chatbot will answer questions about Kevin's background, projects, and experience using a terminal-style interface inspired by Claude Code.

## Core Architecture Decisions

### AI Provider & Model Selection
**Decision**: Use Vercel AI SDK with Claude 3.5 Sonnet
**Rationale**:
- AI SDK provides excellent Next.js integration with streaming support
- Claude 3.5 Sonnet offers superior conversational experience over cost optimization
- Easy provider switching capabilities for future adjustments
- Terminal-like streaming response aligns with UI design

**Implementation Requirements**:
- Install `ai` package from Vercel
- Configure Anthropic provider with Claude 3.5 Sonnet
- Set up streaming responses for real-time terminal experience
- Input tokens: $3/1M, Output tokens: $15/1M

### Knowledge Base Structure
**Decision**: Streamlined data sources focusing on current information
**Rationale**:
- Remove outdated files (bonanzaExperience.ts, masakaliExperience.ts, education.ts, techStack.ts)
- All relevant information exists in projects.ts and about.ts
- Reduces token count and maintenance overhead
- Focuses on most impressive and current work

**Data Sources**:
```typescript
interface KnowledgeBase {
  about: AboutData;           // From src/lib/about.ts
  projects: ProjectSummary[]; // Summarized from src/lib/projects.ts
  skillsMatrix: Record<string, string[]>; // Derived from projects
  anchorMappings: Record<string, string>; // URL anchors for deep linking
  commonQAs: Record<string, { answer: string; anchor?: string }>;
}
```

### Context Injection Strategy
**Decision**: Hybrid approach with intelligent context selection
**Rationale**:
- Full projects.ts (~1100 lines) is too many tokens for each request
- Smart context selection based on question intent
- Future migration path to Knowledge Graph MCP when ready

**Implementation Strategy**:
```typescript
const contextStrategies = {
  projectSpecific: (projectId) => getFullProjectData(projectId),
  skillInquiry: (skill) => getProjectsUsingSkilL(skill),
  general: () => getProjectSummaries(),
  about: () => getAboutData()
}
```

**Base Context** (~300 tokens):
- About Kevin data
- Project summaries (title, description, key metrics, skills)

**Dynamic Context** (~200-500 tokens):
- Full project details when project-specific questions asked
- Skill-specific project information for technical questions

### Anchor Linking System
**Decision**: Implement intelligent deep linking to portfolio sections
**Rationale**:
- Provides seamless experience guiding users to detailed information
- Solves ambiguity problem (e.g., multiple projects use TypeScript)
- Enhances portfolio navigation and engagement

**Anchor Strategy**:
```typescript
interface AnchorStrategy {
  primaryAnchors: {
    "TypeScript": "/zoho-twilio#architecture",
    "React": "/analytics-platform#frontend",
    "AI/ML": "/knowledge-graph-mcp#architecture",
    "PostgreSQL": "/zoho-twilio#multi-tenant"
  };

  contextualAnchors: {
    "TypeScript + real-time": "/zoho-twilio",
    "TypeScript + AI": "/knowledge-graph-mcp",
    "React + dashboards": "/analytics-platform"
  };
}
```

**Response Patterns**:
- Single Best Match: "I used TypeScript extensively in the Zoho-Twilio integration [see details](/zoho-twilio#architecture)"
- Multiple Relevant: Show primary + mention alternatives
- Overview Link: Direct to main projects section with callouts

## User Interface Design

### Terminal-Style Component Architecture
**Decision**: Claude Code-inspired terminal interface
**Rationale**:
- Aligns with Kevin's technical brand and existing portfolio theme
- Familiar interface for technical audience
- Differentiates from standard chat widgets

**Visual Specifications**:
```typescript
interface TerminalStyling {
  background: '#1e1e1e';
  fontFamily: 'JetBrains Mono, monospace';
  fontSize: '14px';
  lineHeight: '1.5';
  padding: '16px';
  borderRadius: '8px';
  border: '1px solid #333';
}

interface MessageStyling {
  user: { color: '#58a6ff', prefix: '$ ' };
  assistant: { color: '#8b949e', prefix: '> ' };
  system: { color: '#6e7681', prefix: '// ' };
  error: { color: '#f85149', prefix: '⚠ ' };
}
```

**Component Structure**:
```tsx
<ChatWidget>
  <ChatHeader>
    <Terminal size={16} />
    <span>kevin-ai-assistant</span>
    <ChevronDown size={16} />
  </ChatHeader>

  <ChatTerminal>
    <MessageList>
      <Message type="system">// Ask me about Kevin's projects</Message>
      <Message type="user">$ What AI projects has Kevin worked on?</Message>
      <Message type="assistant">> Kevin has worked on several AI projects...</Message>
    </MessageList>

    <InputArea>
      <Prompt>$</Prompt>
      <Input />
      <Cursor />
    </InputArea>
  </ChatTerminal>
</ChatWidget>
```

### Positioning & State Management
**Decision**: Bottom-right positioning with window-like minimize/maximize behavior

**State Specifications**:
```typescript
interface ChatStates {
  minimized: {
    width: '200px';
    height: '40px';
    position: 'fixed bottom-6 right-6';
    content: (
      <>
        <Terminal size={16} />
        <span>Ask me anything</span>
        <ChevronUp size={16} />
      </>
    );
    style: {
      borderRadius: '8px 8px 0 0';
      background: '#1e1e1e';
      border: '1px solid #333';
      cursor: 'pointer';
    }
  };

  expanded: {
    width: '400px';
    height: '500px';
    maxHeight: '80vh';
    position: 'fixed bottom-6 right-6';
    responsive: 'Full width on mobile';
    headerContent: (
      <>
        <Terminal size={16} />
        <span>kevin-ai-assistant</span>
        <ChevronDown size={16} />
      </>
    );
  };
}
```

## Contact Collection & Email Integration

### Contact Flow Design
**Decision**: Progressive contact collection via conversation flow
**Rationale**:
- More natural than forms
- Allows for context-aware prompting
- Reduces friction while gathering necessary information

**Conversation Flow**:
1. **Trigger**: When chatbot can't answer OR after user's second question
2. **Message Collection**: "I don't have that information, but I can leave Kevin a note. What would you like me to tell Kevin?"
3. **Identity Collection**: "Kevin would love to know who is asking about them, can I ask your name and/or email to pass on to him?"
4. **Name**: "And what's your name?"
5. **Email**: "What's the best email to reach you?"
6. **Confirmation**: "Thanks! I've sent Kevin a message with your inquiry. He typically responds within 24-48 hours."

### Email Integration
**Decision**: Use EmailJS for direct email delivery (no database storage)
**Rationale**:
- Simpler implementation than database + email notifications
- Consistent with existing portfolio contact form
- No additional infrastructure requirements

**Email Configuration**:
```typescript
interface EmailTemplate {
  to: "andrewskevin92@gmail.com";
  subject: "Portfolio inquiry from {{name}}";
  body: `
New inquiry from your portfolio chatbot:

From: {{name}} ({{email}})
Message: {{userMessage}}
Timestamp: {{timestamp}}
User Agent: {{userAgent}}
Referrer: {{document.referrer}}
  `;
}
```

## Security & Cost Management

### Rate Limiting Strategy
**Decision**: Multi-layered limits with IP and session tracking
**Rationale**:
- Prevents abuse while allowing legitimate conversations
- Balances user experience with cost control
- No authentication required

**Limit Structure**:
```typescript
interface SecurityLimits {
  rateLimit: {
    perSession: 20;      // Messages per session (resets on page reload)
    perDay: 50;          // Messages per IP per day
    perMinute: 5;        // Burst protection
  };

  costControl: {
    dailyBudget: 5.00;           // Total daily spending cap
    maxTokensPerResponse: 200;   // Response length limit
    maxConversationLength: 20;   // Auto-reset after limit
  };

  inputValidation: {
    maxInputLength: 500;         // Character limit per message
    sanitizeHtml: true;          // Strip potentially malicious content
    blockPatterns: [];           // Regex patterns for malicious inputs
  };
}
```

### Cost Optimization
**Decision**: Smart context management with caching
**Implementation**:
```typescript
interface CostOptimization {
  contextOptimization: {
    baseContext: 300;        // Core about + project summaries
    dynamicContext: 200-500; // Question-specific details
    maxTotalContext: 800;    // Hard limit per request
  };

  responseControl: {
    maxTokens: 200;          // Short, focused answers
    temperature: 0.3;        // Consistent responses
    stopSequences: ['\n\n']; // Prevent rambling
  };

  caching: {
    commonResponses: Map;     // Cache frequent questions
    sessionContext: WeakMap;  // Avoid re-injecting same context
    ttl: 3600;               // 1 hour cache expiration
  };
}
```

### Monitoring & Notifications
**Decision**: Real-time monitoring with email alerts to Kevin
**Rationale**:
- Early warning system for cost overruns
- Visibility into usage patterns and potential issues
- Proactive management of chatbot performance

**Notification Triggers**:
```typescript
interface NotificationConfig {
  email: "andrewskevin92@gmail.com";
  triggers: {
    dailyBudgetHit: {
      threshold: 5.00;
      message: "Chatbot daily budget exceeded";
    };
    highUsageWarning: {
      threshold: 3.50;
      message: "Chatbot 70% of daily budget used";
    };
    unusualActivity: {
      threshold: 20;
      period: "1h";
      message: "20+ requests in 1 hour - possible abuse";
    };
    errorSpike: {
      threshold: 10;
      period: "10m";
      message: "Multiple API errors detected";
    };
  };
}
```

### Graceful Degradation
**Decision**: Fallback strategies when limits are reached
**User-Facing Messages**:
- "I'm at my daily limit, but you can leave Kevin a message"
- "Let's start fresh - I'll reset our conversation"
- "That's a great question for Kevin directly"

**Fallback Responses**:
- Pre-written answers for common questions (no API call)
- Direct contact form when API unavailable
- Cached responses for repeated questions

## Technical Implementation

### API Routes Structure
**Decision**: Next.js API routes for simplicity and consistency

**Required Endpoints**:
```typescript
// /api/chat - Main chat endpoint
interface ChatEndpoint {
  method: 'POST';
  body: {
    message: string;
    sessionId: string;
    conversationHistory?: Message[];
  };
  response: {
    response: string;
    sessionId: string;
    tokensUsed: number;
    cost: number;
  };
}

// /api/contact - Email submission
interface ContactEndpoint {
  method: 'POST';
  body: {
    name: string;
    email: string;
    message: string;
    sessionId: string;
  };
  response: {
    success: boolean;
    message: string;
  };
}

// /api/admin/stats - Usage monitoring (optional)
interface StatsEndpoint {
  method: 'GET';
  headers: { authorization: 'Bearer admin-token' };
  response: {
    dailyUsage: {
      requests: number;
      cost: number;
      topQuestions: string[];
    };
    limits: {
      budgetRemaining: number;
      requestsRemaining: number;
    };
  };
}
```

### Session Management
**Decision**: Client-side session IDs with server-side tracking
**Implementation**:
```typescript
// Client-side session management
const sessionId = useMemo(() =>
  localStorage.getItem('chatbot-session') ||
  crypto.randomUUID()
, []);

// Server-side tracking
interface SessionTracker {
  sessions: Map<string, {
    messageCount: number;
    startTime: Date;
    lastActivity: Date;
    conversationHistory: Message[];
  }>;

  cleanup: () => {
    // Remove sessions older than 24 hours
    // Clear memory to prevent leaks
  };
}
```

### Conversation Persistence
**Decision**: Session-based memory with automatic cleanup
**Rationale**:
- Enables follow-up questions and context continuity
- Balances user experience with resource management
- No permanent storage required

**Memory Management**:
- Store conversation history in memory during session
- Clear history after 20 messages or 24 hours of inactivity
- Provide session reset functionality
- Implement memory limits to prevent server overload

### Error Handling
**Decision**: Comprehensive error handling with user-friendly fallbacks

**Error Categories & Responses**:
```typescript
interface ErrorHandling {
  apiErrors: {
    rateLimited: "I need to take a quick break. You can leave Kevin a message instead.";
    budgetExceeded: "I've reached my daily limit, but I can connect you with Kevin directly.";
    modelError: "I'm having trouble right now. Let me get Kevin's contact info for you.";
  };

  inputErrors: {
    tooLong: "That message is a bit long. Could you break it into smaller questions?";
    invalid: "I had trouble understanding that. Could you rephrase your question?";
  };

  systemErrors: {
    network: "Connection issues detected. Your message will be saved for Kevin.";
    server: "Technical difficulties on my end. Let me get you Kevin's contact information.";
  };
}
```

## Data Preparation Tasks

### Knowledge Base Creation
**Immediate Tasks**:
1. **Create summarized project data structure**
   - Extract key information from each project in projects.ts
   - Include: title, description, 2-3 key metrics, main skills, status
   - Reduce token count by 70-80% while preserving essential information

2. **Build anchor mapping system**
   - Map common terms/skills to specific portfolio URLs with anchors
   - Create contextual mappings for ambiguous terms
   - Implement fallback strategies for multiple relevant projects

3. **Prepare common Q&A pairs**
   - Identify 10-15 most likely questions visitors will ask
   - Pre-write optimized responses with appropriate anchors
   - Cache these responses to reduce API calls

**Data Structures**:
```typescript
interface ProjectSummary {
  id: string;
  title: string;
  className: string;
  description: string;  // Shortened to ~50 words
  keyMetrics: string[]; // Top 2-3 metrics only
  primarySkills: string[]; // Most important skills only
  status: string;
  detailPageUrl?: string;
  anchors: {
    overview: string;
    architecture?: string;
    challenges?: string;
    impact?: string;
  };
}

interface CommonQA {
  question: string;
  answer: string;
  relevantAnchor?: string;
  keywords: string[]; // For matching user questions
}
```

### Content Optimization
**Required Content Updates**:
1. **Remove outdated experience files**
   - Delete bonanzaExperience.ts, masakaliExperience.ts, education.ts
   - Verify all necessary information is captured in projects.ts
   - Update any components that reference deleted files

2. **Enhance about.ts for chatbot context**
   - Ensure key personal information is easily extractable
   - Add context that helps answer "Tell me about Kevin" questions
   - Include current availability/contact preferences

3. **Optimize projects.ts structure for AI consumption**
   - Consider extracting long descriptions into summary + detail fields
   - Ensure consistent formatting for reliable parsing
   - Add metadata that helps with question routing

## Future Enhancements

### Knowledge Graph Integration
**Migration Path**:
- Current implementation provides foundation for Knowledge Graph MCP integration
- When kg-memory-mcp is ready, replace static knowledge base with dynamic queries
- Maintain anchor resolution system as separate service
- Enable cross-domain context sharing with other AI agents

### Advanced Features
**Potential Additions**:
- Auto-complete suggestions for common questions
- Conversation export functionality
- Multi-language support
- Voice input/output capabilities
- Analytics dashboard for Kevin to monitor conversations
- A/B testing for response optimization

### Scalability Considerations
**If Traffic Increases**:
- Migrate from in-memory tracking to Redis
- Implement more sophisticated caching strategies
- Consider CDN for static responses
- Add request queuing for burst traffic
- Implement geographic rate limiting

## Implementation Priority

### Phase 1: Core Functionality
1. Set up AI SDK with Claude 3.5 Sonnet
2. Create basic terminal UI component
3. Implement knowledge base with project summaries
4. Build chat API endpoint with basic context injection
5. Add rate limiting and cost tracking

### Phase 2: Enhanced UX
1. Implement anchor linking system
2. Add contact collection flow with EmailJS
3. Create minimize/maximize functionality
4. Add typing indicators and smooth animations
5. Implement error handling and fallback responses

### Phase 3: Monitoring & Optimization
1. Add comprehensive logging and monitoring
2. Implement email notifications for limits/errors
3. Create admin stats endpoint
4. Optimize context selection based on usage patterns
5. Add caching for common responses

### Phase 4: Polish & Launch
1. Mobile responsive design
2. Accessibility improvements
3. Performance optimization
4. User testing and feedback incorporation
5. Production deployment with monitoring

This implementation plan provides comprehensive guidance for building a sophisticated AI chatbot that enhances Kevin's portfolio while maintaining cost control and user experience quality.