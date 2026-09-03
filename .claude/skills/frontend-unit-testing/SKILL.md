---
name: frontend-unit-testing
version: 0.2.0
description: >
  Developer-only skill — generate and maintain Jest OR Vitest + Testing Library UNIT tests for
  TypeScript/TSX in this repo (apps/web, apps/mobile, packages/*, and the baseapp-frontend/* submodule
  packages). Load whenever writing new logic, a hook, a util, or a component; fixing a bug; refactoring;
  or about to mark a frontend task done — even if the user does not explicitly ask for tests. Picks the
  runner PER PACKAGE (the package's own test:unit script) — the codebase is mid slow-migration from Jest
  to Vitest, so both coexist. Enforces the project test layout (colocated __tests__/, *.test.ts[x]), the
  shared `@baseapp-frontend/test` render/renderHook wrapper, boundary-only mocking, and no-regress
  coverage (istanbul for Jest, v8 for Vitest). This is the UNIT layer only — component-in-browser
  (Cypress) and e2e (Playwright) live in separate skills. Skip for purely descriptive Q&A with no code
  follow-up, dependency bumps, and doc-only edits.
triggers:
  - writing a new hook, util, or component
  - modifying frontend logic
  - before completing a frontend task
  - fixing a bug in TS/TSX
  - refactoring frontend code
  - the user asks to write or improve unit tests
config:
  runner: per-package            # detect from the target package — see "Pick the runner" below
  coverage_policy: no-regress    # never drop a package below its current baseline; see docs/coverage-baseline.md
  detect: "read <pkg>/package.json scripts.test:unit — 'vitest' → Vitest, 'jest' → Jest"
  new_package_default: vitest    # new component/coverage-heavy packages scaffold Vitest (decision-record-testing-stack.md)
  test_layout: "colocated __tests__/, *.test.ts[x] (same names for both runners once a package is migrated)"
  jest:
    test_command: "pnpm --filter <pkg> exec jest --config ./jest.config.ts"
    coverage_command: "pnpm --filter <pkg> exec jest --config ./jest.config.ts --coverage"
    coverage_provider: istanbul
  vitest:
    test_command: "pnpm --filter <pkg> exec vitest run --config ./vitest.config.mts"
    coverage_command: "pnpm --filter <pkg> exec vitest run --config ./vitest.config.mts --coverage"
    coverage_provider: v8
---

# frontend-unit-testing

## Purpose

No frontend task is complete until its unit tests pass and coverage does not regress. Tests use
`@baseapp-frontend/test` (a thin Testing Library wrapper) and run through the package's own config via
pnpm/Turborepo. The codebase is **mid slow-migration from Jest to Vitest** (see
`docs/decision-record-testing-stack.md`), so **both runners coexist — pick per package.** Coverage is
measured with **istanbul** (Jest, working since the `test-exclude>minimatch` fix,
`docs/b0-coverage-tooling-fix.md`) or **v8** (Vitest).

Pick the target package first, then its runner, then run its `test:unit`. `<pkg>` is the workspace name,
e.g. `web`, `@monorepo/utils`, `@baseapp-frontend/utils`.

---

## Pick the runner (per package)

**Detect it from the package — do not assume Jest.** Read `<pkg>/package.json` → `scripts.test:unit`:

- Contains `vitest` → **Vitest** (config `vitest.config.mts`, v8 coverage, `vi.*` API).
- Contains `jest` → **Jest** (config `jest.config.ts`, istanbul coverage, `jest.*` API).
- **New package with no tests yet, and it's component/hook/coverage-heavy** → scaffold **Vitest**
  (that's where Vitest wins — decision record: `authentication` −25% CI). Pure-logic packages may stay
  Jest; Vitest gives them no speed benefit.

**Match the package's existing runner when adding tests — never mix `jest.*` and `vi.*` in one package's
suite.** `utils`, `authentication`, and `design-system` are **fully migrated to Vitest** (their
`test:unit` runs `vitest run`; the Jest specs and the temporary `*.vitest.test.*` comparison twins have
been removed — tests are plain `*.test.*` again). Most other packages are still Jest. Always detect;
never assume.

---

## Workflow

1. **Pick the runner** for the target package (see above).
2. Write/update tests **colocated** with the code, in a `__tests__/` folder, named `*.test.ts` / `*.test.tsx`.
3. Run the package suite (runner-specific — see Commands).
4. Check coverage: add `--coverage`. Read the uncovered lines and add targeted tests.
5. All tests green **and** coverage did not drop below the package's baseline → done.
6. Bug fix → write a failing regression test first, then fix, then re-run.

---

## Commands

**Jest packages:**

```bash
pnpm --filter <pkg> exec jest --config ./jest.config.ts                 # run a package's unit suite
pnpm --filter <pkg> exec jest --config ./jest.config.ts --coverage      # with coverage (istanbul)
pnpm --filter <pkg> exec jest --config ./jest.config.ts -t "name"       # single test by name
```

**Vitest packages:**

```bash
pnpm --filter <pkg> exec vitest run --config ./vitest.config.mts             # run a package's unit suite
pnpm --filter <pkg> exec vitest run --config ./vitest.config.mts --coverage  # with coverage (v8)
pnpm --filter <pkg> exec vitest run --config ./vitest.config.mts -t "name"   # single test by name
```

**Either:**

```bash
pnpm --filter <pkg> test:unit          # the package's sanctioned lane (jest OR vitest) — CI parity
pnpm test:unit --filter=web            # via turbo
```

Do **not** pass `-- --coverage` through the `test:unit` npm script — Jest reads the trailing arg as a
path pattern (Vitest is more forgiving, but stay consistent). Invoke the runner directly via `exec`
(as above) when you need flags.

---

## Rules

1. **Use the shared wrapper.** Import `render`, `renderHook`, `screen`, `userEvent` from
   `@baseapp-frontend/test` — never straight from `@testing-library/react`. It mounts the app providers.
2. **Mock only boundaries, never the code under test.** Mock network/data edges (`baseAppFetch`,
   `@tanstack/react-query`'s `useQuery`, auth hooks like `useJWTUser`) — never the function/hook/component
   under test. The partial-mock idiom differs by runner:
   - **Jest:** `jest.mock('@pkg', () => ({ ...jest.requireActual('@pkg'), thing: jest.fn() }))`
   - **Vitest:** `vi.mock('@pkg', async () => ({ ...(await vi.importActual('@pkg')), thing: vi.fn() }))`
     — the factory **must be `async`** and `importActual` **awaited** and parenthesized.
3. **Test behavior, not implementation.** Query by role/text/label (`getByRole`), assert observable
   output. Avoid asserting on internal state or snapshotting large trees.
4. **Colocate + name correctly.** `__tests__/` next to the source; `*.test.ts(x)`. This is what the
   `testMatch` glob picks up.
5. **No-regress coverage.** Do not let a package fall below its baseline (`docs/coverage-baseline.md`).
   Pure-logic packages (`utils`) should stay ~70%+. Add tests for the lines you touched. The coverage
   gate itself (policy, provider-by-runner, which test types measure coverage) is the
   **`frontend-ensure-test-coverage`** skill — load it when the task is about coverage specifically.
6. **Don't inflate coverage with junk.** Don't test trivial re-exports, generated Relay artifacts
   (`__generated__/`), or `.stories.*`. Cover real logic, branches, and error paths.
7. **Bug fixes → regression test first.** A failing test that reproduces the bug, then the fix.
8. **Unit layer only.** If the right test is a browser/component (Cypress) or e2e (Playwright) test,
   say so and defer to those skills — don't force it into Jest.
9. **Mobile (`apps/mobile`) uses `jest-expo`.** RN component tests go through that preset; the same
   colocation/boundary-mock rules apply. Mobile has no Vitest path (the beta `vitest-native` is not
   adopted) — keep mobile on Jest.
10. **Vitest specifics (these bite when porting from Jest).** In Vitest packages:
    - **`vi.mock` is hoisted above the file** and its factory **cannot reference outer variables**
      (Jest's `mock`-prefixed escape hatch does not exist). Declare shared mock fns with
      **`const { fooMock } = vi.hoisted(() => ({ fooMock: vi.fn() }))`** and reference `fooMock` inside.
    - **Default-export modules need an explicit `default`.** e.g. `js-cookie`:
      `vi.mock('js-cookie', () => { const api = { get: vi.fn(), set: vi.fn(), remove: vi.fn() }; return { default: api, ...api } })`
      — one shared object so app code (`Cookies.set`) and assertions (`cookiesMock.set`) are the same `vi.fn()`.
    - **Fake timers deadlock `waitFor`.** If you only need frozen time (e.g. keep a JWT unexpired), fake
      **only Date**: `vi.useFakeTimers({ toFake: ['Date'] })`. Faking `setTimeout`/`setInterval` too
      stalls Testing Library's polling under Vitest.
    - Globals (`describe`/`it`/`expect`/`vi`) are on (`globals: true`); `jest.Mock`/`jest.Mocked` type
      annotations are erased at runtime, so they don't need porting for a spec to *run*.

See [`references/testing-patterns.md`](./references/testing-patterns.md) for copy-paste patterns
(hook test, component test, module mock, async/fetch) in **both Jest and Vitest**, plus a Jest→Vitest
porting cheatsheet.
