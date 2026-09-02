# Barrels and the public API

A leg's `index.ts` is the only thing a consumer can import. Everything it names is public and must
stay importable; everything it omits is free to move. The barrel is also the file that decides how
much of the module lands in a consumer's bundle, because a bundler that cannot prove a re-export
unused keeps it. Get it wrong and you ship a module that cannot be refactored and cannot be shaken.

Paths below are relative to `packages/components/modules/`.

## Contents

- [The grammar](#the-grammar)
- [Cap the barrel at the public surface](#cap-the-barrel-at-the-public-surface)
- [One name, one leg](#one-name-one-leg)
- [Crossing a module boundary](#crossing-a-module-boundary)
- [Where the neighbouring skills take over](#where-the-neighbouring-skills-take-over)
- [Anti-patterns](#anti-patterns)

## The grammar

Two lines per component directory, the value and its types, listed by name:

```ts
// exports web comments components

export { default as CommentCreate } from './CommentCreate'
export type * from './CommentCreate/types'

export { default as CommentItem } from './CommentItem'
export type * from './CommentItem/types'
```

That is `comments/web/index.ts` unedited. `content-feed/web/index.ts`, `profiles/native/index.ts`,
`notifications/web/index.ts`, and `__shared__/web/index.ts` follow it. Three rules hold across all
of them:

- **Every file is named.** No `export * from './SomeDir'` over a directory — the barrel must list
  what it exports so a reader can see the surface without opening the tree, and so a bundler can
  drop what nobody imported.
- **`export type *` for the types file.** The type-only form erases at compile time and never
  contributes a runtime edge. `export * from './X/types'` on a pure type module leaves the bundler
  an import to resolve.
- **Plain `export *` only for a module that exports runtime values.** `common` barrels use it over
  individual graphql files — `comments/common/index.ts` re-exports each of
  `graphql/mutations/CommentCreate`, `graphql/queries/CommentItem`, and their siblings on its own
  line, because those files export hooks and documents, not types. It is still one line per file.

`common/index.ts` opens with a `// exports common <module> code` comment; the leg barrels open with
the web or native equivalent. Keep it — it is the only marker distinguishing three files with the
same name in a diff.

A `common/types.ts` is part of the public surface and needs its own line —
`export type * from './types'`, as in `messages/common/index.ts`, `profiles/common/index.ts`, and
`activity-log/common/index.ts`. Two modules have the file and forgot the line: the types in
`notifications/common/types.ts` (`Notifications`, `NotificationsEdges`, `NotificationsNode`) and in
`content-feed/common/types.ts` are unreachable from outside, so a consumer typing a prop against a
notification node has no name for it and reaches for the generated Relay type instead.

## Cap the barrel at the public surface

A barrel re-exporting every internal file is a bundle-size bug, not a convenience. The measured
case behind that claim dropped one chunk from **552 kB to 64 kB** when the barrel was removed, and
the working threshold from the same literature is **more than 20 re-exports in one barrel = treat
it as a defect**. The cost is not only bytes: every entry is a module the TypeScript server and the
dev server resolve on each edit.

Four barrels are already over the line — `messages/common/index.ts` (36 re-exports),
`profiles/common/index.ts` (28), `navigations/web/index.ts` (26), and `messages/web/index.ts` (22).
None of them is a target to copy. What pushes them over is re-exporting internals: individual
graphql documents, per-hook constants, sub-components that only the module's own entry point
renders.

The test for a new line in a barrel is whether a consumer outside the module needs the symbol. A
component another package renders, a hook an app calls, the types those two require — yes. A
subscription hook the module's own list component wires up, a constants map two of its files share,
a sub-component of an exported component — no. Those stay reachable by relative path inside the
module and cost nothing.

The barrel is also load-bearing for tree-shaking in a way its size hides: the module's shake-ability
depends on the package declaring itself side-effect free, and every entry in the barrel is a
candidate the bundler must then prove unused. A shorter barrel is a smaller proof.

## One name, one leg

An exported name must come from exactly one leg. `messages` breaks this twice over:
`messages/common/index.ts` and `messages/native/index.ts` both export `useMessagesListSubscription`
and both export `useRoomListSubscription` — two separate implementations under two subpaths, sharing
a name. The native pair reimplements the common one against `expo-router`'s focus effect. A consumer
importing both barrels gets whichever the bundler resolved last, silently, with no error at build or
at runtime.

The same file re-exports `common` symbols outward: `messages/native/index.ts` ships
`GroupChatProvider`, `useGroupChatCreate`, and `useCreateGroupChatMutation` from `../common`. That
makes one symbol reachable from two subpaths, so nothing in a consumer's import graph records which
leg it actually depends on, and a later change to the common implementation looks native-only.

Web and native share a `common` symbol by importing it directly from the `common` barrel. Never by
re-export.

## Crossing a module boundary

Cross-module imports are normal and go through the sibling module's **leg barrel** —
`../../../<module>/<leg>`, three levels up and no further:

```ts
// comments/web/CommentItem/index.tsx
import { ActionsOverlay, Timestamp as DefaultTimestamp } from '../../../__shared__/web'
```

`content-feed/web/PostReactionButton` reaches `__shared__/common` the same way,
`messages/web/ChatCreate` reaches `profiles/common`, and
`messages/web/ChatRoomsComponent/styled.tsx` reaches `navigations/web`. The path stops at the leg;
what happens under it is the other module's business.

Eight imports in the tree go deeper, and they split into two failures. The gratuitous kind reaches
past a barrel that already exports the symbol — `navigations/web/NavMini/types.ts` imports from
`notifications/web/NotificationsPopover/types` although `notifications/web/index.ts` exports
`NotificationsPopover` and its types. Fix by shortening the path. The load-bearing kind reaches for
something the barrel does not export — `messages/native/EditGroupChatDetails` imports
`profiles/native/ProfileSettingsComponent/BottomDrawer`, which `profiles/native/index.ts` does not
name. That is a missing public export dressed as an import: either add the symbol to the owning
module's barrel or move it to `__shared__`, and never let the deep path stand as the answer.

Nothing lints this. The restricted-paths config polices leg direction, not import depth, so a deep
cross-module path passes every gate in the repo and is only ever caught in review.

## Where the neighbouring skills take over

- **How the re-export forms behave in the type system** — `export type`, `import type`,
  `isolatedModules`, and when a type-only re-export is required rather than preferred — is
  `frontend-conventions`, in `frontend-conventions/references/typescript.md`. This file decides
  what a leg exports; that one decides how the export is written in TypeScript terms.

## Anti-patterns

- Star-globbing a directory — `pages/web/index.ts` is the single line
  `export * from './PageComponent'`, so the module's whole surface is whatever that directory
  happens to export today.
- Using plain `export *` on a types file — it survives to runtime as an import the bundler must
  resolve, where `export type *` erases.
- Re-exporting a `common/` symbol through a platform barrel — `messages/native/index.ts` does, and
  the same symbol then arrives from two subpaths with no record of which leg a consumer depends on.
- Shipping one exported name from two legs — `useMessagesListSubscription` and
  `useRoomListSubscription` exist in both `messages/common/` and `messages/native/`, and importing
  both barrels shadows one by resolution order with nothing reporting it.
- Letting a barrel past ~20 re-exports — `messages/common/index.ts` carries 36, and the documented
  cost of a kitchen-sink barrel is a chunk that went 552 kB to 64 kB once one was removed.
- Adding a `common/types.ts` without its `export type * from './types'` line —
  `notifications/common/types.ts` and `content-feed/common/types.ts` are both unreachable from
  outside their module.
- Importing past a sibling module's leg barrel — `navigations/web/NavMini/types.ts` reaches into
  `notifications/web/NotificationsPopover/types` for a symbol that barrel already exports.
- Treating a deep cross-module path as the fix for a missing export —
  `messages/native/EditGroupChatDetails` pulls `BottomDrawer` out of `profiles/native` internals, so
  a private component now has an external consumer and no owner knows it.
