import { useCallback, useMemo, useRef } from 'react'

import { useAppStateSubscription } from '@baseapp-frontend/utils/hooks/useAppStateSubscription'

import { useFocusEffect } from 'expo-router'
import {
  ConnectionHandler,
  Disposable,
  requestSubscription,
  useRelayEnvironment,
} from 'react-relay'

import { newMessageSubscription } from '../../../common'

export const useMessagesListSubscription = (roomId: string, profileId: string) => {
  const disposableRef = useRef<Disposable | null>(null)
  const environment = useRelayEnvironment()
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

  const subscribe = useCallback(() => {
    if (!roomId || !profileId) return
    disposableRef.current?.dispose?.()
    disposableRef.current = requestSubscription(environment, config)
  }, [roomId, profileId, environment, config])

  const unsubscribe = useCallback(() => {
    disposableRef.current?.dispose?.()
    disposableRef.current = null
  }, [])

  useFocusEffect(
    useCallback(() => {
      subscribe()
      return () => {
        unsubscribe()
      }
    }, [subscribe, unsubscribe]),
  )

  useAppStateSubscription(() => {
    subscribe()
  })
}
