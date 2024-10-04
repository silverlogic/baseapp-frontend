import { FC } from 'react'

import { AvatarWithPlaceholder, CheckMarkIcon } from '@baseapp-frontend/design-system'

import { Box } from '@mui/material'
import { useFragment } from 'react-relay'

import {
  ProfileItemFragment$data,
  ProfileItemFragment$key,
} from '../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment } from '../graphql/queries/ProfileItem'
import { CurrentProfile } from '../hooks/useCurrentProfile/types'
import { StyledMenuItem, StyledTypography } from './styled'

// TODO: move interface to types.d.ts
interface ProfileMenuItemProps {
  profileRef: ProfileItemFragment$key
  currentProfile: CurrentProfile
  onProfileChange: (newProfile: ProfileItemFragment$data) => void
  avatarAlt?: string
  width?: number
  height?: number
}

const ProfileMenuItem: FC<ProfileMenuItemProps> = ({
  profileRef,
  currentProfile,
  onProfileChange,
  avatarAlt = 'Profile avatar',
  width = 36,
  height = 36,
}) => {
  const profile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, profileRef)

  const handle = profile.urlPath?.path
  const isActiveProfile = profile.id === currentProfile?.profile?.id

  return (
    <StyledMenuItem active={isActiveProfile} onClick={() => onProfileChange(profile)}>
      <AvatarWithPlaceholder
        width={width}
        height={height}
        src={profile.image?.url ?? ''}
        alt={avatarAlt}
      />
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <StyledTypography variant="subtitle2">{profile.name ?? ''}</StyledTypography>
        {handle && (
          <StyledTypography variant="caption" sx={{ color: 'text.secondary' }}>
            {handle}
          </StyledTypography>
        )}
      </Box>
      {isActiveProfile && <CheckMarkIcon sx={{ fontSize: 24 }} />}
    </StyledMenuItem>
  )
}
export default ProfileMenuItem
