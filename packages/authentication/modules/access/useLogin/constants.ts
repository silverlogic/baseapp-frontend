import {
  type IntlFormatter,
  ZOD_MESSAGE,
  type ZodMessages,
  getZodMessages,
} from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { LoginRequest } from '../../../types/auth'

const createValidationSchema = (messages: ZodMessages) =>
  z.object({
    email: z.string().min(1, messages.required).email(messages.email),
    password: z.string().min(1, messages.required),
  })

export const DEFAULT_VALIDATION_SCHEMA = createValidationSchema(ZOD_MESSAGE)

export const getLoginValidationSchema = (intl: IntlFormatter) =>
  createValidationSchema(getZodMessages(intl))

export const DEFAULT_INITIAL_VALUES: LoginRequest = {
  email: '',
  password: '',
}
