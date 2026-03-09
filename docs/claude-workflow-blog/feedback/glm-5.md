# Review: Claude Code Workflow Blog Post

## First Impression (Post-Skim)

**What pulled me in:** The TL;DR table. I immediately understood the workflow and could decide if I wanted to keep reading.

**What I wanted to skip:** The Introduction section. It felt like throat-clearing before the real content. The dinosaur hook could start earlier.

**Gut reaction:** This is better than I expected. The JP framing is self-aware enough to not feel cringe. The workflow is concrete enough to replicate. I'm skeptical of "AI writes my code" posts, but this one seems to have actual substance.

---

## Style

### Voice consistency: Strong overall

The Kevin sections read as authentic engineer voice. Direct, practical, not selling anything. The JP sections maintain a distinct narrator tone that doesn't bleed into the instructional content.

### Issue: Some sentences cluster in the same rhythm

**Quote:**
> "Hammond's original plan would have worked perfectly, assuming nothing went wrong. This workflow exists because things go wrong, and the best time to find that out is before you've written a single line of code."

Three medium-length sentences with similar structure. The second could be punchier.

**Suggestion:**
> "Hammond's original plan would have worked perfectly, assuming nothing went wrong. But things go wrong. This workflow exists to find that out before you've written a single line of code."

### Issue: A few em-dash-like constructions

You said no em-dashes, but I spotted a few places that read like you're using them:

**Quote:**
> "the best time to find that out is before you've written a single line of code"

This is fine (no em-dash), but watch for sentences that naturally want them.

### Win: The best lines

These are quotable and shareable:

- "life, uh, finds a way... of punishing you later"
- "The fences don't matter if the person controlling them has a better offer"
- "Your containment staff are being studied"
- "Bored apex predators find their own entertainment. Give them problems to solve that aren't 'how do I get out.'"

---

## Layout

### The TL;DR table: Excellent

This is the right call. Skeptical readers can immediately see if there's substance here. I'd add one thing: a rough time estimate per phase. "How long does this actually take?" is the first question engineers will have.

**Suggestion:** Add a column or note like "Typical time: 5-15 min discussion, 10-20 min planning, etc."

### Introduction: Cut or merge

**Quote:**
> "This post took [X] sessions using the exact workflow I'm about to describe. If you want to skip the story and start using this yourself, grab the skill files above. But if you want to understand why each phase exists, keep reading."

This is fine, but the paragraph before it is filler. The "I could walk you through each phase with bullet points. Instead, let's talk about dinosaurs." transition should happen earlier.

**Suggestion:** Cut the first paragraph of the Introduction. Start with the session count line, then go straight to "Instead, let's talk about dinosaurs."

### Phase lengths: One section drags

**Discussion phase** is the longest, and it's mostly dialogue. The concept (ask questions one at a time) is simple. Does it need this much demo?

The dialogue does show *how* Claude asks questions, but the section runs long. Consider trimming 2-3 exchanges.

**Plan Review** and **Best Idea** sections are well-paced. They show the value without belaboring.

**Implementation** is intentionally brief, which works. It's a pass-through phase; no need to dwell.

### Collapsible prompts: Good call

Putting full prompts in `<details>` sections keeps the main narrative moving while providing the actual material for people who want it.

---

## Readability

### Scannability: Strong

The structure makes it easy to jump around:
- Phase markers
- Kevin sections marked with `[KEVIN]`
- Tables and bullet points where appropriate

### One dense paragraph

**Quote:**
> "Plan-review surfaces findings, and Claude gives options in tiers (usually simple to complex, or safe to aggressive). Its recommendations are reasonable given what it knows. But it doesn't know everything. It might suggest skipping a feature to reduce complexity, but I know users have been asking for it for months. Or it recommends the robust solution when I just need something working by Friday. This happens constantly. Claude optimizes for what it can see. You fill in what it can't."

This is four ideas in one paragraph. The concept is important but gets buried.

**Suggestion:** Break it up:
> "Plan-review surfaces findings, and Claude gives options in tiers. Usually simple to complex, or safe to aggressive. Its recommendations are reasonable given what it knows.
>
> But it doesn't know everything.
>
> It might suggest skipping a feature to reduce complexity, but I know users have been asking for it for months. Or it recommends the robust solution when I just need something working by Friday.
>
> Claude optimizes for what it can see. You fill in what it can't."

### Missing context: Slash commands

**Quote:**
> "I run: `/handoff`"

A skeptical reader will ask: "Is this a built-in command? A custom prompt? How do I get it?"

You mention skill files at the end, but an earlier nod would help. Something like:

> "I run `/handoff` (a custom command defined in the skill files)"

Or add a brief parenthetical when slash commands first appear.

---

## Teachability

