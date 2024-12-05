export type ChatRoomState = {
  id?: string
  participants?: (string | null | undefined)[]
}

type ChatRoomFunctions = {
  setChatRoom: (
    partial: Partial<ChatRoomState> | ((state: ChatRoomState) => Partial<ChatRoomState>),
    replace?: boolean | undefined,
  ) => void
  resetChatRoom: () => void
}

export type UseChatRoom = ChatRoomState & ChatRoomFunctions
