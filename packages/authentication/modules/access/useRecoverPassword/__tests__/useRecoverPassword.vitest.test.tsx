import {
  ComponentWithProviders,
  mockFetch,
  mockFetchError,
  renderHook,
} from '@baseapp-frontend/test'

import { z } from 'zod'

import { withAuthenticationTestProviders } from '../../../tests/utils'
import useRecoverPassword from '../index'

describe('useResetPassword', () => {
  const email = 'test@tsl.io'
  const forgotPasswordUrl = '/forgot-password'

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  test('should run onSuccess', async () => {
    mockFetch(forgotPasswordUrl, {
      method: 'POST',
      status: 200,
      response: { email },
    })

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

    expect(hasOnSuccessRan).toBe(true)
  })

  test('should run onError', async () => {
    mockFetchError(forgotPasswordUrl, {
      method: 'POST',
      status: 500,
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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnErrorRan).toBe(true)
  })

  test('should allow custom defaultValues and validationSchema', async () => {
    mockFetch(forgotPasswordUrl, {
      method: 'POST',
      status: 200,
      response: {},
    })

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
