import { UseMutationOptions } from '@tanstack/react-query'

import { ICookieName, ILoginMfaRequest, ILoginRequest, LoginResponse } from '../../../types/auth'

export interface IUseLogin extends ICookieName {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: ILoginRequest
  loginOptions?: UseMutationOptions<LoginResponse, unknown, ILoginRequest, any>
  mfaOptions?: UseMutationOptions<LoginResponse, unknown, ILoginMfaRequest, any>
  tokenType?: TokenTypes
}
