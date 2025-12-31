import { useCallback } from 'react'

import { axios } from '@baseapp-frontend/utils'

import { CHUNK_SIZE, FileUploadStatus } from '../../constants'
import { useFileUploadStore } from '../../context/FileUploadProvider'
import { useFileUpload } from '../../context/useFileUpload'
import type { CompleteUploadPart, InitiateUploadResponse } from '../../types'
import { chunkFile, uploadChunks } from '../../utils'
import type { UploadFileOptions, UseChunkedUploadOptions } from './types'

export const useChunkedUpload = (options?: UseChunkedUploadOptions) => {
  const { addFile, updateFileProgress, updateChunkProgress } = useFileUpload()

  const uploadFile = useCallback(
    async (file: File, uploadOptions?: UploadFileOptions) => {
      const fileId = addFile(file)

      try {
        const chunks = chunkFile(file)
        const abortController = new AbortController()

        updateFileProgress(fileId, {
          totalChunks: chunks.length,
          abortController,
        })

        const data: InitiateUploadResponse = await axios.post('files/uploads', {
          fileName: file.name,
          fileSize: file.size,
          fileContentType: file.type,
          numParts: chunks.length,
          partSize: CHUNK_SIZE,
          ...(uploadOptions?.targetObjectId &&
            uploadOptions?.parentContentType && {
              parentContentType: uploadOptions.parentContentType,
              parentObjectId: uploadOptions.targetObjectId,
            }),
        })

        updateFileProgress(fileId, {
          status: FileUploadStatus.UPLOADING,
          uploadId: data.uploadId,
          fileRelayId: data.relayId,
          presignedUrls: data.presignedUrls,
        })

        const etags = await uploadChunks({
          chunks,
          presignedUrls: data.presignedUrls.map((p: { url: string }) => p.url),
          abortSignal: abortController.signal,
          onProgress: (chunkIndex, loaded, total) => {
            updateChunkProgress(fileId, chunkIndex, loaded, total)
          },
          onChunkComplete: (chunkIndex) => {
            updateFileProgress(fileId, {
              completedChunks: chunkIndex + 1,
            })
          },
        })

        const parts: CompleteUploadPart[] = etags.map((etag, idx) => ({
          partNumber: idx + 1,
          etag,
        }))

        await axios.post(`files/uploads/${data.id}/complete`, {
          parts,
        })

        updateFileProgress(fileId, {
          status: FileUploadStatus.COMPLETED,
          etags,
        })

        options?.onUploadComplete?.(fileId, data.relayId)

        return data.relayId
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed'

        updateFileProgress(fileId, {
          status: FileUploadStatus.FAILED,
          error: errorMessage,
        })

        options?.onUploadError?.(fileId, error instanceof Error ? error : new Error(errorMessage))

        throw error
      }
    },
    [addFile, updateFileProgress, updateChunkProgress, options],
  )

  const pauseUpload = useCallback((fileId: string) => {
    const { pauseFile } = useFileUploadStore.getState()
    pauseFile(fileId)
  }, [])

  const resumeUpload = useCallback(
    async (fileId: string) => {
      const { resumeFile } = useFileUploadStore.getState()
      const { files } = useFileUploadStore.getState()
      const fileProgress = files.get(fileId)

      if (!fileProgress || fileProgress.status !== FileUploadStatus.PAUSED) {
        return
      }

      resumeFile(fileId)

      try {
        const chunks = chunkFile(fileProgress.file)
        const abortController = new AbortController()

        updateFileProgress(fileId, {
          status: FileUploadStatus.UPLOADING,
          abortController,
        })

        const { completedChunks } = fileProgress
        const remainingChunks = chunks.slice(completedChunks)
        const remainingUrls =
          fileProgress.presignedUrls?.slice(completedChunks).map((p: { url: string }) => p.url) ||
          []

        const etags = await uploadChunks({
          chunks: remainingChunks,
          presignedUrls: remainingUrls,
          abortSignal: abortController.signal,
          onProgress: (chunkIndex, loaded, total) => {
            updateChunkProgress(fileId, completedChunks + chunkIndex, loaded, total)
          },
          onChunkComplete: (chunkIndex) => {
            updateFileProgress(fileId, {
              completedChunks: completedChunks + chunkIndex + 1,
            })
          },
        })

        const allEtags = [...fileProgress.etags, ...etags]

        const parts: CompleteUploadPart[] = allEtags.map((etag, idx) => ({
          partNumber: idx + 1,
          etag,
        }))

        await axios.post(`files/uploads/${fileProgress.id}/complete`, {
          parts,
        })

        updateFileProgress(fileId, {
          status: FileUploadStatus.COMPLETED,
          etags: allEtags,
        })

        options?.onUploadComplete?.(fileId, fileProgress.fileRelayId!)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Resume failed'

        updateFileProgress(fileId, {
          status: FileUploadStatus.FAILED,
          error: errorMessage,
        })

        options?.onUploadError?.(fileId, error instanceof Error ? error : new Error(errorMessage))

        throw error
      }
    },
    [updateFileProgress, updateChunkProgress, options],
  )

  const retryUpload = useCallback(
    async (fileId: string, uploadOptions?: UploadFileOptions) => {
      const { files } = useFileUploadStore.getState()
      const fileProgress = files.get(fileId)

      if (!fileProgress || fileProgress.status !== FileUploadStatus.FAILED) {
        return undefined
      }

      const { file } = fileProgress

      try {
        const chunks = chunkFile(file)
        const abortController = new AbortController()

        updateFileProgress(fileId, {
          status: FileUploadStatus.UPLOADING,
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
          ...(uploadOptions?.targetObjectId &&
            uploadOptions?.parentContentType && {
              parentContentType: uploadOptions.parentContentType,
              parentObjectId: uploadOptions.targetObjectId,
            }),
        })

        updateFileProgress(fileId, {
          uploadId: data.uploadId,
          fileRelayId: data.relayId,
          presignedUrls: data.presignedUrls,
        })

        const etags = await uploadChunks({
          chunks,
          presignedUrls: data.presignedUrls.map((p: { url: string }) => p.url),
          abortSignal: abortController.signal,
          onProgress: (chunkIndex, loaded, total) => {
            updateChunkProgress(fileId, chunkIndex, loaded, total)
          },
          onChunkComplete: (chunkIndex) => {
            updateFileProgress(fileId, {
              completedChunks: chunkIndex + 1,
            })
          },
        })

        const parts: CompleteUploadPart[] = etags.map((etag, idx) => ({
          partNumber: idx + 1,
          etag,
        }))

        await axios.post(`files/uploads/${data.id}/complete`, {
          parts,
        })

        updateFileProgress(fileId, {
          status: FileUploadStatus.COMPLETED,
          etags,
        })

        options?.onUploadComplete?.(fileId, data.relayId)

        return data.relayId
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Retry failed'

        updateFileProgress(fileId, {
          status: FileUploadStatus.FAILED,
          error: errorMessage,
        })

        options?.onUploadError?.(fileId, error instanceof Error ? error : new Error(errorMessage))

        throw error
      }
    },
    [updateFileProgress, updateChunkProgress, options],
  )

  return { uploadFile, pauseUpload, resumeUpload, retryUpload }
}

export type { UseChunkedUploadOptions, UploadFileOptions } from './types'
