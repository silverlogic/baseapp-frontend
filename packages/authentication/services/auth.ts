import { baseAppFetch } from '@baseapp-frontend/utils'

import type {
  ChangeExpiredPasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
} from '../types/auth'

export default class AuthApi {
  static login(
    { email, password }: LoginRequest,
    path?: `/${string}` | '',
  ): Promise<LoginResponse> {
    return baseAppFetch(`${path ?? '/auth/login'}`, { method: 'POST', body: { email, password } })
  }

  static recoverPassword({ email }: ForgotPasswordRequest): Promise<void> {
    return baseAppFetch(`/forgot-password`, { method: 'POST', body: { email } })
  }

  static resetPassword({ newPassword, token }: ResetPasswordRequest): Promise<void> {
    return baseAppFetch(`/forgot-password/reset`, { method: 'POST', body: { newPassword, token } })
  }

  static register<TResponse = void>(
    request: RegisterRequest,
    path?: `/${string}` | '',
  ): Promise<TResponse> {
    return baseAppFetch(`${path ?? '/register'}`, { method: 'POST', body: request })
  }

  static changeExpiredPassword({
    currentPassword,
    newPassword,
    token,
  }: ChangeExpiredPasswordRequest): Promise<void> {
    return baseAppFetch(`/change-expired-password`, {
      method: 'POST',
      body: { currentPassword, newPassword, token },
    })
  }
}

export const AUTH_API_KEY = {
  default: ['auth'],
}
