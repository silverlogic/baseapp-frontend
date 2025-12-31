'use client'

import type { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { useFileUpload } from '../../common/context/useFileUpload'
import { FilesListFragment } from '../../common/graphql/queries/FilesList'
import AttachedFileItem from '../AttachedFileItem'
import UploadingFileItem from './UploadingFileItem'
import type { FileUploadListProps } from './types'

const FileUploadList: FC<FileUploadListProps> = ({
  target: targetRef,
  showUploadProgress = true,
  allowRemove = true,
  allowRetry = true,
}) => {
  const target = useFragment(FilesListFragment, targetRef)
  const { files } = useFileUpload()

  const uploadingFiles = Array.from(files.values())

  const hasUploadingFiles = uploadingFiles.length > 0
  const hasAttachedFiles = (target.files?.edges?.length ?? 0) > 0

  if (!hasUploadingFiles && !hasAttachedFiles) {
    return null
  }

  return (
    <Box sx={{ mt: 2 }}>
      {showUploadProgress && hasUploadingFiles && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Uploading ({uploadingFiles.length})
          </Typography>
          {uploadingFiles.map((file) => (
            <UploadingFileItem
              key={file.id}
              fileProgress={file}
              allowRemove={allowRemove}
              allowRetry={allowRetry}
            />
          ))}
        </Box>
      )}

      {hasAttachedFiles && target.files && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Attached Files ({target.files.edges.length})
          </Typography>
          {target.files.edges.map((edge: any) => {
            if (!edge?.node) return null
            return <AttachedFileItem key={edge.node.id} file={edge.node} />
          })}
        </Box>
      )}
    </Box>
  )
}

export default FileUploadList
export type { FileUploadListProps } from './types'
