import { FC } from 'react'

import { Box } from '@mui/material'
import { useFragment } from 'react-relay'

import { NotificationItemFragment } from '../../../../common'
import { NotificationItemProps } from '../../../NotificationsList/NotificationItem/types'
import { NotificationBox } from './styled'

const CustomNotificationItemForTest: FC<NotificationItemProps> = ({
  notification: notificationRef,
}) => {
  const notification = useFragment(NotificationItemFragment, notificationRef)
  return <NotificationBox>{notification?.description}</NotificationBox>
}

export default CustomNotificationItemForTest
