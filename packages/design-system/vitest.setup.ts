/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-explicit-any */
import { vi } from 'vitest'

// Lets the shared Jest helpers (@baseapp-frontend/test) and setup files
// (console.ts / fetch.ts), which call `jest.fn()`, run unchanged under Vitest.
// Must be listed BEFORE those files in `setupFiles`.
const g = globalThis as any
g.jest = vi
