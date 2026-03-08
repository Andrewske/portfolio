# Jurassic Park Content Plan

## Core Thesis

**"Plans are the product."** The heavy investment in planning, review, and iteration before touching code is what makes Claude write code you trust.

**Supporting theme:** "Mind fusion" - The workflow isn't Claude reviewing your work, it's collaborative. Neither writes the plan alone. Claude has breadth, you have vision and domain knowledge.

---

## Narrative Frame

- **Perspective**: Third-person observer watching Hammond + Claude
- **Hammond's arc**: Starts overconfident ("spared no expense"), realizes gaps through process, becomes collaborative
- **Tone**: Collaborative, not supervisory
- **JP knowledge**: Assume everyone's seen the movie. References land without explanation.

---

## Content Structure

### 0. TL;DR (Top of post)

**For scanners - immediate value:**
- Workflow diagram: Discussion → Plan → Review → Best-idea → Improve → Implement → Code-review
- One-sentence summary of each phase
- **Prominent download link:** "Grab the skill files and start using this today, or read the philosophy below."

---

### 1. INTRO

**Opening lines:**
> Claude writes all of my code. In fact Claude writes almost everything for me, including this post. However, I don't give Claude blind control. I've built a specific process to fuse my mind with Claude to create reliable plans and output.

**Setup:**
- Brief mention this post was written using the workflow (X sessions)
- Introduce the philosophy: "Ask me questions one at a time until you're ready to write a plan"
- **Downloadable files prominent:** "Want to skip the story? [Download the skills] and start using them."
- Transition to JP example: "Let me show you what this looks like..."

---

### 2. THE SCENE OPENS

**Setup paragraph:**
> John Hammond has a vision. He's spent years bringing dinosaurs back to life, and now he needs a plan to open the park to the public. He's confident. He's "spared no expense." He just needs Claude to tighten things up.

**Hammond's opening prompt:**
> "I've attached the full park documentation: containment systems, tour design, staffing, and operations. We've spared no expense on planning. Just need a fresh set of eyes before we announce to investors. Ask me questions one at a time until we're ready to finalize the implementation plan."

**[KEVIN CALLOUT]**
> That last line is the seed of everything. "Ask me questions one at a time until you're ready to write a plan." This isn't a special system prompt - it's just how I end my first message. Claude stops trying to solve immediately and starts trying to understand.
>
> **What breaks without it:** Claude writes a confident, well-structured plan based on assumptions. You ship it. The assumptions were wrong.

---

### 3. DISCUSSION PHASE [PHASE: DISCUSSION]

**Flow:** Organic Q&A. Hammond brings domain knowledge from his team; Claude asks clarifying questions.

**Beat 1 - Vision (Hammond confident)**
```
Claude: What's the primary goal for guests - education, scientific
wonder, or thrill-seeking entertainment?

Hammond: Entertainment, absolutely. We want people to feel like
they've stepped into another world. The science is real, but the
experience is what they're paying for.
```

**Beat 2 - Hammond brings Malcolm's concerns**
```
Claude: What contingencies exist if the animals don't behave as
your models predict?

Hammond: Funny you mention that. I was talking with Dr. Malcolm -
our chaos theoretician - and he keeps saying "life finds a way."
He's concerned our breeding controls aren't accounting for
biological adaptation.

Claude: What specifically worries him?

Hammond: The lysine dependency. We engineered them to die without
supplements we control. Malcolm thinks that's exactly the kind of
assumption that breaks first.

Claude: Has anyone tested what happens if they find alternative
lysine sources in the park ecosystem?

Hammond: ...I assumed Wu's team had validated that.
```

**Beat 3 - Hammond brings Muldoon's observations**
```
Claude: Tell me about the raptor containment. What's the current
approach?

Hammond: Standard high-security paddock. 12-foot fences, electric
perimeter. But honestly, Muldoon - our game warden - has concerns.
He says they're problem-solvers. They test the fences systematically.

Claude: How often do they test?

Hammond: Daily. Same sections. He thinks they're mapping weaknesses.

Claude: Has the containment design been updated based on his
observations?

Hammond: We... hired him after the paddock was built. His
recommendations have been "under review."
```

