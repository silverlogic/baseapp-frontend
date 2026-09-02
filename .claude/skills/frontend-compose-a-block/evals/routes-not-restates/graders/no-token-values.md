---
type: regex
pattern: '#(?=[0-9a-f]{3}(?:[0-9a-f]{3})?\b)[0-9a-f]*[a-f][0-9a-f]*\b'
flags: "i"
match: not_contains
target: last_message
---

Design tokens and the primitive inventory belong to `frontend-design-system`,
and the no-hardcoded-color rule to `frontend-conventions` — SKILL.md's `## Scope`
table. This skill names the owner and never restates the rule, so it carries no
token values to quote.

A hex colour literal in the answer therefore means the model invented styling
guidance instead of routing the question. It is not evidence that this skill
should have supplied a palette.

The pattern requires at least one hex letter so that issue and PR references
like `(#392)`, which appear in the references, cannot trip a `not_contains`
grader against an otherwise correct answer.
