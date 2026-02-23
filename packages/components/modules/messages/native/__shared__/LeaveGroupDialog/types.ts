export interface LeaveGroupDialogProps {
  open: boolean
  onClose: VoidFunction
  profileId: string
  removingParticipantId: string
  roomId?: string
  isSoleAdmin?: boolean
}
