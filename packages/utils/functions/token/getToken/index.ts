import ClientCookies from 'js-cookie'
import { cookies as serverCookies } from 'next/headers'

import { ACCESS_COOKIE_NAME } from '../../../constants/cookie'

export const getToken = (cookieName = ACCESS_COOKIE_NAME) => {
  if (typeof window === typeof undefined) {
    return serverCookies().get(cookieName)?.value
  }
  return ClientCookies.get(cookieName)
}
