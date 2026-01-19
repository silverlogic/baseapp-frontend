import {
  ComponentWithProviders,
  mockFetch,
  mockFetchError,
  renderHook,
} from '@baseapp-frontend/test'

import { z } from 'zod'

import { withAuthenticationTestProviders } from '../../../tests/utils'
import useRequestEmailChange from '../index'

describe('useRequestEmailChange', () => {
  const newEmail = 'newemail@example.com'
  const requestEmailChangeUrl = '/change-email'

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  test('should run onSuccess', async () => {
    mockFetch(requestEmailChangeUrl, {
      method: 'POST',
      status: 200,
      response: {
        newEmail,
      },
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useRequestEmailChange({
          defaultValues: {
            newEmail,
          },
          requestEmailChangeOptions: {
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
    mockFetchError(requestEmailChangeUrl, { error: 'error', status: 500, method: 'POST' })

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useRequestEmailChange({
          defaultValues: {
            newEmail,
          },
          requestEmailChangeOptions: {
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

  test('should run onError when email is invalid', async () => {
    mockFetch(requestEmailChangeUrl, {
      method: 'POST',
      status: 200,
      response: {},
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useRequestEmailChange({
          defaultValues: {
            newEmail: 'invalid-email',
          },
          requestEmailChangeOptions: {
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
    mockFetch(requestEmailChangeUrl, {
      method: 'POST',
      status: 200,
      response: {},
    })

    const customDefaultValues = {
      newEmail: 'custom@example.com',
    }

    const customValidationSchema = z.object({
      newEmail: z.string().min(1),
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useRequestEmailChange({
          defaultValues: customDefaultValues,
          validationSchema: customValidationSchema,
          requestEmailChangeOptions: {
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

  describe('resendRequestEmailChangeMutation', () => {
    const resendRequestEmailChangeUrl = '/change-email/resend-confirm'

    test('should successfully resend email change request', async () => {
      mockFetch(resendRequestEmailChangeUrl, {
        method: 'POST',
        status: 200,
        response: {},
      })

      const { result } = renderHook(() => useRequestEmailChange({}), {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      })

      await result.current.resendRequestEmailChangeMutation.mutateAsync()

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(resendRequestEmailChangeUrl),
        expect.objectContaining({
          method: 'POST',
        }),
      )
    })

    test('should handle error when resending email change request fails', async () => {
      mockFetchError(resendRequestEmailChangeUrl, {
        error: 'error',
        status: 500,
        method: 'POST',
      })

      const { result } = renderHook(() => useRequestEmailChange({}), {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      })

      await expect(
        result.current.resendRequestEmailChangeMutation.mutateAsync(),
      ).rejects.toBeDefined()
    })
  })
})
