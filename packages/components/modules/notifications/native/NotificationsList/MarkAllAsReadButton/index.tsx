import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'

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
      Mark all as read
    </Button>
  )
}

export default MarkAllAsReadButton
