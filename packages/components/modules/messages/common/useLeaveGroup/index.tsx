import { ValueOf, useNotification } from '@baseapp-frontend/utils'

import { ConnectionHandler } from 'react-relay'

import { useUpdateChatRoomMutation } from '../graphql/mutations/UpdateChatRoom'
import {
  LEAVE_GROUP_DIALOG_TEXT_COPY,
  LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS,
  LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS,
  LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS,
} from './constants'
import { UseLeaveGroupProps } from './types'

const UseLeaveGroup = ({
  profileId,
  removingParticipantId,
  roomId,
  isSoleAdmin = false,
  onClose,
  removeSuccessMessage = 'Member was successfully removed',
}: UseLeaveGroupProps) => {
  const [commit, isMutationInFlight] = useUpdateChatRoomMutation()
  const { sendMutationErrorToast, sendToast } = useNotification()

  const getLeaveGroupDialogTextCopyKeys = () => {
    if (profileId === removingParticipantId) {
      return {
        action: LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING,
        role: isSoleAdmin
          ? LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN
          : LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.MEMBER,
      } as const
    }
    return {
      action: LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_REMOVING,
      role: LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN,
    } as const
  }

  const getLeaveGroupDialogTextCopy = (
    type: ValueOf<typeof LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS>,
  ) => {
    const { action, role } = getLeaveGroupDialogTextCopyKeys()
    return action === LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING
      ? LEAVE_GROUP_DIALOG_TEXT_COPY[action][role][type]
      : LEAVE_GROUP_DIALOG_TEXT_COPY[action][LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN][type]
  }

  const onRemoveConfirmed = () => {
    if (!roomId || !profileId || !removingParticipantId) return
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
        // Transport errors are already toasted by useUpdateChatRoomMutation's wrapper; this
        // flow isn't form-backed, so surface the payload errors here.
        const errorMessage = sendMutationErrorToast(response?.chatRoomUpdate?.errors, undefined)
        if (!errorMessage && removingParticipantId && removingParticipantId !== profileId) {
          sendToast(removeSuccessMessage)
        }
        onClose()
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
      },
    })
  }

  return {
    getLeaveGroupDialogTextCopy,
    getLeaveGroupDialogTextCopyKeys,
    onRemoveConfirmed,
    isMutationInFlight,
  }
}

export default UseLeaveGroup
