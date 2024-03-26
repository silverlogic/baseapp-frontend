import { IJWTResponse } from '../../../types/jwt'

const REFRESH_TOKEN_URL = '/auth/refresh'

export const getAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error('No refresh token provided.')
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${REFRESH_TOKEN_URL}`, {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { access: accessToken } = (await response.json()) as IJWTResponse

    return accessToken
  } catch (error) {
    return Promise.reject(error)
  }
}
