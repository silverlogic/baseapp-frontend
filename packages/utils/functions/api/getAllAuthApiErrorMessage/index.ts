import { get, isArray, isEmpty } from 'lodash'

export const getAllAuthApiErrorMessage = (
  error: any,
  { defaultMessage = 'Something went wrong.' } = {},
) => {
  let message = defaultMessage

  if (error.response && error.response?.data && typeof error.response?.data === 'object') {
    const errors = get(error.response.data, 'errors', [])
    if (isArray(errors) && !isEmpty(errors)) {
      message = errors.map((_error) => _error.message).join('\n')
    }
  }

  return message
}
