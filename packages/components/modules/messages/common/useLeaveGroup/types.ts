export interface UseLeaveGroupProps {
  isSoleAdmin?: boolean
  participantsCount?: number | null
  onClose: VoidFunction
  profileId: string
  removingParticipantId?: string | null
  roomId?: string
  removeSuccessMessage?: string
}
