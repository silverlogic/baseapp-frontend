import { IntlShape, defineMessages } from 'react-intl'
import z from 'zod'

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const schema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Must have at least three character' })
    .max(255, { message: 'Must have at most 255 characters' }),
  urlPath: z
    .string()
    .regex(slugRegex, 'Must contain only lowercase letters, numbers, and hyphens')
    .max(500, { message: 'Must have at most 500 characters' }),
})

export const CREATE_PROFILE_MESSAGES = defineMessages({
  title: {
    id: 'profiles.createProfile.title',
    defaultMessage: 'New organization',
  },
  description: {
    id: 'profiles.createProfile.description',
    defaultMessage: 'Create an organization and invite multiple members to manage and collaborate.',
  },
  submit: {
    id: 'profiles.createProfile.submit',
    defaultMessage: 'Create Organization',
  },
  nameMin: {
    id: 'profiles.createProfile.validation.nameMin',
    defaultMessage: 'Must have at least three character',
  },
  nameMax: {
    id: 'profiles.createProfile.validation.nameMax',
    defaultMessage: 'Must have at most 255 characters',
  },
  urlPathFormat: {
    id: 'profiles.createProfile.validation.urlPathFormat',
    defaultMessage: 'Must contain only lowercase letters, numbers, and hyphens',
  },
  urlPathMax: {
    id: 'profiles.createProfile.validation.urlPathMax',
    defaultMessage: 'Must have at most 500 characters',
  },
  urlPathTaken: {
    id: 'profiles.createProfile.errors.urlPathTaken',
    defaultMessage: 'This URL path is already taken. Please choose a different one.',
  },
  nameTaken: {
    id: 'profiles.createProfile.errors.nameTaken',
    defaultMessage:
      'An organization with this name already exists. Please choose a different name.',
  },
  urlPathInvalid: {
    id: 'profiles.createProfile.errors.urlPathInvalid',
    defaultMessage:
      'Invalid URL path format. Please use only lowercase letters, numbers, and hyphens.',
  },
  createFailed: {
    id: 'profiles.createProfile.errors.createFailed',
    defaultMessage:
      'Unable to create organization. Please try again or contact support if the problem persists.',
  },
})

export const getCreateProfileSchema = (intl: IntlShape) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(3, { message: intl.formatMessage(CREATE_PROFILE_MESSAGES.nameMin) })
      .max(255, { message: intl.formatMessage(CREATE_PROFILE_MESSAGES.nameMax) }),
    urlPath: z
      .string()
      .regex(slugRegex, intl.formatMessage(CREATE_PROFILE_MESSAGES.urlPathFormat))
      .max(500, { message: intl.formatMessage(CREATE_PROFILE_MESSAGES.urlPathMax) }),
  })
