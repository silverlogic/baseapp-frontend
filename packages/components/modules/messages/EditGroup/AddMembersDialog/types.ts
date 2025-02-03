import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'

export interface AddMembersDialogProps {
  allProfilesRef: ChatRoomsQuery$data
  onClose: VoidFunction
  open: boolean
  profileId: string
  roomId?: string
  isPending: boolean
}
