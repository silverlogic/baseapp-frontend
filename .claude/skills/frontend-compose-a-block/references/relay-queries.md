# Root-query ownership

Every fragment chain ends at a root query, and something has to run it. Two module shapes ship
here: one takes a fragment ref and lets the consuming app's page query own the fetch, the other
runs a root query inside the module and asks the app for nothing. Both are live at this commit and
both have consumers. The choice is made once, in the component's props — a module that ships
query-driven cannot later be spread into a page query without a breaking change to its public API.
Paths are relative to `packages/components/modules/` unless a `packages/` prefix says otherwise.

## Contents

- [The two shapes](#the-two-shapes)
- [Fragment-ref-driven: the app owns the query](#fragment-ref-driven-the-app-owns-the-query)
- [Query-driven: the module owns the query](#query-driven-the-module-owns-the-query)
- [What a lazy query costs](#what-a-lazy-query-costs)
- [Preloading, in the package and above it](#preloading-in-the-package-and-above-it)
- [Suspense placement](#suspense-placement)
- [`fetchPolicy`](#fetchpolicy)
- [Per-package Relay wiring](#per-package-relay-wiring)
- [Where the neighbouring skills take over](#where-the-neighbouring-skills-take-over)
- [Anti-patterns](#anti-patterns)

## The two shapes

|  | Fragment-ref-driven | Query-driven |
|---|---|---|
| Modules | `comments` | `messages`, `profiles`, `notifications` |
| Entry prop | a `$key` fragment ref | plain props; no data prop |
| Fetch runs | in the app's own page query | in the module, at render time |
| App writes | a query spreading the fragment | the mount, nothing else |
| Composes | into any query on that node | one request per mounted instance |
| Cost | app query and fragment chain drift apart | a render-time fetch the app cannot hoist |

Both columns describe shipped code. Neither is the repo's stated default and this file does not
name one — pick per module from the two cost rows, then hold it. Twenty-four root query documents
live under `modules/` outside harnesses: 11 in `profiles`, 5 in `messages`, 3 in `notifications`, 2
each in `content-feed` and `pages`, 1 in `activity-log`; `comments`, `navigations` and `__shared__`
declare none.

## Fragment-ref-driven: the app owns the query

The component takes a `$key`, reads it with `useFragment`, and never touches a query.
`comments/web/BaseComments` (`BaseComments`) is the pattern in one file:

```tsx
const BaseComments: FC<BaseCommentsProps> = ({ target: targetRef, ... }) => {
  const target = useFragment(CommentsFragmentQuery, targetRef)
  if (!target.isCommentsEnabled) return null
  return <Container>{/* CommentsList target={target}, CommentCreate targetObjectId */}</Container>
}
```

`comments/common/index.ts` re-exports `CommentsFragmentQuery`, so the app spreads
`...CommentsFragment` onto a node it already fetches and passes the ref down. The module opens no
request, so a page rendering comments beside a profile and a feed still issues one query.

Ship the app's starting point too. `pages/common/graphql/queries/Page.tsx` (`PageURLPathQuery`) is
a root query exported with **zero callers inside the package**, written for the app to run: it
selects `urlPath(path:)` and spreads `...MetadataFragment` plus `... on Page` and `... on Profile`
module fragments off the polymorphic `target`. The app copies it instead of rebuilding the chain,
so a schema change that breaks the chain breaks a document living in this repo.

## Query-driven: the module owns the query

The component calls `useLazyLoadQuery` itself and the app mounts it with no data plumbing.
`notifications/web/NotificationsList` (`NotificationsList`) is the shape:

```tsx
const options = { count: 10 }
const { me } = useLazyLoadQuery<NotificationsListQueryType>(NotificationsListQuery, options, {
  fetchPolicy: 'store-and-network',
})
```

`me` is handed straight to `usePaginationFragment`. Eighteen production call sites use this hook —
7 in `messages/native`, 2 in `messages/web`, 4 in `notifications`, 5 in `profiles/web` — plus 15 in
`__storybook__` and `__tests__` wrappers, where a harness owning its own query is correct. 33 in
the tree.

The document is still exported — `messages/common/index.ts` re-exports its four query documents, as
`notifications/common` and `profiles/common` do theirs — so an app can run or preload the same
document. The component's own call runs regardless, so that preload helps only to the extent the
store answers it (see `fetchPolicy`).

## What a lazy query costs

`useLazyLoadQuery` fetches during render: the request starts when React reaches the component, so
one mounted inside another query's result cannot begin until that result arrives. The Relay docs
name this as the mechanism that "can trigger nested or waterfalling round trips, and can degrade
performance" — stack two levels and time-to-data is the sum of the requests, not the max.

The per-row case is enforced. `.ast-grep/rules/relay-uselazyloadquery-in-list.yml` ships at
severity **error**: it flags a component declared in the same file that calls `useLazyLoadQuery`
and is then rendered from a `.map`/`.flatMap`, or passed to an `itemContent`, `renderItem` or
`ItemContent` prop. One instance per row is one request per row, and a virtualized list re-fires as
scrolling mounts new rows. `pnpm lint:ast-grep` (`ast-grep test && ast-grep scan`) runs it in this
repo's GitHub Actions and in the template's Jenkins `Web: AstGrep` stage.

Two owners describe this differently and both statements stand. The template's `frontend-patterns`
prescribes preload-first for `apps/web` — `loadSerializableQuery` plus `usePreloadedQuery`, lazy
fetching kept for what preloading cannot reach, "a couple per screen is fine". This package went
the other way: 18 call sites against one preload site. Know which repo you are writing in.

## Preloading, in the package and above it

Inside the package, preloading exists exactly once. `messages/web/ChatRoomsComponent`
(`ChatRoomsComponent`) holds the refs and loads on the interaction that reveals the panel:

```tsx
const [groupDetailsQueryRef, loadGroupDetailsQuery] =
  useQueryLoader<GroupDetailsQueryType>(GroupDetailsQuery)
loadGroupDetailsQuery({ roomId: selectedRoom }, { fetchPolicy: 'network-only' }) // in the handler
```

Three components take a `queryRef` prop and call `usePreloadedQuery(Query, queryRef)`:
`messages/web/GroupChatDetails`, `messages/web/GroupChatEdit`, `messages/web/ProfileSummary`.
Copy this when a module knows the interaction that precedes its own data.

Above the package, `@baseapp-frontend/graphql` owns the SSR path: `loadSerializableQuery`
(`packages/graphql/config/loadSerializableQuery.ts`) runs a query in a Next.js Server Component and
returns a serialisable payload; `useSerializablePreloadedQuery` turns it back into a
`PreloadedQuery`; `withRelay` (`packages/graphql/utils/withRelay`) maps a `preloadedQuery` prop to a
`queryRef` prop and brings its own `<Suspense>`, defaulting to `fetchPolicy: 'store-and-network'`
and a `'Loading...'` fallback (`.ast-grep/rules/relay-withrelay-requires-fallback.yml`, severity
`warning`, asks for a real one). **None of the three appears in `packages/components/modules/`** —
they are app-level, and a module reaching for them asserts it renders as a route. `loadEntryPoint`
and `useEntryPointLoader` have zero occurrences in `packages/` at all.

## Suspense placement

A query-driven component suspends, so it ships its own boundary as a **self-suspending default
export**: the working component stays a local const, and the default export wraps it.

```tsx
const NotificationsListSuspended: FC<NotificationsListProps> = (props) => {
  const { LoadingState = DefaultLoadingState, LoadingStateProps = {} } = props
  return (
    <Suspense fallback={<LoadingState {...LoadingStateProps} />}>
      <NotificationsList {...props} />
    </Suspense>
  )
}
export default NotificationsListSuspended
```

Eighteen production components do this. The fallback is a design-system `LoadingState` or
`LoadingScreen`, or a shaped skeleton, taken from props wherever a consumer may want to replace it.
The name is split: `Suspended<Name>` in `messages` and `notifications/native` (12) against
`<Name>Suspended` in `notifications/web` and `profiles/web` (6) — either resolves, keep one per
module. Two wrappers render a bare `<Suspense>` with no fallback at all
(`messages/native/ChatRoomPage/MessagesList`, `profiles/web/profile-popover/AddProfileMenuItem`).
`comments/native/CommentItem` wraps a `React.lazy` replies list in `<Suspense fallback={null}>`,
which breaks recursion rather than covering a query.

There is **no ErrorBoundary anywhere in `modules/`** — a failed query propagates to whatever the
consuming app mounted, and if it mounted none, the module takes the page down.

## `fetchPolicy`

Relay takes four values wherever a query starts: `store-or-network` (the default — cache first,
network only when data is missing), `store-and-network` (cache first *and* refetch), `network-only`
and `store-only`. What this repo passes:

| Policy | Values passed | Where |
|---|---|---|
| `store-and-network` | 20 | every query-driven mount, and most `refetch` calls |
| `network-only` | 7 | `AllChatRoomsList` (3), both `ChatRoomsComponent` loaders, two refetches |
| `store-or-network` | 1 | `comments/common/hooks/useCommentItem` (`expandReplies`) |
| `store-only` | 0 | — |

The convention: `store-and-network` on the initial read, so a remount paints from cache and then
corrects itself; `network-only` on an action whose point is fresh data — a search, a tab change.
Nothing passed means `store-or-network`, right when a sibling already owns the record;
`useCommentItem`'s `expandReplies` is the one place naming it. `store-and-network` also makes an
app-level preload worth something to a query-driven module: the environment's `QueryResponseCache`
holds 100 entries (`packages/graphql/config/environment.ts:178`) on a 5-second `CACHE_TTL`
(`packages/graphql/config/environment.ts:28`).

## Per-package Relay wiring

Wiring is per package, not per monorepo, and it is five things. Copy them from
`packages/components`:

1. **`relay.config.js`** — one line, no local options:
   `module.exports = require('@baseapp-frontend/config/relay.config.ts')`. The shared config sets
   `src: './'`, `schema: './schema.graphql'` and `language: 'typescript'`
   (`packages/config/relay.config.ts:2-3,14`), and centralises output with
   `artifactDirectory: './__generated__'` (`:15`).
2. **`schema.graphql` at the package root, committed** — 2,236 lines in `packages/components`.
   It is the compiler's input, so it is code, not a build artifact.
3. **`__generated__/` gitignored with a tracked `.keep`** — `packages/components/.gitignore` ends
   `/__generated__` then `!/__generated__/.keep`. Artifacts are rebuilt, never reviewed; the
   `.keep` stops the relative imports out of `modules/` dangling on a fresh clone.
4. **Three scripts** — `relay` (`relay-compiler`), `relay:download-schema` (`get-graphql-schema`
   against `$NEXT_PUBLIC_RELAY_ENDPOINT`, overwriting `schema.graphql`) and `relay:update-schema`
   (the two in order). A new backend field means running the third.
5. **`pnpm relay &&` in front of the build** — `rm -rf dist && pnpm relay && tsc --build
   tsconfig.build.json`, with `storybook` and `test:component` prefixed alike. Without it, `tsc`
   compiles against whatever the last run left behind.

`packages/wagtail` is where this goes wrong, and it is what a reader finds by copying the nearest
Relay-shaped neighbour. It carries `relay.config.js`, the same three `relay:*` scripts,
`babel-plugin-relay` and `relay-compiler` in devDependencies, a tracked `__generated__/.keep` and a
2,189-line committed `schema.graphql` — and **zero `graphql` tagged documents**. Its `build` skips
the compiler (`rm -rf dist && tsc --build tsconfig.build.json`) and its `.gitignore` never got the
`/__generated__` entries. Copy it and you inherit a schema nothing validates against.

## Reuse from `@baseapp-frontend/graphql`, never rebuild

A block consumes this package's Relay surface. Rebuild any of it and you get two environments in
one app, each with its own store.

- **`createEnvironment`** (`packages/graphql/config/environment.ts`) — never `new Environment`.
  Exactly one occurrence of that constructor exists repo-wide, and it is inside this factory.
- **`useEnvironment`** (`packages/graphql/config/useEnvironment`) — returns a fresh environment per
  SSR render and a memoised singleton on the client. Do not memoise one yourself.
- **`RelayProvider`** (`packages/graphql/providers/RelayProvider`) — mount this, not
  `RelayEnvironmentProvider` directly; the wrapper carries the `'use client'` boundary.
- **`getGraphQLErrorMessage`** (`packages/graphql/utils/getGraphQLErrorMessage`) — pulls the
  server's text off `error.graphQLErrors`. Reading `error.message` gets the verbose
  `Error fetching GraphQL query …` wrapper instead.
- **`useInvalidateRelayStore`** (`packages/graphql/config/useInvalidateRelayStore.ts`) — the
  sanctioned way to clear the store on logout, rather than hand-rolling `commitLocalUpdate`.

`createTestEnvironment` and `withGraphqlTestProviders` come from the same package.

## Where the neighbouring skills take over

- App-level fetching — server preloading in a `page.tsx`, `withRelay` on the client component and
  the preload-first rule for `apps/web` — is
  `frontend-patterns/references/graphql-data-fetching.md`, template-side.
- Gating a page or component on a backend permission, via `CheckMountPermissionWrapperFragment`
  spread into the page query and read by `CheckPermissionWrapper`, is
  `frontend-patterns/references/graphql-permissions.md`, also template-side.
- Fragment naming, refs and `@argumentDefinitions` are the fragments section of this skill;
  `@connection` keys and `usePaginationFragment` the pagination section; writes and live updates
  the mutations and subscriptions sections.

## Anti-patterns

- Adding a root query to a module that already takes a fragment ref — the two fetches race, and the
  app loses the single-query composition it chose that module for.
- Switching a shipped module between the two shapes in a minor release — the entry prop is the
  public API, so every consumer breaks at the type level, at best.
- Calling `useLazyLoadQuery` from a component rendered once per row — `.map`, `itemContent` or
  `renderItem` multiplies it by the row count, and the ast-grep rule fails the build at `error`.
- Nesting one lazy query under another query's result — the inner request cannot start until the
  outer resolves, and the page waits for the sum.
- Shipping a suspending component without its own boundary — 18 default exports here wrap
  themselves, and a consumer that forgets gets a blank route.
- Rendering `<Suspense>` with no fallback, or one the consumer cannot replace — two wrappers here
  show nothing at all until data lands.
- Reaching for `withRelay` or `loadSerializableQuery` inside `modules/` — zero usages there, and
  both assume a Next.js route the package does not own.
- Passing `network-only` on an initial mount — every remount refetches, where `store-and-network`
  paints from cache and corrects, as 20 of the 28 policy values here do.
- Copying Relay wiring from `packages/wagtail` — full apparatus, zero documents, and a `build` that
  never runs the compiler.
- Committing `__generated__` output — it is gitignored but for `.keep`, and the compiler runs in
  `build`, `storybook` and `test:component`.
