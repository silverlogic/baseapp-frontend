'use client'

import { FC } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { ValueOf, useNotification } from '@baseapp-frontend/utils'

import { LoadingButton } from '@mui/lab'
import { ConnectionHandler, useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../../profiles/common'
import { useUpdateChatRoomMutation } from '../../../common'
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
  removingParticipantFragmentRef,
  roomId,
  isSoleAdmin = false,
}) => {
  const [commit, isMutationInFlight] = useUpdateChatRoomMutation()
  const { sendToast } = useNotification()

  const removingParticipantData = useFragment(
    ProfileItemFragment,
    removingParticipantFragmentRef ?? null,
  )

  const getLeaveGroupDialogTextCopy = (
    type: ValueOf<typeof LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS>,
  ) => {
    if (profileId === removingParticipantData?.id) {
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

  const getTitle = () => {
    if (customTitle) return customTitle

    // If the member being removed is NOT the current user's profile,
    // and we have access to that member's name data, display their actual name
    if (profileId !== removingParticipantData?.id && removingParticipantData?.name) {
      return `Remove ${removingParticipantData.name}?`
    }

    return getLeaveGroupDialogTextCopy(LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.TITLE)
  }

  const getContent = () => {
    if (customContent) return customContent

    return getLeaveGroupDialogTextCopy(LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.CONTENT)
  }

  const onRemoveConfirmed = () => {
    if (!roomId || !profileId) return
    commit({
      variables: {
        input: {
          roomId,
          profileId,
          removeParticipants: [removingParticipantData?.id || ''],
        },
        connections: [ConnectionHandler.getConnectionID(roomId, 'ChatRoom_participants')],
      },
      onCompleted: (response) => {
        if (
          removingParticipantData?.id &&
          removingParticipantData.id !== profileId &&
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
      title={getTitle()}
      content={getContent()}
      action={
        <LoadingButton
          color="error"
          onClick={onRemoveConfirmed}
          disabled={isMutationInFlight}
          loading={isMutationInFlight}
        >
          {removingParticipantData?.id === profileId ? 'Leave group' : 'Remove'}
        </LoadingButton>
      }
      onClose={onClose}
      open={open}
    />
  )
}

export default LeaveGroupDialog
