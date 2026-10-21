import { startTransition, useEffect, useMemo, useRef } from 'react'

import { useLazyLoadQuery, usePaginationFragment } from 'react-relay'

import { GroupNotificationsListQuery as GroupNotificationsListQueryType } from '../../../../../__generated__/GroupNotificationsListQuery.graphql'
import { GroupNotificationsList_user$key } from '../../../../../__generated__/GroupNotificationsList_user.graphql'
import { GroupNotificationsListFragmentQuery } from '../../graphql/fragments/GroupNotificationsList'
import { GroupNotificationsListQuery } from '../../graphql/queries/GroupNotificationsList'
import { UseGroupNotificationsListReturn } from './types'

/**
 * Loads the notifications of one notification setting group for a `NotificationsList` filtered by
 * `group`, on web and native.
 */
const useGroupNotificationsList = (group: string): UseGroupNotificationsListReturn => {
  const options = { count: 10, group }
  const { me } = useLazyLoadQuery<GroupNotificationsListQueryType>(
    GroupNotificationsListQuery,
    options,
    { fetchPolicy: 'store-and-network' },
  )

  const { data, loadNext, isLoadingNext, hasNext, refetch } = usePaginationFragment<
    GroupNotificationsListQueryType,
    GroupNotificationsList_user$key
  >(GroupNotificationsListFragmentQuery, me)

  const refetchNotifications = () => {
    refetch(options, { fetchPolicy: 'network-only' })
  }

  const unreadNotificationIds = useMemo(
    () =>
      data?.notifications?.edges.flatMap((edge) => (edge?.node?.unread ? [edge.node.id] : [])) ??
      [],
    [data?.notifications?.edges],
  )

  // The notifications subscription prepends new notifications to the unfiltered list only, since
  // only the backend knows which group a verb belongs to. It does raise the user's unread count,
  // so a rise refetches this group's first page.
  const unreadCount = data?.notificationsUnreadCount
  const previousUnreadCount = useRef(unreadCount)
  useEffect(() => {
    const previous = previousUnreadCount.current
    previousUnreadCount.current = unreadCount
    if (typeof previous === 'number' && typeof unreadCount === 'number' && unreadCount > previous) {
      startTransition(refetchNotifications)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unreadCount])

  return {
    data,
    loadNext,
    isLoadingNext,
    hasNext,
    refetchNotifications,
    unreadNotificationIds,
  }
}

export default useGroupNotificationsList
