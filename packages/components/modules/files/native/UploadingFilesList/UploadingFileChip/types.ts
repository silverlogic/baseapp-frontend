import type { FileUploadProgress } from '../../../common/types'

export interface UploadingFileChipProps {
  fileProgress: FileUploadProgress
  allowRemove?: boolean
  allowRetry?: boolean
  shouldUseBottomSheetSafeComponents?: boolean
}
