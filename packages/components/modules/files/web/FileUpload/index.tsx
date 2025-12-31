'use client'

import type { FC } from 'react'
import { useCallback } from 'react'

import { ConnectionHandler, useFragment } from 'react-relay'

import { useFileUploadStore } from '../../common/context/FileUploadProvider'
import { useFileAttachToTargetMutation } from '../../common/graphql/mutations/FileAttachToTarget'
import { FilesListFragment } from '../../common/graphql/queries/FilesList'
import { useChunkedUpload } from '../../common/hooks/useChunkedUpload'
import FileUploadDropzone from '../FileUploadDropzone'
import FileUploadList from '../FileUploadList'
import type { FileUploadProps } from './types'

const FileUpload: FC<FileUploadProps> = ({
  target: targetRef,
  maxFiles,
  maxFileSize,
  acceptedFileTypes,
  disabled,
  autoAttach = true,
  onUploadComplete,
  onAttachComplete,
  onError,
}) => {
  const target = useFragment(FilesListFragment, targetRef)
  const { uploadFile } = useChunkedUpload()
  const [attachFiles, isAttaching] = useFileAttachToTargetMutation()
  const { clearCompleted } = useFileUploadStore()

  const handleFilesSelected = useCallback(
    async (selectedFiles: File[]) => {
      if (!target.id) {
        onError?.(new Error('Target object ID is required'))
        return
      }

      try {
        const uploadPromises = selectedFiles.map((file) => uploadFile(file))

        const fileRelayIds = await Promise.all(uploadPromises)

        onUploadComplete?.(fileRelayIds)

        if (autoAttach && fileRelayIds.length > 0) {
          const connectionID = ConnectionHandler.getConnectionID(target.id, 'FilesList_files')

          attachFiles({
            variables: {
              input: {
                fileRelayIds,
                targetObjectId: target.id,
              },
              connections: [connectionID],
            },
            onCompleted: () => {
              // Clear completed files from upload state after successful attachment
              clearCompleted()
              onAttachComplete?.()
            },
            onError: (error) => {
              onError?.(error)
            },
          })
        } else if (!autoAttach) {
          // If not auto-attaching, clear completed files after upload
          clearCompleted()
        }
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error('Upload failed'))
      }
    },
    [
      uploadFile,
      autoAttach,
      target.id,
      attachFiles,
      onUploadComplete,
      onAttachComplete,
      onError,
      clearCompleted,
    ],
  )

  if (!target.isFilesEnabled) {
    return null
  }

  return (
    <div>
      <FileUploadDropzone
        onFilesSelected={handleFilesSelected}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        acceptedFileTypes={acceptedFileTypes}
        disabled={disabled || isAttaching}
      />
      <FileUploadList target={targetRef} />
    </div>
  )
}

export default FileUpload
export type { FileUploadProps } from './types'
