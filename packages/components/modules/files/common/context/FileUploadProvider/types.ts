import type { FileUploadProgress } from '../../types'

export interface FileUploadState {
  files: Map<string, FileUploadProgress>
  addFile: (file: File) => string
  updateFileProgress: (id: string, progress: Partial<FileUploadProgress>) => void
  updateChunkProgress: (fileId: string, chunkIndex: number, loaded: number, total: number) => void
  removeFile: (id: string) => void
  pauseFile: (id: string) => void
  resumeFile: (id: string) => void
  retryFile: (id: string) => void
  abortFile: (id: string) => void
  clearCompleted: () => void
  getCompletedFileIds: () => string[]
  getTotalProgress: () => number
}
