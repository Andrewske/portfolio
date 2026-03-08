# My Claude Code Workflow

## TL;DR

**The workflow in one line:** Discussion → Plan → Review → Best-idea → Improve → Implement → Code-review

If you just want the skills, [download them here] and start using them today. The rest of this post explains why each phase exists and what breaks when you skip it.

| Phase | What happens | Why it matters |
|-------|--------------|----------------|
| Discussion | Claude asks questions one at a time until ready to plan | Forces decisions upfront instead of assumptions |
| Plan | Claude writes exhaustive implementation plan (Opus) | The plan becomes the artifact you'll review and execute |
| Handoff | Break large plans into agent-sized task files | Parallel execution, clear dependencies |
| Plan-review | Fresh context reviews plan for gaps | Catches issues before they become bugs |
| Best-idea | Research alternatives when uncertain | Finds Option D when you're stuck on A, B, C |
| Improve-idea | Simplify, strengthen, "wouldn't it be cool if" | B+ plans become A- plans |
| Implement | Sub-agents execute in parallel | Trust the plan, context-switch to other work |
| Code-review | Fresh context reviews commits | Catches what slipped through |

---

## Introduction

Claude writes all of my code. Claude writes almost everything for me, including this post. But I don't give Claude blind control. I've built a specific process to fuse my mind with Claude's to create reliable plans and output.

This post took [X] sessions using the exact workflow I'm about to describe. If you want to skip the story and start using this yourself, grab the skill files above. But if you want to understand why each phase exists, keep reading.

I could walk you through each phase with bullet points. But that would be boring, and you'd close the tab.

So instead, let's talk about dinosaurs.

---

## The Scene Opens

John Hammond has a vision. He's spent years bringing dinosaurs back to life, and now he needs a plan to open the park to the public. He's confident. He's "spared no expense." He just needs Claude to tighten things up.

Hammond's opening prompt:

> I've attached the full park documentation: containment systems, tour design, staffing, and operations. We've spared no expense on planning. Just need a fresh set of eyes before we announce to investors. Ask me questions one at a time until we're ready to finalize the implementation plan.

---

**[KEVIN]**

That last line is the seed of everything. "Ask me questions one at a time until you're ready to write a plan." This isn't a special system prompt. It's just how I end my first message. Claude stops trying to solve immediately and starts trying to understand.

**What breaks without it:** Claude writes a confident, well-structured plan based on assumptions. You ship it. The assumptions were wrong.

---

## Phase 1: Discussion

[PHASE: DISCUSSION]

Hammond has shared his documentation. Containment systems, tour design, staffing plans, the investor deck. Claude has read everything.

---

**Claude:**

I've reviewed the documentation. Strong vision, and the technical specs are more detailed than most projects I see at this stage. Before I write the implementation plan, I need to clarify a few things.

First question: What's the core guest experience you're optimizing for?

I see three possible framings in your materials:

1. **Educational** - The investor deck emphasizes "real science" and "witnessing evolution." This suggests longer exhibit times, interpretive signage, maybe guided tours with paleontologists.

2. **Spectacle** - The tour route prioritizes dramatic reveals. The T-Rex paddock is positioned for maximum impact on approach. This suggests you're optimizing for awe over information.

3. **Adventure** - Some of your containment language implies controlled danger as a feature. "Experience creatures that ruled the earth." This is a different safety calculus.

These lead to different design tradeoffs throughout the plan. A spectacle-first park can tolerate longer queues if the payoff is dramatic. An adventure-first park needs more robust safety infrastructure because proximity is the point. Which framing should I prioritize when decisions conflict?

**Hammond:**

Spectacle, absolutely. I want a child to look up at a Brachiosaurus and forget that extinction was ever a thing. The science is impeccable - we have real paleontologists on the advisory board, Wu's team has published papers - but that's credibility, not the product. Wonder is what they're paying for.

The adventure angle is interesting though. We've talked about premium experiences - smaller groups, closer access. But that's phase two. For launch, it's about the reveal. That first moment when they see something that shouldn't exist.

---

**Claude:**

That's helpful. Spectacle as primary driver, scientific credibility as supporting context, adventure experiences as a future expansion. I'll structure the plan around dramatic impact for launch, with infrastructure that doesn't preclude closer-access experiences later.

