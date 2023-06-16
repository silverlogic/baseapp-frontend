import { YUP_REQUIRED_FIELD } from '@baseapp-frontend/utils'

import * as Yup from 'yup'

export const DEFAULT_VALIDATION_SCHEMA = Yup.object().shape({
  newPassword: Yup.string().required(YUP_REQUIRED_FIELD),
  token: Yup.string().required(YUP_REQUIRED_FIELD),
})

export const DEFAULT_INITIAL_VALUES = {
  newPassword: '',
  token: '',
}
