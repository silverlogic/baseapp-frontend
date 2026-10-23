import { FC, useEffect, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { Box, Button, MenuItem, SelectChangeEvent, Typography, useTheme } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileRoles } from '../../../../../__generated__/ChangeUserRoleMutation.graphql'
import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import {
  ProfileItemFragment,
  useChangeUserRoleMutation,
  useProfileMemberDeactivateMutation,
  useProfileMemberReactivateMutation,
} from '../../../common'
import { useCancelInvitationMutation } from '../../../common/graphql/mutations/CancelInvitation'
import { useRemoveMemberMutation } from '../../../common/graphql/mutations/RemoveMember'
import { useResendInvitationMutation } from '../../../common/graphql/mutations/ResendInvitation'
import {
  INVITATION_ACTIONS,
  MEMBER_ACTIONS,
  MEMBER_ROLES,
  MEMBER_STATUSES,
  roleOptions as defaultRoleOptions,
  invitationActionOptions,
} from '../constants'
import { getMemberLabel } from '../utils'
import { MemberItemContainer, MemberPersonalInformation, Select } from './styled'
import { MemberItemProps } from './types'

const MemberItem: FC<MemberItemProps> = ({
  member,
  memberRole,
  status,
  avatarProps = {},
  avatarWidth = 40,
  avatarHeight = 40,
  canChangeMember = false,
  userId,
  searchQuery,
  invitedEmail,
  invitationExpiresAt,
  invitationId,
  roleOptions = defaultRoleOptions,
  inactiveMemberOptions = [],
  roleLabels,
  statusLabels,
}) => {
  const theme = useTheme()

  const memberProfile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, member)

  const { currentProfile } = useCurrentProfile()

  const [changeUserRole, isChangingUserRole] = useChangeUserRoleMutation()
  const [removeMember, isRemovingMember] = useRemoveMemberMutation()
  const [resendInvitation, isResendingInvitation] = useResendInvitationMutation()
  const [cancelInvitation, isCancellingInvitation] = useCancelInvitationMutation()
  const [deactivateMember, isDeactivatingMember] = useProfileMemberDeactivateMutation()
  const [reactivateMember, isReactivatingMember] = useProfileMemberReactivateMutation()
  const [openConfirmChangeMember, setOpenConfirmChangeMember] = useState(false)
  const [openConfirmRemoveMember, setOpenConfirmRemoveMember] = useState(false)
  const [openConfirmDeactivateMember, setOpenConfirmDeactivateMember] = useState(false)
  const [openConfirmCancelInvitation, setOpenConfirmCancelInvitation] = useState(false)

  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (status !== MEMBER_STATUSES.pending || !invitationExpiresAt) return undefined

    const expiresAt = new Date(invitationExpiresAt).getTime()
    const currentTime = Date.now()
    if (!Number.isFinite(expiresAt) || expiresAt <= currentTime) return undefined

    const timeoutId = globalThis.setTimeout(() => setNow(Date.now()), expiresAt - currentTime)
    return () => globalThis.clearTimeout(timeoutId)
  }, [invitationExpiresAt, status])

  // An invitation is "expired" once it is flagged EXPIRED by the backend, or
  // while still PENDING past its expiry timestamp (the backend flips the status
  // lazily, so we also check the time client-side).
  const isExpired =
    status === MEMBER_STATUSES.expired ||
    (status === MEMBER_STATUSES.pending &&
      !!invitationExpiresAt &&
      new Date(invitationExpiresAt).getTime() < now)

  // Invitations sent to an email with no account yet have no profile to render;
  // fall back to the invited email so they still appear in the list.
  const displayName = memberProfile?.name ?? invitedEmail ?? ''

  if (!memberProfile && !invitedEmail) return null

  const shouldRenderChangeRoleSelect =
    status === MEMBER_STATUSES.active && memberRole !== MEMBER_ROLES.owner && canChangeMember

  const shouldRenderInactiveMemberSelect =
    status === MEMBER_STATUSES.inactive && canChangeMember && inactiveMemberOptions.length > 0

  const roleLabel = getMemberLabel(memberRole, roleLabels, roleOptions)
  const statusLabel = getMemberLabel(status, statusLabels)
  const expiredLabel = getMemberLabel(MEMBER_STATUSES.expired, statusLabels)

  const haveMemberRoleAndStatus = memberRole && status

  const removeProfileMember = () => {
    if (currentProfile?.id && userId) {
      removeMember({
        variables: { input: { profileId: currentProfile.id, userId } },
      })
    }
  }

  const confirmRemoveProfileMember = () => {
    if (currentProfile?.id && userId) {
      removeProfileMember()
    }
    setOpenConfirmRemoveMember(false)
  }

  const handleRemoveMemberDialog = () => {
    setOpenConfirmRemoveMember(!openConfirmRemoveMember)
  }

  const handleDeactivateMemberDialog = () => {
    setOpenConfirmDeactivateMember(!openConfirmDeactivateMember)
  }

  const confirmDeactivateMember = () => {
    if (currentProfile?.id && userId) {
      deactivateMember({ variables: { input: { profileId: currentProfile.id, userId } } })
    }
    setOpenConfirmDeactivateMember(false)
  }

  const handleReactivateMember = () => {
    if (currentProfile?.id && userId) {
      reactivateMember({ variables: { input: { profileId: currentProfile.id, userId } } })
    }
  }

  const handleInactiveMemberAction = (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target
    if (value === MEMBER_ACTIONS.reactivate) {
      handleReactivateMember()
    } else if (value === MEMBER_ACTIONS.remove) {
      handleRemoveMemberDialog()
    }
  }

  const handleResendInvitation = () => {
    if (invitationId) {
      resendInvitation({ variables: { input: { invitationId } } })
    }
  }

  const handleCancelInvitationDialog = () => {
    setOpenConfirmCancelInvitation(!openConfirmCancelInvitation)
  }

  const confirmCancelInvitation = () => {
    if (invitationId) {
      cancelInvitation({
        variables: { input: { invitationId } },
        // The mutation returns only `success` (no deletedId), so remove the
        // record from the store to drop it from the members connection.
        updater: (store) => store.delete(invitationId),
      })
    }
    setOpenConfirmCancelInvitation(false)
  }

  const changeRole = (roleType: ProfileRoles) => {
    if (currentProfile?.id && userId) {
      changeUserRole({
        variables: {
          input: { profileId: currentProfile.id, userId, roleType },
        },
      })
    }
  }

  const handleRoleChange = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value === MEMBER_ROLES.admin) {
      setOpenConfirmChangeMember(true)
      return
    }
    if (currentProfile?.id && userId) {
      changeRole(event.target.value as ProfileRoles)
    }
  }

  const cancelChangeRole = () => {
    setOpenConfirmChangeMember(false)
  }

  const confirmChangeRole = () => {
    if (currentProfile?.id && userId) {
      changeRole(MEMBER_ROLES.admin)
    }
    setOpenConfirmChangeMember(false)
  }

  const handleInvitationAction = (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target
    if (value === INVITATION_ACTIONS.resend) {
      handleResendInvitation()
    } else if (value === INVITATION_ACTIONS.remove) {
      handleCancelInvitationDialog()
    }
  }

  const renderRoleButton = () => {
    if (isExpired) {
      if (canChangeMember) {
        return (
          <Box>
            <Select
              value=""
              onChange={handleInvitationAction}
              displayEmpty
              renderValue={() => expiredLabel}
              variant="filled"
              size="small"
              disabled={isResendingInvitation || isCancellingInvitation}
            >
              {invitationActionOptions.map(({ value, label }) => (
                <MenuItem
                  key={value}
                  value={value}
                  sx={{
                    color:
                      value === INVITATION_ACTIONS.remove ? theme.palette.error.main : 'inherit',
                  }}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )
      }
      return (
        <Box>
          {/* Read-only status: `disabled` keeps it out of the tab order and the a11y
              tree as an actionable control (vs. pointerEvents:none, which only blocks
              the mouse). Greyed-out also reads correctly for an expired invitation. */}
          <Button variant="outlined" color="inherit" disabled>
            {expiredLabel}
          </Button>
        </Box>
      )
    }
    if (shouldRenderChangeRoleSelect) {
      return (
        <Box>
          <Select
            value={memberRole}
            onChange={(event: SelectChangeEvent<unknown>) => {
              const { value } = event.target
              if (value === MEMBER_ACTIONS.remove) {
                handleRemoveMemberDialog()
              } else if (value === MEMBER_ACTIONS.deactivate) {
                handleDeactivateMemberDialog()
              } else {
                handleRoleChange(event)
              }
            }}
            displayEmpty
            variant="filled"
            size="small"
            disabled={isChangingUserRole || isRemovingMember || isDeactivatingMember}
          >
            {roleOptions.map(({ value, label }) => (
              <MenuItem
                key={value}
                value={value}
                sx={{
                  color: value === MEMBER_ACTIONS.remove ? theme.palette.error.main : 'inherit',
                }}
              >
                {/* A project role label wins here too, so a role reads the same in every row. */}
                {roleLabels?.[value] ?? label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )
    }
    if (shouldRenderInactiveMemberSelect) {
      return (
        <Box>
          <Select
            value=""
            onChange={handleInactiveMemberAction}
            displayEmpty
            renderValue={() => statusLabel}
            variant="filled"
            size="small"
            disabled={isReactivatingMember || isRemovingMember}
          >
            {inactiveMemberOptions.map(({ value, label }) => (
              <MenuItem
                key={value}
                value={value}
                sx={{
                  color: value === MEMBER_ACTIONS.remove ? theme.palette.error.main : 'inherit',
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )
    }
    if (haveMemberRoleAndStatus) {
      return (
        <Box>
          <Button variant="outlined" color="inherit" sx={{ pointerEvents: 'none' }}>
            {status === MEMBER_STATUSES.active ? roleLabel : statusLabel}
          </Button>
        </Box>
      )
    }
    return null
  }

  if (searchQuery && !displayName.toLowerCase().includes(searchQuery.toLowerCase())) {
    return null
  }

  return (
    <>
      <ConfirmDialog
        title="Change user permissions?"
        open={openConfirmChangeMember}
        action={
          <Button variant="contained" color="inherit" onClick={confirmChangeRole}>
            Confirm
          </Button>
        }
        onClose={cancelChangeRole}
        content={
          <Typography variant="body1">
            Are you sure you want to promote this member to an admin? They will have full
            administrative rights, including the ability to manage members and settings.
          </Typography>
        }
        cancelText="Back"
      />
      <ConfirmDialog
        title="Remove member"
        open={openConfirmRemoveMember}
        onClose={handleRemoveMemberDialog}
        content={
          <Typography variant="body1">
            Are you sure you want to remove this member? This action will revoke their access to the
            organization profile.
          </Typography>
        }
        cancelText="Back"
        action={
          <Button variant="contained" color="error" onClick={confirmRemoveProfileMember}>
            Remove
          </Button>
        }
      />
      <ConfirmDialog
        title="Deactivate member"
        open={openConfirmDeactivateMember}
        onClose={handleDeactivateMemberDialog}
        content={
          <Typography variant="body1">
            Are you sure you want to deactivate this member? They will lose access to the
            organization profile until they are reactivated.
          </Typography>
        }
        cancelText="Back"
        action={
          <Button variant="contained" color="error" onClick={confirmDeactivateMember}>
            Deactivate
          </Button>
        }
      />
      <ConfirmDialog
        title="Remove invitation"
        open={openConfirmCancelInvitation}
        onClose={handleCancelInvitationDialog}
        content={
          <Typography variant="body1">
            Are you sure you want to remove this invitation? It will be deleted from the list.
          </Typography>
        }
        cancelText="Back"
        action={
          <Button variant="contained" color="error" onClick={confirmCancelInvitation}>
            Remove
          </Button>
        }
      />
      <MemberItemContainer>
        <MemberPersonalInformation isActive={status === MEMBER_STATUSES.active || false}>
          <AvatarWithPlaceholder
            width={avatarWidth}
            height={avatarHeight}
            src={memberProfile?.image ?? ''}
            alt="Profile avatar"
            color="secondary"
            {...avatarProps}
          />
          <Box>
            <Typography variant="subtitle2">{displayName}</Typography>
            <Typography variant="caption">{memberProfile?.urlPath?.path}</Typography>
          </Box>
        </MemberPersonalInformation>
        {renderRoleButton()}
      </MemberItemContainer>
    </>
  )
}

export default MemberItem
