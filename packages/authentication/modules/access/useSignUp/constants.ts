import { PASSWORD_REGEX, ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { RegisterRequest } from '../../../types/auth'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  name: z.string().min(1, ZOD_MESSAGE.required),
  password: z.string().min(1, ZOD_MESSAGE.required).regex(PASSWORD_REGEX, {
    message: ZOD_MESSAGE.password,
  }),
  email: z.string().min(1, ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
})

export const DEFAULT_INITIAL_VALUES: RegisterRequest = {
  name: '',
  email: '',
  password: '',
}
