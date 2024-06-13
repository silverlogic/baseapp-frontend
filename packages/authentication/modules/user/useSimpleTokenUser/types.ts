import UserApi from '../../../services/user'
import { CustomCookieNames } from '../../../types/auth'
import { CustomUseQueryOptions } from '../../../types/react-query'

type ApiClass = Pick<typeof UserApi, 'getUser'>

export interface UseSimpleTokenUserOptions<TUser>
  extends CustomCookieNames,
    CustomUseQueryOptions<TUser, unknown, TUser> {
  ApiClass?: ApiClass
}
