import { LastMessageFragment$key } from '../../../../../../__generated__/LastMessageFragment.graphql'
import { TitleFragment$key } from '../../../../../../__generated__/TitleFragment.graphql'
import { UnreadMessagesCountFragment$key } from '../../../../../../__generated__/UnreadMessagesCountFragment.graphql'
import type { RenderChatCardAvatar } from '../../types'

export interface ChatCardComponentProps {
  roomRef: LastMessageFragment$key | TitleFragment$key | UnreadMessagesCountFragment$key
  isArchived: boolean
  renderAvatar?: RenderChatCardAvatar
}
