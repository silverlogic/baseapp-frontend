import { FC } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'

import { useNotificationsMarkAllAsRead } from '../../../common'
import { MarkAllAsReadButtonProps } from './types'

const MarkAllAsReadButton: FC<MarkAllAsReadButtonProps> = ({ refetch }) => {
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
    <LoadingButton color="primary" onClick={markAsRead} loading={isLoading}>
      Mark all as read
    </LoadingButton>
  )
}

export default MarkAllAsReadButton
