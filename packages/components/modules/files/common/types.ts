import { FileUploadStatus } from './constants'

export interface ChunkProgress {
  loaded: number
  total: number
}

export interface PresignedUrl {
  partNumber: number
  url: string
}

export interface FileUploadProgress {
  id: string // Local ID for tracking
  file: File // Original File object
  fileName: string
  fileSize: number
  /** Owner of this upload (e.g. a target id, or a composer instance) — lets each list show only its own uploads. */
  scope?: string
  status: FileUploadStatus
  uploadedBytes: number
  totalChunks: number
  completedChunks: number
  chunkProgress: Map<number, ChunkProgress>
  error?: string
  uploadId?: string // Backend upload ID
  backendId?: string // Backend file id (public_id) for upload endpoints
  fileRelayId?: string // GraphQL relay ID after completion
  etags: (string | undefined)[] // ETags from S3, sparse-indexed by chunk
  presignedUrls?: PresignedUrl[]
  initiatedAt?: number // Epoch ms when the upload was initiated
  expiresIn?: number // Presigned URL lifetime in seconds
  abortController?: AbortController // For pausing/aborting uploads
}

export interface InitiateUploadResponse {
  id: string
  relayId: string
  uploadId: string
  uploadStatus: string
  expiresIn: number
  presignedUrls: PresignedUrl[]
}

export interface CompleteUploadPart {
  partNumber: number
  etag: string
}
