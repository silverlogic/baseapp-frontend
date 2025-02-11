import { useMemo } from 'react'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'

export const newMessageSubscription = graphql`
  subscription useMessagesListSubscription($roomId: ID!, $connections: [ID!]!) {
    chatRoomOnNewMessage(roomId: $roomId) {
      message @prependEdge(connections: $connections) {
        node {
          ...MessageItemFragment
          actionObject {
            id
          }
        }
      }
    }
  }
`

export const useMessagesListSubscription = (roomId: string) => {
  const config = useMemo(() => {
    const connectionID = ConnectionHandler.getConnectionID(roomId, 'chatRoom_allMessages')
    return {
      subscription: newMessageSubscription,
      variables: {
        roomId,
        connections: [connectionID],
      },
      onError: console.error,
    }
  }, [roomId])

  return useSubscription(config)
}
