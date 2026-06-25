export function formatHandle(path?: string): string | null {
  if (!path) return null
  return `@${path.replace('/', '')}`
}

/**
 * Resolves the route a "go to profile" link should navigate to. Prefers the profile's
 * `urlPath` (resolved by the flat-pages catch-all route) and falls back to `/profile/:id`.
 * Returns `undefined` when neither is available so callers can disable/skip navigation.
 */
export function getProfilePath(
  urlPath?: string | null,
  profileId?: string | null,
): string | undefined {
  if (urlPath) return urlPath
  if (profileId) return `/profile/${profileId}`
  return undefined
}
