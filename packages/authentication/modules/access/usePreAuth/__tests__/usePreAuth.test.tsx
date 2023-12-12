import { ComponentWithProviders, MockAdapter, renderHook, waitFor } from '@baseapp-frontend/test'
import { axios } from '@baseapp-frontend/utils'
import { TokenTypes } from '@baseapp-frontend/utils/constants/token'

import usePreAuth from '../index'

// @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
export const axiosMock = new MockAdapter(axios)

describe('usePreAuth jwt', () => {
  test('should run onSuccess', async () => {
    axiosMock.onPost('/auth/pre-auth/jwt').reply(200, {
      refresh: 'fake-refresh-token',
      access: 'fake-access-token',
    })

    const { result } = renderHook(
      () =>
        usePreAuth({
          token: 'fake-pre-auth-token',
          tokenType: TokenTypes.jwt,
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await waitFor(() => expect(result.current.query.isSuccess).toBe(true))
  })
})

describe('usePreAuth auth_token', () => {
  test('should run onSuccess', async () => {
    axiosMock.onPost('/auth/pre-auth/auth-token').reply(200, {
      token: 'fake-auth-token',
    })

    const { result } = renderHook(
      () =>
        usePreAuth({
          token: 'fake-pre-auth-token',
          tokenType: TokenTypes.simple,
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await waitFor(() => expect(result.current.query.isSuccess).toBe(true))
  })
})
