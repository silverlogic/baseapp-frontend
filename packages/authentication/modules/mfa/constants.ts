import { ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

export const CODE_VALIDATION_SCHEMA = z.object({
  code: z.string().nonempty(ZOD_MESSAGE.required),
})

export const CODE_VALIDATION_INITIAL_VALUES = {
  code: '',
}

export const MFA_METHOD = {
  email: 'email',
  app: 'app',
  smsTwilio: 'sms_twilio',
} as const
