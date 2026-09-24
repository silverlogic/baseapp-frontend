/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-explicit-any */
import { vi } from 'vitest'

// Shared Vitest setup shim for every @baseapp-frontend package on Vitest.
//
// The shared Jest helpers/mocks (`__mocks__/console.ts`, `__mocks__/fetch.ts`,
// `utils/mocks.ts`) call `jest.fn()` / `jest.mock()` at runtime. `vi` is
// API-compatible for those helpers, so aliasing `globalThis.jest = vi` lets them
// run unchanged under Vitest. This MUST load before those files in `setupFiles`
// (the `createVitestConfig` factory guarantees the order).
const g = globalThis as any

g.jest = vi
