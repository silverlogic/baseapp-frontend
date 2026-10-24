import {
  type IntlFormatter,
  PASSWORD_REGEX,
  ZOD_MESSAGE,
  type ZodMessages,
  getZodMessages,
} from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { ResetPasswordForm } from './types'

const createValidationSchema = (messages: ZodMessages) =>
  z
    .object({
      newPassword: z.string().min(1, messages.required).regex(PASSWORD_REGEX, {
        message: messages.password,
      }),
      confirmNewPassword: z.string().nonempty(messages.required),
    })
    .refine(({ confirmNewPassword, newPassword }) => newPassword === confirmNewPassword, {
      message: messages.passwordDoNotMatch,
      path: ['confirmNewPassword'],
    })

export const DEFAULT_VALIDATION_SCHEMA = createValidationSchema(ZOD_MESSAGE)

export const getResetPasswordValidationSchema = (intl: IntlFormatter) =>
  createValidationSchema(getZodMessages(intl))

export const DEFAULT_INITIAL_VALUES: ResetPasswordForm = {
  newPassword: '',
  confirmNewPassword: '',
}
