import { type JWTResponse } from '../../../types/jwt'
import { getExpoConstant } from '../../expo'

export const getAccessToken = async (refreshToken?: string | null): Promise<string> => {
  if (!refreshToken) {
    throw new Error('No refresh token provided.')
  }

  try {
    const EXPO_PUBLIC_API_BASE_URL = getExpoConstant('EXPO_PUBLIC_API_BASE_URL')

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL ?? EXPO_PUBLIC_API_BASE_URL}/_allauth/app/v1/tokens/refresh`,
      {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response instanceof Response && !response.ok) {
      throw new Error('Failed to get access token.')
    }

    const responseData = await response.json()

    // AllAuth response
    if (responseData && typeof responseData === 'object' && 'data' in responseData) {
      if (responseData.data?.access_token) {
        return responseData.data.access_token
      }
    }

    // SimpleJWT response
    if (responseData && typeof responseData === 'object' && 'access' in responseData) {
      const jwtResponse = responseData as JWTResponse
      return jwtResponse.access
    }

    throw new Error('Invalid response format from token refresh endpoint.')
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getTokens = async (
  refreshToken?: string | null,
): Promise<{ access: string; refresh?: string }> => {
  if (!refreshToken) {
    throw new Error('No refresh token provided.')
  }

  try {
    const EXPO_PUBLIC_API_BASE_URL = getExpoConstant('EXPO_PUBLIC_API_BASE_URL')

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL ?? EXPO_PUBLIC_API_BASE_URL}/_allauth/app/v1/tokens/refresh`,
      {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response instanceof Response && !response.ok) {
      throw new Error('Failed to get access token.')
    }

    const responseData = await response.json()

    // AllAuth response
    if (responseData && typeof responseData === 'object' && 'data' in responseData) {
      if (responseData.data?.access_token) {
        return {
          access: responseData.data.access_token,
          refresh: responseData.data.refresh_token,
        }
      }
    }

    // SimpleJWT response
    if (responseData && typeof responseData === 'object' && 'access' in responseData) {
      const jwtResponse = responseData as JWTResponse
      return {
        access: jwtResponse.access,
        refresh: jwtResponse.refresh,
      }
    }

    throw new Error('Invalid response format from token refresh endpoint.')
  } catch (error) {
    return Promise.reject(error)
  }
}