This clarifies a few things in your tour design. The vehicle pacing makes sense now - you're controlling the reveal timing, not just moving people through efficiently.

Next question: Your containment specs show electric fencing as the primary barrier across all paddocks, with voltage varying by species. The documentation references "backup power" but I couldn't find specifics. I need to understand the failure mode.

Options I'm seeing:

1. **Dedicated backup per paddock** - Each enclosure has independent power. A failure is localized.

2. **Zone-based backup** - Groups of paddocks share backup systems. A failure affects a section.

3. **Centralized backup** - The whole island shares one backup system. A failure affects everything simultaneously.

Your maintenance docs suggest centralized infrastructure, which would be option 3. Can you confirm? This significantly affects the risk profile.

**Hammond:**

Option 3. We went with unified infrastructure - one main grid, diesel generators for backup. Simpler to maintain, fewer points of failure in normal operation. And we've tested the generators extensively. They've never failed.

I know what you're thinking. What if both fail? But that would require the main power AND the backup to go down simultaneously. The odds of that are astronomical.

---

**Claude:**

I understand the reasoning. Unified systems are simpler and the failure probability for any single component is low.

The risk I'm flagging isn't component failure - it's correlated failure. A tropical storm that damages the main power line could also flood the generator building, since both are presumably in the operations center. That's not two independent failures; it's one event with two consequences.

I'll note this as a risk in the plan. We may want to discuss adding a third independent system for critical containment, separate from the main grid entirely. But that's a decision for later.

Moving on. Your staffing documentation mentions Robert Muldoon as game warden with a note that says "ongoing containment concerns - see appendix." There's no appendix attached.

Based on his role and the note, I'm guessing his concerns fall into one of these categories:

1. **Physical containment** - Fence heights, barrier materials, structural issues
2. **Behavioral unpredictability** - Animals not behaving as models predict
3. **Staffing/protocol gaps** - Not enough people, wrong procedures, inadequate training
4. **Some combination**

What specifically does Muldoon think is wrong? This affects how I structure the containment sections.

**Hammond:**

Robert thinks we underestimate the velociraptors. Specifically. He doesn't have concerns about the Brachiosaurus or the Triceratops - they're large, predictable, manageable.

The raptors are different. He watches them. He says they test the fences systematically - same sections, same times, every day. He thinks they're mapping weaknesses. He also says they watch the handlers during feeding. Not just tracking the food. Watching the process. Learning.

His recommendation is essentially "rebuild the entire paddock with triple-redundant barriers and never let humans enter under any circumstances." Which would cost more than the rest of the park combined.

---

**Claude:**

That's significant. Daily systematic testing of specific fence sections is problem-solving behavior. If Muldoon's observations are accurate - and he's the only one with direct field experience - your containment design is based on assumptions that don't match reality.

Let me be specific about what this changes:

1. **Current assumption:** Raptors are physical threats contained by physical barriers. Build strong enough walls, problem solved.

2. **Muldoon's observation:** Raptors are cognitive threats that test containment systematically. They're not trying to break through - they're looking for weaknesses. This requires different engineering.

I don't have enough information to propose solutions yet. But I need to flag this now: if he's right, your raptor paddock may be fundamentally misconceived, not just undersized.

Has anyone independently validated his observations? Security footage? Behavioral assessments from outside experts?

**Hammond:**

He's the only one who works with them directly. The security footage... I haven't reviewed it myself. His reports go to operations.

**Claude:**

I'd recommend pulling that footage before we finalize the plan. If it confirms systematic testing, raptor containment becomes a critical issue.

One more area before I draft the plan. Your breeding documentation mentions lysine dependency as the primary population control - all animals engineered to require supplemented lysine that only you provide. Clean solution on paper.

Dr. Malcolm is listed as a consultant with a note: "Concerns re: biological adaptation - see meeting notes 3/15." Those notes aren't attached either.

Based on his background in chaos theory, I'm guessing his concern is something like: "You've engineered a dependency, but biological systems find workarounds. Have you tested whether workarounds exist?"

Is that the shape of it?

**Hammond:**

That's exactly it. Ian keeps saying "life finds a way." He thinks the lysine dependency is exactly the kind of assumption that breaks first. We engineered them to need supplements, but we haven't tested whether the island's ecosystem provides alternatives. The local vegetation, insects, anything they might eat that contains lysine.

