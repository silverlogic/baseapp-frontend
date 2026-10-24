'use client'

import { FC } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { LoadingButton } from '@mui/lab'
import { useIntl } from 'react-intl'
import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../../profiles/common'
import {
  LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS,
  LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS,
  useLeaveGroup,
} from '../../../common'
import { SHARED_MESSAGES } from '../constants'
import { LEAVE_GROUP_DIALOG_COPY_MESSAGES, LEAVE_GROUP_DIALOG_MESSAGES } from './constants'
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
  const intl = useIntl()
  const removingParticipantData = useFragment(
    ProfileItemFragment,
    removingParticipantFragmentRef ?? null,
  )

  const { getLeaveGroupDialogTextCopyKeys, onRemoveConfirmed, isMutationInFlight } = useLeaveGroup({
    profileId,
    removingParticipantId: removingParticipantData?.id ?? profileId,
    roomId,
    isSoleAdmin,
    onClose,
    removeSuccessMessage: intl.formatMessage(LEAVE_GROUP_DIALOG_MESSAGES.removeSuccess),
  })

  const getCopyMessages = () => {
    const { action, role } = getLeaveGroupDialogTextCopyKeys()
    return action === LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING
      ? LEAVE_GROUP_DIALOG_COPY_MESSAGES[action][role]
      : LEAVE_GROUP_DIALOG_COPY_MESSAGES[action][LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN]
  }

  const getTitle = () => {
    if (customTitle) return customTitle

    // If the member being removed is NOT the current user's profile,
    // and we have access to that member's name data, display their actual name
    if (profileId !== removingParticipantData?.id && removingParticipantData?.name) {
      return intl.formatMessage(LEAVE_GROUP_DIALOG_MESSAGES.removeNamedTitle, {
        name: removingParticipantData.name,
      })
    }

    return intl.formatMessage(getCopyMessages().title)
  }

  const getContent = () => {
    if (customContent) return customContent

    return intl.formatMessage(getCopyMessages().content)
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
          {intl.formatMessage(
            getLeaveGroupDialogTextCopyKeys().action ===
              LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING
              ? LEAVE_GROUP_DIALOG_MESSAGES.leaveGroupButton
              : SHARED_MESSAGES.remove,
          )}
        </LoadingButton>
      }
      onClose={onClose}
      open={open}
    />
  )
}

export default LeaveGroupDialog
