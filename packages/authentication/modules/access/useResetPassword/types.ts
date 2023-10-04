import { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import AuthApi from '../../../services/auth'

type ApiClass = Pick<typeof AuthApi, 'resetPassword'>

export type ResetPasswordForm = {
  newPassword: string
  confirmNewPassword: string
}

export interface IUseResetPassword {
  token: string
  validationSchema?: z.ZodObject<z.ZodRawShape> | z.ZodEffects<z.ZodObject<z.ZodRawShape>>
  defaultValues?: ResetPasswordForm
  options?: UseMutationOptions<void, unknown, ResetPasswordForm, any>
  ApiClass?: ApiClass
}
