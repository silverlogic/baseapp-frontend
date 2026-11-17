import type { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet'

export type BottomDrawerProps = {
  bottomDrawerRef: React.RefObject<BottomSheetModal | undefined>
  handleSheetChanges: (index: number) => void
  snapPoints?: string[]
  /** Render the body in a sheet-aware scroll view so long content scrolls instead of overflowing. */
  scrollable?: boolean
  /** Size the sheet to its content below the snap point; turn off to keep a fixed height while the content changes. */
  enableDynamicSizing?: BottomSheetModalProps['enableDynamicSizing']
  keyboardBehavior?: BottomSheetModalProps['keyboardBehavior']
  keyboardBlurBehavior?: BottomSheetModalProps['keyboardBlurBehavior']
  children?: React.ReactNode
}