**[KEVIN CALLOUT]**
> This is the point. Hammond isn't getting lectured - he's bringing his team's expertise into the discussion. Malcolm's chaos theory, Muldoon's field observations. Claude asks the clarifying questions that connect these concerns to concrete gaps. The plan that comes out of this synthesizes everyone's knowledge.
>
> **What breaks without it:** You skip straight to planning. Claude makes reasonable assumptions. Half of them are wrong because Claude didn't know what Malcolm and Muldoon knew.

**Ellipsis transition:**
> The discussion continued for another forty-five minutes, covering power redundancy, veterinary facilities, guest evacuation routes, and why one IT employee had access to every critical system.

---

### 4. PREPARING FOR EXECUTION (Interlude) [PHASE: PLAN + HANDOFF]

**Quick explanation:**
> Once discussion is complete, Claude writes the plan. I use Opus for planning because it thinks deeper and catches more edge cases. The plan becomes the artifact we'll review, improve, and eventually implement.
>
> For larger plans, I break them into smaller agent-sized tasks. Each task gets its own file with context, dependencies, and success criteria.

**Brief JP beat:**
> Hammond: That was more questions than I expected.
>
> Claude: Your original plan would have worked perfectly. Assuming no power failures, no employee dissatisfaction, no tropical storms, and dinosaurs that behave exactly as predicted. Shall I write a plan that accounts for the universe we actually live in?
>
> Hammond: ...Please.

**[Collapsible: Full planning prompt]**

---

### 5. PLAN-REVIEW PHASE [PHASE: PLAN-REVIEW]

**Setup:**
> Fresh context. I clear the conversation and have Claude review the plan with new eyes. The findings come in severity levels: CRITICAL blocks implementation, HIGH is significant risk, MEDIUM should be addressed, LOW is polish.

**Full findings report:**
```
## Plan Review: Jurassic Park Implementation Plan

### CRITICAL (Blocks Implementation)

1. **Single point of failure: Power systems**
   - Current: One main power grid, diesel backup
   - Problem: Tropical storm + backup failure = all containment offline
   - Impact: Every electric fence fails simultaneously
   - Confidence: 95% - Recommending triple-redundant systems with
     auto-failover

2. **Single point of failure: IT access**
   - Current: One employee (Nedry) has system-wide credentials
   - Problem: Disgruntled employee or single compromised account =
     total system control
   - Impact: All security, containment, and communications
   - Confidence: 95% - Recommending role-based access with
     separation of duties

### HIGH (Significant Risk)

3. **Raptor containment underestimates capabilities**
   - Current: 12-foot fences, standard feeding protocols
   - Problem: Intelligence and physical capabilities not fully assessed
   - Impact: Current containment may be insufficient
   - Confidence: 72% - Need more research on raptor behavior
   - Recommendation: Triggering best-idea evaluation

4. **No guest evacuation protocol**
   - Current: "Return to visitor center" mentioned, no specifics
   - Problem: Single evacuation point, no intermediate safe zones
   - Impact: Guests stranded during containment breach
   - Confidence: 92% - Recommending zone-based bunker system

5. **Tour vehicles locked to track**
   - Current: Electric track system, vehicles cannot leave path
   - Problem: Vehicle occupants cannot escape if stopped near predator
   - Impact: Guests trapped adjacent to threats
   - Confidence: 94% - Recommending manual override capability

### MEDIUM (Should Address)

6. **Viewing areas at ground level**
   - Current: Several paddocks have ground-level viewing
   - Problem: Reduces barrier effectiveness, increases escape risk
   - Impact: Guests within reach if barrier fails
   - Confidence: 88% - Recommending elevated platforms

7. **No ethologist on staff**
   - Current: Veterinary staff only
   - Problem: No one monitoring behavioral changes
   - Impact: Warning signs of stress/escape planning missed
   - Confidence: 85% - Recommending behavioral specialist

8. **Breeding controls assume no adaptation**
   - Current: Lysine dependency - animals die without supplements
   - Problem: No validation that alternative lysine sources don't exist in park ecosystem
   - Impact: "Life finds a way" - if they adapt, breeding is uncontrolled
   - Confidence: 78% - Recommending ecosystem audit + backup sterilization
```

**[KEVIN CALLOUT]**
> Notice the confidence levels. These are part of the actual workflow - I instruct Claude to assign confidence to each finding. Anything above 90%, Claude handles automatically. Those auto-solves get noted, I can review if I want, but they don't need discussion. It's the 70-85% range where collaboration matters. Claude isn't sure, so we figure it out together.
>
> **What breaks without it:** You ship Claude's first draft. Edge cases hit production. You fix them reactively instead of catching them in review.

