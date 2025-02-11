'use client'

import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'

import { Box, Button, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../../profiles/common'
import { MainContainer } from './styled'
import { ProfileCardProps } from './types'

const ProfileCard: FC<ProfileCardProps> = ({
  profile: profileRef,
  handleAddMember,
  handleRemoveMember,
  isMember = false,
}) => {
  const { id, image, name, urlPath } = useFragment(ProfileItemFragment, profileRef)

  return (
    <MainContainer key={`chat-room-item-${id}`}>
      <AvatarWithPlaceholder
        width={48}
        height={48}
        src={image?.url}
        sx={{ alignSelf: 'center', justifySelf: 'center' }}
      />
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {urlPath?.path && `@${urlPath.path}`}
        </Typography>
      </Box>
      <Button
        color="inherit"
        variant="text"
        size="small"
        onClick={() => {
          if (isMember) {
            handleRemoveMember(profileRef)
          } else {
            handleAddMember(profileRef)
          }
        }}
        sx={{ maxWidth: 'fit-content', justifySelf: 'end' }}
      >
        <Typography variant="button" color={isMember ? 'error.main' : 'text.primary'}>
          {isMember ? 'Remove' : 'Add'}
        </Typography>
      </Button>
    </MainContainer>
  )
}

export default ProfileCard