I assumed Wu's team had validated that. But when I asked him directly... he said the engineering is sound. Which isn't the same as saying he tested the environment.

---

**Claude:**

So the status is: the genetic engineering is validated, but the ecosystem interaction is not. Two different questions.

This goes in the plan as a risk. The fix is straightforward - conduct an ecosystem audit for lysine sources - but until it's done, the breeding control is theoretical, not proven.

I have enough to draft the plan. Several items will need deeper review:

- Power redundancy (single point of failure)
- Raptor containment (may be fundamentally misconceived)
- Lysine validation (untested assumption)
- Muldoon's full observations (need security footage)

Anything else I should know before I write this up?

**Hammond:**

I think that covers the major concerns.

**Claude:**

Ready for the plan.

---

**[KEVIN]**

This is the point. Hammond didn't lie about anything. Single backup system, Muldoon's concerns on hold, untested lysine assumption. It was all there. He just never connected the dots until someone asked the right sequence of questions.

Notice how Hammond brings the expertise. He knows what Muldoon observed. He knows what Malcolm said. Claude's job is to ask the questions that connect those observations to concrete gaps.

**What breaks without it:** Claude writes a confident plan based on "backup generators" and "breeding controls" without learning what those actually mean in practice. You ship documentation built on assumptions nobody examined.

---

## Preparing for Execution

[PHASE: PLAN + HANDOFF]

Once discussion is complete, Claude writes the plan. I use Opus for planning because it thinks deeper and catches more edge cases. The plan becomes the artifact we'll review, improve, and eventually implement.

For larger plans, I break them into smaller agent-sized tasks. Each task gets its own file with context, dependencies, and success criteria. This enables parallel execution later.

<details>
<summary>Full planning prompt</summary>

[Collapsible content: planning prompt goes here]

</details>

---

## Phase 2: Plan Review

[PHASE: PLAN-REVIEW]

Fresh context. I clear the conversation and have Claude review the plan with new eyes.

---

## Plan Review: Jurassic Park Implementation Plan

### Summary

Ambitious vision with solid containment specs and clear guest experience priorities. The main risks are infrastructure interdependencies: unified power systems and concentrated IT access create correlated failure modes. Additionally, raptor containment appears to be designed for physical threats rather than cognitive ones, which may be a fundamental mismatch given Muldoon's field observations.

---

### Findings

#### CRITICAL (Blocks Implementation)

**1. Single Point of Failure: Power Systems**
- **Problem:** Main power grid and diesel backup share infrastructure. A tropical storm that damages primary power could simultaneously flood the generator building.
- **Impact:** All electric fencing fails simultaneously across every paddock. No containment during the exact conditions (storm) when animals are most stressed.
- **Recommendation:** Add third independent power system for critical containment, physically separated from operations center.
- **Alternatives:**
  - Option A: Underground backup generator with separate fuel supply — expensive but eliminates correlated failure
  - Option B: Battery backup for fences only (4-hour capacity) — cheaper, buys evacuation time but not full operations

**2. Single Point of Failure: IT Access**
- **Problem:** One employee (Nedry) holds system-wide credentials across security, containment, communications, and life support.
- **Impact:** Disgruntled employee, compromised account, or simple human error could disable all systems simultaneously.
- **Recommendation:** Role-based access with separation of duties. No single credential controls both containment and security.
- **Alternatives:**
  - Option A: Split into three roles (containment, security, communications) with two-person authorization for system-wide changes
  - Option B: Keep unified role but add real-time audit logging with automatic alerts on bulk changes

---

#### HIGH (Significant Risk)

**3. Raptor Containment Designed for Wrong Threat Model**
- **Problem:** Current containment (12-foot fences, standard feeding) treats raptors as physical threats. Muldoon's observations suggest cognitive threats: systematic testing, pattern learning, coordinated behavior.
- **Impact:** Fence height becomes irrelevant if they're probing for weaknesses, not trying to jump. Containment may be fundamentally misconceived.
- **Recommendation:** Needs deeper evaluation. Muldoon's observations should drive containment redesign.
- **Alternatives:**
  - Option A: Increase physical barriers (higher fences, added moat) — addresses symptoms, not cause
  - Option B: Add behavioral countermeasures (randomized feeding, multiple barrier types, elevated-only access) — addresses cognitive threat
  - Option C: Commission full behavioral assessment before finalizing containment design

