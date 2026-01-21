import { baseAppFetch } from '@baseapp-frontend/utils/functions/fetch/baseAppFetch'

import type { AllAuthLoginResponse } from '../types/allauth'
import type {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '../types/auth'

/**
 * AllAuth API service for headless authentication endpoints
 * Uses the /_allauth/app/v1/ prefix for AllAuth headless endpoints
 */
export default class AllAuthApi {
  static async login({ email, password }: LoginRequest): Promise<AllAuthLoginResponse> {
    return baseAppFetch(`/_allauth/app/v1/auth/login`, {
      method: 'POST',
      body: { email, password },
    })
  }

  static logout(): Promise<void> {
    return baseAppFetch(`/_allauth/app/v1/auth/session`, {
      method: 'DELETE',
    })
  }

  static recoverPassword({ email }: ForgotPasswordRequest): Promise<void> {
    return baseAppFetch(`/_allauth/app/v1/auth/password/request`, {
      method: 'POST',
      body: { email },
    })
  }

  static resetPassword({ newPassword, token }: ResetPasswordRequest): Promise<void> {
    return baseAppFetch(`/_allauth/app/v1/auth/password/reset`, {
      method: 'POST',
      body: { newPassword, token },
    })
  }

  static register<TResponse = void>(request: RegisterRequest): Promise<TResponse> {
    return baseAppFetch(`/_allauth/app/v1/auth/signup`, { method: 'POST', body: request })
  }
}
