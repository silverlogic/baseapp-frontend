# Connections and pagination

A `@connection` key is a runtime string, and it is the only thing tying a paginated list to every
later write against it. Relay files the list under an id derived from the parent record id plus that
key; a `@prependEdge`, a subscription insert, or a `getConnectionID` call finds the list by
recomputing the same string. Nothing checks the two spellings against each other. Spell the key
differently in either place and the write lands on a connection nobody renders — no error, no
warning, an item that appears only after a reload.

Paths below are relative to `packages/components/modules/`.

## Contents

- [The key: `<FragmentName>_<fieldName>`](#the-key-fragmentname_fieldname)
- [The twelve keys in the tree](#the-twelve-keys-in-the-tree)
- [`filters:` — when to declare, and what](#filters--when-to-declare-and-what)
- [Extract the key, derive the id](#extract-the-key-derive-the-id)
- [Wrap `usePaginationFragment` in a `common/` hook](#wrap-usepaginationfragment-in-a-common-hook)
- [Driving `loadNext` from the list component](#driving-loadnext-from-the-list-component)
- [Naming the `@refetchable` query](#naming-the-refetchable-query)
- [Where `ConnectionHandler` comes from](#where-connectionhandler-comes-from)
- [Where the neighbouring skill takes over](#where-the-neighbouring-skill-takes-over)
- [Anti-patterns](#anti-patterns)

## The key: `<FragmentName>_<fieldName>`

`usePaginationFragment` needs `@refetchable` and `@connection` on the same fragment. Name the key
after the fragment that declares it plus the field as selected — no other scheme, no exceptions.
`profiles/common/graphql/fragments/AllProfilesList.ts` (exported as `fragmentQuery`) is the
conforming shape:

```graphql
fragment AllProfilesListFragment on Query
@refetchable(queryName: "AllProfilesListPaginationQuery")
@argumentDefinitions(
  cursor: { type: "String" }
  count: { type: "Int", defaultValue: 5 }
  orderBy: { type: "String", defaultValue: "name" }
  q: { type: "String", defaultValue: null }
) {
  allProfiles(after: $cursor, first: $count, orderBy: $orderBy, q: $q)
    @connection(key: "AllProfilesListFragment_allProfiles") {
    edges { node { id ...ProfileItemFragment } }
  }
}
```

The fragment name is the disambiguator, not the field name. `AllProfilesList` and
`InviteMembersSearch` both paginate `allProfiles` on `Query`; because each key carries its own
fragment name they are two separate connections, and a search refetching one leaves the other
intact. Two fragments that shortened their keys to the field would share a single list.

## The twelve keys in the tree

Twelve `@connection` directives exist at this commit. **Four** follow the rule; the other eight use
three further shapes. Do not pattern-match off a neighbouring module — most are wrong.

| `@connection` key | module | shape |
|---|---|---|
| `ContentPostsFragment_contentPosts` | content-feed | fragment name + field |
| `AllProfilesListFragment_allProfiles` | profiles | fragment name + field |
| `InviteMembersSearchFragment_allProfiles` | profiles | fragment name + field |
| `ProfilesListFragment_profiles` | profiles | fragment name + field |
| `CommentsList_comments` | comments | fragment is itself `CommentsList_comments` |
| `ActivityLogs_activityLogs` | activity-log | PascalCase, `Fragment` suffix dropped |
| `ChatRoom_participants` | messages | type name; fragment `MembersListFragment` |
| `chatRoom_allMessages` | messages | camelCase type; `MessagesListFragment` |
| `roomsList_chatRooms` | messages | camelCase; `RoomsListFragment` |
| `addContactToGroupsList_chatRooms` | messages | camelCase; `AddContactToGroupsListFragment` |
| `user_notifications` | notifications | lowercase type + field, no fragment trace |
| `UserMembersFragment_members` | profiles | fragment is `UserMembersListFragment` — mismatch |

The last row is the failure mode in miniature: the key names a fragment that does not exist, so
deriving the id from the fragment name yields a string matching nothing, and
`profiles/web/ProfileMembers/MembersList` retypes the wrong string by hand. A key is a wire format
once written — renaming one means renaming every derived id in the same commit.

## `filters:` — when to declare, and what

`filters:` lists the field arguments allowed to split the connection into separate stored lists.
Omit it and Relay keys on **every** argument, so changing a search term or a sort starts a new list
and the mutation targeting the old id writes into a list the UI no longer shows. Nine of the twelve
omit it. The three that declare it are all deliberate:

- `filters: []` — `comments/common/graphql/queries/CommentsList.ts`. The fragment takes `q` and
  `orderBy`, and pinning a comment re-sorts through `refetchWithOrder`; an empty list keeps one
  connection so the re-sort resolves against the list already on screen instead of dropping it.
- `filters: ["orderBy", "q"]` — `profiles/common/graphql/fragments/UserMembersList.ts`, and
  `filters: ["userName", "createdFrom", "createdTo"]` in
  `activity-log/common/graphql/queries/ActivityLogsFragment.ts`. Each filter set is its own list.

Pick by asking whether two argument values should share one rendered list. If yes, name only the
arguments that must split it, or `filters: []` for none. If no, list the discriminating arguments —
and repeat the same values when deriving the id. `profiles/web/ProfileMembers/MembersList` passes
`{ orderBy: 'status', q: watch('search') }` as the third argument to `getConnectionID`; drop that
object and the id stops resolving to the list the component renders.

## Extract the key, derive the id

`comments` is the pattern to copy — a constant, a helper, and a test, in three files:

```ts
// comments/common/constants.ts
// Must match the @connection key and the orderBy default declared in the
// CommentsList_comments fragment (graphql/queries/CommentsList.ts).
export const COMMENTS_LIST_CONNECTION_KEY = 'CommentsList_comments'

// comments/common/utils.ts
export const getCommentsConnectionId = (parentOrTargetId: string): string =>
  ConnectionHandler.getConnectionID(parentOrTargetId, COMMENTS_LIST_CONNECTION_KEY)
```

`comments/common/__tests__/utils.test.ts` asserts `getCommentsConnectionId` against
`ConnectionHandler.getConnectionID`, so a typo in the constant fails a test rather than a list.

A `graphql` template is compiled as a literal, so the constant cannot be interpolated into the
document — which is exactly why the comment above it names the fragment it mirrors, and why the
helper exists to give every mutation, subscription, and updater one import instead of a retyped
string. Mirror the triple in any new module: `*_CONNECTION_KEY` in `common/constants.ts`,
`get<X>ConnectionId` in `common/utils.ts`, one test.

`notifications` does half of it — `USER_NOTIFICATIONS_KEY` in `notifications/common/constants.ts`,
consumed by `useNotificationsSubscription`, but no helper, so each caller repeats the
`getConnectionID` call. `messages` and `profiles` do neither: eleven `getConnectionID` calls in
`messages` and two in `profiles` inline the key as a literal, `roomsList_chatRooms` alone appearing
at five call sites across web and native. `messages/common/utils.ts` wraps the plural form in
`getChatRoomConnections`, which is the right move, but hardcodes the key inside it.

## Wrap `usePaginationFragment` in a `common/` hook

The fragment document and the hook reading it belong in one file under `<module>/common/graphql/`,
exported together, so both platform legs consume one call:

```ts
// comments/common/graphql/queries/CommentsList.ts
export const useCommentList = (targetRef: CommentsList_comments$key) => {
  const result = usePaginationFragment<CommentsListPaginationQuery, CommentsList_comments$key>(
    CommentsListFragmentQuery,
    targetRef,
  )
  // …derives `comments` from `result.data` and a ref-stabilised `refetchWithOrder`
  return { ...result, comments, refetch, refetchWithOrder }
}
```

Spread the hook's whole result before adding to it, so a caller still reaches `hasNext`,
`isLoadingNext`, and `loadPrevious`. `activity-log`'s `useActivityLogs` destructures five fields and
returns only those, which is why a caller needing `loadPrevious` has to edit the hook. Always pass
both type parameters, `<PaginationQueryType, Fragment$key>`; every site does except
`profiles/web/ProfileMembers/MembersList`, whose untyped call makes `data` implicitly loose.

Five modules wrap (`comments`, `content-feed`, `activity-log`, and two fragments each in `messages`
and `profiles`). Nine components still call `usePaginationFragment` inline, and the duplication is
visible: `messages/web/MessagesList` and `messages/native/ChatRoomPage/MessagesList` make the
identical call on `MessagesListFragment`, as do the two `NotificationsList` components in
`notifications/web` and `notifications/native`. Any change to page size, type parameters, or the
derived shape has to be made twice, and the copies are free to drift.

## Driving `loadNext` from the list component

The platform component owns the trigger and nothing else. Guard on `hasNext` and read the page size
from the module's `common/constants.ts` rather than a literal:

```tsx
endReached={() => {
  if (hasNext) {
    loadNext(NUMBER_OF_COMMENTS_TO_LOAD_NEXT)
  }
}}
```

`comments/web/CommentsList` and `notifications/web/NotificationsList` use exactly this; several
`messages` lists pass a bare `loadNext(10)`. Keep `startTransition` for `refetch` —
`profiles/web/ProfileMembers/MembersList` wraps its search refetch in one.

## Naming the `@refetchable` query

Name it `<FragmentName>PaginationQuery`, PascalCase, one suffix. Sixteen `@refetchable` fragments
exist and they use three suffixes in two casings: `PaginationQuery` (nine), `RefetchQuery` (four,
e.g. `CommentItemRefetchQuery`), and `Refetchable` (three — `profilesListRefetchable`,
`notificationsListRefetchable`, `userMembersListPaginationRefetchable`). Five begin lowercase. The
name becomes a generated type imported by hand from `__generated__/`, so an unpredictable one costs
a lookup on every use.

## Where `ConnectionHandler` comes from

Import it from `'react-relay'`. Two exceptions exist and only one is justified:
`messages/common/utils.ts` imports `relay-connection-handler-plus` because it needs
`getConnections`, which returns every filtered variant of a connection at once — the environment
registers that handler for the `connection` handle at
`packages/graphql/config/environment.ts:185-192`, so the plus variant is wired and safe.
`messages/web/GroupChatCreate` imports from `'relay-runtime'` for no reason; it is the same object
reached by a different path.

## Where the neighbouring skill takes over

Rendering the paginated list — `react-virtuoso`, the sentinel, the loading footer — is
`frontend-patterns`, in `frontend-patterns/references/graphql-infinite-scroll.md`. This file decides
the data contract: the key, the filters, the id, the hook. Fragment naming and
`@argumentDefinitions` are settled in this skill's fragments section, and the directives writing
into a connection from a mutation payload in its mutations section.

## Anti-patterns

- Naming a `@connection` key after the GraphQL type instead of the fragment —
  `ChatRoom_participants` and `chatRoom_allMessages` collide with any second fragment paginating the
  same type field.
- Shipping a key whose fragment name does not exist — `UserMembersFragment_members` sits on
  `UserMembersListFragment`, so deriving the id from the fragment name silently misses.
- Retyping a key string at a `getConnectionID` call site — `messages` does it eleven times, and one
  typo produces a write to a list nothing renders, with no error.
- Omitting `filters:` on a field with a search or sort argument — the store splits into one list per
  argument value and the mutation updates whichever the user is no longer looking at.
- Passing `getConnectionID` a filter object that disagrees with the `filters:` declaration — the id
  resolves to a different list than the one on screen.
- Calling `usePaginationFragment` inline in a platform component — `messages` and `notifications`
  each maintain the same call in two legs and change both by hand.
- Dropping fields from the hook's return — `useActivityLogs` returns five of them, so a caller
  needing `loadPrevious` must reopen the shared hook.
- Calling `usePaginationFragment` without both type parameters — the untyped call in
  `profiles/web/ProfileMembers/MembersList` loses the generated shape of `data`.
- Inventing a third `@refetchable` suffix — `PaginationQuery`, `RefetchQuery`, and `Refetchable`
  already coexist, and the name is a generated type someone has to import by hand.
- Renaming a live `@connection` key without renaming every derived id in the same commit — the two
  halves come apart silently, in the store, at runtime.
