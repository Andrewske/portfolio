# AI Learnings

## About the User
**Technical Background**: Full-stack engineer (2020-2025), sole developer across all projects, production systems experience (160M+ records, $30k+ revenue, 43k+ messages), AI/ML expertise, Next.js/TypeScript/PostgreSQL stack

**Work Philosophy**: Performance/cost optimization focus, measurable business outcomes, data-driven architecture decisions

## Communication Preferences
**Style**: Direct and concise, prefers consultation over assumptions, wants control over decisions
**Feedback**: Wants progress visibility, appreciates multiple options with trade-offs explained. Values clear, readable documentation that flows naturally for hiring managers
**Planning**: Values structured approach with todo tracking, systematic implementation phases. Prefers one task at a time with no priority level ("Let's focus on one at a time, no priority level")
**Documentation Style**: Dislikes repetitive content ("You are kind of repetative about the read only sql"). Wants "easily readable to show most important details to a hiring manager"

## Work Style & Implementation Approach
**Planning**: Ask clarifying questions first, systematic approaches, structured implementation phases
**Decision Making**: Data-driven, wants to understand trade-offs before proceeding
**Safety Philosophy**: Scale-appropriate safety (robust validation for production, manual review for experimental)
**Engineering**: Practical constraints-aware (read-only DB → creative optimization, cost monitoring for AI)

## Stated Goals
**Career Target**: Top-tier AI roles (specifically mentioned Anthropic application prep)
**Portfolio Goal**: Compelling showcase for hiring managers, homepage-level focus on AI evaluation and performance
**Enhancement Strategy**: Following systematic enhancement plan, structured documentation phases

## Personal Context
**ADHD**: Explicitly mentioned struggles with eating/food preparation in context of diet planning agent
**Financial Management**: Acknowledged "struggles with money" for budget analysis agent
**Personal Projects**: Uses specialized AI agents for different life domains (career, finance, health, project management)

## Portfolio Projects - Detailed Context

### ZohoTwilio (Nov 2023 - ongoing)
**Project Location**: ~/coding/sms-project (separate codebase from portfolio)
**Security Approach**: Phone number validation for webhook authentication deemed "sufficient for this small project" - practical security choices
**Architecture Insights**:
  - Dual-provider SMS system (Twilio + Zoho Voice) with automatic failover
  - Multi-tenant isolation via Studios table mapping Zoho User IDs to phone numbers
  - StudioAccount junction table for OAuth token management per studio
  - Admin phone number override feature for manager flexibility
  - Database-first persistence strategy before API calls
  - Webhook returns HTTP 200 on partial failures to prevent Twilio retries
**Tech Stack**: Next.js, Prisma ORM, PostgreSQL, custom error handling wrapper
**Implementation Philosophy**: Practical, scale-appropriate solutions rather than over-engineering

### AIProductOptimizer (July 2025 - ongoing)
**Real Performance Data**: Tested 6 LLM models (gpt-5, gpt-5-mini, gpt-5-nano, gpt-4.1-nano, gpt-4o-mini, gpt-5-nano-flex)
**Cost Analysis**: $0.00003 to $0.00175 per item, found GPT-5 models too expensive despite 95% accuracy
**Experimental Approaches**: iterative, async progressive, tool-calling, batch-processing, batch-api, early-async
**Current Status**: "Actually never found a solution that I really liked. The cost/time was just too much"
**Template-Based Architecture Plan**: Four-stage hybrid AI+template approach not yet implemented:
  - AI feature extraction for structured data parsing (~$0.00005/product)
  - Template engine ensuring 77-character compliance with deterministic construction
  - Variation detector for product family grouping (30-50% instant processing through reuse)
  - Learning system extracting patterns from successful examples
**Design Philosophy**: "I plan to use AI to parse the data, and I should be able to batch process more titles that all share similarities like brand/category. This will handle the parsing with a low cost. Then I can create a character map with terms and their character count"
**Target**: 99% cost reduction while maintaining 90%+ accuracy through intelligent batch processing

### KnowledgeGraphMCP (June 2025 - ongoing)
**Project Location**: ~/coding/kg-memory-mcp (separate codebase from portfolio)
**Architecture Understanding**: 3-stage pipeline (extraction → concepts → deduplication) with 4-stage extraction process within first stage
**Four-Stage Extraction**: ENTITY_ENTITY, ENTITY_EVENT, EVENT_EVENT, EMOTIONAL_CONTEXT run in parallel via Promise.allSettled
**Optimization Strategy**: Cost/speed focus using gpt-4o-mini, parallel calls, reduced input tokens
**Real Metrics**: 94.4s processing, 8668 characters, $0.0012 cost, 20 triples, 80 vectors, 0 concepts
**Current Issue**: Concept generation stage not working, needs debugging - "there is some error in conceptualization"
**Development Status**: "The time and cost has not been optimized yet so it will change"
**Approach**: "I just start with gpt-4o-mini for cost/speed reasons. I haven't had the chance to try different models"
**MCP Implementation**: Built both HTTP and STDIO transport layers for dual protocol support

