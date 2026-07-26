export interface UploadingFilesListProps {
  /** Show only uploads owned by this scope (from the shared upload store). */
  scope: string
  allowRemove?: boolean
  allowRetry?: boolean
  /** `chips` (default, compact) or `cards` (detailed). */
  variant?: 'cards' | 'chips'
  /** `horizontal` (default, wrapping row) or `stack` (vertical). */
  layout?: 'stack' | 'horizontal'
}
