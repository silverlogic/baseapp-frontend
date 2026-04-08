import { ComponentWithProviders, renderHook } from '@baseapp-frontend/test'

import { z } from 'zod'

import { withAuthenticationTestProviders } from '../../../tests/utils'
import useRecoverPassword from '../index'

const mockRecoverPassword = jest.fn()

jest.mock('../../../auth-strategy/factory', () => ({
  getActiveAuthModule: () => ({
    strategy: {
      recoverPassword: mockRecoverPassword,
    },
  }),
}))

describe('useRecoverPassword', () => {
  const email = 'test@tsl.io'

  afterEach(() => {
    mockRecoverPassword.mockReset()
  })

  test('should call strategy.recoverPassword and run onSuccess', async () => {
    mockRecoverPassword.mockResolvedValueOnce(undefined)

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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(mockRecoverPassword).toHaveBeenCalledWith({ email })
    expect(hasOnSuccessRan).toBe(true)
  })

  test('should run onError when strategy rejects', async () => {
    mockRecoverPassword.mockRejectedValueOnce({
      code: 'validation_error',
      message: 'Invalid email',
      fieldErrors: { email: ['Invalid email'] },
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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnErrorRan).toBe(true)
  })

  test('should allow custom defaultValues and validationSchema', async () => {
    mockRecoverPassword.mockResolvedValueOnce(undefined)

    const customDefaultValues = {
      email: 'test@tsl.io',
    }
    const customValidationSchema = z.object({
      email: z.string().min(1).email('custom error message'),
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useRecoverPassword({
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
