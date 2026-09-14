# Module: `comments`

This module is divided into three primary folders:

- **`common/`**: Contains platform-independent logic (utilities, hooks, or components that work in both web and native).
  - Can import from within or other `common/` folders.
  - Must not import from `web/` or `native/`.
- **`web/`**: Contains web-specific components and logic (e.g., React DOM, browser APIs, Material UI and others).
  - Can import from within or `common/`.
  - Must not import from `native/`.
- **`native/`**: Contains native-specific components and logic (e.g., React Native, Expo, React Native Paper and others)
  - Can import from within or `common/`.
  - Must not import from `web/`.

This structure ensures platform-specific code remains isolated, while shared code lives in one place.

## Architecture: logic in `common/` hooks, UI per platform

All comment behavior lives in `common/`; the platform folders only render UI around it and
add platform side effects (DOM `scrollIntoView`/cursor placement on web; the gorhom bottom
sheet, paper dialog, and input blur on native). New behavior should land once in a `common/`
hook and twice only as thin UI.

### `common/` building blocks

- **GraphQL** (`graphql/`): fragments/queries (`Comments`, `CommentsList` + `useCommentList`
  pagination with `comments` and the stable `refetchWithOrder` re-sort, `CommentItem` with the
  `hasPerm` permission fields), the four mutation hooks (`useComment{Create,Update,Delete,Pin}Mutation`,
  each `[commit, isMutationInFlight]` with centralized error toasts), and `CommentsSubscription`.
- **Reply store** (`context/CommentReplyProvider`): zustand-in-context holding the composer
  state shared across the tree — reply target (`inReplyToId`, `name`, `commentItemRef`), the
  edit target (`editingComment`, mutually exclusive with reply mode), and the reply-success
  auto-expand signal (`commentIdToExpand`). `useCommentReply<TElement>()` refines the
  platform-neutral `commentItemRef` (web passes `HTMLDivElement`).
- **Hooks** (`hooks/`):
  - `useCommentCreateForm` — form + submit for create/reply: connection-id derivation,
    `clientMutationId`, `setFormRelayErrors`, reset-on-success; options cover the native
    composer (`expandRepliesOnSuccess`, `resetFormOnReplyTargetChange`) and mentions stay a
    call-site decision (`submit(data, { includeMentions })`).
  - `useCommentUpdateForm` — form + submit for editing; `target` is nullable so an
    always-mounted composer can call it unconditionally.
  - `useCommentItem` — the per-comment state machine: replies expansion (`showReplies`/
    `hideReplies` + the consume-once auto-expand), `setAsReplyTarget`, `deleteComment`,
    `hasUser`, thread-depth gating.
  - `useCommentActions` — headless share/pin/edit/delete descriptors (labels, permission
    gating, pin mutation with the `onPinToggled` re-sort option); platforms map them to
    their menu UI and icons.
- **Utils** (`utils.ts`): `getCommentsConnectionId`, `getNextClientMutationId`,
  `toCommentEditTarget`.

### Platform composition

- **web/**: `Comments = withCommentReplyProvider(BaseComments)`; `CommentCreate` /
  `CommentUpdate` render `SocialInput` over the form hooks (plus mentions wiring);
  `CommentItem` renders `ActionsOverlay` over `useCommentItem` + `useCommentOptions`
  (an icon adapter over `useCommentActions`); replies recurse via `CommentsReplies`.
- **native/**: `Comments = withCommentReplyProvider(BaseComments)`; `BaseComments` wires the
  always-mounted `SocialInputDrawer` through `useCommentComposer` (both form hooks behind one
  drawer, swapped by `editingComment` — the sheet never remounts); `CommentActionsProvider`
  hosts the long-press `CommentActionSheet` and `CommentDeleteDialog` once per thread;
  `CommentItem`/`CommentsList` render `useCommentItem`/`useCommentList`.
