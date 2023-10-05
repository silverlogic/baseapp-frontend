import { ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import { ILoginRequest } from '../../../types/auth'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  email: z.string().nonempty(ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
  password: z.string().nonempty(ZOD_MESSAGE.required),
})

export const DEFAULT_INITIAL_VALUES: ILoginRequest = {
  email: '',
  password: '',
}
