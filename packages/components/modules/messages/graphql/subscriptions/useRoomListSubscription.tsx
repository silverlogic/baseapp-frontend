'use-client'

import { useMemo } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'
import { RecordSourceSelectorProxy } from 'relay-runtime'

import {
  useRoomListSubscription$data,
  useRoomListSubscription as useRoomListSubscriptionType,
} from '../../../../__generated__/useRoomListSubscription.graphql'
import { useChatRoom } from '../../context'
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

const useRoomListSubscription = ({
  connections,
  profileId,
  onRemoval,
}: {
  connections: string[]
  profileId: string
  onRemoval?: () => void
}) => {
  const { id: selectedRoom, resetChatRoom } = useChatRoom()
  const { sendToast } = useNotification()

  const config = useMemo(() => {
    const wasRemovedFromChatRoom = (data: useRoomListSubscription$data | null | undefined) =>
      data?.chatRoomOnRoomUpdate?.removedParticipants?.some(
        (node) => node?.profile?.id === profileId,
      )

    return {
      subscription: RoomListSubscriptionQuery,
      onError: console.error,
      variables: { profileId, connections },
      updater: (
        store: RecordSourceSelectorProxy<unknown>,
        data: useRoomListSubscription$data | null | undefined,
      ) => {
        const roomId = data?.chatRoomOnRoomUpdate?.room?.node?.id
        if (!roomId) return
        if (wasRemovedFromChatRoom(data)) {
          getChatRoomConnections(store, profileId).forEach((connectionRecord) =>
            ConnectionHandler.deleteNode(connectionRecord, roomId),
          )
        } else {
          const isArchived = data?.chatRoomOnRoomUpdate?.room?.node?.isArchived
          getChatRoomConnections(
            store,
            profileId,
            ({ q, archived }) => q === '' && archived === isArchived,
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
        if (wasRemovedFromChatRoom(data)) {
          if (selectedRoom && data?.chatRoomOnRoomUpdate?.room?.node?.id === selectedRoom) {
            resetChatRoom()
          }
          onRemoval?.()
          sendToast(`You were removed from ${data?.chatRoomOnRoomUpdate?.room?.node?.title}`, {
            type: 'info',
          })
        }
      },
    }
  }, [profileId, connections, onRemoval, selectedRoom, resetChatRoom])

  return useSubscription<useRoomListSubscriptionType>(config)
}

export default useRoomListSubscription
