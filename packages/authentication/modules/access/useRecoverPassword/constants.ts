import { ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { ForgotPasswordRequest } from '../../../types/auth'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  email: z.string().min(1, ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
})

export const DEFAULT_INITIAL_VALUES: ForgotPasswordRequest = {
  email: '',
}
