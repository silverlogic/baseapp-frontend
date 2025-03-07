'use client'

import { FC } from 'react'

import { Badge } from '@baseapp-frontend/design-system/components/native/badges'
import { BellIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useFragment, useLazyLoadQuery } from 'react-relay'

import { NotificationUserMenuFragment$key } from '../../../../__generated__/NotificationUserMenuFragment.graphql'
import { NotificationsPopoverQuery as NotificationsPopoverQueryType } from '../../../../__generated__/NotificationsPopoverQuery.graphql'
import {
  NotificationUserMenuFragment,
  NotificationsPopoverQuery,
  useNotificationsSubscription,
} from '../../common'
import { createStyles } from './styles'
import { NotificationBellWithBadgeProps } from './types'

const NotificationBellWithBadge: FC<NotificationBellWithBadgeProps> = ({ isActive = false }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

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
        <Badge style={styles.badge}>
          {user.notificationsUnreadCount >= 100 ? '99+' : user.notificationsUnreadCount}
        </Badge>
      )}
    </View>
  )
}

export default NotificationBellWithBadge
