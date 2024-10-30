import { FC, Suspense, useMemo } from 'react'

import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay'

import { NotificationsListFragment$key } from '../../../../../__generated__/NotificationsListFragment.graphql'
import { NotificationsListQuery as NotificationsListQueryType } from '../../../../../__generated__/NotificationsListQuery.graphql'
import DefaultNotificationItem from '../../../NotificationsList/NotificationItem'
import { NotificationsListProps } from '../../../NotificationsList/types'
import {
  NotificationsListFragment,
  NotificationsListQuery,
} from '../../../graphql/queries/NotificationsList'

const CustomNotificationListForTest: FC<NotificationsListProps> = ({
  NotificationItem = DefaultNotificationItem,
}) => {
  const options = { count: 10 }
  const { me } = useLazyLoadQuery<NotificationsListQueryType>(NotificationsListQuery, options, {
    fetchPolicy: 'store-and-network',
  })

  const { data, loadNext, isLoadingNext, hasNext, refetch } = usePaginationFragment<
    NotificationsListQueryType,
    NotificationsListFragment$key
  >(NotificationsListFragment, me)

  const notifications = useMemo(
    () => data?.notifications?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.notifications?.edges],
  )

  return (
    <Box>
      <Typography>Custom notifications list</Typography>
      {notifications.map((notification, index) => {
        if (!notification) return null
        return <NotificationItem key={index} notification={notification} />
      })}
    </Box>
  )
}

const CustomNotificationsListSuspended: FC<NotificationsListProps> = (props) => {
  const { LoadingState = DefaultLoadingState, LoadingStateProps = {} } = props

  return (
    <Suspense fallback={<LoadingState {...LoadingStateProps} />}>
      <CustomNotificationListForTest {...props} />
    </Suspense>
  )
}

export default CustomNotificationsListSuspended
