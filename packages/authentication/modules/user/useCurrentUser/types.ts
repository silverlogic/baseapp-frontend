import UserApi from '../../../services/user'
import type { CustomUseQueryOptions } from '../../../types/react-query'

type ApiClass = Pick<typeof UserApi, 'getUser'>

export interface UseCurrentUserOptions<TUser> extends CustomUseQueryOptions<TUser, unknown, TUser> {
  ApiClass?: ApiClass
}
