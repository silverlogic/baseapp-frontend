import {
  ComponentWithProviders,
  CookiesGetByNameFn,
  MockAdapter,
  renderHook,
  waitFor,
} from '@baseapp-frontend/test'
import { axios } from '@baseapp-frontend/utils'

import Cookies from 'js-cookie'

import { IUser } from '../../../../types/user'
import useUser from '../index'
import request from './fixtures/request.json'

// @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
export const axiosMock = new MockAdapter(axios)

describe('useUser', () => {
  test('should user be present for authenticated', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => 'fake token')

    axiosMock.onGet('/users/me').reply(200, request)

    const { result } = renderHook(() => useUser(), {
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

    const { result } = renderHook(() => useUser<ICustomUser>(), {
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
        useUser({
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
})
