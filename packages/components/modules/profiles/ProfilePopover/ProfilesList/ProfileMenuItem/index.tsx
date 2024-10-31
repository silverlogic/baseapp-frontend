import { FC } from 'react'

import { AvatarWithPlaceholder, CheckMarkIcon } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { readInlineData } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment } from '../../../graphql/queries/ProfileItem'
import { StyledMenuItem } from './styled'
import { ProfileMenuItemProps } from './types'

const ProfileMenuItem: FC<ProfileMenuItemProps> = ({
  profileRef,
  currentProfile,
  onProfileChange,
  avatarProps = {},
  width = 36,
  height = 36,
}) => {
  const profile = readInlineData<ProfileItemFragment$key>(ProfileItemFragment, profileRef)

  const profileUrlPath = profile.urlPath?.path
  const isActiveProfile = profile.id === currentProfile?.id

  return (
    <StyledMenuItem active={isActiveProfile} onClick={() => onProfileChange(profile)}>
      <AvatarWithPlaceholder
        width={width}
        height={height}
        src={profile.image?.url ?? ''}
        alt="Profile avatar"
        color="secondary"
        {...avatarProps}
      />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Typography component="p" variant="subtitle2" noWrap>
          {profile.name ?? ''}
        </Typography>
        {profileUrlPath && (
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
            {profileUrlPath}
          </Typography>
        )}
      </Box>
      {isActiveProfile && <CheckMarkIcon sx={{ fontSize: 24 }} />}
    </StyledMenuItem>
  )
}
export default ProfileMenuItem
