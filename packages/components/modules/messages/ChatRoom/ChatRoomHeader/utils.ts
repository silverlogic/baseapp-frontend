import { ChatRoomHeaderFragment$data } from '../../../../__generated__/ChatRoomHeaderFragment.graphql'
import { getParticipantCount, isGroupChat } from '../../utils'

export const getSubtitle = (roomHeader: ChatRoomHeaderFragment$data) => {
  if (isGroupChat(roomHeader)) {
    const participantCount = getParticipantCount(roomHeader)
    if (participantCount !== undefined) {
      return `${participantCount} member${participantCount !== 1 ? 's' : ''}`
    }
  }
  return null
}