import { FC } from 'react'

import ChatCardComponent from './ChatCardComponent'
import { ChatCardComponentProps } from './ChatCardComponent/type'

const ChatCard: FC<ChatCardComponentProps> = ({ roomRef, isArchived, renderAvatar }) => {
  if (!roomRef) {
    return null
  }
  return (
    <ChatCardComponent roomRef={roomRef!} isArchived={isArchived} renderAvatar={renderAvatar} />
  )
}

export default ChatCard
