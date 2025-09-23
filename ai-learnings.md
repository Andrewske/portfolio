# AI Learnings - User Insights

## About the User

### Technical Background
- Software engineer with full-stack experience (based on portfolio projects spanning 2020-2025)
- Works as a sole developer on multiple complex projects
- Has experience with production systems handling significant scale (160M+ records, $30k+ revenue, 43k+ messages)
- Strong background in AI/ML, data analytics, and system architecture
- Experience with both frontend (React, Next.js) and backend (PostgreSQL, APIs) technologies

### Work Style
- Prefers structured, planned approaches to implementation
- Values clear organization and tracking of tasks (willingly approved detailed todo-based plan)
- Appreciates being asked questions before implementation rather than assumptions
- Likes having control over technical decisions (asked for confirmation on approach before proceeding)

### Communication Preferences
- Direct and to-the-point communication style
- Prefers being consulted on implementation approach rather than having assumptions made
- Values incremental progress tracking and visibility into task completion
- Appreciates having options presented when multiple approaches exist

### Portfolio Projects (Detailed Technical Context)

#### AnalyticsPlatform (Aug 2023 - ongoing)
- **Role**: Sole developer
- **Scale**: Processing 160M+ order records from legacy MySQL 5.7 database
- **Performance**: Optimized query performance from 10+ minutes to under 5 minutes using Polars and advanced SQL
- **Tech Stack**: React, TypeScript, Polars, MySQL, AWS, Express.js, PostgreSQL
- **Architecture**: Full-stack analytics platform with 13 internal views for data visualization

#### MasakaliBookingPlatform (July 2020 - ongoing)
- **Role**: Sole developer
- **Business Impact**: Processed $30K in direct revenue with zero double-bookings
- **Tech Evolution**: React/Redux → Next.js migration
- **Integrations**: Real-time inventory sync across Booking.com, Airbnb via Smoobu API
- **Tech Stack**: Next.js, Redux, PostgreSQL, Smoobu API, Xendit API, Webhook Architecture

#### ZohoTwilioIntegration (Nov 2023 - ongoing)
- **Role**: Sole developer
- **Scale**: 12 studios engaging 9,000+ leads, processing 43,000+ messages
- **Delivery**: Shipped end-to-end solution in 4 weeks
- **Tech Stack**: Next.js, TypeScript, Prisma, PostgreSQL, Twilio API, Zoho CRM API, Sentry
- **Architecture**: Multi-tenant SMS delivery with error tracking

#### AIProductOptimizer (July 2025 - ongoing)
- **Role**: Sole developer
- **Scale**: 4,500 product titles optimized in 30 minutes
- **Cost Efficiency**: $0.00003 per listing using OpenAI batch API
- **Tech Stack**: Python, OpenAI API (GPT-4o-mini), PostgreSQL, Batch Processing

#### KnowledgeGraphMCP (June 2025 - ongoing)
- **Role**: Sole developer
- **Architecture**: 3-stage distributed pipeline (extraction → concepts → vector embeddings)
- **Performance**: 85-second processing, $0.00002/document, 106 triples + 424 embeddings per doc
- **Tech Stack**: TypeScript, MCP Protocol, Vector Embeddings, GPT-4
- **Variants**: Built both HTTP and STDIO versions following MCP protocol

#### PersonalManagementSystem (June 2025 - ongoing)
- **Role**: Sole developer
- **Purpose**: Custom AI agent ecosystem using Claude Code for multi-project workflows
- **Specialization**: Domain-specific agents for career coaching, technical documentation, project management
- **Tech Stack**: Claude Code, Prompt Engineering, MCP Protocol, Agent Architecture

### Project Patterns & Preferences
- Consistently works as sole developer across all projects
- Focuses on production-ready systems with real business impact
- Strong emphasis on performance optimization and cost efficiency
- Prefers modern tech stacks (TypeScript, Next.js, PostgreSQL)
- Experience with AI/ML integration in production environments
- Values measurable business outcomes (revenue, performance metrics, user engagement)

### Safety & Reliability Implementation Insights (Conversation 2025-09-22)

#### Project-Specific Safety Details the User Provided:

