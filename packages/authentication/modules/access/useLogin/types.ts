import { TokenTypes } from '@baseapp-frontend/utils'

import { UseMutationOptions } from '@tanstack/react-query'
import { UseFormProps } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import {
  CustomCookieNames,
  LoginMfaRequest,
  LoginRequest,
  LoginResponse,
} from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'login'>

export interface UseLoginOptions extends CustomCookieNames {
  loginFormOptions?: UseFormProps<Partial<LoginRequest>>
  loginOptions?: UseMutationOptions<LoginResponse, unknown, LoginRequest, any>
  mfaOptions?: UseMutationOptions<LoginResponse, unknown, LoginMfaRequest, any>
  tokenType?: TokenTypes
  ApiClass?: ApiClass
  enableFormApiErrors?: boolean
}
