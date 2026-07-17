'use client'

import { FC, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { useNotification } from '@baseapp-frontend/utils'

import { LoadingButton } from '@mui/lab'

import { toggleGroupSelection, useAddParticipantToChatRoomsMutation } from '../../common'
import GroupsList from './GroupsList'
import { AddContactToGroupDialogProps } from './types'

const AddContactToGroupDialog: FC<AddContactToGroupDialogProps> = ({
  contactProfileId,
  open,
  onClose,
}) => {
  const { sendToast } = useNotification()
  const { currentProfile } = useCurrentProfile()
  const profileId = currentProfile?.id ?? ''

  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set())
  const [commitAddToGroups, isMutationInFlight] = useAddParticipantToChatRoomsMutation()

  const handleToggle = (groupId: string) => {
    setSelectedIds((previous) => toggleGroupSelection(previous, groupId))
  }

  const handleClose = () => {
    setSelectedIds(new Set())
    onClose()
  }

  const confirmDisabled = selectedIds.size === 0 || isMutationInFlight

  const handleConfirm = () => {
    if (!profileId || confirmDisabled) return

    commitAddToGroups({
      variables: {
        input: {
          profileId,
          participantProfileId: contactProfileId,
          roomIds: [...selectedIds],
        },
        contactProfileId,
      },
      onCompleted: (response) => {
        const errors = response?.chatRoomsAddParticipant?.errors
        if (errors?.length) {
          sendToast('Something went wrong', { type: 'error' })
        } else {
          handleClose()
        }
      },
    })
  }

  return (
    <ConfirmDialog
      title="Add contact to a group"
      customMaxWidth={480}
      DialogContentProps={{
        sx: {
          padding: 0,
          typography: 'body1',
          color: 'text.primary',
        },
      }}
      content={
        <GroupsList
          contactProfileId={contactProfileId}
          selectedIds={selectedIds}
          onToggle={handleToggle}
        />
      }
      action={
        <LoadingButton
          onClick={handleConfirm}
          disabled={confirmDisabled}
          loading={isMutationInFlight}
        >
          Add to Group
        </LoadingButton>
      }
      onClose={handleClose}
      open={open}
    />
  )
}

export default AddContactToGroupDialog
