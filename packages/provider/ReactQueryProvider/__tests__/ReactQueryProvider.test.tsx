import { PropsWithChildren, StrictMode, useState } from 'react'

import { NotificationProvider } from '@baseapp-frontend/utils'

import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { act, cleanup, render, screen, waitFor } from '@testing-library/react'

import ReactQueryProvider from '..'

const clients: QueryClient[] = []
let mounts = 0

const Consumer = () => {
  const client = useQueryClient()
  if (!clients.includes(client)) clients.push(client)
  // Counts mounts: the initializer runs once per mounted instance.
  useState(() => {
    mounts += 1
    return null
  })
  return <div>session content</div>
}

const Providers = ({ children, sessionKey }: PropsWithChildren<{ sessionKey?: string }>) => (
  <NotificationProvider>
    <ReactQueryProvider sessionKey={sessionKey}>{children}</ReactQueryProvider>
  </NotificationProvider>
)

// Runs the deferred retirement (a 0 ms timeout) but not React Query's garbage collection.
const flushDeferredRetirement = () =>
  act(async () => {
    vi.advanceTimersByTime(1)
  })

describe('ReactQueryProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    clients.length = 0
    mounts = 0
  })

  afterEach(() => {
    // Unmount while the fake clock is still installed, so no retirement leaks into the next test.
    cleanup()
    vi.advanceTimersByTime(1)
    vi.useRealTimers()
  })

  it('shares one client across mounts without a sessionKey', async () => {
    const { unmount } = render(
      <Providers>
        <Consumer />
      </Providers>,
    )
    const [client] = clients
    client!.setQueryData(['shared'], 'kept')
    unmount()
    await flushDeferredRetirement()

    render(
      <Providers>
        <Consumer />
      </Providers>,
    )

    expect(clients).toHaveLength(1)
    expect(client!.getQueryData(['shared'])).toBe('kept')
  })

  it('keeps the client while the sessionKey stays the same', async () => {
    const { rerender } = render(
      <Providers sessionKey="1:login-1">
        <Consumer />
      </Providers>,
    )
    clients[0]!.setQueryData(['private'], 'session data')
    rerender(
      <Providers sessionKey="1:login-1">
        <Consumer />
      </Providers>,
    )
    await flushDeferredRetirement()

    expect(clients).toHaveLength(1)
    expect(mounts).toBe(1)
    expect(clients[0]!.getQueryData(['private'])).toBe('session data')
  })

  it('gives a new sessionKey a new client, remounts the children and clears the old client after commit', async () => {
    const { rerender } = render(
      <Providers sessionKey="1:login-1">
        <Consumer />
      </Providers>,
    )
    const [first] = clients
    first!.setQueryData(['private'], 'first session data')

    rerender(
      <Providers sessionKey="2:login-2">
        <Consumer />
      </Providers>,
    )

    expect(clients).toHaveLength(2)
    expect(clients[1]).not.toBe(first)
    expect(clients[1]!.getQueryData(['private'])).toBeUndefined()
    expect(mounts).toBe(2)
    // Deferred until after the commit.
    expect(first!.getQueryData(['private'])).toBe('first session data')

    await flushDeferredRetirement()

    expect(first!.getQueryCache().getAll()).toHaveLength(0)
  })

  it('never clears the live client under StrictMode', async () => {
    const { rerender } = render(
      <StrictMode>
        <Providers sessionKey="1:login-1">
          <Consumer />
        </Providers>
      </StrictMode>,
    )
    const live = clients.at(-1)!
    live.setQueryData(['private'], 'session data')
    await flushDeferredRetirement()

    expect(live.getQueryData(['private'])).toBe('session data')

    rerender(
      <StrictMode>
        <Providers sessionKey="2:login-2">
          <Consumer />
        </Providers>
      </StrictMode>,
    )
    const next = clients.at(-1)!
    next.setQueryData(['private'], 'next session data')
    await flushDeferredRetirement()

    expect(next).not.toBe(live)
    expect(live.getQueryCache().getAll()).toHaveLength(0)
    expect(next.getQueryData(['private'])).toBe('next session data')
  })

  it('clears the session client when the provider unmounts', async () => {
    const { unmount } = render(
      <Providers sessionKey="1:login-1">
        <Consumer />
      </Providers>,
    )
    const [client] = clients
    client!.setQueryData(['private'], 'session data')

    unmount()
    await flushDeferredRetirement()

    expect(client!.getQueryCache().getAll()).toHaveLength(0)
  })

  it("drops the old session's response that arrives after a session change", async () => {
    vi.useRealTimers()
    let resolveOld: (value: string) => void = () => undefined
    const delayedOld = new Promise<string>((resolve) => {
      resolveOld = resolve
    })

    const PrivateView = ({ account }: { account: string }) => {
      const client = useQueryClient()
      if (!clients.includes(client)) clients.push(client)
      const { data } = useQuery({
        queryKey: ['me'],
        queryFn: () => (account === 'A' ? delayedOld : Promise.resolve('B private data')),
      })
      return <div>{data ?? 'Loading'}</div>
    }

    const { rerender } = render(
      <Providers sessionKey="A:login">
        <PrivateView account="A" />
      </Providers>,
    )
    rerender(
      <Providers sessionKey="B:login">
        <PrivateView account="B" />
      </Providers>,
    )
    await screen.findByText('B private data')
    await waitFor(() => expect(clients[0]!.getQueryCache().getAll()).toHaveLength(0))

    resolveOld('A delayed private data')
    await act(async () => {
      await delayedOld
    })

    expect(screen.queryByText('A delayed private data')).toBeNull()
    expect(clients[0]!.getQueryData(['me'])).toBeUndefined()
    expect(clients[1]!.getQueryData(['me'])).toBe('B private data')
    vi.useFakeTimers()
  })
})
