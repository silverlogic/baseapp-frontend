import {
  ACCESS_KEY_NAME,
  IMPERSONATOR_ACCESS_KEY_NAME,
  IMPERSONATOR_REFRESH_KEY_NAME,
  REFRESH_KEY_NAME,
} from '@baseapp-frontend/utils'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'

import {
  clearImpersonatorTokens,
  hasImpersonatorTokens,
  isImpersonationSessionToken,
  restoreImpersonatorTokens,
  swapInImpersonationTokens,
} from '..'

const { store } = vi.hoisted(() => ({ store: new Map<string, string>() }))

vi.mock('@baseapp-frontend/utils', async () => ({
  ...(await vi.importActual('@baseapp-frontend/utils')),
  getToken: vi.fn((key: string) => store.get(key)),
  setTokenAsync: vi.fn(async (key: string, value: string) => {
    store.set(key, value)
  }),
  removeTokenAsync: vi.fn(async (key: string) => {
    store.delete(key)
  }),
}))

const jwt = (claims: Record<string, unknown>) =>
  [
    Buffer.from('{"alg":"HS256"}').toString('base64url'),
    Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 600, ...claims })).toString(
      'base64url',
    ),
    'signature',
  ].join('.')

const signIn = () => {
  store.set(ACCESS_KEY_NAME, 'admin-access')
  store.set(REFRESH_KEY_NAME, 'admin-refresh')
  store.set(CURRENT_PROFILE_KEY_NAME, '{"id":"admin-profile"}')
}

describe('impersonation tokens', () => {
  beforeEach(() => {
    store.clear()
  })

  test('swapInImpersonationTokens keeps the current pair aside and forgets the profile', async () => {
    signIn()

    await swapInImpersonationTokens({ access: 'session-access', refresh: 'session-refresh' })

    expect(store.get(ACCESS_KEY_NAME)).toBe('session-access')
    expect(store.get(REFRESH_KEY_NAME)).toBe('session-refresh')
    expect(store.get(IMPERSONATOR_ACCESS_KEY_NAME)).toBe('admin-access')
    expect(store.get(IMPERSONATOR_REFRESH_KEY_NAME)).toBe('admin-refresh')
    expect(store.has(CURRENT_PROFILE_KEY_NAME)).toBe(false)
    expect(hasImpersonatorTokens()).toBe(true)
  })

  test('swapInImpersonationTokens replaces a pair left aside by an earlier session', async () => {
    // another user's tokens, left behind by a session that lapsed without being ended here
    store.set(IMPERSONATOR_ACCESS_KEY_NAME, 'other-admin-access')
    store.set(IMPERSONATOR_REFRESH_KEY_NAME, 'other-admin-refresh')
    signIn()

    await swapInImpersonationTokens({ access: 'session-access', refresh: 'session-refresh' })

    expect(store.get(IMPERSONATOR_ACCESS_KEY_NAME)).toBe('admin-access')
    expect(store.get(IMPERSONATOR_REFRESH_KEY_NAME)).toBe('admin-refresh')

    await expect(restoreImpersonatorTokens()).resolves.toBe(true)
    expect(store.get(ACCESS_KEY_NAME)).toBe('admin-access')
    expect(store.get(REFRESH_KEY_NAME)).toBe('admin-refresh')
  })

  test('swapInImpersonationTokens drops half of an old pair instead of mixing it in', async () => {
    store.set(IMPERSONATOR_REFRESH_KEY_NAME, 'other-admin-refresh')
    store.set(ACCESS_KEY_NAME, 'admin-access')

    await swapInImpersonationTokens({ access: 'session-access', refresh: 'session-refresh' })

    expect(store.get(IMPERSONATOR_ACCESS_KEY_NAME)).toBe('admin-access')
    expect(store.has(IMPERSONATOR_REFRESH_KEY_NAME)).toBe(false)
  })

  test("swapInImpersonationTokens never keeps a session's tokens aside", async () => {
    signIn()
    const firstSession = { access: jwt({ imp_sid: 1 }), refresh: jwt({ imp_sid: 1 }) }
    await swapInImpersonationTokens(firstSession)

    await swapInImpersonationTokens({ access: 'second-access', refresh: 'second-refresh' })

    expect(store.get(ACCESS_KEY_NAME)).toBe('second-access')
    expect(store.get(IMPERSONATOR_ACCESS_KEY_NAME)).toBe('admin-access')
    expect(store.get(IMPERSONATOR_REFRESH_KEY_NAME)).toBe('admin-refresh')
  })

  test('isImpersonationSessionToken looks for the session claim', () => {
    expect(isImpersonationSessionToken(jwt({ imp: 7, imp_sid: 3 }))).toBe(true)
    expect(isImpersonationSessionToken(jwt({ imp_sid: 'a1b2' }))).toBe(true)
    expect(isImpersonationSessionToken(jwt({ user_id: 7 }))).toBe(false)
    expect(isImpersonationSessionToken('not-a-jwt')).toBe(false)
    expect(isImpersonationSessionToken(undefined)).toBe(false)
  })

  test('restoreImpersonatorTokens puts the kept-aside pair back', async () => {
    signIn()
    await swapInImpersonationTokens({ access: 'session-access', refresh: 'session-refresh' })
    store.set(CURRENT_PROFILE_KEY_NAME, '{"id":"target-profile"}')

    await expect(restoreImpersonatorTokens()).resolves.toBe(true)

    expect(store.get(ACCESS_KEY_NAME)).toBe('admin-access')
    expect(store.get(REFRESH_KEY_NAME)).toBe('admin-refresh')
    expect(store.has(IMPERSONATOR_ACCESS_KEY_NAME)).toBe(false)
    expect(store.has(IMPERSONATOR_REFRESH_KEY_NAME)).toBe(false)
    expect(store.has(CURRENT_PROFILE_KEY_NAME)).toBe(false)
    expect(hasImpersonatorTokens()).toBe(false)
  })

  test('restoreImpersonatorTokens returns false and keeps the session pair without a stash', async () => {
    store.set(ACCESS_KEY_NAME, 'session-access')
    store.set(REFRESH_KEY_NAME, 'session-refresh')
    store.set(IMPERSONATOR_ACCESS_KEY_NAME, 'half-a-pair')

    await expect(restoreImpersonatorTokens()).resolves.toBe(false)

    expect(store.get(ACCESS_KEY_NAME)).toBe('session-access')
    expect(store.has(IMPERSONATOR_ACCESS_KEY_NAME)).toBe(false)
  })

  test('custom key names are honoured', async () => {
    store.set('Access', 'admin-access')
    store.set('Renew', 'admin-refresh')
    const keyNames = {
      accessKeyName: 'Access',
      refreshKeyName: 'Renew',
      impersonatorAccessKeyName: 'KeptAccess',
      impersonatorRefreshKeyName: 'KeptRenew',
    }

    await swapInImpersonationTokens({ ...keyNames, access: 'session-access', refresh: 's' })
    expect(store.get('KeptAccess')).toBe('admin-access')
    expect(hasImpersonatorTokens(keyNames)).toBe(true)

    await clearImpersonatorTokens(keyNames)
    expect(hasImpersonatorTokens(keyNames)).toBe(false)
  })
})
