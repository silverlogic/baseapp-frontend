import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import type {
  CustomJWTKeyNames,
  LoginMfaRequest,
  LoginRequest,
  LoginResponse,
} from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'login'>

export interface UseLoginOptions extends CustomJWTKeyNames {
  loginFormOptions?: UseFormProps<Partial<LoginRequest>>
  loginOptions?: UseMutationOptions<LoginResponse, unknown, LoginRequest, any>
  mfaOptions?: UseMutationOptions<LoginResponse, unknown, LoginMfaRequest, any>
  ApiClass?: ApiClass
  enableFormApiErrors?: boolean
}
