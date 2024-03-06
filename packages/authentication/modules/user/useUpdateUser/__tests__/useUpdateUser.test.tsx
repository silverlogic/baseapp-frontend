import {
  ComponentWithProviders,
  CookiesGetByNameFn,
  MockAdapter,
  renderHook,
  waitFor,
} from '@baseapp-frontend/test'
import { TokenTypes, axios } from '@baseapp-frontend/utils'

import { UseMutationResult } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { IUser } from '../../../../types/user'
import { UseUpdateUserOptions } from '../types'
import request from './fixtures/request.json'

interface IIUseUpdateUser<IUser> extends Omit<UseMutationResult<IUser, unknown>, 'data'> {
  user?: IUser
}

// TODO: BA-1308: improve tests
describe('useUserUpdate', () => {
  // @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
  const axiosMock = new MockAdapter(axios)

  let useUserUpdate: <TUser extends Partial<IUser>>(
    props?: UseUpdateUserOptions<TUser>,
  ) => IIUseUpdateUser<TUser>

  const decodeJWTMock = jest.fn()
  const refreshAccessTokenMock = jest.fn()
  jest.mock('@baseapp-frontend/utils', () => ({
    ...jest.requireActual('@baseapp-frontend/utils'),
    decodeJWT: decodeJWTMock,
    refreshAccessToken: refreshAccessTokenMock,
  }))

  const useQueryClientMock = jest.fn()
  jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useQueryClient: useQueryClientMock,
  }))

  beforeAll(async () => {
    process.env.NEXT_PUBLIC_TOKEN_TYPE = TokenTypes.jwt
    useUserUpdate = (await import('../index')).default as any
    // freeze time to
    jest.useFakeTimers().setSystemTime(new Date(2020, 9, 1, 7))
  })

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA5NjcxNjgzLCJpYXQiOjE3MDk2NjA3MTIsImp0aSI6IjhmMjg3ZGNhODVjODRjOTVhOThkZThmN2NiZTllNTE5IiwidXNlcl9pZCI6MSwiaWQiOjEsImVtYWlsIjoiYWFAdHNsLmlvIiwiaXNfZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuZXdfZW1haWwiOiIiLCJpc19uZXdfZW1haWxfY29uZmlybWVkIjpmYWxzZSwicmVmZXJyYWxfY29kZSI6IiIsImF2YXRhciI6eyJmdWxsX3NpemUiOiIvbWVkaWEvdXNlci1hdmF0YXJzLzUvNi8xL3Jlc2l6ZWQvMTAyNC8xMDI0LzU0NGNhNDA2YWUxMWJhYzVjNDk3NTlhMjQwN2ZkY2JlLnBuZyIsInNtYWxsIjoiL21lZGlhL3VzZXItYXZhdGFycy81LzYvMS9yZXNpemVkLzY0LzY0LzU0NGNhNDA2YWUxMWJhYzVjNDk3NTlhMjQwN2ZkY2JlLnBuZyJ9LCJmaXJzdF9uYW1lIjoiYWEiLCJsYXN0X25hbWUiOiJUZXN0In0.zmTBh3Iz6iRGTiV84o7r4JMA3AU4Q4bVbN76ZUwm5Jg'

  it('should run custom onSettled on 401', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => token)
    decodeJWTMock.mockImplementation(() => undefined)
    const invalidateQueriesMock = jest.fn()
    useQueryClientMock.mockImplementation(() => ({ invalidateQueries: invalidateQueriesMock }))

    let hasOnSettledRan = false

    axiosMock.onPatch('/users/1').reply(201, request)
    const { result } = renderHook(
      () =>
        useUserUpdate({
          options: {
            onSettled: () => {
              hasOnSettledRan = true
            },
          },
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await result.current.mutateAsync({ userId: 1, data: { firstName: 'BB' } })

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    await waitFor(() => expect(hasOnSettledRan).toBe(true))
  })
})