**[Collapsible: Full plan-review prompt]**

---

### 6. FINDINGS RESOLUTION (One at a Time) [PHASE: PLAN-REVIEW continued]

**Auto-solves (quick mention):**
> Findings 1, 2, 4, 5, and 6 resolved automatically. Triple-redundant power, role-based access, bunker system designed, vehicle manual overrides added, elevated viewing platforms specified.

**Discussion Item 1: Tour vehicles (Claude right)**
```
Claude: For Finding 5 (tour vehicles), I'm recommending Option 2:
Manual override capability with automatic unlock during power failure.

Option 1: Keep electric-only (rejected - trapped guests)
Option 2: Manual override + auto-unlock on power loss (recommended)
Option 3: Fully manual vehicles (rejected - loses tour synchronization)

Confidence: 94%. The auto-unlock is the key insight. If power fails,
vehicles should default to "escapable" not "locked."

Hammond: Agreed. That's exactly right. If the power goes out, the
last thing we want is guests locked in place.

Claude: Implementing Option 2.
```

**Discussion Item 2: Guest viewing experience (Hammond corrects Claude)**
```
Claude: For Finding 6 (viewing areas), I'm recommending Option 1:
Fully enclosed underground bunkers with reinforced glass for all
predator viewing.

Option 1: Underground bunkers (recommended - maximum safety)
Option 2: Elevated platforms (good safety, less immersive)
Option 3: Current ground-level with reinforced barriers (insufficient)

Confidence: 88%.

Hammond: No. Option 2. The whole point is feeling the ground shake
when the T-Rex walks. You can't experience that through six feet of
concrete. We need the elevated platform with open air. That's what
people are paying for.

Claude: Understood. I'll design elevated platforms with the experience
priority in mind. I can add rapid-descent emergency exits as a
compromise - guests get the open-air experience, but can drop to
bunker level in under 30 seconds if needed.

Hammond: Now that's the kind of solution I'm looking for.
```

**[KEVIN CALLOUT]**
> This is the fusion. Claude optimized for the obvious metric (safety), but Hammond knows what actually matters for the business. Neither answer alone was right. The rapid-descent compromise came from the collision of both perspectives.
>
> **What breaks without it:** Claude optimizes for the obvious metric. You ship bunkers nobody wants because you let Claude decide what mattered.

**Discussion Item 3: Raptor containment (needs best-idea)**
```
Claude: For Finding 3 (raptor containment), I'm at 72% confidence.
My options:

Option 1: Higher fences (15-foot, current recommendation)
Option 2: Electrified mesh ceiling over paddock
Option 3: Moat system addition

I don't have enough information about raptor capabilities to
recommend confidently.

Hammond: /best-idea What about a moat system with randomized
feeding? Muldoon mentioned they hate water, and if we can't
predict their testing patterns, maybe we shouldn't let them
predict ours.
```

---

### 7. BEST-IDEA PHASE [PHASE: BEST-IDEA]

**Setup:**
> Best-idea is for when neither of us knows the answer. I invoke it with my hypothesis - "what about X?" - and Claude evaluates my idea against alternatives with deep research. Sometimes my instinct is right. Sometimes Claude finds something better. Either way, the decision is backed by evidence.

**Research findings:**
```
## Best-Idea Evaluation: Raptor Containment

### Research Summary

After reviewing paleontological behavior studies and modern
apex predator containment standards:

**Key findings about Velociraptors:**
- Problem-solving intelligence comparable to primates
- Can jump 10+ feet vertically from standing
- Test barriers systematically and remember weak points
- Pack hunters with coordinated attack strategies
- Learn from observation (including watching handlers)

**Current plan gap:** Treats raptors as physical threats only.
Doesn't account for cognitive capabilities.

### Revised Options

Option 1: Higher fences (15-foot)
- Insufficient. Can jump 10+ feet and climb.
- They'll test every inch and find weaknesses.

Option 2: Electrified mesh ceiling
- Better, but single failure point.
- Power loss = standard fence only.

Option 3: Moat system addition
- Physical barrier remains without power.
- But: doesn't address climbing or intelligence.

**Option 4 (NEW): Multi-layer containment with behavioral countermeasures**
- Outer fence: 24-foot, angled inward at top
- Inner fence: Separate power system
- Moat between fences: Physical barrier, always present
- Randomized feeding locations and schedules (they can't learn patterns)
- Elevated-only viewing (they're watching you too)
- Double-airlock entry: No direct access ever

**Recommendation:** Option 4 (87% confidence)

The key insight wasn't height. It's that they're testing you
as much as you're containing them. Unpredictability and
redundancy matter more than any single barrier strength.
```

