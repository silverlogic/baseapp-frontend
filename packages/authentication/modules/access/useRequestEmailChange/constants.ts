import {
  type IntlFormatter,
  ZOD_MESSAGE,
  type ZodMessages,
  getZodMessages,
} from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { RequestEmailChangeRequest } from './types'

const createValidationSchema = (messages: ZodMessages) =>
  z.object({
    newEmail: z.string().email(messages.email).min(1, messages.required),
  })

export const DEFAULT_VALIDATION_SCHEMA = createValidationSchema(ZOD_MESSAGE)

export const getRequestEmailChangeValidationSchema = (intl: IntlFormatter) =>
  createValidationSchema(getZodMessages(intl))

export const DEFAULT_INITIAL_VALUES: RequestEmailChangeRequest = {
  newEmail: '',
}
