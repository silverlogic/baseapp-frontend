import type { User } from '../types/user'

/**
 * Serialize the authenticated user for cookie / secure-store persistence.
 */
export function serializeUserCookie(user: User): string {
  return JSON.stringify(user)
}

/**
 * Parse the persisted user from a stored cookie value.
 *
 * Cookie encoders differ between read paths (js-cookie on the client decodes for
 * us; the raw Cookie header on the server does not), so we try the value as-is
 * first and fall back to a URL-decoded value before giving up.
 */
export function parseUserCookie(value?: string | null): User | null {
  if (!value) return null

  const candidates = [value]
  try {
    candidates.push(decodeURIComponent(value))
  } catch {
    // `value` was not URL-encoded; the raw candidate already covers it.
  }

  const parsed = candidates
    .map((candidate) => {
      try {
        return { ok: true, user: JSON.parse(candidate) as User } as const
      } catch {
        // This candidate did not parse; try the next one.
        return { ok: false } as const
      }
    })
    .find((result) => result.ok)

  if (parsed && parsed.ok) return parsed.user

  // A non-empty value that fails every parse means the cookie is corrupted or
  // truncated (e.g. it grew past the browser/proxy cookie-size limit). Surface
  // it instead of silently returning null, which presents as an authenticated
  // session with no identity (the bug this whole change set fixes).
  // eslint-disable-next-line no-console -- intentional diagnostic for a corrupted/oversized cookie
  console.warn(
    '[auth] Failed to parse the persisted user cookie; treating the session as user-less.',
  )
  return null
}