**Hammond's reaction:**
> Hammond: They remember weak points? They watch handlers?
>
> Claude: Muldoon's incident reports mention they test the same
> fence sections repeatedly. They're running experiments on you.
>
> Hammond: "Clever girl" isn't a compliment, is it?
>
> Claude: It's a warning.

**[KEVIN CALLOUT]**
> Hammond's moat instinct was partially right - water as a barrier. But best-idea found what he couldn't: the cognitive dimension. About 20% of the time, best-idea finds something that wasn't in any of the original options. That's the value. Not just picking from A, B, C, but realizing we needed Option D. I bring the hypothesis, Claude brings the research, and together we find the answer neither had alone.
>
> **What breaks without it:** You pick from A, B, or C when Option D existed. You ship a good solution instead of the right one.

**[Collapsible: Full best-idea prompt]**

---

### 8. IMPROVE-IDEA PHASE [PHASE: IMPROVE-IDEA]

**Setup:**
> Once the plan is solid, I run improve-idea. This looks for ways to simplify, strengthen, and asks "wouldn't it be cool if..." It's where B+ plans become A- plans.

**Categories:**

**Simplify:**
```
- Consolidate three separate monitoring systems into one dashboard
- Single "lockdown" command that triggers all containment protocols
```

**Strengthen (zoo professional insights):**
```
- Add puzzle feeders for raptors: Mental stimulation reduces escape
  motivation. Bored apex predators find their own entertainment.

- Environmental enrichment for all predator paddocks: Hunting
  simulations, varied terrain, environmental complexity. A stimulated
  animal is a less desperate animal.

- Randomized patrol routes for security: Same principle as feeding.
  Predictable = exploitable.
```

**Wild ideas:**
```
Claude: Two ideas that go beyond the current scope but could
differentiate the park:

1. Real-time dinosaur tracker app
   - Guests see where every dinosaur is, get alerts when T-Rex
     approaches their zone
   - Builds anticipation, also functions as early warning system
   - "She's 200 meters away and moving toward the fence"

2. Brachiosaurus treehouse suites
   - Hotel rooms built into artificial trees at feeding height
   - Wake up with a Brachiosaurus eating leaves from your balcony
   - Premium experience, genuine "living with dinosaurs" feeling
   - Herbivores only, obviously. Height provides inherent safety.

Hammond: ...I want to build both of those.

Claude: Should I add them to the plan?

Hammond: We've genuinely spared no expense now.
```

**[KEVIN CALLOUT]**
> The wild ideas aren't always practical, but sometimes they're exactly what the project needs. The treehouse suites aren't about safety. They're about making something people actually want. That's the kind of thinking the workflow creates space for.
>
> **What breaks without it:** You ship B+ when A- was one brainstorm away. You miss the treehouse suites.

**[Collapsible: Full improve-idea prompt]**

---

### 9. IMPLEMENTATION (Interlude) [PHASE: IMPLEMENTATION]

**Quick explanation:**
> Clear context again. Fresh session, orchestrator breaks the plan into parallel workstreams, sub-agents execute. I can kick this off and context-switch to other projects. The plan is solid enough that I trust the output.

**Brief JP beat:**
> The park is built in parallel: Containment systems, visitor infrastructure, animal habitats, emergency protocols. Each team works from the same reviewed plan. No one is making assumptions because the assumptions got challenged three phases ago.

"Hold onto your butts" placement here.

---

### 10. CODE-REVIEW PHASE [PHASE: CODE-REVIEW]

**Setup:**
> After implementation, I run code-review on the commits. Fresh context. One finding at a time. This catches what slipped through - both small syntax issues and bigger systemic risks.

**Finding 1 - Typical catch (syntax/type):**
```
## Code Review: Security Module

### Finding 1 (MEDIUM)
**File:** security/access-control.ts:89

**Problem:** Type assertion without validation
`const level = accessLevel as SecurityClearance`

**Why this matters:** Runtime type mismatch if accessLevel
comes from external source.

**Fix:** Add runtime validation before assertion.
```

