import { Linking } from 'react-native'

import { ALLOWED_LINK_SCHEMES } from './constants'

/**
 * Whether `href` uses a scheme we allow page content to open externally
 * (see {@link ALLOWED_LINK_SCHEMES}). Comparison is case-insensitive.
 */
export const isAllowedExternalUrl = (href: string): boolean => {
  const normalized = href.trim().toLowerCase()
  return ALLOWED_LINK_SCHEMES.some((scheme) => normalized.startsWith(scheme))
}

/**
 * Open an external URL coming from (untrusted) page content. Rejects disallowed
 * schemes, checks the device can handle the URL, and swallows failures so a bad
 * link never surfaces as an unhandled promise rejection.
 */
export const openExternalUrl = async (href: string): Promise<void> => {
  if (!isAllowedExternalUrl(href)) return
  try {
    const canOpen = await Linking.canOpenURL(href)
    if (canOpen) {
      await Linking.openURL(href)
    }
  } catch {
    // The device can't open the URL (or it's malformed) — ignore rather than crash.
  }
}
