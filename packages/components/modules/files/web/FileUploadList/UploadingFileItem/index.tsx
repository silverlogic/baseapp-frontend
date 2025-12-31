'use client'

import type { FC } from 'react'

import {
  Close as CloseIcon,
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  Replay as ReplayIcon,
} from '@mui/icons-material'
import { Box, Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material'

import { FileUploadStatus } from '../../../common/constants'
import { useFileUpload } from '../../../common/context/useFileUpload'
import { useChunkedUpload } from '../../../common/hooks/useChunkedUpload'
import type { FileUploadProgress } from '../../../common/types'
import FileProgress from './FileProgress'

interface UploadingFileItemProps {
  fileProgress: FileUploadProgress
  allowRemove?: boolean
  allowRetry?: boolean
}

const UploadingFileItem: FC<UploadingFileItemProps> = ({
  fileProgress,
  allowRemove = true,
  allowRetry = true,
}) => {
  const { removeFile, pauseFile, resumeFile } = useFileUpload()
  const { resumeUpload, retryUpload } = useChunkedUpload()

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const getProgress = (): number => {
    if (fileProgress.status === FileUploadStatus.COMPLETED) return 100
    if (fileProgress.fileSize === 0) return 0
    return (fileProgress.uploadedBytes / fileProgress.fileSize) * 100
  }

  const handleRemove = () => {
    removeFile(fileProgress.id)
  }

  const handleRetry = () => {
    retryUpload(fileProgress.id)
  }

  const handlePause = () => {
    pauseFile(fileProgress.id)
  }

  const handleResume = () => {
    resumeFile(fileProgress.id)
    resumeUpload(fileProgress.id)
  }

  const canRemove =
    allowRemove &&
    [
      FileUploadStatus.PENDING,
      FileUploadStatus.FAILED,
      FileUploadStatus.PAUSED,
      FileUploadStatus.ABORTED,
    ].includes(fileProgress.status)

  const canRetry = allowRetry && fileProgress.status === FileUploadStatus.FAILED

  const canPause = fileProgress.status === FileUploadStatus.UPLOADING

  const canResume = fileProgress.status === FileUploadStatus.PAUSED

  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1, mr: 2 }}>
              <Typography variant="body2" noWrap>
                {fileProgress.fileName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(fileProgress.fileSize)}
              </Typography>
            </Box>

            <Stack direction="row" spacing={0.5}>
              {canPause && (
                <IconButton size="small" onClick={handlePause} title="Pause">
                  <PauseIcon fontSize="small" />
                </IconButton>
              )}

              {canResume && (
                <IconButton size="small" onClick={handleResume} title="Resume">
                  <PlayArrowIcon fontSize="small" />
                </IconButton>
              )}

              {canRetry && (
                <IconButton size="small" onClick={handleRetry} color="error" title="Retry">
                  <ReplayIcon fontSize="small" />
                </IconButton>
              )}

              {canRemove && (
                <IconButton size="small" onClick={handleRemove} title="Remove">
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Box>

          <FileProgress progress={getProgress()} status={fileProgress.status} />

          {fileProgress.error && <Chip label={fileProgress.error} color="error" size="small" />}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default UploadingFileItem