**Finding 2 - Systemic catch (the payoff):**
```
## Code Review: Operations Staffing

### Finding 2 (CRITICAL)
**Pattern:** Single point of failure in critical systems staffing

**Problem:** Implementation relies on one systems engineer (Nedry)
with complete access to security, containment, and communications.
Salary data shows compensation 15% below market rate.

**Why this matters:** This was flagged in plan-review (role-based
access recommended). Implementation added role separation for
*new* hires but left Nedry's existing access unchanged. Bus factor
of 1 on all critical systems, with a flight risk.

**Fix options:**
1. Immediate: Retention package + salary adjustment
2. Medium-term: Hire second systems engineer, implement access
   handoff protocol
3. Both (recommended)

**Implementation note:** The fences don't matter if the person
controlling them has a better offer.
```

**[Collapsible: Full code-review prompt]**

**Hammond's final line:**
> Hammond: I'm starting to understand why the original park failed.
>
> Claude: The original park skipped planning and went straight to
> "we'll figure it out." You can't fix assumptions you never examined.
>
> Hammond: And now?
>
> Claude: Now we open six months later than originally planned.
> But we open.
>
> Hammond: [reflection line - TBD, revisit after draft]

---

### 11. OUTRO

**Transition back to reality:**
> That's the workflow. Discussion, plan, review, best-idea, improve, implement, code-review. Each phase exists because I've learned what breaks when you skip it.

**The meta reveal:**
> This post took [X] sessions using this exact process. The Jurassic Park example started as "I need a memorable way to explain the workflow." Through discussion, it became Hammond specifically, because his confidence-to-disaster arc mirrors what happens when you let AI write code without the planning phases.

**Callback:**
> Hammond's original plan would have worked perfectly. Assuming nothing went wrong. The workflow exists because things go wrong, and the best time to find out is before you've written a single line of code.

**Closing:**
> If you want to try this yourself, start here: "Ask me questions one at a time until you're ready to write a plan."
>
> Then actually answer the questions. That's where the magic happens.

---

## Quote Placements

| Quote | Location | Who says it |
|-------|----------|-------------|
| "Spared no expense" | Hammond's opening prompt | Hammond |
| "Life finds a way" | Discussion phase - Hammond relays Malcolm's concern | Hammond (quoting Malcolm) |
| "Hold onto your butts" | Before implementation phase | Kevin callout or section header |
| "Clever girl" | Best-idea research reveal | Hammond (realization) |
| "Shoulders of geniuses" | Plan-review critique of overconfidence | Claude (subtle) |

---

## Kevin Callout Inventory

Each callout includes a "What breaks without it" section, visually delimited.

1. **After Scene Opens** - "That last line is the seed of everything..." + what breaks
2. **After Discussion phase** - "This is the point. Hammond isn't getting lectured..." + what breaks
3. **After Plan-review findings** - "Notice the confidence levels..." + what breaks
4. **After Hammond corrects Claude** - "This is the fusion..." + what breaks
5. **After best-idea finds Option 4** - "Hammond's moat instinct was partially right..." + what breaks
6. **After wild ideas** - "The wild ideas aren't always practical..." + what breaks
7. **Outro** - The meta reveal about writing this post

---

## Interlude Sections (Non-JP explanation only)

**Note:** Depth TBD during implementation - start brief, expand if needed.

1. **Preparing for Execution** (merged Planning Mode + Handoff) - Opus for deeper thinking, plan becomes artifact, break into agent-sized tasks
2. **Implementation** - Parallel execution, sub-agents, can context-switch away

---

## Visual/Interactive Elements (Implementation Phase)

- **Collapsible full prompts** for each phase (plan-review, best-idea, improve-idea, code-review)
- Collapsible sections for longer code blocks
- Severity indicators on findings (color-coded)
- Workflow diagram showing phase progression with context-clear points
- **Phase labels** on each JP dialogue section (e.g., [PHASE: DISCUSSION])
- **"What breaks" sections** in Kevin callouts, visually delimited
- Meme placements TBD during implementation

---

## Open Questions

1. Exact meme selection and placement
2. How many sessions to mention in meta reveal (track during writing)
3. ~~MDX vs component-driven implementation~~ **DECIDED: Components (not MDX)**
4. Mobile styling considerations
5. Interlude section depth - evaluate during implementation (brief vs expanded)
