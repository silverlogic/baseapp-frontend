import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import { useNotificationsSubscription } from '../useNotificationsSubscription'

const { mockUseSubscription } = vi.hoisted(() => ({ mockUseSubscription: vi.fn() }))

// the graphql tag needs the relay babel transform, which this runner does not apply
vi.mock('react-relay', async () => ({
  ...(await vi.importActual('react-relay')),
  graphql: () => ({}),
  useSubscription: mockUseSubscription,
}))

const lastConfig = () => mockUseSubscription.mock.lastCall?.[0]

describe('useNotificationsSubscription', () => {
  beforeEach(() => {
    mockUseSubscription.mockClear()
  })

  it('keeps the single-argument call working and logs errors by default', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    renderHook(() => useNotificationsSubscription('user-1'))

    expect(lastConfig().variables).toEqual({
      connections: ['client:user-1:__user_notifications_connection'],
    })

    const error = new Error('socket closed')
    lastConfig().onError(error)
    expect(consoleError).toHaveBeenCalledWith(error)
    consoleError.mockRestore()
  })

  it('calls the latest onNext and onError without re-subscribing', () => {
    const firstOnNext = vi.fn()
    const secondOnNext = vi.fn()
    const onError = vi.fn()

    const { rerender } = renderHook(
      ({ onNext }) => useNotificationsSubscription('user-1', { onNext, onError }),
      { initialProps: { onNext: firstOnNext } },
    )
    const initialConfig = lastConfig()

    rerender({ onNext: secondOnNext })
    expect(lastConfig()).toBe(initialConfig)

    const response = { onNotificationChange: null }
    lastConfig().onNext(response)
    expect(firstOnNext).not.toHaveBeenCalled()
    expect(secondOnNext).toHaveBeenCalledWith(response)

    const error = new Error('socket closed')
    lastConfig().onError(error)
    expect(onError).toHaveBeenCalledWith(error)
  })

  it('re-subscribes when the user changes', () => {
    const { rerender } = renderHook(({ userId }) => useNotificationsSubscription(userId), {
      initialProps: { userId: 'user-1' },
    })
    const initialConfig = lastConfig()

    rerender({ userId: 'user-2' })
    expect(lastConfig()).not.toBe(initialConfig)
    expect(lastConfig().variables.connections).toEqual([
      'client:user-2:__user_notifications_connection',
    ])
  })
})
