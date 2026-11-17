import type { BottomSheetModal } from '@gorhom/bottom-sheet'

export type BottomDrawerProps = {
  bottomDrawerRef: React.RefObject<BottomSheetModal | undefined>
  handleSheetChanges: (index: number) => void
  snapPoints?: string[]
  /** Render the body in a sheet-aware scroll view so long content scrolls instead of overflowing. */
  scrollable?: boolean
  children?: React.ReactNode
}
