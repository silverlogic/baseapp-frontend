# frontend-ensure-test-coverage Skill — Eval Workspace

Content evals measure whether the loaded skill improves output quality. Mirrors the
`frontend-unit-testing` harness (see that skill's EVAL-ITERATIONS.md for the full method:
spawn with_skill / without_skill responders per eval, grade assertions, aggregate).

- **Skill path:** `.claude/skills/frontend-ensure-test-coverage/`
- **Evals:** `.claude/skills/frontend-ensure-test-coverage/evals/evals.json`
- **Baseline:** `without_skill`
- **Model:** `sonnet`

### Iteration history

| Iteration | Model | With Skill | Without Skill | Delta | Notes |
|-----------|-------|-----------|---------------|-------|-------|
| 1 (focused) | sonnet | 2/2 evals (100%) | not run | n/a | v0.1.0 first validation. Ran evals 1 (no-regress gate) + 2 (e2e not a coverage source) as with_skill responders; all assertions passed — agent refused "done" on a coverage drop, held no-regress (not a fixed %), and correctly excluded Playwright e2e from the gate. Evals 3–4 (runner-specific commands) + without-skill baseline are the next iteration. |

> **Iteration 1 scope:** focused validation of the two highest-value behaviors — the no-regress refusal
> and the coverage-measurability matrix (which test types count). Both held.
