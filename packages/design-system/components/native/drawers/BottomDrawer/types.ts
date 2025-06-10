import type { BottomSheetModal } from '@gorhom/bottom-sheet'

export type BottomDrawerProps = {
  bottomDrawerRef: React.RefObject<BottomSheetModal | undefined>
  handleSheetChanges: (index: number) => void
  snapPoints?: string[]
  children?: React.ReactNode
}
