'use client'

import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'

import { MainContainer } from './styled'
import { ChatRoomListCardProps } from './types'

const ChatRoomListCard: FC<ChatRoomListCardProps> = ({
  item,
  setIsInChatRoom,
  setIsInExistingChatRoomsView,
  currentProfile,
  commit,
  isMutationInFlight,
}) => {
  const { id, image, name, urlPath } = item

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
        <Typography variant="caption" color="text.secondary">
          {urlPath?.path}
        </Typography>
      </Box>
      <LoadingButton
        color="inherit"
        variant="outlined"
        onClick={() => {
          if (currentProfile?.profile?.id) {
            commit({
              variables: {
                input: { profileId: currentProfile.profile.id, participants: [id] },
              },
              onCompleted: () => {
                setIsInChatRoom(true)
                setIsInExistingChatRoomsView(true)
              },
            })
          }
        }}
        loading={isMutationInFlight}
        sx={{ maxWidth: 'fit-content', justifySelf: 'end' }}
      >
        Message
      </LoadingButton>
    </MainContainer>
  )
}

export default ChatRoomListCard
