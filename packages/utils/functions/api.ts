import { AxiosError } from 'axios'

export const getApiErrorMessage = (
  error: AxiosError,
  { defaultMessage = 'Something went wrong.' },
) => {
  let message = defaultMessage
  if (error.message) {
    message = error.message
  }
  if (error.response?.data) {
    message = error.response.data[Object.keys(error.response.data)[0]] ?? message
  }

  return message
}
