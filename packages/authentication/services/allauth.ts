import { baseAppFetch } from '@baseapp-frontend/utils/functions/fetch/baseAppFetch'

import type { AllAuthLoginResponse, AllAuthResetPasswordRequest } from '../types/allauth'
import type { ForgotPasswordRequest, LoginRequest, RegisterRequest } from '../types/auth'

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

  static async googleLogin(googleTokens: { id_token: string }): Promise<AllAuthLoginResponse> {
    const idToken = googleTokens.id_token
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''

    const payload = {
      provider: 'google',
      process: 'login',
      token: {
        client_id: clientId,
        id_token: idToken,
      },
    }

    return baseAppFetch(`/_allauth/app/v1/auth/provider/token`, {
      method: 'POST',
      body: payload,
    })
  }

  static logout(sessionToken?: string): Promise<void> {
    return baseAppFetch(`/_allauth/app/v1/auth/session`, {
      method: 'DELETE',
      ...(sessionToken && {
        headers: {
          'X-Session-Token': sessionToken,
        },
      }),
    })
  }

  static recoverPassword({ email }: ForgotPasswordRequest): Promise<void> {
    return baseAppFetch(`/_allauth/app/v1/auth/password/request`, {
      method: 'POST',
      body: { email },
    })
  }

  static resetPassword({ password, key }: AllAuthResetPasswordRequest): Promise<void> {
    return baseAppFetch(`/_allauth/app/v1/auth/password/reset`, {
      method: 'POST',
      body: { password, key },
    })
  }

  static register<TResponse = void>(request: RegisterRequest): Promise<TResponse> {
    return baseAppFetch(`/_allauth/app/v1/auth/signup`, { method: 'POST', body: request })
  }
}
