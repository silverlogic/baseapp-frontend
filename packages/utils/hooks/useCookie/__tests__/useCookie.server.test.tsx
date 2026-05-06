/**
 * @jest-environment node
 *
 * Cross-request isolation regression test for the cookie store.
 *
 * The bug: a module-level `let cookieStore: ... | null = null` cache caused two
 * Provider mounts in the same Node process to share state. In production SSR,
 * one user's cookies leaked into the next user's render.
 *
 * The post-fix invariant: every call to `initializeCookieStore` produces a fresh,
 * isolated StoreApi. This test runs with `@jest-environment node` so it mirrors the
 * production SSR runtime where `typeof window === 'undefined'`.
 */
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../constants/jwt'
import { initializeCookieStore } from '../store'

describe('cookie store cross-Provider isolation', () => {
  it('two initializeCookieStore calls produce isolated stores', () => {
    const storeA = initializeCookieStore({
      [ACCESS_KEY_NAME]: 'tokenA',
      [REFRESH_KEY_NAME]: 'refreshA',
    })
    expect(storeA.getState().cookies?.[ACCESS_KEY_NAME]).toBe('tokenA')

    storeA.getState().setCookie(ACCESS_KEY_NAME, 'mutated')
    expect(storeA.getState().cookies?.[ACCESS_KEY_NAME]).toBe('mutated')

    const storeB = initializeCookieStore({
      [ACCESS_KEY_NAME]: undefined,
      [REFRESH_KEY_NAME]: undefined,
    })
    expect(storeB).not.toBe(storeA)
    expect(storeB.getState().cookies?.[ACCESS_KEY_NAME]).toBeUndefined()

    // Mutations on storeB must not leak back into storeA.
    storeB.getState().setCookie(ACCESS_KEY_NAME, 'tokenB')
    expect(storeA.getState().cookies?.[ACCESS_KEY_NAME]).toBe('mutated')
  })

  it('omitted initialCookies produces a fresh store every time', () => {
    const first = initializeCookieStore()
    first.getState().setCookie(ACCESS_KEY_NAME, 'first-token')

    const second = initializeCookieStore()
    expect(second).not.toBe(first)
    expect(second.getState().cookies?.[ACCESS_KEY_NAME]).toBeUndefined()
  })
})
