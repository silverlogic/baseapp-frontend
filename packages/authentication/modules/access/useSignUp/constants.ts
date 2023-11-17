import { PASSWORD_REGEX, ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import { IRegisterRequest } from '../../../types/auth'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  firstName: z.string().nonempty(ZOD_MESSAGE.required),
  lastName: z.string().nonempty(ZOD_MESSAGE.required),
  password: z.string().nonempty(ZOD_MESSAGE.required).regex(PASSWORD_REGEX, {
    message: ZOD_MESSAGE.password,
  }),
  email: z.string().nonempty(ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
})

export const DEFAULT_INITIAL_VALUES: IRegisterRequest = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}
