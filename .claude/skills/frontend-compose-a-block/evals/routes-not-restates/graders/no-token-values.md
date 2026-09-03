---
type: regex
pattern: '#(?:(?=(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b)[0-9a-f]*[a-f][0-9a-f]*|[0-9]{6}|[0-9]{8})\b'
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

Two branches, over the four lengths CSS Color 4 permits — 3, 4, 6 and 8
digits. The first matches any of those containing a hex letter, so `#fff`,
`#abcd`, `#1a2b3c` and `#aabbccdd` are caught. The second matches six- and
eight-digit all-numeric values, so `#000000` and `#123456` are caught too.

Three- and four-digit all-numeric values such as `#000` are deliberately not
matched. They cannot be told apart from the issue and PR references that
appear in these files — `(#392)` is three valid hex digits, `#4102` is four —
and on a `not_contains` grader a false positive fails a correct answer. That
is the worse error here, so the gap is accepted. The `llm` grader alongside
this one scores whether the answer routed the question, and would catch a
palette in any notation.
