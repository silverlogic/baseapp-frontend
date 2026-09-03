---
type: regex
pattern: '#(?:(?=[0-9a-f]{3}(?:[0-9a-f]{3})?\b)[0-9a-f]*[a-f][0-9a-f]*|[0-9]{6})\b'
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

Two branches. The first matches any three- or six-digit hex containing a
letter; the second matches a six-digit all-numeric hex, so `#000000` and
`#123456` are caught too.

Three-digit all-numeric values such as `#000` are deliberately not matched.
They are indistinguishable from the issue and PR references that appear in
these references — `(#392)` is three valid hex digits — and on a
`not_contains` grader a false positive fails a correct answer. That is the
worse error here, so the gap is accepted. The `llm` grader alongside this one
scores whether the answer routed the question, and would catch an answer that
supplied a palette in any notation.
