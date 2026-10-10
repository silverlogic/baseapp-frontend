'use client'

import type { FC } from 'react'
import { useCallback } from 'react'

import { Dropzone } from '@baseapp-frontend/design-system/components/web/dropzones'

import { formatFileSize } from '../../common/utils/formatters'
import type { FileUploadDropzoneProps } from './types'

const FileUploadDropzone: FC<FileUploadDropzoneProps> = ({
  onFilesSelected,
  maxFiles = 10,
  maxFileSize,
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
      // Dropzone takes MB; unlimited when omitted.
      maxFileSize={maxFileSize ? maxFileSize / (1024 * 1024) : Infinity}
      asBase64={false} // Keep as File objects for chunked upload
      title="Upload Files"
      subTitle={
        maxFileSize
          ? `Max ${maxFiles} files, ${formatFileSize(maxFileSize)} each`
          : `Max ${maxFiles} files`
      }
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
