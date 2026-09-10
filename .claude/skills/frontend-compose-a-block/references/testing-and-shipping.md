# Testing, storybook, and shipping

A block ships when five gates pass. Three run only inside the package directory and two only at the
submodule root — the root `package.json` has no `relay` script, and `packages/components` has no
`changeset` and no `lint:ast-grep`. Before any gate runs, jest has to start at all, and it will not
unless the package physically owns nine `__mocks__` shims. Miss one and jest dies on a
module-resolution error inside a file that has nothing to do with it.

## Contents

- [Where tests and stories live](#where-tests-and-stories-live)
- [Jest config resolution](#jest-config-resolution)
- [The nine shims](#the-nine-shims)
- [What to unit-test](#what-to-unit-test)
- [Cypress component tests](#cypress-component-tests)
- [Storybook](#storybook)
- [The five gates](#the-five-gates)
- [The three ast-grep error rules](#the-three-ast-grep-error-rules)
- [Changesets](#changesets)
- [Anti-patterns](#anti-patterns)

## Where tests and stories live

```text
packages/<name>/
├── __mocks__/                          # the 9 shims — resolved against THIS package's rootDir
├── jest/__mocks__/                     # extra mocks this package's jest.config.ts appends
├── __tests__/dummy.test.ts             # keeps jest from failing "no tests found"
└── modules/<module>/
    ├── common/
    │   ├── utils.ts
    │   ├── hooks/useThing/index.ts
    │   └── __tests__/utils.test.ts     # jest — beside the unit under test
    ├── web/<Component>/
    │   ├── index.tsx
    │   ├── __tests__/
    │   │   ├── <Component>.cy.tsx      # cypress — web only
    │   │   ├── __mocks__/{constants,requests,resolvers}.ts
    │   │   └── __utils__/<Component>ForTesting/index.tsx
    │   └── __storybook__/              # storybook — web only
    │       ├── stories.tsx
    │       ├── <Component>.mdx
    │       ├── mockResolvers.ts
    │       └── <Component>WithQuery/index.tsx
    └── native/<Component>/             # nothing: no __tests__, no __storybook__ under any native/
```

`__tests__/` goes beside the unit under test, not in a package-level tests tree. Both `__tests__/`
and `__mocks__/` are in the shared ESLint `ignorePatterns`, and `sonar-project.properties` excludes
`**/__tests__/**` and `**/__storybook__/**` — so nothing in these directories is linted or measured.

At `bd0a27f3` every one of the 12 `.cy.tsx` specs and all 29 story files sit under a `*/web/` leg.
`native/` has zero tests and zero stories, and the repo carries no `@testing-library/react-native`
dependency at all. **There is no verified mechanism for sharing one test file across RTL-DOM and
React Native Testing Library.** Do not plan for one: test the shared hook in `common/`, and if a
platform leg needs its own coverage, write a separate thin test that mocks that hook.

## Jest config resolution

`packages/test/jest.config.ts` is the base for every package. Two consuming forms exist:

```ts
// one-liner — packages/utils/jest.config.ts, packages/authentication/jest.config.ts
module.exports = require('@baseapp-frontend/test/jest.config.ts')

// spread-and-extend — packages/components/jest.config.ts
const jestConfigs = require('@baseapp-frontend/test/jest.config.ts')

module.exports = {
  ...jestConfigs,
  setupFilesAfterEnv: [
    ...(jestConfigs.setupFilesAfterEnv ?? []),
    '<rootDir>/jest/__mocks__/graphql-ws.ts',
  ],
}
```

Take the one-liner unless the package needs an extra setup file. When it does, spread the base and
concatenate onto `setupFilesAfterEnv` — assigning a fresh array drops the two console/fetch entries
the base sets. Note the extra mock lands in `jest/__mocks__/`, deliberately outside the `__mocks__/`
directory: the base config's `modulePathIgnorePatterns` excludes non-test `__mocks__` paths.

## The nine shims

`packages/test/jest.config.ts:16` sets `setupFilesAfterEnv` and `:17-26` sets `moduleNameMapper`,
and every path in both is written `<rootDir>/__mocks__/*.ts`. Jest resolves `<rootDir>` to the
package running the test — the **consumer** — never to `packages/test`. The mock bodies live in
`packages/test/__mocks__/`, but the files jest looks for must exist in the package under test.

| Shim | Wired by | Body form |
|---|---|---|
| `console.ts` | `setupFilesAfterEnv` | `module.exports` + `export {}` |
| `fetch.ts` | `setupFilesAfterEnv` | default re-export |
| `file.ts` | mapper — image / font / media extensions | default re-export |
| `style.ts` | mapper — `.css`, `.less` | default re-export |
| `next-font.ts` | mapper — `next/font/google` | `export *` re-export |
| `react-native.ts` | mapper — `react-native` | `export *` re-export |
| `expo-constants.ts` | mapper — `expo-constants` | default re-export |
| `expo-modules-core.ts` | mapper — `expo-modules-core` | default re-export |
| `expo-secure-store.ts` | mapper — `expo-secure-store` | default re-export |

Copy all nine from `packages/components/__mocks__/` and keep each body's exact form. A default
re-export is `const Style = require('@baseapp-frontend/test/__mocks__/style.ts')` followed by
`export default Style`; `next-font` and `react-native` are a one-line
`export * from '@baseapp-frontend/test/__mocks__/react-native'`, because those two mocks expose
named bindings. Swapping one form for the other breaks the import at the mapper.

The two `setupFilesAfterEnv` entries are unconditional: without `__mocks__/console.ts` and
`__mocks__/fetch.ts` jest fails before collecting a test. The seven mapper entries fire only when
something in the graph imports the mapped module, which is why `packages/utils/__mocks__/` gets away
with eight — it never pulls in `next/font/google`. A block renders web components and imports
`common/` code reaching expo and react-native, so take all nine.

## What to unit-test

Unit-test the platform-neutral half: pure functions and hooks in `common/`. All four real jest
tests in `packages/components` cover pure functions — `getCommentsConnectionId`,
`getNextClientMutationId`, and `toCommentEditTarget` in `comments/common/__tests__/utils.test.ts`,
plus `toggleGroupSelection`, `socialUpsertFormValidation`, and `formatFollowCount`.

There is no `renderHook` test in `packages/components` yet. The precedent for hooks is in the
sibling packages — `packages/utils/hooks/useDebounce/__tests__/useDebounce.test.ts`,
`packages/authentication/modules/access/useLogin/__tests__/`, and
`packages/design-system/hooks/web/useUISettings/__tests__/`. Import `renderHook` from
`@baseapp-frontend/test`, which re-exports the whole of `@testing-library/react` alongside
`render` (wrapper defaulting to `ComponentWithProviders`), `mockFetch`, and `axiosMock`.

A connection-key helper is the highest-value thing to cover: it is a string the Relay store either
matches or silently does not, and the test pins it to `ConnectionHandler.getConnectionID`.

## Cypress component tests

Cypress runs component tests against a local webpack build, web only. The `specPattern` in
`packages/components/cypress.config.ts` is `./modules/**/__tests__/*.cy.{js,ts,jsx,tsx}` — a spec is
picked up only from a `__tests__/` directory under `modules/`.

The spec shape, from `comments/web/Comments/__tests__/Comments.cy.tsx`: call `createTestEnvironment`
from `@baseapp-frontend/graphql`, `queueOperationResolver({ queryName, data })` keyed on the
wrapper's query name, then `cy.mount` the `<Component>ForTesting` wrapper with that `environment`
prop. Fixtures split into `__mocks__/{requests,resolvers,constants}.ts`.

## Storybook

Stories are web only, and `packages/components/.storybook/main.ts` globs exactly
`../modules/**/__storybook__/stories.@(js|jsx|mjs|ts|tsx)` plus the sibling `*.mdx` — a story file
anywhere else is not loaded. Title every story `'@baseapp-frontend | components/<Module>/<Name>'`,
where `<Module>` is the module's PascalCase display name, not its directory name: `activity-log/`
is `ActivityLog`, `navigations/` is `Navigation`, `__shared__/` is `Shared`.

Point `meta.component` at the `<Name>WithQuery` wrapper, not the component itself, and supply data
through `parameters.mockResolvers`. That parameter is read by `withGraphqlTestProviders`, which
`packages/components/.storybook/preview.ts` installs as a decorator via
`withStorybookProvidersWrapper(withComponentCompleteTestProviders)`; the composed wrapper in
`modules/tests/web/utils/withComponentCompleteTestProviders/` chains it with the authentication and
design-system test providers. So a story exports a plain `mockResolvers` object and nothing else.

This reference covers authoring stories for a block. For the DocLinks link-map and the Figma Code
Connect side of Storybook, see `frontend-design-system/references/code-connect.md`.

## The five gates

`<pkg>` is `packages/<name>`; ROOT is the submodule root. The two columns are not interchangeable.

| # | Gate | Command | cwd | Runs |
|---|---|---|---|---|
| 1 | Unit tests | `pnpm test:unit` | `<pkg>` | `jest --config ./jest.config.ts` |
| 2 | Relay codegen | `pnpm relay` | `<pkg>` | `relay-compiler` |
| 3 | Lint and types | `pnpm lint` | `<pkg>` | `eslint --cache` then `tsc --noEmit` |
| 4 | Changeset | `pnpm changeset` | ROOT | `changeset` |
| 5 | ast-grep | `pnpm lint:ast-grep` | ROOT | `ast-grep test && ast-grep scan` |

Gate 3 in full is `eslint . --ext .tsx --ext .ts --cache && tsc --noEmit --incremental`, and it is
the only typecheck there is — no package declares a separate `typecheck` script. Gates 1–3 also have
root forms that fan out through turbo, each `dependsOn: ["^build"]`, so a filtered run builds
upstream workspace deps first. Gates 4 and 5 have no package form at all.

Gate 2 needs care. `packages/config/relay.config.ts:15` sets `artifactDirectory: './__generated__'`,
one directory at the package root, and `packages/components/.gitignore` ignores `/__generated__`
while keeping its `.keep`. **No generated artifact is committed anywhere in the repo**, so
`git status` can never show `__generated__` drift — what drifts is your documents against the
committed `schema.graphql`, and the only signal is `pnpm relay` exiting non-zero. Run it before gate
3: `tsc --noEmit` reads the generated types, so a stale or missing `__generated__` fails the
typecheck for a reason that reads as unrelated. `build`, `test:component`, and `storybook` each
prefix `pnpm relay` for the same reason.

## The three ast-grep error rules

`ast-grep scan` exits non-zero only on a `severity: error` rule. Four rules are error-severity;
`next-no-img-element` is scoped to `apps/web/**`, so three can fail a block in `packages/`:

| Rule | Fails on |
|---|---|
| `relay-uselazyloadquery-in-list` | `useLazyLoadQuery` in a component rendered once per row |
| `form-no-other-form-libraries` | any form library other than `react-hook-form` + `zod` |
| `state-no-redux` | Redux for client state — the repo uses Zustand |

The remaining 24 rules are warnings and do not gate, but they encode conventions a reviewer raises
anyway. Scan one at ROOT with `pnpm exec ast-grep scan --filter '^state-no-redux$'`.

## Changesets

A block does not ship without a changeset — the release workflow publishes from `.changeset/*.md`
and has nothing to do without one. Run `pnpm changeset` at ROOT; it writes a markdown file with a
frontmatter package-to-bump map:

```md
---
'@baseapp-frontend/components': patch
---

One paragraph: the user-visible behaviour that changed, and why.
```

List every package the change touches, one line each. `.changeset/config.json` sets
`access: "restricted"`, but all eleven packages override it with `publishConfig.access: "public"` in
their own `package.json`, so a new package needs that field or it publishes private. Config also
sets `commit: false` (commit the file yourself), `baseBranch: "master"`, and
`updateInternalDependencies: "patch"`. Maintainers run `pnpm version-packages` and the release
workflow runs `pnpm release`; neither is yours to run.

## Anti-patterns

- Leaving the nine `__mocks__` shims in `packages/test/` — `packages/test/jest.config.ts:16-26`
  resolves them against the consuming package's `<rootDir>`, so jest cannot see them there.
- Copying `packages/wagtail`'s test setup. It has `cypress.config.ts`, `webpack.config.ts`, the four
  cypress devDeps, and `cypress:open` / `cypress:clean` scripts, but no `test:component` script and
  no `cypress/support/` directory — no spec it holds can run, and neither can yours.
- Replacing `setupFilesAfterEnv` instead of spreading the base array — the console and fetch entries
  vanish and every suite fails before its first assertion.
- Promising one test file for both platforms — the repo has no React Native Testing Library
  dependency and zero tests under any `native/` leg, so there is nothing to share it with.
- Putting a `.cy.tsx` spec or a `__storybook__/` directory under `native/` — neither the cypress
  `specPattern` nor the storybook glob reaches it, and neither runner has a native renderer.
- Running a gate from the wrong directory — `relay` is declared only in the package's
  `package.json`, `changeset` and `lint:ast-grep` only in the root's; pnpm finds neither elsewhere.
- Treating a clean `git status` as proof gate 2 passed — nothing under `__generated__` is committed,
  so codegen drift stays invisible until `tsc --noEmit` or CI fails on it.
- Dropping the `'@baseapp-frontend | '` story-title prefix — it lands in its own sidebar root.
- Passing mock data to a story as an arg instead of `parameters.mockResolvers` — the Relay decorator
  reads it off `context.parameters`, so an arg never reaches the mock environment.
