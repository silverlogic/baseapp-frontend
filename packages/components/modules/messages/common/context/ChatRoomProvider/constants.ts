import { LEFT_PANEL_CONTENT } from '../useChatRoom/constants'
import { ChatRoomState } from './types'

export const INITIAL_CHAT_ROOM_STATE: ChatRoomState = {
  id: undefined,
  participants: undefined,
  leftPanelContent: LEFT_PANEL_CONTENT.chatRoomList,
}
