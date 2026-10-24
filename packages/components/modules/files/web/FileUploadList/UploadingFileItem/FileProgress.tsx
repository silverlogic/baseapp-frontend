'use client'

import type { FC } from 'react'

import { Box, LinearProgress, Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { FileUploadStatus } from '../../../common/constants'

interface FileProgressProps {
  progress: number
  status: FileUploadStatus
}

const FileProgress: FC<FileProgressProps> = ({ progress, status }) => {
  const intl = useIntl()
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
        return intl.formatMessage({ id: 'files.progress.pending', defaultMessage: 'Pending...' })
      case FileUploadStatus.UPLOADING:
        return intl.formatMessage(
          { id: 'files.progress.uploading', defaultMessage: 'Uploading {progress}%' },
          { progress: Math.round(progress) },
        )
      case FileUploadStatus.PAUSED:
        return intl.formatMessage({ id: 'files.progress.paused', defaultMessage: 'Paused' })
      case FileUploadStatus.COMPLETED:
        return intl.formatMessage({ id: 'files.progress.completed', defaultMessage: 'Completed' })
      case FileUploadStatus.FAILED:
        return intl.formatMessage({ id: 'files.progress.failed', defaultMessage: 'Failed' })
      case FileUploadStatus.ABORTED:
        return intl.formatMessage({ id: 'files.progress.aborted', defaultMessage: 'Aborted' })
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
