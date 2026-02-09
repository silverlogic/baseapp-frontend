import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'
import { z } from 'zod'

import AllAuthApi from '../../../services/allauth'
import type { ForgotPasswordRequest, LoginRequest, RegisterRequest } from '../../../types/auth'

export type LoginParams = LoginRequest

export type LoginReturn = Awaited<ReturnType<typeof AllAuthApi.login>>

export interface UseAllAuthLoginOptions {
  loginFormOptions?: UseFormProps<LoginParams>
  mutationOptions?: UseMutationOptions<LoginReturn, unknown, LoginParams, any>
  enableFormApiErrors?: boolean
}

export interface UseAllAuthSignUpOptions<
  TRegisterRequest = RegisterRequest,
  TRegisterResponse = void,
> {
  formOptions?: UseFormProps<Partial<TRegisterRequest>>
  defaultValues?: TRegisterRequest
  mutationOptions?: UseMutationOptions<TRegisterResponse, unknown, TRegisterRequest, any>
  enableFormApiErrors?: boolean
  useNameField?: boolean
}

export interface UseAllAuthRecoverPasswordOptions {
  validationSchema?: z.ZodType<ForgotPasswordRequest>
  defaultValues?: ForgotPasswordRequest
  mutationOptions?: UseMutationOptions<void, unknown, ForgotPasswordRequest, any>
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
  mutationOptions?: UseMutationOptions<void, unknown, ResetPasswordForm, any>
  enableFormApiErrors?: boolean
}
