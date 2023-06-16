import { UseQueryOptions } from '@tanstack/react-query'

export interface IUseUser<IUser> {
  options?: UseQueryOptions<IUser, unknown, IUser, any>
}
