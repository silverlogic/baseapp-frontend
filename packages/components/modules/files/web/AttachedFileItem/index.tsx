'use client'

import type { FC } from 'react'

import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material'
import { Box, Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material'
import { ConnectionHandler, useFragment } from 'react-relay'

import type { FileItem_file$key } from '../../../../__generated__/FileItem_file.graphql'
import { FileItemFragment } from '../../common/graphql/fragments/FileItem'
import { useFileDeleteMutation } from '../../common/graphql/mutations/FileDelete'

interface AttachedFileItemProps {
  file: FileItem_file$key
  targetObjectId?: string
}

const AttachedFileItem: FC<AttachedFileItemProps> = ({ file: fileRef, targetObjectId }) => {
  const file = useFragment(FileItemFragment, fileRef)
  const [deleteFile, isDeletingFile] = useFileDeleteMutation()

  const canChangeFile = file.hasPerm || false

  const formatFileSize = (bytes: number | null | undefined): string => {
    if (!bytes) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleDownload = () => {
    if (file.file) {
      window.open(file.file, '_blank')
    }
  }

  const handleDelete = () => {
    if (!targetObjectId) {
      console.error('Target object ID is required for deleting file')
      return
    }

    const connectionID = ConnectionHandler.getConnectionID(targetObjectId, 'FilesList_files')

    deleteFile({
      variables: {
        input: {
          id: file.id,
        },
        connections: [connectionID],
      },
    })
  }

  const getFileIcon = () => {
    const contentType = file.fileContentType || ''

    if (contentType.startsWith('image/')) {
      return <FileIcon color="primary" />
    }
    if (contentType.startsWith('video/')) {
      return <FileIcon color="secondary" />
    }
    if (contentType === 'application/pdf') {
      return <FileIcon color="error" />
    }
    return <FileIcon />
  }

  const isImage = file.fileContentType?.startsWith('image/')

  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1, mr: 2, minWidth: 0 }}>
              <Box sx={{ mr: 1, mt: 0.5, flexShrink: 0 }}>
                {isImage && file.thumbnail ? (
                  <Box
                    component="img"
                    src={file.thumbnail}
                    alt={file.fileName || 'File preview'}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                ) : (
                  getFileIcon()
                )}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                <Typography variant="body2" noWrap>
                  {file.fileName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(file.fileSize)} • {formatDate(file.created)}
                </Typography>
                {file.createdBy && file.createdBy.fullName && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Uploaded by {file.createdBy.fullName}
                  </Typography>
                )}
              </Box>
            </Box>

            <Stack direction="row" spacing={0.5}>
              <IconButton size="small" onClick={handleDownload} title="Download">
                <DownloadIcon fontSize="small" />
              </IconButton>

              {canChangeFile && (
                <IconButton
                  size="small"
                  onClick={handleDelete}
                  color="error"
                  title="Delete"
                  disabled={isDeletingFile}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Box>

          {file.uploadStatus && file.uploadStatus !== 'COMPLETED' && (
            <Chip label={`Status: ${file.uploadStatus}`} size="small" color="warning" />
          )}

          {file.description && (
            <Typography variant="caption" color="text.secondary">
              {file.description}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default AttachedFileItem
