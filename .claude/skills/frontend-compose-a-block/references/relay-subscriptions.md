# Subscriptions

A subscription is a long-lived socket registration that Relay tears down and re-opens whenever the
config object it was handed changes identity. Everything here follows from that: the config is
memoized, its dependency list names every variable the document reads, and the payload updates the
store through directives, not hand-written surgery. Get the memoization wrong and there is no error
— only a socket reconnecting on every render.

Paths below are relative to `packages/components/modules/`.

## Contents

- [One document, one hook, one file](#one-document-one-hook-one-file)
- [The memoized config is a rule, not a style](#the-memoized-config-is-a-rule-not-a-style)
- [Updating the store from the payload](#updating-the-store-from-the-payload)
- [Reuse the transport](#reuse-the-transport)
- [Mounting a subscription as a component](#mounting-a-subscription-as-a-component)
- [When imperative is the only option](#when-imperative-is-the-only-option)
- [Where the neighbouring skill takes over](#where-the-neighbouring-skill-takes-over)
- [Anti-patterns](#anti-patterns)

## One document, one hook, one file

The document and the hook that runs it live together in one file under
`<module>/common/graphql/subscriptions/`, and the file exports both. Seven such files exist at this
commit — five under `common/`, two under `native/`, none under `web/` — and only the two native
ones diverge. Copy the shape of
`notifications/common/graphql/subscriptions/useNotificationsSubscription.ts`:

```ts
export const useNotificationsSubscription = (userId = '') => {
  const config = useMemo(() => {
    const connectionID = ConnectionHandler.getConnectionID(userId, USER_NOTIFICATIONS_KEY)
    return {
      subscription: NotificationsSubscription,
      variables: { connections: [connectionID] },
      onError: console.error,
    }
  }, [userId])

  return useSubscription(config)
}
```

Relay requires an operation name prefixed by the module it is declared in, so the **filename picks
the operation name**, not the reverse — all five documents match their file exactly. Name the file
`use<Name>Subscription.ts` and the hook name falls out of it; name it after the document, as
`CommentsSubscription.tsx` does, and the hook needs a second name (`useCommentChangeSubscription`)
that has to stay discoverable from the filename. Use the `.ts` extension — six of the seven files
are `.tsx` and none contains JSX — and give every config `onError: console.error`, as all seven do;
an unhandled socket error is otherwise invisible.

## The memoized config is a rule, not a style

`useSubscription` opens the subscription in an effect keyed on the config object. A config rebuilt
inline is a new object every render, so the effect disposes and re-runs every render: the socket
closes, re-opens, and any payload delivered in the gap is lost. Wrap the config in `useMemo` — no
exceptions; Relay's own guide states this flatly.

Memoizing inside the hook is not enough if the caller hands it an unstable value. In
`messages/web/GroupChatDetails` the `connections` array is a bare literal in the component body,
passed into a hook that keeps it in the `useMemo` dependency list:

```tsx
const connections = group?.id
  ? [ConnectionHandler.getConnectionID(group.id, 'ChatRoom_participants')]
  : []
useRoomListSubscription({ profileId, connections, onRemoval: onBackButtonClicked })
```

A fresh array identity per render defeats that memo completely; anything passed into a subscription
hook — arrays, objects, callbacks — must be stabilised at the call site. The dependency list must
then name every variable the config reads. The common `useMessagesListSubscription` builds its
variables from `roomId` **and** `profileId` yet lists only `[roomId]`, so switching profile inside
a room leaves the subscription on the previous profile's id until the room changes.

## Updating the store from the payload

Prefer directives on the payload fields —
`comments/common/graphql/subscriptions/CommentsSubscription.tsx` carries all three cases:

```graphql
onCommentChange(targetObjectId: $targetObjectId) {
  createdComment @prependEdge(connections: $connections) {
    node { id ...CommentItem_comment target { commentsCount { total main replies } } }
  }
  updatedComment { ...CommentItem_comment }
  deletedCommentId @deleteRecord
}
```

- **Create** — `@prependEdge(connections: $connections)`; Relay inserts the edge itself.
- **Update** — no directive. Re-spread the fragments the list already renders; Relay merges the
  incoming record by `id` and every mounted `useFragment` re-renders.
- **Delete** — `@deleteRecord` on the returned id field; the record leaves the store and every
  connection holding it.

Re-select anything derived from the list but stored elsewhere: the comment re-reads
`target { commentsCount { total main replies } }` inside the created node, because the counter
hangs off the target record and prepending the edge alone leaves it stale.

Feed `connections` from the module's own connection-id helper, never a literal — `comments` calls
`getCommentsConnectionId(targetObjectId)` from `comments/common/utils.ts`, the derivation this
skill's pagination section prescribes. Pass an empty array when there is no target.

## Reuse the transport

The environment already speaks WebSocket. `packages/graphql/config/environment.ts:110-150` builds a
`graphql-ws` client — endpoint from `NEXT_PUBLIC_WS_RELAY_ENDPOINT` or its Expo equivalent, auth
headers from cookies in `connectionParams`, retry with backoff and jitter — and wraps it in an
`Observable` named `websocketFetch`, the **second** argument to
`Network.create(fetchResponse, websocketFetch)` at `:172`. That is the whole wiring: any operation
of kind `subscription` rides the socket with no per-module setup.

So a module never constructs an environment. Exactly one `new Environment` call exists in the repo,
at `packages/graphql/config/environment.ts:199`; a second opens a second socket over a second store,
so subscription writes land where no component reads. Take it from context with
`useRelayEnvironment` when you need the object, and never as a prop — `messages/native/ChatRooms`
calls `useRelayEnvironment` only to feed `useRoomListSubscription`, which carries `environment` in
its public props for no gain.

## Mounting a subscription as a component

`CommentsSubscription.tsx` also exports a null-rendering wrapper, the only one of the seven:

```tsx
export const CommentsSubscription = ({ targetObjectId }: { targetObjectId?: string }) => {
  useCommentChangeSubscription(targetObjectId)
  return null
}
```

It exists because a hook cannot be called conditionally and a component can be rendered
conditionally. All three call sites gate it —
`{subscriptionsEnabled && <CommentsSubscription targetObjectId={target.id} />}` in
`comments/web/CommentsList`, `comments/web/CommentItem/CommentsReplies` and
`comments/native/CommentsList`. Export the wrapper whenever live updates are optional.

## When imperative is the only option

`messages/common/graphql/subscriptions/useRoomListSubscription.tsx` holds the single imperative
`updater` among the seven, at `:58-87`, and has a genuine reason: a room moves to the top of
whichever filtered connection now matches its `isArchived` and `isGroup` values, so the target list
is chosen at runtime and cannot be named in a `$connections` variable. It deletes the node from
every stale connection, rebuilds an edge with `ConnectionHandler.buildConnectionEdge` and
`insertEdgeBefore`, and uses `onNext` (`:88-95`) for side effects that are not store writes.
`onNext` is fine; reach for `updater` only when the connections are unknowable at the call site.

The cost shows in the same file: the document still declares
`@deleteEdge(connections: $connections)`, yet three of its four call sites —
`messages/web/AllChatRoomsList`, `messages/web/GroupChatEdit`, `messages/native/ChatRooms` — pass
`connections: []`, so the directive writes nowhere and the document reads as if it updated the
store declaratively when it does not.

Do not reimplement a working hook per platform.
`messages/native/graphql/subscriptions/useMessagesListSubscription.tsx` imports the document from
`'../../../common'` and rebuilds the hook around `requestSubscription`, a `Disposable` ref, manual
`dispose`, `useFocusEffect` and `useAppStateSubscription`. It exports its `common/` sibling's symbol
name, both are re-exported (`messages/common/index.ts:34`, `messages/native/index.ts:2`), and a
consumer importing both barrels silently gets one. Extend the shared hook behind an option instead.

## Where the neighbouring skill takes over

The template's `frontend-patterns/references/graphql-data-fetching.md` has a `useSubscription`
section, but it is one memoized-config example plus a sentence naming the modules that subscribe —
nothing on file placement, on the memo rule, on which directive answers which payload case, or on
the transport. Treat it as a gap in `frontend-patterns`, not a route.

## Anti-patterns

- Building the `useSubscription` config inline — the effect keyed on it re-runs every render,
  closing and re-opening the socket and dropping what arrived in between.
- Passing an array, object or unmemoized callback into a subscription hook — a fresh identity per
  render defeats the `useMemo` inside it, as `messages/web/GroupChatDetails` does.
- Omitting a config variable from the memo's dependency list — the common
  `useMessagesListSubscription` reads `profileId`, lists only `[roomId]`, and keeps the old
  subscription across a profile switch.
- Writing an `updater` when the target connections are known at the call site, or leaving a
  `connections:` directive whose call sites pass `[]` — the directives are schema-checked, the
  hand-written version is not, and a dead directive misrepresents what updates the store.
- Omitting derived counters from the created node, or retyping a `@connection` key instead of the
  module's `get<X>ConnectionId` helper — a stale count, or a write into a list nothing renders.
- Calling `new Environment` inside a module, or taking a Relay `Environment` as a hook prop — the
  first splits the store from the socket, the second pushes wiring into every caller when
  `useRelayEnvironment` already reads it from context.
- Reimplementing a `common/` subscription hook in a platform leg — the native
  `useMessagesListSubscription` ships the same exported name from two barrels and has already lost
  a variable the shared version passes.
- Exporting a subscription hook with no consumer, or naming its file `.tsx` with no JSX in it —
  `useMessageCountUpdate` does both, under a `TODO` asking whether it is still used.
