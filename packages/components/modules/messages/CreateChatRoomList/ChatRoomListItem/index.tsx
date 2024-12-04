'use client'

import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { useCurrentProfile } from '../../../profiles'
import { ProfileItemFragment } from '../../../profiles/graphql/queries/ProfileItem'
import { useChatRoom } from '../../context'
import { useCreateChatRoomMutation } from '../../graphql/mutations/CreateChatRoom'
import { MainContainer } from './styled'
import { ChatRoomListItemProps } from './types'

const ChatRoomListItem: FC<ChatRoomListItemProps> = ({
  profile: profileRef,
  setIsInExistingChatRoomsView,
}) => {
  const { id, image, name, urlPath } = useFragment(ProfileItemFragment, profileRef)
  const [commit, isMutationInFlight] = useCreateChatRoomMutation()

  const { currentProfile } = useCurrentProfile()
  const { setChatRoom } = useChatRoom()

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
      <LoadingButton
        color="inherit"
        variant="outlined"
        size="small"
        onClick={() => {
          if (currentProfile?.id) {
            commit({
              variables: {
                input: { profileId: currentProfile.id, participants: [id] },
              },
              onCompleted: (data) => {
                setChatRoom({ id: data?.chatRoomCreate?.room?.node?.id })
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

export default ChatRoomListItem
