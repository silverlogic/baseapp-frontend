import { create } from 'zustand'

import { FileUploadStatus } from '../../constants'
import type { FileUploadProgress } from '../../types'
import type { FileUploadState } from './types'

export const useFileUploadStore = create<FileUploadState>((set, get) => ({
  files: new Map(),

  addFile: (file: File) => {
    const id = `${Date.now()}-${file.name}-${Math.random()}`
    const fileProgress: FileUploadProgress = {
      id,
      file,
      fileName: file.name,
      fileSize: file.size,
      status: FileUploadStatus.PENDING,
      uploadedBytes: 0,
      totalChunks: 0,
      completedChunks: 0,
      chunkProgress: new Map(),
      etags: [],
    }

    set((state) => {
      const newFiles = new Map(state.files)
      newFiles.set(id, fileProgress)
      return { files: newFiles }
    })

    return id
  },

  updateFileProgress: (id: string, progress: Partial<FileUploadProgress>) => {
    set((state) => {
      const newFiles = new Map(state.files)
      const existing = newFiles.get(id)

      if (existing) {
        newFiles.set(id, { ...existing, ...progress })
      }

      return { files: newFiles }
    })
  },

  updateChunkProgress: (fileId: string, chunkIndex: number, loaded: number, total: number) => {
    set((state) => {
      const newFiles = new Map(state.files)
      const existing = newFiles.get(fileId)

      if (existing) {
        const newChunkProgress = new Map(existing.chunkProgress)
        newChunkProgress.set(chunkIndex, { loaded, total })

        let uploadedBytes = 0
        newChunkProgress.forEach((chunk) => {
          uploadedBytes += chunk.loaded
        })

        newFiles.set(fileId, {
          ...existing,
          chunkProgress: newChunkProgress,
          uploadedBytes,
        })
      }

      return { files: newFiles }
    })
  },

  removeFile: (id: string) => {
    set((state) => {
      const newFiles = new Map(state.files)
      const file = newFiles.get(id)

      if (file?.abortController) {
        file.abortController.abort()
      }

      newFiles.delete(id)
      return { files: newFiles }
    })
  },

  pauseFile: (id: string) => {
    set((state) => {
      const newFiles = new Map(state.files)
      const existing = newFiles.get(id)

      if (existing && existing.status === FileUploadStatus.UPLOADING) {
        existing.abortController?.abort()

        newFiles.set(id, {
          ...existing,
          status: FileUploadStatus.PAUSED,
          abortController: undefined,
        })
      }

      return { files: newFiles }
    })
  },

  resumeFile: (id: string) => {
    set((state) => {
      const newFiles = new Map(state.files)
      const existing = newFiles.get(id)

      if (existing && existing.status === FileUploadStatus.PAUSED) {
        newFiles.set(id, {
          ...existing,
          status: FileUploadStatus.PENDING,
        })
      }

      return { files: newFiles }
    })
  },

  retryFile: (id: string) => {
    set((state) => {
      const newFiles = new Map(state.files)
      const existing = newFiles.get(id)

      if (existing && existing.status === FileUploadStatus.FAILED) {
        newFiles.set(id, {
          ...existing,
          status: FileUploadStatus.PENDING,
          error: undefined,
          completedChunks: 0,
          uploadedBytes: 0,
          chunkProgress: new Map(),
          etags: [],
        })
      }

      return { files: newFiles }
    })
  },

  abortFile: (id: string) => {
    set((state) => {
      const newFiles = new Map(state.files)
      const existing = newFiles.get(id)

      if (existing) {
        existing.abortController?.abort()

        newFiles.set(id, {
          ...existing,
          status: FileUploadStatus.ABORTED,
          abortController: undefined,
        })
      }

      return { files: newFiles }
    })
  },

  clearCompleted: () => {
    set((state) => {
      const newFiles = new Map(state.files)

      Array.from(newFiles.entries()).forEach(([id, file]) => {
        if (file.status === FileUploadStatus.COMPLETED) {
          newFiles.delete(id)
        }
      })

      return { files: newFiles }
    })
  },

  getCompletedFileIds: () => {
    const state = get()
    return Array.from(state.files.values())
      .filter((f) => f.status === FileUploadStatus.COMPLETED && f.fileRelayId)
      .map((f) => f.fileRelayId!)
  },

  getTotalProgress: () => {
    const state = get()
    const files = Array.from(state.files.values())

    if (files.length === 0) return 0

    const totalProgress = files.reduce((sum, file) => {
      const fileProgress = file.fileSize > 0 ? (file.uploadedBytes / file.fileSize) * 100 : 0
      return sum + fileProgress
    }, 0)

    return totalProgress / files.length
  },
}))

export type { FileUploadState } from './types'
