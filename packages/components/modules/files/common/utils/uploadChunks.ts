import { MAX_CONCURRENT_CHUNKS, RETRY_ATTEMPTS, RETRY_DELAY } from '../constants'
import { uploadChunk } from './uploadChunk'

interface UploadChunksOptions {
  chunks: Blob[]
  presignedUrls: string[]
  abortSignal?: AbortSignal
  onProgress?: (chunkIndex: number, loaded: number, total: number) => void
  onChunkComplete?: (chunkIndex: number, etag: string) => void
  maxConcurrent?: number
  retryAttempts?: number
  retryDelay?: number
}

export async function uploadChunks({
  chunks,
  presignedUrls,
  abortSignal,
  onProgress,
  onChunkComplete,
  maxConcurrent = MAX_CONCURRENT_CHUNKS,
  retryAttempts = RETRY_ATTEMPTS,
  retryDelay = RETRY_DELAY,
}: UploadChunksOptions): Promise<string[]> {
  if (chunks.length !== presignedUrls.length) {
    throw new Error('Chunks and presigned URLs count mismatch')
  }

  const etags: string[] = new Array(chunks.length)
  const activeUploads = new Map<Promise<void>, number>()

  const uploadChunkWithRetry = async (
    chunkIndex: number,
    chunk: Blob,
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
        return uploadChunkWithRetry(chunkIndex, chunk, url, attempt + 1)
      }

      throw new Error(
        `Failed to upload chunk ${chunkIndex} after ${retryAttempts} attempts: ${error}`,
      )
    }
  }

  for (let i = 0; i < chunks.length; i += 1) {
    const chunk = chunks[i]
    const url = presignedUrls[i]
    if (!chunk || !url) {
      throw new Error(`Missing chunk or URL at index ${i}`)
    }

    // Wait if we've hit the concurrency limit
    while (activeUploads.size >= maxConcurrent) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.race(activeUploads.keys())
    }

    const uploadPromise = uploadChunkWithRetry(i, chunk, url)
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
