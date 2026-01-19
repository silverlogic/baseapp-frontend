export type ChatRoomOptionsProps = {
  handleArchiveChat: () => void
  handleChatDetails: () => void
  handleGoToProfile: () => void
  handleDeleteChat: () => void
  isArchived: boolean
  isGroup?: boolean
  isArchiveMutationInFlight: boolean
  visible: boolean
  setVisible: (visible: boolean) => void
}
