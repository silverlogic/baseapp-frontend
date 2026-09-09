---
name: playwright-component-conventions
description: How component tests are written in the baseapp-frontend packages — `*.pw.ts` specs beside `*.story.tsx` stories under `__tests__/`, a webpack-served story gallery, Relay bridging, and portal-scoped queries. Use this whenever adding, editing, debugging or porting a component test in this repo, or when the user mentions `.pw.ts` files, story files, the gallery, the `mount()` fixture, or converting a `.cy.tsx` spec — even if they never say "Playwright". Read it before writing a new spec, because several conventions here deliberately diverge from Playwright's own documentation and from Testing Library habits, and getting them wrong produces tests that fail confusingly or pass while asserting nothing.
---

# Component testing conventions

These packages test components with Playwright's built-in `mount()` fixture
(Playwright ≥ 1.62) against a **story gallery** served by the package's own
webpack dev server.

Playwright's own skill — `packages/components/.claude/skills/playwright-component-testing/`
— documents the upstream gallery *contract* and is the reference for how
`window.mount` works. It is vendored from `npx playwright init-skills` and gets
regenerated on upgrade, so never edit it. This skill covers what *this repo*
decided, including several points where we depart from it.

## Where things live

```
modules/<domain>/<platform>/<Component>/__tests__/
├── <Component>.pw.ts                       ← the spec (runs in Node)
├── <Component>ForTesting/index.tsx         ← existing provider harness, if any
├── __mocks__/requests.ts                   ← existing fixtures
└── __utils__/
    └── <Component>.story.tsx               ← the story (runs in the browser)
```

Shared infrastructure lives at the package root:

```
playwright.config.ts                        ← two projects: chromium + webkit
playwright/
├── gallery/{index.html,main.tsx}           ← the gallery page
├── webpack.gallery.config.cjs              ← serves it on 127.0.0.1:3100
└── fixtures/                               ← files for upload tests
```

**Specs are named `*.pw.ts`, not `*.spec.ts`.** Jest's `testMatch` in
`@baseapp-frontend/test` is `**/*.(spec|test).(ts|tsx)`, so a `.spec.ts` inside
`modules/` would be collected by `test:unit` and fail there. `.pw.ts` is
invisible to Jest.

**Story ids are location-independent.** `toId` in the gallery strips
`__tests__/__utils__`, so a story at
`modules/navigations/web/NavMini/__tests__/__utils__/NavMini.story.tsx` mounts as:

```ts
const STORY = 'navigations/web/NavMini/NavMini'
await mount(`${STORY}/Default`)
```

Ids are plain strings resolved at runtime — a rename breaks specs with no
compile error — so keeping them stable across moves is deliberate.

## The division of labour

The spec runs in **Node**; the story runs in the **browser**. Everything the
component needs to render must be set up inside the story; everything the spec
asserts must be observable through the DOM.

The practical rule when porting: **anything that used to be an argument to
`cy.mount()` belongs in a story** — theme, mock data, providers, callbacks. The
spec keeps a story id and the assertions.

## Writing a story

Start from the existing `*ForTesting` harness when there is one. It already
composes the provider stack, so a story is usually just the harness plus one
scenario:

```tsx
import NavMiniForTesting from '../NavMiniForTesting'

export const Default = () => (
  <NavMiniForTesting navData={navDataMock} openNav={false} onCloseNav={() => {}} />
)
```

When no harness exists, wrap what the Cypress spec wrapped — often
`ThemeProvider` directly, sometimes `withComponentCompleteTestProviders` from
`modules/tests/web`.

**One export per scenario.** Prefer a new export over parameterising an existing
one: stories are greppable documentation of component states, and `mount()`'s
second argument only carries plain JSON, so anything involving a React component
or a stateful callback has to be its own export anyway.

### Recording callbacks

`cy.stub()` has no equivalent, because a spy cannot drive browser-side state. The
story owns the state, provides the callback, and records the outcome into a hidden
form the spec can read:

```tsx
export const RecordsCloseNav = () => {
  const [closeNavCount, setCloseNavCount] = useState(0)

  return (
    <>
      <NavMiniForTesting openNav onCloseNav={() => setCloseNavCount((c) => c + 1)} … />
      <form hidden>
        <input data-testid="close-nav-count" readOnly value={String(closeNavCount)} />
      </form>
    </>
  )
}
```

```ts
await expect(component.getByTestId('close-nav-count')).toHaveValue('2')
```

Record a **count**, not a boolean. Counts distinguish "called once" from "called
twice", which is how a mount-time call gets noticed rather than silently
satisfying the assertion. `toHaveValue` also retries, where an assertion against
a Node-side array would not.

Function props *can* cross the boundary — Playwright marshals them as callable
bindings — but prefer the recorder: a Node-side callback cannot cause a
re-render, and asserting on a Node array is a non-retrying check that races.

## Writing a spec

### Portaled content comes from `page`, not `component`

