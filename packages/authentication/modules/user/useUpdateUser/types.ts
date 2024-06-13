import { UseMutationOptions } from '@tanstack/react-query'

import UserApi from '../../../services/user'
import { CustomCookieNames } from '../../../types/auth'
import { User, UserUpdateParams } from '../../../types/user'

type ApiClass = Pick<typeof UserApi, 'updateUser'>

export interface UseUpdateUserOptions<TUser extends Partial<User>> extends CustomCookieNames {
  options?: UseMutationOptions<TUser, any, UserUpdateParams<TUser>, { previousUser?: TUser }>
  ApiClass?: ApiClass
}
