import type { AllAuthLoginJWTResponse, AllAuthLoginResponse } from '../../../types/allauth'

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
