import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { ChatRoomHeaderFragment$data } from '../../__generated__/ChatRoomHeaderFragment.graphql'

// TODO Update this when a isGroupChat field is added on the BE
export const isGroupChat = (chatRoom: ChatRoomHeaderFragment$data) => chatRoom.title !== null

export const getParticipantCount = (chatRoom: ChatRoomHeaderFragment$data) =>
  chatRoom.participants?.edges.length

export const useNameAndAvatar = (roomHeader: ChatRoomHeaderFragment$data) => {
  const { currentProfile } = useCurrentProfile()
  if (isGroupChat(roomHeader)) {
    return {
      title: roomHeader.title,
      avatar: roomHeader.image?.url,
    }
  }
  const participantCount = getParticipantCount(roomHeader)
  if (participantCount !== 2) {
    return {
      title: 'Error. Cannot generate title',
    }
  }
  if (!roomHeader.participants) {
    return {
      title: 'Error. Chat room has no participants',
    }
  }

  const otherParticipant = roomHeader.participants.edges.find(
    (edge) => edge?.node?.profile?.id && edge?.node?.profile?.id !== currentProfile?.id,
  )
  return {
    title: otherParticipant?.node?.profile?.name,
    avatar: otherParticipant?.node?.profile?.image?.url,
  }
}
