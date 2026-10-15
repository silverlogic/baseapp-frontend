import type { UploadInput } from '../../types'

export interface UseFileUploadLogicParams {
  targetObjectId?: string
  autoAttach?: boolean
  /** `uploadTokens`: tokens of anonymous uploads among them, needed to attach them later (`autoAttach: false`). */
  onUploadComplete?: (fileRelayIds: string[], uploadTokens: string[]) => void
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
