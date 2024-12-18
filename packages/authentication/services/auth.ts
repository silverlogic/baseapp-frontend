import { baseAppFetch } from '@baseapp-frontend/utils'

import type {
  ChangeExpiredPasswordRequest,
  ForgotPasswordRequest,
  TempResetPasswordRequest,
} from '../types/auth'

export default class AuthApi {
  static recoverPassword({ email }: ForgotPasswordRequest): Promise<void> {
    return baseAppFetch(`/forgot-password`, { method: 'POST', body: { email } })
  }

  static resetPassword({ newPassword, token }: TempResetPasswordRequest): Promise<void> {
    return baseAppFetch(`/forgot-password/reset`, { method: 'POST', body: { newPassword, token } })
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