**4. No Guest Evacuation Protocol**
- **Problem:** Documentation mentions "return to visitor center" with no specifics. Single evacuation point, no intermediate safe zones.
- **Impact:** Guests stranded during containment breach with no nearby shelter.
- **Recommendation:** Zone-based bunker system with independent communications.
- **Alternatives:**
  - Option A: Bunkers every 500m along tour route — high safety, high cost
  - Option B: Designated "hard points" at key locations only — lower cost, requires clear signage and guest education

**5. Tour Vehicles Locked to Track**
- **Problem:** Electric track system prevents vehicles from leaving path. No manual override if power fails.
- **Impact:** Guests trapped adjacent to predator paddocks during power failure — the same power failure that disables fences.
- **Recommendation:** Manual override capability with automatic unlock on power loss.
- **Alternatives:**
  - Option A: Full manual capability (guests can drive away) — requires vehicle training
  - Option B: Auto-unlock only, vehicles coast to designated safe zones — simpler, less guest agency

---

#### MEDIUM (Should Address)

**6. Viewing Areas at Ground Level**
- **Problem:** T-Rex and raptor paddocks have ground-level viewing platforms.
- **Impact:** Guests within reach if barrier fails. Reduces margin of error.
- **Recommendation:** Elevated platforms for all predator viewing.
- **Alternatives:**
  - Option A: Fully elevated (20+ feet) — maximum safety, less immersive
  - Option B: Elevated with open-air design — maintains spectacle while adding safety margin

**7. No Ethologist on Staff**
- **Problem:** Veterinary staff monitor physical health. No one monitoring behavioral patterns.
- **Impact:** Warning signs of stress, escape planning, or social breakdown go unnoticed until incident.
- **Recommendation:** Hire behavioral specialist with authority to flag concerns.

**8. Breeding Controls Assume No Adaptation**
- **Problem:** Lysine dependency is validated genetically but not ecologically. No testing whether island ecosystem provides alternative lysine sources.
- **Impact:** If animals adapt, breeding becomes uncontrolled. "Life finds a way."
- **Recommendation:** Ecosystem audit before opening. Backup sterilization protocol if lysine dependency fails.

---

### What the Plan Gets Right

- Spectacle-first guest experience with clear priority hierarchy
- Tour route designed for dramatic reveals and pacing control
- Veterinary facilities appropriately scaled for population
- Species separation prevents predator-prey stress
- Visitor center positioned for emergency centralization

---

### Questions Requiring Clarification

1. Has Muldoon's security footage been reviewed? His observations drive several findings.
2. What's Nedry's compensation relative to market rate? Concentrated access + underpayment = flight risk.
3. Are the raptors being treated as a pack or individuals? Social structure affects containment requirements.

---

Ready to walk through findings. Say "go" to start one-at-a-time review.

---

**[KEVIN]**

This is what drops into my context after a fresh session reviews the plan. No memory of the discussion that created it. Just the document and a critical eye.

**What breaks without it:** You ship Claude's first draft. Edge cases hit production. You fix them reactively instead of catching them in review.

---

## Findings Resolution

[PHASE: PLAN-REVIEW continued]

**Hammond:** Go.

---

**Claude:**

### Finding 1: Power Systems (CRITICAL)

I'm recommending **Option A: Underground backup generator with separate fuel supply.**

Here's my reasoning:

- Option B (battery backup) buys evacuation time but doesn't restore operations. If a storm lasts 12 hours, you're still down after 4.
- The cost difference matters less than it appears. Underground installation protects against the exact failure mode we're solving for — correlated damage from severe weather.
- This also creates redundancy for other critical systems, not just fences.

Confidence: 94%. The only variable is whether underground construction is feasible given the island's geology, but that's a solvable engineering problem.

Should I implement this recommendation, or do you want to discuss?

**Hammond:** Agreed. That's exactly right.

**Claude:** Implementing. Moving to Finding 2.

---

### Finding 2: IT Access (CRITICAL)

I'm recommending **Option A: Split into three roles with two-person authorization for system-wide changes.**

Reasoning:

