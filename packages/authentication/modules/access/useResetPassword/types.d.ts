import { UseMutationOptions } from '@tanstack/react-query'

import { IResetPasswordRequest } from '../../../types/auth'

export interface IUseResetPassword {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: IResetPasswordRequest
  options?: UseMutationOptions<void, unknown, IResetPasswordRequest, any>
}
