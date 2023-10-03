import { UseMutationOptions } from '@tanstack/react-query'

import AuthApi from '../../../services/auth'

type ApiClass = Pick<typeof AuthApi, 'resetPassword'>

export type ResetPasswordForm = {
  newPassword: string
  confirmNewPassword: string
}

export interface IUseResetPassword {
  token: string
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: ResetPasswordForm
  options?: UseMutationOptions<void, unknown, ResetPasswordForm, any>
  ApiClass?: ApiClass
}
