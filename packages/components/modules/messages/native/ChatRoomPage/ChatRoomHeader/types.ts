import { TitleFragment$data } from '../../../../../__generated__/TitleFragment.graphql'

export interface ChatRoomHeaderProps {
  roomHeader: TitleFragment$data
  /** Omitted: the header renders as plain, non-tappable content. */
  onChatDetailsClicked?: () => void
}
