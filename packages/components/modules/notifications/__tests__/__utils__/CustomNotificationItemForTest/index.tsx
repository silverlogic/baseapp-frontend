import { FC } from 'react'

import { Box } from '@mui/material'
import { useFragment } from 'react-relay'

import { NotificationItemProps } from '../../../NotificationsList/NotificationItem/types'
import { NotificationItemFragment } from '../../../graphql/queries/NotificationItem'

const CustomNotificationItemForTest: FC<NotificationItemProps> = ({
  notification: notificationRef,
}) => {
  const notification = useFragment(NotificationItemFragment, notificationRef)
  return (
    <Box
      sx={{
        border: '1px solid',
        color: 'grey.500',
        padding: '12px 8px',
        borderRadius: 2,
        marginBottom: 2,
      }}
    >
      {notification?.description}
    </Box>
  )
}

export default CustomNotificationItemForTest
