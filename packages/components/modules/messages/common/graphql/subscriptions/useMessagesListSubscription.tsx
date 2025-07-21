import { useCallback, useMemo, useRef } from 'react'

import { useFocusEffect } from 'expo-router'
import {
  ConnectionHandler,
  Disposable,
  graphql,
  requestSubscription,
  useSubscription,
} from 'react-relay'

export const newMessageSubscription = graphql`
  subscription useMessagesListSubscription($roomId: ID!, $profileId: ID!, $connections: [ID!]!) {
    chatRoomOnMessage(roomId: $roomId, profileId: $profileId) {
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

export const useMessagesListSubscriptionOnRn = (
  roomId: string,
  profileId: string,
  environment: any,
) => {
  const disposableRef = useRef<Disposable | null>(null)
  const connectionID = useMemo(
    () => ConnectionHandler.getConnectionID(roomId, 'chatRoom_allMessages'),
    [roomId],
  )

  const config = useMemo(
    () => ({
      subscription: newMessageSubscription,
      variables: {
        roomId,
        profileId,
        connections: [connectionID],
      },
      onError: console.error,
    }),
    [roomId, profileId, connectionID],
  )

  // Subscribe to the messages list subscription when the component is focused
  // and clean up the subscription when the component is unfocused
  useFocusEffect(
    useCallback(() => {
      if (!roomId || !profileId) return undefined

      disposableRef.current = requestSubscription(environment, config)

      return () => {
        console.log('[MessagesListSubscription] Cleaning up subscription for', roomId)
        disposableRef.current?.dispose?.()
        disposableRef.current = null
      }
    }, [config, environment]),
  )

  if (!environment) throw new Error('Relay environment is not defined')
}
