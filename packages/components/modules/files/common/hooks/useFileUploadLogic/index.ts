import { useCallback, useState } from 'react'

import { ConnectionHandler } from 'react-relay'

import { useFileUploadStore } from '../../context/FileUploadProvider'
import { useFileAttachToTargetMutation } from '../../graphql/mutations/FileAttachToTarget'
import { useChunkedUpload } from '../useChunkedUpload'
import type { UseFileUploadLogicParams, UseFileUploadLogicReturn } from './types'

/**
 * Hook that orchestrates the file upload and attach logic
 * This hook is platform-agnostic and can be used in both web and native
 */
export const useFileUploadLogic = ({
  targetObjectId,
  autoAttach = true,
  onUploadComplete,
  onAttachComplete,
  onError,
}: UseFileUploadLogicParams): UseFileUploadLogicReturn => {
  const { uploadFile } = useChunkedUpload()
  const [attachFiles, isAttaching] = useFileAttachToTargetMutation()
  const { clearCompleted } = useFileUploadStore()
  const [resetKey, setResetKey] = useState(0)

  const handleFilesSelected = useCallback(
    async (selectedFiles: File[]) => {
      if (!targetObjectId) {
        onError?.(new Error('Target object ID is required'))
        return
      }

      try {
        // Upload all files in parallel
        const uploadPromises = selectedFiles.map((file) => uploadFile(file))
        const fileRelayIds = await Promise.all(uploadPromises)

        onUploadComplete?.(fileRelayIds)

        // Auto-attach if enabled
        if (autoAttach && fileRelayIds.length > 0) {
          const connectionID = ConnectionHandler.getConnectionID(targetObjectId, 'FilesList_files')

          attachFiles({
            variables: {
              input: {
                fileRelayIds,
                targetObjectId,
              },
              connections: [connectionID],
            },
            onCompleted: () => {
              clearCompleted()
              setResetKey((prev) => prev + 1)
              onAttachComplete?.()
            },
            onError: (error) => {
              onError?.(error)
            },
          })
        } else if (!autoAttach) {
          clearCompleted()
          setResetKey((prev) => prev + 1)
        }
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error('Upload failed'))
      }
    },
    [
      uploadFile,
      autoAttach,
      targetObjectId,
      attachFiles,
      onUploadComplete,
      onAttachComplete,
      onError,
      clearCompleted,
    ],
  )

  return {
    handleFilesSelected,
    isAttaching,
    resetKey,
  }
}
