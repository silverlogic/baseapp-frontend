import { useCallback } from 'react'

import { ConnectionHandler } from 'react-relay'

import { useFileDeleteMutation } from '../../graphql/mutations/FileDelete'
import type { UseFileDeleteLogicParams, UseFileDeleteLogicReturn } from './types'

/**
 * Hook that handles file deletion logic
 * This hook is platform-agnostic and can be used in both web and native
 */
export const useFileDeleteLogic = ({
  targetObjectId,
  onDeleteComplete,
  onError,
}: UseFileDeleteLogicParams): UseFileDeleteLogicReturn => {
  const [deleteFile, isDeletingFile] = useFileDeleteMutation()

  const handleDelete = useCallback(
    (fileId: string) => {
      if (!targetObjectId) {
        const error = new Error('Target object ID is required for deleting file')
        console.error(error.message)
        onError?.(error)
        return
      }

      const connectionID = ConnectionHandler.getConnectionID(targetObjectId, 'FilesList_files')

      deleteFile({
        variables: {
          input: {
            id: fileId,
          },
          connections: [connectionID],
        },
        onCompleted: () => {
          onDeleteComplete?.()
        },
        onError: (error) => {
          onError?.(error)
        },
      })
    },
    [targetObjectId, deleteFile, onDeleteComplete, onError],
  )

  return {
    handleDelete,
    isDeletingFile,
  }
}
