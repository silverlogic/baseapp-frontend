import {
  ComponentWithProviders,
  type CookiesGetByNameFn,
  mockFetch,
  mockFetchError,
  renderHook,
  waitFor,
} from '@baseapp-frontend/test'
import { ACCESS_KEY_NAME } from '@baseapp-frontend/utils/constants/jwt'

import type { UseQueryResult } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import type { User } from '../../../../types/user'
import { withAuthenticationTestProviders } from '../../../tests/utils'
import type { UseJWTUserOptions } from '../types'
import request from './fixtures/request.json'

interface UseJWTUserOptionsReturn<TUser> extends Omit<UseQueryResult<TUser, unknown>, 'data'> {
  user?: TUser
}

describe('useJWTUser', () => {
  let useJWTUser: <TUser extends Partial<User>>(
    props?: UseJWTUserOptions<TUser>,
  ) => UseJWTUserOptionsReturn<TUser>

  const decodeJWTMock = jest.fn()
  const useQueryClientMock = jest.fn()

  jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useQueryClient: useQueryClientMock,
  }))

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  beforeAll(async () => {
    // @ts-ignore
    useJWTUser = (await import('../index')).default as any
    jest.useFakeTimers().setSystemTime(new Date(2020, 9, 1, 7))
  })

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA5NjcxNjgzLCJpYXQiOjE3MDk2NjA3MTIsImp0aSI6IjhmMjg3ZGNhODVjODRjOTVhOThkZThmN2NiZTllNTE5IiwidXNlcl9pZCI6MSwiaWQiOjEsImVtYWlsIjoiYWFAdHNsLmlvIiwiaXNfZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuZXdfZW1haWwiOiIiLCJpc19uZXdfZW1haWxfY29uZmlybWVkIjpmYWxzZSwicmVmZXJyYWxfY29kZSI6IiIsImF2YXRhciI6eyJmdWxsX3NpemUiOiIvbWVkaWEvdXNlci1hdmF0YXJzLzUvNi8xL3Jlc2l6ZWQvMTAyNC8xMDI0LzU0NGNhNDA2YWUxMWJhYzVjNDk3NTlhMjQwN2ZkY2JlLnBuZyIsInNtYWxsIjoiL21lZGlhL3VzZXItYXZhdGFycy81LzYvMS9yZXNpemVkLzY0LzY0LzU0NGNhNDA2YWUxMWJhYzVjNDk3NTlhMjQwN2ZkY2JlLnBuZyJ9LCJmaXJzdF9uYW1lIjoiYWEiLCJsYXN0X25hbWUiOiJUZXN0In0.zmTBh3Iz6iRGTiV84o7r4JMA3AU4Q4bVbN76ZUwm5Jg'

  // useJWTUser reads the access token from the CookieProvider context, so the test wrapper
  // must seed `initialCookies` with the access token. We construct a small wrapper that
  // forwards `initialCookies` into the shared `withAuthenticationTestProviders`.
  const wrapperWithToken = (Component: typeof ComponentWithProviders) => {
    const Wrapped = withAuthenticationTestProviders(Component)
    return ({ children }: { children: React.ReactNode }) => (
      <Wrapped initialCookies={{ [ACCESS_KEY_NAME]: token }}>{children}</Wrapped>
    )
  }

  it(`should call the user's endpoint if there is no initial data`, async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => token)
    decodeJWTMock.mockImplementation(() => undefined)

    mockFetch('/users/me', {
      method: 'GET',
      status: 200,
      response: { ...request },
    })

    const { result } = renderHook(() => useJWTUser({ options: { placeholderData: undefined } }), {
      wrapper: wrapperWithToken(ComponentWithProviders),
    })

    expect(result.current.isLoading).toBe(true)
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.user?.email).toBe(request.email)
  })

  it('falls back to getToken when no CookieProvider is mounted (mobile / providerless web)', async () => {
    // No CookieProvider in this wrapper — useOptionalCookie returns `cookies: undefined`
    // and useJWTUser must fall back to `getToken()`, which reads via js-cookie on web
    // and expo-secure-store on mobile. We mock js-cookie here to stand in for either.
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => token)
    decodeJWTMock.mockImplementation(() => undefined)

    mockFetch('/users/me', {
      method: 'GET',
      status: 200,
      response: { ...request },
    })

    const { result } = renderHook(() => useJWTUser({ options: { placeholderData: undefined } }), {
      wrapper: ComponentWithProviders,
    })

    expect(result.current.isLoading).toBe(true)
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.user?.email).toBe(request.email)
  })

  it('should run custom onError and resetQueries on 401', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => token)
    decodeJWTMock.mockImplementation(() => undefined)
    const resetQueriesMock = jest.fn()
    useQueryClientMock.mockImplementation(() => ({ resetQueries: resetQueriesMock }))

    mockFetchError('/users/me', {
      method: 'GET',
      status: 401,
      error: 'Unauthorized',
    })

    const { result } = renderHook(
      () =>
        useJWTUser({
          options: {
            placeholderData: undefined,
            retry: false,
          },
        }),
      {
        wrapper: wrapperWithToken(ComponentWithProviders),
      },
    )

    await waitFor(() => expect(result.current.isPending).toBe(false))
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    await waitFor(() => expect(resetQueriesMock).toHaveBeenCalled())
  })
})
