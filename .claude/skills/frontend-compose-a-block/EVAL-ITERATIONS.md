> **Note for skill-creator:** The `frontend-compose-a-block-workspace/` directory is git-ignored (not committed).
> Content evals: **no iteration has been run yet.** Start the first run at `iteration-1`.
> See the iteration history table below.

# frontend-compose-a-block Skill — Eval Workspace

Content evals measure whether the loaded skill improves output quality. Each run scores assertion pass rate with-skill vs without-skill, saves raw results under `frontend-compose-a-block-workspace/`, and appends a row to the iteration history table below.

---

## Current status — read this before quoting any score

**No scored run exists.** The table at the bottom is empty on purpose rather than omitted, so that the
absence is visible instead of implied.

What ships, and what was actually verified about each:

| Suite | Contents | Verified | Not verified |
|---|---|---|---|
| `evals/evals.json` | 10 cases, 5 assertions each | Valid JSON; every assertion's named keys confirmed present in the skill text | Never scored against a model run |
| `evals/trigger-evals.json` | 14 positive, 13 negative queries | Valid JSON; shape and balance | Never executed |
| `evals/*/` (5 dirs, 12 graders) | `prompt.md` + `graders/*.md`, tool format | Frontmatter parses; grader patterns reviewed by hand | **Never executed** |

The five tool-format directories cannot be run here. `claude plugin eval` is gated behind early access
and exits 1 in this environment, printing `plugin eval is currently in early access`. That is an
environment limitation, not a defect in the cases. They ship shape-verified only.

The two JSON suites do not need that tool. They run through the house two-subagent loop described
below, which is the same loop `frontend-conventions`, `frontend-patterns`, `frontend-design-system`
and `backend-conventions` use. Running iteration 1 is the outstanding work.

Worth knowing for comparison: both sibling `compose-a-block` skills — the backend one and
`compose-compose-a-block` in the compose template — also ship with no eval-iteration record. This file
sets that precedent for the family rather than matching it.

---

## Content evals

### How to run

Open a fresh Claude Code session (**set the model `Sonnet 4.6` and `medium` effort**) and paste this prompt:

```text
Run frontend-compose-a-block skill evals following the "Content evals" section of .claude/skills/frontend-compose-a-block/EVAL-ITERATIONS.md.

- Iteration: N (next number after existing iterations)
- Model: sonnet
- Baseline: without_skill
- Skill path: .claude/skills/frontend-compose-a-block/
- Evals: .claude/skills/frontend-compose-a-block/evals/evals.json

Follow the same steps 1-6 documented in frontend-patterns/EVAL-ITERATIONS.md. Skip step 7 (viewer).
```

### Key details

- **Skill path**: `.claude/skills/frontend-compose-a-block/`
- **Evals**: `frontend-compose-a-block/evals/evals.json`
- **Workspace**: `.claude/skills/frontend-compose-a-block-workspace/` (git-ignored)
- **Baseline**: `without_skill` (no skill — tests what the model knows on its own)
- **Model**: Use `model: "sonnet"` on Agent calls for cost-effective runs

### How runs work

Each eval spawns **two subagents** (clean context, no shared state):

1. **with_skill** — reads SKILL.md + references, then answers the prompt
2. **without_skill** — answers the same prompt with no skill (general knowledge only)

Both save their response to `outputs/response.md`. A grader agent then writes `grading.json` per
response with `{text, passed, evidence}` per assertion, and the run aggregates into `benchmark.json`.

The full step-by-step procedure, directory layout and grading format are documented once in
`frontend-patterns/EVAL-ITERATIONS.md` under `### Eval execution steps (reproducible)`. Follow that
rather than duplicating it here.

### A caveat on trigger evals

`backend-conventions/EVAL-ITERATIONS.md` records a control run where a known-good skill scored 3 of 12
on its own trigger evals via `claude -p`. Treat trigger-eval numbers from that harness as a weak
signal, and do not report a trigger score without saying which harness produced it.

---

### Iteration history

| Iteration | Model | With Skill | Without Skill | Delta | WS Tokens (avg) | NS Tokens (avg) | Token Delta | Notes |
|-----------|-------|-----------|--------------|-------|-----------------|-----------------|-------------|------|
| _none yet_ | — | — | — | — | — | — | — | No run has been executed. Suites are shape-verified only; see **Current status** above. |

### Trigger evals — iteration history

| Iteration | Model | TP rate | TN rate | Notes |
|-----------|-------|---------|---------|-------|
| _none yet_ | — | — | — | 14 positive / 13 negative cases defined in `evals/trigger-evals.json`, never executed. |
