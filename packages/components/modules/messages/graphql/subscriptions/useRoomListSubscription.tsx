import { useMemo } from 'react'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'

const RoomListSubscriptionQuery = graphql`
  subscription useRoomListSubscription($profileId: ID!, $connections: [ID!]!) {
    chatRoomOnRoomUpdate(profileId: $profileId) {
      room @prependEdge(connections: $connections) {
        node {
          id
          ...RoomFragment
        }
      }
    }
  }
`

const useRoomListSubscription = (profileId: string) => {
  const config = useMemo(() => {
    // TODO: add filter handling (for now we can default 'unreadMessages' to false)
    const connectionIdActive = ConnectionHandler.getConnectionID(profileId, 'roomsList_chatRooms', {
      unreadMessages: false,
    })
    const connectionIdUnread = ConnectionHandler.getConnectionID(profileId, 'roomsList_chatRooms', {
      unreadMessages: true,
    })
    return {
      subscription: RoomListSubscriptionQuery,
      onError: console.error,
      variables: {
        profileId,
        connections: [connectionIdActive, connectionIdUnread],
      },
    }
  }, [profileId])

  return useSubscription(config)
}

export default useRoomListSubscription
