import Cookies from 'js-cookie'

import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from '../../../constants/cookie'
import { templateEnv } from '../../env'
import { getAccessToken } from '../getAccessToken'
import { getToken } from '../getToken'

export const refreshAccessToken = async (
  cookieName = ACCESS_COOKIE_NAME,
  refreshCookieName = REFRESH_COOKIE_NAME,
) => {
  try {
    const refreshToken = getToken(refreshCookieName) ?? ''

    const accessToken = await getAccessToken(refreshToken)

    Cookies.set(cookieName, accessToken, {
      secure: templateEnv.NODE_ENV === 'production',
    })

    return accessToken
  } catch (error) {
    Cookies.remove(cookieName)
    Cookies.remove(refreshCookieName)

    return Promise.reject(error)
  }
}