- Option B (audit logging) catches problems after they happen. Doesn't prevent a determined actor.
- Three-role separation means no single person can disable both containment AND security. Even if someone goes rogue, they can only affect one system.
- Two-person authorization for bulk changes adds friction that deters both malice and accidents.

Confidence: 91%. Standard practice for critical infrastructure.

**Hammond:** Agreed.

**Claude:** Implementing. Findings 4 and 5 are also above 90% confidence — I'll implement those automatically:

- Finding 4 (Evacuation): Zone-based bunker system, Option A
- Finding 5 (Tour Vehicles): Auto-unlock on power loss, Option B

These are noted in the plan. Review if you want, but they're straightforward.

Moving to Finding 6 — this one needs discussion.

---

### Finding 6: Viewing Areas (MEDIUM)

I'm recommending **Option A: Fully elevated platforms, 20+ feet.**

Reasoning:

- Maximum safety margin
- Eliminates ground-level failure mode entirely
- Still provides dramatic views

Confidence: 88%.

**Hammond:** No. Option B. Elevated with open-air design.

The whole point is feeling the ground shake when the T-Rex walks. You can't experience that through twenty feet of steel scaffolding. We need elevation for safety, yes, but the experience has to stay visceral. Open air, close enough to feel it.

This is what people are paying for. Not a zoo. Not a museum. An experience. They need to feel small. They need to feel the air move when she breathes. If we over-engineer the safety, we kill the product.

**Claude:** Understood. Spectacle as primary driver — we established this in discussion, and I should have weighted it higher here.

I can design elevated platforms with open-air viewing that maintain the visceral experience while adding safety margin. One option: rapid-descent emergency exits built into the platforms. Guests get the immersive experience during normal operation, but can drop to bunker level in under 30 seconds if containment fails. Safety infrastructure exists but stays invisible until needed.

**Hammond:** That's exactly the kind of solution I'm looking for. Safety that doesn't compromise the experience.

**Claude:** Updating the plan. Moving to Finding 3 — Raptor Containment.

---

**[KEVIN]**

This is the fusion. Claude optimized for the obvious metric (safety), but Hammond knows what actually matters for the experience. Neither answer alone was right. The rapid-descent compromise came from the collision of both perspectives.

**What breaks without it:** Claude optimizes for the obvious metric. You ship bunkers nobody wants because you let Claude decide what mattered.

---

### Finding 3: Raptor Containment (HIGH)

**Option 1: Increase physical barriers**
- Add height (15-foot fences), add moat, reinforce existing structure
- Pro: Straightforward engineering, addresses known escape vectors
- Con: Assumes raptors are physical threats. Muldoon's observations suggest cognitive threats — they're not trying to overpower barriers, they're probing for weaknesses.

**Option 2: Behavioral countermeasures**
- Randomized feeding schedules/locations, multiple independent barrier types, elevated-only human access
- Pro: Addresses the cognitive dimension — can't learn patterns if patterns don't exist
- Con: More complex operations, requires staff training, doesn't solve raw containment strength

**Option 3: Commission full behavioral assessment first**
- Bring in external ethologists, review Muldoon's footage, study pack dynamics before finalizing design
- Pro: We'd actually understand what we're containing
- Con: Delays implementation, may surface problems we don't have solutions for

**Recommended:** Option 2 (72% confidence) — behavioral countermeasures address the threat model Muldoon describes. But confidence is low because I don't have hard data on raptor capabilities. How high can they jump? Can they climb? How coordinated is pack behavior? Without this, I'm designing blind.

Implement behavioral countermeasures now, commission assessment first, or something else?

**Hammond:**

/best-idea What about a moat system combined with randomized feeding?

Muldoon mentioned they hate water — he's seen them avoid the drainage channels even when chasing prey. And your point about unpredictability is interesting. If they're testing our patterns, we shouldn't have patterns.

I don't know if a moat alone is enough, or if randomization actually works against pack hunters.

---

## Phase 3: Best Idea

[PHASE: BEST-IDEA]

Best-idea is for when neither of us knows the answer. I invoke it with my hypothesis, and Claude evaluates my idea against alternatives with deeper research. Sometimes my instinct is right. Sometimes Claude finds something better.

---

## Best-Idea Evaluation: Raptor Containment

### Research Summary

