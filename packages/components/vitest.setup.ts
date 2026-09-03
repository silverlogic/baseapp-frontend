/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-explicit-any */
import { vi } from 'vitest'

// Ported from jest/__mocks__/graphql-ws.ts. A setup-file vi.mock applies to every test.
vi.mock('graphql-ws', () => ({
  createClient: vi.fn(() => ({
    subscribe: vi.fn((_operation: any, sink: any) => {
      if (sink.next) sink.next({ data: {} })
      if (sink.complete) sink.complete()
    }),
  })),
}))

// Lets the shared Jest helpers (@baseapp-frontend/test) and setup files (console/fetch),
// which call `jest.fn()`, run unchanged under Vitest. Listed BEFORE those in setupFiles.
const g = globalThis as any
g.jest = vi
