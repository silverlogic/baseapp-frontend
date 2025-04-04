import { baseAppFetch } from '@baseapp-frontend/utils/functions/fetch/baseAppFetch'

import type {
  ChangeExpiredPasswordRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
} from '../types/auth'

export default class AuthApi {
  static login({ email, password }: LoginRequest): Promise<LoginResponse> {
    return baseAppFetch(`/auth/login`, { method: 'POST', body: { email, password } })
  }

  static recoverPassword({ email }: ForgotPasswordRequest): Promise<void> {
    return baseAppFetch(`/forgot-password`, { method: 'POST', body: { email } })
  }

  static resetPassword({ newPassword, token }: ResetPasswordRequest): Promise<void> {
    return baseAppFetch(`/forgot-password/reset`, { method: 'POST', body: { newPassword, token } })
  }

  static register<TResponse = void>(request: RegisterRequest): Promise<TResponse> {
    return baseAppFetch(`/register`, { method: 'POST', body: request })
  }

  static changePassword({ currentPassword, newPassword }: ChangePasswordRequest) {
    return baseAppFetch('/users/change-password', {
      method: 'POST',
      body: { currentPassword, newPassword },
    })
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
