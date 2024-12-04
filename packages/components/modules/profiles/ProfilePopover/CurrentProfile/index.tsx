import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'

const CurrentProfile: FC = () => {
  const profile = useCurrentProfile().currentProfile

  if (!profile) return null

  return (
    <Box sx={{ m: 1.5, mb: 0, px: 1, py: 0.75, gap: 1.5 }} display="flex" alignItems="center">
      <AvatarWithPlaceholder
        width={40}
        height={40}
        src={profile.image ?? ''}
        alt="Current profile avatar"
        color="secondary"
      />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Typography component="p" variant="subtitle2" noWrap>
          {profile.name}
        </Typography>

        {profile.urlPath && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profile.urlPath}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default CurrentProfile
