// `vitest/globals` declares only value globals (vi, describe, expect, …), not the
// mock utility types. These specs use bare `Mock` / `Mocked` / `MockedFunction` where
// they previously used the `jest.*` globals — expose the Vitest equivalents globally.
import type { Mock as ViMock, Mocked as ViMocked, MockedFunction as ViMockedFunction } from 'vitest'

declare global {
  type Mock<T extends (...args: any[]) => any = (...args: any[]) => any> = ViMock<T>
  type Mocked<T> = ViMocked<T>
  type MockedFunction<T extends (...args: any[]) => any> = ViMockedFunction<T>
}

export {}
