import { UseQueryOptions } from '@tanstack/react-query'

import UserApi from '../../../services/user'
import { ICookieName } from '../../../types/auth'

type ApiClass = Pick<typeof UserApi, 'getUser'>

export interface IUseJWTUser<IUser> extends ICookieName {
  options?: UseQueryOptions<IUser, unknown, IUser, any>
  ApiClass?: ApiClass
}
