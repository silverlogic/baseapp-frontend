import { PASSWORD_REGEX, ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { ForgotPasswordRequest, LoginRequest, RegisterRequest } from '../../../types/auth'

export const LOGIN_VALIDATION_SCHEMA = z.object({
  email: z.string().min(1, ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
  password: z.string().min(1, ZOD_MESSAGE.required),
})

export const LOGIN_INITIAL_VALUES: LoginRequest = {
  email: '',
  password: '',
}

export const SIGNUP_VALIDATION_SCHEMA_WITH_NAME = z.object({
  name: z.string().min(1, ZOD_MESSAGE.required),
  password: z.string().min(1, ZOD_MESSAGE.required).regex(PASSWORD_REGEX, {
    message: ZOD_MESSAGE.password,
  }),
  email: z.string().min(1, ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
})

export const SIGNUP_VALIDATION_SCHEMA = z.object({
  firstName: z.string().min(1, ZOD_MESSAGE.required),
  lastName: z.string().min(1, ZOD_MESSAGE.required),
  password: z.string().min(1, ZOD_MESSAGE.required).regex(PASSWORD_REGEX, {
    message: ZOD_MESSAGE.password,
  }),
  email: z.string().min(1, ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
})

export const SIGNUP_INITIAL_VALUES: RegisterRequest = {
  name: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

export const RECOVER_PASSWORD_VALIDATION_SCHEMA = z.object({
  email: z.string().min(1, ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
})

export const RECOVER_PASSWORD_INITIAL_VALUES: ForgotPasswordRequest = {
  email: '',
}

export const RESET_PASSWORD_VALIDATION_SCHEMA = z
  .object({
    newPassword: z.string().min(1, ZOD_MESSAGE.required).regex(PASSWORD_REGEX, {
      message: ZOD_MESSAGE.password,
    }),
    confirmNewPassword: z.string().nonempty(ZOD_MESSAGE.required),
  })
  .refine(({ confirmNewPassword, newPassword }) => newPassword === confirmNewPassword, {
    message: ZOD_MESSAGE.passwordDoNotMatch,
    path: ['confirmNewPassword'],
  })

export const RESET_PASSWORD_INITIAL_VALUES = {
  newPassword: '',
  confirmNewPassword: '',
}
