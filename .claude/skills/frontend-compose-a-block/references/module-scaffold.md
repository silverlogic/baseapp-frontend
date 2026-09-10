# Module scaffold

A module is a directory under `packages/components/modules/<name>/`, split into the three legs
`common/`, `web/`, and `native/`. Below the legs the shape is uniform: every component, hook, and
context is its own directory whose entry point is `index.*`, with its types beside it in `types.ts`.
Misname a leaf and nothing fails — the file still compiles and still ships. It just stops matching
the shape every barrel, story, and generated-type import in the package assumes, and the next
component copied from it inherits the divergence.

Paths below are relative to `packages/components/modules/`.

## Contents

- [Directory shape](#directory-shape)
- [Component directory](#component-directory)
- [Hook directory](#hook-directory)
- [Context directory](#context-directory)
- [Leaf files: create when](#leaf-files-create-when)
- [Copy from](#copy-from)
- [Where the neighbouring skills take over](#where-the-neighbouring-skills-take-over)
- [Anti-patterns](#anti-patterns)

## Directory shape

```text
packages/components/modules/<name>/
├── README.md                     # the three import rules, copied verbatim from a sibling module
├── common/                       # platform-neutral leg
│   ├── index.ts                  # leg barrel — one `exports` subpath in package.json
│   ├── constants.ts              # module constants; zod schemas live here too
│   ├── utils.ts                  # pure helpers — or utils/<fn>/index.ts plus a barrel
│   ├── types.ts                  # types derived from the generated Relay types
│   ├── __tests__/utils.test.ts   # jest — this leg only
│   ├── context/
│   │   ├── <Name>Provider/       # index.tsx · types.ts · constants.ts
│   │   ├── use<Name>/index.tsx
│   │   └── with<Name>Provider/index.tsx
│   ├── graphql/
│   │   ├── queries/              # fragments sit here in comments, notifications, activity-log
│   │   ├── fragments/            # …or in this sibling, in messages, profiles, content-feed
│   │   ├── mutations/
│   │   └── subscriptions/
│   └── hooks/
│       └── use<Name>/            # index.ts · types.ts
├── web/
│   ├── index.ts
│   └── <Component>/              # index.tsx · styled.tsx · types.ts
│       ├── <Child>/              # same shape, recursively
│       ├── use<Something>/       # component-local hook dir — index.tsx · types.ts
│       ├── __storybook__/        # stories.tsx · <Name>.mdx · mockResolvers.ts ·
│       │                         #   <Name>WithQuery/index.tsx
│       └── __tests__/            # <Name>.cy.tsx · __mocks__/ · __utils__/<Name>ForTesting/
└── native/
    ├── index.ts
    ├── context/                  # platform-only stores, same triplet shape
    └── <Component>/              # index.tsx · styles.ts · types.ts
        └── <Child>/
```

Two things about this tree are thinner in practice than they look. `common/hooks/` exists in
exactly one module — `comments`, with four hook directories; every other module either has no
shared hooks or puts them elsewhere. And `graphql/queries/` versus `graphql/fragments/` is an
unresolved split, not a rule: pick one per module and keep every document under `common/graphql/`.

## Component directory

**Web** — `comments/web/CommentItem/`:

```text
index.tsx        the component; default export. Never <Name>.tsx.
styled.tsx       named exports of MUI styled(...) components
types.ts         the exported Props interface, plus styled-component prop types
constants.ts     only when needed — content-feed/web/PostForm/constants.ts
utils.ts         only when needed — messages/web/AllChatRoomsList/ChatRoomItem/utils.ts
<Child>/         nested child components, same shape, recursively
use<Something>/  component-local hook dir — comments/web/CommentItem/useCommentOptions/
__storybook__/   stories.tsx · <Name>.mdx · mockResolvers.ts · <Name>WithQuery/index.tsx
__tests__/       <Name>.cy.tsx · __mocks__/{requests,resolvers,constants}.ts ·
                 __utils__/<Name>ForTesting/index.tsx
```

**Native** — `comments/native/CommentItem/`: the same shape with one substitution and two omissions.
`styles.ts` replaces `styled.tsx`, and there is no `__storybook__/` and no `__tests__/`.

`styles.ts` exports a **factory**, not an object — `createStyles` in
`comments/native/CommentItem/styles.ts` returns `StyleSheet.create({ … })`, and the component calls
`const styles = createStyles()` in its render body. The factory form is what lets a call site pass
theme values in later without restructuring every consumer.

Neither `styled.tsx`/`styles.ts` nor `types.ts` is unconditional. `comments/native/CommentItem/
CommentPinBadge/` ships `index.tsx` and `styles.ts` with no `types.ts` because it takes no props;
`comments/native/CommentDeleteDialog/` ships `index.tsx` and `types.ts` with no `styles.ts` because
it renders a paper dialog it does not restyle. Add the file when the component needs it.

## Hook directory

A hook directory holds two files:

```text
index.ts     the hook; default export
types.ts     Use<Name>Options and Use<Name>Return, doc-commented
```

`comments/common/hooks/useCommentItem/types.ts` exports `UseCommentItemOptions` and
`UseCommentItemReturn`; `useCommentCreateForm` and `useCommentUpdateForm` follow the same pair, the
latter two adding a third exported type, `CommentSubmitOptions`. `useCommentActions` exports
`UseCommentActionsOptions` and the descriptor type `CommentAction` — a hook returning a plain array
names the element type instead of inventing an empty `…Return` wrapper.

Annotate the return type explicitly on the signature rather than letting it infer:
`useCommentItem` in `comments/common/hooks/useCommentItem/index.ts` is declared
`(…: UseCommentItemOptions): UseCommentItemReturn<TElement>`, so a change to what the hook returns
breaks at the hook, not at the two UI legs that consume it.

## Context directory

Three sibling directories per store, always all three:

```text
<Name>Provider/index.tsx        creates the zustand store in a useRef, exposes a React Context
<Name>Provider/types.ts         the store's state interface
<Name>Provider/constants.ts     the store's initial state
use<Name>/index.tsx             useContext + useStore(store, selector)
with<Name>Provider/index.tsx    HOC wrapping a component in the provider
```

The reader throws when it is used outside its provider — `useCommentReply` in
`comments/common/context/useCommentReply/index.tsx` does `throw new Error('Missing
CommentReplyProvider')`, which turns a silently-undefined store into a named failure at first
render. It also takes an optional `selector`, defaulting to the whole state.

The HOC is what makes the triplet worth having: `comments/web/Comments/index.tsx` is four lines —
`export default withCommentReplyProvider(BaseComments)`. The provider never appears in a consuming
app's tree by hand.

## Leaf files: create when

| File | Directory | Create when |
|---|---|---|
| `index.tsx` | component, context, local hook | always — the entry point, default export |
| `index.ts` | shared hook dir, leg root | always |
| `types.ts` | any dir with exported types | the dir exports props, options, or state types |
| `styled.tsx` | web component dir | the component declares MUI `styled(...)` |
| `styles.ts` | native component dir | the component declares `StyleSheet` rules |
| `constants.ts` | component, context, module | values outlive a render — keys, defaults, schemas |
| `utils.ts` | component, module | pure helpers with no React in them |
| `__storybook__/` | web component dir | the component is presentational enough to pose |
| `__tests__/` | web component dir, `common/` | a cypress spec (web) or a jest spec (`common/`) |

`index.tsx` versus `index.ts` follows JSX, not directory kind: a hook returning no element is `.ts`
(`comments/common/hooks/useCommentActions/index.ts`), a hook or HOC returning one is `.tsx`
(`comments/common/context/withCommentReplyProvider/index.tsx`).

## Copy from

**Copy `modules/comments`.** It is the newest substantive module — its last feature commit is
`feat: React Native comments — all logic shared with web via a common hook layer (#392)`, and it is
the only module carrying an architecture README past the boilerplate import rules. It is also the
only module with a `common/hooks/` directory, the only one with jest unit tests on `common/` **and**
a cypress spec **and** storybook on every web component, and its `Use*Options`/`Use*Return` pairs
are the reference for the hook shape above.

Three places look like precedents and are not:

- **`modules/messages`** — actively developed and the highest-debt module in the package. It holds
  the only `graphql/` directory outside `common/` (`messages/native/graphql/`), keeps
  `useLeaveGroup` at `common/` root instead of `common/hooks/`, adds a second `__shared__/` inside
  each of its two UI legs, and supplies all thirteen `type.ts` files in the repo.
- **`modules/activity-log`** — the most legacy module; its last feature commit predates the others
  by eight months. `activity-log/native/index.ts` is a **0-byte file** still listed in the package
  `exports` map, and its storybook entry is a bare `ActivityLogWithQuery.tsx` where every other
  module uses `<Name>WithQuery/index.tsx`.
- **`packages/wagtail`** — a Relay decoy at the package level. It carries `relay.config.js`,
  `babel-plugin-relay`, `relay-compiler`, and the three `relay:*` scripts, but contains **zero**
  `graphql` tagged documents and its `build` never invokes the compiler. Its `modules/` has no
  `common`/`web`/`native` legs at all, so nothing in it demonstrates the split.

## Where the neighbouring skills take over

Three questions come up while laying out a component directory and none is answered here:

- **What goes inside `styled.tsx` or `styles.ts`** — tokens, theme access, the Tailwind-to-MUI
  boundary — is `frontend-conventions`, in `frontend-conventions/references/styling.md`.
- **Which primitive a web component should compose** instead of restyling a raw MUI element is
  `frontend-design-system`, in `frontend-design-system/references/primitives-web.md`.
- **How a dialog or action sheet is wired** once it has a directory is `frontend-patterns`, in
  `frontend-patterns/references/dialog.md`.

## Anti-patterns

- Naming a component file `<Name>.tsx` — the `components/` folder inside
  `profiles/web/ProfileComponent/ReportButtonWithDialog/` holds five of them
  (`ConfirmationStep.tsx`, `ReportDialogContent.tsx`, `SelectReportTypeStep.tsx`,
  `SummaryStep.tsx`, `TextStep.tsx`), and each had to hoist its props into the parent's `types.ts`
  because it has no directory of its own to put them in.
- Naming a types file `type.ts` — thirteen directories under `messages/native/` do, every one of the
  repo's singular-form files, so a reader grepping `types.ts` across the module finds nothing there.
- Naming a types file `types.tsx` — `content-feed/web/PostImageSlide/types.tsx` is the only one in
  the package and declares no JSX, so the extension buys nothing and breaks the pattern for the next
  component copied from it.
- Putting a shared hook anywhere but `common/hooks/<name>/` — `messages/common/useLeaveGroup/` sits
  at the leg root with an `index.tsx`, so the module has no one place to look for its shared logic.
- Adding a `hooks/` directory to a UI leg — `__shared__/web/hooks/useFormMentions/` is the only one,
  and a hook in `web/` is a hook `native/` is structurally barred from importing.
- Creating a module-local `__shared__/` — `messages/web/`, `messages/native/`, and
  `navigations/web/` each have one alongside the top-level `modules/__shared__/`, so four
  directories compete for the name and a component gets duplicated instead of promoted.
- Shipping a leg whose `index.ts` is 0 bytes — `activity-log/native/index.ts` and
  `navigations/{common,native}/index.ts` are empty files with live `exports` entries aimed at them.
- Leaving a `.keep` behind after the directory fills up — `comments/native/.keep` and
  `tests/{common,native}/.keep` still read as "this leg is a placeholder" when one of them is not.
- Breaking the `<Name>WithQuery/index.tsx` storybook wrapper into a bare `<Name>WithQuery.tsx` —
  `activity-log/web/ActivityLogComponent/__storybook__/` does, and the wrapper then has nowhere to
  put its own `types.ts` when it grows one.
- Exporting an object from a native `styles.ts` instead of a `createStyles()` factory — every native
  directory in the package exports the factory, and a plain object cannot take theme input later
  without touching every call site.
