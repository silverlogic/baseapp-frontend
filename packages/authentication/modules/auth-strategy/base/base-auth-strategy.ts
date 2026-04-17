import type { JWTResponse } from '@baseapp-frontend/utils/types/jwt'

import type {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '../../../types/auth'
import type { AuthError, AuthResult, AuthStrategy, AuthStrategyId } from '../types'

export abstract class BaseAuthStrategy implements AuthStrategy {
  abstract readonly id: AuthStrategyId

  abstract login(input: LoginRequest): Promise<AuthResult>
  abstract signUp(input: RegisterRequest): Promise<AuthResult>
  preAuthenticate?(_token: string): Promise<JWTResponse>
  abstract logout(): Promise<void>
  abstract recoverPassword(input: ForgotPasswordRequest): Promise<void>
  abstract resetPassword(input: ResetPasswordRequest): Promise<void>
  abstract changePassword(input: ChangePasswordRequest): Promise<void>

  protected abstract toCanonicalAuthError(error: unknown): AuthError

  protected throwAuthError(error: unknown): never {
    const authError = this.toCanonicalAuthError(error)
    const err = Object.assign(new Error(authError.message), authError)
    throw err
  }

  // eslint-disable-next-line class-methods-use-this
  protected toUnknownError(error: unknown): AuthError {
    if (error instanceof Error) {
      return {
        code: 'unknown_error',
        message: error.message,
        cause: error,
      }
    }

    return {
      code: 'unknown_error',
      message: 'An unexpected error occurred',
      cause: error,
    }
  }
}
