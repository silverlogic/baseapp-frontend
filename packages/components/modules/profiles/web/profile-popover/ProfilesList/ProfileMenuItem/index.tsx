import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { CheckMarkIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../../common'
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
  const intl = useIntl()
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
      onClick={() => onProfileChange(profile)}
      aria-label={
        profile.name
          ? intl.formatMessage(
              { id: 'profiles.profilesList.switchTo', defaultMessage: 'Switch to {name}' },
              { name: profile.name },
            )
          : intl.formatMessage({
              id: 'profiles.profilesList.switchToThisProfile',
              defaultMessage: 'Switch to this profile',
            })
      }
    >
      <AvatarWithPlaceholder
        width={width}
        height={height}
        src={profile.image ?? ''}
        alt={intl.formatMessage({
          id: 'profiles.members.avatarAlt',
          defaultMessage: 'Profile avatar',
        })}
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
