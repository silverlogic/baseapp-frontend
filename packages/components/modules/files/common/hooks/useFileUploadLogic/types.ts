import type { UploadInput } from '../../types'

export interface UseFileUploadLogicParams {
  targetObjectId?: string
  autoAttach?: boolean
  onUploadComplete?: (fileRelayIds: string[]) => void
  onAttachComplete?: () => void
  onError?: (error: Error) => void
}

export interface UseFileUploadLogicReturn {
  handleFilesSelected: (selectedFiles: UploadInput[]) => Promise<void>
  isAttaching: boolean
  resetKey: number
}

export interface AttachOptions {
  /** Clear this target's scope once the mutation lands (batch submits only). */
  clearAfter: boolean
}
