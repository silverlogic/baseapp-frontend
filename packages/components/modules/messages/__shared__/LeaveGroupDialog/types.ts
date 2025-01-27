export interface LeaveGroupDialogProps {
  title?: string
  content?: string
  profileId?: string
  roomId?: string
  removingParticipantId?: string
  removingParticipantName?: string | null
  open: boolean
  onClose: VoidFunction
}
