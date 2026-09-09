// Shared Vitest global mock-utility types for every @baseapp-frontend package on Vitest.
//
// `vitest/globals` declares only value globals (vi, describe, expect, …), NOT the mock
// utility types. Specs use bare `Mock` / `Mocked` / `MockedFunction` where they previously
// used the `jest.*` globals — expose the Vitest equivalents globally, declared ONCE here so
// each package re-references this file instead of keeping its own vitest.d.ts copy.
import type { Mock as ViMock, Mocked as ViMocked, MockedFunction as ViMockedFunction } from 'vitest'

declare global {
  type Mock<T extends (...args: any[]) => any = (...args: any[]) => any> = ViMock<T>
  type Mocked<T> = ViMocked<T>
  type MockedFunction<T extends (...args: any[]) => any> = ViMockedFunction<T>
}

export {}
