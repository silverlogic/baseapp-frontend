import type { CookieAttributes } from 'js-cookie'

import { ServerSideRenderingOption } from '../../types/server'

export interface GetCookieOptions extends ServerSideRenderingOption {
  parseJSON?: boolean
}

export interface SetCookieOptions extends CookieAttributes {
  stringfyValue?: boolean
}
