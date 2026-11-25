import { type JWTResponse } from '../../../types/jwt'
import { resolveApiUrl } from '../../api/resolveApiUrl'
import type { ResolveApiUrlOptions } from '../../api/resolveApiUrl/types'
import { getExpoConstant } from '../../expo'
import { getPrototypeFetch } from '../../fetch/prototypeFetch'

export const getAccessToken = async (
  refreshToken?: string | null,
  options: ResolveApiUrlOptions = {},
) => {
  if (!refreshToken) {
    throw new Error('No refresh token provided.')
  }

  try {
    const EXPO_PUBLIC_API_BASE_URL = getExpoConstant('EXPO_PUBLIC_API_BASE_URL')

    // A registered prototype handler answers locally, so there is no API address to resolve.
    const prototypeFetch = getPrototypeFetch()
    const { url: apiBaseUrl, headers: forwardedHeaders } = prototypeFetch
      ? { url: '', headers: {} }
      : await resolveApiUrl(
          process.env.NEXT_PUBLIC_API_BASE_URL ?? EXPO_PUBLIC_API_BASE_URL,
          options,
        )

    const init: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...forwardedHeaders,
      },
    }
    const response = prototypeFetch
      ? await prototypeFetch('/auth/refresh', init, {
          baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? EXPO_PUBLIC_API_BASE_URL,
        })
      : await fetch(`${apiBaseUrl}/auth/refresh`, init)

    if (response instanceof Response && !response.ok) {
      throw new Error('Failed to get access token.')
    }

    const { access: accessToken } = (await response.json()) as JWTResponse

    return accessToken
  } catch (error) {
    return Promise.reject(error)
  }
}
