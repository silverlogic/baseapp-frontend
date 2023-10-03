import { ComponentWithProviders, MockAdapter, renderHook } from '@baseapp-frontend/test'
import { axios } from '@baseapp-frontend/utils'

import useResetPassword from '../index'

// @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
export const axiosMock = new MockAdapter(axios)

describe('useResetPassword', () => {
  const password = '123456'
  const token = 'fake-token'

  test('should run onSuccess', async () => {
    axiosMock.onPost('/forgot-password/reset').reply(200, {
      newPassword: password,
      token,
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useResetPassword({
          token,
          defaultValues: {
            newPassword: password,
            confirmNewPassword: password,
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
    axiosMock.onPost('/forgot-password/reset').reply(500, {
      error: 'any',
    })

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useResetPassword({
          token,
          defaultValues: {
            newPassword: password,
            confirmNewPassword: password,
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
