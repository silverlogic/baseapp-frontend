import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'
import { z } from 'zod'

import AllAuthApi from '../../../../services/allauth'
import type {
  CustomJWTKeyNames,
  ForgotPasswordRequest,
  LoginMfaRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '../../../../types/auth'

export type LoginParams = LoginRequest

export type LoginReturn = Awaited<ReturnType<typeof AllAuthApi.login>>

export interface UseAllAuthLoginOptions {
  loginFormOptions?: UseFormProps<LoginParams>
  loginOptions?: UseMutationOptions<LoginReturn, unknown, LoginParams, any>
  mfaOptions?: UseMutationOptions<LoginResponse, unknown, LoginMfaRequest, any>
  accessKeyName?: string
  refreshKeyName?: string
  enableFormApiErrors?: boolean
}

type SignUpApiClass = Pick<typeof AllAuthApi, 'register'>

export interface UseAllAuthSignUpOptions<TRegisterRequest = RegisterRequest, TRegisterResponse = void> {
  formOptions?: UseFormProps<Partial<TRegisterRequest>>
  defaultValues?: TRegisterRequest
  options?: UseMutationOptions<TRegisterResponse, unknown, TRegisterRequest, any>
  enableFormApiErrors?: boolean
  useNameField?: boolean
}

export interface UseAllAuthRecoverPasswordOptions {
  validationSchema?: z.ZodType<ForgotPasswordRequest>
  defaultValues?: ForgotPasswordRequest
  options?: UseMutationOptions<void, unknown, ForgotPasswordRequest, any>
  enableFormApiErrors?: boolean
}

export type ResetPasswordForm = {
  newPassword: string
  confirmNewPassword: string
}

export interface UseAllAuthResetPasswordOptions {
  token: string
  validationSchema?: z.ZodType<ResetPasswordForm>
  defaultValues?: ResetPasswordForm
  options?: UseMutationOptions<void, unknown, ResetPasswordForm, any>
  enableFormApiErrors?: boolean
}

