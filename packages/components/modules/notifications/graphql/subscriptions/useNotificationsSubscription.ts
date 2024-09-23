import { useMemo } from 'react'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'

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

const useNotificationsSubscription = (userId = '') => {
  const config = useMemo(() => {
    const connectionID = ConnectionHandler.getConnectionID(userId, USER_NOTIFICATIONS_KEY)

    return {
      subscription: NotificationsSubscription,
      variables: { connections: [connectionID] },
      onError: console.error,
    }
  }, [userId])

  return useSubscription(config)
}

export default useNotificationsSubscription
