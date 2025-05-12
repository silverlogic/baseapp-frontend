import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import type { CustomJWTKeyNames, LoginMfaRequest, LoginResponse } from '../../../types/auth'

export type ApiClass = {
  login: (...args: any[]) => Promise<any>
}

export type LoginParams<T extends ApiClass> = Parameters<T['login']>[0]
export type LoginReturn<T extends ApiClass> = Awaited<ReturnType<T['login']>>

export interface UseLoginOptions<TApiClass extends ApiClass = typeof AuthApi>
  extends CustomJWTKeyNames {
  loginFormOptions?: UseFormProps<Partial<LoginParams<TApiClass>>>
  loginOptions?: UseMutationOptions<LoginReturn<TApiClass>, unknown, LoginParams<TApiClass>, any>
  mfaOptions?: UseMutationOptions<LoginResponse, unknown, LoginMfaRequest, any>
  ApiClass?: TApiClass
  enableFormApiErrors?: boolean
}
