import { isRelativeUrl } from '@baseapp-frontend/utils'

/**
 * The address to share for a profile path. A relative `NEXT_PUBLIC_APP_BASE_URL` (e.g. `/`) means
 * the app is served at several hosts, so the link uses the host the user is on.
 */
export const getProfileShareUrl = (path: string) => {
  const appBaseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL
  if (isRelativeUrl(appBaseUrl)) {
    return `${window.location.origin}${appBaseUrl.replace(/\/+$/, '')}${path}`
  }
  return [appBaseUrl, path].join('')
}
