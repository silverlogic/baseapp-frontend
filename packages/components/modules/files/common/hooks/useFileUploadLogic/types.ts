export interface UseFileUploadLogicParams {
  targetObjectId?: string
  autoAttach?: boolean
  onUploadComplete?: (fileRelayIds: string[]) => void
  onAttachComplete?: () => void
  onError?: (error: Error) => void
}

export interface UseFileUploadLogicReturn {
  handleFilesSelected: (selectedFiles: File[]) => Promise<void>
  isAttaching: boolean
  resetKey: number
}
