import type { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

export type ChangePasswordForm = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export interface UseChangePassword {
  token?: string
  validationSchema?: z.ZodType<ChangePasswordForm>
  defaultValues?: ChangePasswordForm
  options?: UseMutationOptions<void, unknown, ChangePasswordForm, any>
  enableFormApiErrors?: boolean
}
