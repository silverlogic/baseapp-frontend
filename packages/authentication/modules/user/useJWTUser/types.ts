import { ServerSideRenderingOption } from '@baseapp-frontend/utils'

import UserApi from '../../../services/user'
import { CustomCookieNames } from '../../../types/auth'
import { CustomUseQueryOptions } from '../../../types/react-query'

type ApiClass = Pick<typeof UserApi, 'getUser'>

export interface UseJWTUserOptions<TUser>
  extends CustomCookieNames,
    ServerSideRenderingOption,
    CustomUseQueryOptions<TUser, unknown, TUser> {
  ApiClass?: ApiClass
}
