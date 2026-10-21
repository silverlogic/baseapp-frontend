import { FC } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'

import { useNotificationsMarkAllAsRead, useNotificationsMarkAsRead } from '../../../common'
import { MarkAllAsReadButtonProps } from './types'

const MarkAllAsReadButton: FC<MarkAllAsReadButtonProps> = ({ refetch, notificationIds }) => {
  const [commitMarkAllAsRead, isMarkingAll] = useNotificationsMarkAllAsRead()
  const [commitMarkAsRead, isMarkingSome] = useNotificationsMarkAsRead()

  const markAsRead = () => {
    if (notificationIds) {
      commitMarkAsRead({
        onCompleted: refetch,
        variables: { input: { read: true, notificationIds: [...notificationIds] } },
      })
      return
    }
    commitMarkAllAsRead({
      onCompleted: refetch,
      variables: {
        input: {
          read: true,
        },
      },
    })
  }

  return (
    <LoadingButton color="primary" onClick={markAsRead} loading={isMarkingAll || isMarkingSome}>
      Mark all as read
    </LoadingButton>
  )
}

export default MarkAllAsReadButton
