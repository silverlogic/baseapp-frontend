import { PHONE_REGEX, YUP_REQUIRED_FIELD } from '@baseapp-frontend/utils'

import * as Yup from 'yup'

import { IRegisterRequest } from '../../../types/auth'

export const DEFAULT_VALIDATION_SCHEMA = Yup.object().shape({
  firstName: Yup.string().required(YUP_REQUIRED_FIELD),
  lastName: Yup.string().required(YUP_REQUIRED_FIELD),
  password: Yup.string().required(YUP_REQUIRED_FIELD),
  phoneNumber: Yup.string().matches(
    PHONE_REGEX,
    'Please provide a properly formatted phone number',
  ),
  email: Yup.string()
    .email('Please provide a properly formatted email address')
    .required(YUP_REQUIRED_FIELD),
  acceptConsent: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
})

export const DEFAULT_INITIAL_VALUES: IRegisterRequest = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  acceptConsent: false,
}