### PersonalManagementSystem (June 2025 - ongoing)
**Unique Architecture**: Using Claude Code (Opus/Sonnet) with persistent file-based context
**Specialized Agents**:
  - Career Coach (Anthropic application prep) - detailed CLAUDE.md with achievement tracking, confidence calibration protocols
  - Bonanza Project Manager (work context prioritization)
  - Budget Analyst (CSV transaction analysis, money struggles context)
  - Diet/Meal Planner (ADHD-aware nutrition, food preparation struggles)
  - Podcast Conversation Agent (in development for podcast discussion)
**Workflow**: "I cd into the project folder and start a new claude code instance. I usually have an ide with the project open as well"
**Context Isolation**: Separate folders with specialized CLAUDE.md files for each agent domain
**Cross-Agent Memory Challenge**: "Yes, I want them to share information. I am thinking about a global context. But this is also what the kg-memory-mcp is for when I get that up and running they can store information in the knowledge base and make queries as needed"
**Philosophy**: "Context-aware AI agents providing personalized guidance" across life domains
**Innovation**: File-based agent specialization vs traditional model fine-tuning, leverages existing Claude Code infrastructure rather than custom development

### AnalyticsPlatform (Aug 2023 - ongoing) - Architecture Deep Dive
**Constraint-Driven Engineering**: Read-only MySQL 5.7 forced creative solutions vs traditional approaches
**Technical Architecture**: Two-repo system: backend (Python) queries DB → processes → saves parquet to frontend repo
**Query Optimization**: MySQL timeout issues → subqueries + multi-table processing in Python rather than complex SQL. Had to "really understand the indexes available to me and the relationships between each table"
**Performance Migration**: pandas → Polars for Rust-based performance gains on 160M+ records. "changing things to polars on its own significantly increased speed because polars is written in rust"
**Incremental Updates**: Timestamp-based filtering with local state tracking enables 20min → 5min bi-hourly updates. "I keep a file with the time I updated most recently and then I filter queried data by that"
**Static Data Architecture**: Eliminates API hosting costs, connection pooling, scaling infrastructure. "By not having to host a backend api, and just loading the data in the front end from a local repo it was quick and efficient"
**Frontend Strategy**: Vite + Tanstack Router + hyparquet library with index-based chunking. Frontend has "approximately 8 * 365" records (8 years of daily aggregated data, not 160M raw records)
**Data Pipeline**: MySQL → Polars processing → ZSTD parquet + JSON index → sub-second frontend filtering
**Business Impact**: Executive-level BI tracking multi-million dollar operations. 8 years of historical data (2018+)
**Key Decisions**: Infrastructure cost savings prioritized over real-time updates, suitable for bi-hourly refresh needs. "The data update only happens once every 2 hours, because it takes a lot of server resources and we don't need more frequent updates"

### Masakali (July 2020 - ongoing) - Booking Platform Deep Dive
**Project Location**: ~/coding/masakali-t3 (separate codebase from portfolio)
**Physical Architecture**: Akasha and Lakshmi are the same building - "Akasha is the whole building, and Lakshmi is just the downstairs, leaving the upstairs open for the owner to use"
**Booking Conflict Prevention**: "The prevention only comes when creating the booking because smoobu will not allow the double booking and the error would cancel the booking process. The traffic and bookings is low, so I haven't needed anything more"
**Cross-Villa Blocking Logic**: When Lakshmi books → automatically blocks Akasha (same building). When Akasha books → blocks Lakshmi. Implemented via blockVilla() function calling Smoobu API
**Database Design**: PostgreSQL with unique constraint on (villa_id, date) in villa_pricing table. Foreign key relationships villa → reservations
**Webhook Architecture**: Real-time updates from Smoobu for external bookings (Booking.com, Airbnb) → local database sync
**Error Handling**: "I am notified of the error and usually manually fix and fix the underlying process. But I rarely have any fails in that area so I haven't had to modify in a long time"
**Payment Flow**: "Payment happens first, so I don't really block double bookings..." - Manual processing for edge cases. User guidance: "I would say don't include anything about this. It's probably not impressive to show it"
**Tech Stack**: Next.js, Prisma ORM, PostgreSQL, Smoobu API integration, PostHog monitoring
**Scale Context**: 5 villas, low traffic, manual oversight approach - practical engineering for the scale

## Architecture & Safety Philosophy
**Scale-appropriate safety**: Production systems use robust validation (Smoobu booking prevention, multi-tenant auth), experimental projects use manual review

**Practical engineering**: Read-only DB constraints → creative optimization, cost monitoring for AI projects, manual processes for dev/experimental

**Implementation style**: Ask clarifying questions first, systematic approaches, data-driven architecture, separation of concerns

## Portfolio Structure & Enhancement Strategy
**Current setup**: 6 projects (2020-2025), 3 with detail pages, terminal styling theme
**Role Pattern**: "Sole developer" across all projects, 5+ years timeline span
**Enhancement Goal**: AI evaluation documentation for hiring managers, systematic portfolio enhancement plan
**Documentation Priority**: Executive summary style showing decision-making and technical judgment
**Metric Preferences**: Wants meaningful, specific metrics - rejected vague "$MM+ business tracked" as "really means nothing". Prefers concrete technical achievements (8yr historical data, 75% speed gains)