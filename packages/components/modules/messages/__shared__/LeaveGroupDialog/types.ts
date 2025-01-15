export interface LeaveGroupDialogProps {
  customContent?: string
  customTitle?: string
  isSoleAdmin?: boolean
  onClose: VoidFunction
  open: boolean
  profileId: string
  removingParticipantId: string
  roomId?: string
}
