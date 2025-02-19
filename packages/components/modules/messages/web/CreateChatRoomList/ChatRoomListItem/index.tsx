'use client'

import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { ConnectionHandler, useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../../profiles/common'
import { useCreateChatRoomMutation } from '../../../common'
import { MainContainer } from './styled'
import { ChatRoomListItemProps } from './types'

const ChatRoomListItem: FC<ChatRoomListItemProps> = ({ profile: profileRef, onChatCreation }) => {
  const { id, image, name, urlPath } = useFragment(ProfileItemFragment, profileRef)
  const [commit, isMutationInFlight] = useCreateChatRoomMutation()

  const { currentProfile } = useCurrentProfile()

  return (
    <MainContainer key={`chat-room-item-${id}`}>
      <AvatarWithPlaceholder
        width={48}
        height={48}
        src={image?.url}
        sx={{ alignSelf: 'center', justifySelf: 'center' }}
      />
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}>
        <TypographyWithEllipsis variant="subtitle2">{name}</TypographyWithEllipsis>
        <Typography variant="caption" color="text.secondary">
          {urlPath?.path && `@${urlPath.path}`}
        </Typography>
      </Box>
      <LoadingButton
        color="inherit"
        variant="outlined"
        size="small"
        onClick={() => {
          if (currentProfile?.id) {
            commit({
              variables: {
                input: { profileId: currentProfile.id, participants: [id] },
                connections: [
                  ConnectionHandler.getConnectionID(currentProfile.id, 'roomsList_chatRooms', {
                    unreadMessages: false,
                    archived: false,
                    q: '',
                  }),
                  ConnectionHandler.getConnectionID(currentProfile.id, 'roomsList_chatRooms', {
                    unreadMessages: true,
                    archived: false,
                    q: '',
                  }),
                ],
              },
              onCompleted: onChatCreation,
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

export default ChatRoomListItem
