import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'

import { Box, Typography } from '@mui/material'

import { Container } from './styled'

const CurrentProfile: FC = () => {
  const { currentProfile: profile } = useCurrentProfile()

  if (!profile) return null

  return (
    <Container>
      <AvatarWithPlaceholder
        width={40}
        height={40}
        src={profile?.image ?? ''}
        alt="Current profile avatar"
        color="secondary"
      />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Typography component="p" variant="subtitle2" noWrap>
          {profile.name}
        </Typography>

        {profile?.urlPath && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profile?.urlPath?.replace('/', '')}
          </Typography>
        )}
      </Box>
    </Container>
  )
}

export default CurrentProfile
