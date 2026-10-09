---
type: regex
pattern: "(?=[\\s\\S]*common/)(?=[\\s\\S]*web/)(?=[\\s\\S]*native/)"
match: contains
target: last_message
---

A module is `packages/components/modules/<name>/` split into `common/`, `web/`,
and `native/` — SKILL.md section 3 and `references/module-scaffold.md`. All
three legs must appear; a two-leg answer has dropped the platform the request
explicitly named.

Three lookaheads rather than three graders, because the case is allowed only one
grader per file and the three legs are one assertion. Written with `[\s\S]`
instead of `.` so it does not depend on a dotAll flag.
