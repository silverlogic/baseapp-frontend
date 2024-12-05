'use client'

import { FC, Suspense, useState } from 'react'

import {
  NotificationBellIcon as DefaultNotificationBellIcon,
  useResponsive,
  varHover,
} from '@baseapp-frontend/design-system'

import { Badge as DefaultBadge, Drawer as DefaultDrawer } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { m } from 'framer-motion'
import { useFragment, useLazyLoadQuery } from 'react-relay'

import { NotificationUserMenuFragment$key } from '../../../__generated__/NotificationUserMenuFragment.graphql'
import { NotificationsPopoverQuery as NotificationsPopoverQueryType } from '../../../__generated__/NotificationsPopoverQuery.graphql'
import DefaultNotificationsList from '../NotificationsList'
import { NotificationUserMenuFragment } from '../graphql/queries/NotificationUserMenu'
import { NotificationsPopoverQuery } from '../graphql/queries/NotificationsPopover'
import useNotificationsSubscription from '../graphql/subscriptions/useNotificationsSubscription'
import { NotificationsPopoverProps } from './types'

const NotificationsPopover: FC<NotificationsPopoverProps> = ({
  Drawer = DefaultDrawer,
  DrawerProps = {},
  Badge = DefaultBadge,
  BadgeProps = {},
  NotificationBellIcon = DefaultNotificationBellIcon,
  NotificationBellIconProps = {},
  NotificationsList = DefaultNotificationsList,
  NotificationsListProps = {},
}) => {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)

  const { me } = useLazyLoadQuery<NotificationsPopoverQueryType>(
    NotificationsPopoverQuery,
    {},
    { fetchPolicy: 'store-and-network' },
  )

  const user = useFragment<NotificationUserMenuFragment$key>(NotificationUserMenuFragment, me)

  useNotificationsSubscription(user?.id)

  const smDown = useResponsive('down', 'sm')
  const { onClose, ...restDrawerProps } = DrawerProps

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={() => setIsDrawerOpened(true)}
        aria-label="see notifications"
      >
        <Badge badgeContent={user?.notificationsUnreadCount} color="error" {...BadgeProps}>
          <NotificationBellIcon color="secondary" {...NotificationBellIconProps} />
        </Badge>
      </IconButton>
      <Drawer
        anchor={smDown ? 'bottom' : 'right'}
        open={isDrawerOpened}
        onClose={(event, reason) => {
          setIsDrawerOpened(false)
          onClose?.(event, reason)
        }}
        sx={{
          '& .MuiDrawer-paper': {
            height: '100vh',
          },
        }}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 390, md: 420 },
          },
        }}
        {...restDrawerProps}
      >
        <NotificationsList setIsDrawerOpened={setIsDrawerOpened} {...NotificationsListProps} />
      </Drawer>
    </>
  )
}

const NotificationsPopoverSuspended: FC<NotificationsPopoverProps> = (props) => {
  const { NotificationBellIcon = DefaultNotificationBellIcon, NotificationBellIconProps = {} } =
    props

  return (
    <Suspense
      fallback={
        <IconButton disabled>
          <NotificationBellIcon color="secondary" {...NotificationBellIconProps} />
        </IconButton>
      }
    >
      <NotificationsPopover {...props} />
    </Suspense>
  )
}

export default NotificationsPopoverSuspended
