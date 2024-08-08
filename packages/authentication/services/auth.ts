import { axios } from '@baseapp-frontend/utils'
import { TokenTypes } from '@baseapp-frontend/utils/constants/token'

import {
  ChangeExpiredPasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  PreAuthRequest,
  PreAuthResponse,
  RegisterRequest,
  ResetPasswordRequest,
} from '../types/auth'

export default class AuthApi {
  static login({ email, password }: LoginRequest): Promise<LoginResponse> {
    return axios.post(`/auth/login`, { email, password })
  }

  static recoverPassword({ email }: ForgotPasswordRequest): Promise<void> {
    return axios.post(`/forgot-password`, { email })
  }

  static resetPassword({ newPassword, token }: ResetPasswordRequest): Promise<void> {
    return axios.post(`/forgot-password/reset`, { newPassword, token })
  }

  static register<TResponse = void>(request: RegisterRequest): Promise<TResponse> {
    return axios.post(`/register`, request)
  }

  static preAuth(request: PreAuthRequest, tokenType: TokenTypes): Promise<PreAuthResponse> {
    switch (tokenType) {
      case TokenTypes.jwt:
        return axios.post(`/auth/pre-auth/jwt`, request)
      case TokenTypes.simple:
        return axios.post(`/auth/pre-auth/auth-token`, request)
      default:
        return Promise.reject(new Error(`Unknown token type: ${tokenType}`))
    }
  }

  static changeExpiredPassword({
    currentPassword,
    newPassword,
    token,
  }: ChangeExpiredPasswordRequest): Promise<void> {
    return axios.post(`/change-expired-password`, { currentPassword, newPassword, token })
  }
}

export const AUTH_API_KEY = {
  default: ['auth'],
  preAuth: (token: string, tokenType: TokenTypes) =>
    [...AUTH_API_KEY.default, 'preAuth', token, tokenType] as const,
}
