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

  static async googleLogin(googleTokens: {
    access_token: string
    id_token?: string
  }): Promise<AllAuthLoginResponse> {
    const idToken = googleTokens.access_token
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''

    console.log('[AllAuthApi.googleLogin] Token info:', {
      tokenLength: idToken?.length,
      tokenPreview: `${idToken?.substring(0, 50)}...`,
      hasMultipleParts: idToken?.split('.').length === 3, // JWT has 3 parts
      clientId,
    })

    // AllAuth Headless provider/token endpoint expects:
    // - provider: the provider name
    // - process: 'login' or 'connect'
    // - token: MUST BE AN OBJECT with client_id and id_token
    // Reference: allauth/headless/socialaccount/inputs.py ProviderTokenInput
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
