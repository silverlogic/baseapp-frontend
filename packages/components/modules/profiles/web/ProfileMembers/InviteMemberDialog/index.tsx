'use client'

import { FC, Suspense, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { getGraphQLErrorMessage } from '@baseapp-frontend/graphql'
import { getMutationErrorMessage, useNotification } from '@baseapp-frontend/utils'

import { LoadingButton } from '@mui/lab'
import { Box, TextField, Typography } from '@mui/material'

import { useProfileUserRoleCreateMutation } from '../../../common/graphql/mutations/ProfileUserRoleCreate'
import { useSendInvitationMutation } from '../../../common/graphql/mutations/SendInvitation'
import MemberSearch from './MemberSearch'
import { INVITE_MEMBER_DIALOG_COPY as COPY, DEFAULT_INVITE_ROLE } from './constants'
import { InviteMemberDialogProps, SelectedEmail, SelectedMember, SelectedProfile } from './types'
import {
  BatchError,
  getMemberKey,
  isFulfilled,
  isRejected,
  isSelectedEmail,
  isSelectedProfile,
} from './utils'

const InviteMemberDialog: FC<InviteMemberDialogProps> = ({ open, onClose, connections }) => {
  const { currentProfile } = useCurrentProfile()
  const { sendToast } = useNotification()
  const [selected, setSelected] = useState<SelectedMember[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createMembers] = useProfileUserRoleCreateMutation()
  const [sendInvitation] = useSendInvitationMutation()

  const handleAdd = (member: SelectedMember) =>
    setSelected((prev) =>
      prev.some((item) => getMemberKey(item) === getMemberKey(member)) ? prev : [...prev, member],
    )

  const handleRemove = (memberKey: string) =>
    setSelected((prev) => prev.filter((item) => getMemberKey(item) !== memberKey))

  const resetState = () => {
    setSelected([])
    setIsSubmitting(false)
  }

  const handleClose = () => {
    // Don't tear down state / close while a submit is still settling — the in-flight
    // continuation in handleSubmit could otherwise reset or close a reopened dialog.
    if (isSubmitting) return
    resetState()
    onClose()
  }

  // Add the batch of selected profiles. Resolves with the members written on success, or
  // rejects with the same members (so they stay selected) and a message on failure.
  const addMembers = (profileId: string, members: SelectedProfile[]) =>
    new Promise<SelectedMember[]>((resolve, reject) => {
      const usersIds = members.map((member) => member.userId)
      createMembers({
        variables: { input: { profileId, usersIds, roleType: DEFAULT_INVITE_ROLE }, connections },
        onCompleted: (response, errors) => {
          const message = getMutationErrorMessage(response?.profileUserRoleCreate?.errors, errors, {
            defaultMessage: 'Failed to add members',
          })
          if (message) reject(new BatchError(message, members))
          else resolve(members)
        },
        onError: (error) =>
          reject(new BatchError(getGraphQLErrorMessage(error, 'Failed to add members'), members)),
      })
    })

  // Send the batch of email invitations in a single request. Resolves with the invited
  // members on success, or rejects with them (kept selected) and a message on failure.
  const inviteEmails = (profileId: string, members: SelectedEmail[]) =>
    new Promise<SelectedMember[]>((resolve, reject) => {
      sendInvitation({
        variables: {
          input: {
            profileId,
            emails: members.map((member) => member.email),
            role: DEFAULT_INVITE_ROLE,
          },
          connections,
        },
        onCompleted: (response, errors) => {
          const message = getMutationErrorMessage(response?.profileSendInvitation?.errors, errors, {
            defaultMessage: 'Failed to send invitations',
          })
          if (message) reject(new BatchError(message, members))
          else resolve(members)
        },
        onError: (error) =>
          reject(
            new BatchError(getGraphQLErrorMessage(error, 'Failed to send invitations'), members),
          ),
      })
    })

  const handleSubmit = async () => {
    const profileId = currentProfile?.id
    if (!profileId || selected.length === 0) return

    const profileMembers = selected.filter(isSelectedProfile)
    const emailMembers = selected.filter(isSelectedEmail)

    const tasks: Promise<SelectedMember[]>[] = []
    if (profileMembers.length > 0) tasks.push(addMembers(profileId, profileMembers))
    if (emailMembers.length > 0) tasks.push(inviteEmails(profileId, emailMembers))

    setIsSubmitting(true)
    const results = await Promise.allSettled(tasks)

    const succeeded = results.filter(isFulfilled).flatMap((result) => result.value)
    const failed = results.filter(isRejected).map((result) => result.reason as BatchError)
    const failedMembers = failed.flatMap((error) => error.members)

    // Surface each failure (network errors are also toasted by the mutation hooks, but the
    // batched/field messages here are more specific).
    failed.forEach((error) => sendToast(error.message, { type: 'error' }))

    if (succeeded.length > 0) {
      sendToast(succeeded.length === 1 ? 'Member added' : `${succeeded.length} members added`, {
        type: 'success',
      })
    }

    if (failedMembers.length === 0) {
      resetState()
      onClose()
      return
    }

    // Keep only the entries that failed so the user can retry just those.
    const failedKeys = new Set(failedMembers.map(getMemberKey))
    setSelected((prev) => prev.filter((member) => failedKeys.has(getMemberKey(member))))
    setIsSubmitting(false)
  }

  return (
    <ConfirmDialog
      title={COPY.title}
      open={open}
      onClose={handleClose}
      cancelText={COPY.cancel}
      customMaxWidth={400}
      content={
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {COPY.description}
          </Typography>
          {open && (
            <Suspense
              fallback={
                <TextField fullWidth size="small" disabled placeholder={COPY.searchPlaceholder} />
              }
            >
              <MemberSearch selected={selected} onAdd={handleAdd} onRemove={handleRemove} />
            </Suspense>
          )}
        </Box>
      }
      action={
        <LoadingButton
          variant="contained"
          color="inherit"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting || selected.length === 0}
        >
          {COPY.submit}
        </LoadingButton>
      }
    />
  )
}

export default InviteMemberDialog
