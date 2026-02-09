import {
  ComponentWithProviders,
  mockFetch,
  mockFetchError,
  renderHook,
} from '@baseapp-frontend/test'
import { setFormApiErrors } from '@baseapp-frontend/utils'

import { withAuthenticationTestProviders } from '../../../../tests/utils'
import useAllAuthRecoverPassword from '../index'

jest.mock('@baseapp-frontend/utils', () => ({
  ...jest.requireActual('@baseapp-frontend/utils'),
  setFormApiErrors: jest.fn(),
}))

describe('useAllAuthRecoverPassword', () => {
  const email = 'test@tsl.io'
  const recoverPasswordUrl = '/_allauth/app/v1/auth/password/request' // NOSONAR

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
    ;(setFormApiErrors as jest.Mock).mockClear()
  })

  test('should call AllAuth password request endpoint', async () => {
    mockFetch(recoverPasswordUrl, {
      method: 'POST',
      status: 200,
      response: { email },
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useAllAuthRecoverPassword({
          defaultValues: {
            email,
          },
          mutationOptions: {
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
      expect.stringContaining(recoverPasswordUrl),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    )
  })

  test('should run onError', async () => {
    mockFetchError(recoverPasswordUrl, {
      method: 'POST',
      status: 400,
      error: 'Invalid email',
    })

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useAllAuthRecoverPassword({
          defaultValues: {
            email,
          },
          mutationOptions: {
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
    mockFetchError(recoverPasswordUrl, {
      method: 'POST',
      status: 400,
      error: 'Invalid email',
    })

    const { result } = renderHook(
      () =>
        useAllAuthRecoverPassword({
          defaultValues: {
            email,
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
    mockFetchError(recoverPasswordUrl, {
      method: 'POST',
      status: 400,
      error: 'Invalid email',
    })

    const { result } = renderHook(
      () =>
        useAllAuthRecoverPassword({
          defaultValues: {
            email,
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
