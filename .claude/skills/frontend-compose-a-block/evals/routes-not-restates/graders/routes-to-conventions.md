---
type: llm
criteria: |
  The request mixes one thing this skill owns with three things it does not. A
  passing answer keeps that split.

  Owns, and should answer directly: the module layout — the `common/` / `web/` /
  `native/` legs, leaf file names, where shared logic goes, the leg barrels.

  Does not own, and should hand off by naming the owner rather than explaining
  the rule:
  - brand colour and spacing scale — `frontend-design-system` for the tokens and
    primitives, `frontend-conventions` for styling and the no-hardcoded-color
    rule
  - the confirm dialog — `frontend-patterns`
  - persisting the filter selection across legs, i.e. store construction —
    `frontend-patterns`

  Pass when the answer names those owners for the three attached concerns and
  does not substitute its own version of their rules — no palette or token
  values, no dialog-composition walkthrough, no store-construction recipe.

  Naming a different one of the three sibling skills than listed above is a
  near-miss, not a failure, provided the answer routes rather than restates.
  Routing is the behaviour under test.

  Fail when the answer answers the three itself as though this skill governed
  styling, dialogs, or state — or when it refuses the module layout too, since
  routing is not the same as declining.
focus: whether attached concerns are routed to the owning skill instead of restated
target: last_message
---

The complement boundary is the one thing in SKILL.md that is purely negative —
it is defined by what the skill declines to say — so only a judge over prose can
score it. `no-token-values` catches the single most legible violation
deterministically.
