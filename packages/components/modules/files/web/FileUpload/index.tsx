'use client'

import type { FC } from 'react'

import { useFragment } from 'react-relay'

import { FilesListFragment } from '../../common/graphql/queries/FilesList'
import { useFileUploadLogic } from '../../common/hooks/useFileUploadLogic'
import FileUploadDropzone from '../FileUploadDropzone'
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

  const { handleFilesSelected, isAttaching, resetKey } = useFileUploadLogic({
    targetObjectId: target.id,
    autoAttach,
    onUploadComplete,
    onAttachComplete,
    onError,
  })

  if (!target.isFilesEnabled) {
    return null
  }

  return (
    <FileUploadDropzone
      key={resetKey}
      onFilesSelected={handleFilesSelected}
      maxFiles={maxFiles}
      maxFileSize={maxFileSize}
      acceptedFileTypes={acceptedFileTypes}
      disabled={disabled || isAttaching}
    />
  )
}

export default FileUpload
export type { FileUploadProps } from './types'
