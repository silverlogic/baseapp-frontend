import { useFragment } from 'react-relay'

import { ChatRoomHeaderFragment$key } from '../../../__generated__/ChatRoomHeaderFragment.graphql'
import { useCurrentProfile } from '../../profiles'
import { ChatRoomHeaderFragment } from '../graphql/queries/ChatRoomHeaderFragment'
import { getParticipantCount, isGroupChat } from './utils'

const useNameAndAvatar = (roomHeaderRef: ChatRoomHeaderFragment$key) => {
  const roomHeader = useFragment(ChatRoomHeaderFragment, roomHeaderRef)
  const { profile } = useCurrentProfile()
  if (isGroupChat(roomHeader)) {
    return {
      title: roomHeader.title,
      avatar: roomHeader.image?.url,
    }
  }
  const participantCount = getParticipantCount(roomHeader)
  if (participantCount !== 2) {
    return {
      title:
        'Error. Cannot generate a title for a room without "title" and participant count different from 2',
    }
  }
  if (!roomHeader.participants) {
    return {
      title: 'Error. Chat room has no participants',
    }
  }

  const otherParticipant = roomHeader.participants.edges.find(
    (edge) => edge?.node?.profile?.id && edge?.node?.profile?.id !== profile?.id,
  )
  return {
    title: otherParticipant?.node?.profile?.name,
    avatar: otherParticipant?.node?.profile?.image?.url,
  }
}

export default useNameAndAvatar
