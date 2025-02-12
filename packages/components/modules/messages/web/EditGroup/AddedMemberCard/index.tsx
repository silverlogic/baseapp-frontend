'use client'

import { FC } from 'react'


import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { FilledCloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { MainContainer } from './styled'
import { AddedMemberCardProps } from './types'
import { ProfileItemFragment } from '../../../../profiles/common'

const AddedMemberCard: FC<AddedMemberCardProps> = ({ profile: profileRef, handleRemoveMember }) => {
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

export default AddedMemberCard
