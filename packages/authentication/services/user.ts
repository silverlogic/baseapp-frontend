import { axios, axiosForFiles } from '@baseapp-frontend/utils'

import { IUser, UserUpdateParams } from '../types/user'

export default class UserApi {
  static getUser<TUser extends Partial<IUser>>(): Promise<TUser> {
    return axios.get(`/users/me`)
  }

  static updateUser<TUser extends Partial<IUser>>({
    userId,
    data,
  }: UserUpdateParams<TUser>): Promise<TUser> {
    return axiosForFiles.patch(`/users/${userId}`, data)
  }
}

export const USER_API_KEY = {
  default: ['user'],
  getUser: () => [...USER_API_KEY.default, 'getUser'] as const,
}
