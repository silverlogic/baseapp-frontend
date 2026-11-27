import type { ReactNode } from 'react'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'

export interface ChatCardAvatarRenderProps {
  /** The chat room's Relay id. */
  roomId: string
  isGroup: boolean
  /** The avatar the card renders by default; wrap it or replace it. */
  avatar: ReactNode
  /** Opens the chat, as tapping the rest of the card does (for an avatar left plain). */
  onPress: () => void
  /**
   * The card's long-press handler (its options drawer). The avatar sits outside the card's
   * pressable area, so it should forward long-presses here.
   */
  onLongPress: () => void
}

/** Renders a chat card's avatar. Omitted: the default avatar, inside the card's tap area. */
export type RenderChatCardAvatar = (props: ChatCardAvatarRenderProps) => ReactNode

export interface RoomsListProps {
  targetRef: ChatRoomsQuery$data
  searchParam: string
  selectedTab: string
  renderAvatar?: RenderChatCardAvatar
}
