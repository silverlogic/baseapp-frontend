import { UseMutationOptions } from '@tanstack/react-query'

import AuthApi from '../../../services/auth'
import { IForgotPasswordRequest } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'recoverPassword'>

export interface IUseRecoverPassword {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: IForgotPasswordRequest
  options?: UseMutationOptions<void, unknown, IForgotPasswordRequest, any>
  ApiClass?: ApiClass
}
