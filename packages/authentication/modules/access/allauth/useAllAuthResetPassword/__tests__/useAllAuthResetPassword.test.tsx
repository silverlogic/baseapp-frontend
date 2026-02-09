import {
  ComponentWithProviders,
  mockFetch,
  mockFetchError,
  renderHook,
} from '@baseapp-frontend/test'
import { setFormApiErrors } from '@baseapp-frontend/utils'

import { withAuthenticationTestProviders } from '../../../../tests/utils'
import useAllAuthResetPassword from '../index'

jest.mock('@baseapp-frontend/utils', () => ({
  ...jest.requireActual('@baseapp-frontend/utils'),
  setFormApiErrors: jest.fn(),
}))

describe('useAllAuthResetPassword', () => {
  const password = '12345#Abcde'
  const token = 'fake-token'
  const resetPasswordUrl = '/_allauth/app/v1/auth/password/reset'

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
    ;(setFormApiErrors as jest.Mock).mockClear()
  })

  test('should call AllAuth password reset endpoint', async () => {
    mockFetch(resetPasswordUrl, {
      method: 'POST',
      status: 200,
      response: {
        password,
        token,
      },
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useAllAuthResetPassword({
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

    expect(hasOnSuccessRan).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(resetPasswordUrl),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ password, key: token }),
      }),
    )
  })

  test('should run onError', async () => {
    mockFetchError(resetPasswordUrl, {
      method: 'POST',
      status: 400,
      error: 'Invalid token',
    })

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useAllAuthResetPassword({
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

  test('should set form API errors when enableFormApiErrors is true', async () => {
    mockFetchError(resetPasswordUrl, {
      method: 'POST',
      status: 400,
      error: 'Invalid token',
    })

    const { result } = renderHook(
      () =>
        useAllAuthResetPassword({
          token,
          defaultValues: {
            newPassword: password,
            confirmNewPassword: password,
          },
          enableFormApiErrors: true,
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(setFormApiErrors).toHaveBeenCalled()
  })

  test('should not set form API errors when enableFormApiErrors is false', async () => {
    mockFetchError(resetPasswordUrl, {
      method: 'POST',
      status: 400,
      error: 'Invalid token',
    })

    const { result } = renderHook(
      () =>
        useAllAuthResetPassword({
          token,
          defaultValues: {
            newPassword: password,
            confirmNewPassword: password,
          },
          enableFormApiErrors: false,
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(setFormApiErrors).not.toHaveBeenCalled()
  })
})
