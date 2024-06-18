import { ServerSideRenderingOption } from '@baseapp-frontend/utils'

import { CustomCookieNames } from '../../../types/auth'

export interface GetUserOptions extends CustomCookieNames, ServerSideRenderingOption {}
