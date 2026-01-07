import { useCallback } from 'react'

import type { UseFileDownloadLogicParams, UseFileDownloadLogicReturn } from './types'

/**
 * Hook that handles file download logic
 * Platform-specific implementations should be provided via the downloadHandler parameter
 *
 * @example Web implementation:
 * ```ts
 * const { handleDownload } = useFileDownloadLogic({
 *   downloadHandler: (url) => window.open(url, '_blank')
 * })
 * ```
 *
 * @example React Native implementation:
 * ```ts
 * const { handleDownload } = useFileDownloadLogic({
 *   downloadHandler: async (url) => {
 *     await FileSystem.downloadAsync(url, FileSystem.documentDirectory + filename)
 *   }
 * })
 * ```
 */
export const useFileDownloadLogic = ({
  downloadHandler,
  onDownloadStart,
  onDownloadComplete,
  onError,
}: UseFileDownloadLogicParams): UseFileDownloadLogicReturn => {
  const handleDownload = useCallback(
    async (fileUrl: string | null | undefined, fileName?: string) => {
      if (!fileUrl) {
        const error = new Error('File URL is required for downloading')
        console.error(error.message)
        onError?.(error)
        return
      }

      try {
        onDownloadStart?.()
        await downloadHandler(fileUrl, fileName)
        onDownloadComplete?.()
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error('Download failed'))
      }
    },
    [downloadHandler, onDownloadStart, onDownloadComplete, onError],
  )

  return {
    handleDownload,
  }
}
