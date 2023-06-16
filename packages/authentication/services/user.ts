import { axios } from '@baseapp-frontend/utils'

import { IUser } from '../types/user'

export default class UserApi {
  static getUser<TUser extends Partial<IUser>>(): Promise<TUser> {
    return axios.get(`/users/me`)
  }
}

export const USER_API_KEY = {
  default: ['user'],
  getUser: () => [...USER_API_KEY.default, 'getUser'] as const,
}
