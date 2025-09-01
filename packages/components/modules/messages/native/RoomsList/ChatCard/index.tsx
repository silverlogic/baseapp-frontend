import { ChatCard as ChatCardComponent } from './ChatCardComponent'

const ChatCard = ({ roomRef, isArchived }: { roomRef: any | null; isArchived: boolean }) => {
  if (!roomRef) {
    return null
  }
  return <ChatCardComponent roomRef={roomRef!} isArchived={isArchived} />
}

export { ChatCard }