### Can someone replicate this? Mostly yes.

The workflow phases are clear. The concrete commands help. The dialogue examples show what "questions one at a time" looks like in practice.

### Missing pieces:

**1. What is "plan mode"?**

You reference switching to "plan mode" but never explain it. Is this:
- A Claude Code built-in feature?
- A conceptual shift in your prompting?
- Something defined in a skill file?

**Quote:**
> "Once Claude runs out of questions, I switch to plan mode."

I need to know what this means to replicate it.

**2. When is this overkill?**

You've shown a substantial workflow. But is this for every feature? Every PR? Or just significant changes?

A skeptic will think: "This looks like a lot of process. Do I really need all this to add a button to a form?"

**Suggestion:** Add a brief "When to use this" section, or a sentence in the outro: "For small changes, I might skip straight to implementation. For anything that touches multiple files or systems, this workflow pays for itself."

**3. Time investment**

Related to above: How long does this take in practice? If Discussion + Plan + Review adds 30 minutes before I write code, is that worth it?

Give readers a sense of the tradeoff.

**4. The handoff mechanics**

**Quote:**
> "This creates a folder in `docs/`, splitting up the plan into task files scoped for smaller agents"

How? What's in these task files? A quick example would ground this.

---

## Humor

### Does the JP framing land? Yes, more than I expected.

The key is that you're not forcing dinosaurs into every paragraph. The JP sections are clearly marked and optional. The Kevin sections stand alone.

The self-awareness helps:
> "If you don't like fun, there's a 'no-dinos' toggle just for you."

> "(No-dinos version: By the way, if you skipped the dinosaurs because you were 'too busy,' the fun version is still there when you're ready to live a little.)"

These acknowledge the gimmick without being defensive about it.

### Best uses of humor:

- The raptor containment section is genuinely informative *and* entertaining. The "Your containment staff are being studied" line is perfect.
- "Recommend starting with a big red ball" for T-Rex enrichment
- "Only two reported cases of compys inflicting life-threatening injuries" as the closer for that stretch idea

### One miss:

**Quote:**
> "Dr. Sattler approved. Gift shop sells bags for home gardens."

This felt like it was trying too hard. The joke (dino dung as souvenir) is thin.

**Suggestion:** Cut or simplify to just "Educational value. Gift shop opportunity."

---

## Specific Questions

### 1. Does the TL;DR table give enough context?

Yes, but it would benefit from time estimates. Engineers want to know the cost before committing.

### 2. Is the transition between Kevin and JP sections jarring?

No. The `[KEVIN]` and `[PHASE]` markers handle it well. I never felt lost about whose voice I was reading.

### 3. Are any JP sections too long?

Discussion phase runs long. The dialogue shows the concept well, but you could lose 2-3 exchanges without losing the point.

### 4. Do Kevin sections teach the workflow clearly?

Almost. Missing: what "plan mode" is, when to use this workflow vs. skip it, time investment.

### 5. Does the outro land?

Mostly. The "Hammond's original plan would have worked perfectly..." line is a strong closer. But the paragraph before it (about mind fusion and pattern recognition) feels like it's still explaining the thesis. I'd cut that and let the Hammond line stand as the closer.

**Current outro:**
> "Claude sees patterns across millions of codebases. You see the user who's been asking for that feature for six months. Neither perspective is complete. The workflow exists to collide them.
> 
> The hours of upfront discussion feel slow. Turns out, they pay back in code that doesn't need to be rewritten.
> 
> Hammond's original plan would have worked perfectly, assuming nothing went wrong..."

**Suggested outro:**
> "Claude sees patterns across millions of codebases. You see the user who's been asking for that feature for six months. The workflow exists to collide them.
> 
> Hammond's original plan would have worked perfectly, assuming nothing went wrong. This workflow exists because things go wrong, and the best time to find that out is before you've written a single line of code."

Tighter. The "code that doesn't need to be rewritten" line is implied by the Hammond closer.

### 6. Any sections that feel redundant?

The Introduction and "The Scene Opens" overlap. Both set up the premise. Merge or cut one.

### 7. Any confusing parts that required re-read?

"Plan mode" reference. The handoff command mechanics. Both need a sentence more explanation.

---

## Summary

This is a strong post. The workflow is real and useful, not AI hype. The JP framing is entertaining without being distracting. The Kevin voice is authentic.

**Top 3 improvements:**

1. **Add "when to use this" and time estimates.** Skeptical engineers need to know the cost.

2. **Explain slash commands and plan mode earlier.** One sentence each would ground readers.

3. **Trim the Discussion phase dialogue.** It runs long; 2-3 fewer exchanges would sharpen it.

The core thesis comes through: plans are the product, and investing in planning before code pays off. The JP metaphor supports this without overwhelming it.