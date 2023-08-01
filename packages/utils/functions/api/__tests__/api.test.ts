import { getApiErrorMessage } from '../index'

describe('getApiErrorMessage function', () => {
  it('should return default message when error is undefined', () => {
    const defaultMessage = 'Something went wrong.'
    const result = getApiErrorMessage(undefined, { defaultMessage })
    expect(result).toBe(defaultMessage)
  })

  it('should return error message when error.message is defined', () => {
    const errorMessage = 'Error occurred.'
    const result = getApiErrorMessage({ message: errorMessage })
    expect(result).toBe(errorMessage)
  })

  it('should return first property of error.response.data when it is a string', () => {
    const errorDataMessage = 'Error in response data.'
    const error = { response: { data: { error: errorDataMessage } } }
    const result = getApiErrorMessage(error)
    expect(result).toBe(errorDataMessage)
  })

  it('should return concatenated error message when error.response.data is an array', () => {
    const errorDataMessages = ['Error 1.', 'Error 2.']
    const error = { response: { data: { errors: errorDataMessages } } }
    const result = getApiErrorMessage(error)
    expect(result).toBe(errorDataMessages.join(' '))
  })
})
