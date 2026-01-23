import { ProfileItemFragment$data } from '../../../../../__generated__/ProfileItemFragment.graphql'

export type GroupChatCreateState = {
  id?: string
  participants?: ProfileItemFragment$data[]
  image?: string
  title?: string
}

type ChatRoomFunctions = {
  setParticipants: (participants: ProfileItemFragment$data[]) => void
  setGroupChat: (
    partial:
      | Partial<GroupChatCreateState>
      | ((state: GroupChatCreateState) => Partial<GroupChatCreateState>),
    replace?: boolean | undefined,
  ) => void
  resetGroupChat: () => void
}

export type UseGroupChat = GroupChatCreateState & ChatRoomFunctions
