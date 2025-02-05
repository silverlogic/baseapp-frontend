import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'

export interface AddMembersMobileProps {
  allProfilesRef: ChatRoomsQuery$data
  onClose: VoidFunction
  profileId: string
  roomId?: string
  isPending: boolean
}
