import type { AllAuthLoginResponse } from '../../../../types/allauth'
import { isAllAuthPasswordChangeRedirect } from '../utils'

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
