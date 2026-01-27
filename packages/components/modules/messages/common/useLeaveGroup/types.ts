export interface UseLeaveGroupProps {
  isSoleAdmin?: boolean
  onClose: VoidFunction
  profileId: string
  removingParticipantId?: string | null
  roomId?: string
}
