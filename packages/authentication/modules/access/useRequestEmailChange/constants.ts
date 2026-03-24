import { ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { RequestEmailChangeRequest } from './types'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  newEmail: z.string().email(ZOD_MESSAGE.email).min(1, ZOD_MESSAGE.required),
})

export const DEFAULT_INITIAL_VALUES: RequestEmailChangeRequest = {
  newEmail: '',
}
