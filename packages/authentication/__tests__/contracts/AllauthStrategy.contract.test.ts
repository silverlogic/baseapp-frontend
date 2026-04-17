import { createAllauthStrategy } from '../../modules/auth-strategy/allauth'
import { getActiveAuthModule } from '../../modules/auth-strategy/factory'
import type { AuthError, AuthResult } from '../../modules/auth-strategy/types'
import AllAuthApi from '../../services/allauth'
import AuthApi from '../../services/auth'
import type { AllAuthLoginResponse, AllAuthResponse } from '../../types/allauth'

jest.mock('../../services/allauth')
jest.mock('../../services/auth')

const mockedAllAuthApi = jest.mocked(AllAuthApi)
const mockedAuthApi = jest.mocked(AuthApi)

function buildLoginResponse(overrides: Partial<AllAuthLoginResponse> = {}): AllAuthLoginResponse {
  return {
    status: 200,
    meta: {
      accessToken: 'access-tok',
      refreshToken: 'refresh-tok',
      sessionToken: 'session-tok',
    },
    data: { user: { id: 1, email: 'test@example.com' } },
    ...overrides,
  }
}

function buildAllAuthErrorPayload(
  errors: Array<{ message?: string; code?: string; param?: string }>,
  status = 400,
) {
  return {
    response: {
      data: { status, errors },
    },
    message: errors[0]?.message ?? 'error',
  }
}

