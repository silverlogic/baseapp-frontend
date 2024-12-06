import { baseAppFetch } from '@baseapp-frontend/utils'

import type { ChangeExpiredPasswordRequest } from '../types/auth'

export default class AuthApi {
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
