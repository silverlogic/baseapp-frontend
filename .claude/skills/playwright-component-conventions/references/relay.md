# Relay-backed components

The Cypress specs drove Relay from the *test* process: they built a mock
environment, passed it in as a prop, and called `resolveMostRecentOperation()`
between UI actions. A live environment cannot cross into the browser, so the
environment is created inside the story and the spec triggers resolutions through
a bridge on `window`.

## The bridge

```tsx
export interface MembersControls {
  resolveUpdateMemberRole: () => void
  resolveNextPage: () => void
}

declare global {
  interface Window {
    __membersControls: MembersControls
  }
}

const useSeededEnvironment = (data: unknown) =>
  useMemo(() => {
    const testEnvironment = createTestEnvironment()

    testEnvironment.queueOperationResolver({ queryName: 'UserMembersListPaginationQuery', data })

    const { resolveMostRecentOperation } = testEnvironment

    window.__membersControls = {
      resolveUpdateMemberRole: () => resolveMostRecentOperation({ data: updateMemberRoleMockData }),
      resolveNextPage: () => resolveMostRecentOperation({ data: nextPageMockData }),
    }

    return testEnvironment.environment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
```

```ts
const resolve = (page: Page, key: keyof MembersControls) =>
  page.evaluate((k) => window.__membersControls[k](), key)

await saveButton.click()
await resolve(page, 'resolveUpdateMemberRole')
```

**Namespace the key per component.** Two stories both declaring
`window.__relayControls` with different shapes is a TypeScript collision that the
tests pass straight through — only `tsc` catches it. Name it after the component:
`__membersControls`, `__notificationsControls`, `__accountPopoverControls`.

Build every resolver for every story even when a given story only needs some.
They are closures; unused ones cost nothing and the surface stays uniformly
typed.

One named entry is needed per resolution point the spec drives. This is the main
cost of a Relay-backed port — budget for it when a spec has a dozen of them.

## Fixtures

**Deterministic mocks: import them in the spec.** If `__mocks__/requests.ts` has
no `faker`, the spec can import it directly to derive expected values, and there
is a single source of truth:

```ts
import { fullMembersListMockData } from './__mocks__/requests'

const memberCount = fullMembersListMockData.data.profile.members.edges.length + 1
```

**Unseeded faker: bridge them as JSON.** Fixtures built with `faker` at module
load generate *different values* in Node than in the browser, so an imported
fixture would not match what the component rendered. Expose them from the story:

```tsx
window.__accountPopoverFixtures = { user: userMockData, profile, profileList }
```

```ts
const { user } = await page.evaluate(() => window.__accountPopoverFixtures)
await expect(page.getByText(`${user.firstName} ${user.lastName}`)).toBeAttached()
```

Values cross fine as plain JSON, and `__mocks__/` stays the source of truth. The
alternative — seeding faker on both sides — is fragile and depends on module load
order.

## Replacing module stubs

`cy.stub(authHooks, 'useJWTUser')` and friends monkey-patched exported hooks. That
is impossible across the process boundary, but every case so far had a real
injection point, and the replacements tend to assert something stronger.

### Router

The harness accepts a Storybook-style `context`; for the router, supply React
context directly:

```tsx
<PathnameContext.Provider value="/dashboard">
  <AppRouterContext.Provider value={routerMock as any}>
    <ComponentForTesting … />
  </AppRouterContext.Provider>
</PathnameContext.Provider>
```

`usePathname()` drives active-link state, so `PathnameContext` is what makes an
"active item" test meaningful. Note `history.pushState()` before mounting does
nothing — `mount()` navigates, discarding it.

### Authenticated user

`useJWTUser` reads the access token from `CookieProvider` and decodes it. Seed it
through the harness's `initialCookies` with an unsigned JWT — `decodeJWT` only
base64-decodes and camelizes the payload:

```tsx
const toJwt = (payload: object) => {
  const encode = (v: object) =>
    btoa(JSON.stringify(v)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  return `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(payload)}.signature`
}

const initialCookies = { [ACCESS_KEY_NAME]: toJwt(userMockData) }
```

### react-query and `placeholderData`

`useJWTUser` also fetches the user, and the decoded token is only
`placeholderData`. How you handle that request decides whether the placeholder
survives:

| Route handling | Effect |
|---|---|
| `route.fulfill(...)` | query succeeds; placeholder **replaced** by the response body |
| `route.abort()` | query errors; react-query **discards** placeholderData |
| never respond | query stays pending; placeholder **persists** |

Only the third reproduces "the hook always returns the mock user":

```ts
await page.route('**/users/**', () => {})
```

`abort()` looks right and passes locally, then fails under CI concurrency once an
assertion lands after the error rather than during the pending window. That was a
real flake — worth recognising the shape.

### Observing effects instead of spying

When there is no injection point, assert the side effect. `LogoutItem` calls
`useLogout()` bare, but `logout()` ends in `broadcastEvent(LOGOUT_EVENT)` after
clearing tokens, so the story can subscribe:

```tsx
useEffect(
  () => subscribeToBroadcastEvent(LOGOUT_EVENT, () => setLogoutCount((c) => c + 1)),
  [],
)
```

This is stronger than the original spy: it proves logout ran its side effects
rather than merely that a function was called.

Cookies work the same way — `setCurrentProfile` writes `CurrentProfile` via
js-cookie, so a profile switch is verifiable through
`page.context().cookies()` even though the component reloads the page immediately
afterwards.

**Clear cookies in `beforeEach`** whenever a test writes one. With
`reuseContext: true` a real cookie leaks into later tests in the same worker.
