import { YUP_REQUIRED_FIELD } from '@baseapp-frontend/utils'

import * as Yup from 'yup'

export const CODE_VALIDATION_SCHEMA = Yup.object().shape({
  code: Yup.string().required(YUP_REQUIRED_FIELD),
})

export const CODE_VALIDATION_INITIAL_VALUES = {
  code: '',
}

export const MFA_METHOD = {
  email: 'email',
  app: 'app',
  smsTwilio: 'sms_twilio',
} as const
