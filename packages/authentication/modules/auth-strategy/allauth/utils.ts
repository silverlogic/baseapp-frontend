import type { AllAuthLoginResponse, AllAuthSignupResponse } from '../../../types/allauth'
import type { MinimalProfile } from '../../../types/profile'
import type { User } from '../../../types/user'
import type { AuthResult } from '../types'

// Canonical `User` fields sourced from the auth response. This is an allowlist
// (not "copy everything except known control keys") so token/session/control
// fields in `meta` can never leak into the persisted user, and adding a field
// is a deliberate change. `profile` is intentionally excluded: it's large
// (image/banner URLs), is persisted separately as the CurrentProfile cookie,
// and is hydrated from /users/me, so duplicating it here would only bloat the
// cookie and risk drift.
const USER_FIELDS = [
  'isEmailVerified',
  'emailVerificationRequired',
  'newEmail',
  'isNewEmailConfirmed',
  'referralCode',
  'firstName',
  'lastName',
  'phoneNumber',
  'preferredLanguage',
] as const

// Identity is taken from the login response, never decoded from the access
// token. The backend sends the full (camelized) user in `meta` via the allauth
// token strategy; allauth's own `data.user` is the sparse fallback. `id`/`email`
// prefer `meta` so the identity is public-id-aware (an int today, a UUID once
// public ids are enabled); the remaining fields come from whichever source has
// them.
function resolveUser(response: AllAuthLoginResponse): User | null {
  const meta = (response.meta ?? {}) as Record<string, unknown>
  const dataUser = (response.data?.user ?? {}) as Record<string, unknown>

  const id = meta.id ?? dataUser.id

  // `id` is the identity key; email is optional (some account types, and future
  // strategies, have no email), so only drop the user when there is no id.
  if (id === undefined || id === null) return null

  const user: Record<string, unknown> = { id, email: meta.email ?? dataUser.email }
  USER_FIELDS.forEach((field) => {
    const value = meta[field] ?? dataUser[field]
    if (value !== undefined) user[field] = value
  })

  return user as unknown as User
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

  const user = resolveUser(response)

  return {
    kind: 'success',
    user,
    session: {
      accessToken: response.meta?.accessToken ?? null,
      refreshToken: response.meta?.refreshToken ?? null,
      sessionToken: response.meta?.sessionToken ?? null,
      user,
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
