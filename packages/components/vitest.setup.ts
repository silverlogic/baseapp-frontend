/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-explicit-any */
import { vi } from 'vitest'

// The jest→vi shim now comes from the shared @baseapp-frontend/test/vitest/setup
// (loaded first by createVitestConfig). This file only registers the package-specific
// global mock. Ported from jest/__mocks__/graphql-ws.ts — a setup-file vi.mock applies
// to every test.
vi.mock('graphql-ws', () => ({
  createClient: vi.fn(() => ({
    subscribe: vi.fn((_operation: any, sink: any) => {
      if (sink.next) sink.next({ data: {} })
      if (sink.complete) sink.complete()
    }),
  })),
}))
