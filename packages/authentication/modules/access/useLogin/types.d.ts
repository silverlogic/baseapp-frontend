import { UseMutationOptions } from '@tanstack/react-query'

import { ILoginMfaRequest, ILoginRequest, LoginResponse } from '../../../types/auth'

export interface IUseLogin {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: ILoginRequest
  loginOptions?: UseMutationOptions<LoginResponse, unknown, ILoginRequest, any>
  mfaOptions?: UseMutationOptions<LoginResponse, unknown, ILoginMfaRequest, any>
}
