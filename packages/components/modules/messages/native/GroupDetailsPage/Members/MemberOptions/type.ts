import { RefObject } from 'react'

import { BottomSheetModal } from '@gorhom/bottom-sheet'

export type MemberOptionsProps = {
  bottomDrawerRef: RefObject<BottomSheetModal | undefined>
  handleSheetChanges: (index: number) => void
  handleAdminToggle: () => void
  handleGoToProfile: () => void
  handleRemoveMember: () => void
  memberIsAdmin: boolean
  currentProfileIsAdmin: boolean
  isMe: boolean
}
