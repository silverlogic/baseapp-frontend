import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import useStartImpersonation from '../hooks/useStartImpersonation'

const { mockCommit, mockSwap, mockReloadAt } = vi.hoisted(() => ({
  mockCommit: vi.fn(),
  mockSwap: vi.fn(async () => undefined),
  mockReloadAt: vi.fn(),
}))

vi.mock('../graphql/mutations/ImpersonationStart', () => ({
  useImpersonationStartMutation: () => [mockCommit, false],
}))

vi.mock('@baseapp-frontend/authentication', () => ({
  swapInImpersonationTokens: mockSwap,
}))

vi.mock('../utils', async () => ({
  ...(await vi.importActual('../utils')),
  reloadAt: mockReloadAt,
}))

const session = {
  id: 'session-1',
  readOnly: false,
  startedAt: '2026-10-22T10:00:00Z',
  expiresAt: '2026-10-22T11:00:00Z',
  target: { id: 'user-2', fullName: 'Target User' },
}

// answers the next commit the way relay would
const answerWith = (impersonationStart: object | null, errors: object[] | null = null) => {
  mockCommit.mockImplementationOnce(({ onCompleted }) => {
    onCompleted({ impersonationStart }, errors)
  })
}

describe('useStartImpersonation', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('swaps in the session tokens and reloads the app', async () => {
    answerWith({ access: 'access', refresh: 'refresh', session, errors: null })
    const { result } = renderHook(() => useStartImpersonation({ redirectTo: '/home' }))

    await act(async () => {
      result.current.startImpersonation({ targetUser: 'user-2', reason: 'Ticket 1' })
    })

    expect(mockCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { input: { targetUser: 'user-2', reason: 'Ticket 1' } },
      }),
    )
    expect(mockSwap).toHaveBeenCalledWith({ access: 'access', refresh: 'refresh' })
    expect(mockReloadAt).toHaveBeenCalledWith('/home')
  })

  test('calls onStarted instead of reloading, and passes custom key names on', async () => {
    answerWith({ access: 'access', refresh: 'refresh', session, errors: null })
    const onStarted = vi.fn()
    const { result } = renderHook(() =>
      useStartImpersonation({ onStarted, impersonatorAccessKeyName: 'Kept' }),
    )

    await act(async () => {
      result.current.startImpersonation({ targetUser: 'user-2', reason: 'Ticket 1' })
    })

    expect(mockSwap).toHaveBeenCalledWith({
      impersonatorAccessKeyName: 'Kept',
      access: 'access',
      refresh: 'refresh',
    })
    expect(onStarted).toHaveBeenCalledWith(session)
    expect(mockReloadAt).not.toHaveBeenCalled()
  })

  test('keeps the current tokens when the server answers with errors', async () => {
    const payload = {
      access: null,
      refresh: null,
      session: null,
      errors: [{ field: 'reason', messages: ['This field is required.'] }],
    }
    answerWith(payload)
    const onCompleted = vi.fn()
    const { result } = renderHook(() => useStartImpersonation())

    await act(async () => {
      result.current.startImpersonation({ targetUser: 'user-2', reason: '' }, { onCompleted })
    })

    expect(onCompleted).toHaveBeenCalledWith({ impersonationStart: payload }, null)
    expect(mockSwap).not.toHaveBeenCalled()
    expect(mockReloadAt).not.toHaveBeenCalled()
  })

  test('passes request failures to onError', async () => {
    const error = new Error('You do not have permission to act as this user.')
    mockCommit.mockImplementationOnce(({ onError }) => onError(error))
    const onError = vi.fn()
    const { result } = renderHook(() => useStartImpersonation())

    await act(async () => {
      result.current.startImpersonation({ targetUser: 'user-2', reason: 'x' }, { onError })
    })

    expect(onError).toHaveBeenCalledWith(error)
    expect(mockSwap).not.toHaveBeenCalled()
  })
})
