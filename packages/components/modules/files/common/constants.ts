export const CHUNK_SIZE = 5 * 1024 * 1024 // 5MB - Backend minimum for multipart (except last part)
export const MAX_CONCURRENT_CHUNKS = 3 // Limit concurrent uploads to avoid overwhelming browser
export const RETRY_ATTEMPTS = 3
export const RETRY_DELAY = 1000 // ms

export enum FileUploadStatus {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  FAILED = 'failed',
  ABORTED = 'aborted',
}
