import type { FilesList_target$key } from '../../../../__generated__/FilesList_target.graphql'

export interface FileUploadListProps {
  target: FilesList_target$key
  showUploadProgress?: boolean
  allowRemove?: boolean
  allowRetry?: boolean
  /** `cards` (default, stacked detailed cards) or `chips` (compact Figma chips). */
  variant?: 'cards' | 'chips'
  /** `stack` (default, vertical) or `horizontal` (wrapping/scrolling row — pairs with chips). */
  layout?: 'stack' | 'horizontal'
  /** Edit mode: show a remove control on attached files the user can change. */
  editable?: boolean
}
