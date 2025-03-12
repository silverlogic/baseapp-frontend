import type { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import AuthApi from '../../../services/auth'

type ApiClass = Pick<typeof AuthApi, 'changePassword' | 'changeExpiredPassword'>

export type ChangePasswordForm = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export interface UseChangePassword {
  token?: string
  validationSchema?: z.ZodObject<z.ZodRawShape> | z.ZodEffects<z.ZodObject<z.ZodRawShape>>
  defaultValues?: ChangePasswordForm
  options?: UseMutationOptions<void, unknown, ChangePasswordForm, any>
  ApiClass?: ApiClass
  enableFormApiErrors?: boolean
}
