'use client'

import { FC, Suspense, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { getGraphQLErrorMessage } from '@baseapp-frontend/graphql'
import { getMutationErrorMessage, useNotification } from '@baseapp-frontend/utils'

import { LoadingButton } from '@mui/lab'
import { Box, MenuItem, TextField, Typography } from '@mui/material'

import { ProfileUserRoleCreateInput } from '../../../../../__generated__/ProfileUserRoleCreateMutation.graphql'
import { ProfileSendInvitationInput } from '../../../../../__generated__/SendInvitationMutation.graphql'
import { useProfileUserRoleCreateMutation } from '../../../common/graphql/mutations/ProfileUserRoleCreate'
import { useSendInvitationMutation } from '../../../common/graphql/mutations/SendInvitation'
import MemberSearch from './MemberSearch'
import { DEFAULT_INVITE_ROLE, INVITE_MEMBER_DIALOG_COPY } from './constants'
import {
  InviteMemberDialogProps,
  InviteMemberExtraValues,
  SelectedEmail,
  SelectedMember,
  SelectedProfile,
} from './types'
import {
  BatchError,
  buildAddMembersInput,
  buildSendInvitationInput,
  getMemberKey,
  isFulfilled,
  isRejected,
  isSelectedEmail,
  isSelectedProfile,
} from './utils'

const InviteMemberDialog: FC<InviteMemberDialogProps> = ({
  open,
  onClose,
  connections,
  defaultRole = DEFAULT_INVITE_ROLE,
  roleOptions,
  collectInviteeNames = false,
  showMessageField = false,
  renderExtraFields,
  extraFieldsDefaultValues,
  validateExtraFields,
  copy: copyOverrides,
}) => {
  const copy = { ...INVITE_MEMBER_DIALOG_COPY, ...copyOverrides }
  const { currentProfile } = useCurrentProfile()
  const { sendToast } = useNotification()
  const [selected, setSelected] = useState<SelectedMember[]>([])
  const [role, setRole] = useState(defaultRole)
  const [message, setMessage] = useState('')
  const [extraValues, setExtraValues] = useState<InviteMemberExtraValues>(
    () => extraFieldsDefaultValues ?? {},
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createMembers] = useProfileUserRoleCreateMutation()
  const [sendInvitation] = useSendInvitationMutation()

  const handleAdd = (member: SelectedMember) =>
    setSelected((prev) =>
      prev.some((item) => getMemberKey(item) === getMemberKey(member)) ? prev : [...prev, member],
    )

  const handleRemove = (memberKey: string) =>
    setSelected((prev) => prev.filter((item) => getMemberKey(item) !== memberKey))

  const handleInviteeNameChange = (email: string, field: 'firstName' | 'lastName', value: string) =>
    setSelected((prev) =>
      prev.map((item) =>
        isSelectedEmail(item) && item.email === email ? { ...item, [field]: value } : item,
      ),
    )

  const setExtraValue = (name: string, value: unknown) =>
    setExtraValues((prev) => ({ ...prev, [name]: value }))

  const resetState = () => {
    setSelected([])
    setRole(defaultRole)
    setMessage('')
    setExtraValues(extraFieldsDefaultValues ?? {})
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
      createMembers({
        variables: {
          // Extra fields and project roles are outside the generated input type.
          input: buildAddMembersInput({
            profileId,
            role,
            members,
            extraValues,
          }) as ProfileUserRoleCreateInput,
          connections,
        },
        onCompleted: (response, errors) => {
          const errorMessage = getMutationErrorMessage(
            response?.profileUserRoleCreate?.errors,
            errors,
            { defaultMessage: 'Failed to add members' },
          )
          if (errorMessage) reject(new BatchError(errorMessage, members))
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
          input: buildSendInvitationInput({
            profileId,
            role,
            members,
            message: showMessageField ? message : undefined,
            extraValues,
          }) as ProfileSendInvitationInput,
          connections,
        },
        onCompleted: (response, errors) => {
          const errorMessage = getMutationErrorMessage(
            response?.profileSendInvitation?.errors,
            errors,
            { defaultMessage: 'Failed to send invitations' },
          )
          if (errorMessage) reject(new BatchError(errorMessage, members))
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

  const selectedEmails = selected.filter(isSelectedEmail)
  const areExtraFieldsValid = validateExtraFields ? validateExtraFields(extraValues) : true

  return (
    <ConfirmDialog
      title={copy.title}
      open={open}
      onClose={handleClose}
      cancelText={copy.cancel}
      customMaxWidth={400}
      content={
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {copy.description}
          </Typography>
          {open && (
            <Suspense
              fallback={
                <TextField fullWidth size="small" disabled placeholder={copy.searchPlaceholder} />
              }
            >
              <MemberSearch
                selected={selected}
                onAdd={handleAdd}
                onRemove={handleRemove}
                placeholder={copy.searchPlaceholder}
              />
            </Suspense>
          )}
          {collectInviteeNames && selectedEmails.length > 0 && (
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Typography variant="subtitle2">{copy.inviteeNamesTitle}</Typography>
              {selectedEmails.map((invitee) => (
                <Box key={invitee.email} sx={{ display: 'grid', gap: 1 }}>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {invitee.email}
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                    <TextField
                      size="small"
                      label={copy.firstNameLabel}
                      value={invitee.firstName ?? ''}
                      onChange={(event) =>
                        handleInviteeNameChange(invitee.email, 'firstName', event.target.value)
                      }
                      disabled={isSubmitting}
                      inputProps={{ maxLength: 150 }}
                    />
                    <TextField
                      size="small"
                      label={copy.lastNameLabel}
                      value={invitee.lastName ?? ''}
                      onChange={(event) =>
                        handleInviteeNameChange(invitee.email, 'lastName', event.target.value)
                      }
                      disabled={isSubmitting}
                      inputProps={{ maxLength: 150 }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          {roleOptions && roleOptions.length > 0 && (
            <TextField
              select
              size="small"
              label={copy.roleLabel}
              value={role}
              onChange={(event) => setRole(event.target.value)}
              disabled={isSubmitting}
            >
              {roleOptions.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
          {showMessageField && (
            <TextField
              multiline
              minRows={3}
              size="small"
              label={copy.messageLabel}
              placeholder={copy.messagePlaceholder}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={isSubmitting}
            />
          )}
          {renderExtraFields?.({
            values: extraValues,
            setValue: setExtraValue,
            disabled: isSubmitting,
            selected,
          })}
        </Box>
      }
      action={
        <LoadingButton
          variant="contained"
          color="inherit"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting || selected.length === 0 || !areExtraFieldsValid}
        >
          {copy.submit}
        </LoadingButton>
      }
    />
  )
}

export default InviteMemberDialog
