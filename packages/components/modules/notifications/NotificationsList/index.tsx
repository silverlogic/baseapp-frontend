import { FC, Suspense, useMemo } from 'react'

import {
  CloseIcon,
  LoadingState as DefaultLoadingState,
  IconButton,
  useResponsive,
} from '@baseapp-frontend/design-system'

import { Box, Divider, Typography } from '@mui/material'
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import { NotificationsListFragment$key } from '../../../__generated__/NotificationsListFragment.graphql'
import { NotificationsListQuery as NotificationsListQueryType } from '../../../__generated__/NotificationsListQuery.graphql'
import {
  NotificationsListFragment,
  NotificationsListQuery,
} from '../graphql/queries/NotificationsList'
import useNotificationsSubscription from '../graphql/subscriptions/useNotificationsSubscription'
import DefaultEmptyState from './EmptyState'
import MarkAllAsReadButton from './MarkAllAsReadButton'
import DefaultNotificationItem from './NotificationItem'
import { NUMBER_OF_NOTIFICATIONS_TO_LOAD_NEXT } from './constants'
import { HeaderContainer } from './styled'
import { NotificationsListProps } from './types'

const NotificationsList: FC<NotificationsListProps> = ({
  setIsDrawerOpened,
  EmptyState = DefaultEmptyState,
  LoadingState = DefaultLoadingState,
  LoadingStateProps = {},
  NotificationItem = DefaultNotificationItem,
  NotificationItemProps = {},
}) => {
  const smDown = useResponsive('down', 'sm')

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

  const renderNotificationItem = (notification: any, index: number) => {
    if (!notification) return null
    if (!notification.unread && notifications[index - 1]?.unread) {
      return (
        <>
          <Divider>
            <Typography variant="body2">Older</Typography>
          </Divider>
          <NotificationItem
            key={`notification-${notification.id}`}
            notification={notification}
            {...NotificationItemProps}
          />
        </>
      )
    }
    return (
      <NotificationItem
        key={`notification-${notification.id}`}
        notification={notification}
        {...NotificationItemProps}
      />
    )
  }

  const renderVirtuosoHeader = () => <div className="h-2" />

  const renderVirtuosoLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3 }}
        CircularProgressProps={{ size: 15 }}
        {...LoadingStateProps}
      />
    )
  }

  const renderContent = () => {
    if (notifications.length === 0) return <EmptyState />

    return (
      <Box sx={{ backgroundColor: 'common.white' }}>
        <Virtuoso
          data={notifications}
          // TODO: using overscan can cause Maximum call stack size exceeded error
          // overscan={NUMBER_OF_NOTIFICATIONS_TO_LOAD_NEXT}
          style={{ height: 'calc(100vh - 68px)' }}
          itemContent={(index, notification) => renderNotificationItem(notification, index)}
          components={{
            Header: renderVirtuosoHeader,
            Footer: renderVirtuosoLoadingState,
          }}
          endReached={() => {
            if (hasNext) {
              loadNext(NUMBER_OF_NOTIFICATIONS_TO_LOAD_NEXT)
            }
          }}
        />
      </Box>
    )
  }

  const refetchNotifications = () => {
    refetch(options, { fetchPolicy: 'network-only' })
  }

  return (
    <Box display="grid" gridTemplateRows="min-content 1fr" height="100%">
      <HeaderContainer>
        <Typography variant="h6">Notifications</Typography>
        <Box display="grid" gridTemplateColumns="max-content min-content">
          {!!data?.notificationsUnreadCount && (
            <MarkAllAsReadButton refetch={refetchNotifications} />
          )}
          {smDown && (
            <IconButton onClick={() => setIsDrawerOpened(false)} aria-label="close notifications">
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </HeaderContainer>
      {renderContent()}
    </Box>
  )
}

const NotificationsListSuspended: FC<NotificationsListProps> = (props) => {
  const { LoadingState = DefaultLoadingState, LoadingStateProps = {} } = props

  return (
    <Suspense fallback={<LoadingState {...LoadingStateProps} />}>
      <NotificationsList {...props} />
    </Suspense>
  )
}

export default NotificationsListSuspended
