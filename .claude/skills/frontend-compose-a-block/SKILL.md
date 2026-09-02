---
name: frontend-compose-a-block
description: ALWAYS use this skill when creating, extending, or reviewing a package or feature module ("block") inside the baseapp-frontend submodule — `packages/<name>/` or `modules/<name>/{common,web,native}/`. Trigger on requests like "add a new baseapp-frontend package for X", "add a comments-style module to components", "does this hook go in common or web", "connection key doesnt match after the mutation". Covers package scaffold, its exports/deps manifest, the common/web/native contract, barrels, the Relay layer — fragments, root-query ownership, pagination, mutations, subscriptions — and the test/storybook/changeset loop. Submodule only — styling, forms, dialogs, permission gates, Zustand, and design tokens stay with frontend-conventions, frontend-patterns, and frontend-design-system. Skip only for descriptive Q&A with no code follow-up, dependency or version bumps, and doc-only edits. Do NOT imitate sibling modules or trust a subagent's summary — read SKILL.md and the reference for the area you touch.
---

# frontend-compose-a-block

This skill covers authoring a reusable unit — a *block* — inside the `baseapp-frontend` submodule.
A block is one of two things. A **package** is a pnpm workspace member at `packages/<name>/`,
published as `@baseapp-frontend/<name>`, owning its own `package.json`, tsconfig chain, lint config,
and changelog. A **module** is a feature directory inside a package — canonically
`packages/components/modules/<name>/` — split into three legs (`common/`, `web/`, `native/`) and
exposed through one `exports` entry per leg. A module is never published on its own; the package
around it is. Which one you are building decides everything downstream, so decide it first.

This skill encodes the **target** shape for a new block, not the average of what is already there.
The submodule carries two coexisting package layouts, two fragment-naming conventions, two fragment
file locations, and several half-finished migrations. Where the codebase diverges from the target,
the divergence is named — under `## Before you start: known-stale sources` here, or in a reference's
`## Anti-patterns` — so you can recognize it and leave it alone. Copying the nearest sibling is the
most reliable way to get a block wrong.

## Scope

This skill governs code **inside the submodule** — `baseapp-frontend/packages/**`. A consuming
template's own `apps/` and `packages/` are different ground: the template ships
`frontend-conventions`, `frontend-patterns`, and `frontend-design-system` for that code. Those three
also own several areas a block's UI touches. Use them alongside this skill rather than instead of
it — this skill names the owner and routes to it, and never restates the rule itself.

| Topic | Owner |
|---|---|
| Styling — `styled()` vs `sx` vs Tailwind, the no-hardcoded-color rule | `frontend-conventions` |
| TypeScript and GraphQL file conventions in a consuming template | `frontend-conventions` |
| Forms, dialogs, modals, drawers | `frontend-patterns` |
| Permission gates around a queried surface | `frontend-patterns` |
| Zustand store construction; app-level query preloading and infinite scroll | `frontend-patterns` |
| Design tokens and the primitive inventory | `frontend-design-system` |
| Package scaffold, manifest, the leg contract, barrels, the Relay layer, shipping | this skill |

One boundary is worth stating outright because it reads like a contradiction and is not.
`frontend-conventions/references/code-sharing.md` governs the **template** repo's `packages/` — "do
not move code to `packages/` preemptively", "do not put UI components in `packages/`". This skill
governs the **submodule**, where UI in `packages/` is the whole point —
`@baseapp-frontend/components` exists to ship UI. The two rules are complementary, not in conflict;
they address different repositories. Inside `baseapp-frontend/`, this skill applies; one directory
up, `code-sharing.md` does.

## How to use this skill

Each section below summarizes one area. When a task touches that area, read the corresponding
reference file before writing code — the references carry the real code, the anchors, and the
anti-patterns.

Pick a route first. The choice is decidable from this file; you do not need to open a reference to
make it.

**Package route** — you are adding a directory at `packages/<name>/` that publishes as
`@baseapp-frontend/<name>` and owns a `package.json`. Read sections **1 → 2 in order**: scaffold,
then manifest. They are a single sequence and skipping one leaves the package unbuildable or
unpublishable — a directory that compiles locally and resolves to nothing from a consumer.

**Module route** — you are adding a feature directory inside a package that already exists,
canonically `packages/components/modules/<name>/`, with `common/`, `web/`, and `native/` legs. Read
sections **3 → 4 → 5 in order**: directory layout, then which leg each artefact belongs in, then how
the module leaves the package through its barrels. Out of order you will place files before you know
the leg rules, and the import lint fails after the fact.

Tiebreaker when both look plausible: does the code need its own `package.json`, version, and
changelog? Yes — package route. No — module route. A module never gets one.

Relay sections **6-10 apply to both routes**; a block's data layer is the same whether it ships as a
new package or a new module. Read them in order when the block reads or writes GraphQL, and skip
them entirely when it does not. Section **11 closes both routes** — tests, stories, changeset — and
`## Definition of done` is the list CI actually enforces.

