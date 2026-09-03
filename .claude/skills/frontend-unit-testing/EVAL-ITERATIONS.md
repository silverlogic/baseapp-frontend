> **Note for skill-creator:** The `frontend-unit-testing-workspace/` directory is git-ignored (not committed).
> Content evals: **no iteration run yet** — start the first run at `iteration-1`.
> See the iteration history table below.

# frontend-unit-testing Skill — Eval Workspace

Content evals measure whether the loaded skill improves output quality. Each run scores assertion pass
rate **with-skill vs without-skill**, saves raw results under `frontend-unit-testing-workspace/`, and
appends a row to the iteration history table below. Modeled on the backend `ensure-test-coverage` harness.

---

## Content evals

### How to run

Open a fresh Claude Code session (**set the model `sonnet` and `medium` effort**) and paste this prompt:

```text
Run frontend-unit-testing skill evals following the "Content evals" section of
.claude/skills/frontend-unit-testing/EVAL-ITERATIONS.md.

- Iteration: N (next number after existing iterations)
- Model: sonnet
- Baseline: without_skill
- Skill path: .claude/skills/frontend-unit-testing/
- Evals: .claude/skills/frontend-unit-testing/evals/evals.json

Follow steps 1-6 exactly as documented. Skip step 7 (viewer).
```

### Key details

- **Skill path**: `.claude/skills/frontend-unit-testing/`
- **Evals**: `.claude/skills/frontend-unit-testing/evals/evals.json`
- **Workspace**: `.claude/skills/frontend-unit-testing-workspace/`
- **Baseline**: `without_skill` (no skill — tests what the model knows on its own)
- **Model**: Use `model: "sonnet"` on Agent calls for cost-effective runs

### How runs work

Each eval spawns **two subagents** (clean context, no shared state):
1. **with_skill** — reads SKILL.md (+ references), then answers the prompt
2. **without_skill** — answers the same prompt with no skill (general knowledge only)

Both save their response to `outputs/response.md` in their respective directories.

### Validation eval (the rock's Measurable #3)

Beyond the content evals above, the rock requires demonstrating the skill **generates passing tests on
real BaseApp code**. For evals 1–3 (which name real targets), the with_skill agent should additionally:
1. Write the generated test to the real path.
2. Run `pnpm --filter <pkg> exec jest --config ./jest.config.ts` and confirm it passes.
3. Record the pass/fail + coverage delta in `grading.json` under an extra `executed_tests_pass` assertion.

### Directory structure

```text
frontend-unit-testing-workspace/
├── EVAL-ITERATIONS.md             ← iteration history (committed in frontend-unit-testing/)
└── iteration-N/
    ├── eval-1-util-complete/
    │   ├── eval_metadata.json
    │   ├── with_skill/{outputs/response.md, timing.json, grading.json}
    │   └── without_skill/{outputs/response.md, timing.json, grading.json}
    ├── eval-2-hook-tests/
    │   └── ...
    └── benchmark.json
```

### Grading format

`grading.json` uses an `assertion_results` array:

```json
{
  "assertion_results": [
    {"text": "Assertion text", "passed": true, "evidence": "Quote or reference from output"}
  ],
  "summary": {"passed": 4, "failed": 0, "total": 4, "pass_rate": 1.0}
}
```

### Eval execution steps (reproducible)

1. **Setup workspace** (`Bash`) — create dirs + generate `eval_metadata.json` per eval from `evals.json`.
2. **Spawn agents** (`Agent`, model: sonnet) — with_skill / without_skill per eval, save `response.md`.
3. **Save timing** (`Bash`) — capture `total_tokens` + `duration_ms` into `timing.json`.
4. **Grade** (`Agent` x1) — one grader reads all responses + assertions, writes `grading.json`.
5. **Build benchmark** (`Write`) — aggregate pass rates/timing/tokens into `benchmark.json`.
6. **Update this file** (`Edit`) — add the iteration row below.
7. (optional) skill-creator viewer.

### Iteration history

| Iteration | Model | With Skill | Without Skill | Delta | Notes |
|-----------|-------|-----------|---------------|-------|-------|
| 1 (focused) | sonnet | 6/6 evals (100%) | not run | n/a | v0.2.0 runner-aware validation. Ran the **4 new Vitest evals (7–10)** as with_skill responders; all assertions passed. Eval 8 executed the real ported spec → 4/4 tests green. Without-skill baseline + evals 1–6 not re-run this pass (unchanged Jest content). |

> **Iteration 1 scope:** focused validation of the **new** runner-aware content (Phase A). Confirmed a
> skill-loaded agent detects Vitest from `test:unit`, applies `vi.hoisted` / async `importActual` /
> js-cookie default-export / `toFake:['Date']`, and defaults new component-heavy packages to Vitest.
> A full with-vs-without benchmark across all 10 evals is the next iteration if a delta number is needed.