`mount()` returns a Locator scoped to `#root`. MUI's `Drawer`, `Dialog`,
`Popover` and `Select` render through a Portal, outside `#root`:

```ts
const component = await mount(`${STORY}/Open`)

await expect(page.getByRole('presentation')).toBeVisible()      // drawer → page
await expect(component.getByTestId('close-nav-count')).toHaveValue('1')  // recorder → component
```

Cypress never hit this because `cy.contains()` searched the whole document. A
role query also excludes the `aria-hidden` layout behind an open modal, which
keeps the match unique where a text query would trip strict mode.

### `getByRole`'s `name` matches substrings

Testing Library's `findByRole` matches the full accessible name; Playwright
matches a case-insensitive substring. Without `exact`, `'Menu Item 1'` also
matches `'Menu Item 10'`:

```ts
scope.getByRole('button', { name: title, exact: true })
```

The same applies to `getByText`, where `{ exact: true }` reproduces Testing
Library's default.

### Virtualised lists need a real scroll

`scrollIntoViewIfNeeded()` does nothing when the element is already visible, so
it never advances a `react-virtuoso` window and the next batch of rows never
mounts. Cypress's `scrollIntoView()` always scrolls:

```ts
const scrollTo = (locator: Locator) => locator.evaluate((el: Element) => el.scrollIntoView())
```

Walk such lists one row at a time — assert the row is attached, then scroll to it
so the next one renders.

### Viewports

Set the viewport imperatively before `mount()`:

```ts
test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
})
```

`test.use({ viewport })` was tried and behaved *worse* for measurement-sensitive
components — prefer the imperative form unless you have a reason.

### Typing

Use `pressSequentially()` rather than `fill()` for masked inputs and anything
validated by react-hook-form. `fill()` dispatches one input event, which leaves
per-keystroke validation and input masks unapplied — a submit button stays
disabled and phone formatting never happens.

This bites hardest on `Controller`-wrapped fields — `withController(...)` around a
MUI `TextField`, which is what `SocialTextField`, `SocialInput` and the
comment/message inputs all resolve to. There `fill()` writes the DOM value
directly and React never sees a change: `toHaveValue()` and `inputValue()` report
the new text while RHF's `formState` still holds the default. The button stays
disabled and the failure looks like a validation bug rather than a typing bug.
`page.keyboard.insertText()` fails identically.

Measured on `SendMessage`, both engines: `fill()` and `insertText()` left the
submit button disabled at 13 and at 1000 characters, while
`pressSequentially()` enabled it — taking 1260 ms for 1000 characters. Long input
is not a reason to reach for `fill()`.

## Relay-backed components

These need a browser-side control bridge. See **`references/relay.md`** for the
pattern, fixture handling, and how to replace auth/router module stubs.

## Porting a Cypress spec

See **`references/translation.md`** for the API mapping and — just as important —
the assertion smells worth fixing rather than translating. Eleven assertions in
the original suite verified nothing at all, and copying them faithfully would
have carried that forward.

## Running

```bash
pnpm test:component        # both engines, headless
pnpm test:component:ui     # interactive UI mode
pnpm gallery               # serve the gallery alone, browse stories by hand
```

`test:component` runs `pnpm relay` first — the gallery will not compile without
the generated Relay artifacts.

To eyeball a story, run `pnpm gallery` and open `http://127.0.0.1:3100/`, then in
the console:

```js
await window.mount({ story: 'navigations/web/NavMini/NavMini/Default' })
```

That is exactly what the fixture does. Leave the gallery running while iterating
and Playwright reuses it, which removes the webpack build from every run.

## Things that will surprise you

- **`playwright/gallery/index.html` is deliberately unstyled.** Adding
  `height: 100%` changes the layout path for components that measure their
  container: virtualised lists then see an unbounded box, render every row and
  fire `endReached`, changing the behaviour under test.
- **`window.location.reload` cannot be stubbed** — non-configurable in both
  Chromium and WebKit. Aborting the reload's navigation preserves the document in
  WebKit but not Chromium. Assert what survives the reload instead (cookies,
  storage), or the guarded path that never reloads.
- **`__tests__/**` is eslint-ignored and Sonar-excluded.** Specs and stories get
  prettier via lint-staged but no lint or static analysis. Typecheck (`tsc`) does
  cover them, and it is the only thing that will catch e.g. two stories declaring
  the same `window` key.
- **Import `node:path`, not `path`** — Sonar flags the bare specifier.
- **WebKit runs in CI too**, so both engines must pass. It has caught exactly one
  real divergence so far (action buttons not persisting after a cancelled edit),
  and the geometry assertions have always agreed.

## Before you finish

- `pnpm test:component` green on **both** engines
- `pnpm exec tsc --noEmit` clean — run it unfiltered; global errors such as
  `TS2688` carry no filename and are easy to miss when grepping by file
- Story ids in the spec match the story file's location
- Any new `window` bridge key is namespaced to its component
