# Relay fragments

A fragment is the unit of data ownership. The component that declares one is the only component
allowed to read its fields, and Relay enforces that by masking everything else out of the read
result. Share a fragment between two components, or hand a parent's read result down as a prop, and
the masking is gone: a field removed three components away still type-checks and renders `undefined`
in production, inside a consuming app you do not control. All 37 fragments in this repo live under
`packages/components/modules/`; paths below are relative to that directory.

## Contents

- [One fragment per component](#one-fragment-per-component)
- [Naming the fragment](#naming-the-fragment)
- [Where the document lives](#where-the-document-lives)
- [Fragment arguments](#fragment-arguments)
- [Typing the ref and the read result](#typing-the-ref-and-the-read-result)
- [Where the neighbouring skills take over](#where-the-neighbouring-skills-take-over)
- [Anti-patterns](#anti-patterns)

## One fragment per component

Every component that renders GraphQL-backed data declares one fragment **per data-bearing prop**,
accepts each as a **fragment ref**, and reads it with `useFragment`, `useRefetchableFragment` or
`usePaginationFragment`. One prop is the common case; `CommentItem` takes two because it renders a
comment against a separate target. It never accepts already-read data, and never reads a field
it did not declare. `comments/web/CommentItem/types.ts` is the shape to copy — the prop is the
ref, not a row, with the injectable-slot props on `CustomizableCommentItemProps` elided:

```ts
export interface CommentItemProps extends CustomizableCommentItemProps {
  comment: CommentItem_comment$key
  target: CommentItem_target$key
  currentThreadDepth: number
  subscriptionsEnabled: boolean
  onReplyClick?: () => void
}
```

The read happens once, in the shared hook: `comments/common/hooks/useCommentItem/index.ts`
(`useCommentItem`) calls `useRefetchableFragment<CommentItemRefetchQuery, CommentItem_comment$key>`
and returns `comment` as `CommentItem_comment$data`. Web and native both consume that hook, so one
declaration and one read serve however many legs render it.

A parent **spreads** a child fragment and never reads through it.
`comments/common/graphql/queries/CommentsList.ts` (`CommentsListFragmentQuery`) spreads
`...CommentItem_comment` inside `edges.node` and selects only `id` and `isPinned` for itself.
Composition is transitive and crosses modules: `pages/common/graphql/fragments/Page.ts` spreads
`...CommentsFragment`, so `pages` never learns what a comment holds.

The repo is split on the rule at this commit: **40 `$key`-typed props across 37 component
`types.ts` files** follow it, **30 `$data`-typed props across 29 files** break it. The clearest
cluster is `content-feed/web/{PostHeader,PostFooter,PostItemImages}/types.ts`, all three taking
`post: ContentPost_post$data` from a parent that read the fragment for them — none can move to
another query without that parent.

## Naming the fragment

Name the fragment `<Component>_<propName>`: the prefix is the component that declares it, the suffix
the prop it arrives on. Fragment names are global across the compiler's scope, so the prefix is what
stops two modules colliding and the suffix is what tells a reader which prop to pass it to.

| Form | Example | At this commit | Verdict |
|---|---|---|---|
| `<Component>_<propName>` | `CommentItem_comment` | 5 of 37 | Use this for every new fragment |
| `<Name>Fragment` | `RoomsListFragment` | 32 of 37 | Legacy — do not add more |

The five idiomatic ones are `CommentItem_comment`, `CommentItem_target` and `CommentsList_comments`
(`comments/common/graphql/queries/`), `ContentPost_post`
(`content-feed/common/graphql/fragments/ContentPost.ts`) and `ReactionButton_target`
(`__shared__/common/ReactionButton/index.tsx`). The other 32 — `RoomsListFragment`,
`NotificationItemFragment`, `ProfilesListFragment`, `MessageItemFragment` and the rest — carry a
suffix that encodes the document's *kind* instead of its owner and its prop.

`comments` holds both forms in one directory: `queries/Comments.ts` declares `CommentsFragment`
beside `CommentItem_comment` — the state to converge out of, not a licence to pick either. Two
further mismatches sit in code that otherwise uses the good form: `CommentsList_comments` arrives
on a prop named `target` (`comments/web/CommentsList/types.ts`); `ContentPost_post` is declared for
`content-feed/web/PostItem`, whose prop is `postRef`. Reproduce neither.

The exported const is split too: 28 use the bare fragment name, 7 use `<Name>FragmentQuery`, and
`profiles/common/graphql/fragments/AllProfilesList.ts` exports it as `fragmentQuery`, a name with no
owner in it. Export as `<FragmentName>Query` or as the fragment name; both are unique.

## Where the document lives

The `graphql` tag does not sit beside the component. It lives in `<module>/common/graphql/`, split
by operation kind, and the component imports the exported const:

```text
<module>/common/graphql/
├── fragments/       # fragment documents
├── queries/         # query documents
├── mutations/       # mutation documents
└── subscriptions/   # subscription documents
```

Keeping it in `common/` is what lets one document feed both UI legs. 104 files under `modules/`
carry a `graphql` tag and only two production files put one elsewhere:
`__shared__/common/ReactionButton/index.tsx` declares `ReactionButton_target` inline and never
exports it, and `messages/native/graphql/queries/CreateRoomPageQuery.ts` binds a data document to a
single platform. The other 13 sit under `__storybook__/` or `__tests__/`, where a harness owning
its own document is correct.

Two directory conventions coexist, and a new module must pick the first:

| Convention | Modules | Fragments |
|---|---|---|
| `graphql/fragments/` + `graphql/queries/` split | messages, profiles, content-feed, pages | 27 |
| Fragments filed under `graphql/queries/` | comments, notifications, activity-log | 9 |

The second reads as a query file until opened: `comments/common/graphql/queries/CommentItem.ts` is
100% fragments, and `notifications/common/graphql/queries/NotificationsList.ts` holds a query and a
fragment together. File a fragment under `graphql/fragments/`, a query under `graphql/queries/`,
never two kinds in one file.

## Fragment arguments

When one leaf component needs different data at different call sites — a page size, a sort, an
optional section — parameterize its fragment with `@argumentDefinitions` rather than forking the
component or over-fetching in the parent. 18 fragment files declare argument definitions; 12 spread
sites pass `@arguments`. Three uses, all present in the tree.

**Call-site sizing, sort and search** — `comments/common/graphql/queries/CommentsList.ts`, with the
connection's own selection set elided. A field argument must have a matching definition or the
document will not compile. The reverse does not hold: a definition can drive an `@include` or a
nested spread rather than a field, as `isCommentsOpened` does below, and a defaulted argument may be
omitted at a spread site — that is what `defaultValue` is for.

```graphql
fragment CommentsList_comments on CommentsInterface
@refetchable(queryName: "CommentsListPaginationQuery")
@argumentDefinitions(
  count: { type: "Int", defaultValue: 5 }
  cursor: { type: "String" }
  orderBy: { type: "String", defaultValue: "-is_pinned,-created" }
  q: { type: "String" }
) {
  id
  comments(first: $count, after: $cursor, q: $q, orderBy: $orderBy)
    @connection(key: "CommentsList_comments", filters: []) {
    edges { node { id isPinned ...CommentItem_comment } }
  }
  ...CommentItem_target
}
```

**A boolean gate for a lazy section** — `comments/common/graphql/queries/Comments.ts` declares
`isCommentsOpened` and gates the whole list on it, so a collapsed thread costs nothing:

```graphql
fragment CommentsFragment on CommentsInterface
@refetchable(queryName: "CommentsRefetchQuery")
@argumentDefinitions(isCommentsOpened: { type: "Boolean", defaultValue: true }) {
  id
  # __typename, isCommentsEnabled and commentsCount elided
  ...CommentsList_comments @include(if: $isCommentsOpened)
  ...CommentItem_target
}
```

`CommentItem_comment` applies the same technique recursively, for `isRepliesExpanded`.

**Literal arguments at the spread** — a parent that knows the value passes it inline:
`messages/common/graphql/mutations/UpdateChatRoom.ts` spreads
`...MembersListFragment @arguments(count: 5)`, and
`content-feed/common/graphql/fragments/ContentPost.ts` spreads
`...ContentPostImageFragment @arguments(width: 600, height: 0)`. Two compiler rules to know before
writing one: an argument marked required carries no `defaultValue`, and a definition cannot combine
a `provider` with a `defaultValue`.

## Typing the ref and the read result

`$key` types the ref, `$data` types what the read gives back. Both are generated, and both are
imported by a **relative path** up to the package root, never an alias — all 185 files under
`modules/` that touch `__generated__` do it that way.
`comments/common/hooks/useCommentItem/types.ts` imports both from one document:

```ts
import {
  CommentItem_comment$data,
  CommentItem_comment$key,
} from '../../../../../__generated__/CommentItem_comment.graphql'

export interface UseCommentItemOptions {
  comment: CommentItem_comment$key
  // four presentational options elided: threadDepth, maxThreadDepth,
  // useProfileId, profilePath
}
export interface UseCommentItemReturn<TElement = unknown> {
  comment: CommentItem_comment$data
  refetchCommentItem: RefetchFnDynamic<CommentItemRefetchQuery, CommentItem_comment$key>
  // thirteen further members elided: the expand/reply/delete handlers and their flags
}
```

`$key` on the way in, `$data` on the way out. Utilities take the narrowest slice rather than the
whole read result — `comments/common/utils.ts` (`toCommentEditTarget`) types its input
`Pick<CommentItem_comment$data, 'id' | 'body' | 'mentions'>`, so adding a field to the fragment does
not widen the util's contract.

The generated file is named after the fragment, and `packages/components/.gitignore` ignores
`/__generated__` while keeping `!/__generated__/.keep` — the directory is rebuilt by `pnpm relay`,
which `build` runs before `tsc`. Renaming a fragment renames its module, so every relative import
breaks at compile time; that failure is intended, loud and local. Query operation types collide
with the exported document const, so alias on import: `ChatRoomQuery as ChatRoomQueryType`.

## Where the neighbouring skills take over

- The template repo colocates a `graphql/` folder beside the component or page that uses it, and
  states the same one-fragment-per-component rule — `frontend-conventions/references/graphql.md` is
  the authority there, over `apps/web`. Inside a package the documents centralize under
  `<module>/common/graphql/` instead, because two UI legs share them.
- Who owns the root query a fragment chain finally hangs off, and how it is fetched, is the
  root-query ownership section of this skill.
- `@connection` keys, `@refetchable` naming and the pagination hooks are the pagination section.
- Payload selections and store updates after a write are the mutations section; live fragment
  updates are the subscriptions section.

## Anti-patterns

- Passing a `$data` value to a child component — 30 props across 29 files already do, and each one
  makes the child unusable in any query the parent does not also run.
- Reading a field your fragment did not declare — masking hides it at runtime, so the bug ships as
  `undefined` rather than as a compile error.
- Sharing one fragment across two components — a field removed for one silently removes it for the
  other, with nothing in either file recording it.
- Naming a new fragment `<Name>Fragment` — 32 of 37 already do, and the name carries neither the
  owning component nor the prop it arrives on.
- Declaring a `graphql` tag outside `<module>/common/graphql/` — inline in a component
  (`__shared__/.../ReactionButton/index.tsx`) nobody else can spread it; under a platform leg
  (`messages/native/.../CreateRoomPageQuery.ts`) it strands the data on one platform.
- Filing a fragment under `graphql/queries/` — three modules do, so finding a document means
  opening every file in both directories.
- Putting a query and a fragment in one file — `notifications/.../queries/NotificationsList.ts`
  does, and the file name then describes half its contents.
- Forking a component to change a page size or a sort — `@argumentDefinitions` plus `@arguments` at
  the spread is what that variance is for.
- Fetching a section that is closed — gate it with a boolean argument and `@include`, as
  `Comments.ts` and `CommentItem.ts` do. `@skip` has zero usages; one inverted gate reads wrong.
- Naming a prop `<x>Ref` while typing it `$data` — `messages/web/AllChatRoomsList/types.ts` and
  four siblings do, so the name lies about whether the child owns its read.
- Importing a generated type by a non-relative path — the only such form in the repo is an
  app-level example in `packages/graphql/README.md`; it does not resolve from inside a package.
