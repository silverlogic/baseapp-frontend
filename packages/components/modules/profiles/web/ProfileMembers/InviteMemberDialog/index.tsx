'use client'

import { FC, Suspense, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { useNotification } from '@baseapp-frontend/utils'

import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'

import { useProfileUserRoleCreateMutation } from '../../../common/graphql/mutations/ProfileUserRoleCreate'
import { useSendInvitationMutation } from '../../../common/graphql/mutations/SendInvitation'
import MemberSearch from './MemberSearch'
import { INVITE_MEMBER_DIALOG_COPY as COPY, DEFAULT_INVITE_ROLE } from './constants'
import { InviteMemberDialogProps, SelectedMember } from './types'
import { getMemberKey, isSelectedEmail, isSelectedProfile } from './utils'

const InviteMemberDialog: FC<InviteMemberDialogProps> = ({ open, onClose, onInvited }) => {
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
    resetState()
    onClose()
  }

  const handleSubmit = async () => {
    const profileId = currentProfile?.id
    if (!profileId || selected.length === 0) return

    const usersIds = selected.filter(isSelectedProfile).map((member) => member.userId)
    const emails = selected.filter(isSelectedEmail).map((member) => member.email)

    setIsSubmitting(true)
    try {
      if (usersIds.length > 0) {
        await new Promise<void>((resolve, reject) => {
          createMembers({
            variables: { input: { profileId, usersIds, roleType: DEFAULT_INVITE_ROLE } },
            onCompleted: (response, errors) => {
              const mutationErrors = response?.profileUserRoleCreate?.errors
              if (mutationErrors?.length) {
                reject(mutationErrors[0]?.messages?.[0] ?? 'Failed to add members')
              } else if (errors?.length) {
                reject(errors[0]?.message ?? 'Failed to add members')
              } else {
                resolve()
              }
            },
            onError: reject,
          })
        })
      }

      await Promise.all(
        emails.map(
          (email) =>
            new Promise<void>((resolve, reject) => {
              sendInvitation({
                variables: { input: { profileId, email, role: DEFAULT_INVITE_ROLE } },
                onCompleted: (response, errors) => {
                  const mutationErrors = response?.profileSendInvitation?.errors
                  if (mutationErrors?.length) {
                    reject(mutationErrors[0]?.messages?.[0] ?? `Failed to invite ${email}`)
                  } else if (errors?.length) {
                    reject(errors[0]?.message ?? `Failed to invite ${email}`)
                  } else {
                    resolve()
                  }
                },
                onError: reject,
              })
            }),
        ),
      )

      sendToast(selected.length === 1 ? 'Member added' : `${selected.length} members added`, {
        type: 'success',
      })
      onInvited?.()
      resetState()
      onClose()
    } catch (error) {
      // Network errors are already toasted by the mutation hooks; surface field/GraphQL
      // errors (rejected as strings) here.
      if (typeof error === 'string') {
        sendToast(error, { type: 'error' })
      }
      setIsSubmitting(false)
    }
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
            <Suspense fallback={<LoadingState CircularProgressProps={{ size: 20 }} />}>
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
