import AllAuthApi from '../../../services/allauth'
import AuthApi from '../../../services/auth'
import type { AllAuthSignupResponse } from '../../../types/allauth'
import type {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '../../../types/auth'
import { mapAllAuthErrorsToFields, parseAllAuthErrorPayload } from '../../access/allauth/utils'
import { BaseAuthStrategy } from '../base/base-auth-strategy'
import type { AuthError, AuthResult } from '../types'
import { ALLAUTH_STRATEGY_ID } from './constants'
import { mapLoginResponse, mapSignUpResponse } from './utils'

export class AllauthStrategy extends BaseAuthStrategy {
  readonly id = ALLAUTH_STRATEGY_ID

  async login(input: LoginRequest): Promise<AuthResult> {
    try {
      const response = await AllAuthApi.login(input)
      return mapLoginResponse(response)
    } catch (error) {
      return this.throwAuthError(error)
    }
  }

  async signUp(input: RegisterRequest): Promise<AuthResult> {
    try {
      const response = await AllAuthApi.register<AllAuthSignupResponse>(input)
      return mapSignUpResponse(response)
    } catch (error) {
      return this.throwAuthError(error)
    }
  }

  override async preAuthenticate(token: string) {
    try {
      return await AuthApi.preAuthenticate(token)
    } catch (error) {
      return this.throwAuthError(error)
    }
  }

  async logout(): Promise<void> {
    try {
      await AllAuthApi.logout()
    } catch (error) {
      this.throwAuthError(error)
    }
  }

  async recoverPassword(input: ForgotPasswordRequest): Promise<void> {
    try {
      await AllAuthApi.recoverPassword(input)
    } catch (error) {
      this.throwAuthError(error)
    }
  }

  async resetPassword(input: ResetPasswordRequest): Promise<void> {
    try {
      await AllAuthApi.resetPassword({
        password: input.newPassword,
        key: input.token,
      })
    } catch (error) {
      this.throwAuthError(error)
    }
  }

  async changePassword(input: ChangePasswordRequest): Promise<void> {
    try {
      // TODO(auth-strategy): Replace this AuthApi fallback when Allauth exposes
      // a native change-password flow. This preserves current behavior until
      // the backend supports the operation through the active Allauth strategy.
      if (input.token) {
        await AuthApi.changeExpiredPassword({
          currentPassword: input.currentPassword,
          newPassword: input.newPassword,
          token: input.token,
        })
      } else {
        await AuthApi.changePassword({
          currentPassword: input.currentPassword,
          newPassword: input.newPassword,
        })
      }
    } catch (error) {
      this.throwAuthError(error)
    }
  }

  protected toCanonicalAuthError(error: unknown): AuthError {
    const payload = parseAllAuthErrorPayload(error)

    if (payload && Array.isArray(payload.errors) && payload.errors.length > 0) {
      const fieldErrors = mapAllAuthErrorsToFields(payload.errors)
      const firstMessage = Object.values(fieldErrors)[0]?.[0] ?? 'Unknown error'

      const firstCode = payload.errors[0]?.code
      const code =
        firstCode === 'email_password_mismatch'
          ? 'invalid_credentials'
          : (firstCode ?? 'validation_error')

      return {
        code,
        message: firstMessage,
        status: payload.status,
        fieldErrors,
        cause: error,
      }
    }

    return this.toUnknownError(error)
  }
}

export function createAllauthStrategy(): AllauthStrategy {
  return new AllauthStrategy()
}
