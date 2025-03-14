import { PASSWORD_REGEX, ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { ResetPasswordForm } from './types'

export const DEFAULT_VALIDATION_SCHEMA = z
  .object({
    newPassword: z.string().min(1, ZOD_MESSAGE.required).regex(PASSWORD_REGEX, {
      message: ZOD_MESSAGE.password,
    }),
    confirmNewPassword: z.string().nonempty(ZOD_MESSAGE.required),
  })
  .refine(({ confirmNewPassword, newPassword }) => newPassword === confirmNewPassword, {
    message: ZOD_MESSAGE.passwordDoNotMatch,
    path: ['confirmNewPassword'],
  })

export const DEFAULT_INITIAL_VALUES: ResetPasswordForm = {
  newPassword: '',
  confirmNewPassword: '',
}
