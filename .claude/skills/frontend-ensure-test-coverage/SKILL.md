---
name: frontend-ensure-test-coverage
version: 0.1.0
description: >
  Developer-only skill — the frontend coverage gate. Ensure every frontend change ships with passing
  tests and coverage that does NOT regress below the package's baseline, before marking a task done —
  even if the user doesn't ask. Frontend analogue of the backend `ensure-test-coverage` skill: no Docker,
  per-package via pnpm/Turborepo, and the coverage provider follows the package's runner (istanbul for
  Jest, v8 for Vitest). Owns the "which test types can measure coverage" matrix (unit yes; Cypress
  component yes via instrumentation; Playwright e2e generally no). For HOW to write the tests, use
  `frontend-unit-testing`. Skip for doc-only edits, dependency bumps, and descriptive Q&A.
triggers:
  - writing new frontend code
  - modifying frontend logic
  - before completing a frontend task
  - implementing a feature or fixing a bug in TS/TSX
  - refactoring frontend code
  - the user asks about coverage
config:
  coverage_policy: no-regress   # never drop a package below its baseline (docs/coverage-baseline.md)
  detect: "read <pkg>/package.json scripts.test:unit — 'vitest' → v8, 'jest' → istanbul"
  jest_coverage: "pnpm --filter <pkg> exec jest --config ./jest.config.ts --coverage"
  vitest_coverage: "pnpm --filter <pkg> exec vitest run --config ./vitest.config.mts --coverage"
---

# frontend-ensure-test-coverage

## Purpose

No frontend task is complete until its tests pass **and coverage does not regress** below the package's
current baseline (`docs/coverage-baseline.md`). Unlike the backend's single hard threshold (≥75%), the
frontend policy is **no-regress per package** — packages start from very different baselines (pure-logic
`utils` is high; UI packages are lower), so the rule is "don't make it worse," plus raise the lines you
touched.

Runs **on the host** via pnpm — there is no Docker for the frontend. The coverage provider follows the
package's runner: **istanbul** for Jest, **v8** for Vitest (`vitest.config.mts` → `coverage: { provider:
'v8' }`). Pick the runner exactly as in `frontend-unit-testing` → "Pick the runner".

---

## Workflow

1. Identify the target package and its runner (`scripts.test:unit`).
2. Run the suite **with coverage** (see Commands).
3. Coverage ≥ the package baseline **and** all tests pass → done.
4. Coverage dropped → read the `--cov`/missing-lines report, add **targeted** tests for the uncovered
   branches you changed, re-run. Repeat.
5. Bug fix → failing regression test first, then fix, then confirm coverage.

---

## Commands

```bash
# Jest packages (istanbul)
pnpm --filter <pkg> exec jest --config ./jest.config.ts --coverage

# Vitest packages (v8)
pnpm --filter <pkg> exec vitest run --config ./vitest.config.mts --coverage
```

Do **not** pass `-- --coverage` through the `test:unit` npm script — Jest reads the trailing arg as a
path pattern. Invoke the runner directly via `exec`.

---

## Which test types can measure coverage (matrix)

| Layer | Tool | Coverage? | How |
|---|---|---|---|
| **Unit** | Jest | ✅ | istanbul (built in; `--coverage`). Working since the `test-exclude>minimatch` fix (`docs/b0-coverage-tooling-fix.md`). |
| **Unit** | Vitest | ✅ | v8 (`@vitest/coverage-v8`; `--coverage`). Faster instrument than istanbul. |
| **Component (in-browser)** | Cypress | ✅ *(when wired)* | `@cypress/code-coverage` + istanbul-instrumented app build (`babel-plugin-istanbul`). Not on by default — teammate-owned; see the component skill. |
| **E2E** | Playwright | ⚠️ generally **no** | Possible only against an istanbul-instrumented build via `playwright-test-coverage`/manual `window.__coverage__` collection; not standard here. Treat e2e as behavior verification, **not** a coverage source. |

**Consequence for the gate:** the no-regress number is driven by the **unit** layer (Jest/Vitest).
Component coverage, where enabled, is reported separately and merged only if the project wires nyc merge —
do not assume it counts toward the unit baseline. E2e does not contribute coverage.

---

## Rules

1. **Never mark a task complete if coverage regressed** below the package baseline (`docs/coverage-baseline.md`).
2. **No-regress, not a fixed %.** Match/raise the baseline; always raise coverage on the lines you touched.
3. **Provider follows the runner** — istanbul (Jest) or v8 (Vitest). Don't mix; read `scripts.test:unit`.
4. **Don't inflate coverage with junk.** No barrel/re-export tests, no whole-tree snapshots, no
   `__generated__/` Relay files or `.stories.*`. Cover real branches and error paths.
5. **Bug fixes → regression test first.**
6. **Unit drives the gate.** Component (Cypress) coverage is separate and only counts if the project
   explicitly merges it; e2e (Playwright) is not a coverage source.
7. **Writing the tests is `frontend-unit-testing`'s job** — this skill is the gate + measurement. Defer
   test-authoring patterns (wrapper, boundary mocks, runner specifics) to that skill.
