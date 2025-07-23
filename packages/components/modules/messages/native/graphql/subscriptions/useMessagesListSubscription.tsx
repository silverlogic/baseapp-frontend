import { useCallback, useMemo, useRef } from 'react'

import { useFocusEffect } from 'expo-router'
import { ConnectionHandler, Disposable, Environment, requestSubscription } from 'react-relay'

import { newMessageSubscription } from '../../../common'

export const useMessagesListSubscription = (
  roomId: string,
  profileId: string,
  environment: Environment,
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
        disposableRef.current?.dispose?.()
        disposableRef.current = null
      }
    }, [config, environment]),
  )
}
