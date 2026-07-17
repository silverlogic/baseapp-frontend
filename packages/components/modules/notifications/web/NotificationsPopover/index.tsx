'use client'

import { FC, Suspense, useState } from 'react'

import { varHover } from '@baseapp-frontend/design-system/components/web/animate'
import { NotificationBellIcon as DefaultNotificationBellIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { tw } from '@baseapp-frontend/design-system/utils/web'

import { Badge as DefaultBadge, Drawer as DefaultDrawer, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { m } from 'framer-motion'
import { useFragment, useLazyLoadQuery } from 'react-relay'

import { NotificationUserMenuFragment$key } from '../../../../__generated__/NotificationUserMenuFragment.graphql'
import { NotificationsPopoverQuery as NotificationsPopoverQueryType } from '../../../../__generated__/NotificationsPopoverQuery.graphql'
import { NAV_WIDTH } from '../../../navigations/web/constants'
import {
  useNotificationsSubscription as DefaultUseNotificationsSubscription,
  NotificationUserMenuFragment,
  NotificationsPopoverQuery,
} from '../../common'
import DefaultNotificationsList from '../NotificationsList'
import { NotificationsButton } from './styled'
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
  useNotificationsSubscription = DefaultUseNotificationsSubscription,
  showLabel = false,
  currentLayout,
  labelComponent,
}) => {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)

  const { me } = useLazyLoadQuery<NotificationsPopoverQueryType>(
    NotificationsPopoverQuery,
    {},
    { fetchPolicy: 'store-and-network' },
  )

  const user = useFragment<NotificationUserMenuFragment$key>(NotificationUserMenuFragment, me)

  useNotificationsSubscription(user?.id || '')

  const smDown = useResponsive('down', 'sm')
  const { onClose, anchor: anchorOverride, sx: sxOverride, ...restDrawerProps } = DrawerProps
  const sxOverrideBase = sxOverride ?? []
  const normalizedSxOverride = Array.isArray(sxOverrideBase) ? sxOverrideBase : [sxOverrideBase]

  const isVerticalLayout = currentLayout === 'vertical' || currentLayout === 'mini'
  const navWidth = currentLayout === 'mini' ? NAV_WIDTH.MINI : NAV_WIDTH.VERTICAL

  const getDefaultDrawerAnchor = () => {
    if (smDown) return 'bottom'
    return 'right'
  }
  const drawerAnchor = anchorOverride ?? getDefaultDrawerAnchor()

  return (
    <>
      {showLabel ? (
        <NotificationsButton
          mini={currentLayout === 'mini'}
          variant="text"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsDrawerOpened(true)
            }
          }}
          onClick={() => setIsDrawerOpened(true)}
          aria-label="see notifications"
        >
          <Badge badgeContent={user?.notificationsUnreadCount} color="error" {...BadgeProps}>
            <NotificationBellIcon color="secondary" {...NotificationBellIconProps} />
          </Badge>
          {labelComponent || (
            <Typography
              color="text.secondary"
              variant="body2"
              fontWeight={currentLayout === 'mini' ? 600 : 500}
              fontSize={currentLayout === 'mini' ? 10 : 14}
            >
              Notifications
            </Typography>
          )}
        </NotificationsButton>
      ) : (
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
      )}
      <Drawer
        anchor={drawerAnchor}
        open={isDrawerOpened}
        onClose={(event, reason) => {
          setIsDrawerOpened(false)
          onClose?.(event, reason)
        }}
        sx={[
          {
            '& .MuiDrawer-paper': {
              height: '100vh',
              ...(drawerAnchor === 'left' &&
                isVerticalLayout &&
                !smDown && { marginLeft: `${navWidth}px` }),
            },
          },
          ...normalizedSxOverride,
        ]}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 390, md: 420 },
          },
        }}
        {...restDrawerProps}
      >
        <NotificationsList {...NotificationsListProps} setIsDrawerOpened={setIsDrawerOpened} />
      </Drawer>
    </>
  )
}

const NotificationsPopoverSuspended: FC<NotificationsPopoverProps> = (props) => {
  const {
    NotificationBellIcon = DefaultNotificationBellIcon,
    NotificationBellIconProps = {},
    showLabel = false,
    labelComponent,
    currentLayout,
  } = props

  return (
    <Suspense
      fallback={
        <div
          className={tw(
            'flex w-full flex-wrap items-center gap-2',
            currentLayout === 'mini' && 'justify-center gap-0',
          )}
        >
          <IconButton disabled>
            <NotificationBellIcon color="secondary" {...NotificationBellIconProps} />
          </IconButton>
          {showLabel
            ? (labelComponent ?? (
                <Typography
                  color="text.secondary"
                  variant="body2"
                  fontWeight={currentLayout === 'mini' ? 600 : 500}
                  fontSize={currentLayout === 'mini' ? 10 : 14}
                >
                  Notifications
                </Typography>
              ))
            : null}
        </div>
      }
    >
      <NotificationsPopover {...props} />
    </Suspense>
  )
}

export default NotificationsPopoverSuspended
