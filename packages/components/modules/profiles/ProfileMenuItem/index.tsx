import { FC } from 'react'

import { AvatarWithPlaceholder, CheckMarkIcon } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import {
  ProfileItemFragment$data,
  ProfileItemFragment$key,
} from '../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment } from '../graphql/queries/ProfileItem'
import { CurrentProfile } from '../hooks/useCurrentProfile/types'
import { StyledMenuItem } from './styled'

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
        color="secondary" // TODO: add props to control.
      />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Typography variant="subtitle2" noWrap>
          {profile.name ?? ''}
        </Typography>
        {handle && (
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
            {handle}
          </Typography>
        )}
      </Box>
      {isActiveProfile && <CheckMarkIcon sx={{ fontSize: 24 }} />}
    </StyledMenuItem>
  )
}
export default ProfileMenuItem
