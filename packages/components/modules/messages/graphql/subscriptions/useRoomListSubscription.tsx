import { useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'

const RoomListSubscriptionQuery = graphql`
  subscription useRoomListSubscription($profileId: ID!, $connections: [ID!]!) {
    chatRoomOnRoomUpdate(profileId: $profileId) {
      room @prependEdge(connections: $connections) {
        node {
          id
          unreadMessagesCount
          ...RoomFragment
        }
      }
    }
  }
`

const useRoomListSubscription = (profileId: string) => {
  const config = useMemo(() => {
    // TODO: add filter handling (for now we can default 'unreadMessages' to false)
    const connectionId = ConnectionHandler.getConnectionID(profileId, 'roomsList_chatRooms', {
      unreadMessages: false,
    })
    return {
      subscription: RoomListSubscriptionQuery,
      onError: console.error,
      variables: {
        profileId,
        connections: [connectionId],
      },
    }
  }, [profileId])

  return useSubscription(config)
}

export default useRoomListSubscription
