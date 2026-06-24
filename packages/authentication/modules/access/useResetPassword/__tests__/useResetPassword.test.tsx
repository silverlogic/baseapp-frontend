import { ComponentWithProviders, renderHook } from '@baseapp-frontend/test'

import { z } from 'zod'

import { withAuthenticationTestProviders } from '../../../tests/utils'
import useResetPassword from '../index'

const mockResetPassword = jest.fn()

jest.mock('../../../auth-strategy/factory', () => ({
  getActiveAuthModule: () => ({
    strategy: {
      resetPassword: mockResetPassword,
    },
  }),
}))

describe('useResetPassword', () => {
  const password = '12345#Abcde'
  const token = 'fake-token'

  afterEach(() => {
    mockResetPassword.mockReset()
  })

  test('should call strategy.resetPassword with newPassword and token, then run onSuccess', async () => {
    mockResetPassword.mockResolvedValueOnce(undefined)

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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(mockResetPassword).toHaveBeenCalledWith({
      newPassword: password,
      token,
    })
    expect(hasOnSuccessRan).toBe(true)
  })

  test('should run onError when strategy rejects', async () => {
    mockResetPassword.mockRejectedValueOnce({
      code: 'validation_error',
      message: 'Invalid token',
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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnErrorRan).toBe(true)
  })

  test('should not submit when newPassword and confirmNewPassword are different', async () => {
    mockResetPassword.mockResolvedValueOnce(undefined)

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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnSuccessRan).toBe(false)
  })

  test('should allow custom defaultValues and validationSchema', async () => {
    mockResetPassword.mockResolvedValueOnce(undefined)

    const customDefaultValues = {
      newPassword: '12345',
      confirmNewPassword: '123456',
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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnSuccessRan).toBe(true)
  })
})
