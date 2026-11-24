import { useEffect, useMemo, useRef } from 'react'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'
import { GraphQLSubscriptionConfig } from 'relay-runtime'

import {
  useNotificationsSubscription as UseNotificationsSubscriptionType,
  useNotificationsSubscription$data,
} from '../../../../../__generated__/useNotificationsSubscription.graphql'
import { USER_NOTIFICATIONS_KEY } from '../../constants'

const NotificationsSubscription = graphql`
  subscription useNotificationsSubscription($connections: [ID!]!) {
    onNotificationChange {
      createdNotification @prependEdge(connections: $connections) {
        node {
          ...NotificationItemFragment
          recipient {
            id
            ...NotificationUserMenuFragment
          }
        }
      }
      updatedNotification {
        id
        ...NotificationItemFragment
      }
      deletedNotificationId @deleteRecord
    }
  }
`

export interface UseNotificationsSubscriptionOptions {
  /** Called with every payload, after Relay has written it to the store. */
  onNext?: (response: useNotificationsSubscription$data | null | undefined) => void
  /** Called when the subscription fails. Defaults to `console.error`. */
  onError?: (error: Error) => void
}

export const useNotificationsSubscription = (
  userId = '',
  options: UseNotificationsSubscriptionOptions = {},
) => {
  // The callbacks are read through a ref so that inline functions do not change the config's
  // identity, which would close and re-open the subscription on every render.
  const optionsRef = useRef(options)
  useEffect(() => {
    optionsRef.current = options
  })

  const config = useMemo<GraphQLSubscriptionConfig<UseNotificationsSubscriptionType>>(() => {
    const connectionID = ConnectionHandler.getConnectionID(userId, USER_NOTIFICATIONS_KEY)

    return {
      subscription: NotificationsSubscription,
      variables: { connections: [connectionID] },
      onNext: (response) => optionsRef.current.onNext?.(response),
      onError: (error) => (optionsRef.current.onError ?? console.error)(error),
    }
  }, [userId])

  return useSubscription(config)
}
