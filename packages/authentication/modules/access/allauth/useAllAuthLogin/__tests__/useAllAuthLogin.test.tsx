import {
  ComponentWithProviders,
  cookiesMock,
  mockFetch,
  mockFetchError,
  renderHook,
} from '@baseapp-frontend/test'
import { setFormApiErrors } from '@baseapp-frontend/utils'

import { withAuthenticationTestProviders } from '../../../../tests/utils'
import useAllAuthLogin from '../index'

jest.mock('@baseapp-frontend/utils', () => ({
  ...jest.requireActual('@baseapp-frontend/utils'),
  setFormApiErrors: jest.fn(),
}))

describe('useAllAuthLogin', () => {
  const loginUrl = '/_allauth/app/v1/auth/login'

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
    cookiesMock.set.mockClear()
    ;(setFormApiErrors as jest.Mock).mockClear()
  })

  test('should call AllAuth login endpoint', async () => {
    mockFetch(loginUrl, {
      method: 'POST',
      status: 200,
      response: {
        meta: {
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token',
          sessionToken: 'fake-session-token',
        },
        data: {
          user: {
            id: 1,
            email: 'test@tsl.io',
            display: 'Test User',
          },
        },
      },
    })

    cookiesMock.set.mockImplementation((accessKeyName: string) => accessKeyName)

    const email = 'test@tsl.io'
    const password = '123456789' // NOSONAR

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useAllAuthLogin({
          loginFormOptions: {
            defaultValues: {
              email,
              password,
            },
          },
          loginOptions: {
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
    expect(cookiesMock.set).toHaveBeenCalledTimes(3)
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(loginUrl),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    )
  })

  test('should run onError', async () => {
    mockFetchError(loginUrl, {
      method: 'POST',
      status: 400,
      error: 'Invalid credentials',
    })

    const email = 'test@tsl.io'
    const password = '123456789' // NOSONAR

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useAllAuthLogin({
          loginFormOptions: {
            defaultValues: {
              email,
              password,
            },
          },
          loginOptions: {
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
    mockFetchError(loginUrl, {
      method: 'POST',
      status: 400,
      error: 'Invalid credentials',
    })

    const { result } = renderHook(
      () =>
        useAllAuthLogin({
          loginFormOptions: {
            defaultValues: {
              email: 'test@tsl.io',
              password: '123456789', // NOSONAR
            },
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
    mockFetchError(loginUrl, {
      method: 'POST',
      status: 400,
      error: 'Invalid credentials',
    })

    const { result } = renderHook(
      () =>
        useAllAuthLogin({
          loginFormOptions: {
            defaultValues: {
              email: 'test@tsl.io',
              password: '123456789', // NOSONAR
            },
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

  test('should handle MFA response', async () => {
    mockFetch(loginUrl, {
      method: 'POST',
      status: 200,
      response: {
        ephemeralToken: 'fake-ephemeral-token',
        method: 'totp',
      },
    })

    const { result } = renderHook(
      () =>
        useAllAuthLogin({
          loginFormOptions: {
            defaultValues: {
              email: 'test@tsl.io',
              password: '123456789', // NOSONAR
            },
          },
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(cookiesMock.set).not.toHaveBeenCalled()
  })
})
