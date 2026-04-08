import type { JWTResponse } from '@baseapp-frontend/utils/types/jwt'

import { getActiveAuthModule } from './factory'

export async function preAuthenticateWithActiveStrategy(token?: string): Promise<JWTResponse> {
  if (!token) {
    throw new Error('No token provided.')
  }

  const { strategy } = getActiveAuthModule()

  if (!strategy.preAuthenticate) {
    throw new Error(
      `The active auth strategy "${strategy.id}" does not support pre-authentication.`,
    )
  }

  return strategy.preAuthenticate(token)
}
