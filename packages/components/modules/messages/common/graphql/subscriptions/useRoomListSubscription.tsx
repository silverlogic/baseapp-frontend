'use-client'

import { useMemo } from 'react'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'
import { RecordSourceSelectorProxy } from 'relay-runtime'

import {
  useRoomListSubscription$data,
  useRoomListSubscription as useRoomListSubscriptionType,
} from '../../../../../__generated__/useRoomListSubscription.graphql'
import useChatRoom from '../../context/useChatRoom'
import { getChatRoomConnections } from '../../utils'

// isArchived is needed to bump the chatRoom up in the correct connection
// title is used to toast room name if user was removed, without having to read in a fragment
export const RoomListSubscriptionQuery = graphql`
  subscription useRoomListSubscription($profileId: ID!, $connections: [ID!]!) {
    chatRoomOnRoomUpdate(profileId: $profileId) {
      room {
        node {
          id
          isArchived
          isGroup
          participantsCount
          title
          ...LastMessageFragment
          ...TitleFragment
          ...UnreadMessagesCountFragment
        }
      }
      removedParticipants {
        id @deleteEdge(connections: $connections)
        profile {
          id
        }
      }
    }
  }
`

export const wasRemovedFromChatRoom = (
  data: useRoomListSubscription$data | null | undefined,
  profileId: string,
) =>
  data?.chatRoomOnRoomUpdate?.removedParticipants?.some((node) => node?.profile?.id === profileId)

export const getRoomListSubscriptionConfig = (
  profileId: string,
  connections: string[],
  selectedRoom: string | undefined,
  resetChatRoom: VoidFunction,
  onRemoval?: VoidFunction | undefined,
) => ({
  subscription: RoomListSubscriptionQuery,
  onError: console.error,
  variables: { profileId, connections },
  updater: (
    store: RecordSourceSelectorProxy<unknown>,
    data: useRoomListSubscription$data | null | undefined,
  ) => {
    const roomNode = data?.chatRoomOnRoomUpdate?.room?.node
    const roomId = roomNode?.id
    if (!roomId) return
    if (wasRemovedFromChatRoom(data, profileId)) {
      getChatRoomConnections(store, profileId).forEach((connectionRecord) =>
        ConnectionHandler.deleteNode(connectionRecord, roomId),
      )
    } else {
      const isArchived = roomNode?.isArchived
      getChatRoomConnections(
        store,
        profileId,
        ({ q, archived, isGroup }) =>
          q === '' && archived === isArchived && isGroup === roomNode?.isGroup,
      ).forEach((connectionRecord) => {
        ConnectionHandler.deleteNode(connectionRecord, roomId)
        const serverEdge = store.getRootField('chatRoomOnRoomUpdate')?.getLinkedRecord('room')
        const edge = ConnectionHandler.buildConnectionEdge(store, connectionRecord, serverEdge)
        if (edge) {
          ConnectionHandler.insertEdgeBefore(connectionRecord, edge)
        }
      })
    }
  },
  onNext: (data: useRoomListSubscription$data | null | undefined) => {
    if (wasRemovedFromChatRoom(data, profileId)) {
      if (selectedRoom && data?.chatRoomOnRoomUpdate?.room?.node?.id === selectedRoom) {
        resetChatRoom()
      }
      onRemoval?.()
    }
  },
})

export const useRoomListSubscription = ({
  connections,
  profileId,
  onRemoval,
}: {
  connections: string[]
  profileId: string
  onRemoval?: VoidFunction
  isRemoval?: boolean
}) => {
  const { id: selectedRoom, resetChatRoom } = useChatRoom()

  const config = useMemo(
    () =>
      getRoomListSubscriptionConfig(profileId, connections, selectedRoom, resetChatRoom, onRemoval),
    [profileId, connections, onRemoval, selectedRoom, resetChatRoom],
  )

  return useSubscription<useRoomListSubscriptionType>(config)
}
