import { ComponentWithProviders, axiosMock, renderHook } from '@baseapp-frontend/test'

import useResetPassword from '../index'

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
          defaultValues: {
            newPassword: password,
            token,
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
          defaultValues: {
            newPassword: password,
            token,
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
