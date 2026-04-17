import type { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

export type ResetPasswordForm = {
  newPassword: string
  confirmNewPassword: string
}

export interface UseResetPasswordOptions {
  token: string
  validationSchema?: z.ZodType<ResetPasswordForm>
  defaultValues?: ResetPasswordForm
  options?: UseMutationOptions<void, unknown, ResetPasswordForm, any>
  enableFormApiErrors?: boolean
}
