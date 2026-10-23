import { StrictMode, useState } from 'react'

import { act, cleanup, render, screen } from '@testing-library/react'
import { useRelayEnvironment } from 'react-relay'
import type { Environment } from 'relay-runtime'

import RelayProvider from '..'
import { createEnvironment, disposeEnvironment } from '../../../config/environment'

vi.mock('../../../config/environment', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../config/environment')>()
  return {
    ...actual,
    createEnvironment: vi.fn(actual.createEnvironment),
    disposeEnvironment: vi.fn(actual.disposeEnvironment),
  }
})

const createEnvironmentMock = vi.mocked(createEnvironment)
const disposeEnvironmentMock = vi.mocked(disposeEnvironment)

const seen: Environment[] = []
let mounts = 0

const Consumer = () => {
  const environment = useRelayEnvironment()
  if (!seen.includes(environment)) seen.push(environment)
  // Counts mounts: the initializer runs once per mounted instance.
  useState(() => {
    mounts += 1
    return null
  })
  return <div>session content</div>
}

const flushDeferredDisposal = () =>
  act(async () => {
    vi.runAllTimers()
  })

describe('RelayProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    seen.length = 0
    mounts = 0
    createEnvironmentMock.mockClear()
    disposeEnvironmentMock.mockClear()
  })

  afterEach(() => {
    // Unmount while the fake clock is still installed, so no disposal leaks into the next test.
    cleanup()
    vi.runAllTimers()
    vi.useRealTimers()
  })

  it('keeps one environment and never disposes it without a sessionKey', async () => {
    const { rerender, unmount } = render(
      <RelayProvider>
        <Consumer />
      </RelayProvider>,
    )
    rerender(
      <RelayProvider>
        <Consumer />
      </RelayProvider>,
    )
    unmount()
    await flushDeferredDisposal()

    expect(seen).toHaveLength(1)
    expect(mounts).toBe(1)
    expect(disposeEnvironmentMock).not.toHaveBeenCalled()
  })

  it('keeps the environment while the sessionKey stays the same', async () => {
    const { rerender } = render(
      <RelayProvider sessionKey="1:login-1">
        <Consumer />
      </RelayProvider>,
    )
    rerender(
      <RelayProvider sessionKey="1:login-1">
        <Consumer />
      </RelayProvider>,
    )
    await flushDeferredDisposal()

    expect(seen).toHaveLength(1)
    expect(mounts).toBe(1)
    expect(disposeEnvironmentMock).not.toHaveBeenCalled()
  })

  it('gives a new sessionKey a new environment, remounts the children and disposes the old one after commit', async () => {
    const { rerender } = render(
      <RelayProvider sessionKey="1:login-1">
        <Consumer />
      </RelayProvider>,
    )
    const [first] = seen

    rerender(
      <RelayProvider sessionKey="2:login-2">
        <Consumer />
      </RelayProvider>,
    )

    expect(seen).toHaveLength(2)
    expect(seen[1]).not.toBe(first)
    expect(mounts).toBe(2)
    // Deferred until after the commit.
    expect(disposeEnvironmentMock).not.toHaveBeenCalled()

    await flushDeferredDisposal()

    expect(disposeEnvironmentMock).toHaveBeenCalledTimes(1)
    expect(disposeEnvironmentMock).toHaveBeenCalledWith(first)
  })

  it('never disposes the live environment under StrictMode', async () => {
    const { rerender } = render(
      <StrictMode>
        <RelayProvider sessionKey="1:login-1">
          <Consumer />
        </RelayProvider>
      </StrictMode>,
    )
    await flushDeferredDisposal()

    expect(disposeEnvironmentMock).not.toHaveBeenCalled()

    rerender(
      <StrictMode>
        <RelayProvider sessionKey="2:login-2">
          <Consumer />
        </RelayProvider>
      </StrictMode>,
    )
    await flushDeferredDisposal()
    const live = seen.at(-1)

    expect(disposeEnvironmentMock).toHaveBeenCalledTimes(1)
    expect(disposeEnvironmentMock).not.toHaveBeenCalledWith(live)
  })

  it('disposes a session environment when the provider unmounts', async () => {
    const { unmount } = render(
      <RelayProvider sessionKey="1:login-1">
        <Consumer />
      </RelayProvider>,
    )
    const [environment] = seen

    unmount()
    await flushDeferredDisposal()

    expect(disposeEnvironmentMock).toHaveBeenCalledWith(environment)
  })

  it('uses a given environment as is and never disposes it', async () => {
    const environment = createEnvironment()
    createEnvironmentMock.mockClear()

    const { unmount } = render(
      <RelayProvider environment={environment} sessionKey="1:login-1">
        <Consumer />
      </RelayProvider>,
    )
    expect(screen.getByText('session content')).toBeTruthy()
    unmount()
    await flushDeferredDisposal()

    expect(seen).toEqual([environment])
    expect(createEnvironmentMock).not.toHaveBeenCalled()
    expect(disposeEnvironmentMock).not.toHaveBeenCalled()
  })
})