describe('AllauthStrategy — contract', () => {
  const strategy = createAllauthStrategy()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('identity', () => {
    it('has id "allauth"', () => {
      expect(strategy.id).toBe('allauth')
    })
  })

  describe('login', () => {
    it('maps a success response to AuthResult { kind: "success" }', async () => {
      const loginResponse = buildLoginResponse()
      mockedAllAuthApi.login.mockResolvedValue(loginResponse)

      const result: AuthResult = await strategy.login({
        email: 'test@example.com',
        password: 'pass123', // NOSONAR
      })

      expect(result.kind).toBe('success')
      expect(result).toMatchObject({
        kind: 'success',
        session: {
          accessToken: 'access-tok',
          refreshToken: 'refresh-tok',
          sessionToken: 'session-tok',
        },
        rawResponse: loginResponse,
        metadata: expect.objectContaining({
          accessToken: 'access-tok',
          refreshToken: 'refresh-tok',
          sessionToken: 'session-tok',
        }),
      })
    })

    it('maps a redirect response to AuthResult { kind: "redirect_required" }', async () => {
      const loginResponse = buildLoginResponse({
        redirectUrl: '/change-password',
      })
      mockedAllAuthApi.login.mockResolvedValue(loginResponse)

      const result = await strategy.login({
        email: 'test@example.com',
        password: 'pass123', // NOSONAR
      })

      expect(result).toMatchObject({
        kind: 'redirect_required',
        redirectUrl: '/change-password',
      })
    })

    it('maps a pending MFA flow to AuthResult { kind: "mfa_required" }', async () => {
      const loginResponse = buildLoginResponse({
        data: {
          user: { id: 1 },
          flows: [{ id: 'mfa_authenticate', isPending: true }],
        },
      })
      mockedAllAuthApi.login.mockResolvedValue(loginResponse)

      const result = await strategy.login({
        email: 'test@example.com',
        password: 'pass123', // NOSONAR
      })

      expect(result).toMatchObject({
        kind: 'mfa_required',
        ephemeralToken: 'session-tok',
        method: 'mfa_authenticate',
      })
    })

    it('maps allauth field errors to canonical AuthError with fieldErrors', async () => {
      const apiError = buildAllAuthErrorPayload([
        { message: 'Email is required.', param: 'email' },
        { message: 'Password is too short.', param: 'password' }, // NOSONAR
      ])
      mockedAllAuthApi.login.mockRejectedValue(apiError)

      try {
        await strategy.login({ email: '', password: '' })
        fail('Expected an error to be thrown')
      } catch (error_) {
        const authError = error_ as AuthError
        expect(authError.code).toBe('validation_error')
        expect(authError.fieldErrors).toEqual({
          email: ['Email is required.'],
          password: ['Password is too short.'], // NOSONAR
        })
        expect(authError.status).toBe(400)
        expect(authError.cause).toBe(apiError)
      }
    })

    it('maps email_password_mismatch to "invalid_credentials" code', async () => {
      const apiError = buildAllAuthErrorPayload([
        { code: 'email_password_mismatch', message: 'original', param: 'email' },
      ])
      mockedAllAuthApi.login.mockRejectedValue(apiError)

      try {
        await strategy.login({ email: 'test@example.com', password: 'wrong' }) // NOSONAR
        fail('Expected an error to be thrown')
      } catch (error_) {
        const authError = error_ as AuthError
        expect(authError.code).toBe('invalid_credentials')
        expect(authError.fieldErrors?.email).toEqual(['Invalid email or password.'])
      }
    })

    it('maps a plain Error to AuthError with code "unknown_error"', async () => {
      mockedAllAuthApi.login.mockRejectedValue(new Error('Network failure'))

      try {
        await strategy.login({ email: 'a@b.com', password: 'x' })
        fail('Expected an error to be thrown')
      } catch (error_) {
        const authError = error_ as AuthError
        expect(authError.code).toBe('unknown_error')
        expect(authError.message).toBe('Network failure')
      }
    })
  })

  describe('signUp', () => {
    it('maps a success response to AuthResult { kind: "success" }', async () => {
      const signUpResponse: AllAuthResponse = {
        status: 200,
        data: { user: { id: 2 } },
      }
      mockedAllAuthApi.register.mockResolvedValue(signUpResponse as any)

      const result = await strategy.signUp({
        email: 'new@example.com',
        password: 'securePass1', // NOSONAR
      })

      expect(result.kind).toBe('success')
    })

    it('maps allauth errors to canonical AuthError', async () => {
      const apiError = buildAllAuthErrorPayload([
        { message: 'Email already exists.', param: 'email' },
      ])
      mockedAllAuthApi.register.mockRejectedValue(apiError)

      try {
        await strategy.signUp({ email: 'dup@example.com', password: 'pass' }) // NOSONAR
        fail('Expected an error to be thrown')
      } catch (error_) {
        const authError = error_ as AuthError
        expect(authError.fieldErrors).toEqual({
          email: ['Email already exists.'],
        })
      }
    })
  })

  describe('logout', () => {
    it('delegates to AllAuthApi.logout()', async () => {
      mockedAllAuthApi.logout.mockResolvedValue(undefined)

      await strategy.logout()

      expect(mockedAllAuthApi.logout).toHaveBeenCalledTimes(1)
    })

    it('maps logout errors to canonical AuthError', async () => {
      mockedAllAuthApi.logout.mockRejectedValue(new Error('server error'))

      try {
        await strategy.logout()
        fail('Expected an error to be thrown')
      } catch (error_) {
        const authError = error_ as AuthError
        expect(authError.code).toBe('unknown_error')
      }
    })
  })

  describe('recoverPassword', () => {
    it('delegates to AllAuthApi.recoverPassword()', async () => {
      mockedAllAuthApi.recoverPassword.mockResolvedValue(undefined)

      await strategy.recoverPassword({ email: 'test@example.com' })

      expect(mockedAllAuthApi.recoverPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
      })
    })

    it('maps errors to canonical AuthError', async () => {
      const apiError = buildAllAuthErrorPayload([{ message: 'User not found.', param: 'email' }])
      mockedAllAuthApi.recoverPassword.mockRejectedValue(apiError)

      try {
        await strategy.recoverPassword({ email: 'nope@example.com' })
        fail('Expected an error to be thrown')
      } catch (error_) {
        const authError = error_ as AuthError
        expect(authError.fieldErrors).toEqual({
          email: ['User not found.'],
        })
      }
    })
  })

  describe('resetPassword', () => {
    it('maps canonical input { newPassword, token } to allauth { password, key }', async () => {
      mockedAllAuthApi.resetPassword.mockResolvedValue(undefined)

      await strategy.resetPassword({ newPassword: 'newPass123', token: 'reset-key' }) // NOSONAR

      expect(mockedAllAuthApi.resetPassword).toHaveBeenCalledWith({
        password: 'newPass123', // NOSONAR
        key: 'reset-key',
      })
    })

    it('maps errors to canonical AuthError', async () => {
      const apiError = buildAllAuthErrorPayload([{ message: 'Invalid token.', param: 'key' }])
      mockedAllAuthApi.resetPassword.mockRejectedValue(apiError)

      try {
        await strategy.resetPassword({ newPassword: 'x', token: 'bad' })
        fail('Expected an error to be thrown')
      } catch (error_) {
        const authError = error_ as AuthError
        expect(authError.fieldErrors).toEqual({
          key: ['Invalid token.'],
        })
      }
    })
  })

  describe('changePassword', () => {
    it('delegates to AuthApi.changePassword when no token is provided', async () => {
      mockedAuthApi.changePassword.mockResolvedValue(undefined as any)

      await strategy.changePassword({
        currentPassword: 'old', // NOSONAR
        newPassword: 'new', // NOSONAR
      })

      expect(mockedAuthApi.changePassword).toHaveBeenCalledWith({
        currentPassword: 'old', // NOSONAR
        newPassword: 'new', // NOSONAR
      })
    })

    it('delegates to AuthApi.changeExpiredPassword when token is provided', async () => {
      mockedAuthApi.changeExpiredPassword.mockResolvedValue(undefined as any)

      await strategy.changePassword({
        currentPassword: 'old', // NOSONAR
        newPassword: 'new', // NOSONAR
        token: 'expired-token',
      })

      expect(mockedAuthApi.changeExpiredPassword).toHaveBeenCalledWith({
        currentPassword: 'old', // NOSONAR
        newPassword: 'new', // NOSONAR
        token: 'expired-token',
      })
    })

    it('maps errors to canonical AuthError', async () => {
      mockedAuthApi.changePassword.mockRejectedValue(new Error('server error'))

      try {
        await strategy.changePassword({
          currentPassword: 'old', // NOSONAR
          newPassword: 'new', // NOSONAR
        })
        fail('Expected an error to be thrown')
      } catch (error_) {
        const authError = error_ as AuthError
        expect(authError.code).toBe('unknown_error')
      }
    })
  })
})

describe('AuthStrategyFactory — returns real AllauthStrategy', () => {
  it('factory-resolved strategy has a working login method (not a stub)', async () => {
    const { strategy } = getActiveAuthModule('allauth')

    const loginResponse = buildLoginResponse()
    mockedAllAuthApi.login.mockResolvedValue(loginResponse)

    const result = await strategy.login({
      email: 'test@example.com',
      password: 'pass', // NOSONAR
    })

    expect(result.kind).toBe('success')
  })
})
