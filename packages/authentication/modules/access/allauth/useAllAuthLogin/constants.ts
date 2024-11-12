import { ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import type * as AllAuthTypes from '../../../../types/allAuth'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  email: z.string().min(1, ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
  password: z.string().min(1, ZOD_MESSAGE.required),
})

export const DEFAULT_INITIAL_VALUES: AllAuthTypes.LoginRequest = {
  email: '',
  password: '',
}
