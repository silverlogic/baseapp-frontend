import { PHONE_REGEX, ZOD_MESSAGE } from '@baseapp-frontend/utils'

import { z } from 'zod'

import { IRegisterRequest } from '../../../types/auth'

export const DEFAULT_VALIDATION_SCHEMA = z.object({
  firstName: z.string().nonempty(ZOD_MESSAGE.required),
  lastName: z.string().nonempty(ZOD_MESSAGE.required),
  password: z.string().nonempty(ZOD_MESSAGE.required),
  phoneNumber: z.string().nonempty(ZOD_MESSAGE.required).regex(PHONE_REGEX, {
    message: ZOD_MESSAGE.phoneNumber,
  }),
  email: z.string().nonempty(ZOD_MESSAGE.required).email(ZOD_MESSAGE.email),
  acceptConsent: z.boolean().refine((value) => value === true, {
    message: ZOD_MESSAGE.mustAcceptTerms,
  }),
})

export const DEFAULT_INITIAL_VALUES: IRegisterRequest = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  acceptConsent: false,
}
