import { ProfileItemFragment$data } from '../../../../../__generated__/ProfileItemFragment.graphql'

export type GroupChatCreateState = {
  participants: ProfileItemFragment$data[]
  image?: string | File | Blob
  title: string
}

type ChatRoomFunctions = {
  setParticipants: (participants: ProfileItemFragment$data[]) => void
  setGroupChat: (state: GroupChatCreateState) => void
  resetGroupChat: () => void
}

export type UseGroupChat = GroupChatCreateState & ChatRoomFunctions
