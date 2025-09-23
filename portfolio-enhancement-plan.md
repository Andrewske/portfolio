# Portfolio Projects Homepage Enhancement Plan

Changes should be made to the projects section of the homepage located in @src/app/page.tsx


## Role & Timeline Documentation

- [x] Add role/timeline/scope strip to AnalyticsPlatform project card and detail page
  - Text: "Role: Sole developer • Timeline: Aug 2023 - ongoing • Scope: architecture, backend, data optimization, performance tuning"
  - Add to both the project card in sections and the dedicated project page

- [x] Add role/timeline/scope strip to Masakali project card and detail page
  - Text: "Role: Sole developer • Timeline: July 2020 - ongoing • Scope: full-stack development, payment integration, booking system, multi-tenant architecture"

- [x] Add role/timeline/scope strip to ZohoTwilio project card and detail page
  - Text: "Role: Sole developer • Timeline: Nov 2023 - ongoing • Scope: API integration, webhook handling, multi-tenant SMS delivery, error tracking"

- [x] Add role/timeline/scope strip to AIProductOptimizer project card and detail page
  - Text: "Role: Sole developer • Timeline: July 2025 - ongoing • Scope: LLM evaluation, model comparison, cost optimization, experimental approaches"

- [x] Add role/timeline/scope strip to KnowledgeGraphMCP project card and detail page
  - Text: "Role: Sole developer • Timeline: June 2025 - ongoing • Scope: AI pipeline architecture, knowledge extraction, vector embeddings, MCP protocol"

- [x] Add role/timeline/scope strip to PersonalManagementSystem project card and detail page
  - Text: "Role: Sole developer • Timeline: June 2025 - ongoing • Scope: agent architecture, context management, specialized AI assistants, workflow automation"

## Project Title & Description Enhancement

- [x] Add human-readable subtitle to AnalyticsPlatform
  - Keep "AnalyticsPlatform" title, add subtitle: "High-performance analytics system processing 160M+ records with sub-second query times"
  - Add business impact line: "Enabled real-time business intelligence for multi-million dollar operations"

- [x] Add human-readable subtitle to Masakali
  - Keep "Masakali" title, add subtitle: "Multi-tenant booking platform eliminating double-bookings and recovering $30k+/month"
  - Add business impact line: "Zero double-bookings across 43k+ messages and thousands of bookings"

- [x] Add human-readable subtitle to ZohoTwilio
  - Keep "ZohoTwilio" title, add subtitle: "Real-time CRM-SMS integration with automated lead engagement"
  - Add business impact line: "Automated SMS workflows reducing manual lead processing time by 80%"

- [x] Add human-readable subtitle to AIProductOptimizer
  - Keep "AIProductOptimizer" title, add subtitle: "LLM-powered e-commerce optimization with cost-performance analysis"
  - Add business impact line: "Achieved 63% cost reduction while maintaining 90%+ accuracy through model optimization"

- [x] Add human-readable subtitle to KnowledgeGraphMCP
  - Keep "KnowledgeGraphMCP" title, add subtitle: "Semantic knowledge extraction pipeline with vector embeddings"
  - Add business impact line: "Processes 8k+ character documents in 94 seconds with $0.0012 cost per operation"

- [x] Add human-readable subtitle to PersonalManagementSystem
  - Keep "PersonalManagementSystem" title, add subtitle: "Specialized AI agent platform for domain-specific assistance"
  - Add business impact line: "Context-aware AI agents providing personalized guidance across career, finance, and health domains"

## Safety & Reliability Documentation

- [x] Add Safety & Reliability section to AnalyticsPlatform
  - Document zod schema validation for API inputs
  - Mention PostHog error tracking and performance monitoring
  - Include query performance optimization (mention specific optimizations done)
  - Note data partitioning strategy and why it was chosen
  - Include any SLOs maintained (P95 query times, uptime targets)

- [x] Add Safety & Reliability section to Masakali
  - Document Sentry → PostHog migration for error tracking
  - Detail double-booking prevention mechanisms (database constraints, advisory locks, etc.)
  - Include idempotency handling for booking operations
  - Note data security for customer information (emails, addresses)
  - Document webhook reliability and retry logic

- [x] Add Safety & Reliability section to ZohoTwilio
  - Document multi-tenant data isolation approach
  - Include SMS delivery rate tracking and error handling
  - Detail webhook authentication and validation
  - Note rate limiting and carrier compliance measures
  - Document PostHog integration for monitoring

- [x] Add Safety & Reliability section to AIProductOptimizer
  - Document input validation for product data processing
  - Include error handling for LLM API failures and retries
  - Detail cost monitoring and budget controls implemented
  - Note evaluation dataset validation and quality checks
  - Document fallback strategies for model failures

- [x] Add Safety & Reliability section to KnowledgeGraphMCP
  - Document knowledge extraction validation and confidence scoring
  - Include vector embedding quality assurance measures
  - Detail token usage monitoring and cost controls
  - Note pipeline failure handling and recovery mechanisms
  - Document data lineage and processing audit trails

- [x] Add Safety & Reliability section to PersonalManagementSystem
  - Document agent context isolation and security boundaries
  - Include data privacy measures for personal information
  - Detail agent permission and capability restrictions
  - Note conversation history management and retention policies
  - Document Claude Code integration security measures

## AI Evaluation & Performance Documentation

