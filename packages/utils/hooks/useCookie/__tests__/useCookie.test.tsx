/**
 * Event-bridge integration tests for the cookie store.
 *
 * The post-fix design replaces the module-level singleton with a `CustomEvent`-on-window
 * bridge: `setCookie`/`removeCookie` from `functions/cookie/index.ts` write to
 * `document.cookie` and dispatch `baseapp:cookie-change`; `<CookieProvider>` listens for
 * that event and forwards updates into its in-tree Zustand store. These tests verify the
 * end-to-end plumbing on the client (`@jest-environment jsdom`, default).
 */
import React from 'react'

import { act, render, renderHook, waitFor } from '@baseapp-frontend/test'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'

import ClientCookies from 'js-cookie'

import useCookie, { CookieProvider } from '..'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../constants/jwt'
import { removeCookie, setCookie } from '../../../functions/cookie'
import { COOKIE_CHANGE_EVENT } from '../constants'

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}))

const mockedCookies = ClientCookies as jest.Mocked<typeof ClientCookies>

describe('useCookie event-bridge sync', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const wrapWith =
    (initialCookies?: Record<string, string | undefined>) =>
    ({ children }: { children: React.ReactNode }) => (
      <CookieProvider initialCookies={initialCookies}>{children}</CookieProvider>
    )

  it('propagates setCookie into the in-tree store', async () => {
    const { result } = renderHook(() => useCookie(), {
      wrapper: wrapWith({ [ACCESS_KEY_NAME]: 'initial-token' }),
    })

    expect(result.current.cookies?.[ACCESS_KEY_NAME]).toBe('initial-token')

    act(() => {
      setCookie(ACCESS_KEY_NAME, 'updated-token')
    })

    await waitFor(() => expect(result.current.cookies?.[ACCESS_KEY_NAME]).toBe('updated-token'))
    expect(mockedCookies.set).toHaveBeenCalledWith(ACCESS_KEY_NAME, 'updated-token', {})
  })

  it('propagates removeCookie into the in-tree store', async () => {
    const { result } = renderHook(() => useCookie(), {
      wrapper: wrapWith({ [ACCESS_KEY_NAME]: 'initial-token' }),
    })

    expect(result.current.cookies?.[ACCESS_KEY_NAME]).toBe('initial-token')

    act(() => {
      removeCookie(ACCESS_KEY_NAME)
    })

    await waitFor(() => expect(result.current.cookies?.[ACCESS_KEY_NAME]).toBeUndefined())
    expect(mockedCookies.remove).toHaveBeenCalledWith(ACCESS_KEY_NAME)
  })

  it('handles multiple consecutive setCookie writes (last write wins for same key)', async () => {
    const { result } = renderHook(() => useCookie(), {
      wrapper: wrapWith({ [ACCESS_KEY_NAME]: 'initial' }),
    })

    act(() => {
      setCookie(ACCESS_KEY_NAME, 'one')
      setCookie(ACCESS_KEY_NAME, 'two')
      setCookie(ACCESS_KEY_NAME, 'three')
    })

    await waitFor(() => expect(result.current.cookies?.[ACCESS_KEY_NAME]).toBe('three'))
  })

  it('reflects writes for different keys independently', async () => {
    const { result } = renderHook(() => useCookie(), {
      wrapper: wrapWith({ [ACCESS_KEY_NAME]: 'a', [REFRESH_KEY_NAME]: 'r' }),
    })

    act(() => {
      setCookie(ACCESS_KEY_NAME, 'a-new')
      setCookie(REFRESH_KEY_NAME, 'r-new')
    })

    await waitFor(() => expect(result.current.cookies?.[ACCESS_KEY_NAME]).toBe('a-new'))
    expect(result.current.cookies?.[REFRESH_KEY_NAME]).toBe('r-new')
  })

  it('reflects writes for non-default keys (e.g., CURRENT_PROFILE_KEY_NAME)', async () => {
    const { result } = renderHook(() => useCookie<Record<string, string | undefined>>(), {
      wrapper: wrapWith(),
    })

    act(() => {
      setCookie(CURRENT_PROFILE_KEY_NAME, '{"id":"profile-1"}')
    })

    await waitFor(() =>
      expect(result.current.cookies?.[CURRENT_PROFILE_KEY_NAME]).toBe('{"id":"profile-1"}'),
    )
  })

  it('cleans up the listener on Provider unmount; future setCookie does not error', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    const removeListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = render(
      <CookieProvider initialCookies={{ [ACCESS_KEY_NAME]: 'a' }}>
        <span>child</span>
      </CookieProvider>,
    )

    unmount()
    expect(removeListenerSpy).toHaveBeenCalledWith(COOKIE_CHANGE_EVENT, expect.any(Function))

    expect(() => setCookie(ACCESS_KEY_NAME, 'after-unmount')).not.toThrow()
    expect(consoleErrorSpy).not.toHaveBeenCalled()

    removeListenerSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  it('does not throw when setCookie is called with no Provider mounted', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    expect(() => setCookie(ACCESS_KEY_NAME, 'value')).not.toThrow()
    expect(() => removeCookie(ACCESS_KEY_NAME)).not.toThrow()

    expect(consoleErrorSpy).not.toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('updates two CookieProviders mounted in parallel from a single setCookie', async () => {
    // Two independent Provider mounts (separate React trees) both receive the same window
    // event and update their own in-tree store. Edge case — not used in this app today —
    // but cheap to verify so a future regression doesn't surprise us.
    const { result: r1 } = renderHook(() => useCookie(), {
      wrapper: ({ children }) => (
        <CookieProvider initialCookies={{ [ACCESS_KEY_NAME]: 'a1' }}>{children}</CookieProvider>
      ),
    })
    const { result: r2 } = renderHook(() => useCookie(), {
      wrapper: ({ children }) => (
        <CookieProvider initialCookies={{ [ACCESS_KEY_NAME]: 'a2' }}>{children}</CookieProvider>
      ),
    })

    expect(r1.current.cookies?.[ACCESS_KEY_NAME]).toBe('a1')
    expect(r2.current.cookies?.[ACCESS_KEY_NAME]).toBe('a2')

    act(() => {
      setCookie(ACCESS_KEY_NAME, 'shared')
    })

    await waitFor(() => expect(r1.current.cookies?.[ACCESS_KEY_NAME]).toBe('shared'))
    await waitFor(() => expect(r2.current.cookies?.[ACCESS_KEY_NAME]).toBe('shared'))
  })

  it('attaches a listener exactly once per Provider mount', () => {
    const addListenerSpy = jest.spyOn(window, 'addEventListener')

    render(
      <CookieProvider initialCookies={{ [ACCESS_KEY_NAME]: 'a' }}>
        <span>child</span>
      </CookieProvider>,
    )

    const cookieListenerCalls = addListenerSpy.mock.calls.filter(
      ([type]) => type === COOKIE_CHANGE_EVENT,
    )
    expect(cookieListenerCalls).toHaveLength(1)

    addListenerSpy.mockRestore()
  })
})
