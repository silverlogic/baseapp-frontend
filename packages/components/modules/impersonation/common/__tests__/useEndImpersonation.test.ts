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
  isImpersonationSessionToken: (token?: string) =>
    Boolean(token && JSON.parse(Buffer.from(token.split('.')[1]!, 'base64url').toString()).imp_sid),
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

const jwt = (claims: Record<string, unknown>, expiresInSeconds = 600) =>
  [
    Buffer.from('{"alg":"HS256"}').toString('base64url'),
    Buffer.from(
      JSON.stringify({ exp: Math.floor(Date.now() / 1000) + expiresInSeconds, ...claims }),
    ).toString('base64url'),
    'signature',
  ].join('.')
const sessionToken = (expiresInSeconds = 600) => jwt({ imp: 1, imp_sid: 9 }, expiresInSeconds)
const ADMIN_ACCESS = jwt({ user_id: 1, token_type: 'access' })
const ADMIN_REFRESH = jwt({ user_id: 1, token_type: 'refresh' })

// what restoreImpersonatorTokens does to the cookies every tab shares
const restoreFromSharedCookies = async () => {
  const access = tokens.get('ImpersonatorAuthorization')
  const refresh = tokens.get('ImpersonatorRefresh')
  tokens.delete('ImpersonatorAuthorization')
  tokens.delete('ImpersonatorRefresh')
  if (!access || !refresh) return false
  tokens.set('Authorization', access)
  tokens.set('Refresh', refresh)
  return true
}

describe('useEndImpersonation', () => {
  beforeEach(() => {
    tokens.clear()
    tokens.set('Authorization', sessionToken())
    tokens.set('Refresh', sessionToken())
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
    tokens.set('Refresh', sessionToken(-1))
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

  test('only reloads when another tab already ended the session', async () => {
    mockRestore.mockImplementation(restoreFromSharedCookies)
    mockCommit.mockImplementation(({ onCompleted }) => onCompleted({}, null))
    tokens.set('ImpersonatorAuthorization', ADMIN_ACCESS)
    tokens.set('ImpersonatorRefresh', ADMIN_REFRESH)
    const firstTab = renderHook(() => useEndImpersonation())
    const onLogout = vi.fn()
    const onEnded = vi.fn()
    const secondTab = renderHook(() => useEndImpersonation({ onLogout, onEnded }))

    await act(async () => {
      firstTab.result.current.endImpersonation()
    })
    expect(tokens.get('Authorization')).toBe(ADMIN_ACCESS)
    expect(tokens.has('ImpersonatorAuthorization')).toBe(false)

    // the second tab's End button, or its countdown reaching zero
    await act(async () => {
      secondTab.result.current.endImpersonation()
    })

    expect(mockCommit).toHaveBeenCalledTimes(1)
    expect(mockRestore).toHaveBeenCalledTimes(1)
    expect(mockRemoveToken).not.toHaveBeenCalled()
    expect(onLogout).not.toHaveBeenCalled()
    expect(mockBroadcast).not.toHaveBeenCalled()
    expect(onEnded).toHaveBeenCalledWith({ restored: true })
    expect(tokens.get('Authorization')).toBe(ADMIN_ACCESS)
    expect(tokens.get('Refresh')).toBe(ADMIN_REFRESH)
    mockRestore.mockReset()
    mockCommit.mockReset()
  })

  test('puts the kept-aside tokens back without a request once the session tokens are gone', async () => {
    // a failed refresh removes the session's tokens but leaves the impersonator's aside
    tokens.clear()
    tokens.set('ImpersonatorAuthorization', ADMIN_ACCESS)
    tokens.set('ImpersonatorRefresh', ADMIN_REFRESH)
    mockRestore.mockImplementationOnce(restoreFromSharedCookies)
    const { result } = renderHook(() => useEndImpersonation())

    await act(async () => {
      result.current.endImpersonation()
    })

    expect(mockCommit).not.toHaveBeenCalled()
    expect(mockBroadcast).not.toHaveBeenCalled()
    expect(tokens.get('Authorization')).toBe(ADMIN_ACCESS)
    expect(tokens.get('Refresh')).toBe(ADMIN_REFRESH)
    expect(mockReloadAt).toHaveBeenCalledWith('/')
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
