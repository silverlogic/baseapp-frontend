# Mutations and store updates

A mutation is where a module writes, and the server accepting the write is the easy half. Relay
re-renders only what the payload touched, and nothing warns you when it touched nothing: the row
exists on the server, the list on screen does not show it, and the bug arrives as "it appears after
a refresh". Decide the store update in the document, at authoring time, not in a callback after.

Paths below are relative to `packages/components/modules/`.

## Contents

- [One file, one mutation](#one-file-one-mutation)
- [What the thirty mutation files actually export](#what-the-thirty-mutation-files-actually-export)
- [`errors { field messages }` and where they land](#errors--field-messages--and-where-they-land)
- [Declarative directives are the default](#declarative-directives-are-the-default)
- [The three imperative `updater` sites](#the-three-imperative-updater-sites)
- [`optimisticResponse` and `@raw_response_type`](#optimisticresponse-and-raw_response_type)
- [Where the neighbouring skill takes over](#where-the-neighbouring-skill-takes-over)
- [Anti-patterns](#anti-patterns)

## One file, one mutation

One file per mutation under `<module>/common/graphql/mutations/`, exporting a document named
`<Name>MutationQuery` and a `use<Name>Mutation` hook returning `[commit, isMutationInFlight]`.
`comments/common/graphql/mutations/CommentCreate.ts` is canonical. Its document, with the counter
selections on `node` elided:

```graphql
mutation CommentCreateMutation($input: CommentCreateInput!, $connections: [ID!]!) {
  commentCreate(input: $input) {
    comment @prependEdge(connections: $connections) {
      node { id ...CommentItem_comment }
    }
    errors { field messages }
  }
}
```

The hook around it, verbatim:

```ts
export const useCommentCreateMutation = (): [
  (config: UseMutationConfig<CommentCreateMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<CommentCreateMutation>(
    CommentCreateMutationQuery,
  )

  const commit = (config: UseMutationConfig<CommentCreateMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendMutationErrorToast(undefined, errors)
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
```

Four things that shape carries, all load-bearing:

- **`...config` first**, so the caller's `variables`, `updater` and `optimisticResponse` pass
  through; only the callbacks are re-wrapped, each calling the caller's last. Twenty-four of thirty.
- **Transport errors toast once, in the hook** (`sendToast(error.message)` in `onError`); callers
  then handle payload errors only.
- **`sendMutationErrorToast(payloadErrors, transportErrors)`** returns the message it displayed, or
  `undefined` on success — `packages/utils/functions/relay/getMutationErrorMessage` resolves payload
  messages first, then transport, then a default. Three wrappers branch on that return value.
- **`Disposable`, not `void`.** Twenty-three hooks annotate the tuple with `Disposable` so a caller
  can cancel an in-flight write; two return `void` and take that away.

The imperative `commitMutation` from `relay-runtime` is imported nowhere in the tree: every write
goes through `useMutation` inside a hook. Keep it that way, so `isMutationInFlight` always exists.

## What the thirty mutation files actually export

Thirty files live under `*/common/graphql/mutations/` at this commit. Nineteen diverge on nothing
below. Copy one of those, not a neighbour.

- **Document, no hook** — `profiles/.../BlockToggle.ts` and `NotificationSettingToggle.ts` push
  `useMutation` into a platform component (`profiles/web/.../BlockButtonWithDialog`), so the second
  leg repeats the call.
- **Document not exported** — `notifications/.../NotificationsMarkAllAsRead.ts` and
  `NotificationsMarkAsRead.ts` keep it a module-private `const`; nothing outside can name it.
- **Bare `useMutation` pass-through** — `content-feed/.../ContentPostCreate.ts` and
  `profiles/.../ProfileUpdate.ts`: no toast, no error path, so every caller re-implements both.
- **Options object, not a tuple** — `profiles/.../FollowToggle.ts` returns
  `{ toggleFollow, isMutationInFlight }`, a second calling convention for the same job.
- **Returns `void`** — `messages/.../CreateGroupChat.ts`, `profiles/.../ReportCreate.ts`; the write
  cannot be disposed.
- **Symbol named off its file** — `RemoveMember.ts` exports `ProfileRemoveMemberMutationQuery`,
  `ReadMessages.ts` exports `useReadMessageMutation`, `ProfileUpdate.ts` exports
  `useProfileMutation`; a search by filename misses all three.

## `errors { field messages }` and where they land

Twenty-two of the thirty documents select `errors { field messages }`; select it in every new
payload without exception. A validation failure returns 200 with no transport error, so a document
omitting the block gives `onCompleted` nothing to show and the form looks successful. The eight
omitting it (`CommentDelete`, `CommentPin`, the three `notifications` mutations, `FollowToggle`,
`RemoveMember`, `ReportCreate`) are not licence to skip it.

The block has exactly two consumers, and each mutation picks one:

- **The toast.** `sendMutationErrorToast(response.<field>?.errors, errors)` — ten call sites, among
  them `messages/.../ArchiveChatRoom.ts`.
- **The form.** The hook passes `undefined` first — sixteen call sites, `CommentCreate.ts` among
  them — leaving payload errors for the caller to map onto fields with `setFormRelayErrors`.

`comments/common/hooks/useCommentCreateForm` is the reference mapping: return early when the
transport `errors` argument is set (the hook already toasted it), otherwise
`setFormRelayErrors(form, response?.commentCreate?.errors)` and reset only when those are empty.
Fourteen components across four modules import it from `@baseapp-frontend/utils` and do the same.

## Declarative directives are the default

Eighteen declarative directive usages against three imperative `updater`s — twelve of the eighteen
in mutations, six in subscriptions. Reach for a directive first; an `updater` is an exception you
have to justify in a comment.

| Directive | Reach for it when | n |
|---|---|---|
| `@prependEdge(connections:)` | the payload field is an edge; item belongs on top | 8 |
| `@prependNode(…, edgeTypeName:)` | the payload is a bare node; you name its edge type | 2 |
| `@appendEdge` / `@appendNode` | those same two cases on a tail-first list | 0 |
| `@deleteRecord` | the payload returns the deleted id; drop it everywhere | 6 |
| `@deleteEdge(connections:)` | the record survives; only named membership ends | 2 |

Every connection-editing directive that accepts a `connections` argument takes `connections:
$connections`, an `[ID!]!` variable the call site fills with ids derived from the `@connection` key,
which keeps the document connection-agnostic. `@deleteRecord` is the exception — it evicts by id and
takes no argument at all. Naming that key
and deriving the id is this skill's pagination section; get it wrong and the write lands nowhere.

`@deleteRecord` versus `@deleteEdge` is not a style choice. `@deleteRecord` evicts the record, so it
vanishes from every connection at once and needs no `$connections` (`comments/.../CommentDelete.ts`,
`profiles/.../RemoveMember.ts`, `profiles/.../BlockToggle.ts`, `__shared__/common/ReactionButton`).
`@deleteEdge` unlinks it from the connections you name and leaves the record for other views —
`messages/.../UpdateChatRoom.ts` uses it on `removedParticipants { id }`, where the profile stays.

`@prependNode` requires `edgeTypeName:`: `profiles/.../ProfileUserRoleCreate.ts` and
`profiles/.../SendInvitation.ts` both pass `"ProfileUserRoleEdge"`, a schema type spelt in a string
and checked at runtime only. `@appendEdge` and `@appendNode` have zero usages — every list here is
newest-first, so append only when one is genuinely oldest-first.

## The three imperative `updater` sites

Three `updater` functions exist in the tree. Two are mutations; read both before writing a fourth.

- `messages/common/graphql/mutations/ArchiveChatRoom.ts` (`useArchiveChatRoomMutation`) — the
  connection to edit is unknown until the response arrives. It resolves the rooms connections
  through `getChatRoomConnections` (`messages/common/utils.ts`), keeps those whose `archived` filter
  is the opposite of the room's new `isArchived`, `ConnectionHandler.deleteNode`s the room from
  each, and calls `config?.updater?.(store, data)` last so a caller's own updater still runs.
- `profiles/web/ProfileMembers/MemberItem` — `updater: (store) => store.delete(invitationId)` on the
  cancel-invitation commit, with the reason in a comment beside it: the mutation returns only
  `success`, no `deletedId`, so `@deleteRecord` has nothing to attach to. The fix is a payload field
  on the backend, not more client code.
- The third is a subscription (`messages/common/graphql/subscriptions/useRoomListSubscription.tsx`),
  owned by this skill's subscriptions section.

Both satisfy one of two conditions. Write an `updater` only when you can name which: the target
connection is not derivable at the call site, or the payload does not carry the id the directive
needs. Anything else takes a directive.

## `optimisticResponse` and `@raw_response_type`

Five `optimisticResponse` sites, and no `optimisticUpdater` anywhere in the tree.

`__shared__/common/ReactionButton` is the fullest example. Its mutation is declared in the component
file with `@raw_response_type`, and the optimistic payload hand-writes `__typename: 'Comment'` and
`__isReactionsInterface: 'Comment'` beside a recomputed `reactionsCount.total` and a client-made
`id`. The document also carries `@deleteRecord` on `reactionDeletedId`, and directives apply to the
optimistic payload too, so un-reacting removes the record before the server answers.

`@raw_response_type` is what makes that payload a generated type rather than a free-form object, and
it sits on exactly two operations: `ReactionButtonMutation` and `SendMessageMutation`. The other two
optimistic sites (`messages/web/GroupChatDetails/ProfileCard`,
`messages/native/GroupDetailsPage/Members/MemberItem`) both commit `ChatRoomToggleAdminMutation`,
which carries no annotation, so their `{ participant: { node: { id, role } }, errors: null }` has no
generated raw-response type behind it. Annotate the operation before writing an optimistic payload.

The caveat governing all five: the payload is written into the store as if it were the response, so
a field a mounted fragment reads and the payload omits leaves that component with partial data until
the server replies. The two `SendMessageMutation` sites (`messages/web/SendMessage`,
`messages/native/MessageCreate`) hand-build the same message node in both legs — the shared hook is
in `common/`, the optimistic payload never followed it.

## Where the neighbouring skill takes over

Building the form that submits a mutation — resolver, dirty-field filtering, submit state — is
`frontend-patterns/references/forms.md`, template-side. This file stops at the payload: what the
mutation selects, where the store update comes from, and which of the toast or the form takes
`errors { field messages }`. Keys and connection ids are this skill's pagination section; updates
arriving without a commit, its subscriptions section.

## Anti-patterns

- Retyping a mutation document as a raw template string — `messages/.../CreateGroupChat.ts` spells
  `ChatRoomUpdateMutation` out again inside the multipart upload body instead of reusing the
  compiled `UpdateChatRoomMutationQuery`, so two copies of one operation drift with nothing
  comparing them.
- Accepting a `UseMutationConfig` and never spreading it — the same wrapper builds `variables`
  itself, so a caller's `variables`, `updater` and `optimisticResponse` are dropped in silence.
- Hand-writing an `updater` where a directive fits — it duplicates connection traversal every
  consuming app must then trust, and a key typo inside it fails with no error.
- Omitting `errors { field messages }` — validation failures return 200 and the form looks fine.
- Toasting payload errors and also mapping them to fields — the user hears one failure twice.
- Shipping any of the six divergent shapes above — each pushes wrapper work onto every caller.
- Adding `optimisticResponse` without `@raw_response_type` — nothing types it to the response.
- Introducing `optimisticUpdater` — zero usages here; it carries the full correctness burden of a
  hand-written store edit, so state why a directive plus `optimisticResponse` cannot do the job.
- Keeping a module-scope `clientMutationId` counter in a component file — three do, while
  `comments/common/utils.ts` exports a unit-tested `getNextClientMutationId`.
