import { ServerSideRenderingOption } from '@baseapp-frontend/utils'

import { ICookieName } from '../../../types/auth'

export interface GetUserOptions extends ICookieName, ServerSideRenderingOption {}
