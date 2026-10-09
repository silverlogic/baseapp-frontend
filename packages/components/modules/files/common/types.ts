import { FileUploadStatus } from './constants'

export interface ChunkProgress {
  loaded: number
  total: number
}

export interface PresignedUrl {
  partNumber: number
  url: string
}

/** A chunk body XHR can send on both platforms (RN base64-bridges typed arrays). */
export type UploadChunkBody = Blob | Uint8Array

/**
 * What the uploader needs from a file, independent of platform. A web `File` is
 * wrapped automatically; a native leg builds one over its own file API. `readChunk`
 * is called lazily, one chunk at a time, so a large file is never held in memory.
 */
export interface UploadSource {
  name: string
  size: number
  type: string
  /** Read bytes `[start, end)`. */
  readChunk: (start: number, end: number) => Promise<UploadChunkBody>
  /** Frees anything the source created (e.g. a temp copy); called when the upload leaves the store. */
  dispose?: () => void
}

/** Anything the uploader accepts: a web `File`, or a platform-built source. */
export type UploadInput = File | UploadSource

/** Accepted types, keyed by MIME pattern (`image/*`) with extensions (`.png`) as values. */
export type Accept = Record<string, string[]>

export interface FileUploadProgress {
  id: string // Local ID for tracking
  file: UploadSource
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
