import { TokenTypes } from '@baseapp-frontend/utils'

import { UseMutationOptions } from '@tanstack/react-query'

import AuthApi from '../../../services/auth'
import { ICookieName, ILoginMfaRequest, ILoginRequest, LoginResponse } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'login'>

export interface IUseLogin extends ICookieName {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: ILoginRequest
  loginOptions?: UseMutationOptions<LoginResponse, unknown, ILoginRequest, any>
  mfaOptions?: UseMutationOptions<LoginResponse, unknown, ILoginMfaRequest, any>
  tokenType?: TokenTypes
  ApiClass?: ApiClass
}
