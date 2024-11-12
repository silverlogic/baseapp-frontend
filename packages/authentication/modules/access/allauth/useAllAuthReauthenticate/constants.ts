import { PASSWORD_REGEX, ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import type * as AllAuthTypes from '../../../../types/allAuth'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  password: z.string().regex(PASSWORD_REGEX, {
    message: ZOD_MESSAGE.password,
  }),
})

export const DEFAULT_INITIAL_VALUES: AllAuthTypes.ReauthenticateRequest = {
  password: '',
}
