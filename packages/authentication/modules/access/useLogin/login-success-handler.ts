import { isMobilePlatform } from '@baseapp-frontend/utils/functions/os'

import { getSessionService } from '../../../session/client'
import type { MinimalProfile } from '../../../types/profile'
import type { AuthResult } from '../../auth-strategy/types'

function resolveProfileImage(profileImage?: string | null): string | null {
  if (!profileImage) return null

  const isWebPlatform = !isMobilePlatform()
  const API_BASE_URL = isWebPlatform
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.EXPO_PUBLIC_API_BASE_URL
  const baseUrl = API_BASE_URL?.replace('/v1', '')

  return profileImage.startsWith('http') || !baseUrl ? profileImage : `${baseUrl}${profileImage}`
}

// Writes the session tokens from a successful auth result.
// Strategies must populate result.session on AuthSuccessResult.
export async function writeSessionFromAuthResult(result: AuthResult): Promise<void> {
  if (result.kind !== 'success') return

  const { session } = result

  if (session?.accessToken || session?.refreshToken) {
    const sessionService = getSessionService()
    await sessionService.write(session)
  }
}

export function resolveProfileFromAuthResult(result: AuthResult): MinimalProfile | null {
  if (result.kind !== 'success') return null

  if (!result.profile?.id) return null

  return {
    id: result.profile.id,
    name: result.profile.name ?? null,
    image: resolveProfileImage(result.profile.image),
    urlPath: result.profile.urlPath ?? null,
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
    sessionToken: null, // MFA completion doesn't issue a session token; the JWT pair is sufficient here
    // The code-verification response carries no user, so persist null to clear
    // any previously stored user (prevents cross-account identity bleed).
    user: null,
  })
  // TODO(auth-strategy): hydrate the real user here once the MFA flow is wired
  // up — capture it from the `mfa_required` step's response (which includes the
  // user) and pass it through instead of leaving the session user-less.
}
