import {
  ComponentWithProviders,
  mockFetch,
  mockFetchError,
  renderHook,
} from '@baseapp-frontend/test'

import { z } from 'zod'

import useResetPassword from '../index'

describe('useResetPassword', () => {
  const password = '12345#Abcde'
  const token = 'fake-token'
  const resetPasswordUrl = '/forgot-password/reset'

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  test('should run onSuccess', async () => {
    mockFetch(resetPasswordUrl, {
      method: 'POST',
      status: 200,
      response: {
        newPassword: password,
        token,
      },
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
    mockFetchError(resetPasswordUrl, {
      method: 'POST',
      status: 500,
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
    mockFetch(resetPasswordUrl, {
      method: 'POST',
      status: 200,
      response: {},
    })

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
    mockFetch(resetPasswordUrl, {
      method: 'POST',
      status: 200,
      response: {},
    })

    const customDefaultValues = {
      newPassword: '12345',
      confirmNewPassword: '123456', // that would pass since the schema is not the default one, and doesnt check for password equality
    }
    const customValidationSchema = z.object({
      newPassword: z.string().min(1),
      confirmNewPassword: z.string().min(1),
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
