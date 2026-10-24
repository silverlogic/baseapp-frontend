'use client'

import type { FC } from 'react'
import { useCallback } from 'react'

import { Dropzone } from '@baseapp-frontend/design-system/components/web/dropzones'

import { useIntl } from 'react-intl'

import { formatFileSize } from '../../common/utils/formatters'
import type { FileUploadDropzoneProps } from './types'

const FileUploadDropzone: FC<FileUploadDropzoneProps> = ({
  onFilesSelected,
  maxFiles = 10,
  maxFileSize,
  acceptedFileTypes,
  disabled,
}) => {
  const intl = useIntl()
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
      maxFileSize={maxFileSize !== undefined ? maxFileSize / (1024 * 1024) : Infinity}
      asBase64={false} // Keep as File objects for chunked upload
      title={intl.formatMessage({ id: 'files.dropzone.title', defaultMessage: 'Upload Files' })}
      subTitle={
        maxFileSize !== undefined
          ? intl.formatMessage(
              {
                id: 'files.dropzone.subtitle',
                defaultMessage: 'Max {maxFiles} files, {maxFileSize} each',
              },
              { maxFiles, maxFileSize: formatFileSize(maxFileSize) },
            )
          : intl.formatMessage(
              { id: 'files.dropzone.subtitleNoSizeLimit', defaultMessage: 'Max {maxFiles} files' },
              { maxFiles },
            )
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
