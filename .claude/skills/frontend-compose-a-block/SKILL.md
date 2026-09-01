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
