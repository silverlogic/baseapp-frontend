import {
  type IntlFormatter,
  PASSWORD_REGEX,
  ZOD_MESSAGE,
  type ZodMessages,
  getZodMessages,
} from '@baseapp-frontend/utils'

import { z } from 'zod'

import type { RegisterRequest } from '../../../types/auth'

const createPasswordSchema = (messages: ZodMessages) =>
  z.string().min(1, messages.required).regex(PASSWORD_REGEX, {
    message: messages.password,
  })

const createEmailSchema = (messages: ZodMessages) =>
  z.string().min(1, messages.required).email(messages.email)

const createValidationSchemaWithName = (messages: ZodMessages) =>
  z.object({
    name: z.string().min(1, messages.required),
    password: createPasswordSchema(messages),
    email: createEmailSchema(messages),
  })

const createValidationSchema = (messages: ZodMessages) =>
  z.object({
    firstName: z.string().min(1, messages.required),
    lastName: z.string().min(1, messages.required),
    password: createPasswordSchema(messages),
    email: createEmailSchema(messages),
  })

export const DEFAULT_VALIDATION_SCHEMA_WITH_NAME = createValidationSchemaWithName(ZOD_MESSAGE)

export const DEFAULT_VALIDATION_SCHEMA = createValidationSchema(ZOD_MESSAGE)

export const getSignUpValidationSchemaWithName = (intl: IntlFormatter) =>
  createValidationSchemaWithName(getZodMessages(intl))

export const getSignUpValidationSchema = (intl: IntlFormatter) =>
  createValidationSchema(getZodMessages(intl))

export const DEFAULT_INITIAL_VALUES: RegisterRequest = {
  name: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}
