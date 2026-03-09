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
export type ContentBlock =
  | { type: 'placeholder'; label: string }
  | { type: 'text'; content: string; dinoOnly?: boolean }
  | { type: 'chat'; speaker: 'hammond' | 'claude'; content: string; id?: string; dinoOnly?: boolean }
  | { type: 'kevin'; content: string; whatBreaks?: string; id?: string }
  | { type: 'timeskip'; content: string; dinoOnly?: boolean }
  | { type: 'finding'; severity: 'critical' | 'high' | 'medium' | 'low'; title: string; confidence?: number; content: string; dinoOnly?: boolean }
  | { type: 'collapsible'; title: string; content: string }
  | { type: 'phase'; phase: string; dinoOnly?: boolean }
  | { type: 'code'; language: string; content: string; title?: string }
  | { type: 'heading'; level: 2 | 3; content: string; dinoOnly?: boolean }
  | { type: 'list'; items: string[]; ordered?: boolean; dinoOnly?: boolean }
  | { type: 'image'; src: StaticImageData; alt: string; dinoOnly?: boolean }
  | { type: 'divider'; dinoOnly?: boolean }
  | { type: 'quote'; content: string; dinoOnly?: boolean }
  | { type: 'table'; headers: string[]; rows: string[][] };

export interface WorkflowPhase {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface WorkflowContent {
  intro: {
    title: string;
    subtitle: string;
    hook?: string;
  };
  tldr: {
    blocks: ContentBlock[];
  };
  introBlocks: ContentBlock[];
  phases: WorkflowPhase[];
  outro: {
    blocks: ContentBlock[];
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
      type: 'text',
      content: 'I think out loud. Claude writes plans. We merge until the bugs are caught before they exist. The code is almost an afterthought. And somewhere in the discussion, ideas surface that I never would have prompted for.',
    },
    {
      type: 'text',
      content: 'The upfront investment is real. But it pays back in code that doesn\'t need to be rewritten.',
    },
    {
      type: 'text',
      content: 'I could walk you through each phase with bullet points. Instead, let\'s talk about dinosaurs.',
    },
    {
      type: 'text',
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
          content: 'The common advice is "start in plan mode." Even the Claude Code team recommends it. But plan mode is still rushing toward a plan; it might ask a question or two, then it\'s off to the races.\n\nInstead I just write up what problem I am trying to solve and end it with:\n\n`Ask me questions one at a time until you\'re ready to write a plan.`\n\nNo special prompt. Claude stops trying to solve immediately and starts asking questions. Once we\'ve actually talked it through, then I drop into plan mode to write it up.\n\nSkip this step and life, uh, finds a way... of punishing you later.',
        },
      ],
    },
    {
      id: 'discussion',
      title: 'Phase 1: Discussion',
      blocks: [
        {
          type: 'text',
          content: 'Hammond has shared his documentation. Containment systems, tour design, staffing plans, the investor deck. Claude has read everything.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'chat',
          speaker: 'claude',
          content: 'I\'ve reviewed the documentation. Strong vision, and the technical specs are more detailed than most projects I see at this stage.\n\nBefore I write the implementation plan, I need to clarify a few things.\n\n**First question:** What\'s the core guest experience you\'re optimizing for?\n\nI see three possible framings in your materials:\n\n**1. Educational**\n- Investor deck emphasizes "real science" and "witnessing evolution"\n- Longer exhibit times, interpretive signage, guided tours with paleontologists\n\n**2. Spectacle**\n- Tour route prioritizes dramatic reveals\n- T-Rex paddock positioned for maximum impact\n- Optimizing for awe over information\n\n**3. Adventure**\n- Containment language implies controlled danger as a feature\n- "Experience creatures that ruled the earth"\n- Different safety calculus\n\nWhich framing should I prioritize when decisions conflict?',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'hammond',
          content: 'Spectacle, absolutely. I want a child to look up at a Brachiosaurus and forget that extinction was ever a thing. Wonder is what they\'re paying for.',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'claude',
          content: 'That clarifies several things in your tour design. The vehicle pacing makes sense now; you\'re controlling the reveal timing, not just moving people through efficiently.\n\nNext question...',
          dinoOnly: true,
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
          content: 'I have enough to draft the plan.\n\n**Here\'s what we\'ve decided:**\n- Spectacle-first guest experience, science as supporting credibility\n- Tour pacing optimized for dramatic reveals, not throughput\n- Species separation to reduce predator-prey stress\n- Veterinary facilities scaled for current population plus 20% growth\n- Visitor center positioned as emergency centralization point\n- "Kids love dinosaurs" confirmed as core marketing thesis\n\nAnything else before I write this up?',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'hammond',
          content: 'I think that covers everything. We\'ve spared no expense.',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'claude',
          content: 'Ready for the plan.',
          dinoOnly: true,
        },
        { type: 'divider' },
        {
          type: 'kevin',
          content: 'Once Claude runs out of questions, I switch to plan mode. Instead of accepting the plan to begin implementation I run:\n\n`/handoff`\n\nThis creates a folder in `docs/`, splitting up the plan into task files scoped for smaller agents like Sonnet *(faster, cheaper, and they don\'t need the whole picture)*, plus a README with the high-level view.',
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
          content: 'Once the planning documents have been created, I clear the context and run:\n\n`/plan-review docs/[plan-name]`\n\nThis reviewer doesn\'t remember you talking yourself into "it\'ll probably be fine." It just sees the plan and asks: does this actually make sense?',
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 2,
          content: 'Plan Review: Jurassic Park Implementation Plan',
          dinoOnly: true,
        },
        {
          type: 'heading',
          level: 3,
          content: 'Summary',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'Ambitious vision with solid containment specs and clear guest experience priorities. The main risks are infrastructure interdependencies: unified power systems and concentrated IT access create correlated failure modes.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 3,
          content: 'Findings',
          dinoOnly: true,
        },
        {
          type: 'finding',
          severity: 'critical',
          title: 'Single Point of Failure: Power Systems',
          content: 'Main power grid and diesel backup share infrastructure. A tropical storm that damages primary power could simultaneously flood the generator building.\n\n**Impact:** All electric fencing fails simultaneously across every paddock.',
          dinoOnly: true,
        },
        {
          type: 'finding',
          severity: 'critical',
          title: 'Single Point of Failure: IT Access',
          content: 'One employee (Nedry) holds system-wide credentials across security, containment, communications, and life support.\n\n**Impact:** Disgruntled employee, compromised account, or simple human error could disable all systems simultaneously.',
          dinoOnly: true,
        },
        {
          type: 'finding',
          severity: 'high',
          title: 'Raptor Containment Designed for Wrong Threat Model',
          content: 'Current containment (12-foot fences, standard feeding) treats raptors as physical threats. Field observations suggest cognitive threats: systematic fence testing, pattern learning, coordinated behavior.\n\n**Impact:** Fence height becomes irrelevant if they\'re probing for weaknesses, not trying to jump.',
          dinoOnly: true,
        },
        {
          type: 'finding',
          severity: 'medium',
          title: 'Viewing Areas at Ground Level',
          content: 'T-Rex and raptor paddocks have ground-level viewing platforms.\n\n**Impact:** Guests within reach if barrier fails.',
          dinoOnly: true,
        },
        {
          type: 'timeskip',
          content: 'Plus 4 additional findings covering guest evacuation, tour vehicle overrides, behavioral monitoring, and breeding controls.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 3,
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
          type: 'heading',
          level: 3,
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
          type: 'text',
          content: 'Ready to walk through findings. Say "go" to start one-at-a-time review.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 2,
          content: 'Findings Resolution',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'hammond',
          content: 'Go.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'chat',
          speaker: 'claude',
          content: 'Categorizing findings:\n\n**Autosolve (≥90% confidence):** 6 findings\n    - Power Systems: Underground backup generator, physically separated from operations\n    - IT Access: Role separation plus market-rate adjustment for Nedry, since concentrated access and underpayment is a flight risk\n    - Guest Evacuation: Zone-based bunkers every 500m, because "return to visitor center" assumes you can\n    - Tour Vehicles: Auto-unlock on power loss, so guests aren\'t served adjacent to the T-Rex\n    - Behavioral Monitoring: Hire an ethologist, someone should notice if the animals are planning something\n    - Breeding Controls: Ecosystem audit for alternative lysine sources, since life finds a way\n\n**Discussion (<90%):** 2 findings\n    - Finding 3: Raptor Containment\n    - Finding 4: Viewing Areas\n\nStarting with Finding 4.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 3,
          content: 'Finding 4: Viewing Areas (MEDIUM)',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'T-Rex and raptor paddocks have ground-level viewing platforms. Guests within reach if barrier fails.',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'Option 1: Fully elevated platforms (20+ feet)\n    - Pro: Maximum safety margin, eliminates ground-level failure mode\n    - Con: Reduces visceral experience, guests feel distant',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'Option 2: Elevated with open-air design\n    - Pro: Maintains spectacle while adding safety margin\n    - Con: Still requires emergency descent planning',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'Recommended: Option 1 (88% confidence). Eliminates the failure mode entirely. Still provides dramatic views.',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'hammond',
          content: 'No. Option 2.\n\nThe whole point is feeling the ground shake when the T-Rex walks. You can\'t experience that through twenty feet of steel scaffolding. We need elevation for safety, but the experience has to stay visceral. Open air, close enough to feel it.',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'claude',
          content: 'Understood. Spectacle as primary driver; I should have weighted it higher.\n\n**Proposed solution:**\n    - Elevated platforms with rapid-descent emergency exits\n    - Immersive experience during normal operation\n    - Drop to bunker level in under 30 seconds if containment fails\n    - Safety infrastructure stays invisible until needed\n\nMoving to Finding 3.',
          dinoOnly: true,
        },
        { type: 'divider' },
        {
          type: 'kevin',
          content: 'Plan-review surfaces findings, and Claude gives options in tiers (usually simple to complex, or safe to aggressive). Its recommendations are reasonable given what it knows. But it doesn\'t know everything.\n\nIt might suggest skipping a feature to reduce complexity, but I know users have been asking for it for months. Or it recommends the robust solution when I just need something working by Friday.\n\nThis happens constantly. Claude optimizes for what it can see. You fill in what it can\'t.',
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 3,
          content: 'Finding 3: Raptor Containment (HIGH)',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'Current containment treats raptors as physical threats. Field observations suggest cognitive threats: systematic fence testing, pattern learning, coordinated behavior.',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'Option 1: Increase physical barriers\n    - Pro: Straightforward implementation, higher fences with moat\n    - Con: Addresses symptoms, not cause',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'Option 2: Behavioral countermeasures\n    - Pro: Addresses cognitive threat model with randomized feeding, multiple barrier types\n    - Con: More complex, requires ongoing operational changes',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'Option 3: Commission behavioral assessment first\n    - Pro: Understand what we\'re containing before finalizing design\n    - Con: Delays implementation',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'Recommended: Option 2 (72% confidence).\n\nPhysical barriers assume they\'re trying to overpower containment. If they\'re probing for weaknesses instead, unpredictability matters more than height.\n\nBut confidence is low. I don\'t have hard data on raptor capabilities. How high can they jump? Can they climb? How coordinated is pack behavior?',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'hammond',
          content: '/best-idea What about a moat system combined with randomized feeding? The field reports mention they avoid water.',
          dinoOnly: true,
        },
      ],
    },
    {
      id: 'best-idea',
      title: 'Phase 3: Best Idea',
      blocks: [
        {
          type: 'kevin',
          content: '`/best-idea` is for when findings aren\'t clear, or you have an inkling there\'s a better way.\n\nRun the command with your half-formed thought. Claude does extra research and either confirms its recommendation or finds something it completely missed: a package that already solves it, a simpler structure, the thing you were overcomplicating.',
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 2,
          content: 'Best-Idea Evaluation: Raptor Containment',
          dinoOnly: true,
        },
        {
          type: 'heading',
          level: 3,
          content: 'Research Summary',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'After reviewing paleontological behavior studies, modern apex predator containment standards, and field incident reports:',
          dinoOnly: true,
        },
        {
          type: 'text',
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
          type: 'text',
          content: '**Current plan gap:** Treats raptors as physical threats requiring physical barriers. Doesn\'t account for cognitive capabilities.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 3,
          content: 'Hammond\'s Hypothesis Evaluated',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: '**Moat system + randomized feeding**',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: 'The instinct is partially right:\n- Moats provide a barrier that works without power\n- Randomization prevents pattern learning\n- Water aversion is real\n\nBut incomplete. Moat alone doesn\'t address climbing or jumping. Randomized feeding doesn\'t help if they\'re also learning handler schedules, patrol routes, gate procedures.\n\nHigher fences and electrified ceilings have the same problem: they assume physical containment is enough. If they\'re probing for weaknesses, single barriers of any type are insufficient.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 3,
          content: 'Recommendation',
          dinoOnly: true,
        },
        {
          type: 'text',
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
          type: 'text',
          content: 'Hammond\'s moat instinct was right, but it needs to be part of a layered system. The key insight isn\'t height or voltage. It\'s that **they\'re testing you as much as you\'re containing them.**',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'chat',
          speaker: 'hammond',
          content: 'They remember weak points? They watch handlers?',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'claude',
          content: 'They return to the same fence sections repeatedly. They\'re not testing randomly; they\'re running experiments. And during feeding, they track handler movements rather than just the food. Your containment staff are being studied.',
          dinoOnly: true,
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
          content: '[Collapsible content: best-idea prompt goes here]',
        },
      ],
    },
    {
      id: 'improve',
      title: 'Phase 4: Improve Idea',
      blocks: [
        {
          type: 'kevin',
          content: '`/improve-idea` asks three questions: What can we simplify? What should we strengthen? And "wouldn\'t it be cool if..."\n\nThe wild ideas aren\'t always practical, but sometimes they\'re exactly what the project needs. They can also just be fun, and what takes a B plan to an A.',
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 2,
          content: 'Idea Improvement: Jurassic Park Implementation Plan',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 3,
          content: '1. Simplify',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: '**Single "lockdown" command**\nCurrently requires per-paddock activation. One command triggers all containment protocols simultaneously.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 3,
          content: '2. Strengthen',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: '**Puzzle feeders for raptors**\nMental stimulation reduces escape motivation. Bored apex predators find their own entertainment. Give them problems to solve that aren\'t "how do I get out."',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: '**Environmental enrichment for T-Rex paddock**\nCurrently barren. One goat on a chain isn\'t enrichment. Varied terrain, hunting simulations, environmental complexity. Recommend starting with a big red ball.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 3,
          content: '3. Stretch',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: '**Gallimimus stampede experience**\nGuests stand in designated "safe zone" while the herd thunders past during feeding time. High spectacle, moderate risk.',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: '**Compy petting zoo**\nThey\'re small. How dangerous could they be? Family-friendly, high engagement.',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: '**Dinosaur dung exhibit**\nEducational value. Dr. Sattler approved. Gift shop sells bags for home gardens.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'chat',
          speaker: 'hammond',
          content: 'The compy petting zoo. I love those little guys. Had one nibble at me once. Are we sure they\'re safe?',
          dinoOnly: true,
        },
        {
          type: 'chat',
          speaker: 'claude',
          content: 'Researching... Only two reported cases of compys inflicting life-threatening injuries.',
          dinoOnly: true,
        },
        { type: 'divider' },
        {
          type: 'collapsible',
          title: 'Full improve-idea prompt',
          content: '[Collapsible content: improve-idea prompt goes here]',
        },
      ],
    },
    {
      id: 'implement',
      title: 'Implementation',
      blocks: [
        {
          type: 'kevin',
          content: 'Once the plan is solid, clear context and run `/start-implementation`. Sub-agents spin up in parallel, each working from its task file, no context bleed between them.\n\nI set it running and context-switch to other work. Come back when it\'s done. (Assuming you\'ve set up the permissions. Ask me how I learned that.)',
        },
      ],
    },
    {
      id: 'code-review',
      title: 'Phase 5: Code Review',
      blocks: [
        {
          type: 'kevin',
          content: 'After implementation, clear context and run `/code-review`. It catches the gap between what the plan said and what got built.\n\nThe agent that implemented knew the intent. A fresh reviewer just sees code. Most findings are syntax or type errors, but you\'ll be surprised how often it catches a wrong assumption or a cleaner way to do something.',
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'heading',
          level: 2,
          content: 'Code Review: Jurassic Park Implementation',
          dinoOnly: true,
        },
        {
          type: 'heading',
          level: 3,
          content: 'Finding 1 (MEDIUM): Autosolve',
          dinoOnly: true,
        },
        {
          type: 'text',
          content: '**Location:** Kitchen, Visitor Center\n\nStandard door handles installed throughout facility.\n\n**Why this matters:** If any animal demonstrates the ability to operate lever-style handles, every interior door becomes a breach point.\n\n**Fix:** Replace with round knobs or push-bar mechanisms.',
          dinoOnly: true,
        },
        { type: 'divider', dinoOnly: true },
        {
          type: 'finding',
          severity: 'critical',
          title: 'Single point of failure in critical systems staffing',
          confidence: 95,
          content: 'New role-based access controls have been added, but existing credentials were left unchanged. Nedry still has system-wide access across security, containment, communications, and life support.\n\nAdditionally: compensation data shows Nedry at 15% below market rate for his role. Concentrated access plus underpayment is a flight risk.\n\nOption 1: Retention package\n    - Pro: Immediate salary adjustment to market rate, reduces flight risk\n    - Con: Doesn\'t address single point of failure\n\nOption 2: Redundancy\n    - Pro: Hire second systems engineer, implement credential handoff\n    - Con: Doesn\'t address compensation gap motivation\n\nOption 3: Both (Recommended)\n    - Pro: Address motivation and eliminate single point of failure\n    - Con: Highest cost and implementation complexity\n\nRecommended: Option 3 (95% confidence).\n\nThe fences don\'t matter if the person controlling them has a better offer.',
          dinoOnly: true,
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
          content: '[Collapsible content: code-review prompt goes here]',
        },
      ],
    },
  ],

  outro: {
    blocks: [
      {
        type: 'heading',
        level: 2,
        content: 'Outro',
      },
      {
        type: 'text',
        content: 'That\'s the workflow. Discussion → plan → review → best-idea → improve → implement → code-review.',
      },
      {
        type: 'text',
        content: 'Claude can one-shot most things. But one-shotting isn\'t the ceiling. It\'s the floor. When you take the time to discuss each piece, push back on recommendations, and review with fresh eyes, you\'re not just using Claude. You\'re combining what you know with what Claude knows.',
      },
      {
        type: 'text',
        content: 'Claude sees patterns across millions of codebases. You see the user who\'s been asking for that feature for six months. Neither perspective is complete. The workflow exists to collide them.',
      },
      {
        type: 'text',
        content: 'The hours of upfront discussion feel slow. Turns out, they pay back in code that doesn\'t need to be rewritten.',
      },
      {
        type: 'text',
        content: 'Skip the workflow and: Developer writes prompt. Prompt creates AI agent. AI agent writes code. Code breaks production. Tech debt inherits the earth.',
      },
      { type: 'divider' },
      {
        type: 'text',
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
        type: 'heading',
        level: 2,
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