After reviewing paleontological behavior studies, modern apex predator containment standards, and Muldoon's incident reports:

**Key findings about Velociraptors:**

1. **Problem-solving intelligence comparable to primates.** They don't just react — they experiment. The systematic fence testing Muldoon observed is consistent with cognitive mapping behavior seen in great apes.

2. **Can jump 10+ feet vertically from standing.** 12-foot fences provide less than 2 feet of margin. 15-foot fences aren't much better.

3. **Test barriers systematically and remember weak points.** This isn't random probing. They return to the same sections because they're tracking results over time.

4. **Pack hunters with coordinated attack strategies.** The "clever girl" problem — while you're watching one, another is flanking. This applies to escape attempts, not just hunting.

5. **Learn from observation.** Muldoon's reports note they watch handlers during feeding. They're not just tracking food. They're studying process.

**Current plan gap:** Treats raptors as physical threats requiring physical barriers. Doesn't account for cognitive capabilities. This is a fundamental mismatch.

---

### Hammond's Hypothesis Evaluated

**Moat system + randomized feeding**

The instinct is partially right:
- Moats provide physical barrier that works without power
- Randomization prevents pattern learning
- Water aversion is real (confirmed in Muldoon's reports)

But incomplete:
- Moat alone doesn't address climbing or jumping
- Randomized feeding doesn't help if they're also learning handler schedules, patrol routes, gate procedures
- Single barrier of any type is insufficient for cognitive threats

---

### Revised Options

**Option 1: Higher fences (15-foot)**
- Insufficient. Can jump 10+ feet and they're climbers.
- They'll test every inch and find weaknesses.
- Addresses wrong threat model.

**Option 2: Electrified mesh ceiling**
- Better physical containment.
- But single failure point — power loss means standard fence only.
- Still doesn't address cognitive dimension.

**Option 3: Moat system (Hammond's hypothesis)**
- Physical barrier works without power.
- Water aversion confirmed.
- But doesn't address climbing, jumping, or pack coordination.

**Option 4 (NEW): Multi-layer containment with behavioral countermeasures**
- Outer fence: 24-foot, angled inward at top
- Inner fence: Separate power system from main grid
- Moat between fences: Physical barrier, always present, leverages water aversion
- Randomized feeding: Locations AND schedules vary, can't learn patterns
- Randomized patrol routes: Same principle — predictable security is exploitable security
- Elevated-only viewing: They're watching you too
- Double-airlock entry: No direct human access to enclosure, ever

The key insight isn't height or voltage. It's that **they're testing you as much as you're containing them.** Unpredictability and redundancy matter more than any single barrier strength.

---

### Recommendation

**Option 4** (87% confidence)

Hammond's moat instinct was right — water aversion is real and provides power-independent containment. But it needs to be part of a layered system, not the primary barrier.

The randomization insight is the real breakthrough. If they can't learn your patterns, they can't exploit them. This applies to everything: feeding, patrols, access procedures, even maintenance schedules.

---

**Hammond:** They remember weak points? They watch handlers?

**Claude:**

Muldoon's incident reports mention they return to the same fence sections repeatedly. They're not testing randomly — they're running experiments. And yes, during feeding, he's observed them tracking handler movements rather than just the food.

The implication: your containment staff are being studied. Every routine they follow is data the raptors are collecting.

**Hammond:** "Clever girl" isn't a compliment, is it?

**Claude:** It's a warning.

---

**[KEVIN]**

Hammond's moat instinct was partially right. Water as a barrier. But best-idea found what he couldn't: the cognitive dimension. About 20% of the time, best-idea finds something that wasn't in any of the original options. That's the value. Not just picking from A, B, C, but realizing we needed Option D.

**What breaks without it:** You pick from A, B, or C when Option D existed. You ship a good solution instead of the right one.

---

<details>
<summary>Full best-idea prompt</summary>

[Collapsible content: best-idea prompt goes here]

</details>

---

## Phase 4: Improve Idea

[PHASE: IMPROVE-IDEA]

Once the plan is solid, I run improve-idea. This looks for ways to simplify, strengthen, and asks "wouldn't it be cool if..." It's where B+ plans become A- plans.

---

## Idea Improvement: Jurassic Park Implementation Plan

---

### 1. Simplify

**1. Consolidate monitoring dashboards**
Three separate systems (containment, security, veterinary) with no integration. Merge into unified operations view with role-based filtering.
Complexity: Med

**2. Single "lockdown" command**
Currently requires per-paddock activation during emergency. One command triggers all containment protocols simultaneously.
Complexity: Low

**3. Standardize herbivore feeding equipment**
Three different systems across paddocks for no clear reason. Pick one, reduce training and maintenance burden.
Complexity: Low

---

### 2. Strengthen

**4. Puzzle feeders for raptors**
Mental stimulation reduces escape motivation. Bored apex predators find their own entertainment — usually testing boundaries. Give them problems to solve that aren't "how do I get out."
Complexity: Med

**5. Environmental enrichment for T-Rex paddock**
Currently barren. One goat on a chain isn't enrichment. Varied terrain, hunting simulations, environmental complexity. A stimulated animal is a less desperate animal.
Complexity: Med

**6. Randomized patrol routes**
Same principle as randomized feeding. If raptors can learn handler patterns, they can learn security patterns. Predictable = exploitable.
Complexity: Low

---

### 3. Stretch

**7. "Wouldn't it be cool if..." — Real-time dinosaur tracker app**
Guests see where every dinosaur is on their phone. Get notifications when T-Rex approaches their zone. Builds anticipation: "She's 200 meters away and moving toward the fence." Also functions as early warning during incidents.
Complexity: High

**8. "Wouldn't it be cool if..." — Brachiosaurus treehouse suites**
Hotel rooms built into artificial trees at feeding height. Wake up with a Brachiosaurus eating leaves from your balcony. Premium experience, genuine "living with dinosaurs" feeling. Herbivores only. Height provides inherent safety margin.
Complexity: High

---

### Top 3 Recommendations

1. **#4 - Puzzle feeders for raptors** — Directly addresses cognitive threat model from best-idea. Reduces escape motivation at the source.

2. **#6 - Randomized patrol routes** — Low effort, high impact. Extends unpredictability principle beyond feeding.

3. **#2 - Single lockdown command** — Emergency response shouldn't require multiple manual steps. Critical safety improvement.

---

### If I could only implement one: #4 (Puzzle feeders)

The raptor containment redesign addresses barriers. This addresses motivation. An engaged, mentally stimulated animal has less reason to escape. It's the difference between building a better prison and making them not want to leave.

---

**Hammond:** /one-at-a-time

---

**Claude:**

Categorizing suggestions:

**Autosolve (≥90%):** 3 suggestions
- #2: Single lockdown command (94%)
- #3: Standardize herbivore feeding (92%)
- #6: Randomized patrol routes (91%)

**Discussion (<90%):** 5 suggestions

Starting with discussion findings, highest value first.

---

### Finding #4: Puzzle feeders for raptors

**Option 1: Implement puzzle feeders now**
- Pro: Directly addresses cognitive threat model, reduces escape motivation at source
- Con: Requires custom fabrication, adds keeper training

**Option 2: Skip enrichment, rely on containment**
- Pro: Simpler operations, containment redesign should be sufficient
- Con: Treats symptoms not cause — contained but still motivated to escape

**Option 3: Basic enrichment only (varied feeding locations)**
- Pro: Low effort, captures some benefit
- Con: Half-measure, doesn't provide real cognitive engagement

**Recommended:** Option 1 (87% confidence) — The raptor containment redesign addresses barriers. This addresses motivation. An engaged, mentally stimulated animal has less reason to escape. It's the difference between building a better prison and making them not want to leave.

Implement full puzzle feeders, skip enrichment, or basic only?

**Hammond:** Option 1. Muldoon's been asking for this. He says a bored raptor is a dangerous raptor.

**Claude:** Implementing. Moving to Finding #5.

---

**Hammond:** Let's skip ahead to the wild ideas. What's the confidence on the treehouse suites?

**Claude:** 78%. High guest appeal, but infrastructure complexity is significant. The artificial trees need to support both structural load and Brachiosaurus feeding behavior. It's feasible, but not a launch feature.

**Hammond:** Add the infrastructure planning to current scope. Guest rooms come phase two.

**Claude:** Noted. Same approach for the tracker app — backend now, guest-facing later?

**Hammond:** Yes. We've genuinely spared no expense now.

---

**[KEVIN]**

The wild ideas aren't always practical, but sometimes they're exactly what the project needs. The treehouse suites aren't about safety. They're about making something people actually want. That's the kind of thinking the workflow creates space for.

**What breaks without it:** You ship B+ when A- was one brainstorm away. You miss the treehouse suites.

---

<details>
<summary>Full improve-idea prompt</summary>

[Collapsible content: improve-idea prompt goes here]

</details>

---

## Implementation

[PHASE: IMPLEMENTATION]

Clear context again. Fresh session, orchestrator breaks the plan into parallel workstreams, sub-agents execute. I can kick this off and context-switch to other projects. The plan is solid enough that I trust the output.

The park is built in parallel: containment systems, visitor infrastructure, animal habitats, emergency protocols. Each team works from the same reviewed plan. No one is making assumptions because the assumptions got challenged three phases ago.

Hold onto your butts.

---

## Phase 5: Code Review

[PHASE: CODE-REVIEW]

After implementation, I run code-review on the commits. Fresh context. One finding at a time. This catches what slipped through — both small syntax issues and bigger systemic risks.

---

## Code Review: Jurassic Park Implementation

### Finding 1 (MEDIUM)

**File:** security/access-control.ts:89

**Problem:** Type assertion without validation

```typescript
const level = accessLevel as SecurityClearance
```

**Why this matters:** Runtime type mismatch if accessLevel comes from external source. The access control system accepts input from badge scanners — if a malformed scan returns unexpected data, this assertion fails silently.

**Fix:** Add runtime validation before assertion.

---

### Finding 2 (CRITICAL)

**Pattern:** Single point of failure in critical systems staffing

**Problem:** Implementation added role-based access as specified, but left existing credentials unchanged. Nedry still has system-wide access. His permissions predate the new security model.

Additionally: compensation data shows Nedry at 15% below market rate for his role. Combined with concentrated access, this is a flight risk with catastrophic potential.

**Why this matters:** This was flagged in plan-review — role-based access with separation of duties. The new system is correctly designed. But legacy access wasn't revoked. The plan said "no single credential controls both containment and security." Nedry's credential still does.

**Fix options:**
1. Immediate: Retention package + salary adjustment to market rate
2. Medium-term: Hire second systems engineer, implement credential handoff
3. Both (recommended)

**Implementation note:** The fences don't matter if the person controlling them has a better offer.

---

**Hammond:** The implementation missed it.

**Claude:** The implementation followed the plan correctly for new credentials. But the plan didn't explicitly say "revoke existing legacy access." It assumed that was implied.

This is why code-review exists. The plan was right. The implementation was right. But "add new system" and "migrate existing users to new system" are different tasks, and only one was specified.

**Hammond:** So we caught it.

**Claude:** Before it mattered. That's the point.

**Hammond:** And now?

**Claude:** Now we open six months later than originally planned. But we open.

---

**[KEVIN]**

Code review catches the gap between what the plan said and what got built. The role-based access was implemented correctly. But nobody revoked Nedry's legacy credentials because the plan didn't say to. The assumption was implied, not explicit.

This is why fresh context matters. The agent that implemented the security system knew the intent. A fresh reviewer just sees: "Plan says no single credential controls both systems. Nedry's credential controls both systems."

**What breaks without it:** You ship the assumption. Nedry walks out with embryos three months later.

---

<details>
<summary>Full code-review prompt</summary>

[Collapsible content: code-review prompt goes here]

</details>

---

## Outro

That's the workflow. Discussion, plan, review, best-idea, improve, implement, code-review. Each phase exists because I've learned what breaks when you skip it.

This post took [X] sessions using this exact process. The Jurassic Park example started as "I need a memorable way to explain the workflow." Through discussion, it became Hammond specifically, because his confidence-to-disaster arc mirrors what happens when you let AI write code without the planning phases.

Hammond's original plan would have worked perfectly. Assuming nothing went wrong. The workflow exists because things go wrong, and the best time to find out is before you've written a single line of code.

If you want to try this yourself, start here: "Ask me questions one at a time until you're ready to write a plan."

Then actually answer the questions. That's where the magic happens.

---

## Download the Skills

[Download links for skill files]

- plan-review.md
- best-idea.md
- improve-idea.md
- code-review.md
- start-implementation.md
