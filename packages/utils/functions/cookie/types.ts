import { ServerSideRenderingOption } from '../../types/server'

export interface GetCookieOptions extends ServerSideRenderingOption {
  parseJSON?: boolean
}
