import { MAX_CONCURRENT_CHUNKS, RETRY_ATTEMPTS, RETRY_DELAY } from '../constants'
import type { UploadChunkBody } from '../types'
import { uploadChunk } from './uploadChunk'

interface UploadChunksBaseOptions {
  presignedUrls: string[]
  abortSignal?: AbortSignal
  onProgress?: (chunkIndex: number, loaded: number, total: number) => void
  onChunkComplete?: (chunkIndex: number, etag: string) => void
  maxConcurrent?: number
  retryAttempts?: number
  retryDelay?: number
}

interface EagerChunksOptions extends UploadChunksBaseOptions {
  chunks: UploadChunkBody[]
  readChunk?: never
}

/**
 * Lazy mode: each chunk is read only once it has a concurrency slot, so at most
 * `maxConcurrent` chunks are held in memory. Native needs this — its chunks are real
 * byte copies, not the free `Blob.slice` references web gets.
 */
interface LazyChunksOptions extends UploadChunksBaseOptions {
  chunks?: never
  readChunk: (chunkIndex: number) => Promise<UploadChunkBody>
}

type UploadChunksOptions = EagerChunksOptions | LazyChunksOptions

export async function uploadChunks(options: UploadChunksOptions): Promise<string[]> {
  const {
    presignedUrls,
    abortSignal,
    onProgress,
    onChunkComplete,
    maxConcurrent = MAX_CONCURRENT_CHUNKS,
    retryAttempts = RETRY_ATTEMPTS,
    retryDelay = RETRY_DELAY,
  } = options

  const { chunks } = options
  if (chunks && chunks.length !== presignedUrls.length) {
    throw new Error('Chunks and presigned URLs count mismatch')
  }

  const getChunk = async (chunkIndex: number): Promise<UploadChunkBody> => {
    if (chunks) {
      const chunk = chunks[chunkIndex]
      if (!chunk) throw new Error(`Missing chunk or URL at index ${chunkIndex}`)
      return chunk
    }
    return options.readChunk!(chunkIndex)
  }

  const etags: string[] = new Array(presignedUrls.length)
  const activeUploads = new Map<Promise<void>, number>()

  const uploadChunkWithRetry = async (
    chunkIndex: number,
    chunk: UploadChunkBody,
    url: string,
    attempt = 0,
  ): Promise<void> => {
    try {
      const etag = await uploadChunk(chunk, url, abortSignal, (loaded, total) => {
        onProgress?.(chunkIndex, loaded, total)
      })

      etags[chunkIndex] = etag
      onChunkComplete?.(chunkIndex, etag)
      return undefined
    } catch (error) {
      if (abortSignal?.aborted) {
        throw error
      }

      if (attempt < retryAttempts) {
        await new Promise((resolve) => {
          setTimeout(resolve, retryDelay * 2 ** attempt)
        })
        // Retries reuse the bytes already read rather than reading the chunk again.
        return uploadChunkWithRetry(chunkIndex, chunk, url, attempt + 1)
      }

      throw new Error(
        `Failed to upload chunk ${chunkIndex} after ${retryAttempts} attempts: ${error}`,
      )
    }
  }

  for (let i = 0; i < presignedUrls.length; i += 1) {
    const url = presignedUrls[i]
    if (!url) {
      throw new Error(`Missing chunk or URL at index ${i}`)
    }

    // Wait if we've hit the concurrency limit
    while (activeUploads.size >= maxConcurrent) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.race(activeUploads.keys())
    }

    // Read inside the slot so lazy mode never holds more than maxConcurrent chunks.
    const uploadPromise = getChunk(i).then((chunk) => uploadChunkWithRetry(i, chunk, url))
    activeUploads.set(uploadPromise, i)

    // Remove from active uploads when complete
    uploadPromise
      .then(() => {
        activeUploads.delete(uploadPromise)
      })
      .catch(() => {
        activeUploads.delete(uploadPromise)
      })
  }

  // Wait for all remaining uploads to complete
  await Promise.all(activeUploads.keys())

  return etags
}
