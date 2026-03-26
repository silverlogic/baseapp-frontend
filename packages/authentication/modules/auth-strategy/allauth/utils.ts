import { decodeJWT } from '@baseapp-frontend/utils/functions/token/decodeJWT'
import type { JWTContent } from '@baseapp-frontend/utils/types/jwt'

import type { AllAuthLoginResponse, AllAuthSignupResponse } from '../../../types/allauth'
import type { MinimalProfile } from '../../../types/profile'
import type { User } from '../../../types/user'
import type { AuthResult } from '../types'

type AccessTokenPayload = JWTContent & Partial<User>

function resolveUser(accessToken?: string): User | null {
  if (!accessToken) return null

  return decodeJWT<AccessTokenPayload>(accessToken) as User | null
}

function resolveProfile(response: AllAuthLoginResponse): MinimalProfile | null {
  const profile = response.meta?.profile

  if (!profile?.id) {
    return null
  }

  return {
    id: profile.id,
    name: profile.name ?? null,
    image: profile.image ?? null,
    urlPath: profile.urlPath ?? null,
  }
}

export function mapLoginResponse(response: AllAuthLoginResponse): AuthResult {
  if (response.redirectUrl) {
    return {
      kind: 'redirect_required',
      redirectUrl: response.redirectUrl,
      rawResponse: response,
      metadata: { rawResponse: response },
    }
  }

  const pendingMfaFlow = response.data?.flows?.find(
    (flow) => flow.isPending && flow.id.includes('mfa'),
  )
  if (pendingMfaFlow) {
    return {
      kind: 'mfa_required',
      ephemeralToken: response.meta?.sessionToken ?? '',
      method: pendingMfaFlow.id,
      rawResponse: response,
      metadata: { rawResponse: response },
    }
  }

  return {
    kind: 'success',
    user: resolveUser(response.meta?.accessToken),
    session: {
      accessToken: response.meta?.accessToken ?? null,
      refreshToken: response.meta?.refreshToken ?? null,
      sessionToken: response.meta?.sessionToken ?? null,
    },
    profile: resolveProfile(response),
    rawResponse: response,
    metadata: {
      accessToken: response.meta?.accessToken,
      refreshToken: response.meta?.refreshToken,
      sessionToken: response.meta?.sessionToken,
      rawResponse: response,
    },
  }
}

export function mapSignUpResponse(response: AllAuthSignupResponse): AuthResult {
  return {
    kind: 'success',
    rawResponse: response,
    metadata: { rawResponse: response },
  }
}