**AnalyticsPlatform Safety Approach:**
- Only has zod validation for route params (year, month, comparison, code, state, date ranges)
- Data stored as parquet files in repository (not API-based)
- Creative MySQL 5.7 optimization due to read-only access limitations (no CTE support)
- Uses subqueries and Pandas/Polars for heavy operations
- Local caching layer: full updates (20+ min) vs bi-hourly updates (5 min)
- Small internal project (employees only) - no SLOs tracked
- Uses Rollbar for email alerts on bi-hourly update failures

**Masakali Safety Approach:**
- Prevents double-bookings by integrating with Smoobu (booking manager)
- Smoobu connects to Booking.com and Airbnb - maintains price/availability data
- Date picker only shows available dates
- Cart validation creates booking in Smoobu (errors if dates unavailable)
- No advisory locks needed (low traffic)
- Basic data security (state → database on checkout)
- PostHog logging for errors (not many issues)

**ZohoTwilio Safety Approach:**
- Multi-tenant via Studios table linked to Messages
- Authentication through Zoho and Twilio credentials per studio
- Webhook validation through phone number (must be valid studio + Zoho contact)
- No rate limiting (not an issue at current scale)
- Handles opt-out via STOP message parsing
- PostHog error logging, limited resources so minimal changes when requested

**AI/Experimental Projects (AIProductOptimizer, KnowledgeGraphMCP):**
- Not in production, so manual validation/review processes
- Focus on token usage monitoring for scaling considerations
- Manual error management during development
- Quality assurance through manual review

**PersonalManagementSystem:**
- Agent isolation through separate folders with individual contexts
- No privacy protection needed (personal project with controlled input)
- Uses claude.md for permissions
- Conversation history managed by Claude Code with ai-learnings.md for context

#### User's Architecture & Development Philosophy:
- Implements safety measures appropriate to project scale and importance
- Prefers practical engineering solutions over theoretical best practices
- Uses manual processes for experimental/development projects
- Emphasizes real-world constraints (read-only DB access, limited resources)
- Values cost monitoring and scaling considerations for AI projects
- Demonstrates understanding of production vs development contexts

#### Communication & Implementation Style:
- Prefers being asked clarifying questions before implementation
- Appreciates systematic approach (went through each project individually)
- Values data-driven architecture over hardcoded solutions
- Understands importance of separation of concerns (moved data from template to data layer)
- Appreciates clean, maintainable code patterns

#### Role & Timeline Documentation Implementation (Conversation 2025-09-22)

**User's Project Structure & Organization:**
- Has 6 main portfolio projects spanning 2020-2025
- 3 projects have detail pages (AnalyticsPlatform → `/admin-dashboard`, MasakaliBookingPlatform → `/masakali`, ZohoTwilioIntegration → `/zoho-twilio`)
- 3 projects are homepage-only for now (AIProductOptimizer, KnowledgeGraphMCP, PersonalManagementSystem)
- Projects data is stored in `src/lib/projects.ts` with TypeScript interfaces
- Uses ProjectCard component for homepage display with terminal-themed styling

**User's Implementation Preferences:**
- Prefers adding separate fields (`role`, `timeline`, `scope`) rather than combined strings for flexibility
- Values structured planning with todo lists and progress tracking
- Wants implementation details confirmed before proceeding
- Prefers leaving detail page implementation for later (focused approach)
- Appreciates having multiple implementation options presented with trade-offs

**User's Role Across All Projects:**
- Consistently serves as "Sole developer" across all 6 projects
- Demonstrates ability to ship complete solutions independently
- Timeline spans 5+ years (July 2020 - ongoing projects in 2025)
- Scope areas include: architecture, backend optimization, AI/ML pipeline development, full-stack development, payment integration, API integration, cost optimization, agent architecture

## Learning Context
- Currently working on enhancing portfolio for top-tier AI roles
- Has a portfolio enhancement plan document they're following systematically
- Wants to improve project presentation with compelling subtitles and business impact statements
- Values structured implementation approaches with clear planning phases
- Prefers homepage-level documentation over individual project pages for this portfolio enhancement
- Follows systematic approach to portfolio enhancement with specific tasks and clear scope boundaries