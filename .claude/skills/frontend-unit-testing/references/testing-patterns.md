# Frontend unit-testing patterns (copy-paste)

Real patterns pulled from existing BaseApp tests. Adapt names; keep the structure.

**Runner note:** sections 1–4 below are in **Jest** form (the default for not-yet-migrated packages).
For **Vitest** packages, the structure is identical — only the mocking API differs. See
[§5 Vitest variants](#5-vitest-variants) and the [Jest→Vitest cheatsheet](#jestvitest-porting-cheatsheet).
Pick the runner from the package's `test:unit` script (see SKILL.md → "Pick the runner").

## 1. Pure util / function

No mocks, no wrapper needed. Import from the real module, assert behavior + edge cases.

```ts
import type { User } from '../../../types/user'
import { checkPermissions, normalizePermissions } from '../index'

describe('normalizePermissions', () => {
  it('returns a sorted copy of the input array', () => {
    expect(normalizePermissions(['b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
  })

  it('does not mutate the original array', () => {
    const input = ['b', 'a']
    normalizePermissions(input)
    expect(input).toEqual(['b', 'a'])
  })
})
```

## 2. Hook (with boundary mocks)

Use `renderHook` from `@baseapp-frontend/test`. Mock the data edges (`useQuery`, auth hooks) — never the
hook under test. Reset mocks in `beforeEach`.

```ts
import { useJWTUser } from '@baseapp-frontend/authentication'
import { renderHook } from '@baseapp-frontend/test'
import { useQuery } from '@tanstack/react-query'

import useUserWithPermissions from '../index'

jest.mock('@baseapp-frontend/authentication', () => ({
  ...jest.requireActual('@baseapp-frontend/authentication'),
  useJWTUser: jest.fn(),
}))
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}))

describe('useUserWithPermissions', () => {
  const useJWTUserMock = useJWTUser as jest.Mock
  const useQueryMock = useQuery as jest.Mock

  beforeEach(() => {
    useJWTUserMock.mockReset()
    useQueryMock.mockReset()
    useJWTUserMock.mockReturnValue({ user: { id: 1 } })
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false, isError: false })
  })

  it('returns empty permissions when there is no user', () => {
    useJWTUserMock.mockReturnValue({ user: null })
    const { result } = renderHook(() => useUserWithPermissions())
    expect(result.current.permissions).toEqual([])
  })
})
```

## 3. Component

Use `render` + `screen` + `userEvent` from `@baseapp-frontend/test`. Query by role/text; assert what the
user sees. Drive interaction with `userEvent`.

```tsx
import { render, screen, userEvent } from '@baseapp-frontend/test'

import MyButton from '../MyButton'

describe('MyButton', () => {
  it('calls onClick when pressed', async () => {
    const onClick = jest.fn()
    render(<MyButton onClick={onClick}>Save</MyButton>)

    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders a disabled state', () => {
    render(<MyButton disabled>Save</MyButton>)
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  })
})
```

## 4. Module mock for network functions

Mock the fetch boundary (`baseAppFetch`), keep everything else real via `requireActual`. Assert both the
call args and the returned value.

```ts
import { baseAppFetch } from '@baseapp-frontend/utils'

import { fetchMePermissions } from '../index'

jest.mock('@baseapp-frontend/utils', () => ({
  ...jest.requireActual('@baseapp-frontend/utils'),
  baseAppFetch: jest.fn(),
}))

const baseAppFetchMock = baseAppFetch as jest.Mock

beforeEach(() => baseAppFetchMock.mockReset())

it('fetches the permissions map', async () => {
  baseAppFetchMock.mockResolvedValue({ permissions: { 'app.change': true } })

  const result = await fetchMePermissions()

  expect(baseAppFetchMock).toHaveBeenCalledWith('/users/me/permissions')
  expect(result).toEqual({ 'app.change': true })
})
```

Helpers available from `@baseapp-frontend/test`: `mockFetch`, `mockFetchError` (see its `index.tsx`
re-exports) for stubbing fetch without hand-rolling resolved values.

## 5. Vitest variants

Same layout, same `@baseapp-frontend/test` wrapper, same boundary-only mocking — just `vi.*` instead of
`jest.*`, and a few Vitest rules that bite when porting.

### 5a. Hook with boundary mocks (Vitest)

`vi.mock` is **hoisted above the file** and its factory **can't reference outer variables** — use
`vi.hoisted` for any mock fn the factory needs.

```ts
import { renderHook } from '@baseapp-frontend/test'
import { useQuery } from '@tanstack/react-query'
import { useJWTUser } from '@baseapp-frontend/authentication'

import useUserWithPermissions from '../index'

vi.mock('@tanstack/react-query', async () => ({
  ...(await vi.importActual('@tanstack/react-query')),
  useQuery: vi.fn(),
}))
vi.mock('@baseapp-frontend/authentication', async () => ({
  ...(await vi.importActual('@baseapp-frontend/authentication')),
  useJWTUser: vi.fn(),
}))

describe('useUserWithPermissions', () => {
  const useJWTUserMock = useJWTUser as unknown as Mock
  const useQueryMock = useQuery as unknown as Mock

  beforeEach(() => {
    useJWTUserMock.mockReset().mockReturnValue({ user: { id: 1 } })
    useQueryMock.mockReset().mockReturnValue({ data: undefined, isLoading: false, isError: false })
  })

  it('returns empty permissions when there is no user', () => {
    useJWTUserMock.mockReturnValue({ user: null })
    const { result } = renderHook(() => useUserWithPermissions())
    expect(result.current.permissions).toEqual([])
  })
})
```

`vi`, `describe`, `it`, `expect`, `Mock` are global (`globals: true`) — no import needed. `as Mock` is a
type cast, erased at runtime.

### 5b. `vi.hoisted` when the factory needs a shared mock fn

```ts
const { resetQueriesMock } = vi.hoisted(() => ({ resetQueriesMock: vi.fn() }))

vi.mock('@tanstack/react-query', async () => ({
  ...(await vi.importActual('@tanstack/react-query')),
  useQueryClient: () => ({ resetQueries: resetQueriesMock }),
}))
```

### 5c. Default-export module mock (e.g. `js-cookie`)

Vitest needs an explicit `default`. Share **one** object so app code and assertions hit the same `vi.fn()`.

```ts
vi.mock('js-cookie', () => {
  const api = { get: vi.fn(), set: vi.fn(), remove: vi.fn() }
  return { default: api, ...api }
})
```

### 5d. Frozen time without deadlocking `waitFor`

Fake **only Date** — faking `setTimeout`/`setInterval` too stalls Testing Library's polling under Vitest.

```ts
vi.useFakeTimers({ toFake: ['Date'] }).setSystemTime(new Date(2020, 9, 1, 7))
```

### Jest→Vitest porting cheatsheet

| Jest | Vitest | Note |
|---|---|---|
| `jest.fn` / `jest.spyOn` / `jest.clearAllMocks` | `vi.fn` / `vi.spyOn` / `vi.clearAllMocks` | 1:1 |
| `jest.mock('m', () => ({...}))` | `vi.mock('m', () => ({...}))` | hoisted; **no outer-var refs** → use `vi.hoisted` |
| `...jest.requireActual('m')` | `...(await vi.importActual('m'))` | factory becomes **`async`**; parenthesize the await |
| factory refs `const mockX = jest.fn()` | `const { mockX } = vi.hoisted(() => ({ mockX: vi.fn() }))` | Jest's `mock`-prefix escape hatch is gone |
| default-export mock `() => ({ get, set })` | `() => ({ default: api, ...api })` | needs `default` |
| `jest.useFakeTimers()` | `vi.useFakeTimers({ toFake: ['Date'] })` | avoid faking timers `waitFor` needs |
| `jest.Mock` / `jest.Mocked` (types) | `Mock` / `Mocked` (or leave as-is) | erased at runtime; only matters for tsc, and the `*.vitest.test.*` lane is excluded from tsc |

## Anti-patterns (reject these)

- Importing `render` from `@testing-library/react` directly → providers missing.
- `jest.mock`-ing the unit under test, or mocking pure logic to "simplify".
- Snapshotting whole component trees as the primary assertion.
- Testing `__generated__/` Relay files, `.stories.*`, or trivial re-exports to bump coverage.
- Passing `-- --coverage` through the `test:unit` script (Jest reads it as a path pattern).
