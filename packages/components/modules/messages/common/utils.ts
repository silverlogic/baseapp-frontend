import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { useFragment } from 'react-relay'
import ConnectionHandler from 'relay-connection-handler-plus'
import { RecordProxy, RecordSourceSelectorProxy, Variables } from 'relay-runtime'

import { MembersListFragment$data } from '../../../__generated__/MembersListFragment.graphql'
import { RoomTitleFragment$key } from '../../../__generated__/RoomTitleFragment.graphql'
import { SingleChatDetailsFragment$key } from '../../../__generated__/SingleChatDetailsFragment.graphql'
// import { CHAT_ROOM_PARTICIPANT_ROLES } from './constants'
import { RoomTitleFragment } from './graphql/fragments/RoomTitle'
import { SingleChatDetailsFragment } from './graphql/fragments/SingleChatDetailsFragment'

export const useTitleAndImage = (titleRef: RoomTitleFragment$key | null | undefined) => {
  const data = useFragment(RoomTitleFragment, titleRef ?? null)
  return {
    title: data?.title,
    image: data?.image?.url,
  }
}

export const useSingleChatDetails = (chatRef: SingleChatDetailsFragment$key) => {
  const chatDetails = useFragment<SingleChatDetailsFragment$key>(SingleChatDetailsFragment, chatRef)

  const { id, isGroup, isSoleAdmin, title, image, otherParticipant: participant } = chatDetails
  if (isGroup) {
    return {
      roomId: id,
      isGroup,
      isSoleAdmin,
      title,
      image: image?.url,
    }
  }
  if (!participant) {
    return {
      roomId: id,
      isGroup,
      title: 'Deleted User',
      image: undefined,
    }
  }
  if (participant && !participant.profile) {
    return {
      roomId: id,
      isGroup,
      title: 'Deleted User',
      image: undefined,
      username: undefined,
      biography: undefined,
      id: undefined,
    }
  }
  return {
    roomId: id,
    isGroup,
    title: participant?.profile?.name,
    image: participant?.profile?.image?.url,
    username: participant?.profile?.urlPath?.path,
    biography: participant?.profile?.biography,
    id: participant?.profile?.id,
  }
}

export const getParticipantCountString = (participantCount: number | null | undefined) => {
  if (participantCount !== undefined && participantCount !== null) {
    return `${participantCount} member${participantCount !== 1 ? 's' : ''}`
  }
  return undefined
}

export const getChatRoomConnections: (
  store: RecordSourceSelectorProxy<unknown>,
  profileId: string,
  filter?: (variables: Variables) => boolean,
) => RecordProxy[] = (store, profileId, filter) => {
  const storyRecord = store.get(profileId)
  if (storyRecord) {
    return ConnectionHandler.getConnections(storyRecord, 'roomsList_chatRooms', filter)
  }
  return []
}
// Not ideal but added here to avoid circular dependency
export const CHAT_ROOM_PARTICIPANT_ROLES = {
  admin: 'ADMIN',
  member: 'MEMBER',
} as const
// Not ideal but added here to avoid circular dependency
export const MESSAGE_TYPE = {
  user: 'USER_MESSAGE',
  system: 'SYSTEM_GENERATED',
} as const

export const useCheckIsAdmin = (participants: MembersListFragment$data['participants']) => {
  const { currentProfile } = useCurrentProfile()
  const me = participants?.edges?.find((edge) => edge?.node?.profile?.id === currentProfile?.id)
  const isAdmin = me?.node?.role === CHAT_ROOM_PARTICIPANT_ROLES.admin
  const isSoleAdmin =
    isAdmin &&
    participants?.edges?.filter((edge) => edge?.node?.role === CHAT_ROOM_PARTICIPANT_ROLES.admin)
      .length === 1
  return { isAdmin, isSoleAdmin }
}
