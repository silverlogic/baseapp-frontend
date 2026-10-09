import type { FileUploadProgress } from '../../../common/types'

export interface UploadingFileItemProps {
  fileProgress: FileUploadProgress
  allowRemove?: boolean
  allowRetry?: boolean
  variant?: 'card' | 'chip'
}
