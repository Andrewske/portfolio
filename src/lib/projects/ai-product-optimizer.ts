import type { Project } from '~/lib/projects/types'

export const aiProductOptimizer: Project = {
  id: 'ai-product-optimizer',
  title: 'AIProductOptimizer',
  className: 'AIProductOptimizer',

  description: 'Prompt engineering experiments for automated e-commerce title generation at scale',

  subtitle:
    'Testing of 6 LLMs across 6 processing approaches to find optimal cost-performance balance',

  businessImpact:
    "Enables cost-effective SEO-optimized title generation for large product catalogs while meeting marketplace's strict 75-79 character requirements",

  longDescription:
    'An e-commerce title optimization tool that generates SEO-optimized product titles within strict marketplace character limits (75-79 characters). The system addresses the challenge of scaling manual SEO work across large product catalogs while maintaining both search optimization and platform compliance requirements.',

  architecture:
    '**Title Optimization Testing**: Six processing approaches evaluated - iterative, async progressive, tool-calling, batch-processing, batch-api, and early-async patterns. **Current Implementation**: OpenAI Batch API with prompt caching delivering 90% cost reduction, handling 57K products with programmatic fallbacks for the 38% that fail character constraints. **Next Architecture**: Hybrid design combining AI feature extraction with deterministic template generation for guaranteed 75-79 character compliance.',

  status: 'INTERNAL',
  role: 'Sole developer',
  timeline: 'July 2025 - ongoing',
  scope: 'LLM evaluation, model comparison, cost optimization, experimental approaches',

  metrics: [
    { value: '10x', label: 'Cost Variance', color: 'cyan' },
    { value: '5', label: 'Iterations Avg', color: 'yellow' },
    { value: '0.5-7s', label: 'Processing Time', color: 'green' },
    { value: '62%', label: 'Constraint Compliance', color: 'purple' },
  ],

  safetyAndReliability: [
    'Manual validation for experimental/development phase',
    'Token usage tracking for cost scaling analysis',
    'Manual error management during model optimization',
    'Quality assurance through manual review process',
  ],

  aiEvaluation:
    'Through systematic prompt engineering across 6 LLM models, discovered that explicit character constraints in prompts achieve only 62% compliance despite validation instructions. Tested multiple prompt strategies: iterative refinement with feedback loops, progressive generation with early validation, and tool-calling approaches for constraint checking. Key insight: AI models excel at content optimization but struggle with precise length control, leading to hybrid prompt design combining feature extraction prompts with template completion.',

  challenges: [
    'Prompt Engineering Constraint Barrier: Multiple strategies (progressive generation, tool-calling validation, iterative refinement) all failed to achieve reliable character limit compliance, revealing fundamental LLM limitation with precise mathematical instructions rather than prompt design issue.',

    "Model Performance vs. Cost Disconnect: Systematic evaluation showed premium models (GPT-5) cost 10x more while delivering identical constraint compliance failures as budget options, with quality improvements that don't address the core precision problem.",

    'Architecture Scale Dilemma: Individual processing allowed iterative refinement but became economically prohibitive. Batch processing enabled large-scale optimization but removed real-time validation essential for constraint debugging and improvement.',
  ],

  solutions: [
    'AI+Template Hybrid Architecture: Shifted from pure generation to intelligent parsing approach where AI extracts product features and reorganizes content, while deterministic templates handle precise character control. This separates AI strengths (content intelligence) from mathematical precision requirements.',

    'Strategic Model Optimization: Selected GPT-4o-mini as cost-performance sweet spot, achieving adequate content quality at $0.000075/item through batch processing. Implemented prompt caching for 90% cost reduction on repeated system instructions, making large-scale processing economically viable.',

    'Production-Ready Batch Pipeline: Built comprehensive OpenAI Batch API system with automated fallbacks, constraint validation, and error handling. Created monitoring framework tracking compliance rates and cost metrics across different processing approaches.',
  ],

  lessonsLearned: [
    'Cost-Quality Analysis Essential Before Production Deployment: Systematic model evaluation revealed that highest accuracy models (GPT-5) cost 10x more with minimal accuracy gains over GPT-4o-mini (95% vs 90%). Economic viability matters more than marginal accuracy improvements for production e-commerce applications. Always establish cost targets before optimizing for quality metrics.',

    'Template-Based Optimization Outperforms Pure AI for Constrained Problems: Character limit compliance requires deterministic control that AI models struggle with efficiently. Hybrid approaches combining AI feature extraction with template generation can achieve better cost-performance ratios than pure AI solutions. Sometimes constraints drive innovation toward more efficient architectures.',

    'Batch Processing Architecture Enables Economic AI Deployment: Individual API calls for 4,500+ items would cost $600+ and take hours. Batch API reduced costs to $135 and processing time to 30 minutes, achieving linear scaling. Architecture design choices (sequential vs batch vs parallel) have exponential impact on deployment economics for AI applications.',
  ],

  codeExamples: [
    {
      title: 'The Real Cost of AI Constraint Compliance: Why "Success" Rates Mislead',
      impactContext:
        'This code reveals why 90%+ character compliance became pyrrhic victories - achieving length requirements through expensive iteration made approaches practically unusable despite technical success.',
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
  • **Architectural solution**: Hybrid approach separates AI intelligence from constraint precision for production viability`,
    },
  ],

  skills: [
    {
      name: 'Python',
      proficiency: 'Working Knowledge',
      category: 'Languages',
      usage: 'Built batch processing pipeline for 4.5k listings',
    },
    {
      name: 'OpenAI Models',
      proficiency: 'Production Proven',
      category: 'AI/ML',
      usage: 'Optimized GPT-4o-mini for cost-effective title generation',
    },
    {
      name: 'Batch Processing',
      proficiency: 'Production Proven',
      category: 'Data & Analytics',
      usage: 'Linear scaling architecture processing 4.5k items in 30 minutes',
    },
    {
      name: 'PostgreSQL',
      proficiency: 'Production Daily',
      category: 'Backend',
      usage: 'Stored optimized product data and processing metrics',
    },
    {
      name: 'Cost Optimization',
      proficiency: 'Production Proven',
      category: 'AI/ML',
      usage: 'Achieved $0.00003 per item through prompt engineering',
    },
  ],
}
