import { defineMessages } from 'react-intl'

export const UPLOAD_ERROR_MESSAGES = defineMessages({
  toast: { id: 'files.toast.uploadError', defaultMessage: '{fileName}: {error}' },
  fallbackFileName: { id: 'files.toast.fallbackFileName', defaultMessage: 'File' },
  uploadFailed: { id: 'files.upload.failed', defaultMessage: 'Upload failed' },
  resumeFailed: { id: 'files.upload.resumeFailed', defaultMessage: 'Resume failed' },
  retryFailed: { id: 'files.upload.retryFailed', defaultMessage: 'Retry failed' },
})
