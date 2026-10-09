import { useCallback } from 'react'

import { axios } from '@baseapp-frontend/utils'

import { CHUNK_SIZE, FileUploadStatus, URL_EXPIRY_SAFETY_MARGIN_MS } from '../../constants'
import { useFileUploadStore } from '../../context/FileUploadProvider'
import type {
  CompleteUploadPart,
  InitiateUploadResponse,
  UploadInput,
  UploadSource,
} from '../../types'
import { getChunkCount, toUploadSource, uploadChunks } from '../../utils'
import type { UseChunkedUploadOptions } from './types'

const areUrlsExpired = (initiatedAt?: number, expiresIn?: number): boolean => {
  if (!initiatedAt || !expiresIn) return true
  return Date.now() >= initiatedAt + expiresIn * 1000 - URL_EXPIRY_SAFETY_MARGIN_MS
}

/** Read part `index` of `source` — the same byte range `chunkFile` would slice. */
const readChunkAt = (source: UploadSource, index: number) => {
  const start = index * CHUNK_SIZE
  return source.readChunk(start, Math.min(start + CHUNK_SIZE, source.size))
}

const buildParts = (etags: (string | undefined)[]): CompleteUploadPart[] =>
  etags.map((etag, idx) => {
    if (!etag) {
      throw new Error(`Missing ETag for part ${idx + 1}`)
    }
    return { partNumber: idx + 1, etag }
  })

