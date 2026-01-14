import { baseAppFetch } from '@baseapp-frontend/utils/functions/fetch/baseAppFetch'

import type { AllAuthLoginJWTResponse, AllAuthLoginResponse } from '../types/allauth'
import type {
  ForgotPasswordRequest,
  LoginChangeExpiredPasswordRedirectResponse,
  LoginMfaRequest,
  LoginMfaResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '../types/auth'
import { isLoginChangeExpiredPasswordRedirectResponse, isLoginMfaResponse } from '../utils/login'

export type AllAuthLoginResult =
  | (AllAuthLoginJWTResponse & { rawData?: unknown })
  | LoginMfaResponse
  | LoginChangeExpiredPasswordRedirectResponse

function normalizeAllAuthResponse(rawResponse: unknown): AllAuthLoginResult {
  if (!rawResponse || typeof rawResponse !== 'object') {
    throw new Error('Invalid response from AllAuth')
  }

  if (isLoginMfaResponse(rawResponse as any)) {
    return rawResponse as LoginMfaResponse
  }

  if (isLoginChangeExpiredPasswordRedirectResponse(rawResponse as any)) {
    return rawResponse as LoginChangeExpiredPasswordRedirectResponse
  }

  const allAuthResponse = rawResponse as AllAuthLoginResponse

  let accessToken: string | undefined
  let refreshToken: string | undefined

  if (allAuthResponse.meta?.accessToken && allAuthResponse.meta?.refreshToken) {
    accessToken = allAuthResponse.meta.accessToken
    refreshToken = allAuthResponse.meta.refreshToken
  } else if (allAuthResponse.data?.accessToken && allAuthResponse.data?.refreshToken) {
    accessToken = allAuthResponse.data.accessToken
    refreshToken = allAuthResponse.data.refreshToken
  }

  if (accessToken && refreshToken) {
    const normalized: AllAuthLoginJWTResponse & { rawData?: unknown } = {
      accessToken,
      refreshToken,
    }

    if (allAuthResponse.data) {
      normalized.rawData = allAuthResponse.data
    }

    return normalized
  }

  throw new Error('Unable to normalize AllAuth response')
}

/**
 * AllAuth API service for headless authentication endpoints
 * Uses the /_allauth/app/v1/ prefix for AllAuth headless endpoints
 */
export default class AllAuthApi {
  static async login({ email, password }: LoginRequest): Promise<AllAuthLoginResult> {
    const rawResponse = await baseAppFetch(`/_allauth/app/v1/auth/login`, {
      method: 'POST',
      body: { email, password },
    })
    return normalizeAllAuthResponse(rawResponse)
  }

  static async loginStep2(data: LoginMfaRequest): Promise<AllAuthLoginResult> {
    const rawResponse = await baseAppFetch(`/_allauth/app/v1/auth/2fa/authenticate`, {
      method: 'POST',
      body: data,
    })
    return normalizeAllAuthResponse(rawResponse)
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
