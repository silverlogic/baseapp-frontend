import { isMobilePlatform } from '@baseapp-frontend/utils/functions/os'

import { getSessionService } from '../../../session/client'
import type { MinimalProfile } from '../../../types/profile'
import type { AuthResult } from '../../auth-strategy/types'

interface LoginSuccessMetadata {
  accessToken?: string
  refreshToken?: string
  sessionToken?: string
  rawResponse?: { meta?: { profile?: Partial<MinimalProfile> } }
}

export async function writeSessionFromAuthResult(result: AuthResult): Promise<void> {
  if (result.kind !== 'success' || !result.metadata) return

  const metadata = result.metadata as LoginSuccessMetadata
  if (metadata.accessToken || metadata.refreshToken) {
    const sessionService = getSessionService()
    await sessionService.write({
      accessToken: metadata.accessToken ?? null,
      refreshToken: metadata.refreshToken ?? null,
      sessionToken: metadata.sessionToken ?? null,
    })
  }
}

export function resolveProfileFromAuthResult(result: AuthResult): MinimalProfile | null {
  if (result.kind !== 'success' || !result.metadata) return null

  const metadata = result.metadata as LoginSuccessMetadata
  const profile = metadata.rawResponse?.meta?.profile
  if (!profile?.id) return null

  const isWebPlatform = !isMobilePlatform()
  const API_BASE_URL = isWebPlatform
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.EXPO_PUBLIC_API_BASE_URL
  const baseUrl = API_BASE_URL?.replace('/v1', '')
  let absoluteImagePath = null
  if (profile.image) {
    absoluteImagePath =
      profile.image.startsWith('http') || !baseUrl ? profile.image : `${baseUrl}${profile.image}`
  }

  return {
    id: profile.id,
    name: profile.name ?? null,
    image: absoluteImagePath,
    urlPath: profile.urlPath ?? null,
  }
}

export async function writeMfaSession(response: {
  access?: string
  refresh?: string
}): Promise<void> {
  if (!response.access || !response.refresh) return
  const sessionService = getSessionService()
  await sessionService.write({
    accessToken: response.access,
    refreshToken: response.refresh,
    sessionToken: null,
  })
  // TODO(auth-strategy): If MFA completion needs profile hydration in the
  // unified flow, move that responsibility into the strategy/session layer
  // instead of decoding JWTs in the hook.
}
