import { useCallback } from 'react'

import { axios } from '@baseapp-frontend/utils'

import { CHUNK_SIZE, FileUploadStatus, URL_EXPIRY_SAFETY_MARGIN_MS } from '../../constants'
import { useFileUploadStore } from '../../context/FileUploadProvider'
import { useFileUpload } from '../../context/useFileUpload'
import type { CompleteUploadPart, InitiateUploadResponse } from '../../types'
import { chunkFile, uploadChunks } from '../../utils'
import type { UseChunkedUploadOptions } from './types'

const areUrlsExpired = (initiatedAt?: number, expiresIn?: number): boolean => {
  if (!initiatedAt || !expiresIn) return true
  return Date.now() >= initiatedAt + expiresIn * 1000 - URL_EXPIRY_SAFETY_MARGIN_MS
}

const buildParts = (etags: (string | undefined)[]): CompleteUploadPart[] =>
  etags.map((etag, idx) => {
    if (!etag) {
      throw new Error(`Missing ETag for part ${idx + 1}`)
    }
    return { partNumber: idx + 1, etag }
  })

export const useChunkedUpload = (options?: UseChunkedUploadOptions) => {
  const { addFile, updateFileProgress, updateChunkProgress } = useFileUpload()

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
    async (fileId: string, file: File) => {
      const { recordChunkEtag } = useFileUploadStore.getState()
      const chunks = chunkFile(file)
      const abortController = new AbortController()

      updateFileProgress(fileId, {
        status: FileUploadStatus.PENDING,
        totalChunks: chunks.length,
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
        numParts: chunks.length,
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
        chunks,
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
      })

      return data.relayId
    },
    [updateFileProgress, updateChunkProgress],
  )

  const uploadFile = useCallback(
    async (file: File, scope?: string) => {
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
        const chunks = chunkFile(fileProgress.file)
        // Chunks complete out of order (parallel uploads), so resume from the
        // per-index ETag record rather than assuming a contiguous prefix.
        const pendingIndexes = chunks
          .map((_, index) => index)
          .filter((index) => !fileProgress.etags[index])

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
            chunks: pendingIndexes.map((index) => chunks[index]!),
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
