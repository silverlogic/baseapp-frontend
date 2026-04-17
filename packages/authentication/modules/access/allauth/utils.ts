import type { AllAuthError, AllAuthLoginResponse, AllAuthResponse } from '../../../types/allauth'

const GENERIC_LOGIN_ERROR_MESSAGE = 'Invalid email or password.'
const DEFAULT_ERROR_MESSAGE = 'Something went wrong.'

export function isAllAuthPasswordChangeRedirect(
  response: AllAuthLoginResponse | { redirectUrl?: string },
): response is { redirectUrl: string } {
  return 'redirectUrl' in response && typeof response.redirectUrl === 'string'
}

export function parseAllAuthErrorPayload(error: unknown): AllAuthResponse | null {
  if (typeof error !== 'object' || !error) {
    return null
  }

  const responseData = (error as any).response?.data
  if (responseData && typeof responseData === 'object') {
    return responseData as AllAuthResponse
  }

  const errorMessage = (error as any).message
  if (typeof errorMessage === 'string') {
    try {
      const parsedMessage = JSON.parse(errorMessage)
      if (parsedMessage && typeof parsedMessage === 'object') {
        return parsedMessage as AllAuthResponse
      }
    } catch {
      return null
    }
  }

  return null
}

export function mapAllAuthErrorsToFields(errors: AllAuthError[]): Record<string, string[]> {
  return errors.reduce(
    (accumulator, current) => {
      const fieldKey = current.param || 'detail'
      const message =
        current.code === 'email_password_mismatch'
          ? GENERIC_LOGIN_ERROR_MESSAGE
          : current.message || DEFAULT_ERROR_MESSAGE

      accumulator[fieldKey] ??= []

      accumulator[fieldKey].push(message)
      return accumulator
    },
    {} as Record<string, string[]>,
  )
}
