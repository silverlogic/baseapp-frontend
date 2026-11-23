import {
  type IntlFormatter,
  ZOD_MESSAGE,
  type ZodMessages,
  getZodMessages,
} from '@baseapp-frontend/utils'

import { z } from 'zod'

const createCodeValidationSchema = (messages: ZodMessages) =>
  z.object({
    code: z.string().min(1, messages.required),
  })

export const CODE_VALIDATION_SCHEMA = createCodeValidationSchema(ZOD_MESSAGE)

export const getCodeValidationSchema = (intl: IntlFormatter) =>
  createCodeValidationSchema(getZodMessages(intl))

export const CODE_VALIDATION_INITIAL_VALUES = {
  code: '',
}

export const MFA_METHOD = {
  email: 'email',
  app: 'app',
  smsTwilio: 'sms_twilio',
} as const
