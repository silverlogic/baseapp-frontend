// The markdown editor serializes leading/trailing spaces as character
// references (e.g. `&#x20;`), so a whitespace-only input survives `.trim()`.
const MARKDOWN_ESCAPED_WHITESPACE_REGEX = /&#x20;|&#32;|&nbsp;/gi

export function hasVisibleContent(body: string): boolean {
  return body.replace(MARKDOWN_ESCAPED_WHITESPACE_REGEX, ' ').trim().length > 0
}

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
