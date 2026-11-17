import type { UploadSource } from '../../../common/types'
import type { FileSelectionLimits } from '../../../common/utils/filterSelectedFiles'

export interface UseNativeFilePickerParams extends FileSelectionLimits {
  onFilesSelected: (files: UploadSource[]) => void
  disabled?: boolean
}

export interface UseNativeFilePickerReturn {
  /** Opens the photo library (multi-select). */
  pickImages: () => Promise<void>
  /** Opens the system document picker. */
  pickDocuments: () => Promise<void>
  /** True while a picked file is being prepared for upload. */
  isPreparing: boolean
}
