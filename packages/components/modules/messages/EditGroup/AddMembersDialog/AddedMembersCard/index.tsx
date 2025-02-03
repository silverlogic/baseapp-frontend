'use client'

import { FC } from 'react'

import { AvatarWithPlaceholder, FilledCloseIcon, IconButton } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../../profiles/graphql/queries/ProfileItem'
import { MainContainer } from './styled'
import { AddedMembersCardProps } from './types'

const AddedMembersCard: FC<AddedMembersCardProps> = ({
  profile: profileRef,
  handleRemoveMember,
}) => {
  const { id, image, name } = useFragment(ProfileItemFragment, profileRef)

  return (
    <MainContainer key={`chat-room-item-${id}`}>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
          }}
          onClick={() => handleRemoveMember(profileRef)}
        >
          <FilledCloseIcon />
        </IconButton>
        <AvatarWithPlaceholder
          width={64}
          height={64}
          src={image?.url}
          sx={{ alignSelf: 'center', justifySelf: 'center' }}
        />
      </Box>
      <Typography
        variant="subtitle2"
        noWrap
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '64px' }}
      >
        {name}
      </Typography>
    </MainContainer>
  )
}

export default AddedMembersCard
