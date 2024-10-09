import { baseAppFetch } from '@baseapp-frontend/utils'

import type { User, UserUpdateParams } from '../types/user'

export default class UserApi {
  static getUser<TUser extends Partial<User>>(): Promise<TUser> {
    return baseAppFetch(`/users/me`)
  }

  static updateUser<TUser extends Partial<User>>({
    userId,
    data,
  }: UserUpdateParams<TUser>): Promise<TUser> {
    return baseAppFetch(`/users/${userId}`, { method: 'PATCH', body: data })
  }
}

export const USER_API_KEY = {
  default: ['user'],
  getUser: () => [...USER_API_KEY.default, 'getUser'] as const,
}
