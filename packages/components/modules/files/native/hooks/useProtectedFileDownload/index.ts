import { Linking } from 'react-native'

import { useProtectedFileDownloadLogic } from '../../../common/hooks/useProtectedFileDownloadLogic'
import type {
  ProtectedFileDownloadTargetFactory,
  UseProtectedFileDownloadOptions,
  UseProtectedFileDownloadReturn,
} from '../../../common/hooks/useProtectedFileDownloadLogic/types'

// The system browser handles both dispositions: it saves an attachment and shows an inline file.
const openInSystemBrowser: ProtectedFileDownloadTargetFactory = () => ({
  open: (url) => Linking.openURL(url),
})

/**
 * Downloads or opens a protected file: mints a short-lived `protectedFileLink` and opens it in
 * the system browser, which needs no auth header because the link is bound to the user.
 */
const useProtectedFileDownload = (
  options: UseProtectedFileDownloadOptions = {},
): UseProtectedFileDownloadReturn =>
  useProtectedFileDownloadLogic({ ...options, createTarget: openInSystemBrowser })

export default useProtectedFileDownload
