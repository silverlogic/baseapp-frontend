import { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import AuthApi from '../../../services/auth'

type ApiClass = Pick<typeof AuthApi, 'changeExpiredPassword'>

export type ChangeExpiredPasswordForm = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export interface UseChangeExpiredPassword {
  token: string
  validationSchema?: z.ZodObject<z.ZodRawShape> | z.ZodEffects<z.ZodObject<z.ZodRawShape>>
  defaultValues?: ChangeExpiredPasswordForm
  options?: UseMutationOptions<void, unknown, ChangeExpiredPasswordForm, any>
  ApiClass?: ApiClass
  enableFormApiErrors?: boolean
}
