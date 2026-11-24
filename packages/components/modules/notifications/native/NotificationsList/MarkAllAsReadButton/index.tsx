import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'

import { FormattedMessage } from 'react-intl'

import { useNotificationsMarkAllAsRead } from '../../../common'
import { MarkAllAsReadButtonProps } from './types'

const MarkAllAsReadButton: FC<MarkAllAsReadButtonProps> = ({ refetch, disabled = false }) => {
  const [commitMutation, isLoading] = useNotificationsMarkAllAsRead()
  const markAsRead = () => {
    commitMutation({
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
