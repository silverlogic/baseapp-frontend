import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'

import { FormattedMessage } from 'react-intl'

import { useNotificationsMarkAllAsRead, useNotificationsMarkAsRead } from '../../../common'
import { MarkAllAsReadButtonProps } from './types'

const MarkAllAsReadButton: FC<MarkAllAsReadButtonProps> = ({
  refetch,
  disabled = false,
  notificationIds,
}) => {
  const [commitMarkAllAsRead, isMarkingAll] = useNotificationsMarkAllAsRead()
  const [commitMarkAsRead, isMarkingSome] = useNotificationsMarkAsRead()
  const isLoading = isMarkingAll || isMarkingSome

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
    <Button
      size="small"
      mode="text"
      loading={isLoading}
      onPress={markAsRead}
      disabled={disabled || isLoading}
    >
      <FormattedMessage id="notifications.list.markAllAsRead" defaultMessage="Mark all as read" />
    </Button>
  )
}

export default MarkAllAsReadButton
