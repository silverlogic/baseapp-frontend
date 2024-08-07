import { axios } from '@baseapp-frontend/utils'

import { User, UserUpdateParams } from '../types/user'

export default class UserApi {
  static getUser<TUser extends Partial<User>>(): Promise<TUser> {
    return axios.get(`/users/me`)
  }

  static updateUser<TUser extends Partial<User>>({
    userId,
    data,
  }: UserUpdateParams<TUser>): Promise<TUser> {
    return axios.patch(`/users/${userId}`, data)
  }
}

export const USER_API_KEY = {
  default: ['user'],
  getUser: () => [...USER_API_KEY.default, 'getUser'] as const,
}
