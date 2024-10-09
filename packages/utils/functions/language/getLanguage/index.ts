import { LANGUAGE_COOKIE_NAME } from '../../../constants/cookie'
import type { ServerSideRenderingOption } from '../../../types/server'
import { getCookie } from '../../cookie'

export const getLanguage = (
  accessKeyName = LANGUAGE_COOKIE_NAME,
  { noSSR = false }: ServerSideRenderingOption = {},
) => getCookie<string>(accessKeyName, { noSSR })
