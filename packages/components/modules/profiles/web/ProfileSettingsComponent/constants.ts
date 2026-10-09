import { IntlShape, defineMessages } from 'react-intl'
import { z } from 'zod'

import { DEFAULT_PROFILE_FORM_VALIDATION } from '../../common'

export const PROFILE_SETTINGS_MESSAGES = defineMessages({
  nameEmpty: {
    id: 'profiles.settings.validation.nameEmpty',
    defaultMessage: 'Please enter a name.',
  },
  urlPathEmpty: {
    id: 'profiles.settings.validation.urlPathEmpty',
    defaultMessage: 'Username must be at least 8 characters long.',
  },
  urlPathInvalid: {
    id: 'profiles.settings.validation.urlPathInvalid',
    defaultMessage: 'Username can only contain letters and numbers',
  },
  remove: {
    id: 'profiles.settings.remove',
    defaultMessage: 'Remove',
  },
})

export const getProfileFormValidationSchema = (intl: IntlShape) =>
  DEFAULT_PROFILE_FORM_VALIDATION.extend({
    name: z.string().min(1, { message: intl.formatMessage(PROFILE_SETTINGS_MESSAGES.nameEmpty) }),
    urlPath: z
      .string()
      .min(8, { message: intl.formatMessage(PROFILE_SETTINGS_MESSAGES.urlPathEmpty) })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: intl.formatMessage(PROFILE_SETTINGS_MESSAGES.urlPathInvalid),
      }),
  })
