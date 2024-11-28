import { FC, useState } from 'react'

import { AvatarWithPlaceholder, ConfirmDialog } from '@baseapp-frontend/design-system'

import { Box, Button, MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'
import useCurrentProfile from '../../context/useCurrentProfile'
import { useChangeUserRoleMutation } from '../../graphql/mutations/ChangeUserRole'
import { ProfileItemFragment } from '../../graphql/queries/ProfileItem'
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
  canChangeMember = true,
  userId,
}) => {
  const { profile: currentProfile } = useCurrentProfile()
  const [changeUserRole, isChangingUserRole] = useChangeUserRoleMutation()
  const [openConfirmChangeMember, setOpenConfirmChangeMember] = useState(false)

  const memberProfile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, member)
  if (!memberProfile) return null

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

      {status === MemberStatuses.active && memberRole !== 'owner' && canChangeMember ? (
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
      ) : (
        <Box>
          <Button variant="soft" color="inherit">
            {status === MemberStatuses.active
              ? capitalizeFirstLetter(memberRole)
              : capitalizeFirstLetter(status)}
          </Button>
        </Box>
      )}
    </MemberItemContainer>
  )
}

export default MemberItem
