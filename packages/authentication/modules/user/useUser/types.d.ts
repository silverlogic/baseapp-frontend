import { UseQueryOptions } from '@tanstack/react-query'

import { ICookieName } from '../../../types/auth'

export interface IUseUser<IUser> extends ICookieName {
  options?: UseQueryOptions<IUser, unknown, IUser, any>
}
