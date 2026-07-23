export interface UseFileDeleteLogicParams {
  targetObjectId?: string
  onDeleteComplete?: () => void
  onError?: (error: Error) => void
}

export interface UseFileDeleteLogicReturn {
  handleDelete: (fileId: string) => void
  isDeletingFile: boolean
}
