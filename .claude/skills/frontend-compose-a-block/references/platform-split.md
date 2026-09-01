# The common/web/native contract

A module's three legs form a one-way dependency chain: `common/` is platform-neutral, and `web/` and
`native/` each consume it while never touching each other. Every module README states the rule and
`packages/config/.eslintrc-with-restricted-paths.js:6-33` enforces it — but only over *paths*. A
native-only npm package imported into `common/` clears the gate and throws at runtime on the
platform that cannot resolve it. That failure is the one this file exists to prevent.

Paths below are relative to `packages/components/modules/`.

## Contents

- [The three import rules](#the-three-import-rules)
- [Which leg each artefact belongs in](#which-leg-each-artefact-belongs-in)
- [Sharing a hook between the two UI legs](#sharing-a-hook-between-the-two-ui-legs)
- [Injecting a platform capability](#injecting-a-platform-capability)
- [What native does not have](#what-native-does-not-have)
- [The enforcement gap](#the-enforcement-gap)
- [Where the neighbouring skills take over](#where-the-neighbouring-skills-take-over)
- [Anti-patterns](#anti-patterns)

## The three import rules

Verbatim from `modules/comments/README.md:3-15`. The same block is repeated in the READMEs of
`__shared__`, `activity-log`, `messages`, `navigations`, `notifications`, and `profiles` — a new
module copies it unchanged:

> - **`common/`**: Contains platform-independent logic (utilities, hooks, or components that work
>   in both web and native).
>   - Can import from within or other `common/` folders.
>   - Must not import from `web/` or `native/`.
> - **`web/`**: Contains web-specific components and logic (e.g., React DOM, browser APIs,
>   Material UI and others).
>   - Can import from within or `common/`.
>   - Must not import from `native/`.
> - **`native/`**: Contains native-specific components and logic (e.g., React Native, Expo,
>   React Native Paper and others)
>   - Can import from within or `common/`.
>   - Must not import from `web/`.

The enforcer is `import/no-restricted-paths`, configured with four zones at
`packages/config/.eslintrc-with-restricted-paths.js:6-33`: `common !<- web`, `common !<- native`,
`web !<- native`, `native !<- web`. It is a **separate config file**, not part of the base one, so a
package gets it only by opting in from its own `.eslintrc.js`:

```js
module.exports = require('@baseapp-frontend/config/.eslintrc-with-restricted-paths.js')
```

Two packages do that — `packages/components` and `packages/design-system`. The other six that ship
an `.eslintrc.js` (`authentication`, `graphql`, `provider`, `test`, `utils`, `wagtail`) require
`@baseapp-frontend/config/.eslintrc.js`, which carries no zones at all. A package that grows legs is
unenforced until its `.eslintrc.js` is switched to the restricted-paths twin, and nothing reports
the omission. Switch it in the same commit that creates the first leg.

One asymmetry before you lean on the zones: three targets read `**/common/**` or `**/web/**` while
the fourth reads `/**/native/**`, with a leading slash. No cross-UI import exists in the tree today,
so neither the `web !<- native` nor the `native !<- web` zone has ever fired on a real violation.

## Which leg each artefact belongs in

Sixteen artefact kinds and the leg each lands in. The default is `common/` — data, logic, and types
all go there; only rendering, styling, navigation, and platform APIs split.

| Artefact | Leg | Anchor |
|---|---|---|
| GraphQL documents | `common/graphql/` | `comments/common/graphql/queries/CommentsList.ts` |
| Relay data hooks | `common/graphql/` | `useCommentList` in the same file |
| Mutation hooks | `common/graphql/mutations/` | `useCommentCreateMutation` in `CommentCreate.ts` |
| Subscription hooks | `common/graphql/subscriptions/` | `useCommentChangeSubscription` |
| Business hooks | `common/hooks/<name>/` | `comments/common/hooks/useCommentActions/index.ts` |
| Context / stores | `common/context/` | `comments/common/context/CommentReplyProvider/` |
| Constants | `common/constants.ts` | `comments/common/constants.ts` |
| Utils | `common/utils.ts` or `common/utils/<n>/` | `comments/common/utils.ts` |
| Types | `common/types.ts` | `notifications/common/types.ts` |
| Zod schemas | `common/constants.ts` | `SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA` |
| Jest tests | `common/__tests__/` | `comments/common/__tests__/utils.test.ts` |
| Cypress tests | `web/` **only** | `comments/web/Comments/__tests__/Comments.cy.tsx` |
| Storybook | `web/` **only** | `comments/web/CommentItem/__storybook__/` |
| Styling | web `styled.tsx`, native `styles.ts` | `comments/web/CommentItem/styled.tsx` |
| Routing | web `next/*`, native `expo-router` | `comments/native/CommentItem/index.tsx` |
| `'use client'` | `web/` + `common/context/` | `comments/common/context/CommentReplyProvider/` |

Notes on the rows that are easy to get wrong:

- **Relay documents are data, not UI.** Fragments, queries, mutations, and subscriptions live in
  `common/graphql/`, and so do the hooks wrapping them — `usePaginationFragment`, `useMutation`,
  `requestSubscription`. Only two `graphql` tagged documents in the modules tree sit outside
  `*/common/graphql/`: `__shared__/common/ReactionButton/index.tsx` and
  `messages/native/graphql/queries/CreateRoomPageQuery.ts`, a leg-bound query with no reason to be.
- **Zod schemas travel with the form's constants**, not in a file named for the library. Real
  schemas are declared with `z.object` inside a `constants.ts` — `__shared__/common/constants.ts`,
  `messages/common/constants.ts`, `profiles/common/constants.ts`. `profiles/common/zod.ts` sounds
  like the schema home and holds only validation *message* strings; do not create a `zod.ts`.
- **Styling never crosses.** `styled.tsx` exports MUI `styled(...)` components and appears in zero
  native directories; `styles.ts` exports a `createStyles()` factory returning
  `StyleSheet.create({...})` and appears in zero web directories. Both are per-component-directory.
- **`'use client'` is a Next.js directive**, so it belongs on the 71 files under `web/`. The four
  `common/` files that carry it are the context providers consumed directly by web pages —
  `CommentReplyProvider`, `useCommentReply`, `ChatRoomProvider`, `GroupChatProvider`. On a native
  file it does nothing.

## Sharing a hook between the two UI legs

Both legs import the shared hook **directly from the module's `common` barrel**, using a relative
path. There is no re-export layer and no adapter:

```ts
// comments/web/CommentItem/index.tsx
import { useCommentItem } from '../../common'

// comments/native/CommentItem/index.tsx
import { DEFAULT_MAX_THREAD_DEPTH, useCommentItem } from '../../common'
```

Cross-module imports work the same way but stop at the *sibling module's leg barrel* — for example
`__shared__/web` from `comments/web/CommentItem/index.tsx` — never a deep relative path into another
module's internals.

The counter-example is `messages/native/index.ts`, which re-exports `GroupChatProvider`,
`useGroupChatCreate`, and `useCreateGroupChatMutation` out of `../common` through the native barrel.
That makes the same symbol reachable from two subpaths, and consumers stop being able to tell which
leg they depend on. Worse, `useRoomListSubscription` and `useMessagesListSubscription` are each
exported by both `messages/common/index.ts` and `messages/native/index.ts` from *different
implementations* — a consumer importing both barrels gets a silent shadowing collision, resolved by
import order. Export each symbol from exactly one leg.

## Injecting a platform capability

There is no port/adapter layer and no capability interface in the repo. Three concrete mechanisms
cover every case, in order of preference.

**1. Keep the state in `common`, render the UI per platform.** The shared code owns a headless
store; each app supplies its own surface. `useNotification` from `@baseapp-frontend/utils` is a
zustand store holding `{ message, type, open }` and exposing `sendToast` /
`sendMutationErrorToast`. `comments/common/graphql/mutations/CommentCreate.ts` calls them from
`common/` without importing a single UI package, and each app renders its own snackbar. The same
shape backs `CommentReplyProvider` for the comment composer and `ChatRoomProvider` for the chat
panel. Reach for this first: it keeps the whole behaviour testable in one jest run.

**2. Put a platform-only affordance behind a platform-only context.** When the UI mechanism itself
exists on one platform only, host it in that leg's `context/`.
`comments/native/context/CommentActionsProvider` mounts a gorhom `BottomSheetModal` and the delete
dialog once per thread, exposes `openCommentActions(comment)` through context, and fills the sheet
from the headless `useCommentActions` descriptors it imports from `../../../common`. Web's
equivalent adapter is `comments/web/CommentItem/useCommentOptions/`, feeding
`__shared__/web/ActionsOverlay`. Both consume the same descriptor list; neither pushes its widget
into `common/`.

**3. Import the platform package directly — inside the platform leg.** No indirection is needed for
navigation (`expo-router` in native, `next/navigation` and `next/link` in web) or the image picker
(`expo-image-picker` in `messages/native/EditGroupChatDetails`, `messages/native/GroupChatDetails`,
`profiles/native/ProfileSettingsComponent`). This is correct precisely because it stays in the leg.
The moment such an import moves up into `common/` it becomes mechanism 1's job instead.

Environment access follows the same line. `common/` must not read `process.env.EXPO_PUBLIC_*` or
`process.env.NEXT_PUBLIC_*` directly; `packages/graphql/config/environment.ts:79-82` resolves Expo
constants and `:114-118` resolves the token, and shared code goes through those.

## What native does not have

Stated plainly, so nothing is spent looking: there is no native Storybook and no native Cypress.

- **Storybook.** Every `__storybook__/` directory in the repo is under a `web/` leg — zero
  under `native/`, and zero `.stories` files anywhere in a native tree. A native component ships
  without a story, and that is the convention, not an omission to fix.
- **Cypress.** All twelve `.cy.tsx` component tests are under `web/`. Cypress component
  testing runs a web bundler; there is no native runner wired up.

Native's coverage therefore comes from the jest tests in `common/` plus manual verification of the
shell. That is the strongest argument for keeping a module's behaviour in `common/`: it is the only
leg with a working test story on both platforms.

Web and native are also not mirror images by design. `content-feed` has no `native/` directory at
all; `activity-log/native/index.ts` and `navigations/native/index.ts` are 0-byte files. Where both
legs exist the trees differ — `comments/native` has `CommentActionSheet` and `CommentDeleteDialog`
where web has `CommentUpdate` and an overlay. Build the leg the platform needs.

## The enforcement gap

`import/no-restricted-paths` matches on **file paths**. `expo-file-system` and `react-native` are
**package specifiers** — no path in the repo, nothing for a zone to match. So the gate that looks
like it protects `common/` misses the one import that actually breaks a platform build.

Exactly one file in the tree exploits that today:
`messages/common/graphql/mutations/CreateGroupChat.ts` does
`import * as FileSystem from 'expo-file-system/legacy'` in the platform-neutral leg, then calls
`getInfoAsync` and `uploadAsync` on it. It passes lint, ships in the `./messages/common` subpath,
and has no resolution on web.

The deterministic fix is an ast-grep rule — the repo already runs a rule set from `.ast-grep/rules/`
with snapshot tests in `.ast-grep/rule-tests/`, and `sgconfig.yml` parses `.ts` with the Tsx grammar
so one rule covers both extensions. A rule matching `import` statements whose source is
`react-native`, `react-native-*`, or `expo-*` in files under `*/common/` would have exactly one
violation to clear, then hold the line for free.

**Recommend it; do not ship it as part of a block.** Adding a rule is its own change with its own
snapshot tests and its own baseline decision. Raise it separately.

## Where the neighbouring skills take over

Two boundaries recur while splitting a module, and neither belongs here:

- **Where code lives in a consuming template** — `packages/` versus `apps/`, and when to promote
  something to a shared package — is `frontend-conventions`, in
  `frontend-conventions/references/code-sharing.md`. It governs the template repo; this file governs
  the submodule. UI in `packages/` is prohibited there and is the entire point here.
- **How a zustand store is constructed** — store shape, selectors, `useShallow`, provider wiring —
  is `frontend-patterns`, in `frontend-patterns/references/state-management.md`. This file decides
  only which leg the store lands in.

## Anti-patterns

- Importing a native-only package inside `common/` —
  `messages/common/graphql/mutations/CreateGroupChat.ts` pulls in `expo-file-system/legacy`, which
  lint cannot see and web cannot resolve.
- Reading `process.env.EXPO_PUBLIC_*` or `process.env.NEXT_PUBLIC_*` from `common/` — the same
  mutation does, so the shared leg only works under one of the two build systems.
- Writing `'use-client'` — `messages/common/graphql/subscriptions/useRoomListSubscription.tsx` opens
  with the hyphenated typo, and the directive is silently inert with nothing reporting it.
- Putting `'use client'` in a native file —
  `notifications/native/NotificationBellWithBadge/index.tsx` carries it and no bundler on that
  platform reads it.
- Re-exporting `common/` symbols through a leg barrel — `messages/native/index.ts` does, so the same
  symbol is reachable from two subpaths and neither tells a consumer which leg it depends on.
- Exporting one symbol name from two legs — `useRoomListSubscription` and
  `useMessagesListSubscription` exist in both `messages/common/` and `messages/native/`, and
  importing both barrels shadows one by import order.
- Declaring a `graphql` document outside `common/graphql/` —
  `messages/native/graphql/queries/CreateRoomPageQuery.ts` binds a data document to one platform for
  no reason.
- Adding legs to a package whose `.eslintrc.js` still re-exports the base config — only
  `components` and `design-system` opt into the restricted-paths twin, so everywhere else the
  contract is unenforced and silent.
- Creating a `zod.ts` for schemas — schemas belong in the form's `constants.ts`, and
  `profiles/common/zod.ts` already occupies the name with validation message strings.
- Mirroring a component into the other leg for symmetry — `content-feed` ships web-only and
  `activity-log/native/index.ts` is empty on purpose; an unused leg still costs review and build.
- Adding a Storybook story or a Cypress spec under `native/` — neither runner exists for that
  platform, so the file is dead weight that reads as coverage.
