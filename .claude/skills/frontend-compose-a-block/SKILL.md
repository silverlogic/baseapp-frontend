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
