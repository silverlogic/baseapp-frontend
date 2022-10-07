export const getErrorTextMessage = (err: any): string => {
  let message = 'Opss... something went wrong :/'
  if (err.message) {
    message = err.message
  }
  if (err.response?.data) {
    message = err.response.data[Object.keys(err.response.data)[0]] ?? message
  }

  return message
}
