'use-client'

import { useCallback, useMemo, useRef } from 'react'

import { useAppStateSubscription } from '@baseapp-frontend/utils/hooks/useAppStateSubscription'

import { useFocusEffect } from 'expo-router'
import { Disposable, Environment, requestSubscription } from 'react-relay'
import { GraphQLSubscriptionConfig } from 'relay-runtime'

import { useRoomListSubscription as useRoomListSubscriptionType } from '../../../../../__generated__/useRoomListSubscription.graphql'
import { getRoomListSubscriptionConfig } from '../../../common'
import useChatRoom from '../../../common/context/useChatRoom'

export const useRoomListSubscription = ({
  connections,
  profileId,
  onRemoval,
  environment,
}: {
  connections: string[]
  profileId: string
  environment: Environment
  onRemoval?: VoidFunction
  isRemoval?: boolean
}) => {
  const { id: selectedRoom, resetChatRoom } = useChatRoom()
  const disposableRef = useRef<Disposable | null>(null)

  const config = useMemo<GraphQLSubscriptionConfig<useRoomListSubscriptionType>>(
    () =>
      getRoomListSubscriptionConfig(profileId, connections, selectedRoom, resetChatRoom, onRemoval),
    [profileId, connections, onRemoval, selectedRoom, resetChatRoom],
  )

  const subscribe = useCallback(() => {
    if (!profileId) return
    disposableRef.current?.dispose?.()
    disposableRef.current = requestSubscription(environment, config)
  }, [profileId, environment, config])

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
