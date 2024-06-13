import {
  ComponentWithProviders,
  CookiesGetByNameFn,
  MockAdapter,
  renderHook,
  waitFor,
} from '@baseapp-frontend/test'
import { TokenTypes, axios } from '@baseapp-frontend/utils'

import { UseQueryResult } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { User } from '../../../../types/user'
import { UseJWTUserOptions } from '../types'
import request from './fixtures/request.json'

interface UseJWTUserOptionsReturn<TUser> extends Omit<UseQueryResult<TUser, unknown>, 'data'> {
  user?: TUser
}

describe('useJWTUser', () => {
  // @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
  const axiosMock = new MockAdapter(axios)

  let useJWTUser: <TUser extends Partial<User>>(
    props?: UseJWTUserOptions<TUser>,
  ) => UseJWTUserOptionsReturn<TUser>

  const decodeJWTMock = jest.fn()

  const useQueryClientMock = jest.fn()
  jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useQueryClient: useQueryClientMock,
  }))

  beforeAll(async () => {
    process.env.NEXT_PUBLIC_TOKEN_TYPE = TokenTypes.jwt
    useJWTUser = (await import('../index')).default as any
    // freeze time to
    jest.useFakeTimers().setSystemTime(new Date(2020, 9, 1, 7))
  })

  beforeEach(() => {
    axiosMock.reset()
  })

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA5NjcxNjgzLCJpYXQiOjE3MDk2NjA3MTIsImp0aSI6IjhmMjg3ZGNhODVjODRjOTVhOThkZThmN2NiZTllNTE5IiwidXNlcl9pZCI6MSwiaWQiOjEsImVtYWlsIjoiYWFAdHNsLmlvIiwiaXNfZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuZXdfZW1haWwiOiIiLCJpc19uZXdfZW1haWxfY29uZmlybWVkIjpmYWxzZSwicmVmZXJyYWxfY29kZSI6IiIsImF2YXRhciI6eyJmdWxsX3NpemUiOiIvbWVkaWEvdXNlci1hdmF0YXJzLzUvNi8xL3Jlc2l6ZWQvMTAyNC8xMDI0LzU0NGNhNDA2YWUxMWJhYzVjNDk3NTlhMjQwN2ZkY2JlLnBuZyIsInNtYWxsIjoiL21lZGlhL3VzZXItYXZhdGFycy81LzYvMS9yZXNpemVkLzY0LzY0LzU0NGNhNDA2YWUxMWJhYzVjNDk3NTlhMjQwN2ZkY2JlLnBuZyJ9LCJmaXJzdF9uYW1lIjoiYWEiLCJsYXN0X25hbWUiOiJUZXN0In0.zmTBh3Iz6iRGTiV84o7r4JMA3AU4Q4bVbN76ZUwm5Jg'

  it(`should call the user's endpoint if there is no initial data`, async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => token)
    decodeJWTMock.mockImplementation(() => undefined)
    axiosMock.onGet('/users/me').reply(200, { ...request })

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

    axiosMock.onGet('/users/me').reply(401)
    const { result } = renderHook(
      () =>
        useJWTUser({
          options: {
            placeholderData: undefined,
            retry: false,
          },
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )
    await waitFor(() => expect(result.current.isPending).toBe(false))
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    await waitFor(() => expect(resetQueriesMock).toHaveBeenCalled())
  })
})
