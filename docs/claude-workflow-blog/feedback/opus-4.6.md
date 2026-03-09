# Review: Claude Code Workflow Blog Post (DRAFT-2)

## First Impression (Gut Reaction)

The TL;DR table up top earned trust immediately. The JP concept is strong and I didn't expect it to work as well as it does. The plan-review section is the star of the post; it's where the skeptic in me went "okay, this is actually a real process."

**What I wanted to skip:** The "Scene Opens" section. Hammond's first prompt felt like setup I had to sit through before the real content started.

**What pulled me in:** The moment Claude flags Nedry's credentials. That's when the JP framing stops being cute and starts being *illustrative*. The plan-review findings read like a real code review, and that's the whole point clicking into place.

**Quotable moments:**
- "Skip this step and life, uh, finds a way... of punishing you later."
- "Predictable security is exploitable security."
- "The fences don't matter if the person controlling them has a better offer."
- "One-shotting isn't the ceiling. It's the floor."

---

## 1. Style

**Voice is mostly consistent**, but there's a gear-grinding shift between "Kevin the practitioner" and "Kevin the narrator."

> Hammond's opening prompt:
> "I've attached the full park documentation: containment systems, tour design, staffing, and operations. We've spared no expense on planning. Just need a fresh set of eyes before we announce to investors."

This is fine, but there's no transition *into* the fiction. One sentence you're talking about plan mode, the next we're in a theme park. The first Kevin section does the heavy lifting of explaining the methodology; then "The Scene Opens" just... opens. A single sentence bridge would help: something like "Let's see what that looks like."

**Sentence variety is good in Kevin sections, repetitive in JP sections.** The Claude dialogue tends toward a pattern: state problem, list options, recommend. That's realistic (it's how Claude actually responds), but by the third finding it reads like a template. Consider trimming one of the medium-priority findings to keep pacing tight.

**One voice inconsistency:**

> Claude writes all of my code. Claude writes almost everything for me, including this post.

Then later:

> you're not just using Claude. You're combining what you know with what Claude knows.

The intro oversells ("Claude writes all of my code") and the outro corrects to the real thesis ("combination"). A skeptical engineer reads that intro, rolls their eyes, and might not make it to the nuanced version. Suggest softening the intro:

> Claude writes most of my code. But not because I paste in a prompt and hit enter.

---

## 2. Layout

**The pacing sags in the middle.** Discussion → Plan → Plan-Review is a long stretch before the reader sees anything surprising. The plan-review *findings* are great, but getting there takes a while.

**Specific structural notes:**

- **The "Preparing for Execution" section** between Discussion and Plan Review feels like a bridge to nowhere. It restates what Kevin already explained and the collapsible prompt is empty. Cut it to two sentences and fold it into the Kevin interlude before Plan Review.

- **Best-idea and Improve-idea are perfectly paced.** They're the right length, they show real value, and Hammond's reactions are natural. Don't touch these.

- **Implementation section is too short relative to its importance.** You spend hundreds of words on raptor containment but implementation gets one paragraph and "hold onto your butts." That's probably intentional (the point is the plan does the work), but a skeptical reader will think "he skipped the hard part." Even two sentences about what parallel execution *actually looks like* in practice would help.

- **Code Review Nedry callback is perfect.** The fact that the same issue surfaces again after implementation is the single best argument for the workflow in the entire post.

**Section length check:**
| Section | Verdict |
|---------|---------|
| TL;DR + Intro | ✅ Right length |
| Scene Opens | ⚠️ Trim by ~30% |
| Discussion | ✅ Good |
| Preparing for Execution | ❌ Cut or fold in |
| Plan Review | ⚠️ Slightly long; cut one medium finding |
| Best-idea | ✅ Perfect |
| Improve-idea | ✅ Perfect |
| Implementation | ⚠️ Too thin |
| Code Review | ✅ Great |
| Outro | ⚠️ See below |

---

## 3. Readability

**Scannability is strong.** The phase markers, bold findings, and Kevin sections as breakpoints all work. Someone skimming will get the structure even if they read nothing else.

**Information density issues:**

> Once Claude runs out of questions, I switch to plan mode. Instead of accepting the plan to begin implementation I run: `/handoff`

This is doing a lot of work in very few words. A reader who hasn't used Claude Code doesn't know what "plan mode" means, what "accepting the plan" means mechanically, or what `/handoff` produces. You don't need to explain Claude Code's UI, but one more sentence of context would help:

> Once Claude runs out of questions, I switch to plan mode so it writes a structured implementation plan. Instead of jumping straight to code, I run `/handoff`, which splits the plan into task files scoped for smaller, faster agents.

**The handoff concept is introduced but never shown.** You mention task files, dependencies, and a README, but we never see one. The JP framing could easily include a quick example: "Task 1: Raptor containment upgrade. Dependencies: behavioral assessment (Task 3). Success criteria: multi-layer system passes review."

