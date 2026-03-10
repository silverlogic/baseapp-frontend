import isArray from 'lodash/isArray'

export const getApiErrorMessage = (
  error: any,
  { defaultMessage = 'Something went wrong.' } = {},
) => {
  let message = defaultMessage

  if (error?.message) {
    try {
      const parsedMessage = JSON.parse(error.message)
      if (parsedMessage && typeof parsedMessage === 'object') {
        if (parsedMessage.detail != null) {
          message = parsedMessage.detail
        } else {
          const firstKey = Object.keys(parsedMessage)[0]
          const potentialMessage = firstKey ? parsedMessage[firstKey] : undefined
          if (potentialMessage !== undefined) {
            message = isArray(potentialMessage)
              ? potentialMessage.join(' ')
              : String(potentialMessage)
          } else {
            message = error.message
          }
        }
      } else {
        message = error.message
      }
    } catch {
      message = error.message
    }
  }

  if (error?.response?.data) {
    const dataKey = Object.keys(error.response.data)[0]
    const potentialMessage = (dataKey && error.response.data?.[dataKey]) ?? message

    message = isArray(potentialMessage) ? potentialMessage.join(' ') : potentialMessage
  }

  return message
}
