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
  useGroupNotificationsList,
  useNotificationsSubscription,
} from '../../common'
import { NotificationsNode } from '../../common/types'
import Divider from './Divider'
import DefaultEmptyState from './EmptyState'
import MarkAllAsReadButton from './MarkAllAsReadButton'
import DefaultNotificationItem from './NotificationItem'
import { createStyles } from './styles'
import { NotificationsListContentProps, NotificationsListProps } from './types'

const NotificationsListContent: FC<NotificationsListContentProps> = ({
  data,
  loadNext,
  isLoadingNext,
  hasNext,
  refetchNotifications,
  unreadNotificationIds,
  EmptyState = DefaultEmptyState,
  NotificationItem = DefaultNotificationItem,
  NotificationItemProps = {},
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const notifications = useMemo(
    () => data?.notifications?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.notifications?.edges],
  )

  // In a list filtered by group, "Mark all as read" covers only that group's unread notifications;
  // the user's unread count includes every group, so it cannot decide whether to enable the button.
  const hasUnread = unreadNotificationIds
    ? unreadNotificationIds.length > 0
    : !!data?.notificationsUnreadCount

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
          renderItem={({ item, index }: { item: NotificationsNode; index: number }) =>
            renderNotificationItem(item, index)
          }
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
          disabled={!hasUnread}
          notificationIds={unreadNotificationIds}
        />
      </View>
      {renderContent()}
    </View>
  )
}

const AllNotificationsList: FC<NotificationsListProps> = (props) => {
  const options = { count: 10 }
  const { me } = useLazyLoadQuery<NotificationsListQueryType>(NotificationsListQuery, options, {
    fetchPolicy: 'store-and-network',
  })

  const { data, loadNext, isLoadingNext, hasNext, refetch } = usePaginationFragment<
    NotificationsListQueryType,
    NotificationsListFragment$key
  >(NotificationsListFragment, me)

  useNotificationsSubscription(me?.id)

  const refetchNotifications = () => {
    refetch(options, { fetchPolicy: 'store-and-network' })
  }

  return (
    <NotificationsListContent
      {...props}
      data={data}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
      hasNext={hasNext}
      refetchNotifications={refetchNotifications}
    />
  )
}

const GroupNotificationsList: FC<NotificationsListProps & { group: string }> = ({
  group,
  ...props
}) => {
  const groupList = useGroupNotificationsList(group)

  // keeps the user's unread count live, which refetches this group when a notification arrives
  useNotificationsSubscription(groupList.data?.id)

  return <NotificationsListContent {...props} {...groupList} />
}

const SuspendedNotificationsList = ({ group, ...props }: NotificationsListProps) => {
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
      {group ? (
        <GroupNotificationsList {...props} group={group} />
      ) : (
        <AllNotificationsList {...props} />
      )}
    </Suspense>
  )
}

export default SuspendedNotificationsList
