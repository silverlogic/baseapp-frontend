import { useMemo } from 'react'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'
import { RecordSourceSelectorProxy } from 'relay-runtime'

import { useCurrentProfile } from '../../../profiles'

const RoomListSubscription = graphql`
  subscription useRoomListSubscription($profileId: ID!) {
    chatRoomOnRoomUpdate(profileId: $profileId) {
      room {
        node {
          id
          unreadMessagesCount(profileId: $profileId)
          participants {
            totalCount
            edges {
              node {
                id
                profile {
                  id
                  name
                  image(width: 100, height: 100) {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

// TODO: check if BE subscription is working properly
const useRoomListSubscription = (nodeId: string) => {
  const { profile } = useCurrentProfile()
  const config = useMemo(
    () => ({
      subscription: RoomListSubscription,
      onError: console.error,
      variables: {
        profileId: profile?.id,
      },
      updater: (store: RecordSourceSelectorProxy<unknown>, data: any) => {
        const node = store.get(nodeId)
        if (!node || !data) return null
        const connectionRecord = ConnectionHandler.getConnection(node, 'roomsList_chatRooms')
        const roomId = data?.chatRoomOnRoomUpdate?.room?.node?.id
        if (!connectionRecord || !roomId) return null

        ConnectionHandler.deleteNode(connectionRecord, roomId)

        const payload = store.getRootField('chatRoomOnRoomUpdate')

        const room = payload?.getLinkedRecord('room')

        const newEdge = ConnectionHandler.buildConnectionEdge(store, connectionRecord, room)

        if (!newEdge) return null

        ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge)

        return null
      },
    }),
    [nodeId],
  )

  return useSubscription(config)
}

export default useRoomListSubscription
