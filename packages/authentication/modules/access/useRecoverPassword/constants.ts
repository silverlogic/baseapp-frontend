import { YUP_REQUIRED_FIELD } from '@baseapp-frontend/utils'

import * as Yup from 'yup'

export const DEFAULT_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a properly formatted email address.')
    .required(YUP_REQUIRED_FIELD),
})

export const DEFAULT_INITIAL_VALUES = {
  email: '',
}
