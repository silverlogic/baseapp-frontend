import { ServerSideRenderingOption } from '@baseapp-frontend/utils'

import { type CustomJWTKeyNames } from '../../../types/auth'

export interface GetUserOptions extends CustomJWTKeyNames, ServerSideRenderingOption {}
