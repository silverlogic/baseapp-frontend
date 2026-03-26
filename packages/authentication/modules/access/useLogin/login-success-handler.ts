import { isMobilePlatform } from '@baseapp-frontend/utils/functions/os'

import { getSessionService } from '../../../session/client'
import type { MinimalProfile } from '../../../types/profile'
import type { AuthResult, AuthSuccessResult } from '../../auth-strategy/types'

interface LegacyLoginSuccessMetadata {
  accessToken?: string
  refreshToken?: string
  sessionToken?: string
  rawResponse?: { meta?: { profile?: Partial<MinimalProfile> } }
}

function getLegacyMetadata(result: AuthSuccessResult): LegacyLoginSuccessMetadata | null {
  return (result.metadata as LegacyLoginSuccessMetadata | undefined) ?? null
}

function resolveProfileImage(profileImage?: string | null): string | null {
  if (!profileImage) return null

  const isWebPlatform = !isMobilePlatform()
  const API_BASE_URL = isWebPlatform
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.EXPO_PUBLIC_API_BASE_URL
  const baseUrl = API_BASE_URL?.replace('/v1', '')

  return profileImage.startsWith('http') || !baseUrl ? profileImage : `${baseUrl}${profileImage}`
}

export async function writeSessionFromAuthResult(result: AuthResult): Promise<void> {
  if (result.kind !== 'success') return

  const { session } = result
  const legacyMetadata = getLegacyMetadata(result)

  if (session?.accessToken || session?.refreshToken) {
    const sessionService = getSessionService()
    await sessionService.write(session)
    return
  }

  if (legacyMetadata?.accessToken || legacyMetadata?.refreshToken) {
    const sessionService = getSessionService()
    await sessionService.write({
      accessToken: legacyMetadata.accessToken ?? null,
      refreshToken: legacyMetadata.refreshToken ?? null,
      sessionToken: legacyMetadata.sessionToken ?? null,
    })
  }
}

export function resolveProfileFromAuthResult(result: AuthResult): MinimalProfile | null {
  if (result.kind !== 'success') return null

  if (result.profile?.id) {
    return {
      id: result.profile.id,
      name: result.profile.name ?? null,
      image: resolveProfileImage(result.profile.image),
      urlPath: result.profile.urlPath ?? null,
    }
  }

  const profile = getLegacyMetadata(result)?.rawResponse?.meta?.profile
  if (!profile?.id) return null

  return {
    id: profile.id,
    name: profile.name ?? null,
    image: resolveProfileImage(profile.image),
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
