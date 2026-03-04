import { useMemo } from 'react'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'

export const newMessageSubscription = graphql`
  subscription useMessagesListSubscription($roomId: ID!, $profileId: ID!, $connections: [ID!]!) {
    chatRoomOnMessage(roomId: $roomId, profileId: $profileId) {
      message @prependEdge(connections: $connections) {
        node {
          messageType
          ...MessageItemFragment
          actionObject {
            id
          }
        }
      }
    }
  }
`

export const useMessagesListSubscription = (roomId: string, profileId: string) => {
  const config = useMemo(() => {
    const connectionID = ConnectionHandler.getConnectionID(roomId, 'chatRoom_allMessages')
    return {
      subscription: newMessageSubscription,
      variables: {
        roomId,
        profileId,
        connections: [connectionID],
      },
      onError: console.error,
    }
  }, [roomId])

  return useSubscription(config)
}
