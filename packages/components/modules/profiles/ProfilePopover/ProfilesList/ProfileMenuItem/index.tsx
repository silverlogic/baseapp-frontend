import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder, CheckMarkIcon } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../graphql/queries/ProfileItem'
import { StyledMenuItem } from './styled'
import { ProfileMenuItemProps } from './types'

const ProfileMenuItem: FC<ProfileMenuItemProps> = ({
  profileRef,
  onProfileChange,
  avatarProps = {},
  width = 36,
  height = 36,
}) => {
  const { currentProfile } = useCurrentProfile()
  const profile = useFragment(ProfileItemFragment, profileRef)

  if (!profile) {
    return null // Safeguard for invalid fragment reference
  }

  const profileUrlPath = profile.urlPath?.path

  const isActiveProfile = profile.id === currentProfile?.id

  return (
    <StyledMenuItem
      tabIndex={0}
      active={isActiveProfile}
      onClick={() => onProfileChange(profile, profileRef)}
      aria-label={`Switch to ${profile.name ?? 'this profile'}`}
    >
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
