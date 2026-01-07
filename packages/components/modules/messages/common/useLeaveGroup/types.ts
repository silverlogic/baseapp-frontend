export interface UseLeaveGroupProps {
  isSoleAdmin?: boolean
  onClose: VoidFunction
  profileId: string
  removingParticipantId: string
  roomId?: string
}
