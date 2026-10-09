'use client'

import type { FC } from 'react'
import { useCallback } from 'react'

import { Dropzone } from '@baseapp-frontend/design-system/components/web/dropzones'

import type { FileUploadDropzoneProps } from './types'

const FileUploadDropzone: FC<FileUploadDropzoneProps> = ({
  onFilesSelected,
  maxFiles = 10,
  maxFileSize = 100 * 1024 * 1024, // 100MB default
  acceptedFileTypes,
  disabled,
}) => {
  const handleSelect = useCallback(
    (files: File | File[] | Blob | Blob[]) => {
      const fileArray = Array.isArray(files) ? files : [files]
      onFilesSelected(fileArray as File[])
    },
    [onFilesSelected],
  )

  return (
    <Dropzone
      accept={acceptedFileTypes ?? {}}
      onSelect={handleSelect}
      onRemove={() => {}}
      multiple={maxFiles > 1}
      maxFileSize={maxFileSize / (1024 * 1024)} // Convert bytes to MB
      asBase64={false} // Keep as File objects for chunked upload
      title="Upload Files"
      subTitle={`Max ${maxFiles} files, ${Math.round(maxFileSize / (1024 * 1024))}MB each`}
      includeActionButton={false}
      DropzoneOptions={{
        disabled,
        maxFiles,
      }}
    />
  )
}

export default FileUploadDropzone
export type { FileUploadDropzoneProps } from './types'
