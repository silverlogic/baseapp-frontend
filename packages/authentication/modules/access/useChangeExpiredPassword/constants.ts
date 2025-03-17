import { PASSWORD_REGEX, ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { ChangeExpiredPasswordForm } from './types'

export const DEFAULT_VALIDATION_SCHEMA = z
  .object({
    currentPassword: z.string().nonempty(ZOD_MESSAGE.required),
    newPassword: z.string().min(1, ZOD_MESSAGE.required).regex(PASSWORD_REGEX, {
      message: ZOD_MESSAGE.password,
    }),
    confirmNewPassword: z.string().nonempty(ZOD_MESSAGE.required),
  })
  .refine(({ confirmNewPassword, newPassword }) => newPassword === confirmNewPassword, {
    message: ZOD_MESSAGE.passwordDoNotMatch,
    path: ['confirmNewPassword'],
  })

export const DEFAULT_INITIAL_VALUES: ChangeExpiredPasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
}
