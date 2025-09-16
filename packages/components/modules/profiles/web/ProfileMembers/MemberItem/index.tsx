import { FC, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { useNotification } from '@baseapp-frontend/utils'

import { Box, Button, MenuItem, SelectChangeEvent, Typography, useTheme } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileRoles } from '../../../../../__generated__/ProfileUserRoleUpdateMutation.graphql'
import { ProfileItemFragment, useProfileUserRoleUpdateMutation } from '../../../common'
import { useRemoveMemberMutation } from '../../../common/graphql/mutations/ProfileUserRoleDelete'
import MemberPersonalInfo from '../MemberPersonalInfo'
import { MEMBER_ACTIONS, MEMBER_ROLES, MEMBER_STATUSES, roleOptions } from '../constants'
import { capitalizeFirstLetter } from '../utils'
import { MemberItemContainer, Select } from './styled'
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
}) => {
  const [openConfirmChangeMember, setOpenConfirmChangeMember] = useState(false)
  const [openConfirmRemoveMember, setOpenConfirmRemoveMember] = useState(false)
  const [isCancelInviteConfirmationDialogOpen, setIsCancelInviteConfirmationDialogOpen] =
    useState(false)

  const memberProfile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, member)
  const { currentProfile } = useCurrentProfile()
  const [changeUserRole, isChangingUserRole] = useProfileUserRoleUpdateMutation()
  const [removeMember, isRemovingMember] = useRemoveMemberMutation()
  const { sendToast } = useNotification()
  const theme = useTheme()

  if (!memberProfile) return null

  const shouldRenderChangeRoleSelect =
    status === MEMBER_STATUSES.active && memberRole !== 'owner' && canChangeMember
  const haveMemberRoleAndStatus = memberRole && status
  const isMemberInvited =
    (status === MEMBER_STATUSES.pending ||
      status === MEMBER_STATUSES.inactive ||
      status === MEMBER_STATUSES.expired) &&
    canChangeMember

  const removeProfileMember = (invite: boolean = false) => {
    if (currentProfile?.id && userId) {
      removeMember({
        variables: { input: { profileId: currentProfile.id, userId } },
        onCompleted: () => {
          if (invite) {
            sendToast('Invite canceled successfully', { type: 'success' })
          } else {
            sendToast('Member removed successfully', { type: 'success' })
          }
        },
      })
    }
  }

  const confirmRemoveProfileMember = (invite: boolean = false) => {
    if (currentProfile?.id && userId) {
      removeProfileMember(invite)
    }
    setOpenConfirmRemoveMember(false)
  }

  const handleRemoveMemberDialog = () => {
    setOpenConfirmRemoveMember(!openConfirmRemoveMember)
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

  const renderRoleButton = () => {
    if (shouldRenderChangeRoleSelect)
      return (
        <Box>
          <Select
            value={memberRole}
            onChange={(event: SelectChangeEvent<unknown>) => {
              const { value } = event.target
              if (value === MEMBER_ACTIONS.remove) {
                handleRemoveMemberDialog()
              } else {
                handleRoleChange(event)
              }
            }}
            displayEmpty
            variant="filled"
            size="small"
            disabled={isChangingUserRole || isRemovingMember}
          >
            {roleOptions.map(({ value, label }) => (
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
    if (isMemberInvited)
      return (
        <Box>
          <Select
            value=""
            onChange={(event: SelectChangeEvent<unknown>) => {
              const { value } = event.target
              if (value === MEMBER_ACTIONS.remove) {
                setIsCancelInviteConfirmationDialogOpen(true)
              }
            }}
            displayEmpty
            variant="filled"
            size="small"
            disabled={isRemovingMember}
            renderValue={() => {
              if (status === MEMBER_STATUSES.pending) return 'Invited'
              return capitalizeFirstLetter(status)
            }}
          >
            <MenuItem
              key={MEMBER_ACTIONS.resendInvitation}
              value={MEMBER_ACTIONS.resendInvitation}
              sx={{ color: 'inherit' }}
            >
              Resend
            </MenuItem>
            <MenuItem
              key={MEMBER_ACTIONS.remove}
              value={MEMBER_ACTIONS.remove}
              sx={{ color: theme.palette.error.main }}
            >
              Cancel Invite
            </MenuItem>
          </Select>
        </Box>
      )
    if (haveMemberRoleAndStatus)
      return (
        <Box>
          <Button variant="outlined" color="inherit" sx={{ pointerEvents: 'none' }}>
            {status === MEMBER_STATUSES.active
              ? capitalizeFirstLetter(memberRole)
              : capitalizeFirstLetter(status)}
          </Button>
        </Box>
      )
    return null
  }

  if (searchQuery && !memberProfile?.name?.toLowerCase().includes(searchQuery.toLowerCase())) {
    return null
  }

  return (
    <MemberItemContainer>
      <ConfirmDialog
        title="Cancel invite"
        open={isCancelInviteConfirmationDialogOpen}
        onClose={() => setIsCancelInviteConfirmationDialogOpen(false)}
        content={
          <Typography variant="body1">
            Are you sure you want to cancel this invite? Once canceled, this member will no longer
            be able to join. You can always resend the invite later if needed.
          </Typography>
        }
        cancelText="Back"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => confirmRemoveProfileMember(true)}
          >
            Cancel
          </Button>
        }
      />
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
          <Button
            variant="contained"
            color="error"
            onClick={() => confirmRemoveProfileMember(false)}
          >
            Remove
          </Button>
        }
      />
      <MemberPersonalInfo
        avatarProps={avatarProps}
        avatarWidth={avatarWidth}
        avatarHeight={avatarHeight}
        member={member}
        status={status}
      />
      {renderRoleButton()}
    </MemberItemContainer>
  )
}

export default MemberItem
