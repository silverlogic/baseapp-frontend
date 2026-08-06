# ast-grep Rules

[ast-grep](https://ast-grep.github.io/) rules that statically enforce the BaseApp
frontend code guidelines. The rules live here in **baseapp-frontend** and are shared
with consuming projects the same way the agent skills are: the template symlinks
`.ast-grep` → `baseapp-frontend/.ast-grep` and keeps its own `sgconfig.yml` at the
repo root.

They run on **both CI surfaces**:

- **GitHub Actions** (this repo) — the `ast-grep` step in
  `.github/workflows/main.yml` runs `pnpm lint:ast-grep` (`ast-grep test` +
  `ast-grep scan`) against the packages.
- **Jenkins** (consuming template) — the `Web: AstGrep` lint stage runs the same
  script, which excludes this submodule (linted here) via `--globs '!baseapp-frontend'`.

## Installation

`@ast-grep/cli` is a root dev dependency in both repos (`catalog:lint`), so
`pnpm install` is all you need — the same way eslint/prettier are available.

In a consuming project, `.ast-grep` is a symlink into the submodule, so the submodule
must be initialized (`git submodule update --init --recursive`) before the rules resolve.
Otherwise ast-grep reports no rules found.

## Usage

From a **consuming project** root (the submodule is excluded — it's linted in this
repo's own CI):

```bash
pnpm lint:ast-grep                              # test + scan, what CI runs
pnpm exec ast-grep scan --globs '!baseapp-frontend'
```

From **this repo's** root:

```bash
pnpm lint:ast-grep
pnpm exec ast-grep scan
```

Run a single rule with `--filter <rule-id>`, e.g.
`pnpm exec ast-grep scan --filter '^mui-sx-prop-limit$'`.

`ast-grep scan` exits non-zero only when a **severity: error** rule matches —
warnings and hints are informational.

## Language handling

Every rule is `language: Tsx`, and both `sgconfig.yml` files map `*.ts` onto the TSX
grammar via `languageGlobs`. Without that mapping, ast-grep parses `.ts` with the
TypeScript grammar and `.tsx` with the TSX grammar as two separate languages, so every
type-level rule would need a duplicate file per extension. The one cost: a `.ts` file
using the old-style generic arrow `<T>(x: T) => x` (TSX reads `<T>` as a JSX tag) parses
with an error node around that expression. tree-sitter recovers, so matches elsewhere in
the file are unaffected — write `<T,>` if you want a clean parse.

Hidden directories (`.storybook/`, `.scripts/`) are skipped by ast-grep, same as
ripgrep. `**/__generated__/**` is ignored explicitly on the rules that would otherwise
fire on Relay's generated types.

## Rules

The `See ...` paths in rule messages point at the `frontend-conventions` /
`frontend-patterns` skill reference files, which live in the consuming template
(`.claude/skills/`). The same conventions are written up in the template's
[`CODE-GUIDELINES.md`](../../CODE-GUIDELINES.md).

### TypeScript

| Rule | Severity | Convention |
|---|---|---|
| `ts-no-enum` | warning | No TS enums — `as const` object + `ValueOf`, or a union type (typescript.md) |
| `ts-no-type-name-prefix` | warning | No `I` prefix on interfaces, no `T` prefix on type aliases (typescript.md) |
| `ts-props-use-interface` | warning | `*Props` declared as `interface`, not a `type` alias (typescript.md) |
| `ts-loose-autocomplete` | warning | Bare `string` in a literal union → `(string & {})` (typescript.md) |
| `ts-types-not-in-index` | warning | `index.tsx` only — types belong in a sibling `types.ts` (file-structure.md) |

### Next.js / React

| Rule | Severity | Convention |
|---|---|---|
| `next-no-img-element` | **error** | `apps/web/**` only — `next/image`, never a raw `<img>` (image-optimization.md) |
| `next-image-no-custom-loader` | warning | No custom `loader` on `<Image>` — it disables all optimization (image-optimization.md) |
| `next-image-explicit-dimensions` | warning | `<Image>` needs `width` + `height`, or `fill` (image-optimization.md) |
| `next-page-no-use-client` | warning | `page.tsx` stays a Server Component (server-components.md) |
| `next-page-no-client-data-fetching` | warning | `page.tsx` prefetches server-side, no client fetch hooks (rest-data-fetching.md) |
| `next-prefer-link-over-router-push` | warning | Web only — static destination → `next/link`, not `router.push` (internal-routing.md) |
| `react-no-data-fetching-in-useeffect` | warning | Tanstack Query / Relay, not `useEffect` + manual state (rest-data-fetching.md) |

### Styling

| Rule | Severity | Convention |
|---|---|---|
| `mui-sx-prop-limit` | warning | More than 3 `sx` props → extract to `styled.tsx` (styling.md) |
| `mui-no-hardcoded-color` | warning | No hex colors in `styled()` / `sx` / `StyleSheet.create` — use theme tokens (styling.md) |
| `mui-styled-not-in-index` | warning | `styled()` lives in `styled.tsx`, not `index.tsx` (styling.md) |
| `tailwind-no-raw-text-size` | warning | `prose-*` classes instead of `text-sm` / `text-lg` / … (styling.md) |
| `ds-prefer-baseapp-wrapper` | warning | `apps/**` only — BaseApp wrapper over the raw MUI primitive (styling.md, dialog.md) |
| `native-styles-not-in-index` | warning | `StyleSheet.create` lives in `styles.ts` (styling.md) |
| `native-use-design-system-theme` | warning | Native `useTheme` comes from `design-system/providers/native` (styling.md) |

### Data, forms, state

| Rule | Severity | Convention |
|---|---|---|
| `relay-uselazyloadquery-in-list` | **error** | A `useLazyLoadQuery` component rendered per row — one query per item (graphql-data-fetching.md) |
| `relay-withrelay-requires-fallback` | warning | `withRelay` always gets a `fallback` (graphql-data-fetching.md) |
| `query-no-inline-query-key` | warning | Query keys come from the service's `*_API_KEY` object (rest-data-fetching.md) |
| `form-useform-requires-generic` | warning | `useForm<MyFormType>()` — always typed (forms.md) |
| `form-no-other-form-libraries` | **error** | react-hook-form + zod only — no Formik / final-form (forms.md) |
| `form-submit-use-loading-button` | warning | `LoadingButton` for submit, not a plain `Button` (forms.md) |
| `state-no-redux` | **error** | Zustand for client state, never Redux (state-management.md) |
| `state-zustand-no-global-store` | warning | No module-level `create(...)` — it leaks across SSR requests (state-management.md) |

### Severity policy

A rule is `error` (and therefore gating) only when **both repos are already clean**, so
adding it to the pipeline can't break the first build. Everything else ships as
`warning`: visible in every build, not gating.

These rules have known pre-existing violations and should graduate to `error` once the
violations are fixed — that's the concrete follow-up:

| Rule | Violations |
|---|---|
| `next-image-no-custom-loader` | 2 in `packages/wagtail` (removing the loader needs `remotePatterns` in consumers first) |
| `ts-no-enum` | `packages/utils/constants/languages.ts` (`LanguagesEnum` is a published export — breaking change), 1 in the template |
| `next-page-no-use-client` | 7 template pages under `(static-layout)` |
| `state-zustand-no-global-store` | 2 in the template's `(.baseapp)/examples/state-management` |

## Testing rules

Every rule has a test file in `rule-tests/` with `valid:` (must not match) and
`invalid:` (must match) snippets, plus accepted snapshots in `rule-tests/__snapshots__/`.

```bash
pnpm exec ast-grep test       # verify
pnpm exec ast-grep test -U    # accept new/changed snapshots
```

## Limitations

Some guidelines can't be expressed as AST patterns and stay in code-review territory:

- **Cross-branch imports** (component-hierarchy.md) — ast-grep matches nodes, not
  resolved paths, so it can't tell an upward import into a shared `utils/` from a
  sideways import into a sibling feature. Import *depth* is not a usable proxy: the
  repos are full of legitimate deep relative imports to higher shared levels.
- **One fragment per component** (graphql.md) — requires knowing which components
  consume a fragment.
- **`useLazyLoadQuery` rendered per row, across files** — `relay-uselazyloadquery-in-list`
  only fires when the component and the list that renders it are in the *same* file, since
  ast-grep has no cross-file symbol resolution. The common layout (`ChatRooms/index.tsx`
  maps over `ChatRoomItem/index.tsx`) is invisible to it. It also correlates on
  `const Comp = ...` declarations only — the handful of `function Comp()` components here
  are page and layout defaults, which are never rendered in a loop. Reviewing whether a
  query-running component can be rendered more than once stays a human check.
- **File-structure completeness** — "extract constants to `constants.ts`", "extract
  helpers to `utils.ts`". `ts-types-not-in-index` and `mui-styled-not-in-index` cover
  the two mechanical cases; the rest needs judgement about what counts as a helper.
- **Tailwind as a last resort** — whether `styled`/`sx` *could* have expressed a given
  style is not decidable from the AST.
- **Route group placement** (`(dynamic-layout)` vs `(static-layout)`) — depends on
  whether the page needs server-side cookie access.
- **Dialog state ownership and dialog placement outside layout containers**
  (dialog.md) — structural intent, not syntax.

## Contributing new rules

1. Add `rules/<category>-<feature>.yml`. Use `language: Tsx` (the `*.ts` mapping in
   `sgconfig.yml` covers both extensions). Do NOT add path ignores that could match the
   repo's own checkout directory name.
2. Add `rule-tests/<rule-id>-test.yml` with valid/invalid cases.
3. Run `pnpm exec ast-grep test -U` and commit the snapshot.
4. Make sure `ast-grep scan` stays error-free in BOTH repos — a new `severity: error`
   rule must pass on the packages here and on the template's `apps/`, or be scoped with
   `files:` like `next-no-img-element`. Otherwise ship it as a `warning`.
5. Point `message` at the relevant skill reference file and add a row to the tables above.