- [x] Create comprehensive AI evaluation section for AIProductOptimizer
  - Include model comparison table with specific metrics: gpt-5-nano, gpt-4o-mini, gpt-5-nano-flex performance
  - Document cost per item analysis: ranging from $0.00003 to $0.00175 per item
  - Include success rate comparisons: 0% to 100% across different models and batch sizes
  - Detail time per item analysis: 0.04s to 28.23s performance ranges
  - Explain model selection rationale and cost-quality trade-offs
  - Document experimental approaches tried: iterative, async progressive, tool-calling, batch-processing, batch-api, early-async
  - Include future optimization strategy: brand mapping, term extraction, template-based approach

- [x] Add AI evaluation section for KnowledgeGraphMCP using benchmark report data
  - Include performance metrics: 94.4 seconds total processing time for 8668 character input
  - Document token usage: 3643 input tokens, 1182 output tokens, $0.0012 total cost
  - Detail extraction results: 20 triples extracted, 80 vectors generated
  - Include model configuration: gpt-4o-mini with four-stage extraction method
  - Note areas for improvement: concept generation stage currently not working, needs debugging
  - Document cost per token analysis: $0.000574-$0.000629 per extraction operation

- [x] Document PersonalManagementSystem's novel AI approach
  - Explain Claude Code integration for specialized agent contexts
  - Detail agent specialization strategy: career coach, Bonanza project manager, budget analyst, diet/meal planner
  - Include context management approach for maintaining domain expertise
  - Document planned expansions: CSV transaction analysis, ADHD-aware meal planning
  - Explain why Claude Code was chosen over custom LLM integration

## Architecture Documentation Planning

### Implementation Guide for Architecture Documentation
**Location**: Update `src/lib/projects.ts` with two new fields:
1. `longDescription`: 2-3 sentences highlighting the key technical achievement and business impact
2. `architecture`: Technical deep-dive with **bold section headers** for readability

**Writing Style Guidelines**:
- Avoid repetition - each point should add new information
- Focus on outcomes and measurable improvements (e.g., "20min → 5min" not just "faster")
- Use concrete metrics over vague claims (e.g., "8yr historical data" not "$MM+ tracked")
- Keep technical but readable - hiring managers should understand the impact
- Structure: Problem → Solution → Result

**Recommended Architecture Sections**:
- **Data Pipeline**: Input → Processing → Output flow
- **Performance Wins**: Specific optimizations with before/after metrics
- **Infrastructure Innovation**: Unique architectural decisions and why they matter
- **Cost Optimization**: Quantifiable savings or efficiency gains

### Completed
- [x] AnalyticsPlatform architecture
  - Static data architecture eliminating API infrastructure
  - MySQL read-only constraints → creative Python processing
  - pandas → Polars migration for 75% speed improvement
  - Incremental updates: 20min → 5min with timestamp tracking
  - Frontend: Parquet files with indexed chunking for sub-second loads

- [ ] Prepare ZohoTwilio architecture documentation
  - Map out webhook processing flow from CRM to SMS delivery
  - Document multi-tenant isolation strategy
  - Identify key integration points and data transformations
  - Prepare to create sequence diagram showing real-time message flow
  - Note error handling and retry mechanisms in the architecture

- [ ] Prepare Masakali booking system architecture
  - Document booking conflict prevention at the database and application level
  - Map out real-time availability checking logic
  - Identify concurrency handling strategies
  - Prepare to create state diagram showing booking lifecycle
  - Note payment integration architecture and security measures

- [ ] Prepare AIProductOptimizer experimental architecture
  - Document different processing approaches attempted (batch, streaming, tool-calling)
  - Map out model selection and fallback logic
  - Identify evaluation pipeline architecture
  - Prepare to create flowchart showing optimization decision tree
  - Note cost monitoring and budget control mechanisms

- [ ] Prepare KnowledgeGraphMCP pipeline architecture
  - Document four-stage processing pipeline design
  - Map out knowledge extraction, concept generation, and vector embedding flows
  - Identify MCP protocol implementation details
  - Prepare to create pipeline diagram showing data transformation stages
  - Note performance bottlenecks and optimization opportunities

- [ ] Prepare PersonalManagementSystem agent architecture
  - Document agent specialization and context isolation design
  - Map out Claude Code integration approach
  - Identify agent communication and coordination mechanisms
  - Prepare to create agent interaction diagram
  - Note planned scalability for additional specialized agents

## Technical Deep-Dive Creation

- [ ] Schedule collaborative session to create AnalyticsPlatform architecture diagram
  - Focus on unique architectural decisions that needed explanation
  - Create component diagram showing database partitioning, query processing, caching
  - Write technical explanation of design choices and trade-offs
  - Include performance impact of architectural decisions

- [ ] Schedule collaborative session to create ZohoTwilio integration diagram
  - Create sequence diagram showing webhook processing flow
  - Document real-time message delivery architecture
  - Explain multi-tenant isolation design decisions
  - Include error handling and reliability measures

- [ ] Schedule collaborative session to create Masakali booking system diagram
  - Create state diagram showing booking conflict prevention
  - Document real-time availability architecture
  - Explain database design for preventing double-bookings
  - Include payment processing security architecture

- [ ] Schedule collaborative session to create AIProductOptimizer evaluation framework diagram
  - Create flowchart showing model evaluation and selection process
  - Document experimental architecture for different approaches
  - Explain cost optimization decision tree
  - Include future architecture plans for template-based approach

- [ ] Schedule collaborative session to create KnowledgeGraphMCP pipeline diagram
  - Create pipeline flow diagram showing four processing stages
  - Document vector embedding and knowledge extraction architecture
  - Explain MCP protocol integration design
  - Include performance optimization opportunities

- [ ] Schedule collaborative session to create PersonalManagementSystem agent diagram
  - Create agent architecture diagram showing specialization boundaries
  - Document Claude Code integration approach
  - Explain context management and agent coordination
  - Include planned expansion architecture for new agent types