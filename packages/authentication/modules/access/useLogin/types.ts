import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import type { CustomJWTKeyNames, LoginMfaRequest, LoginResponse } from '../../../types/auth'
import type { AuthError, AuthResult } from '../../auth-strategy/types'

export type ApiClass = {
  login: (...args: any[]) => Promise<any>
}

export type LoginParams<T extends ApiClass> = Parameters<T['login']>[0]

export interface UseLoginOptions<
  TApiClass extends ApiClass = typeof AuthApi,
> extends CustomJWTKeyNames {
  loginFormOptions?: UseFormProps<LoginParams<TApiClass>>
  loginOptions?: UseMutationOptions<AuthResult, AuthError | Error, LoginParams<TApiClass>, unknown>
  mfaOptions?: UseMutationOptions<LoginResponse, AuthError | Error, LoginMfaRequest, unknown>
  ApiClass?: TApiClass
  enableFormApiErrors?: boolean
}
