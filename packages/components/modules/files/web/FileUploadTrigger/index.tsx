'use client'

import type { FC } from 'react'

import { AttachFile as AttachFileIcon } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useFragment } from 'react-relay'

import { FilesListFragment } from '../../common/graphql/queries/FilesList'
import { useFileSelect } from '../../common/hooks/useFileSelect'
import { useFileUploadLogic } from '../../common/hooks/useFileUploadLogic'
import FileUploadDropzone from '../FileUploadDropzone'
import type { FileUploadTriggerProps } from './types'

/**
 * Owns the upload orchestration (useFileUploadLogic) and renders a pluggable
 * trigger: the full drop area (default) or a compact button. The button variant
 * uses the headless useFileSelect so selection/validation matches the dropzone.
 */
const FileUploadTrigger: FC<FileUploadTriggerProps> = ({
  target: targetRef,
  as = 'dropzone',
  icon,
  label = 'Attach files',
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

  const isDisabled = disabled || isAttaching

  const { open, getInputProps } = useFileSelect({
    onFilesSelected: handleFilesSelected,
    maxFiles,
    maxFileSize,
    acceptedFileTypes,
    disabled: isDisabled,
  })

  if (!target.isFilesEnabled) {
    return null
  }

  if (as === 'button') {
    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <input {...getInputProps()} />
        <Tooltip title={label}>
          <span>
            <IconButton size="small" onClick={open} disabled={isDisabled} aria-label={label}>
              {icon ?? <AttachFileIcon fontSize="small" />}
            </IconButton>
          </span>
        </Tooltip>
      </>
    )
  }

  return (
    <FileUploadDropzone
      key={resetKey}
      onFilesSelected={handleFilesSelected}
      maxFiles={maxFiles}
      maxFileSize={maxFileSize}
      acceptedFileTypes={acceptedFileTypes}
      disabled={isDisabled}
    />
  )
}

export default FileUploadTrigger
export type { FileUploadTriggerProps } from './types'