---

## Before you start: known-stale sources

Three things here look authoritative and are not. Each is the kind of file a new block gets by
pattern-matching against its neighbours, and each carries a specific failure.

**The dead `tsup` pair.** `packages/components/tsup.config.ts` and
`packages/design-system/tsup.config.ts` both exist, and both packages still list `tsup` in
devDependencies — nothing invokes either file. The build in both packages is
`tsc --build tsconfig.build.json` (`components` prefixes it with `pnpm relay`). Copying a tsup
config into a new package leaves you tuning a bundler step that never runs, and hides the fact that
`tsconfig.build.json` is the file that actually decides what ships.

**`packages/wagtail`'s Relay wiring.** It carries `relay.config.js`, a `__generated__/` directory,
and a 2,189-line `schema.graphql` — a complete Relay setup with zero `graphql` tagged documents
behind it. Nothing there was ever exercised by a real query, so it reads as a working reference
while proving nothing. Take Relay wiring from `packages/components`, which has queries running
through it.

**`main` and `types` disagree on the six Shape A packages.** In `packages/authentication`,
`packages/graphql`, `packages/provider`, `packages/test`, `packages/utils`, and `packages/wagtail`,
`main` is `./index.ts` — TypeScript source — while `types` is `dist/index.d.ts`, built output. The
two fields describe different distribution models, so neither tells you which one the repo means.
Do not infer a manifest shape from them: a new package takes Shape B (section 2), an `exports` map
over source subpaths with no `main` at all.

---

## Sections

### 1. Package scaffold
A package is a directory at `packages/<name>/`, registered by the `packages/*` glob — no
`pnpm-workspace.yaml` and no `turbo.json` edit. Eleven files are always required; unit tests, Relay,
web styling, Cypress, and Storybook each add a conditional set on top. Cypress is the one addition
that reaches outside the directory — `.github/workflows/main.yml` hardcodes
`--filter @baseapp-frontend/components`, so a new package's component tests silently never run.

Read `references/package-scaffold.md` when: starting a new `packages/<name>/`, deciding which conditional file sets a package needs, adding tests or Relay to an existing package, or auditing a package for a missing conventional file.

---
### 2. Package manifest, exports, and dependencies
New packages take Shape B: an `exports` map over TypeScript source subpaths, a `files` allowlist,
`sideEffects: false`, no `main`. One subpath per module leg, so a consumer never deep-imports past a
barrel. Third-party deps are `catalog:` specs, cross-package deps are `peerDependencies` at
`workspace:*`, and React, React Native, MUI, `react-relay`, and `relay-runtime` are always peers —
list them under `dependencies` and the consumer resolves a second React instance.

Read `references/package-manifest.md` when: writing a package's `exports` map, choosing between `dependencies`, `peerDependencies`, and `catalog:` specs, publishing a new subpath, or debugging an import that resolves to nothing.

---
### 3. Module scaffold
A module is `packages/components/modules/<name>/` split into `common/`, `web/`, and `native/`. A web
component directory is `index.tsx` + `styled.tsx` + `types.ts`; a native one replaces `styled.tsx`
with `styles.ts` exporting a `createStyles()` factory. Hook directories are `index.ts` + `types.ts`
carrying `Use<Name>Options` / `Use<Name>Return`; context ships as the `<Name>Provider` / `use<Name>`
/ `with<Name>Provider` triplet. Model on `modules/comments`, not `messages` or `activity-log`.

Read `references/module-scaffold.md` when: adding a module under `packages/components/modules/`, laying out a component or hook directory, naming leaf files, or reviewing a module that mixes `<Name>.tsx` and `type.ts` conventions.

---
### 4. The common/web/native contract
`common/` imports only `common/`; `web/` may import `common/` but never `native/`; `native/` may
import `common/` but never `web/`. `packages/config/.eslintrc-with-restricted-paths.js:6-33`
enforces it, opted into via the package's own `.eslintrc.js` — only `components` and `design-system`
do.
The rule polices paths, not packages, so a `react-native` or `expo-*` import inside `common/` passes
lint and dies on web at runtime, exactly as `messages/common/graphql/mutations/CreateGroupChat.ts`
does today.

Read `references/platform-split.md` when: deciding whether code belongs in `common/`, `web/`, or `native/`, sharing a hook across the two UI legs, injecting a platform-only capability, or debugging a `common/` import that crashes on one platform.

---
### 5. Barrels and the public API
Every leg gets an explicit `index.ts` — `export { default as X } from './X'` plus
`export type * from './X/types'`, never a star-glob, capped at the module's public surface.
Cross-module imports go through the sibling's leg barrel, never a deep relative path. Re-exporting a
`common/` symbol through a platform barrel shadows it: `messages` exports `useRoomListSubscription`
from two legs and a consumer importing both gets whichever resolved last.

Read `references/barrels-and-api.md` when: writing a leg's `index.ts`, deciding what a module exposes publicly, re-exporting types, or tracking down a shadowed export across two barrels.

