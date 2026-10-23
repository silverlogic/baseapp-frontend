'use client'

import { useProtectedFileDownloadLogic } from '../../../common/hooks/useProtectedFileDownloadLogic'
import type {
  ProtectedFileDownloadTargetFactory,
  UseProtectedFileDownloadOptions,
  UseProtectedFileDownloadReturn,
} from '../../../common/hooks/useProtectedFileDownloadLogic/types'

const navigateHere = { open: (url: string) => window.location.assign(url) }

/**
 * An attachment is a plain navigation to the link: the response's `Content-Disposition:
 * attachment` saves it and the page stays put. The page is replaced when the response is not an
 * attachment: the field is registered `inline` on the backend, or opening the link fails (expired,
 * throttled, file missing) and the backend's error is shown. An inline file opens in a tab
 * reserved synchronously in the click handler (so pop-up blockers allow it), detached from this
 * page (`opener = null`) and closed again if the link cannot be minted. When the browser blocks
 * the tab anyway, the file opens in this tab instead.
 */
export const createBrowserDownloadTarget: ProtectedFileDownloadTargetFactory = (disposition) => {
  if (disposition !== 'inline') return navigateHere

  const tab = window.open('', '_blank')
  if (!tab) return navigateHere
  tab.opener = null
  return {
    open: (url) => tab.location.replace(url),
    cancel: () => tab.close(),
  }
}

/**
 * Downloads or opens a protected file: mints a short-lived `protectedFileLink` and lets the
 * browser open it natively — no Blob, no Authorization header, so large files stream and inline
 * files keep the server's sandboxing CSP. Call `download` directly from the click handler.
 *
 * ```tsx
 * const { download, pendingKey } = useProtectedFileDownload()
 * <Button
 *   disabled={!invoice.pdf || pendingKey === getProtectedFileKey(invoice.pdf)}
 *   onClick={() => invoice.pdf && download(invoice.pdf)}
 * >
 *   Download PDF
 * </Button>
 * ```
 */
const useProtectedFileDownload = (
  options: UseProtectedFileDownloadOptions = {},
): UseProtectedFileDownloadReturn =>
  useProtectedFileDownloadLogic({ ...options, createTarget: createBrowserDownloadTarget })

export default useProtectedFileDownload
