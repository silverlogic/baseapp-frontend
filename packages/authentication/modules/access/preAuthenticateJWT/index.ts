import { baseAppFetch } from '@baseapp-frontend/utils/functions/fetch/baseAppFetch'
import type { IJWTResponse } from '@baseapp-frontend/utils/types/jwt'

const preAuthenticateJWT = async (token?: string) => {
  try {
    if (!token) {
      throw new Error('No token provided.')
    }

    const response = await baseAppFetch<IJWTResponse>('/auth/pre-auth/jwt', {
      method: 'POST',
      body: { token },
    })

    if (response instanceof Response && !response.ok) {
      throw new Error('Failed to pre-authenticate.')
    }

    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export default preAuthenticateJWT
