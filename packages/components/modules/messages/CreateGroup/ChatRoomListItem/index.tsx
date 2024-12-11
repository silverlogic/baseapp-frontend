'use client'

import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Box, Button, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../profiles/graphql/queries/ProfileItem'
import { MainContainer } from './styled'
import { ChatRoomListItemProps } from './types'

const ChatRoomListItem: FC<ChatRoomListItemProps> = ({
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
        variant="outlined"
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
        {isMember ? 'Remove' : 'Add'}
      </Button>
    </MainContainer>
  )
}

export default ChatRoomListItem
