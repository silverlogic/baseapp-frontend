import { ComponentWithProviders, MockAdapter, renderHook } from '@baseapp-frontend/test'
import { axios } from '@baseapp-frontend/utils'

import { z } from 'zod'

import useChangeExpiredPassword from '../index'

// @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
export const axiosMock = new MockAdapter(axios)

describe('useChangeExpiredPassword', () => {
  const currentPassword = '1234'
  const password = '123456'
  const token = 'fake-token'

  test('should run onSuccess', async () => {
    axiosMock.onPost('/change-expired-password').reply(200, {
      currentPassword,
      newPassword: password,
      token,
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useChangeExpiredPassword({
          token,
          defaultValues: {
            currentPassword,
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
    axiosMock.onPost('/change-expired-password').reply(500, {
      error: 'any',
    })

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useChangeExpiredPassword({
          token,
          defaultValues: {
            currentPassword,
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
    axiosMock.onPost('/change-expired-password').reply(200, {})

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useChangeExpiredPassword({
          token,
          defaultValues: {
            currentPassword,
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
    axiosMock.onPost('/change-expired-password').reply(200, {})

    const customDefaultValues = {
      currentPassword: '1234',
      newPassword: '12345',
      confirmNewPassword: '123456', // that would pass since the schema is not the default one, and doesnt check for password equality
    }
    const customValidationSchema = z.object({
      currentPassword: z.string().nonempty(),
      newPassword: z.string().nonempty(),
      confirmNewPassword: z.string().nonempty(),
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useChangeExpiredPassword({
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
