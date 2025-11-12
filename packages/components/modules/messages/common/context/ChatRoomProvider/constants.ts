import { ChatRoomState } from './types'

export const INITIAL_CHAT_ROOM_STATE: ChatRoomState = {
  id: undefined,
  participants: undefined,
  leftPanelContent: 0,
  singleChatProfileDetails: {
    pk: undefined,
    name: undefined,
    username: undefined,
    imageUrl: undefined,
    biography: undefined,
  },
}
