import { TokenTypes } from '@baseapp-frontend/utils'

import { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import AuthApi from '../../../services/auth'
import {
  CustomCookieNames,
  LoginMfaRequest,
  LoginRequest,
  LoginResponse,
} from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'login'>

export interface UseLoginOptions extends CustomCookieNames {
  validationSchema?: z.ZodObject<z.ZodRawShape>
  defaultValues?: LoginRequest
  loginOptions?: UseMutationOptions<LoginResponse, unknown, LoginRequest, any>
  mfaOptions?: UseMutationOptions<LoginResponse, unknown, LoginMfaRequest, any>
  tokenType?: TokenTypes
  ApiClass?: ApiClass
  enableFormApiErrors?: boolean
}
