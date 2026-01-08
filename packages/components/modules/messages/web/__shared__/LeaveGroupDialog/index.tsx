'use client'

import { FC } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { LoadingButton } from '@mui/lab'
import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../../profiles/common'
import { LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS, useLeaveGroup } from '../../../common'
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
  const removingParticipantData = useFragment(
    ProfileItemFragment,
    removingParticipantFragmentRef ?? null,
  )

  const { getLeaveGroupDialogTextCopy, onRemoveConfirmed, isMutationInFlight } = useLeaveGroup({
    profileId,
    removingParticipantId: removingParticipantData?.id ?? profileId,
    roomId,
    isSoleAdmin,
    onClose,
  })

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
