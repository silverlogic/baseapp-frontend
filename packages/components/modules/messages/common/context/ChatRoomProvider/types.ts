import { ValueOf } from '@baseapp-frontend/utils'

import { SocialUpsertForm } from '../../../../__shared__/common'
import { LEFT_PANEL_CONTENT } from '../useChatRoom/constants'

export type ChatRoomState = {
  id?: string
  participants?: (string | null | undefined)[]
  leftPanelContent?: number
}

export type LeftPanelContentValues = ValueOf<typeof LEFT_PANEL_CONTENT>

type ChatRoomDrafts = {
  /** unsent message per room, kept across room switches and not cleared by `resetChatRoom` */
  drafts: Record<string, SocialUpsertForm>
}

type ChatRoomFunctions = {
  setChatRoom: (
    partial: Partial<ChatRoomState> | ((state: ChatRoomState) => Partial<ChatRoomState>),
    replace?: boolean | undefined,
  ) => void
  resetChatRoom: () => void
  setLeftPanelContent: (content: LeftPanelContentValues) => void
  setDraft: (roomId: string, draft: SocialUpsertForm) => void
  clearDraft: (roomId: string) => void
}

export type UseChatRoom = ChatRoomState & ChatRoomDrafts & ChatRoomFunctions
