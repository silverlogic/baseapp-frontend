import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { ChatRoomHeaderFragment$data } from '../../__generated__/ChatRoomHeaderFragment.graphql'
import { MESSAGE_TYPE, MessageTypeOptions } from './constants'

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

type MessageItemCore = {
  readonly content: string | null | undefined
  readonly contentLinkedProfile:
    | {
        readonly id: string
        readonly name: string | null | undefined
      }
    | null
    | undefined
  readonly messageType: MessageTypeOptions | '%future added value' | null | undefined
}

export const useParsedMessageContent = (message: MessageItemCore | null | undefined) => {
  const { currentProfile } = useCurrentProfile()
  if (!message) return null
  if (message.messageType === MESSAGE_TYPE.user) return message.content

  const linkedProfileName =
    message.contentLinkedProfile?.id === currentProfile?.id
      ? 'You'
      : message.contentLinkedProfile?.name
  return message.content?.replace('{content_linked_profile}', linkedProfileName ?? '')
}
