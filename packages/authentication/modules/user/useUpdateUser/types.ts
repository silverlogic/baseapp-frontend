import type { UseMutationOptions } from '@tanstack/react-query'

import UserApi from '../../../services/user'
import type { CustomJWTKeyNames } from '../../../types/auth'
import type { User, UserUpdateParams } from '../../../types/user'

type ApiClass = Pick<typeof UserApi, 'updateUser'>

export interface UseUpdateUserOptions<TUser extends Partial<User>> extends CustomJWTKeyNames {
  options?: UseMutationOptions<TUser, any, UserUpdateParams<TUser>, { previousUser?: TUser }>
  ApiClass?: ApiClass
}
