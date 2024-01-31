import {
  ComponentWithProviders,
  CookiesGetByNameFn,
  MockAdapter,
  renderHook,
  waitFor,
} from '@baseapp-frontend/test'

import { UseQueryResult } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { IUser } from '../../../../types/user'
import { IUseSimpleTokenUser } from '../types'
import request from './fixtures/request.json'

interface IUseSimpleTokenUserResult<IUser> extends Omit<UseQueryResult<IUser, unknown>, 'data'> {
  user?: IUser
}

describe('useSimpleTokenUser', () => {
  let useSimpleTokenUser: <TUser extends Partial<IUser>>(
    props?: IUseSimpleTokenUser<TUser>,
  ) => IUseSimpleTokenUserResult<TUser>
  let defaultTokenType: string | undefined
  let axios: any
  let axiosMock: MockAdapter

  beforeAll(async () => {
    defaultTokenType = process.env.NEXT_PUBLIC_TOKEN_TYPE
    process.env.NEXT_PUBLIC_TOKEN_TYPE = 'simple'
    axios = (await import('@baseapp-frontend/utils')).axios
    axiosMock = new MockAdapter(axios)
    useSimpleTokenUser = (await import('../index')).default as any
  })

  afterAll(() => {
    process.env.NEXT_PUBLIC_TOKEN_TYPE = defaultTokenType
  })

  test('should user be present for authenticated', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => 'fake token')

    axiosMock.onGet('/users/me').reply(200, request)

    const { result } = renderHook(() => useSimpleTokenUser(), {
      wrapper: ComponentWithProviders,
    })

    expect(result.current.isLoading).toBe(true)
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.user?.email).toBe(request.email)
  })

  test('can use a custom type interface', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => 'fake token')

    interface ICustomUser extends IUser {
      customField: number
    }

    axiosMock.onGet('/users/me').reply(200, { ...request, customField: 123 })

    const { result } = renderHook(() => useSimpleTokenUser<ICustomUser>(), {
      wrapper: ComponentWithProviders,
    })
    expect(result.current.isLoading).toBe(true)
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.user?.customField).toBe(123)
  })

  test('should remove cookie if 401', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => 'fake token')
    ;(Cookies.remove as CookiesGetByNameFn) = jest.fn(() => '')

    let hasOnErrorRan = false

    axiosMock.onGet('/users/me').reply(401, {
      error: 'Invalid token.',
    })

    const { result } = renderHook(
      () =>
        useSimpleTokenUser({
          options: {
            retry: false,
            onError: () => {
              hasOnErrorRan = true
            },
          },
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await waitFor(() => expect(hasOnErrorRan).toBe(true))
    await waitFor(() => expect(Cookies.get).toHaveBeenCalled())
    await waitFor(() => expect(Cookies.remove).toHaveBeenCalled())
    expect(result.current.user).not.toBeDefined()
  })

  process.env.NEXT_PUBLIC_TOKEN_TYPE = defaultTokenType
})
