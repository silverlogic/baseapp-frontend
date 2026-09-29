import { ValueOf } from '@baseapp-frontend/utils'

import { LEFT_PANEL_CONTENT } from '../useChatRoom/constants'

export type ChatRoomState = {
  id?: string
  participants?: (string | null | undefined)[]
  leftPanelContent?: number
}

export type LeftPanelContentValues = ValueOf<typeof LEFT_PANEL_CONTENT>

type ChatRoomFunctions = {
  setChatRoom: (
    partial: Partial<ChatRoomState> | ((state: ChatRoomState) => Partial<ChatRoomState>),
    replace?: boolean | undefined,
  ) => void
  resetChatRoom: () => void
  setLeftPanelContent: (content: LeftPanelContentValues) => void
}

export type UseChatRoom = ChatRoomState & ChatRoomFunctions
