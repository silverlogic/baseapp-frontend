import { useMemo } from 'react'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'

const newMessageSubscription = graphql`
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

const useMessagesListSubscription = (roomId: string) => {
  // TODO: use current profile hook when it is available
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

export default useMessagesListSubscription
