import React, { FC, Suspense, useMemo } from 'react'

import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { FlatList } from 'react-native'
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay'

import { NotificationsListFragment$key } from '../../../../__generated__/NotificationsListFragment.graphql'
import { NotificationsListQuery as NotificationsListQueryType } from '../../../../__generated__/NotificationsListQuery.graphql'
import {
  NotificationsListFragment,
  NotificationsListQuery,
  useNotificationsSubscription,
} from '../../common'
import DefaultEmptyState from './EmptyState'
import MarkAllAsReadButton from './MarkAllAsReadButton'
import DefaultNotificationItem from './NotificationItem'
import { createStyles } from './styles'
import { NotificationsListProps } from './types'

const NotificationsList: FC<NotificationsListProps> = ({
  EmptyState = DefaultEmptyState,
  NotificationItem = DefaultNotificationItem,
  NotificationItemProps = {},
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const options = { count: 10 }
  const { me } = useLazyLoadQuery<NotificationsListQueryType>(NotificationsListQuery, options, {
    fetchPolicy: 'store-and-network',
  })

  // TODO: handle infinite scroll
  const { data, refetch } = usePaginationFragment<
    NotificationsListQueryType,
    NotificationsListFragment$key
  >(NotificationsListFragment, me)

  useNotificationsSubscription(me?.id)

  const notifications = useMemo(
    () => data?.notifications?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.notifications?.edges],
  )

  const refetchNotifications = () => {
    refetch(options, { fetchPolicy: 'network-only' })
  }

  const renderNotificationItem = (notification: any) => {
    if (!notification) return null

    // TODO add notifications divider and unread/Read notifications as per design
    return (
      <NotificationItem
        key={`notification-${notification.id}`}
        notification={notification}
        {...NotificationItemProps}
      />
    )
  }

  const renderContent = () => {
    if (notifications.length === 0) return <EmptyState />

    return (
      <View>
        <FlatList data={notifications} renderItem={({ item }) => renderNotificationItem(item)} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="h6">Notifications</Text>
        <MarkAllAsReadButton
          refetch={refetchNotifications}
          disabled={!data?.notificationsUnreadCount}
        />
      </View>
      {renderContent()}
    </View>
  )
}

const SuspendedNotificationsList = (props: NotificationsListProps) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <Suspense
      fallback={
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text variant="h6">Notifications</Text>
          </View>
          <LoadingScreen />
        </View>
      }
    >
      <NotificationsList {...props} />
    </Suspense>
  )
}

export default SuspendedNotificationsList
