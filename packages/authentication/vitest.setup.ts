/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-explicit-any */
import { vi } from 'vitest'

// The shared helper @baseapp-frontend/test/utils/mocks.ts does `jest.mock('js-cookie')`
// then `cookiesMock = jest.mocked(Cookies)`. Vitest can't auto-mock from that runtime
// call (vi.mock must be statically hoisted), so we register the mock here — a setup-file
// vi.mock applies to every test, matching the global mock Jest gets. We use an explicit
// factory (not a bare automock) so the default export is a single shared object whose
// methods are the same vi.fn() instances the app code calls AND cookiesMock inspects.
vi.mock('js-cookie', () => {
  const api = {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
    withAttributes: vi.fn(),
    withConverter: vi.fn(),
  }
  return { default: api, ...api }
})

// Lets the shared Jest helpers (@baseapp-frontend/test) and setup files
// (console.ts / fetch.ts), which call `jest.fn()`, run unchanged under Vitest.
// Must be listed BEFORE those files in `setupFiles`.
const g = globalThis as any
g.jest = vi
