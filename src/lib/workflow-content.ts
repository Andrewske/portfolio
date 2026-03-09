import type { StaticImageData } from 'next/image';
import ahAhAh from '~/assets/workflow/ah-ah-ah-you-didnt-say-the-magic-word.gif';
import cleverGirl from '~/assets/workflow/clever-girl.gif';
import didntStopToThink from '~/assets/workflow/didnt-stop-to-think-if-they-should.jpg';
// Import images
import holdOnToYourButts from '~/assets/workflow/hold-on-to-your-butts.gif';

// New Block type system - primitives, compounds, containers, and structural
export type Block =
  // Primitives (single HTML elements)
  | { type: 'p'; content: string; id?: string; dinoOnly?: boolean }
  | { type: 'h2'; content: string; id?: string; dinoOnly?: boolean }
  | { type: 'h3'; content: string; id?: string; dinoOnly?: boolean }
  | { type: 'divider'; id?: string; dinoOnly?: boolean }
  | { type: 'image'; src: StaticImageData; alt: string; id?: string; dinoOnly?: boolean }
  | { type: 'code'; language: string; content: string; title?: string; id?: string; dinoOnly?: boolean }
  | { type: 'quote'; content: string; id?: string; dinoOnly?: boolean }
  | { type: 'timeskip'; content: string; id?: string; dinoOnly?: boolean }
  | { type: 'raw'; content: string; id?: string; dinoOnly?: boolean }
  // Compound blocks (multiple elements, semantic structure)
  | { type: 'list'; items: string[]; ordered?: boolean; id?: string; dinoOnly?: boolean }
  | { type: 'option'; number: number; title: string; pros?: string[]; cons?: string[]; id?: string; dinoOnly?: boolean }
  | { type: 'recommendation'; content: string; confidence?: number; id?: string; dinoOnly?: boolean }
  // Containers (wrap nested blocks)
  | { type: 'chat'; speaker: 'hammond' | 'claude'; blocks: Block[]; id?: string; dinoOnly?: boolean }
  | { type: 'finding'; severity: 'critical' | 'high' | 'medium' | 'low'; title: string; confidence?: number; blocks: Block[]; id?: string; dinoOnly?: boolean }
  | { type: 'kevin'; blocks: Block[]; id?: string; dinoOnly?: boolean }
  | { type: 'collapsible'; title: string; blocks: Block[]; id?: string; dinoOnly?: boolean }
  // Structural
  | { type: 'table'; headers: string[]; rows: string[][]; id?: string; dinoOnly?: boolean };

// Old ContentBlock type - kept temporarily for gradual migration
// Now ContentBlock is just an alias for Block
export type ContentBlock = Block;

export interface WorkflowPhase {
  id: string;
  title: string;
  blocks: Block[];
}

export interface WorkflowContent {
  intro: {
    title: string;
    subtitle: string;
    hook?: string;
  };
  tldr: {
    blocks: Block[];
  };
  introBlocks: Block[];
  phases: WorkflowPhase[];
  outro: {
    blocks: Block[];
  };
}

