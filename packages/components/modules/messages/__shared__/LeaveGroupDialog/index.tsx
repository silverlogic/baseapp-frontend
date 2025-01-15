'use client'

import { FC } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system'
import { ValueOf, useNotification } from '@baseapp-frontend/utils'

import { LoadingButton } from '@mui/lab'
import { ConnectionHandler } from 'react-relay'

import { useUpdateChatRoomMutation } from '../../graphql/mutations/UpdateChatRoom'
import {
  LEAVE_GROUP_DIALOG_TEXT_COPY,
  LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS,
  LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS,
  LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS,
} from './constants'
import { LeaveGroupDialogProps } from './types'

const LeaveGroupDialog: FC<LeaveGroupDialogProps> = ({
  customTitle,
  customContent,
  onClose,
  open,
  profileId,
  removingParticipantId,
  roomId,
  isSoleAdmin = false,
}) => {
  const [commit, isMutationInFlight] = useUpdateChatRoomMutation()
  const { sendToast } = useNotification()

  const getLeaveGroupDialogTextCopy = (
    type: ValueOf<typeof LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS>,
  ) => {
    if (profileId === removingParticipantId) {
      if (isSoleAdmin) {
        return LEAVE_GROUP_DIALOG_TEXT_COPY[LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING][
          LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN
        ][type]
      }
      return LEAVE_GROUP_DIALOG_TEXT_COPY[LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING][
        LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.MEMBER
      ][type]
    }
    return LEAVE_GROUP_DIALOG_TEXT_COPY[LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_REMOVING][
      LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN
    ][type]
  }

  const onRemoveConfirmed = () => {
    if (!roomId || !profileId) return
    commit({
      variables: {
        input: {
          roomId,
          profileId,
          removeParticipants: [removingParticipantId],
        },
        connections: [ConnectionHandler.getConnectionID(roomId, 'ChatRoom_participants')],
      },
      onCompleted: (response) => {
        if (
          removingParticipantId &&
          removingParticipantId !== profileId &&
          !response?.chatRoomUpdate?.errors
        ) {
          sendToast('Member was successfully removed')
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
      title={
        customTitle ?? getLeaveGroupDialogTextCopy(LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.TITLE)
      }
      content={
        customContent ?? getLeaveGroupDialogTextCopy(LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.CONTENT)
      }
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
