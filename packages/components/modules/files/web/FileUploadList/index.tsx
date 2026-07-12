'use client'

import type { FC, ReactNode } from 'react'

import { Box, Stack, Typography } from '@mui/material'
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
  variant = 'cards',
  layout = 'stack',
  editable = false,
}) => {
  const target = useFragment(FilesListFragment, targetRef)
  const { files } = useFileUpload()

  const uploadingFiles = Array.from(files.values())

  const hasUploadingFiles = uploadingFiles.length > 0
  const hasAttachedFiles = (target.files?.edges?.length ?? 0) > 0

  if (!hasUploadingFiles && !hasAttachedFiles) {
    return null
  }

  const itemVariant = variant === 'chips' ? 'chip' : 'card'
  const isHorizontal = layout === 'horizontal'

  // Chips: uploading + attached share one wrapping/scrolling row (Figma).
  // Cards: keep the two labelled sections (today's behaviour).
  const wrap = (children: ReactNode) =>
    isHorizontal ? (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          overflowX: 'auto',
        }}
      >
        {children}
      </Box>
    ) : (
      <Stack spacing={1}>{children}</Stack>
    )

  if (variant === 'chips') {
    return (
      <Box sx={{ mt: 1 }}>
        {wrap(
          <>
            {showUploadProgress &&
              uploadingFiles.map((file) => (
                <UploadingFileItem
                  key={file.id}
                  fileProgress={file}
                  allowRemove={allowRemove}
                  allowRetry={allowRetry}
                  variant="chip"
                />
              ))}
            {target.files?.edges?.map((edge) => {
              if (!edge?.node) return null
              return (
                <AttachedFileItem
                  key={edge.node.id}
                  file={edge.node}
                  targetObjectId={target.id}
                  variant="chip"
                  editable={editable}
                />
              )
            })}
          </>,
        )}
      </Box>
    )
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
              variant={itemVariant}
            />
          ))}
        </Box>
      )}

      {hasAttachedFiles && target.files && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Attached Files ({target.files.edges.length})
          </Typography>
          {target.files.edges.map((edge) => {
            if (!edge?.node) return null
            return (
              <AttachedFileItem
                key={edge.node.id}
                file={edge.node}
                targetObjectId={target.id}
                variant={itemVariant}
                editable={editable}
              />
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default FileUploadList
export type { FileUploadListProps } from './types'
