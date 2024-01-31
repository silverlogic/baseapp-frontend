import ClientCookies from 'js-cookie'

import { ACCESS_COOKIE_NAME } from '../../../constants/cookie'

export const getToken = async (cookieName = ACCESS_COOKIE_NAME) => {
  if (typeof window === typeof undefined) {
    const { cookies: serverCookies } = await import('next/headers')
    return serverCookies().get(cookieName)?.value
  }
  return ClientCookies.get(cookieName)
}
