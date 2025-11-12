export type ChatRoomState = {
  id?: string
  participants?: (string | null | undefined)[]
  leftPanelContent?: number
  singleChatProfileDetails?: {
    pk: number | undefined
    name: string | null | undefined
    username: string | null | undefined
    imageUrl: string | null | undefined
    biography?: string | null | undefined
  }
}

type ChatRoomFunctions = {
  setChatRoom: (
    partial: Partial<ChatRoomState> | ((state: ChatRoomState) => Partial<ChatRoomState>),
    replace?: boolean | undefined,
  ) => void
  resetChatRoom: () => void
  setLeftPanelContent: (content: number) => void
  setSingleChatProfileDetails: (details: {
    pk: number | undefined
    name: string | undefined
    username: string | undefined
    imageUrl: string | undefined
    biography?: string | undefined
  }) => void
}

export type UseChatRoom = ChatRoomState & ChatRoomFunctions
