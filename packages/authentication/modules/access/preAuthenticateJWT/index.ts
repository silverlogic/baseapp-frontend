import { resolveApiUrl } from '@baseapp-frontend/utils/functions/api/resolveApiUrl'
import type { ResolveApiUrlOptions } from '@baseapp-frontend/utils/functions/api/resolveApiUrl/types'
import type { JWTResponse } from '@baseapp-frontend/utils/types/jwt'

/**
 * This function is intended for web usage only
 * because it relies on `NEXT_PUBLIC_API_BASE_URL`.
 */
const preAuthenticateJWT = async (token?: string, options: ResolveApiUrlOptions = {}) => {
  try {
    if (!token) {
      throw new Error('No token provided.')
    }

    const { url: apiBaseUrl, headers: forwardedHeaders } = await resolveApiUrl(
      process.env.NEXT_PUBLIC_API_BASE_URL,
      options,
    )

    const response = await fetch(`${apiBaseUrl}/auth/pre-auth/jwt`, {
      method: 'POST',
      body: JSON.stringify({ token }),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...forwardedHeaders,
      },
    })

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
