# Claude Code Workflow Blog Post

## Current Status

**Phase: Core Components Complete, Ready for Content Integration**

- [x] Initial vision and structure
- [x] Planning session
- [x] Content plan written (`CONTENT-PLAN.md`)
- [x] Tasks distributed (`../claude-workflow-blog-tasks/`)
- [x] Plan review (this session)
- [x] Improve-idea review (this session)
- [x] Content draft written (`DRAFT.md`)
- [x] Technical implementation (page route + components)
- [ ] Wire up content from DRAFT.md
- [ ] Polish and ship

**Next step:** Populate `workflow-content.ts` with actual content from DRAFT.md

---

## Vision

A blog post for the portfolio site explaining Kevin's Claude Code workflow, aimed primarily at Glade.ai coworkers. The post uses a Jurassic Park "rebuilding the park" example threaded throughout to make concepts memorable and entertaining.

## Core Thesis

**"Plans are the product."** The heavy investment in planning, review, and iteration before touching code is what makes Claude write code you trust. Front-load decisions, exhaust the problem space, then execute with confidence.

### Supporting Ideas

1. **"Mind fusion"** - The workflow is collaborative, not supervisory. Neither Claude nor human writes the plan alone. Claude has breadth, you have vision and domain knowledge. The collision creates better plans than either could write solo.
2. **"Ask questions one at a time"** - Forces thorough problem exploration and upfront decision-making (vs Claude rushing to solutions with assumptions)
3. **Parallel execution enabled** - Trust in plans lets you kick off implementation and context-switch to other projects
4. **Human corrections matter** - Claude sometimes recommends wrong options. The human brings domain knowledge Claude lacks (business priorities, user experience, vision)

## Target Audience

