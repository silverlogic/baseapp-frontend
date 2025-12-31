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
  status: FileUploadStatus
  uploadedBytes: number
  totalChunks: number
  completedChunks: number
  chunkProgress: Map<number, ChunkProgress>
  error?: string
  uploadId?: string // Backend upload ID
  fileRelayId?: string // GraphQL relay ID after completion
  etags: string[] // ETags from S3
  presignedUrls?: PresignedUrl[]
  abortController?: AbortController // For pausing/aborting uploads
}

export interface InitiateUploadResponse {
  id: number
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
