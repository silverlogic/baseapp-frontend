import { FC, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { Box, Button, MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment, useChangeUserRoleMutation } from '../../../common'
import { MemberRoles, MemberStatuses, roleOptions } from '../constants'
import { capitalizeFirstLetter } from '../utils'
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
}) => {
  const memberProfile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, member)

  const { currentProfile } = useCurrentProfile()

  const [changeUserRole, isChangingUserRole] = useChangeUserRoleMutation()
  const [openConfirmChangeMember, setOpenConfirmChangeMember] = useState(false)

  if (!memberProfile) return null

  const shouldRenderChangeRoleSelect =
    status === MemberStatuses.active && memberRole !== 'owner' && canChangeMember

  const haveMemberRoleAndStatus = memberRole && status

  const changeRole = (roleType: MemberRoles) => {
    if (currentProfile?.id && userId) {
      changeUserRole({
        variables: {
          input: { profileId: currentProfile.id, userId, roleType },
        },
      })
    }
  }

  const handleRoleChange = (event: SelectChangeEvent<{ value: MemberRoles }>) => {
    if (event.target.value === MemberRoles.admin) {
      setOpenConfirmChangeMember(true)
      return
    }
    if (currentProfile?.id && userId) {
      changeRole(event?.target?.value as MemberRoles)
    }
  }

  const cancelChangeRole = () => {
    setOpenConfirmChangeMember(false)
  }

  const confirmChangeRole = () => {
    if (currentProfile?.id && userId) {
      changeRole(MemberRoles.admin)
    }
    setOpenConfirmChangeMember(false)
  }

  const renderRoleButton = () => {
    if (shouldRenderChangeRoleSelect) {
      return (
        <Box>
          <Select
            value={memberRole}
            onChange={(event, _) =>
              handleRoleChange(event as SelectChangeEvent<{ value: MemberRoles }>)
            }
            displayEmpty
            variant="filled"
            size="small"
            disabled={isChangingUserRole}
          >
            {roleOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
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
          <Button variant="soft" color="inherit" sx={{ pointerEvents: 'none' }}>
            {status === MemberStatuses.active
              ? capitalizeFirstLetter(memberRole)
              : capitalizeFirstLetter(status)}
          </Button>
        </Box>
      )
    }
    return null
  }

  if (searchQuery && !memberProfile?.name?.toLowerCase().includes(searchQuery.toLowerCase())) {
    return null
  }

  return (
    <MemberItemContainer>
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
      <MemberPersonalInformation isActive={status === MemberStatuses.active || false}>
        <AvatarWithPlaceholder
          width={avatarWidth}
          height={avatarHeight}
          src={memberProfile?.image?.url ?? ''}
          alt="Profile avatar"
          color="secondary"
          {...avatarProps}
        />
        <Box>
          <Typography variant="subtitle2">{memberProfile.name}</Typography>
          <Typography variant="caption">{memberProfile?.urlPath?.path}</Typography>
        </Box>
      </MemberPersonalInformation>
      {renderRoleButton()}
    </MemberItemContainer>
  )
}

export default MemberItem
