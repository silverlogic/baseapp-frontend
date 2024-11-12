import { ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import type * as AllAuthTypes from '../../../../types/allAuth'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  code: z.string().regex(/^\d{10}$/, ZOD_MESSAGE.recoveryCodeLength),
})

export const DEFAULT_INITIAL_VALUES: AllAuthTypes.RecoveryCodeAuthenticateRequest = {
  code: '',
}
