import _axios from 'axios'
import Cookies from 'js-cookie'

import { IJWTResponse } from '../../../types/jwt'

const REFRESH_TOKEN_URL = '/auth/refresh'

// We create an isolated axios instance to skip the interceptors
export const simpleAxios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const refreshAccessToken = async (cookieName: string, refreshCookieName: string) => {
  const refreshToken = Cookies.get(refreshCookieName)

  if (!refreshToken) {
    return Promise.reject(new Error('No refresh token'))
  }

  try {
    const responseData = (
      await simpleAxios.post(REFRESH_TOKEN_URL, {
        refresh: refreshToken,
      })
    ).data as IJWTResponse

    Cookies.set(cookieName, responseData.access, {
      secure: process.env.NODE_ENV === 'production',
    })

    return responseData.access
  } catch (error) {
    Cookies.remove(cookieName)
    Cookies.remove(refreshCookieName)

    return Promise.reject(error)
  }
}
