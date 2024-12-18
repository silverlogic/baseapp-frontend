import { PASSWORD_REGEX, ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import * as AllAuthTypes from '../../../types/allAuth'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  password: z.string().min(1, ZOD_MESSAGE.required).regex(PASSWORD_REGEX, {
    message: ZOD_MESSAGE.password,
  }),
  email: z.string().min(1, ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
})

export const DEFAULT_INITIAL_VALUES: AllAuthTypes.SignUpRequest = {
  email: '',
  password: '',
}