import isArray from 'lodash/isArray'

export const getApiErrorMessage = (
  error: any,
  { defaultMessage = 'Something went wrong.' } = {},
) => {
  let message = defaultMessage

  if (error?.message) {
    message = error.message
  }
  if (error?.response?.data) {
    const dataKey = Object.keys(error.response.data)[0]
    const potentialMessage = error.response.data[dataKey] ?? message

    message = isArray(potentialMessage) ? potentialMessage.join(' ') : potentialMessage
  }

  return message
}
