import { UseMutationOptions } from '@tanstack/react-query'

import AuthApi from '../../../services/auth'
import { IResetPasswordRequest } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'resetPassword'>

export interface IUseResetPassword {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: IResetPasswordRequest
  options?: UseMutationOptions<void, unknown, IResetPasswordRequest, any>
  ApiClass?: ApiClass
}
