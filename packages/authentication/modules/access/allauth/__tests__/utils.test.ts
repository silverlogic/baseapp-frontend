import type { AllAuthLoginResponse } from '../../../../types/allauth'
import { isAllAuthPasswordChangeRedirect, normalizeAllAuthError } from '../utils'

describe('isAllAuthPasswordChangeRedirect', () => {
  it('should return true when response has a redirectUrl string', () => {
    const response = { redirectUrl: '/change-password' }

    expect(isAllAuthPasswordChangeRedirect(response)).toBe(true)
  })

  it('should return false when response has no redirectUrl', () => {
    const response: AllAuthLoginResponse = {
      status: 200,
      meta: { accessToken: 'a', refreshToken: 'r', sessionToken: 's' },
      data: { user: { id: 1 } },
    }

    expect(isAllAuthPasswordChangeRedirect(response)).toBe(false)
  })

  it('should return false when redirectUrl is not a string', () => {
    const response: AllAuthLoginResponse = {
      status: 200,
      meta: { accessToken: 'a', refreshToken: 'r', sessionToken: 's' },
      data: { user: { id: 1 } },
    }

    expect(isAllAuthPasswordChangeRedirect(response)).toBe(false)
  })
})

describe('normalizeAllAuthError', () => {
  it('should return the original error if it is not an object', () => {
    expect(normalizeAllAuthError('string error')).toBe('string error')
    expect(normalizeAllAuthError(null)).toBeNull()
    expect(normalizeAllAuthError(undefined)).toBeUndefined()
  })

  it('should return the original error if no AllAuth error payload is found', () => {
    const error = new Error('generic error')

    expect(normalizeAllAuthError(error)).toBe(error)
  })

  it('should normalize errors from response.data', () => {
    const error = {
      response: {
        data: {
          status: 400,
          errors: [{ message: 'Email is required.', param: 'email' }],
        },
      },
    }

    const result = normalizeAllAuthError(error)

    expect(result.response.data).toEqual({
      email: ['Email is required.'],
    })
    expect(result.message).toBe('Email is required.')
  })

  it('should normalize errors from JSON-encoded message', () => {
    const error = {
      message: JSON.stringify({
        status: 400,
        errors: [{ message: 'Invalid token.', param: 'key' }],
      }),
    }

    const result = normalizeAllAuthError(error)

    expect(result.response.data).toEqual({
      key: ['Invalid token.'],
    })
    expect(result.message).toBe('Invalid token.')
  })

  it('should use "detail" as field key when param is missing', () => {
    const error = {
      response: {
        data: {
          status: 400,
          errors: [{ message: 'Something failed.' }],
        },
      },
    }

    const result = normalizeAllAuthError(error)

    expect(result.response.data).toEqual({
      detail: ['Something failed.'],
    })
  })

  it('should use generic login error message for email_password_mismatch code', () => {
    const error = {
      response: {
        data: {
          status: 400,
          errors: [
            { code: 'email_password_mismatch', message: 'original message', param: 'email' },
          ],
        },
      },
    }

    const result = normalizeAllAuthError(error)

    expect(result.response.data).toEqual({
      email: ['Invalid email or password.'],
    })
    expect(result.message).toBe('Invalid email or password.')
  })

  it('should use default error message when error message is missing', () => {
    const error = {
      response: {
        data: {
          status: 400,
          errors: [{ param: 'email' }],
        },
      },
    }

    const result = normalizeAllAuthError(error)

    expect(result.response.data).toEqual({
      email: ['Something went wrong.'],
    })
  })

  it('should handle multiple errors across different fields', () => {
    const error = {
      response: {
        data: {
          status: 400,
          errors: [
            { message: 'Email is required.', param: 'email' },
            { message: 'Password is too short.', param: 'password' }, // NOSONAR
            { message: 'Email is invalid.', param: 'email' },
          ],
        },
      },
    }

    const result = normalizeAllAuthError(error)

    expect(result.response.data).toEqual({
      email: ['Email is required.', 'Email is invalid.'],
      password: ['Password is too short.'], // NOSONAR
    })
    expect(result.message).toBe('Email is required.')
  })

  it('should return the original error if errors array is empty', () => {
    const error = {
      response: {
        data: {
          status: 400,
          errors: [],
        },
      },
    }

    expect(normalizeAllAuthError(error)).toBe(error)
  })

  it('should return the original error if message is not valid JSON', () => {
    const error = {
      message: 'not json at all',
    }

    expect(normalizeAllAuthError(error)).toBe(error)
  })

  it('should preserve existing response properties', () => {
    const error = {
      response: {
        status: 400,
        data: {
          status: 400,
          errors: [{ message: 'Bad request.', param: 'detail' }],
        },
      },
    }

    const result = normalizeAllAuthError(error)

    expect(result.response.status).toBe(400)
    expect(result.response.data).toEqual({
      detail: ['Bad request.'],
    })
  })

  it('should fall back to original error message when no mapped messages exist', () => {
    const error = {
      message: JSON.stringify({
        status: 400,
        errors: [{ param: 'field' }],
      }),
    }

    const result = normalizeAllAuthError(error)

    expect(result.message).toBe('Something went wrong.')
  })
})
