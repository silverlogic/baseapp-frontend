# Porting a Cypress spec

## API mapping

| Cypress | Playwright | Note |
|---|---|---|
| `cy.mount(<X … />)` | `mount('path/to/X/Story')` | the JSX moves into a story |
| `cy.findByText(t)` | `getByText(t, { exact: true })` | Testing Library matches full strings, Playwright substrings |
| `cy.findByRole(r, { name })` | `getByRole(r, { name, exact: true })` | same asymmetry applies to accessible names |
| `cy.findAllByX(...).first()/.last()` | `getByX(...).first()/.last()` | |
| `.should('exist')` | `toBeAttached()` | `toBeVisible()` is a stronger, different claim |
| `.should('not.exist')` | `not.toBeAttached()` | |
| `.should('have.css', p, v)` | `toHaveCSS(p, v)` | |
| `.should('have.css', p).and('not.equal', v)` | `not.toHaveCSS(p, v)` | |
| `.should('have.attr', a, v)` | `toHaveAttribute(a, v)` | |
| `.should('have.value', v)` | `toHaveValue(v)` | |
| `.should('have.length', n)` | `toHaveCount(n)` | |
| `.type(s)` | `pressSequentially(s)` | `fill()` fires one event — breaks masks and per-keystroke validation |
| `.type('{selectall}')` | `page.keyboard.press('ControlOrMeta+a')` | |
| `.clear()` | `clear()` | |
| `.blur()` | `blur()` | |
| `.scrollIntoView()` | `locator.evaluate(el => el.scrollIntoView())` | `scrollIntoViewIfNeeded()` no-ops when visible |
| `.selectFile(p)` | `setInputFiles(p)` | path resolves in Node, so `path.join(__dirname, …)` |
| `.trigger('mouseover')` | `hover()` | Cypress never activated CSS `:hover`; Playwright does |
| `cy.viewport(w, h)` | `page.setViewportSize({ width, height })` | before `mount()` |
| `cy.step(t)` | `test.step(t, async () => {…})` | wraps the work rather than marking a point; nests |
| `cy.stub()` + `have.been.called` | story state recorded into a hidden form | see SKILL.md |
| `cy.stub(module, 'hook')` | context provider / cookie / observed effect | see `relay.md` |
| `cy.get('body').click(0, 0)` | `page.mouse.click(0, 0)` | |
| `cy.window()` | `page.evaluate(…)` | |
| `.parent()` | `.locator('..')` | |
| `cy.get('@alias')` | a local `const` | aliases have no equivalent and need none |
| `resolveMostRecentOperation(…)` | `page.evaluate` on the story's bridge | see `relay.md` |

## Structure

A Cypress mega-test carved into `cy.step`s does not have to stay one test. Each
`mount()` navigates fresh, so splitting is cheap and the parts parallelise.

Split on **state dependence**: if a step operates on state an earlier step built
(create → edit → delete the same record), it must stay in one test as a
`test.step`. If it is independent, make it its own test.

Do not wrap a whole test body in a single `test.step` whose title restates the
test name — that is ceremony without information.

## Assertion smells

Roughly a dozen assertions in the original suite verified nothing. Copying them
faithfully preserves the illusion of coverage, so read each one and decide whether
it means what its name claims.

**`should('have.css', prop)` with no expected value** passes for any element that
has the property — i.e. always. Three tests used this to "verify" colours and
highlighting. Assert a real value, or compare two states (light vs dark theme,
hovered vs resting).

**`should('have.been.called')` satisfied by mounting.** `VerticalDrawer` has
`useEffect(() => { if (openNav) onCloseNav() }, [pathname])`, so four tests
asserted a callback fired when nothing but the mount caused it. A recorded
*count* exposes this: assert the value at mount, then the increment after the
interaction.

**`expect(a).to.be.lessThan(b && c && d)`** collapses to `d`, so an ordering check
across four rows only ever compared the first and last. Assert the full ordering.

**Asserting on a local stub the component never receives.** One test created a
stub, called it directly, and asserted it was called. Delete tests like this
rather than porting them.

**Assertions about a virtualiser's window rather than the data.** A pagination
test asserted that row five was absent, but row five *was* in the fixture — it was
merely scrolled out. Whether the virtualiser keeps four rows or five is a layout
coincidence, which made that test ~50% flaky. Assert what is genuinely absent:
the *next page* has not been fetched.

## Divergence is often the right call

When the Cypress assertion is unstable or vacuous, write the assertion that means
what the test name says and document the change inline — a comment explaining why
the original was replaced is more useful to the next reader than a faithful port
of something broken. Flag it in the PR so the divergence is a decision rather
than a surprise.
