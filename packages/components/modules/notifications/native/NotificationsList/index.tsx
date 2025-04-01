import React, { FC, Suspense, useMemo } from 'react'

import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { InfiniteScrollerView, View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useLazyLoadQuery, usePaginationFragment } from 'react-relay'

import { NotificationsListFragment$key } from '../../../../__generated__/NotificationsListFragment.graphql'
import { NotificationsListQuery as NotificationsListQueryType } from '../../../../__generated__/NotificationsListQuery.graphql'
import {
  NUMBER_OF_NOTIFICATIONS_TO_LOAD_NEXT,
  NotificationsListFragment,
  NotificationsListQuery,
  useNotificationsSubscription,
} from '../../common'
import { NotificationsNode } from '../../common/types'
import Divider from './Divider'
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

  const { data, loadNext, isLoadingNext, hasNext, refetch } = usePaginationFragment<
    NotificationsListQueryType,
    NotificationsListFragment$key
  >(NotificationsListFragment, me)

  useNotificationsSubscription(me?.id)

  const notifications = useMemo(
    () => data?.notifications?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.notifications?.edges],
  )

  const refetchNotifications = () => {
    refetch(options, { fetchPolicy: 'store-and-network' })
  }

  const renderNotificationItem = (notification: NotificationsNode, index: number) => {
    if (!notification) return null
    let divider = null
    if (!notification.unread && index > 0 && notifications[index - 1]?.unread) {
      divider = <Divider />
    }
    return (
      <>
        {divider}
        <NotificationItem
          notification={notification}
          refetch={refetchNotifications}
          {...NotificationItemProps}
        />
      </>
    )
  }

  const renderContent = () => {
    if (notifications.length === 0) return <EmptyState />

    return (
      <View style={styles.listContainer}>
        <InfiniteScrollerView
          data={notifications}
          renderItem={({ item, index }: { item: NotificationsNode, index: number }) => renderNotificationItem(item, index)}
          estimatedItemSize={134}
          onEndReached={() => {
            if (hasNext) {
              loadNext(NUMBER_OF_NOTIFICATIONS_TO_LOAD_NEXT)
            }
          }}
          isLoading={isLoadingNext}
        />
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
