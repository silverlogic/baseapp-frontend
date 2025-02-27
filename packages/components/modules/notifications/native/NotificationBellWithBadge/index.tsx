'use client'

import { FC, Suspense } from 'react'

import { Badge } from '@baseapp-frontend/design-system/components/native/badges'
import { BellIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { useFragment, useLazyLoadQuery } from 'react-relay'

import { NotificationUserMenuFragment$key } from '../../../../__generated__/NotificationUserMenuFragment.graphql'
import { NotificationsPopoverQuery as NotificationsPopoverQueryType } from '../../../../__generated__/NotificationsPopoverQuery.graphql'
import {
  NotificationUserMenuFragment,
  NotificationsPopoverQuery,
  useNotificationsSubscription,
} from '../../common'
import { NotificationBellWithBadgeProps } from './types'

const NotificationBellWithBadge: FC<NotificationBellWithBadgeProps> = ({ isActive = false }) => {
  const { me } = useLazyLoadQuery<NotificationsPopoverQueryType>(
    NotificationsPopoverQuery,
    {},
    { fetchPolicy: 'store-and-network' },
  )

  const user = useFragment<NotificationUserMenuFragment$key>(NotificationUserMenuFragment, me)

  useNotificationsSubscription(user?.id)

  return (
    <View>
      <BellIcon width="24" height="24" isActive={isActive} />
      {!!user?.notificationsUnreadCount && (
        <Badge>{user.notificationsUnreadCount > 99 ? '99+' : user.notificationsUnreadCount}</Badge>
      )}
    </View>
  )
}

const SuspendedNotificationBellWithBadge = (props: NotificationBellWithBadgeProps) => {
  const { isActive } = props

  return (
    <Suspense fallback={<BellIcon width="24" height="24" isActive={isActive} />}>
      <NotificationBellWithBadge {...props} />
    </Suspense>
  )
}

export default SuspendedNotificationBellWithBadge
