import { UseMutationOptions } from '@tanstack/react-query'

import { IForgotPasswordRequest } from '../../../types/auth'

export interface IUseRecoverPassword {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: IForgotPasswordRequest
  options?: UseMutationOptions<void, unknown, IForgotPasswordRequest, any>
}