- **Primary**: Glade.ai coworkers (engineers curious about Kevin's approach)
- **Secondary**: Other engineers who might read on Medium

## Tone

- Practical and direct
- Self-aware humor through the JP theme
- Shows the "why" behind each step without being preachy
- Confident but not dogmatic

---

## Content Structure

### 1. Opening Hook
- Bold claim: "Claude writes all of my code"
- Brief context: year of iteration, what makes this work
- Introduce the philosophy: "Ask me questions one at a time until you're ready to write a plan"

### 2. The Problem
- Why most AI coding feels fragile
- The assumption trap: Claude fills in gaps you didn't know existed
- The fix-loop: you spend more time correcting than building

### 3. The Philosophy
- Plans are the product
- Discussion mode (NOT planning mode) for problem exploration
- One-at-a-time questioning forces decisions upfront
- Context clearing between phases (fresh perspective)

### 4. The Workflow (with JP example threaded through)

#### Phase 1: Discussion
- "Ask me questions one at a time until ready to write a plan"
- Example: JP park planning Q&A
- Key questions Claude might ask, Kevin's answers
- Result: exhaustive problem understanding

#### Phase 2: Planning Mode
- Claude writes the plan document
- Why Opus for planning (deeper reasoning)
- Example: The JP master plan

#### Phase 3: Handoff (`/handoff`)
- Breaking large plans into smaller agent-sized tasks
- `/docs` folder for plans (not committed)
- Example: JP plan broken into tasks (containment systems, visitor center, etc.)

#### Phase 4: Plan Review (`/plan-review`)
- Clear context, fresh session
- CRITICAL/HIGH/MEDIUM/LOW findings
- Confidence levels (>90% = autosolve)
- One-at-a-time finding resolution
- Example: JP plan review findings ("CRITICAL: No contingency for power failure")

#### Phase 5: Best Idea (`/best-idea`)
- When uncertain about a finding
- Claude researches alternatives, challenges assumptions
- ~20% of time finds better solution
- Example: Debating fencing approaches

#### Phase 6: Improve Idea (`/improve-idea`)
- Simplify, optimize, strengthen, "wild ideas"
- Turns B+ plan into A- plan
- Example: "What if we used moats instead of fences?"

#### Phase 7: Implementation (`/start-implementation`)
- Clear context
- Orchestrator assigns to sub-agents
- Parallel where possible, sequential where dependent
- Commits per task
- Example: Building the park in parallel

#### Phase 8: Code Review (`/code-review`)
- Review commits from implementation
- One-at-a-time polish
- Example: "The raptor pen has 3 critical issues..."

#### Phase 9: Completion
- Update GOAL.md or submit PR
- Ready for next plan

### 5. Supporting Infrastructure
- `/docs` folder for plans (not committed, keeps context)
- Worktrees + GOAL.md for multi-plan projects
- Strategic context clearing (fresh perspective between phases)

### 6. Key Takeaways
- Front-load thinking, trust the output
- Plans should be exhaustive enough to hand off
- Review phases catch issues before they become bugs
- The process scales to any complexity

---

## Jurassic Park Example - Story Arc

### Narrative Frame (Decided)
- **Perspective**: Third-person observer watching Hammond + Claude
- **Hammond's arc**: Starts overconfident ("spared no expense"), realizes gaps through process, becomes collaborative
- **JP knowledge**: Assume everyone's seen the movie. References land without explanation.
- **Structure**: Highlight reel through key phases, with interludes for functional phases

### The Setup
John Hammond has the movie's original plan. He's confident. He's "spared no expense." He just needs Claude to tighten things up before announcing to investors.

**Hammond's opening prompt:**
> "I've attached the full park documentation: containment systems, tour design, staffing, and operations. We've spared no expense on planning. Just need a fresh set of eyes before we announce to investors. Ask me questions one at a time until we're ready to finalize the implementation plan."

### Discussion Phase Q&A (3 Beats - Hammond brings expertise)

**Beat 1 - Vision (confident)**: Entertainment goal, stepping into another world

**Beat 2 - Hammond brings Malcolm's concerns**:
- Claude asks about contingencies for animal behavior
- Hammond relays Malcolm's "life finds a way" concern about lysine dependency
- Claude: "Has anyone tested what happens if they find alternative lysine sources?"
- Hammond: "...I assumed Wu's team had validated that."

**Beat 3 - Hammond brings Muldoon's observations**:
- Claude asks about raptor containment
- Hammond shares Muldoon's concerns: raptors test fences systematically, mapping weaknesses
- Claude: "Has containment been updated based on his observations?"
- Hammond: "His recommendations have been 'under review.'"

Then ellipsis: "The discussion continued for another forty-five minutes, covering power redundancy, veterinary facilities, guest evacuation routes, and why one IT employee had access to every critical system."

### Plan Review: Three Resolution Types + Breeding Finding

**Findings include:**
- Power systems (CRITICAL)
- IT access / Nedry (CRITICAL)
- Raptor containment (HIGH - needs best-idea)
- Guest evacuation (HIGH)
- Tour vehicles (HIGH)
- Viewing areas (MEDIUM)
- No ethologist (MEDIUM)
- **Breeding controls / lysine dependency (MEDIUM)** - pays off Malcolm's "life finds a way"

**Three resolution examples:**
1. **Claude right**: Tour vehicle manual override. Hammond agrees.
2. **Hammond corrects Claude**: T-Rex viewing. Claude recommends underground bunkers. Hammond: "The whole point is feeling the ground shake." Compromise: elevated platforms with rapid-descent emergency exits.
3. **Best-idea needed**: Raptor containment at 72% confidence. Hammond invokes: `/best-idea What about a moat system with randomized feeding? Muldoon mentioned they hate water.`

### Best Idea: Raptor Containment Research

Claude researches and discovers:
- Raptors test fences systematically and remember weak points
- Pack hunting with coordinated strategies
- Learn from observation (watching handlers)

**Option 4 (NEW)**: Multi-layer containment with behavioral countermeasures
- Randomized feeding locations/schedules (can't learn patterns)
- Double-airlock entry (no direct access ever)
- "They're testing you as much as you're containing them"

**"Clever girl" moment:**
> Hammond: "Clever girl" isn't a compliment, is it?
> Claude: It's a warning.

### Improve Idea: Three Categories

**Strengthen (zoo professional insights):**
- Puzzle feeders for raptors (mental stimulation reduces escape motivation)
- Environmental enrichment for predator paddocks
- Randomized patrol routes (predictable = exploitable)

**Wild ideas:**
- Real-time dinosaur tracker app ("She's 200 meters away...")
- Brachiosaurus treehouse suites (wake up with a dinosaur eating from your balcony)

**Hammond**: "We've genuinely spared no expense now."

### Code Review Payoff (Two findings - typical + systemic)

**Finding 1 - Syntax/Type (typical catch):**
```
File: security/access-control.ts:89
Problem: Type assertion without validation
Fix: Add runtime validation before assertion
```

**Finding 2 - Systemic (the payoff):**
```
Pattern: Single point of failure in critical systems staffing

Problem: Implementation relies on one systems engineer (Nedry)
with complete access. Salary data shows compensation 15% below
market rate. This was flagged in plan-review (role-based access)
but implementation left Nedry's existing access unchanged.

Fix: Retention package + salary adjustment, hire second engineer

Implementation note: The fences don't matter if the person
controlling them has a better offer.
```

**Final exchange:**
> Hammond: And now?
> Claude: Now we open six months later than originally planned. But we open.
> Hammond: [reflection line - TBD after draft]

---

## Selected JP Moments

### From the Movie (selected during planning)
- Power outage during storm (single system failure)
- Nedry shuts down security (single employee controls everything)
- Tour vehicles stuck on tracks
- Raptors can open doors
- Raptors test fences systematically
- Feeding raptors with a crane
- "Clever girl" (pack hunting underestimated)
- Goat feeding as attraction
- Nedry is the entire IT department
- "Spared no expense" but unlimited tokens upfront
- No safety video, just Mr. DNA
- All female population / life finds a way
- Frog DNA fills gaps
- "We control everything" (Wu's confidence)
- Dinosaurs as attractions, not wildlife

### Zoo Professional "DUH" Moments (inspired by TikTok)
- Raptors need puzzle feeders, not crane drops (mental stimulation)
- T-Rex enclosure is barren (environmental enrichment)
- Feeding schedules are predictable (they learned the routine)
- Zero ethologists studying behavior
- Viewing areas should be elevated
- No escape protocols / bunkers for guests
- Social groupings ignored for raptors
- Climate control for different geological eras

---

## Visual/Interactive Elements

### TL;DR Section (Top of Post)
- Workflow diagram: Discussion → Plan → Review → Best-idea → Improve → Implement → Code-review
- One-sentence summary of each phase
- Prominent download link for skill files

### Collapsible Full Prompts
- Each phase gets collapsible with full prompt (plan-review, best-idea, improve-idea, code-review)
- Readers can see exactly what Kevin uses

### Phase Labels
- Each JP dialogue section tagged (e.g., [PHASE: DISCUSSION])
- Helps readers map narrative to workflow

### "What Breaks" Sections
- Visually delimited within Kevin callouts
- Shows failure mode when phase is skipped

### Collapsible Sections
- Each command (e.g., `/plan-review`) can expand to show the actual prompt
- JP examples can expand for full detail
- Keep main flow scannable

### Memes (placed strategically)
- "Life finds a way" - Discussion phase (Hammond quoting Malcolm)
- "Clever girl" - Best-idea reveal (Hammond's realization moment)
- "Spared no expense" - Hammond's opening AND after wild ideas callback
- "Hold onto your butts" - Before implementation phase
- Newman - Optional, if something fails during implementation

### "Try This" Callouts
- Actual prompts readers can copy
- Example: "Ask me questions one at a time until you're ready to write a plan"

---

## Technical Implementation

### Page Structure
- New route: `/blog/claude-workflow` or `/workflow`
- Matches portfolio styling (terminal theme)
- Mobile responsive

### Components Needed
1. [x] `CollapsiblePrompt` - expand/collapse for prompt details (native details/summary)
2. [x] `ChatMessage` - Hammond/Claude dialogue with avatar positioning
3. [x] `Finding` - plan review findings with severity badges (critical/high/medium/low)
4. [x] `KevinCallout` - narrator commentary with "What breaks" warning section
5. [x] `PhaseLabel` - sticky phase indicator using Badge component
6. [x] `TimeSkip` - faded ellipsis moments for narrative flow
7. [ ] `WorkflowDiagram` - visual flow for TL;DR section (could be SVG or component)
8. [ ] `MemeImage` - styled JP meme placements (optional)

### Content Format
- MDX for rich content with components
- Or: React components with content inline
- Decision needed: pure MDX vs component-driven

---

## Files

| File | Purpose |
|------|---------|
| `GOAL.md` | This file - vision, decisions, status tracking |
| `CONTENT-PLAN.md` | Detailed content outline with JP dialogue |
| `DRAFT.md` | Full blog post draft (~2,400 words) |
| `../bright-percolating-acorn/` | Implementation plan with task files |
| `../bright-percolating-acorn/progress.md` | Implementation progress tracker |

### Implementation Files (created)
| File | Purpose |
|------|---------|
| `src/app/my-claude-code-workflow/page.tsx` | Page route with renderBlock |
| `src/lib/workflow-content.ts` | Content types and placeholder data |
| `src/components/workflow/ChatMessage.tsx` | Dialogue component |
| `src/components/workflow/Finding.tsx` | Severity-coded findings |
| `src/components/workflow/KevinCallout.tsx` | Narrator commentary |
| `src/components/workflow/TimeSkip.tsx` | Narrative ellipsis |
| `src/components/workflow/PhaseLabel.tsx` | Sticky phase labels |
| `src/components/workflow/CollapsiblePrompt.tsx` | Expandable prompts |

---

## Reference Material

The actual command prompts and skill definitions are in `./docs/workflow/`:
- `commands/` - All slash commands (`plan-review.md`, `best-idea.md`, `code-review.md`, etc.)
- `skills/` - Skill definitions (`expert-skill-creator/`, `frontend-design/`)
- `hooks/` - The `bullet-summary.py` hook (not core workflow, but mentioned)

Use these for accurate command descriptions, but the blog content should be the JP example - no real music-minion examples.

---

## Implementation Steps

### Phase 1: Planning (COMPLETE)
1. [x] Initial vision and structure (this doc)
2. [x] Planning session conversation
3. [x] Content plan written (`CONTENT-PLAN.md`)
4. [x] Tasks distributed (`../claude-workflow-blog-tasks/`)

### Phase 2: Review (COMPLETE)
5. [x] Plan review of content plan
6. [x] Improve-idea review

### Phase 3: Content Writing (COMPLETE)
7. [x] Write full draft (`DRAFT.md`)
   - TL;DR section with workflow table
   - Intro section
   - Scene setup + discussion phase (3 beats + Malcolm/Muldoon expertise)
   - Preparing for execution interlude
   - Plan-review phase (including breeding controls finding)
   - Findings resolution (3 examples)
   - Best-idea phase (Hammond invokes with hypothesis)
   - Improve-idea phase (wild ideas)
   - Implementation interlude
   - Code-review phase (syntax + Nedry systemic risk)
   - Outro with meta reveal

### Phase 4: Technical Implementation (IN PROGRESS)
8. [x] Create page route (`/my-claude-code-workflow`)
9. [x] Implement core components:
   - [x] ChatMessage (Hammond/Claude dialogue with avatars)
   - [x] Finding (severity-coded plan review findings)
   - [x] KevinCallout (narrator commentary with "What breaks" section)
   - [x] TimeSkip (faded ellipsis moments)
   - [x] PhaseLabel (sticky phase indicator using Badge)
   - [x] CollapsiblePrompt (expandable prompt sections)
   - [x] ContentBlock type system (discriminated union for all block types)
   - [x] renderBlock function (exhaustive type-safe renderer)
10. [ ] Wire up content from DRAFT.md into workflow-content.ts
11. [ ] Fill in collapsible prompt content for each phase

### Phase 5: Polish
12. [ ] Finalize Hammond reflection line
13. [ ] Add session count to meta reveal
14. [ ] Add memes and visual elements
15. [ ] Implement WorkflowDiagram (TL;DR section)
16. [ ] Responsive testing
17. [ ] Final review and ship

---

## Decisions Made

### Content Decisions (Planning Session)

1. **Narrative frame**: Third-person observer watching Hammond + Claude
2. **Hammond's voice**: Mix of oblivious optimist → realizes gaps. Starts overconfident, becomes collaborative.
3. **JP knowledge assumption**: Everyone's seen the movie. References land without explanation.
4. **Phase depth**: Highlight reel for key phases (Discussion, Plan-review, Best-idea, Improve-idea, Code-review), interludes for functional phases (Handoff, Implementation)
5. **Three discussion outcomes**: Claude right, Hammond corrects, best-idea needed
6. **Hammond corrections**: Based on vision/experience, not fake expertise. "The whole point is feeling the ground shake."
7. **Mind fusion theme**: Collaborative, not supervisory. Neither writes the plan alone.
8. **Intro hook**: Bold claim ("Claude writes all my code") + meta hook (this post was written with the workflow)
9. **Outro**: Back to reality + callback to opening + meta reveal about session count

### Quote Placements

| Quote | Location | Who |
|-------|----------|-----|
| "Spared no expense" | Hammond's opening | Hammond |
| "Life finds a way" | Discussion phase - Hammond relays Malcolm's concern | Hammond (quoting Malcolm) |
| "Clever girl" | Best-idea reveal | Hammond (realization) |
| "Hold onto your butts" | Before implementation | Section header or Kevin callout |
| "Shoulders of geniuses" | TBD - kept for potential use | Claude (subtle) |
| Final "spared no expense" | After wild ideas | Hammond |

### Kevin Callouts (7 total, each with "What breaks" section)

1. After Scene Opens: "That last line is the seed of everything..." + what breaks without it
2. After Discussion: "This is the point. Hammond isn't getting lectured..." + what breaks
3. After Plan-review findings: "Notice the confidence levels..." + what breaks
4. After Hammond corrects Claude: "This is the fusion..." + what breaks
5. After best-idea finds Option 4: "Hammond's moat instinct was partially right..." + what breaks
6. After wild ideas: "The wild ideas aren't always practical..." + what breaks
7. Outro: Meta reveal about writing this post

### Technical Decisions

1. **URL structure**: `/my-claude-code-workflow` - direct and personal
2. **Content approach**: Components (not MDX) - already in progress
3. **Meme selection**: TBD during implementation
4. **Writing style**: Reference `docs/kevins-writing-style.md` for Kevin's voice

### Plan Review Decisions (This Session)

1. **Narrative-tutorial tension**: Reduced "gotcha" beats from 5 to 3, added Hammond-brings-expertise beats (Malcolm, Muldoon)
2. **Real-world examples**: Not needed - JP narrative stays pure, philosophy is the point, downloadable files deliver implementation
3. **Confidence percentages**: Are real workflow - add explanation in Kevin callout
4. **Best-idea invocation**: Hammond invokes `/best-idea` with his hypothesis ("what about a moat system?")
5. **"Life finds a way"**: Moved to Discussion phase - Hammond relays Malcolm's concern
6. **Removed quote**: "Pirates don't eat the tourists" - no natural home
7. **Kept quote**: "Shoulders of geniuses" - may find placement later

### Improve-Idea Decisions (This Session)

1. **TL;DR section**: Add at top with workflow diagram + prominent download link
2. **Downloadable files**: Make prominent in intro ("Want to skip the story? Download the skills")
3. **Merged interludes**: Planning Mode + Handoff → "Preparing for Execution"
4. **Code-review section**: Keep with both syntax/type example AND Nedry organizational risk
5. **Kevin callout after Scene Opens**: Highlight "ask questions one at a time" as the seed
6. **Breeding controls finding**: Added to plan-review to pay off Malcolm's "life finds a way"
7. **Collapsible prompts**: Full prompt for each phase (plan-review, best-idea, improve-idea, code-review)
8. **"What breaks" sections**: Added to all Kevin callouts, visually delimited
9. **Phase labels**: Added to JP dialogue sections (e.g., [PHASE: DISCUSSION])
10. **Hammond reflection line**: Add placeholder, revisit after draft
11. **Interlude depth**: Evaluate during implementation (brief vs expanded)
12. **Forward momentum hook**: Skipped - no sequel teaser

---

## Success Criteria

- [ ] Coworkers can understand and replicate the workflow
- [ ] JP example is memorable and entertaining
- [ ] Each phase has clear "why" explanation
- [ ] Interactive elements enhance, don't distract
- [ ] Mobile-friendly
- [ ] Loads fast (optimize images)
