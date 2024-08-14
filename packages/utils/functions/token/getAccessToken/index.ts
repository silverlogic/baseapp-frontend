import { JWTResponse } from '../../../types/jwt'
import { templateEnv } from '../../env'

const REFRESH_TOKEN_URL = '/auth/refresh'

export const getAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error('No refresh token provided.')
  }

  try {
    const response = await fetch(`${templateEnv.NEXT_PUBLIC_API_BASE_URL}${REFRESH_TOKEN_URL}`, {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response instanceof Response && !response.ok) {
      throw new Error('Failed to get access token.')
    }

    const { access: accessToken } = (await response.json()) as JWTResponse

    return accessToken
  } catch (error) {
    return Promise.reject(error)
  }
}
