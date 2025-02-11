'use client'

import { FC } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { useNotification } from '@baseapp-frontend/utils'

import { LoadingButton } from '@mui/lab'
import { ConnectionHandler } from 'react-relay'

import { useUpdateChatRoomMutation } from '../../../common'
import { LeaveGroupDialogProps } from './types'

const LeaveGroupDialog: FC<LeaveGroupDialogProps> = ({
  title = 'Leave group chat?',
  content = 'You will stop receiving messages from this conversation and people will see that you left.',
  onClose,
  open,
  profileId,
  removingParticipantId,
  removingParticipantName,
  roomId,
}) => {
  const [commit, isMutationInFlight] = useUpdateChatRoomMutation()
  const { sendToast } = useNotification()

  const onRemoveConfirmed = () => {
    if (!roomId || !profileId) return
    commit({
      variables: {
        input: {
          roomId,
          profileId,
          removeParticipants: [removingParticipantId ?? profileId],
        },
        connections: [ConnectionHandler.getConnectionID(roomId, 'ChatRoom_participants')],
      },
      onCompleted: (response) => {
        if (
          removingParticipantId &&
          removingParticipantId !== profileId &&
          !response?.chatRoomUpdate?.errors
        ) {
          sendToast(`${removingParticipantName} was successfully removed`)
        }
        onClose()
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
      },
    })
  }

  return (
    <ConfirmDialog
      title={title}
      content={content}
      action={
        <LoadingButton
          color="error"
          onClick={onRemoveConfirmed}
          disabled={isMutationInFlight}
          loading={isMutationInFlight}
        >
          {removingParticipantId === profileId ? 'Leave group' : 'Remove'}
        </LoadingButton>
      }
      onClose={onClose}
      open={open}
    />
  )
}

export default LeaveGroupDialog