---
### 6. Relay fragments
One fragment per component, named `<Component>_<propName>`; the component takes a fragment ref,
never raw data, and never reads a field it did not declare. `@argumentDefinitions` / `@arguments`
carry call-site variance — page size, sort, an `@include`-gated section. Documents live under
`<module>/common/graphql/`; `$key` types refs, `$data` types read results. 32 of 37 fragments still
carry the legacy `<Name>Fragment` name; `comments` shows the target, `messages` the counter-example.

Read `references/relay-fragments.md` when: adding a fragment to a component, parameterizing one with `@argumentDefinitions`, composing fragments across modules, or reviewing a component that reads data it never declared.

---
### 7. Root-query ownership
Two shapes ship here and neither wins. Fragment-ref-driven: `comments/web/BaseComments` takes a
`target` fragment ref and runs no query, composing into any page query — the app then owns keeping
that query in sync with the fragment chain. Query-driven: `messages`, `profiles`, `notifications`
run their own root queries and drop in unchanged, paying a render-time fetch the app cannot hoist
or preload. `useLazyLoadQuery` stays on the table; ast-grep `relay-uselazyloadquery-in-list` is
severity `error` because a lazy query in a list row fetches once per row.

Read `references/relay-queries.md` when: deciding whether a module owns its root query or takes a fragment ref, placing a Suspense boundary, choosing a `fetchPolicy`, or diagnosing a request waterfall in a list row.

---
### 8. Connections and pagination
`@connection(key: "<FragmentName>_<fieldName>")`, without exception; `filters:` when the field takes
result-altering args, `filters: []` when it must survive an `orderBy` change. Extract the key to a
`*_CONNECTION_KEY` constant in `common/constants.ts`, derive ids through `get<X>ConnectionId` in
`common/utils.ts`. Twelve live keys use four casings; a mismatch writes where nothing is reading.

Read `references/relay-pagination.md` when: adding `usePaginationFragment` to a list, naming a `@connection` key, deriving a connection id for a mutation, or debugging a list that does not update after an insert.

---
### 9. Mutations and store updates
One file per mutation under `<module>/common/graphql/mutations/`: a `<Name>MutationQuery` document
plus a `use<Name>Mutation` hook returning `[commit, isInFlight]`, toasting via `useNotification()`.
Select `errors { field messages }` in every payload and map them with `setFormRelayErrors`. Prefer
`@prependEdge` / `@deleteEdge` / `@deleteRecord` over a hand-written `updater` — 18 to 3 here.

Read `references/relay-mutations.md` when: writing a `use<Name>Mutation` wrapper, updating a connection from a mutation payload, surfacing payload errors on a form, or reviewing a hand-rolled `updater`.

---
### 10. Subscriptions
One document and one `use<X>Subscription` per file in `<module>/common/graphql/subscriptions/`, the
config wrapped in `useMemo` — unmemoized it re-subscribes on every render. Connection ids come from
`ConnectionHandler.getConnectionID` fed the extracted `*_CONNECTION_KEY`. Subscriptions ride the
`graphql-ws` link at `packages/graphql/config/environment.ts:110-150`; never `new Environment`.

Read `references/relay-subscriptions.md` when: adding a subscription to a module, keeping counters live after a push update, memoizing a subscription config, or debugging a subscription that re-establishes on every render.

---
### 11. Testing, storybook, and shipping
Unit-test `common/` hooks and utils with `renderHook`; per-platform tests stay thin and mock the
shared hook. A tested package physically owns all nine `__mocks__` shims, because
`packages/test/jest.config.ts` resolves `setupFilesAfterEnv` and `moduleNameMapper` against the
consumer's `<rootDir>` — miss one and jest fails inside an unrelated module. Cypress and Storybook
are web-only; reuse `createTestEnvironment` and `withGraphqlTestProviders` from
`@baseapp-frontend/graphql`.

Read `references/testing-and-shipping.md` when: adding jest, Cypress, or Storybook coverage to a block, writing the changeset, running the five done gates, or diagnosing a CI failure on a new package.

---
## Definition of done

Five gates, each with the directory it runs from. The submodule root and a package directory are not
interchangeable — the root has no `relay` script, and a package has no `changeset`.

1. **Unit tests** — `pnpm test:unit` in the package dir (`jest --config ./jest.config.ts`).
2. **Relay artifacts** — `pnpm relay` in the package dir, then `git status --porcelain` over
   `__generated__/` and `schema.graphql`; any diff means code and committed schema disagree.
3. **Lint and types** — `pnpm lint` in the package dir: `eslint --cache` plus `tsc --noEmit`, i.e.
   `eslint . --ext .tsx --ext .ts --cache && tsc --noEmit --incremental`.
4. **Changeset** — `pnpm changeset` at the submodule root; without one the release ships nothing.
5. **ast-grep** — `pnpm lint:ast-grep` at the submodule root (`ast-grep test && ast-grep scan`).
