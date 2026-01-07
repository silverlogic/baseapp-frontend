import { ProfileItemFragment$data } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { GroupChatCreateState } from '../GroupChatProvider/types'

type ChatRoomFunctions = {
  setParticipants: (participants: ProfileItemFragment$data[]) => void
  setGroupChat: (state: GroupChatCreateState) => void
  resetGroupChat: () => void
}

export type UseGroupChat = GroupChatCreateState & ChatRoomFunctions
