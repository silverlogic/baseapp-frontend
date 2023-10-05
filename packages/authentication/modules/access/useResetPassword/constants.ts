import { ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import { ResetPasswordForm } from './types'

export const DEFAULT_VALIDATION_SCHEMA = z
  .object({
    newPassword: z.string().nonempty(ZOD_MESSAGE.required),
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
