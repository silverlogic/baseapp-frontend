import {
  type IntlFormatter,
  ZOD_MESSAGE,
  type ZodMessages,
  getZodMessages,
} from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { ForgotPasswordRequest } from '../../../types/auth'

const createValidationSchema = (messages: ZodMessages) =>
  z.object({
    email: z.string().min(1, messages.required).email(messages.email),
  })

export const DEFAULT_VALIDATION_SCHEMA = createValidationSchema(ZOD_MESSAGE)

export const getRecoverPasswordValidationSchema = (intl: IntlFormatter) =>
  createValidationSchema(getZodMessages(intl))

export const DEFAULT_INITIAL_VALUES: ForgotPasswordRequest = {
  email: '',
}
