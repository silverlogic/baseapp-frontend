import { BottomSheetModal } from '@gorhom/bottom-sheet'

export type BottomDrawerProps = {
  bottomDrawerRef: React.RefObject<BottomSheetModal>
  handleSheetChanges: (index: number) => void
  type?: 'image' | 'bannerImage'
  handleViewPhotoLibrary: () => void
  handleTakePhoto: () => void
  handleRemoveImage: (type: 'image' | 'bannerImage') => void
}
