import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'

export interface LeaveGroupDialogProps {
  customContent?: string
  customTitle?: string
  isSoleAdmin?: boolean
  onClose: VoidFunction
  open: boolean
  profileId: string
  removingParticipantFragmentRef?: ProfileItemFragment$key | null
  roomId?: string
}
