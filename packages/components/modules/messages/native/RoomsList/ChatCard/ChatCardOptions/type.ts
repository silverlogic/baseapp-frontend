import { RefObject } from 'react'

import { BottomSheetModal } from '@gorhom/bottom-sheet'

export type ChatCardOptionsProps = {
  bottomDrawerRef: RefObject<BottomSheetModal | undefined>
  handleSheetChanges: () => void
  handleArchiveChat: () => void
  handleMarkAsUnread: () => void
  handleChatDetails: () => void
  handleGoToProfile: () => void
  handleDeleteChat: () => void
  isArchived: boolean
  isArchiveMutationInFlight: boolean
}
