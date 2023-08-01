import { ComponentWithProviders, MockAdapter, renderHook } from '@baseapp-frontend/test'
import { axios } from '@baseapp-frontend/utils'

import useRecoverPassword from '../index'

// @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
export const axiosMock = new MockAdapter(axios)

describe('useResetPassword', () => {
  const email = 'test@tsl.io'

  test('should run onSuccess', async () => {
    axiosMock.onPost('/forgot-password').reply(200, { email })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useRecoverPassword({
          defaultValues: {
            email,
          },
          options: {
            onSuccess: () => {
              hasOnSuccessRan = true
            },
          },
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnSuccessRan).toBe(true)
  })

  test('should run onError', async () => {
    axiosMock.onPost('/forgot-password').reply(500, {
      error: 'any',
    })

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useRecoverPassword({
          defaultValues: {
            email,
          },
          options: {
            onError: () => {
              hasOnErrorRan = true
            },
          },
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnErrorRan).toBe(true)
  })
})
