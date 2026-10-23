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
  uploadToken?: string // Anonymous uploads only: proves ownership on complete, abort and attach
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
  /** Only for anonymous uploads. */
  uploadToken?: string
}

export interface CompleteUploadPart {
  partNumber: number
  etag: string
}

/**
 * A file the backend serves only through permission-checked downloads: the `ProtectedFile`
 * GraphQL type, or `ProtectedFileSerializerField` from REST once its keys are camel-cased. The
 * field holding it is null when the file is empty or the viewer may not download it.
 */
export interface ProtectedFile {
  /** Registry key of the file field, e.g. `billing.invoice.pdf`. */
  key: string
  /** Id of the object holding the file. */
  objectId: string
  fileName?: string | null
  contentType?: string | null
  /** Size in bytes; null when unknown. */
  size?: number | null
}

/** `attachment` saves the file; `inline` opens it in a new tab. */
export type ProtectedFileDisposition = 'attachment' | 'inline'
