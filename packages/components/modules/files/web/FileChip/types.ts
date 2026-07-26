import type { ReactNode } from 'react'

export interface FileChipProps {
  /** 40×40 thumbnail node (image or type-icon tile). */
  thumbnail: ReactNode
  name?: string | null
  /** Secondary line: an uppercase type label or a progress bar. */
  subtitle?: ReactNode
  /** Trailing action(s): remove, download, menu, retry… */
  action?: ReactNode
  /** Fixed width (uploading chips are fixed; attached chips size to content up to a max). */
  fixedWidth?: boolean
}
