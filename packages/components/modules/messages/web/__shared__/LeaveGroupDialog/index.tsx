'use client'

import { FC } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { LoadingButton } from '@mui/lab'

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
  const { getLeaveGroupDialogTextCopy, onRemoveConfirmed, isMutationInFlight } = useLeaveGroup({
    profileId,
    removingParticipantId,
    roomId,
    isSoleAdmin,
    onClose,
  })

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
