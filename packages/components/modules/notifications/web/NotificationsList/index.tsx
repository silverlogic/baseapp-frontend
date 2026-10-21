import { FC, MouseEvent, Suspense, useMemo } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, Divider, Typography } from '@mui/material'
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import { NotificationsListFragment$key } from '../../../../__generated__/NotificationsListFragment.graphql'
import { NotificationsListQuery as NotificationsListQueryType } from '../../../../__generated__/NotificationsListQuery.graphql'
import {
  NUMBER_OF_NOTIFICATIONS_TO_LOAD_NEXT,
  NotificationsListFragment,
  NotificationsListQuery,
  useGroupNotificationsList,
} from '../../common'
import DefaultEmptyState from './EmptyState'
import MarkAllAsReadButton from './MarkAllAsReadButton'
import DefaultNotificationItem from './NotificationItem'
import {
  HeaderContainer as DefaultHeaderContainer,
  ListContainer as DefaultListContainer,
  HeaderSpacer,
} from './styled'
import { NotificationsListContentProps, NotificationsListProps } from './types'

const NotificationsListContent: FC<NotificationsListContentProps> = ({
  data,
  loadNext,
  isLoadingNext,
  hasNext,
  refetchNotifications,
  unreadNotificationIds,
  setIsDrawerOpened,
  EmptyState = DefaultEmptyState,
  EmptyStateProps = {},
  LoadingState = DefaultLoadingState,
  LoadingStateProps = {},
  NotificationItem = DefaultNotificationItem,
  NotificationItemProps = {},
  HeaderContainer = DefaultHeaderContainer,
  ListContainer = DefaultListContainer,
}) => {
  const smDown = useResponsive('down', 'sm')

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
            refetchNotifications={refetchNotifications}
            {...NotificationItemProps}
          />
        </>
      )
    }
    return (
      <NotificationItem
        key={`notification-${notification.id}`}
        notification={notification}
        refetchNotifications={refetchNotifications}
        {...NotificationItemProps}
      />
    )
  }

  // In a list filtered by group, "Mark all as read" covers only that group's unread notifications;
  // the user's unread count includes every group, so it cannot decide whether to show the button.
  const hasUnread = unreadNotificationIds
    ? unreadNotificationIds.length > 0
    : !!data?.notificationsUnreadCount

  // A notification's link navigates on the client, which would leave the drawer open over the new
  // page.
  const closeOnLinkClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as Element).closest?.('a[href]')) setIsDrawerOpened(false)
  }

  const renderVirtuosoHeader = () => <HeaderSpacer />

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
    if (notifications.length === 0) return <EmptyState {...EmptyStateProps} />

    return (
      <ListContainer>
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
      </ListContainer>
    )
  }

  return (
    <Box display="grid" gridTemplateRows="min-content 1fr" height="100%" onClick={closeOnLinkClick}>
      <HeaderContainer>
        <Typography variant="h6">Notifications</Typography>
        <Box display="grid" gridTemplateColumns="max-content min-content">
          {hasUnread && (
            <MarkAllAsReadButton
              refetch={refetchNotifications}
              notificationIds={unreadNotificationIds}
            />
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

const AllNotificationsList: FC<NotificationsListProps> = (props) => {
  const options = { count: 10 }
  const { me } = useLazyLoadQuery<NotificationsListQueryType>(NotificationsListQuery, options, {
    fetchPolicy: 'store-and-network',
  })

  const { data, loadNext, isLoadingNext, hasNext, refetch } = usePaginationFragment<
    NotificationsListQueryType,
    NotificationsListFragment$key
  >(NotificationsListFragment, me)

  const refetchNotifications = () => {
    refetch(options, { fetchPolicy: 'network-only' })
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

  return <NotificationsListContent {...props} {...groupList} />
}

const NotificationsListSuspended: FC<NotificationsListProps> = ({ group, ...props }) => {
  const { LoadingState = DefaultLoadingState, LoadingStateProps = {} } = props

  return (
    <Suspense fallback={<LoadingState {...LoadingStateProps} />}>
      {group ? (
        <GroupNotificationsList {...props} group={group} />
      ) : (
        <AllNotificationsList {...props} />
      )}
    </Suspense>
  )
}

export default NotificationsListSuspended
