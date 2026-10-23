import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import useEndImpersonation from '../hooks/useEndImpersonation'

const { mockCommit, mockRestore, mockReloadAt, mockRemoveToken, mockBroadcast, tokens } =
  vi.hoisted(() => ({
    mockCommit: vi.fn(),
    mockRestore: vi.fn(async () => true),
    mockReloadAt: vi.fn(),
    mockRemoveToken: vi.fn(async () => undefined),
    mockBroadcast: vi.fn(),
    tokens: new Map<string, string>(),
  }))

vi.mock('../graphql/mutations/ImpersonationEnd', () => ({
  useImpersonationEndMutation: () => [mockCommit, false],
}))

vi.mock('@baseapp-frontend/authentication', () => ({
  restoreImpersonatorTokens: mockRestore,
}))

vi.mock('@baseapp-frontend/utils', async () => ({
  ...(await vi.importActual('@baseapp-frontend/utils')),
  getToken: (key: string) => tokens.get(key),
  removeTokenAsync: mockRemoveToken,
  broadcastEvent: mockBroadcast,
}))

vi.mock('../utils', async () => ({
  ...(await vi.importActual('../utils')),
  reloadAt: mockReloadAt,
}))

const jwtExpiringIn = (seconds: number) =>
  [
    Buffer.from('{"alg":"HS256"}').toString('base64url'),
    Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + seconds })).toString(
      'base64url',
    ),
    'signature',
  ].join('.')

describe('useEndImpersonation', () => {
  beforeEach(() => {
    tokens.clear()
    tokens.set('Refresh', jwtExpiringIn(600))
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('ends the session, restores the tokens and reloads the app', async () => {
    mockCommit.mockImplementationOnce(({ onCompleted }) => onCompleted({}, null))
    const { result } = renderHook(() => useEndImpersonation({ redirectTo: '/admin' }))

    await act(async () => {
      result.current.endImpersonation()
    })

    expect(mockCommit).toHaveBeenCalledWith(expect.objectContaining({ variables: { input: {} } }))
    expect(mockRestore).toHaveBeenCalled()
    expect(mockRemoveToken).not.toHaveBeenCalled()
    expect(mockReloadAt).toHaveBeenCalledWith('/admin')
  })

  test('restores the tokens even when the server refuses', async () => {
    mockCommit.mockImplementationOnce(({ onError }) => onError(new Error('session ended')))
    const onEnded = vi.fn()
    const { result } = renderHook(() => useEndImpersonation({ onEnded }))

    await act(async () => {
      result.current.endImpersonation()
    })

    expect(mockRestore).toHaveBeenCalled()
    expect(onEnded).toHaveBeenCalledWith({ restored: true })
    expect(mockReloadAt).not.toHaveBeenCalled()
  })

  test('skips the request once the session has expired', async () => {
    tokens.set('Refresh', jwtExpiringIn(-1))
    const { result } = renderHook(() => useEndImpersonation())

    await act(async () => {
      result.current.endImpersonation()
    })

    expect(mockCommit).not.toHaveBeenCalled()
    expect(mockRestore).toHaveBeenCalled()
    expect(mockReloadAt).toHaveBeenCalledWith('/')
  })

  test('logs out when no tokens were kept aside', async () => {
    mockRestore.mockResolvedValueOnce(false)
    mockCommit.mockImplementationOnce(({ onCompleted }) => onCompleted({}, null))
    const onLogout = vi.fn()
    const onEnded = vi.fn()
    const { result } = renderHook(() => useEndImpersonation({ onLogout, onEnded }))

    await act(async () => {
      result.current.endImpersonation()
    })

    expect(mockRemoveToken).toHaveBeenCalledWith('Authorization')
    expect(mockRemoveToken).toHaveBeenCalledWith('Refresh')
    expect(onLogout).toHaveBeenCalled()
    expect(mockBroadcast).toHaveBeenCalledWith('logout')
    expect(onEnded).toHaveBeenCalledWith({ restored: false })
  })

  test('ends a session once when called twice', async () => {
    mockCommit.mockImplementation(() => undefined)
    const { result } = renderHook(() => useEndImpersonation())

    act(() => {
      result.current.endImpersonation()
      result.current.endImpersonation()
    })

    expect(mockCommit).toHaveBeenCalledTimes(1)
    mockCommit.mockReset()
  })
})
