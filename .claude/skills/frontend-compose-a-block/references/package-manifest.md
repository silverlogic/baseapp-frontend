# Package manifest, exports, and dependencies

`package.json` is the entire public contract of a package: which subpaths a consumer may import,
what gets published, and which copies of React, Relay, and MUI end up in the consuming app's module
tree. The repo carries two incompatible manifest shapes and a new package takes the newer one.
Nothing here is checked by the build — `tsc --build` never reads `exports`, so a subpath that points
at a file that does not exist ships green and fails in the consumer, at import time.

## Contents

- [The two shapes](#the-two-shapes)
- [Shape B in full](#shape-b-in-full)
- [Export conditions](#export-conditions)
- [Dependency-class placement](#dependency-class-placement)
- [Catalog specs](#catalog-specs)
- [Checking a manifest before merge](#checking-a-manifest-before-merge)
- [Anti-patterns](#anti-patterns)

## The two shapes

**Shape B is the target.** `packages/components/package.json` and
`packages/design-system/package.json` — the two most recently maintained packages — both use it.
Shape A is the older barrel form; six packages still carry it and it should not be extended to a
seventh.

| Field | Shape A — barrel | Shape B — subpath exports (target) |
|---|---|---|
| `main` | `"./index.ts"` | absent |
| `types` | `"dist/index.d.ts"` | absent — each subpath resolves types from its own source |
| `exports` | absent | the entrypoint — one entry per module leg |
| `files` | absent | allowlist of source directories plus config |
| root `index.ts` | yes, `export *` per subdirectory | none |
| `sideEffects` | `false` | `false` |
| what ships | contradictory — see below | TypeScript source; the consumer compiles it |
| packages | the six named below | `components`, `design-system` |

Shape A's defect is the `main`/`types` pair. `authentication`, `graphql`, `provider`, `test`,
`utils`, and `wagtail` all declare `main: "./index.ts"`, which is source, next to
`types: "dist/index.d.ts"`, which is built output. The two fields disagree about what the
package ships: a consumer's bundler follows `main` into `.ts` while its type checker reads `.d.ts`
from a `dist/` that `main` never touches. Neither package declares `files`, so `dist/` is published
anyway and the contradiction stays invisible until the two trees drift.

Shape B removes the question. There is no `main`, no root barrel, and no `dist` in `files`; every
module `exports` target is a `.ts` path under a source directory — CSS assets are the exception,
exported through an explicit condition object (see below). `build` — `tsc --build
tsconfig.build.json` — becomes a typecheck-and-emit gate for CI, not the publish artifact.

## Shape B in full

`packages/components/package.json` declares 31 `exports` entries — `./package.json` plus one per
module leg:

```json
{
  "sideEffects": false,
  "exports": {
    "./package.json": "./package.json",
    "./comments/common": "./modules/comments/common/index.ts",
    "./comments/web": "./modules/comments/web/index.ts",
    "./comments/native": "./modules/comments/native/index.ts",
    "./notifications/common": "./modules/notifications/common/index.ts"
  },
  "files": ["modules", "tsconfig.json", "relay.config.js", "schema.graphql", "__generated__"]
}
```

Four rules hold across both Shape B packages:

- **One subpath per leg, never a directory root.** `./comments/common`, `./comments/web`, and
  `./comments/native` are three separate entries. There is no `./comments`, and no wildcard.
- **Declaring `exports` closes the package.** Every path not listed becomes unreachable, including
  deep imports past a barrel. That is the point: the subpath boundary stops being a convention and
  starts being enforced by the resolver.
- **Keep `./package.json` exported.** Tooling that reads a dependency's manifest at runtime breaks
  without it once `exports` is present.
- **`files` must cover every `exports` target.** `components` allowlists `modules`; `design-system`
  allowlists `components`, `hooks`, `layouts`, `providers`, `styles`, `tests`, `utils`. A target
  outside the allowlist resolves locally and 404s from the published tarball.

`sideEffects: false` at the package root is what lets a consumer's bundler drop unused barrel
re-exports. Add per-file exceptions only for files that really do run on import — a CSS import or a
polyfill — as `"sideEffects": ["./styles/globals.css"]`.

`design-system` applies the same pattern one level deeper (`./components/web/buttons`,
`./hooks/common`, `./styles/web/palette`), 58 entries in all.

## Export conditions

**The repo's primary mechanism is explicit subpath exports, not conditions.** Platform selection is
done by the subpath the consumer writes — `@baseapp-frontend/components/comments/native` — so the
resolver never has to guess. No manifest in `packages/` declares a `browser` or `react-native`
export condition. The only condition objects that exist are the two raw-CSS entries in
`packages/design-system/package.json`, each a single `default` key:

```json
"./styles/web/tailwind/globals.css": { "default": "./styles/web/tailwind/globals.css" }
```

When a conditional object is unavoidable, its ordering is a correctness issue, not a style
preference. Node takes the **first** matching condition and stops:

| Position | Condition | Why there |
|---|---|---|
| 1 | `types` | TypeScript must see declarations before any JS resolution logic runs. |
| 2 | `browser` | More specific than the fallback; web bundlers set it. |
| 3 | `react-native` | Metro sets it; must not be reachable from a web build. |
| last | `default` | The fallback. Anything after it is dead. |

Reversing `browser` and `react-native` is the failure Metro's own package-exports rollout calls out:
the native bundle silently picks up the web file, and the first platform-only API it touches throws
at runtime rather than at build time.

## Dependency-class placement

| Dependency | Section | Spec |
|---|---|---|
| Any third-party package | per its role below | `catalog:` / `catalog:<name>` |
| Another `@baseapp-frontend/*` used at runtime | `peerDependencies` | `workspace:*` |
| `@baseapp-frontend/config`, `eslint-plugin`, `tsconfig` | `devDependencies` | `workspace:*` |
| `@baseapp-frontend/test`, only with unit tests | `devDependencies` | `workspace:*` |
| `react`, `react-dom` | `peerDependencies` | `catalog:react19` |
| `react-native` | `peerDependencies` | `catalog:react-native` |
| `@mui/*` — the three MUI packages | `peerDependencies` | `catalog:material-ui` |
| `react-relay`, `relay-runtime` | `peerDependencies` | `catalog:graphql` |

Peer, not dependency, for every row that names a runtime: two copies of React break hooks, two MUI
copies split the theme context, and two `relay-runtime` copies give two stores.

The last two rows are where the repo has not caught up. `react-native`, the three `@mui/*` packages,
`react-relay`, and `relay-runtime` currently sit in `dependencies` in
`packages/components/package.json`, `packages/design-system/package.json`,
`packages/utils/package.json`, `packages/graphql/package.json`, and `packages/wagtail/package.json`.
Declare them as peers in a new package. A regular dependency lets the installer resolve a second
copy under the package rather than deduplicating on the app's, and a second `relay-runtime` gives a
second store that no fragment written against the first can read.

`react` is already a peer everywhere it appears, at `catalog:react19` without exception.

## Catalog specs

Every third-party version in all eleven package manifests is a `catalog:` or `workspace:` spec —
there is not one raw semver range in the tree. Versions live in `pnpm-workspace.yaml` under the
default `catalog:` plus twelve named catalogs: `react19`, `react18`, `react-native`, `graphql`,
`tailwind`, `material-ui`, `test`, `storybook`, `lint`, `components`, `design-system`, `utils`.

Pick the named catalog that matches the dependency's role and add the package there if it is new.
Cross-package specs are `workspace:*`. The lone exception is `@baseapp-frontend/config` at
`workspace:^` in `packages/components/package.json` — a one-off, not a pattern to copy.

## Checking a manifest before merge

Two checks, because nothing else runs them:

1. **Every `exports` target resolves to a file that exists.** At the time of writing,
   `packages/components/package.json` fails this three times: `./content-feed/native` points at
   `./modules/content-feed/native/index.ts` and no `native` directory exists under
   `modules/content-feed/` at all, while `./tests/common` and `./tests/native` point into
   directories that hold only a `.keep`.
2. **Every `exports` target sits under a path named in `files`.** Otherwise it works in the
   workspace, where pnpm links the source directory, and is missing from the published tarball.

## Anti-patterns

- Do not give a new package `main: "./index.ts"` alongside `types: "dist/index.d.ts"` — the two
  fields disagree about whether source or `dist/` is what ships, and no build step catches it.
- Do not add a root `index.ts` barrel to a Shape B package — it reintroduces the single entrypoint
  the `exports` map exists to replace, and nothing routes to it.
- Do not publish an `exports` subpath without opening its target file — `"./content-feed/native"` in
  `packages/components/package.json` points at a directory that does not exist, and the failure
  surfaces only when a consumer imports it.
- Do not export a directory root or a wildcard — one entry per module leg, so a consumer cannot
  deep-import past a barrel.
- Do not drop `"./package.json": "./package.json"` from the map — tooling that reads a dependency's
  manifest fails once `exports` is declared.
- Do not put `default` anywhere but last in a conditional object, or `types` anywhere but first —
  first match wins, so a misordered map silently resolves the wrong file.
- Do not list `react-native`, `@mui/*`, `react-relay`, or `relay-runtime` under `dependencies` — the
  consumer resolves a second copy, and a second Relay runtime carries a second, unreadable store.
- Do not write a raw semver range in a package manifest — every version belongs in a
  `pnpm-workspace.yaml` catalog so eleven packages move together.
- Do not add a source directory without adding it to `files` — it resolves in the workspace and is
  absent from the tarball.
- Do not omit `sideEffects: false` — every barrel re-export the consumer does not use stays in its
  bundle.
