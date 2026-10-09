import type { ReactNode } from 'react'

export interface FileChipProps {
  name: string
  contentType?: string | null
  thumbnailUrl?: string | null
  /** Caption under the name (size, type, error), or a progress bar while uploading. */
  subtitle?: ReactNode
  /** Trailing control, e.g. remove. */
  action?: ReactNode
  onPress?: () => void
  /** Use gorhom's touchables inside a bottom sheet, where Pressable loses its gestures. */
  shouldUseBottomSheetSafeComponents?: boolean
}
