import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import useCurrentProfile from '../../context/useCurrentProfile'
import { ProfileItemFragment } from '../../graphql/queries/ProfileItem'

const CurrentProfile: FC = () => {
  const { profile } = useCurrentProfile()
  const profileData = useFragment(ProfileItemFragment, profile)

  if (!profileData) return null

  return (
    <Box sx={{ m: 1.5, mb: 0, px: 1, py: 0.75, gap: 1.5 }} display="flex" alignItems="center">
      <AvatarWithPlaceholder
        width={40}
        height={40}
        src={profileData.image?.url ?? ''}
        alt="Current profile avatar"
        color="secondary"
      />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Typography component="p" variant="subtitle2" noWrap>
          {profileData.name}
        </Typography>

        {profileData.urlPath?.path && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profileData.urlPath?.path}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default CurrentProfile
