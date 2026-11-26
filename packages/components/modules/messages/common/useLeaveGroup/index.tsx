import { ValueOf, useNotification } from '@baseapp-frontend/utils'

import { useIntl } from 'react-intl'
import { ConnectionHandler } from 'react-relay'

import { useUpdateChatRoomMutation } from '../graphql/mutations/UpdateChatRoom'
import {
  LEAVE_GROUP_DIALOG_COPY_MESSAGES,
  LEAVE_GROUP_DIALOG_MESSAGES,
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
  participantsCount,
  onClose,
  removeSuccessMessage,
}: UseLeaveGroupProps) => {
  const intl = useIntl()
  const [commit, isMutationInFlight] = useUpdateChatRoomMutation()
  const { sendMutationErrorToast, sendToast } = useNotification()

  // A sole admin who is also the last participant has no one to hand the role to.
  const hasOtherParticipants = participantsCount == null || participantsCount > 1
  const isLeavingAsSoleAdmin = isSoleAdmin && hasOtherParticipants

  const getLeaveGroupDialogTextCopyKeys = () => {
    if (profileId === removingParticipantId) {
      return {
        action: LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING,
        role: isLeavingAsSoleAdmin
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
    const messages =
      action === LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING
        ? LEAVE_GROUP_DIALOG_COPY_MESSAGES[action][role]
        : LEAVE_GROUP_DIALOG_COPY_MESSAGES[action][LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN]
    return intl.formatMessage(
      type === LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.TITLE ? messages.title : messages.content,
    )
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
          sendToast(
            removeSuccessMessage ?? intl.formatMessage(LEAVE_GROUP_DIALOG_MESSAGES.removeSuccess),
          )
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
