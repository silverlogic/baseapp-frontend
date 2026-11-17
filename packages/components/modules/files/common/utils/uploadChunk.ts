import type { UploadChunkBody } from '../types'

export type ChunkUploadError = Error & { response?: { status: number; data?: unknown } }

const parseJsonBody = (text: string): unknown => {
  try {
    const data = JSON.parse(text)
    return data && typeof data === 'object' ? data : undefined
  } catch {
    return undefined
  }
}

export async function uploadChunk(
  chunk: UploadChunkBody,
  presignedUrl: string,
  abortSignal?: AbortSignal,
  onProgress?: (loaded: number, total: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    // A pause/remove during a retry backoff or a slow read must not start a new PUT.
    if (abortSignal?.aborted) {
      reject(new Error('Chunk upload aborted'))
      return
    }

    const xhr = new XMLHttpRequest()

    // Set up progress tracking
    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          onProgress(event.loaded, event.total)
        }
      })
    }

    // Handle successful completion
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const etag = xhr.getResponseHeader('ETag')?.replace(/"/g, '')
        if (!etag) {
          reject(new Error('No ETag in response'))
        } else {
          resolve(etag)
        }
      } else {
        // Keep the body so the backend's reason reaches the user (getApiErrorMessage).
        const error: ChunkUploadError = new Error(
          `Chunk upload failed: ${xhr.status} ${xhr.statusText}`,
        )
        error.response = { status: xhr.status, data: parseJsonBody(xhr.responseText) }
        reject(error)
      }
    })

    // Handle errors
    xhr.addEventListener('error', () => {
      reject(new Error('Chunk upload failed: Network error'))
    })

    // Handle abort
    xhr.addEventListener('abort', () => {
      reject(new Error('Chunk upload aborted'))
    })

    // Connect abort signal
    if (abortSignal) {
      abortSignal.addEventListener('abort', () => {
        xhr.abort()
      })
    }

    // Start the upload
    xhr.open('PUT', presignedUrl)
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')
    xhr.send(chunk)
  })
}
