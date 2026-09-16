---
type: tool_used
tool: Skill
input_match: '"skill"\s*:\s*"(?:[\w-]+:)?frontend-compose-a-block"'
min: 1
---

A request to add a directory under `baseapp-frontend/packages/` is the skill's
primary package route. The skill must fire rather than the model answering from
whatever it can infer about the repo.

Accepts a plugin- or marketplace-qualified skill id as well as the bare name.
Under `--ablation with-without` this grader reports as a `withOnly` indicator on
the baseline arm — expected, not a failure.
