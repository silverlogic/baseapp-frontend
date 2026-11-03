import {
  ComponentWithProviders,
  cookiesMock,
  mockFetch,
  mockFetchError,
  renderHook,
} from '@baseapp-frontend/test'
import {
  IMPERSONATOR_ACCESS_KEY_NAME,
  IMPERSONATOR_REFRESH_KEY_NAME,
} from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { withAuthenticationTestProviders } from '../../../tests/utils'
import useLogin from '../index'

describe('useLogin', () => {
  const loginUrl = '/auth/login'

  afterEach(() => {
    ;(global.fetch as Mock).mockClear()
    cookiesMock.set.mockClear()
    cookiesMock.remove.mockClear()
  })

  test('should run onSuccess', async () => {
    mockFetch(loginUrl, {
      method: 'POST',
      status: 200,
      response: {
        token: 'fake token',
      },
    })

    cookiesMock.set.mockImplementation((accessKeyName: string) => accessKeyName)

    const email = 'test@tsl.io'
    const password = '123456789'

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useLogin({
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
    expect(cookiesMock.set).toBeCalledTimes(2)
  })

  test("forgets an impersonator's tokens kept aside before the login", async () => {
    mockFetch(loginUrl, {
      method: 'POST',
      status: 200,
      response: { access: 'access', refresh: 'refresh' },
    })

    const { result } = renderHook(
      () =>
        useLogin({
          loginFormOptions: { defaultValues: { email: 'test@tsl.io', password: '123456789' } },
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(cookiesMock.remove).toHaveBeenCalledWith(IMPERSONATOR_ACCESS_KEY_NAME)
    expect(cookiesMock.remove).toHaveBeenCalledWith(IMPERSONATOR_REFRESH_KEY_NAME)
  })

  test('should run onError', async () => {
    mockFetchError(loginUrl, {
      method: 'POST',
      status: 400,
      error: 'Invalid credentials',
    })

    const email = 'test@tsl.io'
    const password = '123456789'

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useLogin({
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

  test('should allow custom defaultValues and validationSchema', async () => {
    mockFetch(loginUrl, {
      method: 'POST',
      status: 200,
      response: {},
    })

    const customDefaultValues = {
      email: 'test@tsl.io',
      password: 'fW7q0jwv',
    }
    const customValidationSchema = z.object({
      password: z.string().min(1),
      email: z.string().min(1).email(),
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useLogin({
          loginFormOptions: {
            defaultValues: customDefaultValues,
            resolver: zodResolver(customValidationSchema),
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
  })
})
