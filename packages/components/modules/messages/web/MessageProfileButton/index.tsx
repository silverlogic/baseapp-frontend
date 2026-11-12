'use client'

import { FC, useContext } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { LoadingButton } from '@mui/lab'
import { ConnectionHandler } from 'react-relay'

import { ChatRoomProvider, useCreateChatRoomMutation } from '../../common'
import { ChatRoomContext } from '../../common/context/ChatRoomProvider'
import { MessageProfileButtonProps } from './types'

// the rooms list connections a new room is prepended to, as ChatCreate does
const getRoomsListConnectionIds = (profileId: string) =>
  [false, true].map((unreadMessages) =>
    ConnectionHandler.getConnectionID(profileId, 'roomsList_chatRooms', {
      unreadMessages,
      archived: false,
      q: '',
    }),
  )

const MessageProfileButtonContent: FC<MessageProfileButtonProps> = ({
  profileId,
  actorProfileId,
  onRoomReady,
  label = 'Message',
  ButtonProps,
}) => {
  const { currentProfile } = useCurrentProfile()
  const [commit, isMutationInFlight] = useCreateChatRoomMutation()

  const actorId = actorProfileId ?? currentProfile?.id
  if (!currentProfile || !actorId || actorId === profileId) return null

  const handleClick = () => {
    if (isMutationInFlight) return
    commit({
      variables: {
        input: { profileId: actorId, participants: [profileId] },
        connections: getRoomsListConnectionIds(actorId),
      },
      onCompleted: (response, errors) => {
        const roomId = response?.chatRoomCreate?.room?.node?.id
        if (roomId && !errors?.length && !response?.chatRoomCreate?.errors?.length) {
          onRoomReady?.(roomId)
        }
      },
    })
  }

  return (
    <LoadingButton
      variant="soft"
      color="inherit"
      size="medium"
      {...ButtonProps}
      onClick={handleClick}
      loading={isMutationInFlight}
    >
      {label}
    </LoadingButton>
  )
}

const MessageProfileButton: FC<MessageProfileButtonProps> = (props) => {
  // inside the messages UI the opened room becomes the selected one; anywhere else the button
  // brings its own store, which the create mutation needs
  const chatRoomStore = useContext(ChatRoomContext)
  if (chatRoomStore) return <MessageProfileButtonContent {...props} />

  return (
    <ChatRoomProvider>
      <MessageProfileButtonContent {...props} />
    </ChatRoomProvider>
  )
}

export default MessageProfileButton
