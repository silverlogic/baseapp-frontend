import { defineMessages } from '@formatjs/intl'

export const ZOD_MESSAGE = {
  required: 'This field is required.',
  email: 'Please provide a properly formatted email address.',
  passwordDoNotMatch: 'Passwords do not match.',
  password:
    'Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
}

export const ZOD_MESSAGE_DESCRIPTORS = defineMessages({
  required: {
    id: 'utils.validation.fieldRequired',
    defaultMessage: 'This field is required.',
  },
  email: {
    id: 'utils.validation.emailFormat',
    defaultMessage: 'Please provide a properly formatted email address.',
  },
  passwordDoNotMatch: {
    id: 'utils.validation.passwordsDoNotMatch',
    defaultMessage: 'Passwords do not match.',
  },
  password: {
    id: 'utils.validation.passwordRequirements',
    defaultMessage:
      'Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  },
})
