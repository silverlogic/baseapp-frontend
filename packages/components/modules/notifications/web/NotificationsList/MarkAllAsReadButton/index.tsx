import { FC } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import { FormattedMessage } from 'react-intl'

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
      <FormattedMessage id="notifications.list.markAllAsRead" defaultMessage="Mark all as read" />
    </LoadingButton>
  )
}

export default MarkAllAsReadButton
