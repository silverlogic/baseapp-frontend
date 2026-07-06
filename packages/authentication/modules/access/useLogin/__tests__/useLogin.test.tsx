import { ComponentWithProviders, renderHook } from '@baseapp-frontend/test'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { AuthResult } from '../../../auth-strategy/types'
import { withAuthenticationTestProviders } from '../../../tests/utils'
import useLogin from '../index'

const mockLogin = jest.fn()
const mockWriteSession = jest.fn().mockResolvedValue(undefined)

jest.mock('../../../auth-strategy/factory', () => ({
  getActiveAuthModule: () => ({
    strategy: {
      login: mockLogin,
    },
  }),
}))

jest.mock('../../../../session/client', () => ({
  getSessionService: () => ({
    write: mockWriteSession,
  }),
}))

const successResult: AuthResult = {
  kind: 'success',
  session: {
    accessToken: 'access',
    refreshToken: 'refresh',
    sessionToken: 'session',
  },
  metadata: {
    accessToken: 'access',
    refreshToken: 'refresh',
    sessionToken: 'session',
  },
}

describe('useLogin', () => {
  const email = 'test@tsl.io'
  const password = '123456789'

  afterEach(() => {
    mockLogin.mockReset()
    mockWriteSession.mockClear()
  })

  test('should call strategy.login and run onSuccess', async () => {
    mockLogin.mockResolvedValueOnce(successResult)

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

    expect(mockLogin).toHaveBeenCalledWith({ email, password })
    expect(hasOnSuccessRan).toBe(true)
    expect(mockWriteSession).toHaveBeenCalledWith({
      accessToken: 'access',
      refreshToken: 'refresh',
      sessionToken: 'session',
    })
  })

  test('should run onError when strategy rejects', async () => {
    mockLogin.mockRejectedValueOnce({
      code: 'invalid_credentials',
      message: 'Invalid credentials',
    })

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
    mockLogin.mockResolvedValueOnce(successResult)

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

  test('should set mfa state when strategy returns mfa_required', async () => {
    const mfaResult: AuthResult = {
      kind: 'mfa_required',
      ephemeralToken: 'ephemeral-token',
      method: 'totp',
    }
    mockLogin.mockResolvedValueOnce(mfaResult)

    let receivedResult: AuthResult | null = null

    const { result } = renderHook(
      () =>
        useLogin({
          loginFormOptions: {
            defaultValues: { email, password },
          },
          loginOptions: {
            onSuccess: (res) => {
              receivedResult = res as AuthResult
            },
          },
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(receivedResult).toMatchObject({ kind: 'mfa_required' })
    expect(mockWriteSession).not.toHaveBeenCalled()
  })
})
