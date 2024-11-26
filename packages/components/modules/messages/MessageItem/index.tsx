import { FC } from 'react'

import { Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { useCurrentProfile } from '../../profiles'
import { MessageItemFragment } from '../graphql/queries/MessageItem'
import { MessageItemContainer } from './styled'
import { MessageItemProps } from './types'

const MessageItem: FC<MessageItemProps> = ({ messageRef, isFirstGroupedMessage }) => {
  const { profile: currentProfile } = useCurrentProfile()
  const message = useFragment(MessageItemFragment, messageRef)

  const isOwnMessage = currentProfile?.id === message?.profile?.id

  return (
    <MessageItemContainer isOwnMessage={isOwnMessage} isFirstGroupedMessage={isFirstGroupedMessage}>
      <Typography
        variant="body2"
        color={isOwnMessage ? 'text.primary' : 'primary.contrastText'}
        sx={{ maxWidth: '100%', wordWrap: 'break-word' }}
      >
        {message?.content}
      </Typography>
    </MessageItemContainer>
  )
}

export default MessageItem
