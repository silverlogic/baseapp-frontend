import { graphql, useLazyLoadQuery } from 'react-relay'

import SuspendedChatRoom from '../..'
import { ChatRoomWithQuery as Query } from '../../../../../../__generated__/ChatRoomWithQuery.graphql'
import { MessagesListFragment$key } from '../../../../../../__generated__/MessagesListFragment.graphql'

const ChatRoomWithQuery = () => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query ChatRoomWithQuery @relay_test_operation {
        chatRoom(id: "room-123") {
          id
          isArchived
          participantsCount
          ...TitleFragment
          ...MessagesListFragment
        }
      }
    `,
    {},
  )

  if (!data.chatRoom) return <div>Room not found</div>

  return (
    <SuspendedChatRoom
      roomId={data.chatRoom.id}
      onDisplayGroupDetailsClicked={() => alert('Group details clicked')}
      MessagesListProps={{ roomRef: data.chatRoom as MessagesListFragment$key }}
    />
  )
}

export default ChatRoomWithQuery
