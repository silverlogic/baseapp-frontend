'use client'

import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../profiles/graphql/queries/ProfileItem'
import { MainContainer } from './styled'
import { ProfileCardProps } from './types'

const ProfileCard: FC<ProfileCardProps> = ({ profile: profileRef, role }) => {
  const { id, image, name, urlPath } = useFragment(ProfileItemFragment, profileRef)
  const showPath = !!urlPath?.path
  const showAdmin = role === 'ADMIN'
  return (
    <MainContainer key={`profile-${id}`}>
      <AvatarWithPlaceholder
        width={48}
        height={48}
        src={image?.url}
        sx={{ alignSelf: 'center', justifySelf: 'center' }}
      />
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Box
          sx={{
            alignItems: 'center',
            display: 'grid',
            gridTemplateColumns: 'min-content min-content min-content',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {showPath && `@${urlPath.path}`}
          </Typography>
          {showAdmin && showPath && (
            <Box
              sx={{
                display: 'inline-block',
                height: '6px',
                width: '6px',
                borderRadius: '50%',
                backgroundColor: 'text.disabled',
                marginX: '8px',
              }}
            />
          )}
          <Typography variant="caption" color="primary.light">
            {showAdmin && 'Admin'}
          </Typography>
        </Box>
      </Box>
    </MainContainer>
  )
}

export default ProfileCard
