import { ProfileItemFragment$data } from '../../../../../__generated__/ProfileItemFragment.graphql'

export type GroupChatCreateState = {
  id?: string
  participants?: ProfileItemFragment$data[]
  existingParticipants?: String[]
  image?: string
  title?: string
  roomId?: string
}

type ChatRoomFunctions = {
  setParticipants: (participants: ProfileItemFragment$data[]) => void
  setExistingParticipants: (existingParticipants: String[]) => void
  setGroupChat: (
    partial:
      | Partial<GroupChatCreateState>
      | ((state: GroupChatCreateState) => Partial<GroupChatCreateState>),
    replace?: boolean | undefined,
  ) => void
  setRoomId: (roomId: string) => void
  resetGroupChat: () => void
}

export type UseGroupChat = GroupChatCreateState & ChatRoomFunctions
