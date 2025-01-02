import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { ChatRoomHeaderFragment$data } from '../../__generated__/ChatRoomHeaderFragment.graphql'

export const useNameAndAvatar = (roomHeader: ChatRoomHeaderFragment$data) => {
  const { currentProfile } = useCurrentProfile()
  if (roomHeader.isGroup) {
    return {
      title: roomHeader.title,
      avatar: roomHeader.image?.url,
    }
  }
  if (!roomHeader.participants) {
    return {
      title: 'Error: No participants',
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

export const getParticipantCountString = (participantCount: number | null | undefined) => {
  if (participantCount !== undefined && participantCount !== null) {
    return `${participantCount} member${participantCount !== 1 ? 's' : ''}`
  }
  return undefined
}
