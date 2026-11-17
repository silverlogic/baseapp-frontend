import { FileUploadStatus } from '../constants'
import type { FileUploadProgress } from '../types'
import { calculateProgress } from './formatters'

const REMOVABLE_STATUSES = [
  FileUploadStatus.PENDING,
  FileUploadStatus.FAILED,
  FileUploadStatus.PAUSED,
  FileUploadStatus.ABORTED,
  // Uploaded but not yet attached (e.g. a new comment) — let the user undo it.
  FileUploadStatus.COMPLETED,
]

export interface UploadItemActions {
  canPause: boolean
  canResume: boolean
  canRetry: boolean
  canRemove: boolean
}

/** Which controls an in-progress upload offers; shared so both platforms agree. */
export const getUploadItemActions = (
  status: FileUploadStatus,
  { allowRemove = true, allowRetry = true }: { allowRemove?: boolean; allowRetry?: boolean } = {},
): UploadItemActions => ({
  canPause: status === FileUploadStatus.UPLOADING,
  canResume: status === FileUploadStatus.PAUSED,
  canRetry: allowRetry && status === FileUploadStatus.FAILED,
  canRemove: allowRemove && REMOVABLE_STATUSES.includes(status),
})

export const getUploadPercent = (
  fileProgress: Pick<FileUploadProgress, 'status' | 'uploadedBytes' | 'fileSize'>,
): number =>
  fileProgress.status === FileUploadStatus.COMPLETED
    ? 100
    : calculateProgress(fileProgress.uploadedBytes, fileProgress.fileSize)
