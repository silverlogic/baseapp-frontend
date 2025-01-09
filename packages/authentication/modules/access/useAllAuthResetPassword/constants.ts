import { ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import * as AllAuthTypes from '../../../types/allAuth'

export const DEFAULT_VALIDATION_SCHEMA = z
  .object({
    key: z.string().min(1, ZOD_MESSAGE.required),
    password: z.string().min(1, ZOD_MESSAGE.required),
    passwordConfirmation: z.string().min(1, ZOD_MESSAGE.required),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  })

export const DEFAULT_INITIAL_VALUES: AllAuthTypes.ResetPasswordRequest = {
  key: '',
  password: '',
  passwordConfirmation: '',
}
