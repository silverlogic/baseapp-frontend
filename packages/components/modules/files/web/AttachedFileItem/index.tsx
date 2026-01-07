'use client'

import type { FC } from 'react'

import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material'
import { Box, Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import type { FileItem_file$key } from '../../../../__generated__/FileItem_file.graphql'
import { FileItemFragment } from '../../common/graphql/fragments/FileItem'
import { useFileDeleteLogic } from '../../common/hooks/useFileDeleteLogic'
import { useFileDownloadLogic } from '../../common/hooks/useFileDownloadLogic'
import { formatDate, formatFileSize, getFileType, isImageFile } from '../../common/utils/formatters'

interface AttachedFileItemProps {
  file: FileItem_file$key
  targetObjectId?: string
}

const AttachedFileItem: FC<AttachedFileItemProps> = ({ file: fileRef, targetObjectId }) => {
  const file = useFragment(FileItemFragment, fileRef)

  const { handleDelete, isDeletingFile } = useFileDeleteLogic({ targetObjectId })

  const { handleDownload } = useFileDownloadLogic({
    downloadHandler: (url) => {
      window.open(url, '_blank')
    },
  })

  const canChangeFile = file.hasPerm || false

  const getFileIcon = () => {
    const fileType = getFileType(file.fileContentType)

    switch (fileType) {
      case 'image':
        return <FileIcon color="primary" />
      case 'video':
        return <FileIcon color="secondary" />
      case 'pdf':
        return <FileIcon color="error" />
      default:
        return <FileIcon />
    }
  }

  const isImage = isImageFile(file.fileContentType)

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
              <IconButton size="small" onClick={() => handleDownload(file.file)} title="Download">
                <DownloadIcon fontSize="small" />
              </IconButton>

              {canChangeFile && (
                <IconButton
                  size="small"
                  onClick={() => handleDelete(file.id)}
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
