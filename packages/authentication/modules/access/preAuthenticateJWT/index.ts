import type { JWTResponse } from '@baseapp-frontend/utils/types/jwt'

const preAuthenticateJWT = async (token?: string) => {
  try {
    if (!token) {
      throw new Error('No token provided.')
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.EXPO_PUBLIC_API_BASE_URL}/auth/pre-auth/jwt`,
      {
        method: 'POST',
        body: JSON.stringify({ token }),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response instanceof Response && !response.ok) {
      throw new Error('Failed to pre-authenticate.')
    }

    const data = (await response.json()) as JWTResponse
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export default preAuthenticateJWT