**Jargon check:**
- "Opus" and "Sonnet" are mentioned without context. Not everyone knows these are Claude model tiers. One parenthetical: "Opus (Claude's strongest model)" would fix it.
- "Context bleed" in the implementation section. Unclear to non-AI-workflow readers.
- "Clear context" appears multiple times. Worth one explanation of why fresh context matters the first time it comes up.

---

## 4. Teachability

**Could someone replicate this workflow after reading?** Almost. The *philosophy* comes through clearly. The *mechanics* are fuzzy in spots.

**What's clear:**
- The phase sequence and why each exists
- That human judgment corrects Claude's blind spots
- That fresh context for review catches what stale context misses
- The "ask questions one at a time" trick (this alone is worth the read)

**What's unclear:**
- **What triggers moving between phases?** Discussion → Plan happens "when Claude runs out of questions." But Plan → Plan-Review? Best-idea → Improve? The transitions feel vibes-based. A skeptical engineer wants criteria: "Move to plan-review when the plan covers X, Y, Z" or even "when it feels complete, which is usually after 10-15 questions in my experience."
- **When do you use best-idea vs. just deciding?** The trigger in the post is Hammond saying `/best-idea`, but when should a reader reach for this tool vs. just picking an option? A one-liner in the Kevin section would help: "I use this when confidence is below ~80%, or when I have a hunch there's an approach we haven't considered."
- **How long does this actually take?** Fill in that `[X] sessions` placeholder. It matters. If this post took 2 sessions, the workflow sounds lightweight. If it took 12, a reader needs to know that upfront.

**Missing content the reader will ask about:**
1. **What about small tasks?** Does every bug fix go through seven phases? Where's the threshold? Without this, the workflow sounds like overkill for anything under a full feature.
2. **What does failure look like?** You show the workflow working. What happens when you skip plan-review and regret it? A single concrete example would be more persuasive than any amount of "trust me."
3. **Cost.** Opus for planning, sub-agents for implementation. What does a typical workflow run cost? Engineers who control their own budgets will ask.

---

## 5. Humor

**The JP framing enhances more than it distracts.** It works because the parallels are real, not forced:
- Overconfident stakeholder who "spared no expense" → every PM ever
- Raptors testing fences → production users finding edge cases
- Nedry's credentials → that one dev who set up the infra and never documented it

**What lands:**
- The Nedry subplot is the MVP. It threads through discussion, plan-review, AND code-review, showing how issues resurface. Brilliant structural choice.
- "How dangerous could they be?" about the compys. Perfect deadpan.
- The "life finds a way" callback in the discussion section.

**What's slightly off:**

> *(If you don't like fun, there's a "no dinos" toggle just for you.)*

This reads as slightly defensive, like you're preemptively apologizing for the framing. A skeptical engineer reads this as "he knows this is indulgent." Try something more confident:

> *(There's a no-dinos version if you're in a hurry. But the dinos are better.)*

> "Dinosaur dung exhibit. Educational value. Dr. Sattler approved."

This one's purely a gag with no workflow parallel. It's the one moment the JP framing is just goofing around. Depending on your tolerance for that, keep it (it's funny) or cut it (it breaks the "every JP moment teaches something" pattern). I'd keep it. Posts that are relentlessly on-message are exhausting.

---

## Answers to Your Specific Questions

1. **TL;DR table?** Yes, it works. The one-liner above it is the real hook though. Consider bolding "Plans are the product" somewhere in that section since it's your core thesis and it's currently absent from the TL;DR.

2. **Kevin ↔ JP transitions?** Smooth after the first one. The first transition (intro → "Scene Opens") needs a bridge sentence. After that, the `[KEVIN]` markers do the job.

3. **JP sections too long?** "Scene Opens" and the Discussion example run slightly long. Best-idea and Improve-idea are perfect. Trim the setup, not the payoff.

4. **Kevin sections teach clearly enough?** Philosophy yes, mechanics no. Add: when to use each phase, rough time investment, and "what about small tasks?"

5. **Outro?** The first paragraph lands. "One-shotting isn't the ceiling. It's the floor" is strong. The Hammond callback is good. The no-dinos parenthetical at the very end is a weak closer; end on the "things go wrong" line instead. That's your real last beat.

6. **Redundant sections?** "Preparing for Execution" restates what Kevin already said. Fold it.

7. **Confusing parts?** "Clear context" needed re-reading the first time. The handoff concept is introduced but never shown concretely.

---

## Summary: Top 5 Changes by Impact

1. **Add "when to use this vs. skip it" guidance.** Without scale context, the workflow sounds like it's seven phases for every `console.log`.
2. **Trim "Scene Opens" and "Preparing for Execution."** Get to plan-review faster; that's where skeptics convert.
3. **Soften the intro claim, strengthen the outro thesis.** "Claude writes all my code" sets up the wrong expectation. "Plans are the product" is your real thesis; put it front and center.
4. **Define "clear context" and "Opus/Sonnet" on first use.** One sentence each. Removes the barrier for non-Claude-Code readers.
5. **Show one task file from `/handoff`.** Even a three-line example makes the concept concrete instead of abstract.

Good draft, Kevin. The Nedry throughline alone is worth publishing for.