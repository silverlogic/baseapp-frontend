import type { BottomSheetModal } from '@gorhom/bottom-sheet'

export type BottomDrawerProps = {
  bottomDrawerRef: React.RefObject<BottomSheetModal>
  handleSheetChanges: (index: number) => void
  snapPoints?: string[]
  children?: React.ReactNode
}
