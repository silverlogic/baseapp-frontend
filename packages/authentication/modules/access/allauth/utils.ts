import type {
  AllAuthError,
  AllAuthLoginJWTResponse,
  AllAuthLoginResponse,
  AllAuthResponse,
} from '../../../types/allauth'

const GENERIC_LOGIN_ERROR_MESSAGE = 'Invalid email or password.'
const DEFAULT_ERROR_MESSAGE = 'Something went wrong.'

export function extractTokensFromAllAuthResponse(
  response: AllAuthLoginResponse,
): AllAuthLoginJWTResponse | null {
  const accessToken = response.meta?.accessToken || response.data?.accessToken
  const refreshToken = response.meta?.refreshToken || response.data?.refreshToken

  if (!accessToken || !refreshToken) {
    return null
  }

  return {
    accessToken,
    refreshToken,
  }
}

export function isAllAuthPasswordChangeRedirect(
  response: AllAuthLoginResponse | { redirectUrl?: string },
): response is { redirectUrl: string } {
  return 'redirectUrl' in response && typeof response.redirectUrl === 'string'
}

function parseAllAuthErrorPayload(error: unknown): AllAuthResponse | null {
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

function mapAllAuthErrorsToFields(errors: AllAuthError[]): Record<string, string[]> {
  return errors.reduce((accumulator, current) => {
    const fieldKey = current.param || 'detail'
    const message =
      current.code === 'email_password_mismatch'
        ? GENERIC_LOGIN_ERROR_MESSAGE
        : current.message || DEFAULT_ERROR_MESSAGE

    if (!accumulator[fieldKey]) {
      accumulator[fieldKey] = []
    }

    accumulator[fieldKey].push(message)
    return accumulator
  }, {} as Record<string, string[]>)
}

export function normalizeAllAuthError(error: unknown) {
  const payload = parseAllAuthErrorPayload(error)

  if (!payload || !Array.isArray(payload.errors) || payload.errors.length === 0) {
    return error
  }

  const data = mapAllAuthErrorsToFields(payload.errors)
  const firstMessage = Object.values(data)[0]?.[0] ?? (error as any)?.message
  const normalizedError = error as any

  normalizedError.response = { ...(normalizedError.response ?? {}), data }
  normalizedError.message = firstMessage

  return normalizedError
}
