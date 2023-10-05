import { ComponentWithProviders, MockAdapter, renderHook } from '@baseapp-frontend/test'
import { axios } from '@baseapp-frontend/utils'

import { z } from 'zod'

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

  test('should run onError when newPassword and confirmNewPassword are different', async () => {
    axiosMock.onPost('/forgot-password/reset').reply(200, {})

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useResetPassword({
          token,
          defaultValues: {
            newPassword: password,
            confirmNewPassword: `${password}different`,
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

    expect(hasOnSuccessRan).toBe(false)
  })

  test('should allow custom defaultValues and validationSchema', async () => {
    axiosMock.onPost('/forgot-password/reset').reply(200, {})

    const customDefaultValues = {
      newPassword: '12345',
      confirmNewPassword: '123456', // that would pass since the schema is not the default one, and doesnt check for password equality
    }
    const customValidationSchema = z.object({
      newPassword: z.string().nonempty(),
      confirmNewPassword: z.string().nonempty(),
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useResetPassword({
          token,
          defaultValues: customDefaultValues,
          validationSchema: customValidationSchema,
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
})
