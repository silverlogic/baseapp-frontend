import type { ServerSideRenderingOption } from '@baseapp-frontend/utils'

import UserApi from '../../../services/user'
import type { CustomJWTKeyNames } from '../../../types/auth'
import type { CustomUseQueryOptions } from '../../../types/react-query'

type ApiClass = Pick<typeof UserApi, 'getUser'>

export interface UseJWTUserOptions<TUser>
  extends CustomJWTKeyNames,
    ServerSideRenderingOption,
    CustomUseQueryOptions<TUser, unknown, TUser> {
  ApiClass?: ApiClass
}
