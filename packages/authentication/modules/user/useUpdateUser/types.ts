import { UseMutationOptions } from '@tanstack/react-query'

import UserApi from '../../../services/user'
import { ICookieName } from '../../../types/auth'
import { IUser, UserUpdateParams } from '../../../types/user'

type ApiClass = Pick<typeof UserApi, 'updateUser'>

export interface UseUpdateUserOptions<TUser extends Partial<IUser>> extends ICookieName {
  options?: UseMutationOptions<TUser, any, UserUpdateParams<TUser>, { previousUser?: TUser }>
  ApiClass?: ApiClass
}
