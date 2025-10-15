import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { useFragment } from 'react-relay'
import ConnectionHandler from 'relay-connection-handler-plus'
import { RecordProxy, RecordSourceSelectorProxy, Variables } from 'relay-runtime'

import { GroupTitleFragment$key } from '../../../__generated__/GroupTitleFragment.graphql'
import { MembersListFragment$data } from '../../../__generated__/MembersListFragment.graphql'
import { RoomTitleFragment$key } from '../../../__generated__/RoomTitleFragment.graphql'
import { TitleFragment$data } from '../../../__generated__/TitleFragment.graphql'
import { CHAT_ROOM_PARTICIPANT_ROLES } from './constants'
import { GroupTitleFragment } from './graphql/fragments/GroupTitle'
import { RoomTitleFragment } from './graphql/fragments/RoomTitle'

export const useGroupNameAndAvatar = (
  headerRef: GroupTitleFragment$key | RoomTitleFragment$key | null | undefined,
) => {
  const header = useFragment<GroupTitleFragment$key>(
    GroupTitleFragment,
    headerRef as GroupTitleFragment$key,
  )
  return {
    title: header?.title,
    avatar: header?.image?.url,
  }
}

const useRoomNameAndAvatar = (headerRef: RoomTitleFragment$key | null | undefined) => {
  const { currentProfile } = useCurrentProfile()
  const header = useFragment<RoomTitleFragment$key>(RoomTitleFragment, headerRef)
  if (!header?.participants) {
    return {
      title: 'Error: No participants',
    }
  }

  const otherParticipant = header.participants.edges.find(
    (edge) => edge?.node?.profile?.id && edge?.node?.profile?.id !== currentProfile?.id,
  )
  if (otherParticipant === undefined) {
    return {
      title: 'Deleted User',
      avatar: undefined,
    }
  }

  return {
    title: otherParticipant?.node?.profile?.name,
    avatar: otherParticipant?.node?.profile?.image?.url,
  }
}

export const useNameAndAvatar = (roomHeader: TitleFragment$data) => {
  const roomNameAndAvatar = useRoomNameAndAvatar(roomHeader)
  const groupNameAndAvatar = useGroupNameAndAvatar(roomHeader)
  if (roomHeader.isGroup) return groupNameAndAvatar
  return roomNameAndAvatar
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

export const useCheckIsAdmin = (participants: MembersListFragment$data['memberList']) => {
  const { currentProfile } = useCurrentProfile()
  const me = participants?.edges?.find((edge) => edge?.node?.profile?.id === currentProfile?.id)
  const isAdmin = me?.node?.role === CHAT_ROOM_PARTICIPANT_ROLES.admin
  const isSoleAdmin =
    isAdmin &&
    participants?.edges?.filter((edge) => edge?.node?.role === CHAT_ROOM_PARTICIPANT_ROLES.admin)
      .length === 1
  return { isAdmin, isSoleAdmin }
}
