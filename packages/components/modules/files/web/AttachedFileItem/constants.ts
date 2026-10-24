import { MessageDescriptor, defineMessages } from 'react-intl'

const UPLOAD_STATUS_MESSAGES = defineMessages({
  pending: { id: 'files.attachedFileItem.uploadStatus.pending', defaultMessage: 'Pending' },
  uploading: { id: 'files.attachedFileItem.uploadStatus.uploading', defaultMessage: 'Uploading' },
  failed: { id: 'files.attachedFileItem.uploadStatus.failed', defaultMessage: 'Failed' },
  aborted: { id: 'files.attachedFileItem.uploadStatus.aborted', defaultMessage: 'Aborted' },
})

export const UPLOAD_STATUS_LABELS: Partial<Record<string, MessageDescriptor>> = {
  PENDING: UPLOAD_STATUS_MESSAGES.pending,
  UPLOADING: UPLOAD_STATUS_MESSAGES.uploading,
  FAILED: UPLOAD_STATUS_MESSAGES.failed,
  ABORTED: UPLOAD_STATUS_MESSAGES.aborted,
}
