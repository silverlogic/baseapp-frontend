import { ComponentWithProviders, renderHook } from '@baseapp-frontend/test'

import { z } from 'zod'

import { withAuthenticationTestProviders } from '../../../tests/utils'
import useChangePassword from '../index'

const mockChangePassword = jest.fn()

jest.mock('../../../auth-strategy/factory', () => ({
  getActiveAuthModule: () => ({
    strategy: {
      changePassword: mockChangePassword,
    },
  }),
}))

describe('useChangePassword', () => {
  const currentPassword = '1234'
  const password = 'abcABC@123456'

  afterEach(() => {
    mockChangePassword.mockReset()
  })

  test('should call strategy.changePassword and run onSuccess', async () => {
    mockChangePassword.mockResolvedValueOnce(undefined)

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useChangePassword({
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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(mockChangePassword).toHaveBeenCalledWith({
      currentPassword,
      newPassword: password,
      token: undefined,
    })
    expect(hasOnSuccessRan).toBe(true)
  })

  test('should run onError when strategy rejects', async () => {
    mockChangePassword.mockRejectedValueOnce({
      code: 'validation_error',
      message: 'Wrong password',
    })

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useChangePassword({
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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnErrorRan).toBe(true)
  })

  test('should not submit when newPassword and confirmNewPassword are different', async () => {
    mockChangePassword.mockResolvedValueOnce(undefined)

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useChangePassword({
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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnSuccessRan).toBe(false)
  })

  test('should allow custom defaultValues and validationSchema', async () => {
    mockChangePassword.mockResolvedValueOnce(undefined)

    const customDefaultValues = {
      currentPassword: '1234',
      newPassword: '12345',
      confirmNewPassword: '123456',
    }

    const customValidationSchema = z.object({
      currentPassword: z.string().min(1),
      newPassword: z.string().min(1),
      confirmNewPassword: z.string().min(1),
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useChangePassword({
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

describe('useChangePassword with token for expired passwords', () => {
  const currentPassword = '1234'
  const password = 'abcABC@123456'
  const token = 'fake-token'

  afterEach(() => {
    mockChangePassword.mockReset()
  })

  test('should pass token to strategy.changePassword', async () => {
    mockChangePassword.mockResolvedValueOnce(undefined)

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useChangePassword({
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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(mockChangePassword).toHaveBeenCalledWith({
      currentPassword,
      newPassword: password,
      token,
    })
    expect(hasOnSuccessRan).toBe(true)
  })
})
