'use client'

import type { FC } from 'react'

import { Box, LinearProgress, Typography } from '@mui/material'

import { FileUploadStatus } from '../../../common/constants'

interface FileProgressProps {
  progress: number
  status: FileUploadStatus
}

const FileProgress: FC<FileProgressProps> = ({ progress, status }) => {
  const getColor = () => {
    switch (status) {
      case FileUploadStatus.UPLOADING:
        return 'primary'
      case FileUploadStatus.COMPLETED:
        return 'success'
      case FileUploadStatus.FAILED:
        return 'error'
      case FileUploadStatus.PAUSED:
        return 'warning'
      default:
        return 'primary'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case FileUploadStatus.PENDING:
        return 'Pending...'
      case FileUploadStatus.UPLOADING:
        return `Uploading ${Math.round(progress)}%`
      case FileUploadStatus.PAUSED:
        return 'Paused'
      case FileUploadStatus.COMPLETED:
        return 'Completed'
      case FileUploadStatus.FAILED:
        return 'Failed'
      case FileUploadStatus.ABORTED:
        return 'Aborted'
      default:
        return ''
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {getStatusText()}
        </Typography>
        {status === FileUploadStatus.UPLOADING && (
          <Typography variant="caption" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        )}
      </Box>
      <LinearProgress variant="determinate" value={progress} color={getColor()} />
    </Box>
  )
}

export default FileProgress
