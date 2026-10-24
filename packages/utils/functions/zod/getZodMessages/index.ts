import { ZOD_MESSAGE_DESCRIPTORS } from '../../../constants/zod'
import type { IntlFormatter } from '../../../types/intl'
import type { ZodMessages } from '../../../types/zod'

export const getZodMessages = (intl: IntlFormatter): ZodMessages => ({
  required: intl.formatMessage(ZOD_MESSAGE_DESCRIPTORS.required),
  email: intl.formatMessage(ZOD_MESSAGE_DESCRIPTORS.email),
  passwordDoNotMatch: intl.formatMessage(ZOD_MESSAGE_DESCRIPTORS.passwordDoNotMatch),
  password: intl.formatMessage(ZOD_MESSAGE_DESCRIPTORS.password),
})
