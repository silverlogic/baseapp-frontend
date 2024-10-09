import { type JWTResponse } from '../../../types/jwt'

export const getAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error('No refresh token provided.')
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.EXPO_PUBLIC_API_BASE_URL}/auth/refresh`,
      {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response instanceof Response && !response.ok) {
      throw new Error('Failed to get access token.')
    }

    const { access: accessToken } = (await response.json()) as JWTResponse

    return accessToken
  } catch (error) {
    return Promise.reject(error)
  }
}
