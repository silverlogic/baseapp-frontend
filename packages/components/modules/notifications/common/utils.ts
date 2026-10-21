const SAFE_URL_PATTERN = /^(\/(?!\/)|https?:\/\/)/i

/**
 * Reads the conventional `data.url` of a notification: where clicking the notification takes the
 * user. Only app-relative paths (`/path`) and http(s) URLs are returned; anything else, such as a
 * `javascript:` URL, is ignored.
 */
export const getNotificationUrl = (data: unknown): string | undefined => {
  if (!data || typeof data !== 'object') return undefined

  const { url } = data as { url?: unknown }
  if (typeof url !== 'string') return undefined

  const trimmedUrl = url.trim()
  return SAFE_URL_PATTERN.test(trimmedUrl) ? trimmedUrl : undefined
}