export const useChunkedUpload = (options?: UseChunkedUploadOptions) => {
  // Actions are picked individually: subscribing to the whole store here would
  // re-render every consumer of this hook on each progress tick.
  const addFile = useFileUploadStore((state) => state.addFile)
  const updateFileProgress = useFileUploadStore((state) => state.updateFileProgress)
  const updateChunkProgress = useFileUploadStore((state) => state.updateChunkProgress)

  /**
   * Translate a thrown upload error into store state. A pause aborts the
   * in-flight request, which rejects here — but pauseFile has already set the
   * status to PAUSED (and abortFile to ABORTED), so those must not be clobbered
   * to FAILED or resume becomes impossible.
   */
  const handleUploadError = useCallback(
    (fileId: string, error: unknown, fallbackMessage: string) => {
      const current = useFileUploadStore.getState().files.get(fileId)
      if (
        current?.status === FileUploadStatus.PAUSED ||
        current?.status === FileUploadStatus.ABORTED
      ) {
        return
      }

      const errorMessage = error instanceof Error ? error.message : fallbackMessage
      updateFileProgress(fileId, {
        status: FileUploadStatus.FAILED,
        error: errorMessage,
      })
      options?.onUploadError?.(fileId, error instanceof Error ? error : new Error(errorMessage))
    },
    [updateFileProgress, options],
  )

  /**
   * Initiate a fresh multipart upload for `file` and upload every chunk.
   * Shared by uploadFile, retryUpload and resumeUpload (when the original
   * presigned URLs have expired).
   */
  const startUpload = useCallback(
    async (fileId: string, file: UploadSource) => {
      const { recordChunkEtag } = useFileUploadStore.getState()
      const totalChunks = getChunkCount(file.size)
      const abortController = new AbortController()

      updateFileProgress(fileId, {
        status: FileUploadStatus.PENDING,
        totalChunks,
        completedChunks: 0,
        uploadedBytes: 0,
        chunkProgress: new Map(),
        etags: [],
        error: undefined,
        abortController,
      })

      const data: InitiateUploadResponse = await axios.post('files/uploads', {
        fileName: file.name,
        fileSize: file.size,
        fileContentType: file.type,
        numParts: totalChunks,
        partSize: CHUNK_SIZE,
      })

      updateFileProgress(fileId, {
        status: FileUploadStatus.UPLOADING,
        uploadId: data.uploadId,
        backendId: data.id,
        fileRelayId: data.relayId,
        presignedUrls: data.presignedUrls,
        initiatedAt: Date.now(),
        expiresIn: data.expiresIn,
      })

      const etags = await uploadChunks({
        readChunk: (index) => readChunkAt(file, index),
        presignedUrls: data.presignedUrls.map((p) => p.url),
        abortSignal: abortController.signal,
        onProgress: (chunkIndex, loaded, total) => {
          updateChunkProgress(fileId, chunkIndex, loaded, total)
        },
        onChunkComplete: (chunkIndex, etag) => {
          recordChunkEtag(fileId, chunkIndex, etag)
        },
      })

      await axios.post(`files/uploads/${data.id}/complete`, {
        parts: buildParts(etags),
      })

      updateFileProgress(fileId, {
        status: FileUploadStatus.COMPLETED,
        etags,
        fileRelayId: data.relayId,
      })

      return data.relayId
    },
    [updateFileProgress, updateChunkProgress],
  )

  const uploadFile = useCallback(
    async (input: UploadInput, scope?: string) => {
      const file = toUploadSource(input)
      const fileId = addFile(file, scope)

      try {
        const relayId = await startUpload(fileId, file)
        options?.onUploadComplete?.(fileId, relayId)
        return relayId
      } catch (error) {
        handleUploadError(fileId, error, 'Upload failed')
        throw error
      }
    },
    [addFile, startUpload, handleUploadError, options],
  )

  const pauseUpload = useCallback((fileId: string) => {
    const { pauseFile } = useFileUploadStore.getState()
    pauseFile(fileId)
  }, [])

  const resumeUpload = useCallback(
    async (fileId: string) => {
      const { files, resumeFile, recordChunkEtag } = useFileUploadStore.getState()
      const fileProgress = files.get(fileId)

      if (!fileProgress || fileProgress.status !== FileUploadStatus.PAUSED) {
        return
      }

      resumeFile(fileId)

      try {
        const totalChunks = getChunkCount(fileProgress.file.size)
        // Chunks complete out of order (parallel uploads), so resume from the
        // per-index ETag record rather than assuming a contiguous prefix.
        const pendingIndexes = Array.from({ length: totalChunks }, (_, index) => index).filter(
          (index) => !fileProgress.etags[index],
        )

        // Every chunk already uploaded: only the (URL-free) complete call is
        // left, so URL expiry is irrelevant — go straight to complete instead
        // of discarding the whole upload.
        if (
          pendingIndexes.length > 0 &&
          areUrlsExpired(fileProgress.initiatedAt, fileProgress.expiresIn)
        ) {
          // The presigned part URLs have expired; abort the stale upload and
          // start fresh, since we cannot re-sign individual parts.
          if (fileProgress.backendId) {
            await axios.delete(`files/uploads/${fileProgress.backendId}`).catch(() => {})
          }
          const relayId = await startUpload(fileId, fileProgress.file)
          options?.onUploadComplete?.(fileId, relayId)
          return
        }

        const abortController = new AbortController()
        updateFileProgress(fileId, {
          status: FileUploadStatus.UPLOADING,
          abortController,
        })

        const allEtags = [...fileProgress.etags]
        if (pendingIndexes.length > 0) {
          const presignedUrls = fileProgress.presignedUrls ?? []
          const etags = await uploadChunks({
            readChunk: (i) => readChunkAt(fileProgress.file, pendingIndexes[i]!),
            presignedUrls: pendingIndexes.map((index) => presignedUrls[index]!.url),
            abortSignal: abortController.signal,
            onProgress: (chunkIndex, loaded, total) => {
              updateChunkProgress(fileId, pendingIndexes[chunkIndex]!, loaded, total)
            },
            onChunkComplete: (chunkIndex, etag) => {
              recordChunkEtag(fileId, pendingIndexes[chunkIndex]!, etag)
            },
          })
          pendingIndexes.forEach((originalIndex, i) => {
            allEtags[originalIndex] = etags[i]
          })
        }

        await axios.post(`files/uploads/${fileProgress.backendId}/complete`, {
          parts: buildParts(allEtags),
        })

        updateFileProgress(fileId, {
          status: FileUploadStatus.COMPLETED,
          etags: allEtags,
        })

        options?.onUploadComplete?.(fileId, fileProgress.fileRelayId!)
      } catch (error) {
        handleUploadError(fileId, error, 'Resume failed')
        throw error
      }
    },
    [startUpload, updateFileProgress, updateChunkProgress, handleUploadError, options],
  )

  const retryUpload = useCallback(
    async (fileId: string) => {
      const { files } = useFileUploadStore.getState()
      const fileProgress = files.get(fileId)

      if (!fileProgress || fileProgress.status !== FileUploadStatus.FAILED) {
        return undefined
      }

      try {
        const relayId = await startUpload(fileId, fileProgress.file)
        options?.onUploadComplete?.(fileId, relayId)
        return relayId
      } catch (error) {
        handleUploadError(fileId, error, 'Retry failed')
        throw error
      }
    },
    [startUpload, handleUploadError, options],
  )

  return { uploadFile, pauseUpload, resumeUpload, retryUpload }
}

export type { UseChunkedUploadOptions } from './types'
