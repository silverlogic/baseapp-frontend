import { ACCESS_COOKIE_NAME } from '../../../constants/cookie'
import type { ServerSideRenderingOption } from '../../../types/server'
import { getCookie } from '../../cookie'

export const getToken = (
  cookieName = ACCESS_COOKIE_NAME,
  { noSSR = false }: ServerSideRenderingOption = {},
) => getCookie<string>(cookieName, { noSSR })
