import { ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import * as AllAuthTypes from '../../../types/allAuth'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  code: z.string().regex(/^\d{6}$/, ZOD_MESSAGE.totpCodeLength),
})

export const DEFAULT_INITIAL_VALUES: AllAuthTypes.ActivateTOTPAuthenticatorRequest = {
  code: '',
}
