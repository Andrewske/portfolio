# Kevin Sections - All Commentary

## Intro
**Location:** Lines 22-30
**Status:** FINAL

> I could walk you through each phase with bullet points. Instead, let's talk about dinosaurs.
>
> *(If you don't like fun, there's a "no dinos" toggle just for you.)*

---

## Section 1: After Hammond's Opening Prompt
**Location:** Lines 44-49
**Status:** FINAL

> The common advice is "start in plan mode." Even the Claude Code team recommends it. But plan mode is still rushing toward a plan; it might ask a question or two, then it's off to the races.
>
> Instead I just write up what problem I am trying to solve and end it with:
>
> `Ask me questions one at a time until you're ready to write a plan.`
>
> No special prompt. Claude stops trying to solve immediately and starts asking questions. Once we've actually talked it through, then I drop into plan mode to write it up.
>
> Skip this step and life, uh, finds a way... of punishing you later.

---

## Section 2: After Discussion Phase Ends
**Location:** Lines 202-209
**Status:** FINAL

> Once Claude runs out of questions, I switch to plan mode. Instead of accepting the plan to begin implementation I run:
>
> `/handoff`
>
> This creates a folder in `docs/`, splitting up the plan into task files scoped for smaller agents like Sonnet *(faster, cheaper, and they don't need the whole picture)*, plus a README with the high-level view.
>
> [IMAGE: hold-on-to-your-butts.gif]

---

## Section 3: Post Plan-Review Intro
**Location:** Lines 229-236
**Status:** FINAL

> Once the planning documents have been created, I clear the context and run:
>
> `/plan-review docs/[plan-name]`
>
> This reviewer doesn't remember you talking yourself into "it'll probably be fine." It just sees the plan and asks: does this actually make sense?

---

## Section 4: After Plan-Review Complete (before Best-Idea)
**Location:** Lines 340-346
**Status:** DELETE (add meme to break things up)

[IMAGE: clever-girl.gif or there-it-is.gif]

---

## Section 5: After Plan-Review Findings Resolution (Viewing Platform)
**Location:** Lines 430-436
**Status:** FINAL

> Plan-review surfaces findings, and Claude gives options in tiers (usually simple to complex, or safe to aggressive). Its recommendations are reasonable given what it knows. But it doesn't know everything.
>
> It might suggest skipping a feature to reduce complexity, but I know users have been asking for it for months. Or it recommends the robust solution when I just need something working by Friday.
>
> This happens constantly. Claude optimizes for what it can see. You fill in what it can't.

---

## Section 6: Best-Idea
**Location:** Lines 570-576
**Status:** FINAL

> `/best-idea` is for when findings aren't clear, or you have an inkling there's a better way.
>
> Run the command with your half-formed thought. Claude does extra research and either confirms its recommendation or finds something it completely missed: a package that already solves it, a simpler structure, the thing you were overcomplicating.

---

## Section 7: Improve-Idea
**Location:** Lines 712-719
**Status:** FINAL

> `/improve-idea` asks three questions: What can we simplify? What should we strengthen? And "wouldn't it be cool if..."
>
> The wild ideas aren't always practical, but sometimes they're exactly what the project needs. They can also just be fun, and what takes a B plan to an A.

---

## Section 8: Implementation
**Location:** NEW (between improve-idea and code-review)
**Status:** FINAL

> Once the plan is solid, clear context and run `/start-implementation`. Sub-agents spin up in parallel, each working from its task file, no context bleed between them.
>
> This is where I context-switch to other work. The plan is tight enough to trust.

---

## Section 9: Code-Review
**Location:** Lines 802-812
**Status:** FINAL

> After implementation, clear context and run `/code-review`. It catches the gap between what the plan said and what got built.
>
> The agent that implemented knew the intent. A fresh reviewer just sees code. Most findings are syntax or type errors, but you'll be surprised how often it catches a wrong assumption or a cleaner way to do something.

---

## Section 10: Outro
**Location:** Lines 823-834
**Status:** FINAL

**Core (both versions):**

> That's the workflow. Discussion → plan → review → best-idea → improve → implement → code-review.
>
> Claude can one-shot most things. But one-shotting isn't the ceiling. It's the floor. When you take the time to discuss each piece, push back on recommendations, and review with fresh eyes, you're not just using Claude. You're combining what you know with what Claude knows.
>
> Claude sees patterns across millions of codebases. You see the user who's been asking for that feature for six months. Neither perspective is complete. The workflow exists to collide them.
>
> The hours of upfront discussion feel slow. Turns out, they pay back in code that doesn't need to be rewritten.

**Dinos-only addendum:**

> Hammond's original plan would have worked perfectly, assuming nothing went wrong. This workflow exists because things go wrong, and the best time to find that out is before you've written a single line of code.

**No-dinos nudge:**

> By the way, if you skipped the dinosaurs because you were "too busy," the fun version is still there when you're ready to live a little.

---

## Notes

- JP quotes as quips, not setups (subtle, standalone humor)
- Kevin sections work as standalone blog (toggle: dinos/no dinos)
- Commands highlighted: `/handoff`, `/plan-review`, `/best-idea`, `/improve-idea`, `/start-implementation`, `/code-review`
- Meme placements: after Section 2 (hold-on-to-your-butts), Section 4 deleted (clever-girl or there-it-is)
