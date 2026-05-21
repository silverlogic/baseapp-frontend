import type { ChatRoomOptionValue } from './constants'

export interface ChatRoomOptionsProps {
  isArchived: boolean
  isArchiveMutationInFlight: boolean
  isGroup: boolean
  onArchiveClicked: () => void
  onDetailsClicked: () => void
  onLeaveClicked: () => void
  onContactDetailsClicked: () => void
  hiddenOptions?: ChatRoomOptionValue[]
}