export const workflowContent: WorkflowContent = {
  intro: {
    title: "My Claude Code Workflow",
    subtitle: "Discussion → Plan → Review → Best-idea → Improve → Implement → Code-review",
    hook: "If you just want the skills, download them here and start using them today.",
  },

  tldr: {
    blocks: [
      {
        type: 'table',
        headers: ['Phase', 'What happens', 'Why it matters', 'Artifact'],
        rows: [
          ['Discussion', 'Claude asks questions one at a time until ready to plan', 'Forces decisions upfront instead of assumptions', 'Decisions list'],
          ['Plan', 'Claude writes exhaustive implementation plan (Opus)', 'The plan becomes the artifact you\'ll review and execute', '`~/.claude/plans/`'],
          ['Handoff', 'Break large plans into agent-sized task files', 'Parallel execution, clear dependencies', 'Task files'],
          ['Plan-review', 'Fresh context reviews plan for gaps', 'Catches issues before they become bugs', 'Findings list'],
          ['Best-idea', 'Research alternatives when uncertain', 'Finds Option D when you\'re stuck on A, B, C', 'Recommendation'],
          ['Improve-idea', 'Simplify, strengthen, "wouldn\'t it be cool if"', 'B+ plans become A- plans', 'Suggestions list'],
          ['Implement', 'Sub-agents execute in parallel', 'Trust the plan, context-switch to other work', 'Commits'],
          ['Code-review', 'Fresh context reviews commits', 'Catches what slipped through', 'Review notes'],
        ],
      },
    ],
  },

  introBlocks: [
    {
      type: 'p',
      content: 'I think out loud. Claude writes plans. We merge until the bugs are caught before they exist. The code is almost an afterthought. And somewhere in the discussion, ideas surface that I never would have prompted for.',
    },
    {
      type: 'p',
      content: 'The upfront investment is real. But it pays back in code that doesn\'t need to be rewritten.',
    },
    {
      type: 'p',
      content: 'I could walk you through each phase with bullet points. Instead, let\'s talk about dinosaurs.',
    },
    {
      type: 'p',
      content: '*(If you don\'t like fun, there\'s a "no dinos" toggle just for you.)*',
    },
  ],

  phases: [
    {
      id: 'scene',
      title: 'The Scene Opens',
      blocks: [
        {
          type: 'kevin',
          blocks: [
            { type: 'p', content: 'The common advice is "start in plan mode." Even the Claude Code team recommends it. But plan mode is still rushing toward a plan; it might ask a question or two, then it\'s off to the races.' },
            { type: 'p', content: 'Instead I just write up what problem I am trying to solve and end it with:' },
            { type: 'p', content: '`Ask me questions one at a time until you\'re ready to write a plan.`' },
            { type: 'p', content: 'No special prompt. Claude stops trying to solve immediately and starts asking questions. Once we\'ve actually talked it through, then I drop into plan mode to write it up.' },
            { type: 'p', content: 'Skip this step and life, uh, finds a way... of punishing you later.' },
          ],
        },
      ],
    },
    {
      id: 'discussion',
      title: 'Phase 1: Discussion',
      blocks: [
        {
          type: 'p',
          content: 'Hammond has shared his documentation. Containment systems, tour design, staffing plans, the investor deck. Claude has read everything.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'chat',
          speaker: 'claude',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'I\'ve reviewed the documentation. Strong vision, and the technical specs are more detailed than most projects I see at this stage.' },
            { type: 'p', content: 'Before I write the implementation plan, I need to clarify a few things.' },
            { type: 'p', content: '**First question:** What\'s the core guest experience you\'re optimizing for?' },
            { type: 'p', content: 'I see three possible framings in your materials:' },
            {
              type: 'option',
              number: 1,
              title: 'Educational',
              pros: [
                'Investor deck emphasizes "real science" and "witnessing evolution"',
                'Longer exhibit times, interpretive signage, guided tours with paleontologists',
              ],
            },
            {
              type: 'option',
              number: 2,
              title: 'Spectacle',
              pros: [
                'Tour route prioritizes dramatic reveals',
                'T-Rex paddock positioned for maximum impact',
                'Optimizing for awe over information',
              ],
            },
            {
              type: 'option',
              number: 3,
              title: 'Adventure',
              pros: [
                'Containment language implies controlled danger as a feature',
                '"Experience creatures that ruled the earth"',
                'Different safety calculus',
              ],
            },
            { type: 'p', content: 'Which framing should I prioritize when decisions conflict?' },
          ],
        },
        {
          type: 'chat',
          speaker: 'hammond',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'Spectacle, absolutely. I want a child to look up at a Brachiosaurus and forget that extinction was ever a thing. Wonder is what they\'re paying for.' },
          ],
        },
        {
          type: 'chat',
          speaker: 'claude',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'That clarifies several things in your tour design. The vehicle pacing makes sense now; you\'re controlling the reveal timing, not just moving people through efficiently.' },
            { type: 'p', content: 'Next question...' },
          ],
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'timeskip',
          content: 'Discussion continued, covering power redundancy, raptor behavior reports, guest evacuation routes, veterinary staffing, and why one IT employee seemed to have credentials for every critical system.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'chat',
          speaker: 'claude',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'I have enough to draft the plan.' },
            { type: 'p', content: '**Here\'s what we\'ve decided:**' },
            {
              type: 'list',
              items: [
                'Spectacle-first guest experience, science as supporting credibility',
                'Tour pacing optimized for dramatic reveals, not throughput',
                'Species separation to reduce predator-prey stress',
                'Veterinary facilities scaled for current population plus 20% growth',
                'Visitor center positioned as emergency centralization point',
                '"Kids love dinosaurs" confirmed as core marketing thesis',
              ],
            },
            { type: 'p', content: 'Anything else before I write this up?' },
          ],
        },
        {
          type: 'chat',
          speaker: 'hammond',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'I think that covers everything. We\'ve spared no expense.' },
          ],
        },
        {
          type: 'chat',
          speaker: 'claude',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'Ready for the plan.' },
          ],
        },
        { type: 'divider' },
        {
          type: 'kevin',
          blocks: [
            { type: 'p', content: 'Once Claude runs out of questions, I switch to plan mode. Instead of accepting the plan to begin implementation I run:' },
            { type: 'p', content: '`/handoff`' },
            { type: 'p', content: 'This creates a folder in `docs/`, splitting up the plan into task files scoped for smaller agents like Sonnet *(faster, cheaper, and they don\'t need the whole picture)*, plus a README with the high-level view.' },
          ],
        },
        {
          type: 'image',
          src: holdOnToYourButts,
          alt: 'Hold on to your butts',
          dinoOnly: true,
        },
      ],
    },
    {
      id: 'review',
      title: 'Phase 2: Plan Review',
      blocks: [
        {
          type: 'kevin',
          blocks: [
            { type: 'p', content: 'Once the planning documents have been created, I clear the context and run:' },
            { type: 'p', content: '`/plan-review docs/[plan-name]`' },
            { type: 'p', content: 'This reviewer doesn\'t remember you talking yourself into "it\'ll probably be fine." It just sees the plan and asks: does this actually make sense?' },
          ],
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          
          content: 'Plan Review: Jurassic Park Implementation Plan',
          dinoOnly: true,
        },
        {
          type: 'h2',
          content: 'Summary',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: 'Ambitious vision with solid containment specs and clear guest experience priorities. The main risks are infrastructure interdependencies: unified power systems and concentrated IT access create correlated failure modes.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          content: 'Findings',
          dinoOnly: true,
        },
        {
          type: 'finding',
          severity: 'critical',
          title: 'Single Point of Failure: Power Systems',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'Main power grid and diesel backup share infrastructure. A tropical storm that damages primary power could simultaneously flood the generator building.' },
            { type: 'p', content: '**Impact:** All electric fencing fails simultaneously across every paddock.' },
          ],
        },
        {
          type: 'finding',
          severity: 'critical',
          title: 'Single Point of Failure: IT Access',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'One employee (Nedry) holds system-wide credentials across security, containment, communications, and life support.' },
            { type: 'p', content: '**Impact:** Disgruntled employee, compromised account, or simple human error could disable all systems simultaneously.' },
          ],
        },
        {
          type: 'finding',
          severity: 'high',
          title: 'Raptor Containment Designed for Wrong Threat Model',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'Current containment (12-foot fences, standard feeding) treats raptors as physical threats. Field observations suggest cognitive threats: systematic fence testing, pattern learning, coordinated behavior.' },
            { type: 'p', content: '**Impact:** Fence height becomes irrelevant if they\'re probing for weaknesses, not trying to jump.' },
          ],
        },
        {
          type: 'finding',
          severity: 'medium',
          title: 'Viewing Areas at Ground Level',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'T-Rex and raptor paddocks have ground-level viewing platforms.' },
            { type: 'p', content: '**Impact:** Guests within reach if barrier fails.' },
          ],
        },
        {
          type: 'timeskip',
          content: 'Plus 4 additional findings covering guest evacuation, tour vehicle overrides, behavioral monitoring, and breeding controls.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          content: 'What the Plan Gets Right',
          dinoOnly: true,
        },
        {
          type: 'list',
          items: [
            'Spectacle-first experience with clear priority hierarchy',
            'Species separation prevents predator-prey stress',
            'Visitor center positioned for emergency centralization',
          ],
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          content: 'Questions Requiring Clarification',
          dinoOnly: true,
        },
        {
          type: 'list',
          items: [
            'What\'s Nedry\'s compensation relative to market rate?',
            'What is the latching mechanism on interior doors?',
            'Has the all-female population been independently verified?',
          ],
          ordered: true,
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'p',
          content: 'Ready to walk through findings. Say "go" to start one-at-a-time review.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          
          content: 'Findings Resolution',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'hammond',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'Go.' },
          ],
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'chat',
          speaker: 'claude',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'Categorizing findings:' },
            { type: 'p', content: '**Autosolve (≥90% confidence):** 6 findings' },
            {
              type: 'list',
              items: [
                'Power Systems: Underground backup generator, physically separated from operations',
                'IT Access: Role separation plus market-rate adjustment for Nedry, since concentrated access and underpayment is a flight risk',
                'Guest Evacuation: Zone-based bunkers every 500m, because "return to visitor center" assumes you can',
                'Tour Vehicles: Auto-unlock on power loss, so guests aren\'t served adjacent to the T-Rex',
                'Behavioral Monitoring: Hire an ethologist, someone should notice if the animals are planning something',
                'Breeding Controls: Ecosystem audit for alternative lysine sources, since life finds a way',
              ],
            },
            { type: 'p', content: '**Discussion (<90%):** 2 findings' },
            {
              type: 'list',
              items: [
                'Finding 3: Raptor Containment',
                'Finding 4: Viewing Areas',
              ],
            },
            { type: 'p', content: 'Starting with Finding 4.' },
          ],
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          content: 'Finding 4: Viewing Areas (MEDIUM)',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: 'T-Rex and raptor paddocks have ground-level viewing platforms. Guests within reach if barrier fails.',
          dinoOnly: true,
        },
        {
          type: 'option',
          number: 1,
          title: 'Fully elevated platforms (20+ feet)',
          pros: ['Maximum safety margin, eliminates ground-level failure mode'],
          cons: ['Reduces visceral experience, guests feel distant'],
          dinoOnly: true,
        },
        {
          type: 'option',
          number: 2,
          title: 'Elevated with open-air design',
          pros: ['Maintains spectacle while adding safety margin'],
          cons: ['Still requires emergency descent planning'],
          dinoOnly: true,
        },
        {
          type: 'recommendation',
          content: 'Option 1. Eliminates the failure mode entirely. Still provides dramatic views.',
          confidence: 88,
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'hammond',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'No. Option 2.' },
            { type: 'p', content: 'The whole point is feeling the ground shake when the T-Rex walks. You can\'t experience that through twenty feet of steel scaffolding. We need elevation for safety, but the experience has to stay visceral. Open air, close enough to feel it.' },
          ],
        },
        {
          type: 'chat',
          speaker: 'claude',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'Understood. Spectacle as primary driver; I should have weighted it higher.' },
            { type: 'p', content: '**Proposed solution:**' },
            {
              type: 'list',
              items: [
                'Elevated platforms with rapid-descent emergency exits',
                'Immersive experience during normal operation',
                'Drop to bunker level in under 30 seconds if containment fails',
                'Safety infrastructure stays invisible until needed',
              ],
            },
            { type: 'p', content: 'Moving to Finding 3.' },
          ],
        },
        { type: 'divider' },
        {
          type: 'kevin',
          blocks: [
            { type: 'p', content: 'Plan-review surfaces findings, and Claude gives options in tiers (usually simple to complex, or safe to aggressive). Its recommendations are reasonable given what it knows. But it doesn\'t know everything.' },
            { type: 'p', content: 'It might suggest skipping a feature to reduce complexity, but I know users have been asking for it for months. Or it recommends the robust solution when I just need something working by Friday.' },
            { type: 'p', content: 'This happens constantly. Claude optimizes for what it can see. You fill in what it can\'t.' },
          ],
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          content: 'Finding 3: Raptor Containment (HIGH)',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: 'Current containment treats raptors as physical threats. Field observations suggest cognitive threats: systematic fence testing, pattern learning, coordinated behavior.',
          dinoOnly: true,
        },
        {
          type: 'option',
          number: 1,
          title: 'Increase physical barriers',
          pros: ['Straightforward implementation, higher fences with moat'],
          cons: ['Addresses symptoms, not cause'],
          dinoOnly: true,
        },
        {
          type: 'option',
          number: 2,
          title: 'Behavioral countermeasures',
          pros: ['Addresses cognitive threat model with randomized feeding, multiple barrier types'],
          cons: ['More complex, requires ongoing operational changes'],
          dinoOnly: true,
        },
        {
          type: 'option',
          number: 3,
          title: 'Commission behavioral assessment first',
          pros: ['Understand what we\'re containing before finalizing design'],
          cons: ['Delays implementation'],
          dinoOnly: true,
        },
        {
          type: 'recommendation',
          content: 'Option 2.',
          confidence: 72,
          dinoOnly: true,
        },
        {
          type: 'p',
          content: 'Physical barriers assume they\'re trying to overpower containment. If they\'re probing for weaknesses instead, unpredictability matters more than height.',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: 'But confidence is low. I don\'t have hard data on raptor capabilities. How high can they jump? Can they climb? How coordinated is pack behavior?',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'hammond',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: '/best-idea What about a moat system combined with randomized feeding? The field reports mention they avoid water.' },
          ],
        },
      ],
    },
    {
      id: 'best-idea',
      title: 'Phase 3: Best Idea',
      blocks: [
        {
          type: 'kevin',
          blocks: [
            { type: 'p', content: '`/best-idea` is for when findings aren\'t clear, or you have an inkling there\'s a better way.' },
            { type: 'p', content: 'Run the command with your half-formed thought. Claude does extra research and either confirms its recommendation or finds something it completely missed: a package that already solves it, a simpler structure, the thing you were overcomplicating.' },
          ],
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          
          content: 'Best-Idea Evaluation: Raptor Containment',
          dinoOnly: true,
        },
        {
          type: 'h2',
          content: 'Research Summary',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: 'After reviewing paleontological behavior studies, modern apex predator containment standards, and field incident reports:',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Key findings about Velociraptors:**',
          dinoOnly: true,
        },
        {
          type: 'list',
          items: [
            '**Problem-solving intelligence comparable to primates.** They don\'t just react; they experiment. Systematic fence testing is consistent with cognitive mapping behavior seen in great apes.',
            '**Can jump 10+ feet vertically from standing.** 12-foot fences provide less than 2 feet of margin.',
            '**Test barriers systematically and remember weak points.** They return to the same sections because they\'re tracking results over time.',
            '**Learn from observation.** Field reports note they watch handlers during feeding. Not tracking food. Studying process.',
          ],
          ordered: true,
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Current plan gap:** Treats raptors as physical threats requiring physical barriers. Doesn\'t account for cognitive capabilities.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          content: 'Hammond\'s Hypothesis Evaluated',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Moat system + randomized feeding**',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: 'The instinct is partially right:\n- Moats provide a barrier that works without power\n- Randomization prevents pattern learning\n- Water aversion is real\n\nBut incomplete. Moat alone doesn\'t address climbing or jumping. Randomized feeding doesn\'t help if they\'re also learning handler schedules, patrol routes, gate procedures.\n\nHigher fences and electrified ceilings have the same problem: they assume physical containment is enough. If they\'re probing for weaknesses, single barriers of any type are insufficient.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          content: 'Recommendation',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Multi-layer containment with behavioral countermeasures** (87% confidence)',
          dinoOnly: true,
        },
        {
          type: 'list',
          items: [
            'Outer fence: 24-foot, angled inward at top',
            'Inner fence: Separate power system from main grid',
            'Moat between fences: Leverages water aversion, works without power',
            'Randomized feeding: Locations AND schedules vary',
            'Randomized patrol routes: Predictable security is exploitable security',
            'Double-airlock entry: No direct human access to enclosure, ever',
          ],
          dinoOnly: true,
        },
        {
          type: 'p',
          content: 'Hammond\'s moat instinct was right, but it needs to be part of a layered system. The key insight isn\'t height or voltage. It\'s that **they\'re testing you as much as you\'re containing them.**',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'chat',
          speaker: 'hammond',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'They remember weak points? They watch handlers?' },
          ],
        },
        {
          type: 'chat',
          speaker: 'claude',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'They return to the same fence sections repeatedly. They\'re not testing randomly; they\'re running experiments. And during feeding, they track handler movements rather than just the food. Your containment staff are being studied.' },
          ],
        },
        {
          type: 'image',
          src: cleverGirl,
          alt: 'Clever girl',
          dinoOnly: true,
        },
        {
          type: 'collapsible',
          title: 'Full best-idea prompt',
          blocks: [
            { type: 'p', content: '[Collapsible content: best-idea prompt goes here]' },
          ],
        },
      ],
    },
    {
      id: 'improve',
      title: 'Phase 4: Improve Idea',
      blocks: [
        {
          type: 'kevin',
          blocks: [
            { type: 'p', content: '`/improve-idea` asks three questions: What can we simplify? What should we strengthen? And "wouldn\'t it be cool if..."' },
            { type: 'p', content: 'The wild ideas aren\'t always practical, but sometimes they\'re exactly what the project needs. They can also just be fun, and what takes a B plan to an A.' },
          ],
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          
          content: 'Idea Improvement: Jurassic Park Implementation Plan',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          content: '1. Simplify',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Single "lockdown" command**\nCurrently requires per-paddock activation. One command triggers all containment protocols simultaneously.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          content: '2. Strengthen',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Puzzle feeders for raptors**\nMental stimulation reduces escape motivation. Bored apex predators find their own entertainment. Give them problems to solve that aren\'t "how do I get out."',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Environmental enrichment for T-Rex paddock**\nCurrently barren. One goat on a chain isn\'t enrichment. Varied terrain, hunting simulations, environmental complexity. Recommend starting with a big red ball.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          content: '3. Stretch',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Gallimimus stampede experience**\nGuests stand in designated "safe zone" while the herd thunders past during feeding time. High spectacle, moderate risk.',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Compy petting zoo**\nThey\'re small. How dangerous could they be? Family-friendly, high engagement.',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Dinosaur dung exhibit**\nEducational value. Dr. Sattler approved. Gift shop sells bags for home gardens.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'chat',
          speaker: 'hammond',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'The compy petting zoo. I love those little guys. Had one nibble at me once. Are we sure they\'re safe?' },
          ],
        },
        {
          type: 'chat',
          speaker: 'claude',
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'Researching... Only two reported cases of compys inflicting life-threatening injuries.' },
          ],
        },
        { type: 'divider' },
        {
          type: 'collapsible',
          title: 'Full improve-idea prompt',
          blocks: [
            { type: 'p', content: '[Collapsible content: improve-idea prompt goes here]' },
          ],
        },
      ],
    },
    {
      id: 'implement',
      title: 'Implementation',
      blocks: [
        {
          type: 'kevin',
          blocks: [
            { type: 'p', content: 'Once the plan is solid, clear context and run `/start-implementation`. Sub-agents spin up in parallel, each working from its task file, no context bleed between them.' },
            { type: 'p', content: 'I set it running and context-switch to other work. Come back when it\'s done. (Assuming you\'ve set up the permissions. Ask me how I learned that.)' },
          ],
        },
      ],
    },
    {
      id: 'code-review',
      title: 'Phase 5: Code Review',
      blocks: [
        {
          type: 'kevin',
          blocks: [
            { type: 'p', content: 'After implementation, clear context and run `/code-review`. It catches the gap between what the plan said and what got built.' },
            { type: 'p', content: 'The agent that implemented knew the intent. A fresh reviewer just sees code. Most findings are syntax or type errors, but you\'ll be surprised how often it catches a wrong assumption or a cleaner way to do something.' },
          ],
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'h2',
          
          content: 'Code Review: Jurassic Park Implementation',
          dinoOnly: true,
        },
        {
          type: 'h2',
          content: 'Finding 1 (MEDIUM): Autosolve',
          dinoOnly: true,
        },
        {
          type: 'p',
          content: '**Location:** Kitchen, Visitor Center\n\nStandard door handles installed throughout facility.\n\n**Why this matters:** If any animal demonstrates the ability to operate lever-style handles, every interior door becomes a breach point.\n\n**Fix:** Replace with round knobs or push-bar mechanisms.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'finding',
          severity: 'critical',
          title: 'Single point of failure in critical systems staffing',
          confidence: 95,
          dinoOnly: true,
          blocks: [
            { type: 'p', content: 'New role-based access controls have been added, but existing credentials were left unchanged. Nedry still has system-wide access across security, containment, communications, and life support.' },
            { type: 'p', content: 'Additionally: compensation data shows Nedry at 15% below market rate for his role. Concentrated access plus underpayment is a flight risk.' },
            {
              type: 'option',
              number: 1,
              title: 'Retention package',
              pros: ['Immediate salary adjustment to market rate, reduces flight risk'],
              cons: ['Doesn\'t address single point of failure'],
            },
            {
              type: 'option',
              number: 2,
              title: 'Redundancy',
              pros: ['Hire second systems engineer, implement credential handoff'],
              cons: ['Doesn\'t address compensation gap motivation'],
            },
            {
              type: 'option',
              number: 3,
              title: 'Both',
              pros: ['Address motivation and eliminate single point of failure'],
              cons: ['Highest cost and implementation complexity'],
            },
            {
              type: 'recommendation',
              content: 'Option 3.',
              confidence: 95,
            },
            { type: 'p', content: 'The fences don\'t matter if the person controlling them has a better offer.' },
          ],
        },
        {
          type: 'image',
          src: ahAhAh,
          alt: 'Ah ah ah, you didn\'t say the magic word',
          dinoOnly: true,
        },
        { type: 'divider' },
        {
          type: 'collapsible',
          title: 'Full code-review prompt',
          blocks: [
            { type: 'p', content: '[Collapsible content: code-review prompt goes here]' },
          ],
        },
      ],
    },
  ],

  outro: {
    blocks: [
      {
        type: 'h2',
        
        content: 'Outro',
      },
      {
        type: 'p',
        content: 'That\'s the workflow. Discussion → plan → review → best-idea → improve → implement → code-review.',
      },
      {
        type: 'p',
        content: 'Claude can one-shot most things. But one-shotting isn\'t the ceiling. It\'s the floor. When you take the time to discuss each piece, push back on recommendations, and review with fresh eyes, you\'re not just using Claude. You\'re combining what you know with what Claude knows.',
      },
      {
        type: 'p',
        content: 'Claude sees patterns across millions of codebases. You see the user who\'s been asking for that feature for six months. Neither perspective is complete. The workflow exists to collide them.',
      },
      {
        type: 'p',
        content: 'The hours of upfront discussion feel slow. Turns out, they pay back in code that doesn\'t need to be rewritten.',
      },
      {
        type: 'p',
        content: 'Skip the workflow and: Developer writes prompt. Prompt creates AI agent. AI agent writes code. Code breaks production. Tech debt inherits the earth.',
      },
      { type: 'divider' },
      {
        type: 'p',
        content: 'Hammond\'s original plan would have worked perfectly, assuming nothing went wrong. This workflow exists because things go wrong, and the best time to find that out is before you\'ve written a single line of code.',
        dinoOnly: true,
      },
      {
        type: 'image',
        src: didntStopToThink,
        alt: 'Your scientists were so preoccupied with whether they could, they didn\'t stop to think if they should',
        dinoOnly: true,
      },
      { type: 'divider' },
      {
        type: 'h2',
        
        content: 'Download the Skills',
      },
      {
        type: 'list',
        items: [
          'plan-review.md',
          'best-idea.md',
          'improve-idea.md',
          'code-review.md',
          'start-implementation.md',
        ],
      },
    ],
  },
};
