import { RefObject } from 'react'

import { BottomSheetModal } from '@gorhom/bottom-sheet'

export type BottomDrawerProps = {
  bottomDrawerRef: RefObject<BottomSheetModal | undefined>
  handleSheetChanges: (index: number) => void
  type?: 'image' | 'bannerImage'
  handleViewPhotoLibrary: () => void
  handleTakePhoto: () => void
  handleRemoveImage: (type: 'image' | 'bannerImage') => void
}
